import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const createReview = async (userId, propertyId, rating, comment) => {
	return await prisma.review.create({
		data: {
			userId,
			propertyId,
			rating,
			comment,
		},
	});
};

export default createReview;
