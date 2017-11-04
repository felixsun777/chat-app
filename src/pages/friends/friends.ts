import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';
import { ChatPage } from "../chat/chat";

@Component({
  selector: 'friends',
  templateUrl: 'friends.html',
  styleUrls: ['/pages/friends/friends.css']
})

export class FriendsPage {

  public friends = new Array();
  public username = '';

  constructor(private http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    this.username = this.navParams.get('username');
    this.getFriends();
  }

  onSelect(friend) {
    this.navCtrl.push(ChatPage, {
      user_initiate: this.username,
      user_finish: friend
    });
  }


  // connect to backend server
  getFriends() {
    const url = 'http://localhost:3000/friends?username=' + this.username + '';
    this.http.get(url).subscribe(data => {
      // Read the result field from the JSON response.
      for (const i in data) {
        if (data[i] != null) {
          this.friends.push(data[i].user_finish);
        }
      }
    });
  }
}
