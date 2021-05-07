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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: "80%",
        height: 800,
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
    formContent: {
        margin: "2%",
        width: "20%",
    },
});

export default function StartQuiz() {
    const classes = useStyles();

    const [difficulty, setDifficulty] = React.useState('easy');

    const handleChange = (event) => {
        setDifficulty(event.target.value);
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container fixed>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://cbspace.sgp1.cdn.digitaloceanspaces.com/reliable-academy/website/studymaterial/categories/1/computer-awareness-86bf576543556728f7104557eaf1e5ac4.jpg"
                            title="Computer Quiz"
                        />
                        <CardContent align="center">
                            <Typography gutterBottom variant="h5" component="h2">
                                Lets Start With Quiz....
                            </Typography>
                            <Typography variant="h5" color="textSecondary" component="p">
                                Which level of quiz you want to play?
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.action}>
                        <FormControl className={classes.formControl}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={difficulty}
                                onChange={handleChange}
                                className={classes.formContent}
                            >
                                <MenuItem value={"easy"}>Easy</MenuItem>
                                <MenuItem value={"medium"}>Medium</MenuItem>
                                <MenuItem value={"hard"}>Hard</MenuItem>
                            </Select>
                            <Button variant="outlined" color="primary" className={classes.formContent}>
                                <Link to={`/quiz/${difficulty}`}>Start Quiz</Link>
                            </Button>

                        </FormControl>

                    </CardActions>
                </Card>
            </Container>
        </React.Fragment>
    );
}
