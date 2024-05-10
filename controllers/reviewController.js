import reviewService from '../services/reviewService.js';
import { Review } from '../models/index.js';
class ReviewController {
  async create(req, res, next) {
    const { author, text, link } = req.body;

    try {
      const newReview = await Review.create({
        author,
        text,
        link,
      });
      return res.json(newReview);
    } catch (error) {
      return next(error);
    }
  }

  async remove(req, res, next) {
    const { reviewId } = req.body;

    try {
      const review = await Review.findOne({ where: { id: reviewId } });

      if (!review) {
        return next(ApiError.BadRequest('Отзыва не  существует'));
      }

      const removedReview = await Review.destroy({ where: { id: reviewId }, returning: true });
      return res.json(removedReview);
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req, res, next) {
    const { limit = 9, page = 1 } = req.body;

    try {
      const offset = (page - 1) * limit;

      const allItems = await Review.findAll({
        offset,
        limit,
      });
      return res.json(allItems);
    } catch (error) {
      return next(error);
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const review = await Review.findOne({
        where: { id: id },
      });
      if (!review) {
        return next(ApiError.BadRequest('Отзыва не существует'));
      }
      return res.json(review);
    } catch (error) {
      return next(error);
    }
  }
}

export default new ReviewController();
