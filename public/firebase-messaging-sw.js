importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js');

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow(event.notification.data.FCM_MSG.notification.click_action);
  }));
});

const config = {
    apiKey: "AIzaSyAshWMTrrxhOfkdYw6jurk09kQPuWyqxMo",
    authDomain: "deedmed-lives.firebaseapp.com",
    projectId: "deedmed-lives",
    storageBucket: "deedmed-lives.appspot.com",
    messagingSenderId: "125946472518",
    appId: "1:125946472518:web:30c0528e3eb96c96ecc247",
    measurementId: "G-QY7S8RF9TY"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

if (firebase.messaging.isSupported()) {
  firebase.messaging();
}

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png',
    click_action:payload.data.click_action
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});