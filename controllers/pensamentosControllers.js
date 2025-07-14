const express = require('express')

module.exports = class pensamentosControllers {
    static mostrarPensamentos(req, res){
        res.render('pensamentos/home')
    }
}