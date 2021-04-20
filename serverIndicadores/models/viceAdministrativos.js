const mongoose = require('mongoose');

const ViceAdministrativosSchema = mongoose.Schema({

    campos: Array,
<<<<<<< HEAD
    resultado: Array,
    campos1: Array,
=======
    resultado: Array
>>>>>>> ba5fcdb9019c3b0e0039f9dfbc61b6e21c09fcef
   

})

module.exports = mongoose.model('ViceAdministrativos',ViceAdministrativosSchema);