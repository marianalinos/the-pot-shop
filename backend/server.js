import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet()); // middleware de segurança que ajuda a proteger o app definindo cabeçalhos HTTP
app.use(morgan("dev")); // log requests

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
