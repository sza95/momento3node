const productsMocks = require('../utils/mocks/products')
const MongoLib = require('../lib/mongo')


/**
* product
* import the shema
*/
//const products = require('../models/product')
//const product = require('../models/product')

class ProductsService {
    constructor() {
        this.collection = 'products'
        this.mongoDB = new MongoLib()
    }

    /**
     * Bussines logical
     */
    async getProducts({ tags }) {
        const query = tags && { tags: { $in: tags } }
        const products = await this.mongoDB.getAll(this.collection, query)
        //return Promise.resolve( products )
        //return Promise.resolve( productsMocks )
        return products || []
    }

    async getProduct( { productId } ) {
        const product = await this.mongoDB.get(this.collection, productId)
        return product || {}
        //return Promise.resolve( productsMocks[productId] )
    }

    async createProduct({ product }) {
        const createProductId = await this.mongoDB.create(this.collection, product)
        return createProductId
    }
    
    async updateProduct({ productId, product }) {
        const updateProductId = await this.mongoDB.update(
            this.collection,
            productId,
            product
        )    
        return updateProductId
    }
    
    async deleteProduct({ productId }) {
        const deletedProductId = await this.mongoDB.delete(
            this.collection,
            productId
        )    
        return deletedProductId;
    }
}

module.exports = ProductsService