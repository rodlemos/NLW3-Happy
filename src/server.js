//import dependencies
const express = require('express');
const path = require('path')
const pages = require('./pages')

//starting express
const server = express();
server
//use req body
.use(express.urlencoded({extended: true}))

//set static files
.use(express.static('public'))

//template engine
.set('views', path.join(__dirname, "views"))
.set('view engine','hbs')

//creating routes
.get('/', pages.index)
.get('/orphanage', pages.orphanage)
.get('/orphanages', pages.orphanages)
.get('/create-orphanage', pages.createOrphanage)
.post('/save-orphanage', pages.saveOrphanage)

//start server
server.listen(5500)