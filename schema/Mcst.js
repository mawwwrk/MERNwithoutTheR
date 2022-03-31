// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/prefer-module */
const { Schema, model } = require("mongoose");

function handleNaOrNULL(input) {
  if (input === "na") return;
  if (input === "NULL") return;
  if (input === "0") return;
  return input;
}

const schema = new Schema(
  {
    _id: Number,
    usr_mcno: { type: String, required: false, set: handleNaOrNULL },
    usr_mctype: {
      type: String,
      enum: [
        "Single Tier Management Corporation",
        "2 Tier Management Corporation",
      ],
    },
    sub_mcno: { type: String, required: false, set: handleNaOrNULL },
    sub_mcstuen: { type: String },
    usr_devtname: { type: String, required: false, set: handleNaOrNULL },
    devt_location: String,
    mcst_houseno: String,
    mcst_roadname: String,
    mcst_unitno: { type: String, required: false, set: handleNaOrNULL },
    mcst_buildingname: { type: String, required: false, set: handleNaOrNULL },
    mcst_postalcode: {
      type: String,
      required: false,
      set: handleNaOrNULL,
    },
    mcst_telno: { type: String, required: false, set: handleNaOrNULL },
    ust_status: { type: String, enum: ["ACTIVE", "DEFUNCT"] },
    mcst_stratalota: Number,
    managementname: { type: String, required: false, set: handleNaOrNULL },
    management_tel_no: { type: String, required: false, set: handleNaOrNULL },
    mc_form_date: {
      type: Date,
      set: function (v) {
        const dateParts = v.split("/");
        return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      },
      required: false,
    },
  },
  {
    collection: "mcst",
  }
);

const Mcst = model("MCST", schema);

module.exports = Mcst;
