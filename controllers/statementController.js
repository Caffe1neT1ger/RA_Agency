import { Statement, OwnerData } from '../models/index.js';
import mailService from '../services/mailService.js';

class StatementController {
  async create(req, res, next) {
    const { name, phone, email, text, consultation } = req.body;

    try {
      if (typeof consultation !== 'boolean') {
        consultation = true;
      }
      const statement = await Statement.create({ name, phone, email, text, consultation: consultation });

      const ownerData = await OwnerData.findAll();

      if (!ownerData) {
        return next(ApiError.BadRequest('Данных не существует'));
      }

      const ownerEmail = ownerData[0].dataValues.email;

      await mailService.sendStatementMail(ownerEmail, name, phone, email, text, consultation);

      return res.json(statement);
    } catch (error) {
      return next(error);
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const statement = await Statement.findOne({ where: { id } });
      if (!statement) {
        return next(ApiError.BadRequest('Заявки не существует'));
      }
      return res.json(statement);
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const allItems = await Statement.findAll();
      return res.json({ allItems });
    } catch (error) {
      return next(error);
    }
  }

  async remove(req, res, next) {
    const { statementId } = req.body;
    try {
      const statement = await Statement.findOne({ where: { id: statementId } });
      if (!statement) {
        return next(ApiError.BadRequest('Заявки не существует'));
      }
      await Statement.destroy({ where: { id: statementId } });
      return res.json(statement);
    } catch (error) {
      return next(error);
    }
  }
}

export default new StatementController();
