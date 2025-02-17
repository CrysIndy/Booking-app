import {PrismaClient} from "@prisma/client";

const createAmenity = async (name) => {
	const prisma = new PrismaClient();
	return await prisma.amenity.create({
		data: {name},
	});
};

export default createAmenity;
