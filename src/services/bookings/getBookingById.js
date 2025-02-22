import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const getBookingById = async (id, userId) => {
	return prisma.booking.findFirst({
		where: {
			id,
			userId,
		},
	});
};

export default getBookingById;
