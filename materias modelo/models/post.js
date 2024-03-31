const db = require('./db');


const Post = db.sequelize.define('postagens', {
    materia: {
        type : db.Sequelize.TEXT
    },
    link:{
        type: db.Sequelize.TEXT
    }
})

module.exports = Post
//Post.sync({froce : true})