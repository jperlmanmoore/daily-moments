import { IonApp, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { AuthContext, useAuthInit } from './auth';
import LoginPage from './pages/LoginPage';
import AppTabs from './AppTabs';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';

// auth.onAuthStateChanged((user) => {
//   console.log('onAuthStateChanged:', user)
// });

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();
  if (loading) {
    return <IonLoading isOpen />
    // if IOS or Android you could take advangate of the native splash screen
  }
  console.log(`redering the App with auth:`, auth);
  return (
    <IonApp>
      {/* Because we want this to be availabel to everything
      wrap in the AuthContext Provider. It provides the context to 
      all the components inside it*/}
      <AuthContext.Provider value={auth}>
        {/* Pass in the loggedIn state value here */}
        <IonReactRouter>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
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
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
