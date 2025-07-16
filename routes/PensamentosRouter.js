const express = require('express')
const router = express.Router()
const pensamentosControllers = require('../controllers/pensamentosControllers')
const checarLogado = require('../helpers/autenticacao').checarLogado

router.get('/', pensamentosControllers.mostrarPensamentos)

router.get('/dashboard', checarLogado, pensamentosControllers.mostrarDashboard)

router.get('/criar', checarLogado, pensamentosControllers.criarPensamento)

router.get('/editar/pensamento/:id', checarLogado, pensamentosControllers.editarPensamento)

router.post('/editar/pensamento/salvar', checarLogado, pensamentosControllers.editarPensamentoPost)

router.post('/salvar/pensamento', checarLogado, pensamentosControllers.salvarPensamento)

router.post('/deletar/pensamento', checarLogado, pensamentosControllers.deletarPensamento)

router.get('/buscar', pensamentosControllers.buscarPensamento)

router.get('/ordenacao/recentes', pensamentosControllers.ordernarPensamentosRecentes)

router.get('/ordenacao/antigos', pensamentosControllers.ordernarPensamentosAntigos)

module.exports = router