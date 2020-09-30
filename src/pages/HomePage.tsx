import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { add as addIcon } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { firestore } from "../firebase";
import { Entry, toEntry } from "../models";
import { useAuth } from "../auth";
import formatDate  from "../date";

const HomePage: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const entriesRef = firestore.collection('users').doc(userId)
    .collection('entries');
    return entriesRef
      .limit(5)
      .orderBy("date", "desc")
      .onSnapshot(({docs}) => setEntries(docs.map(toEntry)));
    // entriesRef.orderBy("title", "asc").get().then(( { docs }) => setEntries(docs.map(toEntry)));       
  }, [userId]);

  // function formatDate(isoString) {
  //   return new Date(isoString).toLocaleDateString('en-US', {
  //     day: 'numeric', month: 'short', year: 'numeric' 
  //   })
  // };

  // console.log('[HomePage] render entries:', entries)
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
              routerLink={`/my/entries/view/${entry.id}`}>
                <IonLabel>
                <h2>{formatDate(entry.date)}</h2>
                <h3>{entry.title}</h3>
                </IonLabel>
              {entry.title}
            </IonItem>
          )}
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
         <IonFabButton routerLink="/my/entries/add">
           <IonIcon icon={addIcon}/>
           </IonFabButton> 
        </IonFab>
      </IonContent>
    </IonPage>
  );
};


export default HomePage;

// EXTRAS
// *if no entries, display a message to the user that there are no entries 
// & invite a user to make an entry

// *limit to a certain number 
// & put something like 5 entries on a page and then go to the next page for the next 5

// *allow the user to query and get entries by a date range

// *allow the user to query and get entries by a title

// *allow the user to query and get entries by searching the description

// *allow the user to edit an entry