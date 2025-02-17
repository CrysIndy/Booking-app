import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const createProperty = async (
	title,
	description,
	location,
	pricePerNight,
	bedroomCount,
	bathRoomCount,
	maxGuestCount,
	hostId,
	rating,
) => {
	return await prisma.property.create({
		data: {
			title,
			description,
			location,
			pricePerNight,
			bedroomCount,
			bathRoomCount,
			maxGuestCount,
			hostId,
			rating,
		},
	});
};

export default createProperty;
