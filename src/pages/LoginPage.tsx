import {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
} from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router';

interface Props {
    loggedIn: boolean;
    onLogin: () => void;
}
  
  const LoginPage: React.FC<Props> = ( { loggedIn, onLogin} ) => {
      if (loggedIn) {
       return <Redirect to="/my/entries" />;
      }
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Daily Moments</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <IonButton expand="block" onClick={onLogin}>LOGIN</IonButton> 
        </IonContent>
      </IonPage>
    );
  };
  
  export default LoginPage;
  