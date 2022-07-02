

import firebase from "firebase";

export const registerServiceWorker = () => {
    const headers = new Headers();
    headers.append('Service-Worker-Allowed', '/firebase-messaging-sw.js');
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('firebase-messaging-sw.js', {scope: '/firebase-messaging-sw.js'})
            .then(function (registration) {
                firebase.messaging().useServiceWorker(registration)
                return registration.scope;
            })
            .catch(function (err) {
                return err;
            });
    }
};