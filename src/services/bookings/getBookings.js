import {PrismaClient} from "@prisma/client";

const getBooking = async () => {
	const prisma = new PrismaClient();

	return prisma.booking.findMany();
};

export default getBooking;
