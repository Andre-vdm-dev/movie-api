// In-memory movie data (no database for this project).
// This resets every time the server restarts.

const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", year: 2010, watched: true },
  { id: 2, title: "The Dark Knight", genre: "Action", year: 2008, watched: true },
  { id: 3, title: "Interstellar", genre: "Sci-Fi", year: 2014, watched: false },
  { id: 4, title: "The Grand Budapest Hotel", genre: "Comedy", year: 2014, watched: false },
  { id: 5, title: "Parasite", genre: "Thriller", year: 2019, watched: true },
];

// Export the array so the controller can use it
module.exports = movies;