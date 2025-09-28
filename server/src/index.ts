import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { AppDataSource } from "./data-source";

const app = express();
app.use(helmet());
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
}));

// Basic route
app.get("/health", (req, res) => res.json({ status: "ok" }));

// TODO: register other routers: auth, members, accounts, transactions, reports
import transferRouter from "./routes/transfer";
app.use("/transfer", transferRouter);
// ...existing code...
// Register routers here

// Centralized error handler (should be last)
import { errorHandler } from "./middleware/errorHandler";
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch(err => {
  console.error("DB connection failed", err);
});
