const express = require ("express");
const app = express();
const handlebars =  require ('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const Conteudo = require('./models/conteudo');
const Registro = require('./models/registroU');

//config
    //teamplate 
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
    app.set('view engine', 'handlebars')
    app.set('views', path.join(__dirname, 'views'));


//public
 app.use(express.static(__dirname + '/public'))
    // body parser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

//rotas 
app.get('/', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
            res.render('home', {post: posts})
    })
})
app.get('/atA', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('homeA', {post: posts})
    })
})

app.get('/cadastro', function(req, res){
    res.render('layouts/formulario');
}) 
app.post('/atividades', function(req, res){
    Post.create({
        materia: req.body.materia,
        link: req.body.link
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send(erro)
    })
})
app.get('/deletar/:id', function(req, res){
    const postId = req.params.id;
    Post.destroy({ where: { id: postId} })
      .then(function() {
        res.send("Deletado!!!");
      })
      .catch(function(erro) {
        console.error("Erro ao excluir:", erro);
        res.send("Não foi possível excluir o registro.");
      });
});
app.get('/deletarC/:id', function(req, res){
    const postId = req.params.id;
    Conteudo.destroy({ where: { id: postId} })
      .then(function() {
        res.send("Deletado!!!");
      })
      .catch(function(erro) {
        console.error("Erro ao excluir:", erro);
        res.send("Não foi possível excluir o registro.");
      });
});
app.get('/registro', function(req, res){
    res.render('layouts/registro');
}) 
app.post('/registroU', function(req, res){
    const tipouU = req.body.tipoU
    if (tipouU === "estu"){
    Registro.create({
        Email: req.body.email,
        Senha: req.body.senha,
        tipoU: req.body.tipoU
    }).then(function(){
        res.redirect('/login')
    }).catch(function(erro){
        res.send(erro)})                                   
    } else {
        res.redirect('/login')
    }
    })
    app.get('/login', (req, res) => {
        res.render('layouts/login');
      });
    
      
      // Rota para autenticação
     
      app.post('/loginV', async (req, res) => {
        let email = req.body.email;
        let senha = req.body.password;
      
        if (email && senha) {
          try {
         let usuario = await Registro.findOne({ where: { Email: email } });
            if (usuario) {
              let senhaCorrespondente = usuario.Senha; 
      
              if (senha === senhaCorrespondente) {
                req.body.email = usuario;
                let tipoUsuario = usuario.tipoU;
                res.cookie('tipoUsuario', tipoUsuario);
                res.cookie('usuarioEmail', email);
                if (tipoUsuario ===  "estu"){
                res.redirect('/userA')}else{
                    res.redirect('/user')
                }
              } else {
                res.send('Credenciais inválidas');
              }
            } else {
              res.send('Usuário não encontrado');
            }
          } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.send('Erro ao fazer login');
          }
        } else {
          res.send('Por favor, forneça usuário e senha');
        }
      });
      
app.get('/userA', function(req, res){
    res.render('layouts/usuarioA');
       
})
app.get('/user', function(req, res){
    res.render('layouts/usuario');
       
})
app.get('/conteudo', function(req, res){
    Conteudo.findAll({order: [['id', 'DESC']]}).then(function(posts){
       res.render('layouts/VConteudo', {conteudo: posts})
    })
})
app.get('/conteudoA', function(req, res){
    Conteudo.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('layouts/conteudoA', {conteudo: posts})
    })
})

app.get('/CadastroConteudo', function(req, res){
    res.render('layouts/conteudo');
}) 
app.post('/CC', function(req, res){
    Conteudo.create({
        materia: req.body.materia,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/conteudo')
    }).catch(function(erro){
        res.send(erro)
    })
})


app.listen(8081, function(){
    console.log("servidor rodando na porta 8081!")
});
