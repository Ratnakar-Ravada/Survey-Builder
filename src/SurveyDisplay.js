import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Radio,
  Checkbox,
  Slider,
  TextareaAutosize,
  IconButton,
  Icon
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
        <Box style={{ border: "1px solid black", padding: "8px", position: "relative" }}>
            <Icon class="fa fa-times" style={{ position: "absolute", top: "3px", right: "5px", cursor: "pointer" }} />
            <Box style={{padding:"10px"}}>
                <Paper elevation={3} style={{padding:"8px", display:"flex", flexDirection:"column", gap:"1rem"}}>
                    <Typography variant="h6" style={{fontWeight:"600"}}>{currentQuestionIndex + 1}. {currentQuestion.question}</Typography>
                    <Typography variant="body2">{currentQuestion.questionType}</Typography>
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
                                style={{ width: '98%', overflow:"hidden" }}
                            />
                        </div>
                    ) : null}
                </Paper>
            </Box>
            <Box display="flex"  justifyContent="space-between" marginTop="16px">
                <IconButton onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className='fas prevIcon'>
                    {currentQuestionIndex === 0 ? (
                        <Icon class="fa fa-angle-double-left"style={{display:'none'}} />
                    ):(
                        <Icon class="fa fa-angle-double-left"/>
                    )}
                </IconButton>
                {currentQuestionIndex < surveyValues.questions.length - 1 ? (
                    <Button className='sendfeedback next' variant="contained" color="primary" onClick={handleNextQuestion}>
                        Next
                    </Button>
                ) : (
                    <Button className='sendfeedback send' variant="contained" color="primary" onClick={handleSendSurvey}>
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