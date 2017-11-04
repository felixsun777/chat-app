import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { FriendsPage } from "../friends/friends";

//import { Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: ['/pages/login/chat.scss']
})

export class LoginPage {


  result: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {}


  public title = 'Online Chatting Demo: ';
  public username = '';
  public password = '';


  // response to submit button clicking
  submitClick(username, password) {
    this.username = username.value;
    this.password = password.value;
    if (this.username === '' || this.password === '') {
      alert('Please enter username and password');
    }else {
      const url = 'http://localhost:3000/users?username=' + this.username + '&password=' + this.password;
      this.get(url);
    }
  }

  // response to clear button clicking
  resetClick(username, password) {
    username.value = '';
    password.value = '';
  }

  // response to enter key pressing
  onKeypress(event, username, password) {
    if (event.keyCode === 13) {
      this.submitClick(username, password);
    }
  }

  // connect to backend server
  get(url) {
    this.http.get(url).subscribe(data => {
      // Read the result field from the JSON response.
      this.result = data['result'];
      if (this.result === 'ok') {
        this.navCtrl.push(FriendsPage, {
          username: this.username
        });
      }else {
        alert(this.result);
      }
    });
  }



}
