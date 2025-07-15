const express = require('express')
const router = express.Router()
const autenticacaoControllers = require('../controllers/autenticacaoControllers')

router.get('/cadastrar/usuario', autenticacaoControllers.cadastrarUsuario) // rota para cadastrar usuário

router.get('/login', autenticacaoControllers.loginUsuario) // rota para login de usuário

router.get('/logout', autenticacaoControllers.logout) //rota para logout de usuario

router.post('/entrar', autenticacaoControllers.loginUsuarioPost) //rota para usuario realizar o login

router.post('/salvar/usuario', autenticacaoControllers.salvarUsuario) // rota para salvar usuário



module.exports = router