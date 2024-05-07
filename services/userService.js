import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserService {
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal('Пользовтеля с таким e-mail не существует'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'));
    }

    const token = generateJWT(user.id, user.email, user.role);
    return token;
  }
  async checkHash(password) {
    return await bcrypt.hash(password, 5);
  }
  async check(id, email, role) {
    return generateJWT(id, email, role);
  }
}

export default new UserService();