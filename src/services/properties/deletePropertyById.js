import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const deletePropertyById = async (id) => {
	try {
		const property = await prisma.property.findFirst({
			where: {id},
		});

		if (!property) {
			return null;
		}

		const deletedProperty = await prisma.property.delete({
			where: {id},
		});

		return deletedProperty;
	} catch (error) {
		console.error("Error deleting Property:", error);
		throw error;
	}
};
export default deletePropertyById;
