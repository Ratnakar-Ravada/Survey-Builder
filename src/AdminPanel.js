import React, { useState } from 'react';
import SurveyDisplay from './SurveyDisplay';
import './styles.css';
import generateEmbeddedCode from './generateEmbeddedCode';
import SurveySettings from './SurveySettings';
import DisplayCode from './DisplayCode';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc  } from'firebase/firestore';

// Initialize Firebase with your Firebase project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFXdIPoh2m_hmoD0VNxGHfUBF0wCWZel0",
  authDomain: "adminpanel-a8c2b.firebaseapp.com",
  projectId: "adminpanel-a8c2b",
  storageBucket: "adminpanel-a8c2b.appspot.com",
  messagingSenderId: "259983249859",
  appId: "1:259983249859:web:9e4394f76cb95c8473ed76",
  measurementId: "G-6QC2RZD420"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Saving the Survey Settigns in 'Settings' collection
const saveSurveySettings = async (settings) => {
  try {
    const settingsCollection = collection(db, 'Settings');
    const newSettingsDoc = doc(settingsCollection);

    await setDoc(newSettingsDoc, settings);
    console.log('Settings document added successfully with ID : ', newSettingsDoc.id);
  } catch (error) {
    console.error('Error adding settings document:', error);
  }
};

function SurveyQuestion({ question, setQuestion }) {
  return (
    <div>
      <label className='label'>
        Survey Question:
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className='question-input'/>
      </label>
    </div>
  );
}

function QuestionType({ questionType, setQuestionType }) {
  return (
    <div className='question-type'>
      <label className="label">
        Question type:
        <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} className='dropdown'>
          <option value="">Select</option>
          <option value="Single Select">Single select option</option>
          <option value="Multi Select">Multi select option</option>
          <option value="Slide to rate">Review or Rating</option>
          <option value="Text">Text feedback</option>
        </select>
      </label>
    </div>
  );
}

function Options({ questionType, options, setOptions, handleOptionAdd }) {
  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  if (questionType === 'Single Select' || questionType === 'Multi Select') {
    return (
      <div>
        {options.map((option, index) => (
          <div key={index}  className="option-container">
            <label  className="label">
              Option {index + 1}:
            </label>
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              className="option-input"
            />
            <button onClick={() => handleRemoveOption(index)}  className="remove-button"><i className="fas fa-times" /></button>
          </div>
        ))}
        <button onClick={handleOptionAdd}  className="add-option"><i className="fas fa-plus" />Add option</button>
      </div>
    );
  }
  return null;
}

function RatingRange({ questionData, setRatingRange }) {
  const { questionType, ratingRange } = questionData;
  const { min = null, max = null, minRatingMeaning = '', maxRatingMeaning = '' } = ratingRange || {};

  if (questionType === 'Slide to rate') {
    return (
      <div>
        <label  className="range-label">
          Range:
          <input
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => setRatingRange({ ...ratingRange, min: parseInt(e.target.value, 10) })}
            className="range-input"
          />
          to
          <input
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => setRatingRange({ ...ratingRange, max: parseInt(e.target.value, 10) })}
            className="range-input"
          />
        </label>
        <br/>
        <label  className="rating-meaning-label">
          Min Rating means:
          <input
            type="text"
            value={minRatingMeaning}
            onChange={(e) => setRatingRange({ ...ratingRange, minRatingMeaning: e.target.value })}
            className="rating-meaning-input"
          />
        </label>
        <br />
        <label  className="rating-meaning-label">
          Max Rating means:
          <input
            type="text"
            value={maxRatingMeaning}
            onChange={(e) => setRatingRange({ ...ratingRange, maxRatingMeaning: e.target.value })}
            className="rating-meaning-input"
          />
        </label>
      </div>
    );
  }
  return null;
}

function TextFeedback({ questionType }) {
  if (questionType === 'Text') {
    return null;
  }
  return null;
}

