#!usr/bin/env node

// import minimist and express
import minimist from "minimist"
import express from 'express'

const args = minimist(process.argv.slice(2))
const port = args.port || 5000
const app = express()

app.use(express.urlencoded({extended: true}));

// root endpoint
app.get('/app/', (req, res) => {
	res.status(200).send("200 OK")
});

app.listen(port, () => {
	console.log("Server listening on port " + port)
})