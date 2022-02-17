/*global chrome*/

chrome.runtime.onStartup.addListener(() => {
  chrome.windows.reminderCount = 0;
  chrome.storage.sync.set(
    { reminderCount: chrome.windows.reminderCount },
    () => {}
  );
});


function createReminder(reminder) {
  const intervalLengthMins = 1440;
  const now = new Date();
  let untilNextMins = (
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      reminder.time.hours,
      reminder.time.minute,
      0,
      0
    ).getTime() - Date.now())/60000;
    untilNextMins =
    untilNextMins < 0 ? untilNextMins + intervalLengthMins : untilNextMins;
    console.log('create: next ----->', untilNextMins);
    chrome.alarms.create(reminder.time.key, {
      periodInMinutes: intervalLengthMins,
      delayInMinutes: untilNextMins
    });
  
  chrome.storage.sync.set({ [reminder.time.key]: reminder }, () => {});
}

/*
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
    if (key === "reminderCount" && (newValue === 0 || oldValue===0) ) {
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

addEventListener('activate', e=>{
  console.log('onactivate')
  chrome.alarms.getAll(
    (alarmArr)=>{
      for(const alarm of alarmArr){
        console.log(alarm);
      }
    }
  )
})


chrome.alarms.onAlarm.addListener(function(alarm) {
  chrome.storage.sync.get(null, (storageAll) => {
    for (const key in storageAll) {
      if (key === "reminderCount") continue;
      let reminder = storageAll[key];
      if (alarm.name === reminder.time.key){
        chrome.notifications.create({
          type: "basic",
          iconUrl: "notification.png",
          title: reminder.title,
          message: reminder.body,
        }, ()=>{
            console.log("Notification sent")
        });
        break; 
      }
    }
  });
});
