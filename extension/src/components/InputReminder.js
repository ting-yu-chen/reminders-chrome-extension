/*global chrome*/
import Reminder from "./Reminder";

function InputReminder(props) {
  function createReminder(reminder) {
    const intervalLength = 3600000;
    const now = new Date();
    let untilNext_ms =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        reminder.time.hours,
        reminder.time.minute,
        0,
        0
      ).getTime() - Date.now();
    untilNext_ms =
      untilNext_ms < 0 ? untilNext_ms + intervalLength : untilNext_ms;
    setTimeout(() => {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "notification.png",
        title: reminder.title,
        message: reminder.body,
      });
      setInterval(() => {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "notification.png",
          title: reminder.title,
          message: reminder.body,
        });
      }, intervalLength);
    }, untilNext_ms);

    chrome.storage.sync.set({ [reminder.time.key]: reminder }, () => {});
  }

  function submitHandler(event) {
    event.preventDefault();
    const title = document.getElementById("msgTitle").value;
    const body = document.getElementById("msgBody").value;
    const time = document.getElementById("msgTime").value;

    console.log(title, body, time);
    const reminder = new Reminder(title, body, time);
    chrome.storage.sync.set({ [time]: reminder }, () => {
      console.log(reminder);
    });
    createReminder(reminder);
    props.update();
  }

  return (
    <div class="container mt-3">
      <h3>Add more reminder:</h3>
      <form id="form">
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" id="msgTitle" />
        </div>
        <div class="form-group">
          <label>Message</label>
          <input type="text" class="form-control" id="msgBody" />
        </div>

        <div class="form-group">
          <label>Time</label>
          <input type="text" class="form-control" id="msgTime" />
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
