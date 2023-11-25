const service = require("./movies.service");

//middleware
async function validateMovieId(req, res, next) {
	const { movieId } = req.params;
	const movie = await service.read(Number(movieId));

	if(movie) {
		res.locals.movie = movie;
		return next();
	}

	next({
		status: 404,
		message: "Movie cannot be found."
	});
}

//http functions
async function list(req, res) {
	const { is_showing = false } = req.query;
	res.json({ data: await service.list(Boolean(is_showing)) });
}

async function read(req, res) {
	res.json({ data: res.locals.movie });
}


module.exports = {
	list,
	read: [validateMovieId, read],
	validateMovieId,
};