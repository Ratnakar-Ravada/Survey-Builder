const generateEmbeddedCode = (surveyValues, surveySettings) => {
    const surveyScript = `<script type="text/babel">
    const {
        Box,Paper,Typography,Slider,Radio,Checkbox,TextareaAutosize,Button,Icon,IconButton
    } = MaterialUI;
    const { useState,useEffect } = React;
    const settings = ${JSON.stringify(surveySettings)};
    function SurveyDisplay({ surveyValues }) {
        const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
        const [selectedOptions, setSelectedOptions] = useState([]);
        const [sliderValue, setSliderValue] = useState(0);
        const [textFeedback, setTextFeedback] = useState('');
        const [userResponses, setUserResponses] = useState({});
        const [isSurveyCancelled, setIsSurveyCancelled] = useState(false);
        const [displayCount, setDisplayCount] = useState(0);
        const [sliderRange, setSliderRange] = useState({});
        const [isSurveySent, setIsSurveySent] = useState(false);

        const currentQuestion = surveyValues.questions[currentQuestionIndex];

        useEffect(() => {
            if (isSurveyCancelled && displayCount < settings.noOfTimes - 1) {
            const timeoutId = setTimeout(() => {
                setIsSurveyCancelled(false);
                setDisplayCount(displayCount + 1);
            }, settings.displayFreq * 60 * 1000);

            return () => clearTimeout(timeoutId);
            }
        }, [isSurveyCancelled, displayCount]);
        
        useEffect(() => {
            if (
            currentQuestion.questionType === 'Slide to rate' &&
            currentQuestion.ratingRange
            ) {
            const sliderMin = currentQuestion.ratingRange.min;
            const sliderMax = currentQuestion.ratingRange.max;
            setSliderRange({ sliderMin, sliderMax });
            }
        }, [currentQuestion]);

        useEffect(() => {
            // Create a response object for the current question
            const response = { [currentQuestion.question]: {} };

            if (currentQuestion.questionType === 'Single Select' || currentQuestion.questionType === 'Multi Select') {
            response[currentQuestion.question].selectedOptions = selectedOptions;
            } else if (currentQuestion.questionType === 'Slide to rate') {

            response[currentQuestion.question].sliderValue = \`\${sliderValue} out of \${sliderRange.sliderMax}\` ;
            } else if (currentQuestion.questionType === 'Text') {
            response[currentQuestion.question].text = textFeedback;
            }

            // Update the userResponses whenever the current question changes
            setUserResponses((prevResponses) => ({
            ...prevResponses,
            ...response,
            }));
        }, [currentQuestion, selectedOptions, sliderValue, textFeedback]);

        if (surveyValues.questions.length > 0 && !isSurveyCancelled && !isSurveySent) {
            const handleNextQuestion = () => {
                if (currentQuestionIndex < surveyValues.questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                }
            };
            const handlePreviousQuestion = () => {
                if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                }
            };
            const handleSendSurvey = () => {
                if (currentQuestionIndex < surveyValues.questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                }
                saveSurveyResponses(userResponses);
                setIsSurveySent(true);
            };

            const handleCancelSurvey = () => {
                setIsSurveyCancelled(true);
            }
            const handleOptionChange = (option) => {
                if (currentQuestion.questionType === 'Single Select') {
                    setSelectedOptions([option]);
                } else if (currentQuestion.questionType === 'Multi Select') {
                    const updatedOptions = selectedOptions.includes(option)
                        ? selectedOptions.filter((selectedOption) => selectedOption !== option)
                        : [...selectedOptions, option];
                    setSelectedOptions(updatedOptions);
                }
            };
            const handleSliderChange = (newValue) => {
                setSliderValue(newValue);
            };

            const handleTextFeedbackChange = (event) => {
                const textValue = event.target.value;
                setTextFeedback(textValue);
            };

            return (
                <Box style={{border:"1px solid black", padding:"8px"}}>
                    <Icon 
                        className="fa fa-times" 
                        onClick={handleCancelSurvey} 
                        style={{ position: "absolute", top: "8px", right: "10px", cursor: "pointer" }} 
                    />
                    <Box style={{padding:"10px"}}>
                        <Paper
                            elevation={3} 
                            style={{padding:"8px", display:"flex", flexDirection:"column", gap:"1rem"}}
                        >
                            <Typography variant="h6"  style={{fontWeight:"600"}}>
                                {currentQuestionIndex + 1}. {currentQuestion.question}
                            </Typography>
                            <Typography variant="body2">
                                {currentQuestion.questionType}
                            </Typography>
                            {currentQuestion.questionType === 'Single Select' 
                              || currentQuestion.questionType === 'Multi Select' ? (
                                <div>
                                    <Typography variant="p">
                                        Choose from the following options:
                                    </Typography>
                                    {currentQuestion.options.map((option, optionIndex) => (
                                        <div key={optionIndex}>
                                            {currentQuestion.questionType === 'Single Select' ? (
                                                <Radio
                                                    checked={selectedOptions.includes(option)}
                                                    onChange={() => handleOptionChange(option)}
                                                />
                                            ) : (
                                                <Checkbox
                                                    checked={selectedOptions.includes(option)}
                                                    onChange={() => handleOptionChange(option)}
                                                />
                                            )}
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            {currentQuestion.questionType === 'Slide to rate' ? (
                                <>
                                    <div className='slider'>
                                        <Typography variant="p">{sliderRange.sliderMin}</Typography>
                                        <Slider
                                            min={sliderRange.sliderMin}
                                            max={sliderRange.sliderMax}
                                            value={sliderValue}
                                            onChange={(event, newValue) => handleSliderChange(newValue)}
                                            valueLabelDisplay="auto"
                                            valueLabelFormat={(value) => value}
                                        />
                                        <Typography variant="p">{sliderRange.sliderMax}</Typography>
                                    </div>
                                    <div className='slider names'>
                                        <Typography variant="p">
                                            {currentQuestion.ratingRange.minRatingMeaning}
                                        </Typography>
                                        <Typography variant="p">
                                            {currentQuestion.ratingRange.maxRatingMeaning}
                                        </Typography>
                                    </div>
                                </>
                            ) : null}
                            {currentQuestion.questionType === 'Text' ? (
                                <div>
                                    <TextareaAutosize
                                        rowsmin={4}
                                        placeholder="Your response here"
                                        style={{ width: '98%', overflow:"hidden" }}
                                        onChange={handleTextFeedbackChange}
                                    />
                                </div>
                            ) : null}
                        </Paper>
                    </Box>
                    <Box display="flex" gap = "21.5rem" justifyContent="flex-end" marginTop="16px">
                        <IconButton onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                            {currentQuestionIndex === 0 ? (
                                <Icon className="fa fa-angle-double-left"style={{display:'none'}} />
                            ):(
                                <Icon className="fa fa-angle-double-left"/>
                            )}
                        </IconButton>
                        {currentQuestionIndex < surveyValues.questions.length - 1 ? (
                            <Button variant="contained" color="primary" onClick={handleNextQuestion}>
                                Next
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleSendSurvey}>
                                Send
                            </Button>
                        )}
                    </Box>
                </Box>
            );
        }
        return null;
    }
    
    const surveyValues = ${JSON.stringify(surveyValues)};
    const showSurvey = () => {
        const root = ReactDOM.createRoot(document.getElementById('survey-container'));
        root.render(
            <SurveyDisplay surveyValues={surveyValues} />
        );
    };

    setTimeout(() => showSurvey(), settings.timeToWait * 1000);
</script>`;
    const headCode = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
<script src="https://unpkg.com/react@latest/umd/react.development.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@latest/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@mui/material@latest/umd/material-ui.development.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@latest/babel.min.js" crossorigin="anonymous"></script>

<script type="module">
// Import the firebase functions you need from the Firebase JavaScript SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

//Replace this configuration with your own configuration

const firebaseConfig = {
    apiKey: "AIzaSyCFXdIPoh2m_hmoD0VNxGHfUBF0wCWZel0",
    authDomain: "adminpanel-a8c2b.firebaseapp.com",
    projectId: "adminpanel-a8c2b",
    storageBucket: "adminpanel-a8c2b.appspot.com",
    messagingSenderId: "259983249859",
    appId: "1:259983249859:web:9e4394f76cb95c8473ed76",
    measurementId: "G-6QC2RZD420"
};

// Initialize Firebase with your Firebase project's configuration

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const saveSurveyResponses = async (userResponses) => {
    try {
        const answersCollection = collection(db, 'Answers');
        const newAnswersDoc = doc(answersCollection);

        await setDoc(newAnswersDoc, userResponses);
        console.log('Settings document added successfully with ID : ', newAnswersDoc.id);
    } catch (error) {
        console.error('Error adding settings document:', error);
    }
};
window.saveSurveyResponses = saveSurveyResponses;
</script>
<style>
    .slider {
        display: flex;
        gap: 1rem;
        margin-top: 0.75rem;
    }

    .names {
        justify-content: space-between;
        margin-left: 0.4rem;
    }
    
    #survey-container {
        width:30rem;
        position: absolute;
        bottom: 1rem;
        right:1rem;
        padding: 5px;
    }
</style>`;
    
    const bodyCode = `<div id="survey-container"></div>`;

    const embedCode = `${surveyScript}`;
    return ({headCode, bodyCode, embedCode});
}

export default generateEmbeddedCode;