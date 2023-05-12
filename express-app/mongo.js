const { MongoClient } = require("mongodb");
const { URI, DB } = require("./constants");

const client = new MongoClient(URI);
let db = null;

module.exports = {
  connect: async () => {
    try {
      await client.connect();
      db = client.db(DB);
      console.log("Connected");
    } catch (e) {
      console.log(e);
    }
  },
  getDb: () => db,
};
