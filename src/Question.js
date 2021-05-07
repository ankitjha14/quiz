import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function Option({option, handleClick, disable, variant, color}) {
    const classes = useStyles();

    return (<p>
        <Button
            variant={variant}
            color={color}
            className={classes.option}
            disabled={disable}
            onClick={() => handleClick(option)}
        >
            {option}
        </Button>
    </p>);
}

const useStyles = makeStyles({
    root: {
        maxWidth: "80%",
        marginTop: "5%"
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
        width: "100%",
    },
});

export default function Question({question, handleSubmit, currentQuestion}) {
    const classes = useStyles();
    const handleOptionClick = (e) => {
        handleSubmit(currentQuestion, e)
    };

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent align="center">
                    <Typography gutterBottom variant="h5" component="h2" className={classes.option}>
                        {question.question_text}
                    </Typography>
                    {question.choices.map(data => {
                        let variant = "outlined";
                        let color = "primary";
                        if (question.answer) {
                            if (question.answer === data && question.isCorrect) {
                                variant = "contained";
                                color = "primary";
                            } else if (question.answer === data && !question.isCorrect) {
                                variant = "contained";
                                color = "secondary";
                            }
                            return (<Option
                                option={data}
                                handleClick={handleOptionClick}
                                disable={false}
                                variant={variant}
                                color={color}
                            />)
                        }
                        return (<Option
                            option={data}
                            handleClick={handleOptionClick}
                            disable={false}
                            variant={variant}
                            color={color}
                        />)
                    })}
                    <Typography gutterBottom variant="body2" component="h5" className={classes.option}>
                        {question.answer ? question.isCorrect ? "Correct answer" : `Wrong answer!! Correct answer is ${question.correct_answer}` : ''}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
