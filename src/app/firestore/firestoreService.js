import firebase from '../config/firebase';

const db = firebase.firestore();

export default function getEventsFromFirestore(observer) {
    return db.collection('events').onSnapshot(observer);
}