import {PrismaClient} from "@prisma/client";

const getHosts = async () => {
	const prisma = new PrismaClient();
	const host = await prisma.host.findMany();

	return host;
};

export default getHosts;
