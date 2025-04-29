import { sql } from "../config/db.js";

export const Product = {
  getAll: async () => {
    return await sql`SELECT * FROM products ORDER BY id DESC`;
  },

  getById: async (id) => {
    const result = await sql`SELECT * FROM products WHERE id = ${id}`;
    return result.length > 0 ? result[0] : null;
  },

  create: async ({ name, price, image }) => {
    return await sql`
      INSERT INTO products (name, price, image)
      VALUES (${name}, ${price}, ${image})
      RETURNING *
    `;
  },

  update: async (id, { name, price, image }) => {
    return await sql`
      UPDATE products
      SET name = ${name}, price = ${price}, image = ${image}
      WHERE id = ${id}
      RETURNING *
    `;
  },

  delete: async (id) => {
    return await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING *
    `;
  }
};