import {Router} from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const reviews = await getReviews();
		res.json(reviews);
	} catch (error) {
		next(error);
	}
});

router.post("/", auth, async (req, res, next) => {
	try {
		const {userId, propertyId, rating, comment} = req.body;

		if (!userId || !propertyId || !rating || !comment) {
			return res.status(400).json({message: "All fields are required"});
		}

		const newReview = await createReview(userId, propertyId, rating, comment);
		res.status(201).json(newReview);
	} catch (error) {
		console.error("Error creating review:", error);

		if (
			error.message === "User id is not valid" ||
			error.message === "Rating is not valid"
		) {
			return res.status(400).json({message: error.message});
		}

		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const {id} = req.params;
		const review = await getReviewById(id);

		if (!review) {
			res.status(404).json({message: `Review with id ${id} not found`});
		} else {
			res.status(200).json(review);
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", auth, async (req, res, next) => {
	try {
		const {id} = req.params;
		const deletedReview = await deleteReviewById(id);

		if (!deletedReview) {
			return res.status(404).json({
				message: `Review with id ${id} not found`,
			});
		}

		res.status(200).json({
			message: `Review with id ${id} successfully deleted`,
			deletedReview,
		});
	} catch (error) {
		console.error("Error during deletion:", error);
		res.status(500).json({message: "Internal Server Error", error: error.message});
	}
});

router.put("/:id", auth, async (req, res, next) => {
	try {
		const {id} = req.params;
		const {userId, propertyId, rating, comment} = req.body;
		const review = await updateReviewById(id, {userId, propertyId, rating, comment});

		if (review) {
			res.status(200).send({
				message: `Review with id ${id} successfully updated`,
			});
		} else {
			res.status(404).json({
				message: `Review with id ${id} not found`,
			});
		}
	} catch (error) {
		next(error);
	}
});

export default router;
