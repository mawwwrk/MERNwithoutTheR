// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/prefer-module */
const { Schema, model } = require("mongoose");

function convertYNtoBool(input) {
  if (input === "Y") return true;
  if (input === "N") return false;
  return;
}

const hdbSchema = {
  _id: Number,
  blk_no: String,
  street: String,
  max_floor_lvl: Number,
  year_completed: Number,
  residential: { type: Boolean, set: convertYNtoBool },
  commercial: { type: Boolean, set: convertYNtoBool },
  market_hawker: { type: Boolean, set: convertYNtoBool },
  miscellaneous: { type: Boolean, set: convertYNtoBool },
  multistorey_carpark: { type: Boolean, set: convertYNtoBool },
  precinct_pavilion: { type: Boolean, set: convertYNtoBool },
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
};
const schema = new Schema(hdbSchema, {
  collection: "hdb",
});

const Hdb = model("HDB", schema);

module.exports = Hdb;
