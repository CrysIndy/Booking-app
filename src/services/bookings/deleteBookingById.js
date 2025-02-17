import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const deleteBookingById = async (id) => {
	const booking = await prisma.booking.deleteMany({
		where: {id},
	});

	return booking.count > 0 ? id : null;
};

export default deleteBookingById;
