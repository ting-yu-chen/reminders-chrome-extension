/*global chrome*/
import ReminderBlock from "./RemiderBlock";
import { useState, useEffect } from 'react'

function ReminderList(props){
    const [reminders, setReminders] = useState([])
    
    function getReminderArray(storageAll){
        const tmp = [];
        for (const key in storageAll) {
            if (key !== "reminderCount"){
                tmp.push(storageAll[key]);
            }
        }
        setReminders(tmp);
        chrome.windows.reminderCount = tmp.length ; 
        chrome.storage.sync.set({ "reminderCount": chrome.windows.reminderCount }, () => {});
    }
    useEffect(() => {
        chrome.storage.sync.get(null, (result)=>{
            getReminderArray(result)
        });
    }, [props.isUpdated]);
    
    const reminderList = reminders.map((reminder)=>{
            return <ReminderBlock key={reminder.time.key} time={reminder.time.key} title={reminder.title} update={props.update}></ReminderBlock>
        })
    return (
      <div class="container mt-5">
        <h3>Your reminders: </h3>
        <ul class="list-group" id="remider-list">
          {reminderList}
        </ul>
      </div>
    );
}

export default ReminderList; 