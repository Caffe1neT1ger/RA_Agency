import reviewService from '../services/reviewService.js';
class ReviewController {
  async create(req, res, next) {
    const { author, text, link } = req.body;

    try {
      const newReview = await reviewService.create(author, text, link);
      res.json(newReview);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    const { reviewId } = req.body;

    try {
      const removedReview = await reviewService.remove(reviewId);
      res.json(removedReview);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    const { limit = 9, page = 1 } = req.body;

    try {
      const allItems = await reviewService.getAll(limit, page);
      res.json(allItems);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const review = await reviewService.getOne(id);
      res.json(review);
    } catch (error) {
      next(error);
    }
  }
}

export default new ReviewController();
