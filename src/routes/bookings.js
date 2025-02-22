import {Router} from "express";
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const {id, userId} = req.query;
		const bookings = await getBookings(id, userId);
		res.json(bookings);
	} catch (error) {
		next(error);
	}
});

router.post("/", auth, async (req, res, next) => {
	try {
		const {
			checkinDate,
			checkoutDate,
			numberOfGuests,
			totalPrice,
			bookingStatus,
			userId,
			propertyId,
		} = req.body;

		if (
			!checkinDate ||
			!checkoutDate ||
			!numberOfGuests ||
			!totalPrice ||
			!bookingStatus
		) {
			return res.status(400).json({message: "All fields are required"});
		}
		if (!userId || !propertyId) {
			return res.status(400).json({message: "User ID and Property ID are required"});
		}

		const newBooking = await createBooking(
			checkinDate,
			checkoutDate,
			numberOfGuests,
			totalPrice,
			bookingStatus,
			userId,
			propertyId,
		);
		res.status(201).json(newBooking);
	} catch (error) {
		console.error("Error creating booking:", error);

		if (
			error.message === "Checkin date is not valid" ||
			error.message === "Checkout date is not valid" ||
			error.message === "Number of guests is not valid" ||
			error.message === "Price total is not valid" ||
			error.message === "Booking status is not valid"
		) {
			return res.status(400).json({message: error.message});
		}

		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const {id} = req.params;
		const {userId} = req.query;

		const booking = await getBookingById(id, userId);

		if (!booking) {
			res.status(404).json({message: `Booking with id ${id} not found for this user`});
		} else {
			res.status(200).json(booking);
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", auth, async (req, res, next) => {
	try {
		const {id} = req.params;
		const booking = await deleteBookingById(id);

		if (booking) {
			res.status(200).send({
				message: `Booking with id ${id} successfully deleted`,
				booking,
			});
		} else {
			res.status(404).json({
				message: `Booking with id ${id} not found`,
			});
		}
	} catch (error) {
		next(error);
	}
});

router.put("/:id", auth, async (req, res, next) => {
	try {
		const {id} = req.params;
		const {checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus} =
			req.body;
		const booking = await updateBookingById(id, {
			checkinDate,
			checkoutDate,
			numberOfGuests,
			totalPrice,
			bookingStatus,
		});

		if (booking) {
			res.status(200).send({
				message: `Booking with id ${id} successfully updated`,
			});
		} else {
			res.status(404).json({
				message: `Booking with id ${id} not found`,
			});
		}
	} catch (error) {
		next(error);
	}
});

export default router;
