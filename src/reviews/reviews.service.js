const knex = require("../db/connection");

function readCritics(critic_id) {
  // returns filtered critic fields
  return knex("critics")
    .where({ critic_id: parseInt(critic_id) })
    .select("*")
    .first();
}

function update(updatedReview) {
  // updates review and then return the updated review
  return knex("reviews")
    .where({ review_id: parseInt(updatedReview.review_id) })
    .update(updatedReview, ["content", "review_id"])
    .then((updatedRecords) => {
      return knex("reviews")
        .select("*")
        .where({ review_id: parseInt(updatedReview.review_id) })
        .first();
    });
}

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

function list(movie_id) {
  if (movie_id) {
    // returns both a critics and reviews tables to be formatted in controller
    return knex("reviews as r")
      .where({ movie_id })
      .select("r.*")
      .then((reviews) => {
        return knex("critics as c")
          .join("reviews as r", "c.critic_id", "r.critic_id")
          .where({ movie_id })
          .select("c.*")
          .then((critics) => ({
            critics,
            reviews,
          }));
      });
  }
  return knex("reviews")
    .select("*")
    .then((reviews) => ({ critics: [], reviews }));
}

module.exports = {
  update,
  read,
  readCritics,
  delete: destroy,
  list,
};