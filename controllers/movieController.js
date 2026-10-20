// Load the movies array from the data file
const movies = require("../data/movies");

// Next ID to give a new movie (starts after the highest existing ID)
let nextId = movies.length + 1;

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
  const id = Number(req.params.id);
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return res.status(404).json({ message: `Movie with ID ${id} not found` });
  }

  const { title, genre, year, watched } = req.body;

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