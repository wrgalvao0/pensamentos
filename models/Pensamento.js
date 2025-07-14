const { DataTypes } = require('sequelize')
const conexao = require('../db/conexao')
const Usuario = require('./Usuario')

const Pensamento = conexao.define('pensamento',{
    titulo: {
        type: DataTypes.STRING, // define o tipo de dado como string
        allowNull: false,  // não permite valores nulos
        required: true // campo obrigatório
    }
})

Pensamento.belongsTo(Usuario) // define que um pensamento pertence apenas a um unico usuario
Usuario.hasMany(Pensamento) // define que um usuario pode ter muitos pensamentos
module.exports = Pensamento
