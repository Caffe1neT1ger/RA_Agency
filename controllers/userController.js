import userService from '../services/userService.js';
import { validationResult } from 'express-validator';
class UserController {
  async login(req, res, next) {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Ошибки привалидации', errors.array()));
    }
    const { email, password } = req.body;
    const userData = await userService.login(email, password);

    res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    return res.json(userData);
  }
  catch(error) {
    next(error);
  }

  async refresh(req, res, next) {
    try {
      const token = await userService.check(req.user.id, req.user.email, req.user.role);
      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }
  async checkHash(req, res, next) {
    try {
      const token = await userService.checkHash(req.body.password);
      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
