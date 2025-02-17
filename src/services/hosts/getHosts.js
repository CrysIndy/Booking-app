import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const getHosts = async (name) => {
	return prisma.host.findMany({
		where: name ? {name} : {},
	});
};

export default getHosts;
