const db = require('./db');


const Conteudo = db.sequelize.define('conteudos', {
    materia: {
        type : db.Sequelize.TEXT
    },
    conteudo:{
        type: db.Sequelize.TEXT
    }
})

module.exports = Conteudo
//Conteudo.sync({froce : true})