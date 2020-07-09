import { open } from "sqlite";
import sqlite3 from "sqlite3";

// export sqlite.open() as a function to reuse
export async function openDB() {
  return open({
    filename: "./microphones.sqlite",
    driver: sqlite3.Database
  });
}
