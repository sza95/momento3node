const express = require("express")
const router = express.Router()
//const productMocks = require('../utils/mocks/products');   //llamar los mocks de productos

//Para hacer la implementacion del servicio
const ProductsService = require('../../services/products')
const productService = new ProductsService()

// file de products example
/*const products = [
  {
    name: "Balon",
    price: 35,
    image: "/static/images/futbol.jpg"
  },
  {
    name: "Tennis Guayos",
    price: 100,
    image: "/static/images/tennis.jpeg"
  }
]  */

//Listar los productos
/*router.get('/', (req, res) => {
  //res.render('products', { products })
  res.render('products', { productMocks })   //file products de formato pug, al cual se le pasan la opcion products
})  */

//Otra forma con async await
router.get('/', async (req, res, next) => {
  const { tags } = req.query  //Si es es necesario pasarle los tags, los sacamos del query y se los pasamos al servicio
  
  try {
    const products = await productService.getProducts( { tags } )  //Pedimos el servicio con getProducts
    res.render('products', { products })   //file products de formato pug, al cual se le pasan la opcion products
  } catch (err) {
    next(err)
  }
  
} )


module.exports = router;  //exportar la ruta