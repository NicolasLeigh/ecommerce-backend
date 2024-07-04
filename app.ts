import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import sellerRoutes from "./routes/sellerRoutes";
import homeRoutes from "./routes/home/homeRoutes";
import cardRoutes from "./routes/home/cardRoutes";
import orderRoutes from "./routes/order/orderRoutes";
import customerAuthRoutes from "./routes/home/customerAuthRoutes";
import dbConnect from "./utils/db";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser()); // cookieParser() must appear before the router
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", sellerRoutes);
app.use("/api/home", homeRoutes);
app.use("/api", customerAuthRoutes);
app.use("/api", cardRoutes);
app.use("/api", orderRoutes);

dbConnect();

app.get("/", (req, res) => res.send("Backend!!"));
const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
