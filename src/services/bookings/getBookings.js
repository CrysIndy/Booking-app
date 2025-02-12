import {PrismaClient} from "@prisma/client";

const getBooking = async (id, userId) => {
	const prisma = new PrismaClient();

	return prisma.booking.findMany({
		where: {
			id,
			userId,
		},
	});
};

export default getBooking;
