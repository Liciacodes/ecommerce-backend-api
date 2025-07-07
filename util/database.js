const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;


const mongoConnect = (callback) => {
    MongoClient.connect(
        "mongodb+srv://felz:udosenfelicia@cluster0.bqgm6cv.mongodb.net/shop?retryWrites=true&w=majority&tls=true&ssl=true"
      )
      .then(client => {
          console.log("Connected to MongoDB");
          _db = client.db();
          callback()
      })
      .catch((err) => {
        console.log(err);
        throw err
      })  
}

const getDb = () => {
   if (_db) {
      return _db;
    } 
    throw 'No database found!';
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;