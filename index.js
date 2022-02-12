const server = require('./api/server')

require('dotenv').config();

const PORT = process.env.PORT || 9008;

server.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})