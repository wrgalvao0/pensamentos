const express = require('express')
const Usuario = require('../models/Usuario')
const Pensamento = require('../models/Pensamento')

module.exports = class pensamentosControllers {
    static mostrarPensamentos(req, res){
        res.render('pensamentos/home')
    }

    static mostrarDashboard(req, res){
        res.render('pensamentos/dashboardUsuario')
    }

    static criarPensamento(req, res){
        res.render('pensamentos/criarPensamento')
    }

    static async salvarPensamento(req, res){
        const pensamento = {
           titulo: req.body.pensamento,
           usuarioId: req.session.userid
        }
        await Pensamento.create(pensamento)
        req.flash('mensagem', 'Pensamento criado com sucesso !')
        req.session.save(() => {
            res.redirect('/pensamentos/dashboard')
        })
    }
}