import {
  IonApp, 
  IonRouterOutlet, 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AppTabs from './AppTabs';

const App: React.FC = () => {

  // set useState to true to test each page
  const [loggedIn, setLoggedIn] = useState(true);
  console.log(`redering App with loggedIn=${loggedIn}`);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <LoginPage loggedIn={loggedIn}
              onLogin={() => setLoggedIn(true)} />
          </Route>
          {/* AppTabs are now in a sort of second-level routing module */}
          <Route path="/my">
            {/* match any path starting with "my" - allows us to group all
            private pages in the AppTabs as a component */}
            <AppTabs />
          </Route>
          <Redirect exact path="/" to="/my/entries" />
        </IonRouterOutlet>

      </IonReactRouter>
    </IonApp>
  );
};

export default App;
