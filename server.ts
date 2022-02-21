import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { body, validationResult } from "express-validator";

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post(
  "/",
  body("initialSavings").isInt({ min: 0 }),
  body("monthlyDeposit").isInt({ min: 0 }),
  body("interestRate").isFloat({ min: 0 }),
  body("years").default(60).isInt({ min: 1, max: 100 }),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      let { initialSavings: initSavings, monthlyDeposit: monthDeposit, interestRate: intRate, years } = req.body;
      intRate /= 100;
      const data: number[] = [];
      for (let month = 0; month < years * 12; month += 12) {
        if (intRate == 0) {
          data.push(monthDeposit * month + initSavings);
        } else {
          data.push(
            Math.round(
              monthDeposit *
                (((1 + intRate) ** month - 1) / intRate) +
                initSavings * (1 + intRate) ** month
            )
          );
        }
      }
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(400).json({ errors: [error] });
    }
  }
);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
