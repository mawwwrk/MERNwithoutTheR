// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/prefer-module */
require("dotenv").config();

const dbg = require("debug");
const colors = require("../colors");
const readline = require("readline");


const { fetch } = require("undici");
const mongoose = require("mongoose");

const Mcst = require("../schema/MCST");
const Hdb = require("../schema/HDB");
const models = {
  mcst: Mcst,
  hdb: Hdb,
};

//? setting up mongo connection

const dbName = process.env.DBNAME;
dbg("mongo:url")(process.env.MONGO_URI);
const mongooseUrl = `${process.env.MONGO_URI}${dbName}`;
info(mongooseUrl);

//? setting up params for fetch
const root = "https://data.gov.sg";
const URLSTRING = `${root}/api/action/datastore_search`;
const QUERY = "resource_id";
const resources = {
  mcst: "21b15082-ea01-40f8-ad2b-679f011d6764",
  hdb: "482bfa14-2977-4035-9c61-c85f871daf4e",
  fullset: "85be5dcc-93f6-4d36-ae10-c85b0907948c,",
};

const uri = new URL(URLSTRING);
const limit = 1000;
uri.searchParams.set(QUERY, resources[2]);
uri.searchParams.set("limit", limit);

dbg("app:uri")(`Connecting to ${mongooseUrl}`);
//? set up fetch function

const doFetch = async (inputUri) => {
  try {
    const response = await fetch(inputUri);
    const data = response.json();
    const {
      success,
      result: {
        fields,
        records,
        _links: { next },
        limit,
      },
    } = await data;
    if (!success) throw new Error("Failed to fetch data");
    dbg("app:undici")(`Fetched ${records.length} records`);
    let nextUrl = records.length === limit ? next : undefined;
    dbg("debug:next")(
      `${next}, Next url: ${nextUrl}, length: ${records.length} ${
        records.length < limit
      }`
    );
    return { fields, records, next: nextUrl };
  } catch {
    throw new Error("Failed to fetch data");
  }
};

//? end of setup
const useMongoose = () => {
  mongoose.connect(mongooseUrl, {});
  const db = mongoose.connection;
  db.once("open", () => {
    dbg("app:mongoose")("Connected to mongo");
  });
  db.on("error", console.error.bind(console, "connection error:"));
  return db;
};

/** @param {"hdb"|"mcst"} what */
const seed = async (what) => {
  if (!(what in models)) throw new Error("Invalid seed");
  dbg("app:seed")(`Preparing to seed ${what}`);
  const model = models[what];
  await model.deleteMany({});
  uri.searchParams.set(QUERY, resources[what]);
  uri.searchParams.set("limit", 1000);
  let total = 0;
  dbg("app:seed")(`Seeding ${what}`);
  const load = async (url) => {
    const { records, next } = await doFetch(url);
    const promises = records.map((record) => model.create(record));
    await Promise.all(promises);
    dbg("app:records")(`inserted ${records.length} records`);
    total += records.length;
    if (next) {
      dbg("debug:next")(`loading next page, ${next}`);
      await load(`${root}${next}`);
    }
  };
  await load(uri);
  dbg("app:totalSeed")(`Seeded ${total} records in ${what} collection`);
};

async function seedDb() {
  const db = useMongoose();
  await seed("hdb");
  await seed("mcst");
  db.close();
}
async function seedCollection(collection) {
  const db = useMongoose();
  await seed(collection);
  db.close();
}
const strings = [
  `\n${colors.fg.Green}Do you want to seed the database?${colors.Reset}`,
  `\nThis will ${colors.fg.Cyan}empty the collection${colors.Reset} and repopulate it with data from data.gov.sg`,
  `${colors.fg.Yellow} (y / n)${colors.Reset}: `,
];

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const question = strings.join("");
  rl.question(question, async (answer) => {
    dbg.enable("app:*");
    switch (answer.toLowerCase()) {
      case "y":
        await seedDb();
        console.log(`${colors.bg.Blue}Seeded database${colors.Reset}`);
        break;
      case "n":
        console.log(`${colors.bg.Blue}Not seeding database${colors.Reset}`);
        break;
      case "m":
        console.log(
          `${colors.bg.Blue}Seeded Seeding ONLY mcsts${colors.Reset}`
        );
        await seedCollection("mcst");
        break;
      case "h":
        console.log(`${colors.bg.Blue}Seeded ONLY hdbs${colors.Reset}`);
        await seedCollection("hdb");
        break;
      default:
        console.log(
          `${colors.bg.Red}${colors.fg.Black}${colors.Bright}Invalid answer. exiting${colors.Reset}`
        );
    }
    dbg.disable();
    rl.close();
  });
}
main();
