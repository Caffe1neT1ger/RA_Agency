import { ApiError } from '../error/ApiError.js';
import { Estate, EstateImage } from '../models/index.js';
import imageService from './imageService.js';
import { Op } from 'sequelize';
class EstateService {
  async create(name, description, price, address, area, fileList) {
    const newEstate = await Estate.create(
      {
        name,
        price,
        description,
        address,
        area,
      },
      { returning: true },
    );

    const savedImg = await Promise.all(
      fileList.map(async (image) => {
        const imageName = (await imageService.save(image, newEstate.dataValues.id)).dataValues.image;
        return imageName;
      }),
    );

    return {
      ...newEstate.dataValues,
      image: savedImg,
    };
  }

  async remove(estateId) {
    const estate = await Estate.findOne({ where: { id: estateId } });

    if (!estate) {
      return ApiError.BadRequest('Недвиги не существует');
    }

    const deletedImage = await EstateImage.findAll({ where: { estate_id: estateId } });
    deletedImage.forEach((image) => deleteImage(image.dataValues.image, 'estate'));
    const delatedEstate = await Estate.destroy({ where: { id: estateId } });

    return delatedEstate;
  }
  async getOne(estateId) {
    const estate = await Estate.findOne({
      include: [{ model: EstateImage, as: 'images' }],
      where: { id: estateId },
    });
    if (!estate) {
      return ApiError.BadRequest('Недвиги не существует');
    }
    return estate;
  }

  async getAll(limit, page, minPrice, maxPrice, minArea, maxArea) {
    const offset = (page - 1) * limit;

    const allItems = await Estate.findAll({
      include: [{ model: EstateImage, as: 'images' }],
      where: { price: { [Op.between]: [minPrice, maxPrice] }, area: { [Op.between]: [minArea, maxArea] } },
      offset,
      limit,
    });
    return allItems;
  }
}

export default new EstateService();
