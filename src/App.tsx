import {
  IonApp, 
  IonRouterOutlet, 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './auth';
import LoginPage from './pages/LoginPage';
import AppTabs from './AppTabs';


const App: React.FC = () => {

  // set useState to true to test each page
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`redering App with loggedIn=${loggedIn}`);

  return (
    <IonApp>
      {/* Because we want this to be availabel to everything
      wrap in the AuthContext Provider. It provides the context to 
      all the components inside it*/}
      <AuthContext.Provider value={{loggedIn}}>
        {/* Pass in the loggedIn state value here */}
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <LoginPage onLogin={() => setLoggedIn(true)} />
          </Route>
          {/* AppTabs are now in a sort of second-level routing module */}
          <Route path="/my">
            {/* match any path starting with "my" - allows us to group all
            private pages in the AppTabs as a component  -- it kind of delegated to the "my"*/}
            {/* Pass loggedIn as a prop - this is okay if not too much, 
            but if need to use state across many components, youc an use React Context */}
            <AppTabs />
          </Route>
          <Redirect exact path="/" to="/my/entries" />
        </IonRouterOutlet>
      </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
