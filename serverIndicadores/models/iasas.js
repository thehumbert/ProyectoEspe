const mongoose = require('mongoose');

const IasasSchema = mongoose.Schema({

    campos: Array,
    resultado: Array,
    campos1: Array,
    resultado1:Array,

})

module.exports = mongoose.model('Iasas',IasasSchema);