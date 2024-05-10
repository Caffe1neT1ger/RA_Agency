import { OwnerData } from '../models/index.js';
class OwnerController {
  async uploadData(req, res, next) {
    const { name, address, email } = req.body;
    try {
      const ownerData = await OwnerData.findAll();

      if (ownerData.length === 0) {
        const newOwnerData = await OwnerData.create({ name, address, email });
        return newOwnerData;
      }
      const newName = typeof name === 'string' ? name : ownerData[0].dataValues.name;
      const newAddress = typeof address === 'string' ? address : ownerData[0].dataValues.address;
      const newEmail = typeof email === 'string' ? email : ownerData[0].dataValues.email;

      await OwnerData.update(
        { name: newName, address: newAddress, email: newEmail },
        { where: { id: ownerData[0].dataValues.id } },
      );
      const newData = await OwnerData.findOne({ where: { id: ownerData[0].dataValues.id } });

      return res.json(newData);
    } catch (error) {
      return next(error);
    }
  }
  async getData(req, res, next) {
    try {
      const ownerData = await OwnerData.findAll();

      if (!ownerData) {
        return next(ApiError.BadRequest('Данных не существует'));
      }
      return res.json(ownerData);
    } catch (error) {
      return next(error);
    }
  }
}

export default new OwnerController();
