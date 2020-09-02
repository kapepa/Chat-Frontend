import React from 'react';
import { Auth, Home } from './pages';
import { Switch, Route } from 'react-router-dom';

function App(props) {
 return (
    <div className="App">
      <header className="App-header">
				<Switch>
					< Route exact path={["/", "/register", "/forget", "/recovery/:token", "/verify", ]} component={ Auth }/>
					< Route exact path={["/im"]} component={ Home }/>
				</Switch>
      </header>
    </div>
  );
}

export default App
