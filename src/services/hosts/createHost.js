import {PrismaClient} from "@prisma/client";

const createHost = async (name) => {
	const newHost = {
		name,
		email,
		phoneNumber,
		profilePicture,
		aboutMe,
	};

	const prisma = new PrismaClient();
	const host = await prisma.host.create({
		data: newHost,
	});

	return host;
};

export default createHost;
