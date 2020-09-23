import {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { firestore } from "../firebase";
import { Entry, toEntry } from "../models";

interface RouteParams {
    id: string;
}
  
  const EntryPage: React.FC = () => {
    const { id }= useParams<RouteParams>();
    const [entry, setEntry ] = useState<Entry>();
    useEffect(() => {
      const entryRef = firestore.collection('entries').doc(id);
      // convert firestore document into our own entry object
      entryRef.get().then((doc) => setEntry(toEntry(doc)));
    }, [id]);
    // const entry = entries.find((entry) => entry.id ===id);
    // if (!entry) {
    //     throw new Error(`No such entry: ${id}`);
    // }
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton/>
              </IonButtons>
            <IonTitle>{entry?.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        {entry?.description}
        </IonContent>
      </IonPage>
    );
  };
  
  export default EntryPage;
  