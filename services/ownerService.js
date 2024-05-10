import { OwnerData } from '../models/index.js';

class OwnerService {
  async getEmail() {
    const ownerData = await OwnerData.findAll();

    if (!ownerData) {
      return ApiError.BadRequest('Данных не существует');
    }

    return ownerData[0].dataValues.email;
  }
}

export default new OwnerService();
