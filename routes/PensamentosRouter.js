const express = require('express')
const router = express.Router()
const pensamentosControllers = require('../controllers/pensamentosControllers')
const checarLogado = require('../helpers/autenticacao').checarLogado

router.get('/', pensamentosControllers.mostrarPensamentos)

router.get('/dashboard', checarLogado, pensamentosControllers.mostrarDashboard)

router.get('/criar', checarLogado, pensamentosControllers.criarPensamento)

router.post('/salvar/pensamento', checarLogado, pensamentosControllers.salvarPensamento)

module.exports = router