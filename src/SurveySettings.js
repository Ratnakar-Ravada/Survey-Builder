import React, { useState } from 'react';
import {
  Typography,
  Box, Paper, FormControlLabel, Radio,
} from '@mui/material';

function CounterComponent({ value, onIncrement, onDecrement }) {
  const [localValue, setLocalValue] = useState(value);

  const incrementValue = () => {
    setLocalValue(localValue + 1);
    onIncrement(localValue + 1);
  };

  const decrementValue = () => {
    if (localValue > 0) {
      setLocalValue(localValue - 1);
      onDecrement(localValue - 1);
    }
  };

  return (
    <Paper style={{borderRadius:"4px",display: 'flex', alignItems: 'center', gap: '1rem', padding: '5px 2px' }}>
      <button onClick={decrementValue}>-</button>
      <span>{localValue}</span>
      <button onClick={incrementValue}>+</button>
    </Paper>
  );
}


function SurveySettings({surveySettings, setSurveySettings}) {
    const handleDatabaseChange = (event) => {
      setSurveySettings({ ...surveySettings, selectedDatabase: event.target.value });
    };
    return (
      <Box>
        <h3>Survey Settings</h3>
          <Box style={{ border: "1px solid black", padding: "12px"}}>
          <Typography variant= 'body1' style={{fontWeight:"600"}}>
            1. How much time to wait before showing the survey?
            <div style={{ display: 'flex', alignItems: 'center', gap:'0.75rem', margin:'5px'}}>
              <CounterComponent
                value={surveySettings.timeToWait}
                onIncrement={(newValue) => setSurveySettings({ ...surveySettings, timeToWait: newValue })}
                onDecrement={(newValue) => setSurveySettings({ ...surveySettings, timeToWait: newValue })}
              />
              <span>seconds</span>
            </div>
          </Typography>

          <Typography  variant='body1' style={{fontWeight:"600"}}>
            2. How many times to show the survey?
            <div style={{ display: 'flex', alignItems: 'center', gap:'0.75rem', margin:'5px'}}>
              <CounterComponent
                value={surveySettings.noOfTimes}
                onIncrement={(newValue) => setSurveySettings({ ...surveySettings, noOfTimes: newValue })}
                onDecrement={(newValue) => setSurveySettings({ ...surveySettings, noOfTimes: newValue })}
              />
              <span>times</span>
            </div>
          </Typography>
          <Typography  variant='body1' style={{fontWeight:"600"}}>
            3. Display frequency - for every
            <div style={{ display: 'flex', alignItems: 'center', gap:'0.75rem', margin:'5px'}}>
              <CounterComponent
                value={surveySettings.timeToWait}
                onIncrement={(newValue) => setSurveySettings({ ...surveySettings, displayFreq: newValue })}
                onDecrement={(newValue) => setSurveySettings({ ...surveySettings, displayFreq: newValue })}
              />
              <span>minutes</span>
            </div>
          </Typography>
          <Typography variant='body1' style={{ fontWeight: "600" }}>
            4. Choose the type of database to store the survey responses:
            <div  style={{ display: 'flex',flexWrap:'wrap', gap: '1rem', margin: '10px' }}>
              <FormControlLabel
                value="MySQL"
                control={<Radio />}
                label= {
                  <Paper style={{padding:"10px"}}>
                  <img src={process.env.PUBLIC_URL + '/icons/mysql.svg'} alt="MySQL" width="28" height="28" style={{margin:"5px 10px 0 0"}}/>
                  MySQL
                  </Paper>
                }
                onChange={handleDatabaseChange}
                checked={surveySettings.selectedDatabase === "MySQL"}
              />
              <FormControlLabel
                value="MongoDB"
                control={<Radio />}
                label= {
                  <Paper style={{padding:"10px"}}>
                  <img src={process.env.PUBLIC_URL + '/icons/mongodb.svg'} alt="MongoDB" width="28" height="28" style={{margin:"5px 10px 0 0"}}/>
                  MongoDB
                  </Paper>
                }
                onChange={handleDatabaseChange}
                checked={surveySettings.selectedDatabase === "MongoDB"}
              />
              <FormControlLabel
                value="PostgreSQL"
                control={<Radio />}
                label= {
                  <Paper style={{padding:"10px"}}>
                  <img src={process.env.PUBLIC_URL + '/icons/postgresql.svg'} alt="PostgreSQL" width="28" height="28" style={{margin:"5px 10px 0 0"}}/>
                  PostgreSQL
                  </Paper>
                }
                onChange={handleDatabaseChange}
                checked={surveySettings.selectedDatabase === "PostgreSQL"}
              />
              <FormControlLabel
                value="Firebase"
                control={<Radio />}
                label= {
                  <Paper style={{padding:"10px"}}>
                  <img src={process.env.PUBLIC_URL + '/icons/firebase.svg'} alt="Firebase" width="28" height="28" style={{margin:"5px 10px 0 10px"}}/>
                  Firebase
                  </Paper>
                }
                onChange={handleDatabaseChange}
                checked={surveySettings.selectedDatabase === "Firebase"}
              />
              <FormControlLabel
                value="SQLite"
                control={<Radio />}
                label= {
                  <Paper style={{padding:"10px"}}>
                  <img src={process.env.PUBLIC_URL + '/icons/SQLite.png'} alt="SQLite" width="60" height="30" style={{margin:"5px 10px 0 10px"}}/>
                  SQLite
                  </Paper>
                }
                onChange={handleDatabaseChange}
                checked={surveySettings.selectedDatabase === "SQLite"}
              />
              <FormControlLabel
                value="Custom"
                control={<Radio />}
                label= {
                  <Paper style={{padding:"10px"}}>
                  <img src={process.env.PUBLIC_URL + '/icons/database.svg'} alt="Custom DB" width="28" height="28" style={{margin:"5px 10px 0 10px"}}/>
                  Your own Database
                  </Paper>
                }
                onChange={handleDatabaseChange}
                checked={surveySettings.selectedDatabase === "Custom"}
              />
            </div>
          </Typography>
          </Box>
      </Box>
    );
  }
  
  export default SurveySettings;
