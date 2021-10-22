import firebase from '../config/firebase';

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
    if(!snapshot.exists) return undefined;
    const data = snapshot.data();
}
export default function getEventsFromFirestore(observer) {
    return db.collection('events').onSnapshot(observer);
}