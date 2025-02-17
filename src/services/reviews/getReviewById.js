import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const getReviewById = async (id) => {
	return await prisma.review.findUnique({
		where: {id},
	});
};

export default getReviewById;