function Question({ index, questionData, updateQuestion, removeQuestion }) {
  const { question, questionType, options } = questionData;

  return (
    <div className='question'>
      <div className='question-head'>
        <h3>Question {index + 1}</h3>
        <button onClick={() => removeQuestion(index)} className='remove-button removeQues'><i className="fas fa-times" /> Remove</button>
      </div>
      <SurveyQuestion question={question} setQuestion={(value) => updateQuestion(index, 'question', value)} />
      <QuestionType
        questionType={questionType}
        setQuestionType={(value) => updateQuestion(index, 'questionType', value)}
      />
      <Options
        questionType={questionType}
        options={options}
        setOptions={(value) => updateQuestion(index, 'options', value)}
        handleOptionAdd={() => updateQuestion(index, 'options', [...options, ''])}
      />
      <RatingRange questionData={questionData} setRatingRange={(value) => updateQuestion(index, 'ratingRange', value)} />
      <TextFeedback questionType={questionType} />
    </div>
  );
}

function Survey() {
  const [questions, setQuestions] = useState([]);
  const [surveyValues, setSurveyValues] = useState({});
  const [showRenderButton, setShowRenderButton] = useState(false);
  const [renderButtonClicked, setRenderButtonClicked] = useState(false);
  const [showCodeSection, setShowCodeSection] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false)
  const [surveySettings, setSurveySettings] = useState({
    timeToWait: 0,
    noOfTimes: 0,
    displayFreq: 0,
  });
  const [codeData, setCodeData] = useState({
    head: '',
    body: '',
    script: '',
  });

  const getCode = (surveyValues, surveySettings) => {
    setShowCodeSection(true);
    saveSurveySettings(surveySettings);
    const code = generateEmbeddedCode(surveyValues, surveySettings);
    setCodeData({
      head: code.headCode,
      body: code.bodyCode,
      script: code.embedCode,
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);

    const updatedSurveyValues = { ...surveyValues };
    updatedSurveyValues.questions = updatedQuestions;
    setSurveyValues(updatedSurveyValues);

    if (updatedQuestions.length === 0) {
      setShowRenderButton(false);
      setShowSurvey(false);
      setShowCodeSection(false);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionType: '', options: [] }]);
    setShowRenderButton(true);
  };

  const handleRenderSurvey = () => {
    const surveyData = { questions };
    setSurveyValues(surveyData);
    setRenderButtonClicked(true);
    setShowSurvey(true);
  };

  return (
    <div className="survey-container">
      <h1 className="survey-title">Survey Builder</h1>
      <div className="intro">
        <div className="message">
          <h2>Welcome to Survey Builder Application</h2>
          <p className="intro-text">
            Know your customers better.<br />
            Start by creating the survey according to your wish.<br />
            Embed the generated code to your website.<br />
            All set. Review and improve according to the feedback.
          </p>
          <h3 className='get-started'><i className="fa fa-angle-double-down" aria-hidden="true"></i> Get started now...</h3>
        </div>
        <img src={process.env.PUBLIC_URL + '/SurveyClipart.jpg'} alt="Survey Clipart" className="intro-image" />
      </div>
      <div className="survey-div">
        <div className="survey block">
          <h3 className="custom-survey-title">Customize your survey</h3>
          <div className="ques-component">
            {questions.length > 0 &&
              questions.map((questionData, index) => (
                <Question
                  key={index}
                  index={index}
                  questionData={questionData}
                  updateQuestion={updateQuestion}
                  removeQuestion={removeQuestion}
                />
              ))
            }
            <button onClick={handleAddQuestion} className="add-ques button">
              <i className="fas fa-plus" /> Add question
            </button>
            {showRenderButton && (
              <button onClick={handleRenderSurvey} className="render-survey button">
                Render survey
              </button>
            )}
          </div>
        </div>
        <div className="preview block">
          {renderButtonClicked && showSurvey && (
            <>
              <div className="survey-details">
                <h3 className="preview-title">Preview your survey</h3>
                <SurveyDisplay surveyValues={surveyValues} />
                <SurveySettings surveySettings={surveySettings} setSurveySettings={setSurveySettings} />
              </div>
              <button className="generateBtn" onClick={() => getCode(surveyValues, surveySettings)}>
                <i className="fa fa-code" aria-hidden="true" />  Generate Code
              </button>
            </>
          )}
        </div>
      </div>
      <div className="displayCode">
        {showCodeSection && <DisplayCode codeData={codeData} />}
      </div>
    </div>
  );
}


export default Survey;