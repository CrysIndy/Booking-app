import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const deleteReviewById = async (id) => {
	try {
		const review = await prisma.review.findUnique({
			where: {id},
		});

		if (!review) {
			return null;
		}

		const deletedReview = await prisma.review.delete({
			where: {id},
		});

		return deletedReview;
	} catch (error) {
		console.error("Error deleting review:", error);
		throw error;
	}
};

export default deleteReviewById;
