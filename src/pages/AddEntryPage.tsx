import {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonTextarea,
    IonButton,
    IonDatetime,
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { firestore } from '../firebase'

// interface RouteParams {
//     id: string;
// }
  
  const AddEntryPage: React.FC = () => {
    const { userId } = useAuth();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

  const handleSave = async () => {
    // console.log('should save:', { title, description});
    const entriesRef = firestore.collection('users').doc(userId)
    .collection('entries');
    const entryData = { date, title, description };
    const entryRef = await entriesRef.add(entryData);
    console.log('saved:', entryRef.id);
    history.goBack();
  }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton/>
              </IonButtons>
            <IonTitle>{}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
      <IonList>
      <IonItem>
          <IonLabel position="stacked">Date</IonLabel>
          <IonDatetime 
            value={date}
            onIonChange={(event) => setDate(event.detail.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput 
            value={title}
            onIonChange={(event) => setTitle(event.detail.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Description</IonLabel>
          <IonTextarea 
          value={description}
          onIonChange={(event) => setDescription(event.detail.value)}
          />
        </IonItem>
        <IonButton expand="block" onClick={handleSave}>Save</IonButton>
      </IonList>
        </IonContent>
      </IonPage>
    );
  };
  
  export default AddEntryPage;
  