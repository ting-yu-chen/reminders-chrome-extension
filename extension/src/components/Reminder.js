class Time{
    constructor(time) {
        this.key = time ;
        this.hours = parseInt(time.split(':')[0]);
        this.minute = parseInt(time.split(':')[1]); 
        if (isNaN(this.hours) || isNaN(this.minute)){
          throw 'Invalid time format'; 
        }
        if (this.hours < 0 || this.hours > 23 || this.minute < 0 || this.minute > 59){
          throw 'Invalid time range'; 
        }
      }
}

export default class Reminder {
    constructor(title, body, time) {
      this.title = title;
      this.body = body;
      this.time = new Time(time)
      this.timer = null; 
    }
  }
  