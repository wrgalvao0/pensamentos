const mysql2 = require('mysql2')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('pensamentos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log(`Conexao com o banco de dados efetuada com sucesso !`)
}
catch(error){
    console.log(`Erro ao conectar com o banco de dados ${error}`)
}

module.exports = sequelize


