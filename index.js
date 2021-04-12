const server = require('./api/server');

const port = 1234;

// require your server and launch it here
server.listen (port, () => {
	console.log("running at http://localhost:1234")
})