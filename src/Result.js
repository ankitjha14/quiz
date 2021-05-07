import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: "80%",
        height: 800,
        marginTop: "5%"
    },
    media: {
        height: 300,
    },
    action: {
        align: "center",
    },
    formControl: {
        width: "100%",
        alignItems: "center",
    },
    formContent: {
        margin: "5%",
        width: "20%",
    },
    typo: {
        marginTop: "5%"
    }
});

export default function Result({results}) {
    const classes = useStyles();

    const answered = () => {
        const answered = results.filter(data =>
            data.answered
        );
        return answered.length || 0;
    };
    const correct = () => {
        const correct = results.filter(data =>
            data.isCorrect
        );
        return correct.length || 0;
    };
    const incorrect = () => {
        const incorrect = results.filter(data =>
            !data.isCorrect && data.answered
        );
        return incorrect.length || 0;
    };

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://cbspace.sgp1.cdn.digitaloceanspaces.com/reliable-academy/website/studymaterial/categories/1/computer-awareness-86bf576543556728f7104557eaf1e5ac4.jpg"
                    title="Computer Quiz"
                />
                <CardContent align="center">
                    <Typography gutterBottom variant="h5" component="h2">
                        Results
                    </Typography>
                    <Typography variant="h5" color="textSecondary" component="p">
                        Below are the results of your quiz
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.action}>
                <FormControl className={classes.formControl}>
                    <Typography gutterBottom variant="h5" color="primary" component="h2" className={classes.typo}>
                        Total Questions: <b>{results.length}</b>
                    </Typography>
                    <Typography gutterBottom variant="h5" color="primary" component="h2">
                        Questions Answered: <b>{answered()}</b>
                    </Typography>
                    <Typography variant="h5" color="primary" component="p">
                        Questions Correct: <b>{correct()}</b>
                    </Typography>
                    <Typography variant="h5" color="primary" component="p">
                        Questions Incorrect: <b>{incorrect()}</b>
                    </Typography>
                    <Button variant="outlined" color="primary" className={classes.formContent}>
                        <Link to={`/start`}>Restart Quiz</Link>
                    </Button>
                </FormControl>

            </CardActions>
        </Card>
    );
}
