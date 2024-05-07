import { OwnerData } from '../models/index.js';

class OwnerService {
  async uploadData(name, address, email) {
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
    return newData;
  }

  async getData() {
    const ownerData = await OwnerData.findAll();

    if (!ownerData) {
      console.log('Данных не существует');
    }

    return ownerData[0];
  }

  async getEmail() {
    const ownerData = await OwnerData.findAll();

    if (!ownerData) {
      console.log('Данных не существует');
    }

    return ownerData[0].dataValues.email;
  }
}

export default new OwnerService();
