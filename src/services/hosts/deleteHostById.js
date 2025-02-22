import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const deleteHostById = async (id) => {
	try {
		const host = await prisma.host.findUnique({
			where: {id},
		});

		if (!host) {
			return null;
		}

		const deletedHost = await prisma.host.delete({
			where: {id},
		});

		return deletedHost;
	} catch (error) {
		console.error("Error deleting host:", error);
		throw error;
	}
};

export default deleteHostById;
