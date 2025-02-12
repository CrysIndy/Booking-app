import {PrismaClient} from "@prisma/client";

const getReviews = async () => {
	const prisma = new PrismaClient();
	const review = await prisma.review.findMany();

	return review;
};

export default getReviews;
