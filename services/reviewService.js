import { Review } from '../index.js';

class ReviewService {
  async create(author, text) {
    const newReview = await Review.create({
      author,
      text,
      link,
    });

    return newReview;
  }

  async remove(reviewId) {
    const review = await Review.findOne({ where: { id: reviewId } });

    if (!review) {
      return ApiError.BadRequest('Отзыва не  существует');
    }

    const removedReview = await Review.destroy({ where: { id: reviewId }, returning: true });
    return removedReview;
  }

  async getAll(limit, page) {
    const offset = (page - 1) * limit;

    const allItems = await Review.findAll({
      offset,
      limit,
    });
    return allItems;
  }

  async getOne(reviewId) {
    const review = await Review.findOne({
      where: { id: reviewId },
    });
    if (!review) {
      return ApiError.BadRequest('Отзыва не существует');
    }
    return review;
  }
}

export default new ReviewService();
