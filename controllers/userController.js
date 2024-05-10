import { validationResult } from 'express-validator';
import { ApiError } from '../error/ApiError.js';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};
class UserController {
  async login(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Ошибки привалидации', errors.array()));
    }
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.BadRequest('Пользовтеля с таким e-mail не существует'));
    }
    let comparePassword = await bcrypt.compare(password, user.password);
    let tmp = await bcrypt.hash(password, 5);
    console.log(comparePassword, password, user.password, tmp);
    if (!comparePassword) {
      return next(ApiError.BadRequest('Указан неверный пароль'));
    }

    const token = generateJWT(user.id, user.email, user.role);

    res.cookie('refreshToken', token.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

    return res.json({ token });
  }
  catch(error) {
    return next(error);
  }

  async refresh(req, res, next) {
    try {
      const token = generateJWT(req.user.id, req.user.email, req.user.role);
      return res.json({ token });
    } catch (error) {
      return next(error);
    }
  }
  async checkHash(req, res, next) {
    try {
      console.log(await bcrypt.hash('Xzskuy63kU9oOfqB', 5));
      console.log(
        await bcrypt.compare('Xzskuy63kU9oOfqB', '$2b$05$ZRbVjp5azMOzx40w1TXUnOEqRMgS7AXoej13jiWtf0BpreErq5O5q'),
      );
      const token = await bcrypt.hash(req.body.password, 5);
      return res.json({ token });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
