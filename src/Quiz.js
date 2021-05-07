import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {useParams} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Container from "@material-ui/core/Container";
import Question from "./Question";
import Result from "./Result";

const useStyles = makeStyles({
    root: {
        maxWidth: "80%",
        marginTop: "5%"
    },
    media: {
        height: 500,
    },
    action: {
        align: "center",
    },
    formControl: {
        width: "100%",
        alignItems: "center",
    },
    option: {
        margin: "1%",
        width: "80%",
    },
});

export default function Quiz() {
    const classes = useStyles();
    const difficulty = useParams().difficulty || 'easy';

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);


    function shuffle(choices) {
        return choices.map((a) => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)
    }

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}`)
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(data => {
                            if (data.results) {
                                const results = data.results.map((result) => {
                                    return {
                                        question_text: result.question,
                                        correct_answer: result.correct_answer,
                                        answered: false,
                                        choices: shuffle([result.correct_answer].concat(result.incorrect_answers)),
                                        isCorrect: false,
                                        answer: ""
                                    }
                                });
                                setQuestions(results);
                            }
                        })
                }
            })
    }, []);


    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        if (!timeLeft) {
            if (currentQuestion < questions.length) {
                setCurrentQuestion(currentQuestion + 1);
                setTimeLeft(15)
            }
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const handleNext = () => {
        if (currentQuestion < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(15)
        }
    };

    const handleSubmit = (currentQuestion, ans) => {
        if (!questions[currentQuestion].answered) {
            const data = questions;
            data[currentQuestion].answer = ans;
            data[currentQuestion].answered = true;
            data[currentQuestion].isCorrect = ans === data[currentQuestion].correct_answer;
            setQuestions(data);
        }
    };


    return (
        <React.Fragment>
            <CssBaseline/>
            <Container fixed>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardContent align="center">
                            {currentQuestion < questions.length && <div style={{textAlign: 'center'}}>
                                <div style={{fontSize: '50px'}}>
                                    <span>00</span>:<span>{timeLeft.toLocaleString('en-US', {
                                    minimumIntegerDigits: 2,
                                    useGrouping: false
                                })}</span>
                                </div>
                            </div>}
                            {questions && questions.length > 0 && currentQuestion < questions.length &&
                            <Question question={questions[currentQuestion]} handleSubmit={handleSubmit}
                                      currentQuestion={currentQuestion}/>}

                            {currentQuestion < questions.length && <Button
                                variant="contained"
                                color="primary"
                                onClick={
                                    handleNext
                                }
                                style={{margin: '5%'}}>
                                Next
                            </Button>}

                            {questions && questions.length > 0 && currentQuestion >= questions.length &&
                            <Result results={questions}/>}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Container>
        </React.Fragment>
    );
}


