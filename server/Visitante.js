const mongoose = require('mongoose');

//criar tabela visitante
const visitante = mongoose.model('Visitante', {

    id: Number,
    Name: String,
    Username: String,
    Email: String,
    Role: String
})

module.exports = visitante