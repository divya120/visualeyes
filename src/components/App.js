import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import * as Danfo from 'danfojs/src/index';
import './styles/App.css';

import Visualizer from './Visualizer';

const App = () => {

  const [datasetUrl, setDatasetUrl] = useState('');

  function onInputSubmit(e) {
    const datasetUrl = e.target.value;
    validateUrlAndSetState(datasetUrl);
  }

  function validateUrlAndSetState(datasetUrl) {
    Danfo.read_csv()
      .then(dataFrame => {
        setDatasetUrl(dataFrame);
      })
      .catch(e => {
        // TODO: Custom logic to display error to the user
        console.error(e);
      });
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>
            <h1 className="title">Paste your dataset's URL here</h1>
            <input type="text" onSubmit={onInputSubmit} />
          </div>
        </Route>
        <Route path="/visualizer">
          <Visualizer 
            datasetUrl = {datasetUrl}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
