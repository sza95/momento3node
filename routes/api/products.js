/**
 * imports
 */
const express = require('express')
const router = express.Router()
//const productMocks = require('../../utils/mocks/products');

/**
 * relative routes
 * ProductsService, hacer la implementacion del servicio
 */
const ProductsService = require('../../services/products')
const productService = new ProductsService()

/**
 * operators
 */
//Listar todos los productos
/*router.get('/', (req, res) => {
    const { query } = req.query;   //consulta de todos los datos

    res.status(200).json({
        data: productMocks,
        message: 'products listed'
    });
});  */
//Como getProducts() es asicromo debemos resolver la promesa o utilizar async await
//y muy importante colocar el codigo en un trycatch ya que se esta soportando handlers asincronos desde express
//con route handlers, se utiliza un tercer parametro que es next para manejar los errores (excepciones)
router.get('/', async (req, res, next) => {
    const { tags } = req.query

    console.log('req', req.query)   //para ver como llegan los parametros (datos)

    try {
        const products = await productService.getProducts({ tags })

        res.status(200).json({
            data: products,
            message: 'products listed'
        })
    } catch (err) {
        next(err)
    }
} )


//Consultar un solo producto con :productId (variable de parametro, la variable viene desde los parametros)
/*router.get('/:productId', function(req, res) {
    const { productId } = req.params;

    console.log(productId);

    res.status(200).json({
        data: productMocks[1],
        //data: productMocks.shift(productId),
        message: 'product retrieved'
    });
});  */

router.get("/:productId", async (req, res, next) => {
    const { productId } = req.params
    //const { tags } = req.query

    console.log("req", req.params)
    //console.log('req', req.query)

    try {
        const product = await productService.getProduct({ productId })

        res.status(200).json( {
            data: product,
            message: "Product retrieved"
        } )
    } catch (err) {
        next(err)
    }
})

//Crear un producto nuevo
/*router.post('/', function(req, res) {

    res.status(201).json({
        data: productMocks[1],    //traer un producto especifio
        message: 'add products'
    });
});  */

router.post("/", async (req, res, next) => {
    const { body: product } = req     //body: produc, es crear un alias gracias al destrocturing

    console.log("req", req.body)

    try {
        const createdProduct = await productService.createProduct( { product } )

        res.status(201).json({
            data: createdProduct,     //devolver el producto en el data(deira)
            message: "product created"
        })
    } catch (err) {
        next(err)
    }
} )

/*router.post('/', async (req, res, next) => {
    const { formData: products } = req

    try {
        const product = await productService.createProduct({ formData })

        res.status(201).json({
            data: product[0],
            message: 'product created'
        })
    } catch (error) {
        next(error)
    }
} ) */


//Actualizar
/*router.put('/:productId', function(req, res) {

    res.status(200).json({
        data: productMocks,
        message: 'products updated'
    });
});  */

router.put("/:productId", async (req, res, next) => {
    const { productId } = req.params    //Id del product que vamos a actualizar
    const { body: product } = req   //Informacion que vamos a actualizar

    console.log("req", req.params, req.body)

    try {
        const updateProduct = await productService.updateProduct( { productId, product } )    //{ productId, product } destrocturin de los objetos

        res.status(200).json( {
            data: updateProduct,
            message: "Product updated"
        } )
    } catch (err) {
        next(err)
    }
})

/*router.put('/:productId', async (req, res, next) => {
    const { productId } = req.params
    const { formData: product } = req.params

    try {
        const product = await productService.updateProduct( { productId, formData } )

        res.status(200).json( {
            data: product[0],
            message: 'Product updated'
        } )
    } catch (error) {
        next(error)
    }
}) */

//Actualizar parte
/*router.patch('/:productId', function (req, res) {
    const { productId } = req.params

    res.status(200).json({
        data:productMocks[2],
        message: 'product updated'
    })
})  */

/*router.patch("/:productId", async (req, res, next) => {
    const { productId } = req.params
    const { body: product } = req

    try {
        const updateProduct = await productService.updateProduct( {productId, product} )

        res.status(200).json({
            data: updateProduct,
            message: "product updated"
        })
    } catch (err) {
        next(err)
    }
} )  */

//Eliminar
/*router.delete('/', function(req, res) {
    const { productId } = req.params

    res.status(200).json({
        data: productMocks[0],
        message: 'product deleted'
    })
})  */

router.delete("/:productId", async (req, res, next) => { 
    const { productId } = req.params

    console.log("req", req.params)

    try {
        const deleteProduct = await productService.deleteProduct( { productId } )

        res.status(200).json({
            data: deleteProduct,
            message: "product deleted"
        })
    } catch (err) {
        next(err)
    }
 } )


module.exports = router;