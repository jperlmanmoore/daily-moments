import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { firestore } from "../firebase";
import { Entry, toEntry } from "../models";

const HomePage: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const entriesRef = firestore.collection('entries');
    entriesRef.orderBy("title", "asc").get().then(( { docs }) => { setEntries(docs.map(toEntry));    
    });    
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {entries.map((entry) =>
            <IonItem button key={entry.id}
              routerLink={`/my/entries/${entry.id}`}>
              {entry.title}
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};


export default HomePage;
