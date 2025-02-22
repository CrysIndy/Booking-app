import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const getBookings = async (id, userId) => {
	return prisma.booking.findMany({
		where: {
			...(id && {id}),
			...(userId && {userId}),
		},
	});
};

export default getBookings;
