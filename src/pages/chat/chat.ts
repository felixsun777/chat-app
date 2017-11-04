import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload';


@Component({
  selector: 'chat',
  templateUrl: 'chat.html',
  styleUrls: ['/pages/about/chat.scss']
})

export class ChatPage {

  result: string;

  constructor(private http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    this.user_initiate = this.navParams.get('user_initiate');
    this.user_finish = this.navParams.get('user_finish');
  }

  public textList = new Array();
  public user_initiate = '';
  public user_finish = '';
  public input = null;
  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/mobileupload',
    method: 'POST'
  });

  // response to enter button clicking
  onClick(input) {
    this.input = input;
    if (input.value !== '') {
      const obj = {
        'user_initiate': '',
        'user_finish': '',
        'message' : ''
      };
      obj.user_initiate = this.user_initiate;
      obj.user_finish = this.user_finish;
      obj.message = input.value;
      const body = JSON.stringify(obj);
      this.post(body);
    }
  }

  // response to enter key pressing
  onKeypress(event, input) {
    if (event.keyCode === 13) {
      this.onClick(input);
    }
  }

  // response to upload files
  upload() {
    this.uploader.queue[0].upload(); // 开始上传
    alert('Uploading successfully done');
  }

  // display messages or pop out warning
  display(boolean) {
    if (boolean) {
      this.textList.push(this.user_initiate + ':  ' + this.input.value);
      this.input.value = '';
    }else {
      alert('Message not sent to server');
    }
  }

  // connect to backend server
  showHistory() {
    this.textList = [];
    const url = 'http://localhost:3000/messages?user_initiate=' + this.user_initiate
      + '&user_finish=' + this.user_finish + '';
    this.http.get(url).subscribe(data => {
      // Read the result field from the JSON response.
      for (const i in data) {
        if (data[i] != null) {
          this.textList.push(data[i].user_initiate + ':  ' + data[i].message);
        }
      }
    });
  }


  post(body) {
    this.http.post('http://localhost:3000/messages', body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8'),
    }).subscribe(data => {
      // Read the result field from the JSON response.
      this.result = data['result'];
      if (this.result === 'ok') {
        this.display(true);
      }else {
        this.display(false);
      }
    });
  }
}
