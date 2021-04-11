const mongoose = require('mongoose');
const LatacungaSchema = mongoose.Schema({

    codigo: String,
    departamento: String,
    porcentajeCumplimiento: Number,
    categoriaEjecucion: String,
    avanceFisico: Number,
    categoriaMetas: String,
    indiceGestion: Number,
    resultado: Array

})

module.exports = mongoose.model('Latacunga', LatacungaSchema);