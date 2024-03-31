const db = require('./db');


const Registro = db.sequelize.define('registros', {
    Email: {
        type : db.Sequelize.TEXT
    },
    Senha:{
        type: db.Sequelize.TEXT
    },
    tipoU:{
        type: db.Sequelize.TEXT
    }

})

module.exports = Registro
//Registro.sync({froce : true})