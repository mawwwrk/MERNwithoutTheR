// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/prefer-module */
require("dotenv").config();
const mongoose = require("mongoose");

const dbname = process.env.DBNAME;
const connString = `${process.env.MONGO_URI}${dbname}`;
console.log(connString);

mongoose.connect(connString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbPromise = mongoose.connection.asPromise();

/** @type { {[key:string]:string}[] } */
const locationsData = require("../locationsFiltered");
const Locations = require("../schema/Locations");

(async () => {
  const db = await dbPromise;

  const count = await Locations.countDocuments();
  if (count > 0) Locations.deleteMany({});

  await Locations.create(locationsData);

  console.log("complete! closing db.");
  db.close();
})();
