import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import StartQuiz from "./StartQuiz";
import Quiz from "./Quiz";

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/quiz/:difficulty">
                        <Quiz/>
                    </Route>
                    <Route path="/">
                        <StartQuiz/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
