import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const createBooking = async (
	checkinDate,
	checkoutDate,
	numberOfGuests,
	totalPrice,
	bookingStatus,
	userId,
	propertyId,
) => {
	return prisma.booking.create({
		data: {
			checkinDate,
			checkoutDate,
			numberOfGuests,
			totalPrice,
			bookingStatus,
			user: {connect: {id: userId}},
			property: {connect: {id: propertyId}},
		},
	});
};

export default createBooking;
