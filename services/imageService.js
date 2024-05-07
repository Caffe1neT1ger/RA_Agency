import { EstateImage } from '../models/index.js';

class ImageService {
  async save(imageName, estateId) {
    const newImage = await EstateImage.create(
      {
        image: imageName,
        estate_id: estateId,
      },
      { returning: true },
    );

    return newImage;
  }
  async delete(imageId) {
    const image = await EstateImage.findOne({ where: { id: imageId } });

    if (!image) {
      console.log('Изорбажения не существует');
    }
    await EstateImage.destroy({ where: { id: imageId } });
    deleteImage(image.dataValues.image, 'estate');
  }

  async getById(imageId) {
    const image = await EstateImage.findOne({ where: { id: imageId } });

    if (!image) {
      console.log('Изорбажения не существует');
    }
    return image;
  }

  async getByEstateId(estateId) {
    const image = await EstateImage.findOne({ where: { estate_id: estateId } });

    if (!image) {
      console.log('Изорбажения не существует');
    }
    return image;
  }
}

export default new ImageService();
