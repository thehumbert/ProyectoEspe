const mongoose = require('mongoose');

const ViceInvestigacionsSchema = mongoose.Schema({

    campos: Array,
    resultado: Array,
    campos1: Array
   

})

module.exports = mongoose.model('ViceInvestigacions',ViceInvestigacionsSchema);