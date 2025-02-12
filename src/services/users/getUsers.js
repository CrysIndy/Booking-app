import {PrismaClient} from "@prisma/client";

const getUsers = async () => {
	const prisma = new PrismaClient();
	const users = await prisma.user.findMany({
		select: {
			id: true,
			username: true,
			email: true,
			phoneNumber: true,
			profilePicture: true,
		},
	});

	return users;
};

export default getUsers;
