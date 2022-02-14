/*global chrome*/

function createReminder(reminder) {
  const intervalLength = 86400000;
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
  let timeoutId = setTimeout(() => {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "notification.png",
      title: reminder.title,
      message: reminder.body,
    }, ()=>{
        console.log("Notification sent")
    });
  }, untilNext_ms);
  console.log(untilNext_ms, "milisecond");
  reminder.timer = timeoutId;
  chrome.storage.sync.set({ [reminder.time.key]: reminder }, () => {});
}

function recreateAllReminders() {
  chrome.storage.sync.get(null, (storageAll) => {
    console.log("recreate all");
    for (const key in storageAll) {
      if (key === "reminderCount") continue;
      let reminder = storageAll[key];
      clearTimeout(reminder.timer);
      createReminder(reminder);
    }
  });
}

/*
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
    if (key === "reminderCount" && oldValue === 0) {
      console.log("RESET ALL time out here");
      recreateAllReminders();
    }
  }
});
*/

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.reminder !== undefined) {
    createReminder(request.reminder);
    sendResponse({ res: "reminder created" });
  }
});


chrome.idle.onStateChanged.addListener(
   (state)=>{
       console.log(state);
       if (state === 'active'){
         recreateAllReminders();
       }
   }
)

chrome.windows.reminderCount = 0;
chrome.storage.sync.set(
  { "reminderCount": chrome.windows.reminderCount },
  () => {}
);
