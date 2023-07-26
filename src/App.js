import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { useState } from 'react';
import { Button, Form, FormGroup, Input, Label  } from 'reactstrap';
import dayjs from 'dayjs';

const config = {
  locale: 'en-US',
  name: 'Namey McNameface',
  client: 'Boogle',
  hoursDefaults: [8, 8, 8, 8, 8, 0, 0],
};

const today = dayjs();

function App() {  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [startDay, setStartDay] = useState(today.subtract(today.day()-1, 'day'));
  const [consultantName, setConsultantName] = useState(config.name); 
  const [clientName, setClientName] = useState(config.client);
  const [hours, setHours] = useState(config.hoursDefaults);
  
  const previousWeek = () => {
    console.log(startDay.subtract(7, 'day'))
    setStartDay(startDay.subtract(7, 'day'));
  };
  const nextWeek = () => {
    setStartDay(startDay.add(7, 'day'));
  };
  const updateHoursPerDay = (day, value) => {
    console.log(day, value)
    let tempHours = [...hours];
    tempHours[day] = value;
    console.log(tempHours)
    setHours(tempHours);
  };

  const generatePDF = () => {

  };

  const totalHours = hours.reduce((a, b) => a + b, 0);

  return (
    <div className="App">
      <header className="App-header container pt-5 mb-5">
        <h1>Timesheet PDF Generator</h1>
      </header>
      <main className="container">

        <nav className="d-flex justify-content-between mb-5">
          <Button
            outline="primary"
            tag="input"
            value="&#8592; Previous Week"
            onClick={previousWeek} />
          <Button
            outline="primary"
            tag="input"
            value="Next Week &#8594;"
            onClick={nextWeek} />
        </nav>

        <Form>
          <div className="d-flex gap-3 mb-4">
            { days?.length && days.map((d, i) => 
              <FormGroup>
                <div>
                  <Label for={d.toLowerCase()}>{d}:</Label>
                </div>
                <strong>{startDay.add(i, 'day').format('M/D/YYYY')}</strong>
                <div>
                  <Input 
                    type="number" 
                    name={d.toLowerCase()} 
                    id={d.toLowerCase()} 
                    value={hours[i]} 
                    onChange={e => updateHoursPerDay(i, Number(e.target.value))}
                  />
                </div>
              </FormGroup>
            )}
          </div>

          <div className="d-flex gap-3 mb-4 bg-light py-4 px-3">
            <FormGroup>
              <div>
                <Label for="consultant-name">Consultant Name:</Label>
              </div>
              <div>
                <Input 
                  type="text" 
                  name="consultant-name" 
                  id="consultant-name" 
                  value={consultantName} 
                  onChange={e => setConsultantName(e.target.value)} 
                />
              </div>
            </FormGroup>

            <FormGroup>
              <div>
                <Label for="client-name">Client Name:</Label>
              </div>
              <div>
                <Input 
                  type="text" 
                  name="client-name" 
                  id="client-name" 
                  value={clientName} 
                  onChange={e => setClientName(e.target.value)} 
                />
              </div>
            </FormGroup>

            <FormGroup>
              <div>
                <Label for="todays-date">Today's Date:</Label>
              </div>
              <div>
                <Input 
                  type="text" 
                  name="todays-date" 
                  id="todays-date" 
                  value={today.format('M/D/YYYY')}
                  disabled
                />
              </div>
            </FormGroup>

            <FormGroup>
              <div>
                <Label for="total-hours">Total Hours:</Label>
              </div>
              <div>
                <Input 
                  type="text" 
                  name="total-hours" 
                  id="total-hours" 
                  value={totalHours}
                  disabled
                />
              </div>
            </FormGroup>
          </div>
          
          <Button color="primary" onClick={generatePDF}>Generate PDF</Button>
        </Form>
      </main>
    </div>
  );
}

export default App;
