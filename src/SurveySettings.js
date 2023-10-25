import React, { useState } from 'react';
import {
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
    <Paper className='counter-paper'>
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
          <Box className="settings-box">
          <body1 className='settings-ques'>
            1. How much time to wait before displaying the survey - after the page loads?
            <div className='counter'>
              <CounterComponent
                value={surveySettings.timeToWait}
                onIncrement={(newValue) => setSurveySettings({ ...surveySettings, timeToWait: newValue })}
                onDecrement={(newValue) => setSurveySettings({ ...surveySettings, timeToWait: newValue })}
              />
              <span>seconds</span>
            </div>
          </body1>
          <body1 className='settings-ques'>
            2. How many times to show the survey?
            <div className='counter'>
              <CounterComponent
                value={surveySettings.noOfTimes}
                onIncrement={(newValue) => setSurveySettings({ ...surveySettings, noOfTimes: newValue })}
                onDecrement={(newValue) => setSurveySettings({ ...surveySettings, noOfTimes: newValue })}
              />
              <span>times</span>
            </div>
          </body1>
          <body1 className='settings-ques'>
            3. Display frequency - for every
            <div className='counter'>
              <CounterComponent
                value={surveySettings.timeToWait}
                onIncrement={(newValue) => setSurveySettings({ ...surveySettings, displayFreq: newValue })}
                onDecrement={(newValue) => setSurveySettings({ ...surveySettings, displayFreq: newValue })}
              />
              <span>minutes</span>
            </div>
          </body1>
          <body1 className='settings-ques'>
            4. Database to store the user survey responses:
            <div className='select-database'>
              <FormControlLabel
                value="MySQL"
                control={<Radio />}
                label= {
                  <Paper className='db'>
                  <img src={process.env.PUBLIC_URL + '/icons/mysql.svg'} alt="MySQL" className='mysql'/>
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
                  <Paper className='db'>
                  <img src={process.env.PUBLIC_URL + '/icons/mongodb.svg'} alt="MongoDB"className='mongodb'/>
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
                  <Paper className='db'>
                  <img src={process.env.PUBLIC_URL + '/icons/postgresql.svg'} alt="PostgreSQL"className='postgresql'/>
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
                  <Paper className='db'>
                  <img src={process.env.PUBLIC_URL + '/icons/firebase.jpg'} alt="Firebase" className='firebase'/>
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
                  <Paper className='db'>
                  <img src={process.env.PUBLIC_URL + '/icons/SQLite.png'} alt="SQLite" className='sqlite'/>
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
                  <Paper className='db'>
                  <img src={process.env.PUBLIC_URL + '/icons/database.svg'} alt="Custom DB"className='customdb'/>
                  Custom Database
                  </Paper>
                }
                onChange={handleDatabaseChange}
                checked={surveySettings.selectedDatabase === "Custom"}
              />
            </div>
          </body1>
          </Box>
      </Box>
    );
  }
  
  export default SurveySettings;