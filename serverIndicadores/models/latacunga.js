const mongoose = require('mongoose');
const LatacungasSchema = mongoose.Schema({

    codigo: String,
    departamento: String,
    porcentajeCumplimiento: Number,
    categoriaEjecucion: String,
    avanceFisico: Number,
    categoriaMetas: String,
    indiceGestion: Number,
    resultado: Array

})

module.exports = mongoose.model('Latacungas', LatacungasSchema);