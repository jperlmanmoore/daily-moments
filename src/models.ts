export interface Entry {
    id: string,
    title: string,
    description: string
};

export function toEntry(doc: firebase.firestore.DocumentSnapshot) {
    return { id: doc.id, ...doc.data()} as Entry
};