const express = require('express')
const router = express.Router()
const pensamentosControllers = require('../controllers/pensamentosControllers')

router.get('/', pensamentosControllers.mostrarPensamentos)

module.exports = router