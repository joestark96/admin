import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(
  ) { }
  
  public getDate(): string {
    var today = new Date();
    var hour = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var month = (today.getMonth() + 1).toString();
    var day = today.getDate().toString();
    var date = today.getFullYear()  + '-' + (month.length < 2 ? "0" + month : month) + '-' + (day.length < 2 ? "0" + day : day);
    date = date + "T" + hour;

    return date;
  }

  public getToday(){
      var today = new Date(Date.now());
      var hour = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var month = (today.getMonth() + 1).toString();
      var day = today.getDate().toString();
      var date = today.getFullYear()  + '-' + (month.length < 2 ? "0" + month : month) + '-' + (day.length < 2 ? "0" + day : day);
      date = date + "T" + hour;
      return date;
  }

  getOS(): string {
    var platform = window.navigator.userAgent;

    platform.match("Linux");
    platform.match("Windows");
    platform.match("Macintosh");
    platform.match("Android");
    platform.match("iPhone");
    alert(platform);
    return "";
  }
  
  getCurrentMonthYear(){
    let monthYear = this.getToday().split('T')[0].split('-');
    console.log(monthYear);
    return monthYear[0] + '-' + monthYear[1];
  }

  formatDate(date: string){
    const fecha = date.split('T')[0].split('-');

    return fecha[2] + '-' + fecha[1] + '-' + fecha[0];
  }
}
