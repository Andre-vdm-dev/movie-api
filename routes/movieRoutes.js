const express = require("express");
const router = express.Router();

// Bring in the controller functions
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

// Connect each HTTP method + path to its controller
router.get("/", getAllMovies);        // GET    /api/movies
router.get("/:id", getMovieById);     // GET    /api/movies/:id
router.post("/", createMovie);        // POST   /api/movies
router.put("/:id", updateMovie);      // PUT    /api/movies/:id
router.delete("/:id", deleteMovie);   // DELETE /api/movies/:id

module.exports = router;