const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  const { data } = req.body;
  const user_id = "john_doe_17091999"; // Example user_id
  const email = "john@xyz.com"; // Example email
  const roll_number = "ABCD123"; // Example roll number

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input",
    });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highest_alphabet = alphabets.length
    ? [
        alphabets.toSorted((a, b) =>
          b.toLowerCase().localeCompare(a.toLowerCase())
        )[0],
      ]
    : [];

  res.json({
    is_success: true,
    user_id: user_id,
    email: email,
    roll_number: roll_number,
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highest_alphabet,
  });
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
