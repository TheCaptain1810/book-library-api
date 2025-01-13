const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory book collection
let books = [];

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Get a book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// Add a new book
app.post("/books", (req, res) => {
  const { title, author, genre, year } = req.body;
  if (!title || !author)
    return res.status(400).json({ error: "Title and author are required" });

  const newBook = { id: uuidv4(), title, author, genre, year };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book by ID
app.put("/books/:id", (req, res) => {
  const { title, author, genre, year } = req.body;
  const bookIndex = books.findIndex((b) => b.id === req.params.id);
  if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });

  books[bookIndex] = { ...books[bookIndex], title, author, genre, year };
  res.json(books[bookIndex]);
});

// Delete a book by ID
app.delete("/books/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === req.params.id);
  if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });

  books.splice(bookIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
