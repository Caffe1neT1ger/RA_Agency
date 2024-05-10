import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError } from '../error/ApiError.js';
const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserService {
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest('Пользовтеля с таким e-mail не существует');
    }
    let comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw ApiError.BadRequest('Указан неверный пароль');
    }

    const token = generateJWT(user.id, user.email, user.role);
    return token;
  }
  async checkHash(password) {
    console.log(bcrypt.hash(password, 5));
    return await bcrypt.hash(password, 5);
  }
  async check(id, email, role) {
    return generateJWT(id, email, role);
  }
}

export default new UserService();
