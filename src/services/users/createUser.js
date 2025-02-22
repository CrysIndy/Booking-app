import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const createUser = async (
	email,
	username,
	password,
	name,
	phoneNumber,
	profilePicture,
) => {
	const existingUser = await prisma.user.findFirst({where: {username}});

	if (existingUser) {
		throw new Error("Username is already taken");
	}

	return prisma.user.create({
		data: {
			email,
			username,
			password,
			name,
			phoneNumber,
			profilePicture,
		},
	});
};

export default createUser;
