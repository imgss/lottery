import './App.css';
import Lottery from './views/lottery';
import Join from './views/join';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/lottery">
          <Lottery />
        </Route>
        <Route path="/join"> 
          <Join />
        </Route>
        <Route path="*">
          <Lottery />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
