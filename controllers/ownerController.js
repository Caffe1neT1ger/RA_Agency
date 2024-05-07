import ownerService from '../services/ownerService.js';

class OwnerController {
  async uploadData(req, res, next) {
    const { name, address, email } = req.body;
    try {
      const data = await ownerService.uploadData(name, address, email);

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async getData(req, res, next) {
    try {
      const ownerData = await ownerService.getData();
      res.json(ownerData);
    } catch (error) {
      next(error);
    }
  }
}

export default new OwnerController();
