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
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const {id} = req.params;
		const booking = await getBookingById(id);

		if (!booking) {
			res.status(404).json({message: `Booking with id ${id} not found`});
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
