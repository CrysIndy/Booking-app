import {PrismaClient} from "@prisma/client";

const getAmenity = async () => {
	const prisma = new PrismaClient();
	const amenity = await prisma.amenity.findMany();

	return amenity;
};

export default getAmenity;
