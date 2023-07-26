const express = require("express");
const pdfFillForm = require('pdf-fill-form');

const PORT = 3001;

const app = express();

app.get("/generatePdf", (req, res) => {

  pdfFillForm.read('example-timesheet.pdf')
  .then(function(result) {
    console.log(result);
  }, function(err) {
    console.log(err);
  });

  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});