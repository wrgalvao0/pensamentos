const express = require('express')
const Usuario = require('../models/Usuario')
const Pensamento = require('../models/Pensamento')
const { raw } = require('mysql2')
const { where } = require('sequelize')
const { Op } = require('sequelize');
const { search } = require('../routes/PensamentosRouter')

module.exports = class pensamentosControllers {
    static async mostrarPensamentos(req, res) {
        const dadosPensamentos = await Pensamento.findAll({ include: Usuario })
        let pensamentos = []
        dadosPensamentos.map((pensamento) => {
            pensamentos.push(pensamento.get({ plain: true }))
        })
        console.log(pensamentos)
        res.render('pensamentos/home', { pensamentos })
    }

    static async buscarPensamento(req, res) {
        let procurar = ''
        if (req.query.busca) {
            procurar = req.query.busca
        }
        const pensamentosData = await Pensamento.findAll({
            include: Usuario,
            where: {
                titulo: { [Op.like]: `%${procurar}%` }
            }

        })
        let pensamentos = pensamentosData.map((pensamento) => {
            return pensamento.get({ plain: true })
        })
        res.render('pensamentos/home', { pensamentos, procurar })
    }

    static async mostrarDashboard(req, res) {
        let pensamentosVazio
        const usuarioid = req.session.userid
        const meusPensamentos = await Pensamento.findAll({ raw: true, where: { usuarioId: usuarioid } })
        if (meusPensamentos.length === 0) {
            pensamentosVazio = true
        }
        else {
            pensamentosVazio = false
        }
        res.render('pensamentos/dashboardUsuario', { meusPensamentos, pensamentosVazio })
    }

    static criarPensamento(req, res) {
        res.render('pensamentos/criarPensamento')
    }

    static async salvarPensamento(req, res) {
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
    static async deletarPensamento(req, res) {
        const id = req.body.id
        const usuarioid = req.session.userid
        await Pensamento.destroy({ where: { id: id, usuarioId: usuarioid } })
        req.flash('mensagem', 'Pensamento excluido com sucesso !')
        req.session.save(() => {
            res.redirect('/pensamentos/dashboard')
        })
    }
    static async editarPensamento(req, res) {
        const id = req.params.id
        const pensamento = await Pensamento.findOne({ where: { id: id }, raw: true })
        res.render('pensamentos/editarPensamento', { pensamento })
    }

    static async editarPensamentoPost(req, res) {
        const id = req.body.id
        const pensamento = {
            titulo: req.body.titulo,
        }
        console.log(pensamento)
        await Pensamento.update(pensamento, { where: { id: id } })
        req.flash('mensagem', 'Pensamento editado com sucesso !')
        req.session.save(() => {
            res.redirect('/pensamentos/dashboard')
        })
    }
    static async ordernarPensamentosRecentes(req, res) {
        let procurar
        let ordenacao = 'DESC'
        if (req.query.busca) {
            procurar = req.query.busca
            const pensamentosData = await Pensamento.findAll({
                include: Usuario,
                where: {
                    titulo: { [Op.like]: `%${procurar}%` },
                },
                order: [['createdAt', ordenacao]]

            })
            let pensamentos = pensamentosData.map((pensamento) => {
                return pensamento.get({ plain: true })
            })
            res.render('pensamentos/home', { pensamentos, procurar })
        }
        else {
            const pensamentosData = await Pensamento.findAll({
                include: Usuario, order: [['createdAt', ordenacao]]
            })
            let pensamentos = pensamentosData.map((pensamento) => {
                return pensamento.get({ plain: true })
            })
            res.render('pensamentos/home', { pensamentos, procurar })
        }
    }
    static async ordernarPensamentosAntigos(req, res) {
        let procurar
        let ordenacao = 'ASC'
        if (req.query.busca) {
            procurar = req.query.busca
            const pensamentosData = await Pensamento.findAll({
                include: Usuario,
                where: {
                    titulo: { [Op.like]: `%${procurar}%` },
                },
                order: [['createdAt', ordenacao]]

            })
            let pensamentos = pensamentosData.map((pensamento) => {
                return pensamento.get({ plain: true })
            })
            res.render('pensamentos/home', { pensamentos, procurar })
        }
        else {
            const pensamentosData = await Pensamento.findAll({
                include: Usuario, order: [['createdAt', ordenacao]]
            })
            let pensamentos = pensamentosData.map((pensamento) => {
                return pensamento.get({ plain: true })
            })
            res.render('pensamentos/home', { pensamentos, procurar })
        }
    }
}