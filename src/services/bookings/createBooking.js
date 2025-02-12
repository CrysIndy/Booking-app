import {PrismaClient} from "@prisma/client";

const createBooking = async (
	name,
	checkinDate,
	checkoutDate,
	numberOfGuests,
	totalPrice,
	bookingStatus,
) => {
	const newBooking = {
		name,
		checkinDate,
		checkoutDate,
		numberOfGuests,
		totalPrice,
		bookingStatus,
	};

	const prisma = new PrismaClient();
	const booking = await prisma.booking.create({
		data: newBooking,
	});

	return booking;
};

export default createBooking;
