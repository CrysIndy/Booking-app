import * as Sentry from "@sentry/node";
import express from "express";
import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import "dotenv/config";

const app = express();

Sentry.init({
	dsn: "https://98c12266482779a5631ff39380399f11@o4508660633370624.ingest.de.sentry.io/4508798113480784",
	integrations: [
		new Sentry.Integrations.Http({tracing: true}),

		new Sentry.Integrations.Express({app}),

		...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
	],

	tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.use(express.json());

app.use(log);

app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/login", loginRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.use(errorHandler);

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
