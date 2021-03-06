import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { home as homeIcon, settings as settingsIcon } from "ionicons/icons";
import { Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import EntryPage from "./pages/EntryPage";
import AddEntryPage from './pages/AddEntryPage';
import React from "react";
import { useAuth } from "./auth";

// All pages or routes are properly secured now that we check to see
// if the user is logged in here
// the check applies to any "my" route


const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth();
  if (!loggedIn) { 
    return <Redirect to="/login" />
  }
  return (
    <IonTabs>
      {/* All private pages start wtih my */}
      <IonRouterOutlet>
        <Route exact path="/my/entries">
        <HomePage />
        </Route>
        <Route exact path="/my/entries/view/:id">
          <EntryPage />
        </Route>
        <Route exact path="/my/entries/add">
          <AddEntryPage />
        </Route>
        <Route exact path="/my/settings">
          <SettingsPage />
        </Route>
      </IonRouterOutlet>
      {/* TAB BAR */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/my/entries">
          <IonIcon icon={homeIcon} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonIcon icon={settingsIcon} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
