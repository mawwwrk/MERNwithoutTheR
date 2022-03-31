// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/prefer-module */
const { Schema, model } = require("mongoose");

const Hdb = model(
  "HDB",
  new Schema(
    {
      _id: Number,
      blk_no: String,
      street: String,
      max_floor_lvl: Number,
      year_completed: Number,
      residential: String,
      commercial: String,
      market_hawker: String,
      miscellaneous: String,
      multistorey_carpark: String,
      precinct_pavilion: String,
      bldg_contract_town: String,
      total_dwelling_units: Number,
      "1room_sold": Number,
      "2room_sold": Number,
      "3room_sold": Number,
      "4room_sold": Number,
      "5room_sold": Number,
      exec_sold: Number,
      multigen_sold: Number,
      studio_apartment_sold: Number,
      "1room_rental": Number,
      "2room_rental": Number,
      "3room_rental": Number,
      other_room_rental: Number,
    },
    {
      collection: "hdb",
    }
  )
);

module.exports = Hdb;
