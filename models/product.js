const mongoose = require('mongoose')
const Shema  = mongoose.Schema

const ProductShema = Shema({
    sector: String,
    precio: { type: Number, default: 0 },
    categoria: { type: String, enum: ['Casa', 'Apartamento', 'Apartaestudio', 'Finca','Local Comercial'] },
    area: { type: Number, default: 0 },
    estrato: { type: Number, default: 0 },
    amoblado: String,
    venta: String,
    imagen: String,
    link: String
})

module.exports = mongoose.model('Product', ProductShema)