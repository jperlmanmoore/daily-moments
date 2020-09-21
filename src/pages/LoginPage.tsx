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
import { auth } from '../firebase';

interface Props {
    onLogin: () => void;
}
  
  const LoginPage: React.FC<Props> = ( { onLogin} ) => {
    // custom hook useAuth() - this component doesn't worry about React Context 
    const { loggedIn} = useAuth();

    const handleLogin = async () => {
      const credential = await auth.signInWithEmailAndPassword('test@test.test', 'test123');
      console.log('credential:', credential);
    };
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
        <IonButton expand="block" onClick={handleLogin}>LOGIN</IonButton> 
        </IonContent>
      </IonPage>
    );
  };
  
  export default LoginPage;
  