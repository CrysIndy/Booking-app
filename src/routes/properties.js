import {Router} from "express";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const {location, pricePerNight, amenities} = req.query;
		const properties = await getProperties(location, pricePerNight, amenities);
		res.json(properties);
	} catch (error) {
		console.error("Error fetching properties:", error);
		next(error);
	}
});

router.post("/", auth, async (req, res, next) => {
	try {
		const {
			title,
			description,
			location,
			pricePerNight,
			bedroomCount,
			bathRoomCount,
			maxGuestCount,
			rating,
			hostId,
		} = req.body;

		if (
			!title ||
			!description ||
			!location ||
			!pricePerNight ||
			!bedroomCount ||
			!bathRoomCount ||
			!maxGuestCount ||
			!rating ||
			!hostId
		) {
			return res.status(400).json({message: "All fields are required"});
		}

		const newProperty = await createProperty(
			title,
			description,
			location,
			pricePerNight,
			bedroomCount,
			bathRoomCount,
			maxGuestCount,
			hostId,
			Number(rating),
		);

		res.status(201).json(newProperty);
	} catch (error) {
		console.error("Error creating property:", error);

		if (
			error.message === "Title is not valid" ||
			error.message === "Description is not valid" ||
			error.message === "Location is not valid" ||
			error.message === "Price per night is not valid" ||
			error.message === "Bedrooms are not valid" ||
			error.message === "Bathrooms are not valid" ||
			error.message === "Maximum guests is not valid" ||
			error.message === "Rating is not valid"
		) {
			return res.status(400).json({message: error.message});
		}

		next(error);
	}
});
router.get("/:id", async (req, res, next) => {
	try {
		const {id} = req.params;
		const property = await getPropertyById(id);

		if (!property) {
			res.status(404).json({message: `Property with id ${id} not found`});
		} else {
			res.status(200).json(property);
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", auth, async (req, res, next) => {
	try {
		const {id} = req.params;
		const deletedProperty = await deletePropertyById(id);

		if (deletedProperty === null) {
			return res.status(404).json({
				message: `Property with id ${id} not found`,
			});
		}

		res.status(200).json({
			message: `Property with id ${id} successfully deleted`,
			deletedProperty,
		});
	} catch (error) {
		console.error("Error during deletion:", error);
		res.status(500).json({message: "Internal Server Error", error: error.message});
	}
});

router.put("/:id", auth, async (req, res, next) => {
	try {
		const {id} = req.params;
		const {
			title,
			description,
			location,
			pricePerNight,
			bedroomCount,
			bathRoomCount,
			maxGuestCount,
			PropertyId,
			rating,
		} = req.body;
		const property = await updatePropertyById(id, {
			title,
			description,
			location,
			pricePerNight,
			bedroomCount,
			bathRoomCount,
			maxGuestCount,
			PropertyId,
			rating,
		});

		if (property) {
			res.status(200).send({
				message: `Property with id ${id} successfully updated`,
			});
		} else {
			res.status(404).json({
				message: `Property with id ${id} not found`,
			});
		}
	} catch (error) {
		next(error);
	}
});

export default router;
