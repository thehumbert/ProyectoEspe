var express = require('express');


const Departamentos = require('../models/departamentos');



// todos las opciones
const getDepartamentoId = (req, res) => {
   Departamentos.find({})
        .then(departamento => {
            res.json(departamento);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


module.exports = {

    getDepartamentoId

}