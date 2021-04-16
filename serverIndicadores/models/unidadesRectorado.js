const mongoose = require('mongoose');
const UnidadesrectoradosSchema = mongoose.Schema({

    codigo: String,
    departamento: String,
    porcentajeCumplimiento: Number,
    categoriaEjecucion: String,
    avanceFisico: Number,
    categoriaMetas: String,
    indiceGestion: Number,
    resultado: Array

})

module.exports = mongoose.model('Unidadesrectorados', UnidadesrectoradosSchema);