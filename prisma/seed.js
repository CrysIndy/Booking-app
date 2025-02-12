import {PrismaClient} from "@prisma/client";
import amenitiesData from "../src/data/amenities.json" assert {type: "json"};
import usersData from "../src/data/users.json" assert {type: "json"};
import bookingsData from "../src/data/bookings.json" assert {type: "json"};
import hostsData from "../src/data/hosts.json" assert {type: "json"};
import propertiesData from "../src/data/properties.json" assert {type: "json"};
import reviewsData from "../src/data/reviews.json" assert {type: "json"};

const prisma = new PrismaClient({log: ["query", "info", "warn", "error"]});

async function main() {
	const {amenities} = amenitiesData;
	const {users} = usersData;
	const {bookings} = bookingsData;
	const {hosts} = hostsData;
	const {properties} = propertiesData;
	const {reviews} = reviewsData;

	for (const host of hosts) {
		await prisma.host.upsert({
			where: {id: host.id},
			update: {},
			create: {
				id: host.id,
				username: host.username,
				password: host.password,
				name: host.name,
				email: host.email,
				phoneNumber: host.phoneNumber,
				profilePicture: host.profilePicture,
				aboutMe: host.aboutMe,
			},
		});
	}

	for (const property of properties) {
		await prisma.property.upsert({
			where: {id: property.id},
			update: {},
			create: {
				id: property.id,
				title: property.title,
				description: property.description,
				location: property.location,
				pricePerNight: property.pricePerNight,
				bedroomCount: property.bedroomCount,
				bathRoomCount: property.bathRoomCount,
				maxGuestCount: property.maxGuestCount,
				hostId: property.hostId,
				rating: property.rating,
				amenities: property.amenities,
			},
		});
	}

	for (const amenity of amenities) {
		await prisma.amenity.upsert({
			where: {id: amenity.id},
			update: {},
			create: {
				id: amenity.id,
				name: amenity.name,
				properties: amenity.properties,
			},
		});
	}

	for (const user of users) {
		await prisma.user.upsert({
			where: {id: user.id},
			update: {},
			create: {
				id: user.id,
				username: user.username,
				password: user.password,
				name: user.name,
				email: user.email,
				phoneNumber: user.phoneNumber,
				profilePicture: user.profilePicture,
			},
		});
	}

	for (const booking of bookings) {
		await prisma.booking.upsert({
			where: {id: booking.id},
			update: {},
			create: {
				id: booking.id,
				userId: booking.userId,
				propertyId: booking.propertyId,
				checkinDate: booking.checkinDate,
				checkoutDate: booking.checkoutDate,
				numberOfGuests: booking.numberOfGuests,
				totalPrice: booking.totalPrice,
				bookingStatus: booking.bookingStatus,
			},
		});
	}

	for (const review of reviews) {
		await prisma.review.upsert({
			where: {id: review.id},
			update: {},
			create: {
				id: review.id,
				userId: review.userId,
				propertyId: review.propertyId,
				rating: review.rating,
				comment: review.comment,
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
