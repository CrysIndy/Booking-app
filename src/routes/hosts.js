import {Router} from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostById from "../services/hosts/getHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const {name} = req.query;
		const hosts = await getHosts(name);
		res.json(hosts);
	} catch (error) {
		next(error);
	}
});

router.post("/", auth, async (req, res, next) => {
	try {
		const {username, password, name, email, phoneNumber, profilePicture, aboutMe} =
			req.body;

		if (
			!username ||
			!password ||
			!name ||
			!email ||
			!phoneNumber ||
			!profilePicture ||
			!aboutMe
		) {
			return res.status(400).json({message: "All fields are required"});
		}

		const newHost = await createHost(
			req.body.username,
			req.body.password,
			name,
			email,
			phoneNumber,
			profilePicture,
			aboutMe,
		);

		res.status(201).json(newHost);
	} catch (error) {
		console.error("Error creating host:", error);

		if (error.code === "P2002" && error.meta?.target?.includes("username")) {
			return res.status(400).json({message: "Username is already taken"});
		}

		if (error.message === "Username is already taken") {
			return res.status(400).json({message: error.message});
		}

		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const {id} = req.params;
		const host = await getHostById(id);

		if (!host) {
			res.status(404).json({message: `Host with id ${id} not found`});
		} else {
			res.status(200).json(host);
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", auth, async (req, res, next) => {
	try {
		const {id} = req.params;
		const deletedHost = await deleteHostById(id);

		if (!deletedHost) {
			return res.status(404).json({
				message: `Host with id ${id} not found`,
			});
		}

		res.status(200).json({
			message: `Host with id ${id} successfully deleted`,
			deletedHost,
		});
	} catch (error) {
		console.error("Error during deletion:", error);
		res.status(500).json({message: "Internal Server Error", error: error.message});
	}
});

router.put("/:id", auth, async (req, res, next) => {
	try {
		const {id} = req.params;
		const {name, email, phoneNumber, profilePicture, aboutMe} = req.body;
		const host = await updateHostById(id, {
			name,
			email,
			phoneNumber,
			profilePicture,
			aboutMe,
		});

		if (host) {
			res.status(200).send({
				message: `Host with id ${id} successfully updated`,
			});
		} else {
			res.status(404).json({
				message: `Host with id ${id} not found`,
			});
		}
	} catch (error) {
		next(error);
	}
});

export default router;
