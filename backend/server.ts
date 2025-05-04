import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/product-routes";
import couponRoutes from "./routes/coupon-routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet()); // middleware de segurança que ajuda a proteger o app definindo cabeçalhos HTTP

app.use("/api/products", productRoutes);
app.use("/api/coupons", couponRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
