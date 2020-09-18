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
import { useAuth } from '../auth';

interface Props {
    onLogin: () => void;
}
  
  const LoginPage: React.FC<Props> = ( { onLogin} ) => {
    const { loggedIn} = useAuth();
    // custom hook useAuth() - this component doesn't worry about React Context 
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
  