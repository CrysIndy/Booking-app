import {Router} from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const {username, email} = req.query;
		const users = await getUsers(username, email);
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const {email, username, password, name, phoneNumber, profilePicture} = req.body;

		if (!email || !username || !password || !name || !phoneNumber || !profilePicture) {
			return res.status(400).json({message: "All fields are required"});
		}

		const newUser = await createUser(
			email,
			username,
			password,
			name,
			phoneNumber,
			profilePicture,
		);

		res.status(201).json(newUser);
	} catch (error) {
		console.error("Error creating user:", error);

		if (error.code === "P2002" && error.meta?.target?.includes("email")) {
			return res.status(400).json({message: "Email is already taken"});
		}

		if (error.message === "Email is already taken") {
			return res.status(400).json({message: error.message});
		}

		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const {id} = req.params;
		const user = await getUserById(id);

		if (!user) {
			res.status(404).json({message: `User with id ${id} not found`});
		} else {
			res.status(200).json(user);
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", auth, async (req, res, next) => {
	try {
		const {id} = req.params;
		const user = await deleteUserById(id);

		if (user) {
			res.status(200).send({
				message: `User with id ${id} successfully deleted`,
				user,
			});
		} else {
			res.status(404).json({
				message: `User with id ${id} not found`,
			});
		}
	} catch (error) {
		next(error);
	}
});

router.put("/:id", auth, async (req, res, next) => {
	try {
		const {id} = req.params;
		const {name, password, username, image} = req.body;
		const user = await updateUserById(id, {name, password, username, image});

		if (user) {
			res.status(200).send({
				message: `User with id ${id} successfully updated`,
			});
		} else {
			res.status(404).json({
				message: `User with id ${id} not found`,
			});
		}
	} catch (error) {
		next(error);
	}
});

export default router;
