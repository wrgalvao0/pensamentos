const express = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')

module.exports = class autenticacaoControllers {

    static cadastrarUsuario(req, res) {
        res.render('autenticacao/cadastrarUsuario')
    }

    static async salvarUsuario(req, res) {
        const nome = req.body.nome
        const email = req.body.mail
        const senha = req.body.senha
        const confirmarSenha = req.body.confirmarSenha
        const usuarioExiste = await Usuario.findOne({ where: { email: email } })
        if (senha !== confirmarSenha) { // verifica se as senhas conferem
            req.flash('mensagem', 'As senhas não conferem, tente novamente !')
            res.redirect('/autenticacao/cadastrar/usuario') // redireciona para a página de cadastro com mensagem de erro
            return
        }
        else if (usuarioExiste) { // verifica se o usuário já existe
            req.flash('mensagem', 'Um usuário com este e-mail já existe, tente novamente !')
            res.redirect('/autenticacao/cadastrar/usuario') // redireciona para a página de cadastro com mensagem de erro
            return
        }
        else { // se o usuário não existe e as senhas conferem, prosegue para salvar o usuario no banco de dados
            const salt = await bcrypt.genSalt(10) // gera um salt para a senha
            const senhaHash = await bcrypt.hash(senha, salt) // cria o hash da senha
            const usuario = {
                nome: nome,
                email: email,
                senha: senhaHash
            }
            const user = await Usuario.create(usuario) // salva o usuário no banco de dados
            req.session.userid = user.id
            req.flash('mensagem', 'Cadastro realizado com sucesso !')
            req.session.save(() => {
                res.redirect('/') // redireciona para a página de login com mensagem de sucesso
            })

        }
    }

    static loginUsuario(req, res) {
        res.render('autenticacao/loginUsuario') //renderiza a pagina de login usuario
    }

    static async loginUsuarioPost(req, res) {
        const email = req.body.email
        const senha = req.body.senha
        const consultaUsuarioEmail = await Usuario.findOne({ where: { email: email } }) //realiza a consulta do usuario onde o email = email
        if (!consultaUsuarioEmail) { //verifica se existe um usuario com este email cadastrado no banco
            req.flash('mensagem', 'Usuario nao encontrado!') //se nao existe, envia a mensagem usuario nao encontrado
            res.render('autenticacao/loginUsuario') // renderza a mesma pagina de loginUsuario
        }
        else {
            const senhaBate = await bcrypt.compare(senha, consultaUsuarioEmail.senha) //verifica se a senha digita e a senha cadastrada no banco de dados sao iguais
            if (!senhaBate) {  //se nao forem iguais
                req.flash('mensagem', 'Senha incorreta !') //se nao forem iguais envia a mensagem senha incorreta para a view
                res.render('autenticacao/loginUsuario') //renderiza a pagina de login novamente
            }
            else {
                req.session.userid = consultaUsuarioEmail.id 
                req.flash('mensagem', 'Autenticação efetuada com sucesso !')
                req.session.save(() => {
                    res.redirect('/') //redireciona para a página de login com mensagem de sucesso
                })
            }
        }
    }
    static logout(req, res) {
        req.session.destroy() //destroi a sessao
        res.redirect('/autenticacao/login') //redireciona para a pagina de login novamente
    }
}