import React, { useState, useEffect } from 'react';
import './styles.css';
import {
  Box,Paper,Typography,Button,Radio,Checkbox,Slider,TextareaAutosize,IconButton,Icon
} from '@mui/material';

function SurveyDisplay({ surveyValues}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [sliderValue, setSliderValue] = useState(0);
    const [sliderRange, setSliderRange] = useState({});
    const currentQuestion = surveyValues.questions[currentQuestionIndex];
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

    if (surveyValues.questions.length > 0) {
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
            console.log(surveyValues);
        };

        const handleOptionChange = (option) => {
            if (currentQuestion.questionType === 'Single Select') {
                setSelectedOptions([option]);
            } else if (currentQuestion.questionType === 'Multi Select') {
                const updatedOptions = selectedOptions.includes(option)
                    ? selectedOptions.filter((selectedOption) => selectedOption !== option)
                    : [...selectedOptions, option];
                setSelectedOptions(updatedOptions);
            }
        }
        const handleSliderChange = (newValue) => {
            setSliderValue(newValue);
        };
        return (
            <Box className="survey-display-box">
                <Icon className="fa fa-times cancelIcon"/>
                <Box className="survey-ques">
                    <Paper className='question-paper' elevation={3}>
                        <h4 className="ques">{currentQuestionIndex + 1}. {currentQuestion.question}</h4>
                        <body1 className='question-type'>{currentQuestion.questionType}</body1>
                        {currentQuestion.questionType === 'Single Select' || currentQuestion.questionType === 'Multi Select' ? (
                            <div>
                                <Typography variant="p">Choose from the following options:</Typography>
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
                                    className='text-feedback'
                                />
                            </div>
                        ) : null}
                    </Paper>
                </Box>
                <Box className="send-next-box">
                    <IconButton onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                        {currentQuestionIndex === 0 ? (
                            <></>
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

export default SurveyDisplay;