const mongoose = require('mongoose');

const ViceDocenciasSchema = mongoose.Schema({

    codigo: String,
    departamento: String,
    porcentajeCumplimiento: Number,
    categoriaEjecucion: String,
    avanceFisico: Number,
    categoriaMetas: String,
    indiceGestion: Number,
    resultado: Array 
   

})

module.exports = mongoose.model('ViceDocencias',ViceDocenciasSchema);