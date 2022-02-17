/*global chrome*/

function ReminderBlock(props) {
  function removeHandler() {
    console.log(props, "target");

    chrome.storage.sync.get([props.time], (res) => {
      clearTimeout(res[props.time].timer);
    });
    chrome.storage.sync.remove([props.time], () => {
      console.log(`Reminder at ${props.time} is removed`);
    });

    chrome.alarms.clear(
      props.time,
      ()=>{
        console.log(`alarms with name ${props.time} is removed`);
      } 
    )
    props.update();
  } 
  return (
    <div class="container">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        {`${props.time} - ${props.title}`}
        <button type="button" class="btn btn-secondary" onClick={removeHandler}>
          Remove
        </button>
      </li>
    </div>
  );
}
export default ReminderBlock;
