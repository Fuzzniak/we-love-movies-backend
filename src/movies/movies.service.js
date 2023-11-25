const knex = require("../db/connection");

function moviesInTheaters(is_showing) {
  // return movies that are still in theaters
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": is_showing })
    .distinct();
}

function list(is_showing) {
  // filters movies that are showing in theaters
  if (is_showing) {
    return moviesInTheaters(Boolean(is_showing));
  }
  return knex("movies").select("*");
}

function read(movie_id) {
  return knex("movies").select("*").where({ movie_id: movie_id }).first();
}

module.exports = {
  list,
  read,
};