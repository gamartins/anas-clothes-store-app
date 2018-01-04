import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserInfoProvider {

  public user = {
    token: null,
  }

  constructor(private storage: Storage, private events: Events) {
    console.log('Hello UserInfoProvider Provider');
    this.getUserData()
  }

  private getUserData() {
    Object.keys(this.user).forEach(key => {
      this.storage.get(key).then(data => {
        if(data) this.user[key] = data
        if(this.user.token) this.events.publish('user:loaded')
      })
    })
  }

  public saveUserData(user: { token }) {
    Object.keys(user).forEach(key => {
      this.storage.set(key, user[key]).then(() => this.user[key] = user[key])
    })
  }

  public eraseUserData() {
    Object.keys(this.user).forEach(key => this.user[key] = null)
    return this.storage.clear()
  }

}
