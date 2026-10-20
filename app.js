const express = require("express");
const movieRoutes = require("./routes/movieRoutes"); 

const app = express();
const PORT = 3000;

// Lets Express read JSON from request bodies (needed for POST and PUT)
app.use(express.json());

// Test route to check the server works
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Movie Watchlist API" });
});

// All movie routes start with /api/movies
app.use("/api/movies", movieRoutes);

// 404 for any route that doesn't exist (must come AFTER all routes)
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
});

// Error handler, e.g. when the request body is broken JSON
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Request body must be valid JSON" });
  }
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});