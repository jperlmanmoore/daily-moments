import {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonList,
    IonLabel,
    IonInput,
    IonItem,
    IonText,
    IonLoading,
} from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';
import {useState} from 'react';


  
  const LoginPage: React.FC = () => {
    // custom hook useAuth() - this component doesn't worry about React Context 
    const { loggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({loading: false, error: false});
  

    const handleLogin = async () => {
      console.log({email, password});
      try {
      const credential = await auth.signInWithEmailAndPassword(email, password);
      console.log('credential:', credential);
      } catch (error) {
        setStatus({loading: false, error: true});
        console.log('error:', error);
      }
      
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
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput type="email" value={email}
              onIonChange={(event => setEmail(event.detail.value))}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput type="password" value={password}
              onIonChange={(event => setPassword(event.detail.value))}
              />
            </IonItem>
          </IonList>
          {/* conditionally render - if err, then show this */}
          {status.error &&
          <IonText color="danger">invalid credential</IonText>
        }
        <IonButton expand="block" onClick={handleLogin}>LOGIN</IonButton> 
        {
        <IonLoading isOpen={status.loading} />
  }
        </IonContent>
      </IonPage>
    );
  };
  
  export default LoginPage;
  