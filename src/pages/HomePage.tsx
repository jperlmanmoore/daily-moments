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

const HomePage: React.FC = () => {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const entriesRef = firestore.collection('entries');
    entriesRef.orderBy("title", "asc").get().then((snapshot) => {
      // snapshot.docs.forEach((doc) => console.log(doc.id, doc.data()));
      
      // convert the data inot an easier way to dispaly on the page
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('entries', entries)
      setEntries(entries);
    });
  }, []);
  // useEffect(() => {
  //   const entriesRef = firestore.collection('entries');
  //   entriesRef.get().then((snapshot) => {
  //     const entries = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setEntries(entries);
  //   }, []);
  // });
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
