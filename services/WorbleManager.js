import { Subject, BehaviorSubject } from 'rxjs';
import { Notifications, SecureStore } from 'expo';
import { Worble } from '../models/Worble';
import AppConstants from '../constants/AppConstants';

class WorbleService {
	currentProfile = {};
	actionTaken = new Subject();
	actionTaken$ = this.actionTaken.asObservable();
	hideActions = new Subject();
	hideActions$ = this.hideActions.asObservable();
	isInboxShown = new Subject();
	isInboxShown$ = this.isInboxShown.asObservable();
	inboxMessages = new BehaviorSubject([]);
	inboxMessages$ = this.inboxMessages.asObservable();
	isVeripediaShown = new Subject();
	isVeripediaShown$ = this.isVeripediaShown.asObservable();
	veripediaItems = new BehaviorSubject([]);
	veripediaItems$ = this.veripediaItems.asObservable();
	action = new Subject();
	action$ = this.action.asObservable();
	worbleActions = new BehaviorSubject([]);
	worbleActions$ = this.worbleActions.asObservable();
	worbleState = new BehaviorSubject(AppConstants.WorbleState);
	worbleState$ = this.worbleState.asObservable();
	worbleName = new Subject();
	worbleName$ = this.worbleName.asObservable();
	worbleImgSrc = new Subject();
	worbleImgSrc$ = this.worbleImgSrc.asObservable();
	homeProgressLoader = new Subject();
	homeProgressLoader$ = this.homeProgressLoader.asObservable();
	appProgressLoader = new Subject();
	appProgressLoader$ = this.appProgressLoader.asObservable();
	eggState = new BehaviorSubject();
	eggState$ = this.eggState.asObservable();
	currentEggState = null;
	showWorbleAppearance = new Subject();
	showWorbleAppearance$ = this.showWorbleAppearance.asObservable();
	profileInfo = new BehaviorSubject(AppConstants.ProfileInfo);
	profileInfo$ = this.profileInfo.asObservable();
	ariMessages = new BehaviorSubject([]);
	ariMessages$ = this.ariMessages.asObservable();
	ariState = new BehaviorSubject({});
	ariState$ = this.ariState.asObservable();
	appState = new Subject();
	appState$ = this.appState.asObservable();
	constructor() {
		this.getEggState().then((data) => {
			this.eggState.next(data);
		})
		this.eggState$.subscribe(data => {
			this.currentEggState = data;
			this.setEggState(data).then(() => {}, () => {});
		});
		this.getProfileInformation().then((data) => {
			this.currentProfile = data;
			this.profileInfo.next(data);
		});
		this.profileInfo$.subscribe((data) => {
			this.currentProfile = data;
		});

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
	}
	setStorage(key, value) {
		return SecureStore.setItemAsync(key, value.toString());
	}
	getStorage(key) {
		return SecureStore.getItemAsync(key);
	}
	deleteStorage(key) {
		return SecureStore.deleteItemAsync(key);
	}
	async getEggState() {
		const result = await this.getStorage(AppConstants.STORAGE_KEYS.EGG_STATE);
		if (result) {
			return JSON.parse(result);
		} else {
			return AppConstants.NEW_WORBLE_EGG_STATE;
		}
	}
	async setEggState(state) {
		await this.setStorage(AppConstants.STORAGE_KEYS.EGG_STATE, JSON.stringify(state));
	}
	async getProfileInformation() {
		const result = await this.getStorage(AppConstants.STORAGE_KEYS.PROFILE_INFO);
		if (result) {
			return JSON.parse(result);
		} else {
			return AppConstants.ProfileInfo;
		}
	}
	async setProfileInformation(data) {
		return await this.setStorage(AppConstants.STORAGE_KEYS.PROFILE_INFO, JSON.stringify(data));
	}
}

export default WorbleManager = new WorbleService();