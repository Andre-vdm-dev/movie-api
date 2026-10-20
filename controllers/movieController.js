// Load the movies array from the data file
const movies = require("../data/movies");

// Next ID to give a new movie (starts after the highest existing ID)
let nextId = movies.length + 1;

// Turns the :id from the URL into a number, or null if it's not valid (e.g. "abc")
const parseId = (idParam) => {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
};

// Checks movie data. requireAll = true for POST, false for PUT
const validateMovie = (body, requireAll) => {
  const errors = [];
  const { title, genre, year, watched } = body;

  if (requireAll || title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      errors.push("title is required and must be text");
    }
  }
  if (requireAll || genre !== undefined) {
    if (typeof genre !== "string" || genre.trim() === "") {
      errors.push("genre is required and must be text");
    }
  }
  if (requireAll || year !== undefined) {
    if (!Number.isInteger(year) || year < 1888) {
      errors.push("year is required and must be a whole number (e.g. 2010)");
    }
  }
  if (requireAll || watched !== undefined) {
    if (typeof watched !== "boolean") {
      errors.push("watched is required and must be true or false");
    }
  }
  return errors;
};

// GET /api/movies – return all movies
const getAllMovies = (req, res) => {
  res.status(200).json(movies);
};

// GET /api/movies/:id – return one movie
const getMovieById = (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return res.status(404).json({ message: `Movie with ID ${id} not found` });
  }

  res.status(200).json(movie);
};

// POST /api/movies – add a new movie
const createMovie = (req, res) => {
  // NEW: check the data first
  const errors = validateMovie(req.body || {}, true);
  if (errors.length > 0) {
    return res.status(400).json({ message: "Invalid movie data", errors });
  }

  const { title, genre, year, watched } = req.body;

  const newMovie = {
    id: nextId++,
    title,
    genre,
    year,
    watched,
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
};

// PUT /api/movies/:id – update a movie
const updateMovie = (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: "Invalid movie ID. ID must be a positive number." });
  }

  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return res.status(404).json({ message: `Movie with ID ${id} not found` });
  }

  const { title, genre, year, watched } = req.body;

  // NEW: nothing was sent to update
  if (title === undefined && genre === undefined && year === undefined && watched === undefined) {
    return res.status(400).json({ message: "Send at least one field to update: title, genre, year, watched" });
  }

  // NEW: check the data that was sent
  const errors = validateMovie(req.body, false);
  if (errors.length > 0) {
    return res.status(400).json({ message: "Invalid movie data", errors });
  }

  // Only change the fields that were sent
  if (title !== undefined) movie.title = title;
  if (genre !== undefined) movie.genre = genre;
  if (year !== undefined) movie.year = year;
  if (watched !== undefined) movie.watched = watched;

  res.status(200).json(movie);
};

// DELETE /api/movies/:id – remove a movie
const deleteMovie = (req, res) => {
  const id = Number(req.params.id);
  const index = movies.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Movie with ID ${id} not found` });
  }

  const deletedMovie = movies.splice(index, 1)[0];
  res.status(200).json({ message: "Movie deleted", movie: deletedMovie });
};

// Export the functions so the routes file can use them
module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};