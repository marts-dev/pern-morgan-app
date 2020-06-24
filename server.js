const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 5000;
//For Database
const {
  pool,
  insertString,
  selectString,
  dropTableString,
  createTableString,
} = require("./db/config.js");
const csv = require("csv-parser");
const fs = require("fs");
let isFirstRun = true;

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  //Server static content
  //npm run build
  app.use(express.static(path.join(__dirname + "client/build")));
}

//Routes
app.post("/", async (req, rsp) => {
  try {
    rsp.json({ user: "asdf" });
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/top/confirmed", async (req, rsp) => {
  if (!isFirstRun) {
    try {
      //Validate req.query
      if (
        req.query.observation_date !== undefined &&
        req.query.max_results !== undefined
      ) {
        //Assign values
        let values = [req.query.observation_date, req.query.max_results];
        const { rows } = await pool.query(selectString, values);

        console.log(rows);
        rsp.send("hello");
      } else {
        rsp.status(400).send("You may have made the wrong API query");
      }
    } catch (error) {
      console.error(error.message);
      rsp.status(500).send("SQL query porblem");
    }
  } else {
    rsp.status(500).send("DB not yet ready");
  }
});

app.get("/", async (req, rsp) => {
  if (isFirstRun) {
    try {
      isFirstRun = false;
      const retval = await pool.query(createTableString);
      console.log(retval);
      fs.createReadStream("covid_19_data.csv")
        .pipe(csv())
        .on("data", async (data) => {
          const values = [
            data["ObservationDate"],
            data["Country/Region"],
            parseInt(data["Confirmed"]),
            parseInt(data["Deaths"]),
            parseInt(data["Recovered"]),
          ];
          await pool.query(insertString, values);
        })
        .on("end", () => rsp.status(200).send("Data successfully saved to DB"));
    } catch (error) {
      console.error(error.message);
      isFirstRun = true;
      rsp.status(500).send("SQL query porblem");
    }
  } else {
    rsp.status(200).send("Ok");
  }
});

app.get("/end", async (req, rsp) => {
  if (!isFirstRun) {
    try {
      //Drop database table
      const retVal = await pool.query(dropTableString);
      console.log(retVal);
      //Reset isFirstRunFlag
      isFirstRun = true;
      rsp.status(205).send("Reset");
    } catch (error) {
      console.error(error.message);
      rsp.status(500).send("SQL query porblem");
    }
  } else {
    rsp.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
