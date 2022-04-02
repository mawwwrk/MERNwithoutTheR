// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/prefer-module */
const { Schema, model } = require("mongoose");

const locationsSchema = {
  blk_no: {
    type: String,
    required: false,
    set: (input) => {
      const trimmed = input.replace(/\s/g, "");
      if (trimmed === "") return;
      return trimmed;
    },
  },
  road_name: String,
  building: {
    type: String,
    required: false,
    set: (input) => {
      if (input === "NIL") return;
      return input;
    },
  },
  postal_code: String,
};

const schema = new Schema(locationsSchema, {
  collection: "locations",
});

const Locations = model("LOCATIONS", schema);

module.exports = Locations;
