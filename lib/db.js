import fs from "fs";
import path from "path";

const usersPath = path.join(process.cwd(), "data", "users.json");
const productsPath = path.join(process.cwd(), "data", "products.json");

export function readUsers() {
  const raw = fs.readFileSync(usersPath, "utf-8");
  return JSON.parse(raw);
}

export function writeUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf-8");
}

export function readProducts() {
  const raw = fs.readFileSync(productsPath, "utf-8");
  return JSON.parse(raw);
}
