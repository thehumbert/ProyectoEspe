const mongoose = require('mongoose');

const ViceAdministrativosSchema = mongoose.Schema({

    campos: Array,
    resultado: Array,
    campos1: Array,
   

})

module.exports = mongoose.model('ViceAdministrativos',ViceAdministrativosSchema);