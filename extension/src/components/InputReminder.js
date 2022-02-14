/*global chrome*/
import Reminder from "./Reminder";
import { useState, useEffect } from 'react'
function InputReminder(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [time, setTime] = useState("");

  function submitHandler(event) {
    event.preventDefault();
    if (title.trim() === '' || body.trim === '' || !time.includes(':') ){
      alert('Invalid Input');
      return ; 
    }
    let reminder ;
    try {
      reminder = new Reminder(title, body, time);
    } catch (e) {
      alert(e);
      return; 
    }
    chrome.runtime.sendMessage({reminder: reminder }, function(response) {
      console.log(response);
      props.update();
    });
    setTitle("");
    setBody("");
    setTime("");
    
  }

  return (
    <div class="container mt-3">
      <h3>Add more reminder:</h3>
      <form id="form">
        <div class="form-group">
          <label>Title</label>
          <input type="text" value={title} class="form-control" id="msgTitle" onChange={()=>{
            setTitle(document.getElementById("msgTitle").value);
          }} />
        </div>
        <div class="form-group">
          <label>Message</label>
          <input type="text" value={body} class="form-control" id="msgBody" onChange={()=>{
            setBody(document.getElementById("msgBody").value);
          }}/>
        </div>

        <div class="form-group">
          <label>Time</label>
          <input type="text" value={time} class="form-control" id="msgTime" onChange={()=>{
            setTime(document.getElementById("msgTime").value);
          }}/>
          <small>Format: MM:SS, e.g. 16:30</small>
        </div>

        <button type="submit" class="btn btn-primary" onClick={submitHandler}>
          ADD
        </button>
      </form>
    </div>
  );
}

export default InputReminder;
