const express = require('express');
const bodyParser = require("body-parser");
const pdfFiller = require('pdffiller');

const PORT = 3001;

const app = express();

app.get('/test', (req, res) => {
  res.json({ message: "Hello from server!" });
});
app.post('/generatePdf', bodyParser.json(), (req, res) => {

  const sourcePDF = 'server/example-timesheet.pdf';
  const destinationPDF = 'server/example-timesheet-filled.pdf';
  const { body } = req;

  const data = {
    'Name': body.consultantName,
    'Client': body.clientName,
    'Date2_af_date': body.currentDate,
    'Week Ending': body.dates[6].date,
    'Day': body.dates[6].day,
    'DateMonday': body.dates[0].date,
    'DateTuesday': body.dates[1].date,
    'DateWednesday': body.dates[2].date,
    'DateThursday': body.dates[3].date,
    'DateFriday': body.dates[4].date,
    'DateSaturday': body.dates[5].date,
    'DateSunday': body.dates[6].date,
    'Total HoursMonday': body.dates[0].hours,
    'Total HoursTuesday': body.dates[1].hours,
    'Total HoursWednesday': body.dates[2].hours,
    'Total HoursThursday': body.dates[3].hours,
    'Total HoursFriday': body.dates[4].hours,
    'Total HoursSaturday': body.dates[5].hours,
    'Total HoursSunday': body.dates[6].hours,
    'Total HoursTotal Number of Hours': body.total,

  }

  console.log(data)

  pdfFiller.fillFormWithFlatten( sourcePDF, destinationPDF, data, false, e => {
    if (e) throw e;
    console.log("In callback (we're done).");
})

  // pdfFiller.fillForm( sourcePDF, destinationPDF, data, err => {
  //   if (err) throw err;
  //   console.log("In callback (we're done).");
  // });

  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});