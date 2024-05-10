import ownerService from '../services/ownerService.js';

class OwnerController {
  async uploadData(req, res, next) {
    const { name, address, email } = req.body;
    try {
      const data = await ownerService.uploadData(name, address, email);

      return res.json(data);
    } catch (error) {
      return next(error);
    }
  }
  async getData(req, res, next) {
    try {
      const ownerData = await ownerService.getData();
      return res.json(ownerData);
    } catch (error) {
      return next(error);
    }
  }
}

export default new OwnerController();
