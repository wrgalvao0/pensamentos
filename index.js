const express = require('express')
const app = express()
const conexao = require('./db/conexao')
const porta = 3000
const { engine } = require('express-handlebars')
const path = require('path')
const { error } = require('console')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

//receber a resposta do body
app.use(express.urlencoded({extended: true}))

app.use(express.json()) 

app.use(express.static('public'))  //define public como pasta estatica

app.set('view engine', 'handlebars') //seta o motor de visualização para handlebars

app.engine('handlebars', engine({
    partialsDir: path.join(__dirname, 'views', 'partials')
})) 

app.use(session({  // configurações da sessão
    name: 'session', // nome da sessão
    secret: 'segredo', // chave secreta para assinar o cookie da sessão
    resave: false, // não regravar a sessão se ela não foi modificada
    saveUninitialized: false, // não salvar sessões não inicializadas
    store: new FileStore({ // armazena sessões em arquivos
        logFn: function(){}, // desativa logs
        path: path.join(require('os').tempdir(), 'sessions') // define o caminho para armazenar os arquivos de sessão
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000), // define o tempo de expiração do cookie,
        httpOnly: true // impede o acesso ao cookie via JavaScript
    }
})) 

// middleware para passar a sessão para as views
app.use((req, res, next) => { 
    if(req.session.userid){
        res.locals.session = req.session
    } // se a sessão existir, torna-a disponível para as views
    next() // chama o próximo middleware
}) 

app.use(flash()) // usa o middleware de flash para mensagens temporárias

conexao.sync().then(()=>{
    app.listen(porta, () => {
        console.log(`Servidor rodando na porta ${porta}`)
    })
}).catch((error) => console.log(`Erro ao conectar com o banco de dados: ${error}`)) // sincroniza o banco de dados e inicia o servidor


