import statementService from '../services/statementService.js';
class StatementController {
  async create(req, res, next) {
    const { name, phone, email, text, consultation } = req.body;

    try {
      const statement = await statementService.create(name, phone, email, text, consultation);
      return res.json(statement);
    } catch (error) {
      return next(error);
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const statement = await statementService.getOne(id);
      return res.json(statement);
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const allItems = await statementService.getAll();
      allItems;
    } catch (error) {
      return next(error);
    }
  }

  async remove(req, res, next) {
    const { statementId } = req.body;
    try {
      const removedStatement = await statementService.remove(statementId);
      return res.json(removedStatement);
    } catch (error) {
      return next(error);
    }
  }
}

export default new StatementController();
