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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});