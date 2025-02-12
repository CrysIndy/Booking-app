import {PrismaClient} from "@prisma/client";

const createProperty = async (name) => {
	const newProperty = {
		title,
		description,
		location,
		pricePerNight,
		bedroomCount,
		bathRoomCount,
		maxGuestCount,
		hostId,
		rating,
	};

	const prisma = new PrismaClient();
	const property = await prisma.property.create({
		data: newProperty,
	});

	return property;
};

export default createProperty;
