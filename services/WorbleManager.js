import { Subject } from 'rxjs';
import { Notifications } from 'expo';

class WorbleService {
	actionTaken = new Subject();
	actionTaken$ = this.actionTaken.asObservable();
	hideActions = new Subject();
	hideActions$ = this.hideActions.asObservable();
	isInboxShown = new Subject();
	isInboxShown$ = this.isInboxShown.asObservable();
	constructor() {
	}
	sendNotification() {
		const localNotification = {
			title: 'Veritas',
			body: 'Ari has a message for you', // (string) — body text of the notification.
			ios: { // (optional) (object) — notification configuration specific to iOS.
				sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
				image: require('../assets/images/worble.png'),
			},
			data: {
				title: 'Message from Ari',
				message: 'Your worble needs cuddling!'
			}
		};
		let t = new Date();
		t.setSeconds(t.getSeconds() + 5);
		const schedulingOptions = {
			time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
		};
		Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
		console.log(45454564564);
	}
}

export default WorbleManager = new WorbleService();