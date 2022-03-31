// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/prefer-module */
const { Schema, model } = require("mongoose");

const Mcst = model(
  "MCST",
  new Schema(
    {
      _id: String,
      usr_mcno: String,
      usr_mctype: String,
      sub_mcno: String,
      sub_mcstuen: String,
      usr_devtname: String,
      devt_location: String,
      mcst_houseno: String,
      mcst_roadname: String,
      mcst_unitno: String,
      mcst_buildingname: String,
      mcst_postalcode: String,
      mcst_telno: String,
      ust_status: String,
      mcst_stratalota: Number,
      managementname: String,
      management_tel_no: String,
      mc_form_date: String,
    },
    {
      collection: "mcst",
    }
  )
);

module.exports = Mcst;
