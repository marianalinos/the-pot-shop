import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet()); // middleware de segurança que ajuda a proteger o app definindo cabeçalhos HTTP
app.use(morgan("dev")); // log requests

// aplicar arcjet rate-limiting para todas as rotas
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too many requests." });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bots are not allowed." });
      } else {
        res.status(403).json({ error: "Access denied." });
      }
      return;
    }
    //check for spoofed bots
    if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      res.status(403).json({ error: "Spoofed bot detected." });
      return;
    }
  } catch (error) {
    console.error("Error in arcjet middleware: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api/products", productRoutes);

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
  } catch (error) {
    console.error("Error initializing database: ", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
