import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { AppDataSource } from "./data-source";
import authRouter from "./routes/auth";
import membersRouter from "./routes/members";
import accountsRouter from "./routes/accounts";
import transactionsRouter from "./routes/transactions";
import reportsRouter from "./routes/reports";
import usersRouter from "./routes/users";
import auditRouter from "./routes/audit";
import transferRouter from "./routes/transfer";
// Centralized error handler (should be last)
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

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

// Register routers
app.use("/auth", authRouter);
app.use("/members", membersRouter);
app.use("/accounts", accountsRouter);
app.use("/transactions", transactionsRouter);
app.use("/reports", reportsRouter);
app.use("/users", usersRouter);
app.use("/audit", auditRouter);
app.use("/transfer", transferRouter);

// Centralized error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch(err => {
  console.error("DB connection failed", err);
});
