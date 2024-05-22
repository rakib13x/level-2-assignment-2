import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { productRoutes } from "./app/routes/product.route";
import { connectDB } from "./server";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || "";
console.log("MongoDB URI:", mongoURI);

//parsers
app.use(express.json());
app.use(cors());
connectDB(mongoURI);

//app routes
app.use("/api/v1/products", productRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is working on http:localhost:${port}`);
});

export default app;
