import logo from './logo.svg';
import React, { useEffect, useState } from 'react';

import './App.css';
import { onMessageListener, requestFirebaseNotificationPermission } from './firebaseInit';

function App() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    onMessageListener();
    console.log('deviceID', MediaDeviceInfo.deviceID)  
  }, []);

   const handleClick = () => {
      console.log('clicked')
      setCount(11);
      onMessageListener();
      requestFirebaseNotificationPermission();

   }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick} >Request permission</button>
      </header>
    </div>
  );
}

export default App;
