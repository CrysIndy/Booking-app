import {PrismaClient} from "@prisma/client";

const createUser = async (
	username,
	name,
	password,
	email,
	phoneNumber,
	profilePicture,
) => {
	const newUser = {
		name,
		username,
		password,
		phoneNumber,
		email,
		profilePicture,
	};

	const prisma = new PrismaClient();
	const user = await prisma.user.create({
		data: newUser,
	});

	return user;
};

export default createUser;
