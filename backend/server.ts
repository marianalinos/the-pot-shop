import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/product-routes";
import couponRoutes from "./routes/coupon-routes";
import customerRoutes from "./routes/customer-routes";
import cartRoutes from "./routes/cart-routes";
import orderRoutes from "./routes/order-routes";
import cartProductRoutes from "./routes/cart-product-routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet()); // middleware de segurança que ajuda a proteger o app definindo cabeçalhos HTTP

app.use("/api/products", productRoutes);
app.use("/api/coupons", couponRoutes); 
app.use("/api/customers", customerRoutes); 
app.use("/api/orders", orderRoutes);
app.use("/api/carts", cartRoutes); 

app.use("/api/cartProducts", cartProductRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
