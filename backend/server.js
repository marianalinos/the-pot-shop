import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet()); // middleware de segurança que ajuda a proteger o app definindo cabeçalhos HTTP
app.use(morgan("dev")); // log requests

app.use("/api/products", productRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/carts', cartRoutes);

// Database initialization
async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        image VARCHAR(255) NOT NULL
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS coupons (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        discount NUMERIC(10, 2) NOT NULL
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        wallet NUMERIC(10, 2) NOT NULL
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS carts (
        id SERIAL PRIMARY KEY,
        total NUMERIC(10, 2) NOT NULL,
        products INT[] NOT NULL, 
        coupon_id INT,
        FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE SET NULL
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        status BOOLEAN NOT NULL,
        customer_id INT REFERENCES customers(id) ON DELETE SET NULL,
        cart_id INT REFERENCES carts(id) ON DELETE SET NULL
      )
    `;
    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
