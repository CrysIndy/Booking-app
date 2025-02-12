import {PrismaClient} from "@prisma/client";

const createReview = async (name) => {
	const newReview = {
		rating,
		comment,
	};

	const prisma = new PrismaClient();
	const review = await prisma.review.create({
		data: newReview,
	});

	return review;
};

export default createReview;
