module.exports.checarLogado = function(req, res, next){
    const logado = req.session.userid
    if(!logado){
        res.redirect('/autenticacao/login')
    }
    else{
        next()
    }
}