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
	return prisma.host.create({
		data: {username, password, name, email, phoneNumber, profilePicture, aboutMe},
	});
};

export default createHost;
