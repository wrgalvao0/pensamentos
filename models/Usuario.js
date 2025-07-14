const { DataTypes } = require('sequelize')
const conexao = require('../db/conexao')

const Usuario = conexao.define('usuario',{
    nome: {
        type: DataTypes.STRING,
        allowNull: false, // não permite valores nulos,
        require: true // campo obrigatório
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, // não permite valores nulos,
        require: true // campo obrigatório
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false, // não permite valores nulos,
        require: true // campo obrigatório
    }
})

module.exports = Usuario
