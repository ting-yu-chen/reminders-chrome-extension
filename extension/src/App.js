/*global chrome*/
import InputReminder from './components/InputReminder';
import ReminderList from './components/ReminderList';
import { useState } from 'react'

function App() {
  // init a storage where stores all keys in an array 
  const [isUpdated, setIsUpdated] = useState(false)
  function updateRemiders(){
    setIsUpdated(!isUpdated); 
  }
  return (
    <div className="container" >
     <InputReminder update={updateRemiders}></InputReminder>
     <ReminderList update={updateRemiders} isUpdated={isUpdated}></ReminderList>
    </div>
  );
}

export default App;
