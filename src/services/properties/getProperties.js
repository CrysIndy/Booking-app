import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const getProperties = async (location, pricePerNight, amenities) => {
	return prisma.property.findMany({
		where: {
			...(location && {location}),
			...(pricePerNight && {pricePerNight: parseFloat(pricePerNight)}),
			...(amenities && {
				amenities: {
					some: {
						name: {in: amenities.split(",")},
					},
				},
			}),
		},
		include: {
			amenities: true,
		},
	});
};

export default getProperties;
