import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import nanobuffer from "nanobuffer";

// set up a limited array
const msg = new nanobuffer(50);
const getMsgs = () => Array.from(msg).reverse();

// feel free to take out, this just seeds the server with at least one message
msg.push({
  user: "Okshan",
  text: "I am very super intelligent person ",
  time: Date.now(),
});

// get express ready to run
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static("frontend"));

app.get("/poll", function (req, res) {
  const messages = getMsgs();

  // mocking request fail with status code
  res.status(Math.random() > 0.5 ? 200 : 500).json({ success: true, messages });
});

app.post("/poll", function (req, res) {
  const { user, text } = req.body;

  msg.push({ user, text, time: Date.now() });

  res.json({ success: true });
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`listening on http://localhost:${port}`);
