/*global chrome*/

function ReminderBlock(props) {
  function removeHandler(event) {
    console.log(event.target, "target");
    console.log(props, "target");
    chrome.storage.sync.remove([props.time], ()=>{
        console.log(`Reminder at ${props.time.time} is removed`);
      });
    props.update();
  } 
  return (
    <div class="container">
      <div class="row justify-content-between">
        <span>
          <li class="list-group-item">{`${props.time} - ${props.title}`}</li>
        </span>
        <span>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={removeHandler}>
            Remove
          </button>
        </span>
      </div>
    </div>
  );
}
export default ReminderBlock;
