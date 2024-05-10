import { v4 as uuidv4 } from 'uuid';
import estateService from '../services/estateService.js';
import path from 'path';
class EstateController {
  async create(req, res, next) {
    const { name, description, price, address, area } = req.body;
    const files = req.files.images;

    const fileList = [];
    const __dirname = path.resolve(path.dirname(''));

    if (Array.isArray(files)) {
      fileList.push(
        ...files.map((img) => {
          const fileName = uuidv4() + '.jpg';
          img.mv(path.resolve(__dirname, 'static/estate', fileName));
          return fileName;
        }),
      );
    } else {
      const fileName = uuidv4() + '.jpg';
      img.mv(path.resolve(__dirname, 'static/estate', fileName));
      fileList.push(fileName);
    }
    try {
      const newEstate = await estateService.create(name, description, price, address, area, fileList);
      return res.json(newEstate);
    } catch (error) {
      return next(error);
    }
  }

  async remove(req, res, next) {
    const { estateId } = req.body;
    try {
      const deletedEstate = await estateService.remove(estateId);
      return res.json(deletedEstate);
    } catch (error) {
      return next(error);
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const estate = await estateService.getOne(id);
      return res.json(estate);
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req, res, next) {
    const { limit = 9, page = 1, minPrice = 0, maxPrice = 999999, minArea = 0, maxArea = 999999 } = req.query;
    try {
      const allItems = await estateService.getAll(limit, page, minPrice, maxPrice, minArea, maxArea);
      return res.json(allItems);
    } catch (error) {
      return next(error);
    }
  }
}

export default new EstateController();
