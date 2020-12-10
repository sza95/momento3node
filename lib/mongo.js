const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}${config.dbHost}/${DB_NAME}`

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true })
        this.dbName = DB_NAME
    }

    async connect() {
        try {
          await this.client.connect()
          console.log('Connected successfully to mongo')
          return this.client.db(this.dbName)
        } catch (error) {
          console.log(error)
        }
    }

    async getAll(collection, query) {
        try {      
          const db = await this.connect()
          return await db.collection(collection).find(query).toArray()
        } catch (error) {
          console.log(error)
        }
    }

    get(collection, id) {
      return this.connect().then(db => {
        return db.collection(collection).findOne({ _id: ObjectId(id) });
      });
    }

    create(collection, data) {
      return this.connect()
        .then(db => {
          return db.collection(collection).insertOne(data);
        })
        .then(result => result.insertedId);
    }
  
    update(collection, id, data) {
      return this.connect()
        .then(db => {
          return db
            .collection(collection)
            .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
        })
        .then(result => result.upsertedId || id);
    }
  
    delete(collection, id) {
      return this.connect()
        .then(db => {
          return db.collection(collection).deleteOne({ _id: ObjectId(id) });
        })
        .then(() => id);
    }
}

module.exports = MongoLib