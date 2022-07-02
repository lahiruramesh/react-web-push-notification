import firebase from 'firebase';
import addNotification from "react-push-notification";
require('firebase/auth');
require('firebase/database');
require('firebase/messaging');

const config = {
    apiKey: "AIzaSyAshWMTrrxhOfkdYw6jurk09kQPuWyqxMo",
    authDomain: "deedmed-lives.firebaseapp.com",
    databaseURL: 'https://deedmed-lives-default-rtdb.firebaseio.com/',
    projectId: "deedmed-lives",
    storageBucket: "deedmed-lives.appspot.com",
    messagingSenderId: "125946472518",
    appId: "1:125946472518:web:30c0528e3eb96c96ecc247",
    measurementId: "G-QY7S8RF9TY"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();


export const requestFirebaseNotificationPermission = () =>
    new Promise((resolve, reject) => {
        messaging.getToken()
            .then((firebaseToken) => {
                resolve(firebaseToken);
            })
            .catch((err) => {
                reject(err);
            });

        if (firebase.messaging.isSupported()) {
            console.log('supported');
            firebase.messaging();
        }
    });

export const onMessageListener = () =>
    new Promise(() => {
        messaging.onMessage((payload) => {
            addNotification({
                title: payload.notification.title,
                message:payload.notification.body,
                theme: 'darkblue',
                duration: 4000000,
                native: true,
                onClick: () => window.open(payload.notification.click_action,'_blank'),
            });
        });
    });    