
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireMessaging } from 'angularfire2/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessagingService {

currentMessage = new BehaviorSubject(null);

constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
        (_messaging) => {
            _messaging.onMessage = _messaging.onMessage.bind(_messaging);
            _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        }
        );
    }



  /**
   * update token in firebase database.
   * Update token based on userId to Firebase DB.
   * You can replace this function based what need like update to your DB via back-end service.
   * Remember, you need to change database permission to can write new/update object.
   *
   * @param userId userId as a key
   * @param token token as a value
   */
updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
        () => {
            const data = {};
            data[userId] = token;
            this.angularFireDB.object('fcmTokens/').update(data);
        });
    }



  /**
   * request permission for notification from firebase cloud messaging.
   * Browser/ device will ask to user for permission to receive notification.
   * After permission is granted by user, firebase will return a token that can use as reference to send notification to the browser.
   *
   * @param userId userId
   */
requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
        (token) => {
            console.log(token);
            this.updateToken(userId, token);
        },
        (err) => {
            console.error('Unable to get permission to notify.', err);
        }
        );
}



  /**
   * hook method when new notification received in foreground. This function will triggered when new massage has received.
   */
receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
        (payload) => {
            console.log('new message received. ', payload);
            this.currentMessage.next(payload);
        });
    }
}
