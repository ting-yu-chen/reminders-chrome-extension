class Time{
    constructor(time) {
        this.key = time ;
        this.hours = parseInt(time.split(':')[0]);
        this.minute = parseInt(time.split(':')[1]); 
      }
}

export default class Reminder {
    constructor(title, body, time) {
      this.title = title;
      this.body = body;
      this.time = new Time(time)
      this.interval = null; 
    }
  }
  