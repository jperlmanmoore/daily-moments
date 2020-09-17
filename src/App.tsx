import {
  IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons';
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import EntryPage from './pages/EntryPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`redering App with loggedIn=${loggedIn}`);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
        <IonRouterOutlet>
        <Route exact path="/login">
           {loggedIn ?
              <Redirect to="/entries" /> :
              <LoginPage  onLogin={() => setLoggedIn(true)}/>
           }
        </Route>
        <Route exact path="/entries">
           {loggedIn ? <HomePage/> : <Redirect to="/login"/>}
        </Route>
        <Route exact path="/settings">
           <SettingsPage />
        </Route>
        <Route exact path="/entries/:id">
           <EntryPage />
        </Route>
        <Redirect exact path="/" to="/home"/>
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton tab="home" href="/entries">
            <IonIcon icon={homeIcon}/>
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settingsIcon}/>
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
