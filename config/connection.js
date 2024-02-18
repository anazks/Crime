const mongoClient = require("mongodb").MongoClient;
const state = {
  db: null,
};

module.exports.connect = function (done) {
  const dbname = "Crime";
  // let url = `mongodb+srv://user:123@cluster0.jxpil.mongodb.net/${dbname}?retryWrites=true&w=majority`
  const url = "mongodb+srv://user:123@cluster0.jxpil.mongodb.net/Crime?retryWrites=true&w=majority"
  // const url = `mongodb+srv://user:123@cluster0.kop4wrn.mongodb.net/${dbname}?retryWrites=true&w=majority`
  // const url = `mongodb+srv://jithurakash:akash123@ecommerceweb.3j3ck.mongodb.net/${dbname}?retryWrites=true&w=majority`;

  mongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
    if (err) return done(err);
    state.db = data.db(dbname);
    done();
  });
};

module.exports.get = function () {
  return state.db;
};
