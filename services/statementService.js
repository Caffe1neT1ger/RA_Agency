import { Statement } from '../models/index.js';
import mailService from './mailService.js';
import ownerService from './ownerService.js';
class StatementService {
  async create(name, phone, email, text, consultation) {
    if (typeof consultation !== 'boolean') {
      consultation = true;
    }
    const statement = await Statement.create({ name, phone, email, text, consultation: consultation });

    const ownerEmail = await ownerService.getEmail();

    await mailService.sendStatementMail(ownerEmail, name, phone, email, text, consultation);

    return statement;
  }

  async getOne(id) {
    const statement = await Statement.findOne({ where: { id } });
    if (!statement) {
      console.log('Заявки не существует');
    }
    return statement;
  }

  async getAll() {
    const allItems = await Statement.findAll();
    return allItems;
  }

  async remove(statementId) {
    const statement = await Statement.findOne({ where: { id: statementId } });
    if (!statement) {
      console.log('Заявки не существует');
    }
    await Statement.destroy({ where: { id: statementId } });
    return statement;
  }
}

export default new StatementService();
