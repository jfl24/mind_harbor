import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import journalRoutes from "./routes/journal.routes.js";
import activitiesRoutes from "./routes/activites.routes.js";
import resourcesRoutes from "./routes/resources.routes.js";
import groupRoutes from "./routes/group.routes.js";

import { errorHandler } from "./middlewares/error.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/v1/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/journal", journalRoutes);
app.use("/api/v1/activities", activitiesRoutes);
app.use("/api/v1/resources", resourcesRoutes);
app.use("/api/v1/groups", groupRoutes);

// ... autres routeurs

app.use((_req, res) => {
  res
    .status(404)
    .json({ error: { code: "NOT_FOUND", message: "Route introuvable." } });
});

app.use(errorHandler);

export default app;