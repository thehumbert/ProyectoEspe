const mongoose = require('mongoose');

const SantoDomingosSchema = mongoose.Schema({

    campos: Array,
    resultado: Array,
    campos1: Array
   

})

module.exports = mongoose.model('SantoDomingos',SantoDomingosSchema);