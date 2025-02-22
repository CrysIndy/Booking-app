import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const createHost = async (
	username,
	password,
	name,
	email,
	phoneNumber,
	profilePicture,
	aboutMe,
) => {
	const existingHost = await prisma.host.findUnique({
		where: {username},
	});

	if (existingHost) {
		throw new Error("Username is already taken");
	}

	return prisma.host.create({
		data: {
			username,
			password,
			name,
			email,
			phoneNumber,
			profilePicture,
			aboutMe,
		},
	});
};

export default createHost;
