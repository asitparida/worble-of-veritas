import WorbleManager from "./WorbleManager";
import AppConstants from "../constants/AppConstants";

class WorbleGamePlay {
    state = null;
    nextState = null;
    timeout = null;
    subscriptions = [];
    initSubscriptions() {
        this.subscriptions = [
            WorbleManager.actionTaken$.subscribe(actionTaken => {
                // console.log(actionTaken);
            }),
            WorbleManager.action$.subscribe(action => {
                switch (action) {
                    case 'INCUBATE_EGG': {
                        WorbleManager.appProgressLoader.next({
                            state: true,
                            message: `Incubating egg ...`,
                            autoDismiss: 5000,
                            stateOnDimsiss: 'EGG_INCUBATED'
                        });
                        break;
                    }
                    case 'SHAKE_EGG': {
                        WorbleManager.appState.next('EGG_FLIPPING');
                        break;
                    }
                    case 'HATCH_EGG': {
                        WorbleManager.appProgressLoader.next({
                            state: true,
                            message: `Hatching egg ...`,
                            autoDismiss: 5000,
                            stateOnDimsiss: 'EGG_HATCHED'
                        });
                        break;
                    }
                    case 'FEED_FIREBERRY': {
                        WorbleManager.worbleState.next({
                            showEgg: false,
                            worbleImgSrc: AppConstants.WORBLE_EATING_FIREBERRY
                        });
                        WorbleManager.appProgressLoader.next({
                            state: true,
                            message: `Feeding fireberries ...`,
                            autoDismiss: 5000,
                            stateOnDimsiss: 'WORBLE_FED_FIRBERRIES'
                        });
                        break;
                    }
                    case 'FEED_RAW_MARSHMELLOW': {
                        WorbleManager.worbleState.next({
                            showEgg: false,
                            worbleImgSrc: AppConstants.WORBLE_EATING_MARSHMALLOW
                        });
                        WorbleManager.appProgressLoader.next({
                            state: true,
                            message: `Feeding raw marshmallows ...`,
                            autoDismiss: 5000,
                            stateOnDimsiss: 'WORBLE_FED_RAW_MARSHMALLOWS'
                        });
                        break;
                    }
                }
            }),
            WorbleManager.appState$.subscribe(state => {
                this.loadState(state);
            })
        ];
    }
    cleanSubscriptions() {
        this.subscriptions.forEach(x => {
            if (x) {
                x.unsubscribe();
                x = null;
            }
        })
    }
    init() {
    }
    loadState(state) {
        const profile = WorbleManager.currentProfile;
        switch (state) {
            case 'READY_TO_INCUBATE': {
                setTimeout(() => {
                    const worbleAction = [{ id: 'incubate_egg', text: 'Incubate', action: 'INCUBATE_EGG' }];
                    WorbleManager.worbleActions.next(worbleAction);
                    WorbleManager.ariState.next({
                        message: 'You need to incubate your egg. Check your available ACTIONS.',
                        forceMessageShow: true,
                        autoDismiss: 3000
                    });
                }, 2000);
                break;
            }
            case 'EGG_INCUBATED': {
                profile.progress = 25;
                WorbleManager.profileInfo.next(profile);
                WorbleManager.worbleActions.next([]);
                WorbleManager.ariState.next({
                    message: 'Your egg is incubated. Yay !!!',
                    forceMessageShow: true,
                    autoDismiss: 3000
                });
                setTimeout(() => {
                    const worbleAction = [{ id: 'SHAKE_EGG', text: 'Shake Egg', action: 'SHAKE_EGG' }];
                    WorbleManager.worbleActions.next(worbleAction);
                    WorbleManager.ariState.next({
                        message: 'You can try shaking your egg to keep it warm!',
                        forceMessageShow: true,
                        autoDismiss: 3000
                    });
                }, 5000)
                break;
            }
            case 'EGG_READY_TO_HATCH': {
                profile.progress = 50;
                WorbleManager.profileInfo.next(profile);
                const worbleAction = [{ id: 'hatch_egg', text: 'Hatch Egg', action: 'HATCH_EGG' }];
                WorbleManager.worbleActions.next(worbleAction);
                WorbleManager.ariState.next({
                    message: 'Cool... Your egg is ready for hatching... Hatch it !!!',
                    forceMessageShow: true,
                    autoDismiss: 3000
                });
                break;
            }
            case 'EGG_HATCHED': {
                profile.progress = 100;
                WorbleManager.profileInfo.next(profile);
                WorbleManager.worbleActions.next([]);
                WorbleManager.ariState.next({
                    message: 'Your egg is hatched. Yay !!!',
                    forceMessageShow: true,
                    autoDismiss: 3000
                });
                setTimeout(() => {
                    profile.level = profile.level + 1;
                    WorbleManager.profileInfo.next(profile);
                    WorbleManager.worbleActions.next([]);
                    WorbleManager.worbleState.next({
                        showEgg: false
                    });
                    WorbleManager.ariState.next({
                        message: 'Look at that beautiful Worble!',
                        forceMessageShow: true,
                        autoDismiss: 3000,
                        stateOnDimsiss: 'MESSAGE_FROM_GORDON'
                    });
                }, 4000)
                break;
            }
            case 'MESSAGE_FROM_GORDON': {
                profile.progress = 10;
                WorbleManager.profileInfo.next(profile);
                const message1 = {
                    id: 1, name: 'Gordon', message: `Hi ${profile.name}`, time: '20 mins ago', status: 'NEW', opened: false, messageContent: {
                        title: 'Hey',
                        text: `I heard you recently hatched a Worble. Congratulations ${profile.name} !`
                    }
                };
                const message2 = {
                    id: 2, name: 'Gordon', message: `Look what I found !`, time: '5 mins ago', status: 'NEW', opened: false, messageContent: {
                        title: `Hey  ${profile.name} `,
                        text: `You know, someone told me that Fireberries give Worbles special skills. Try feeding it Fireberries !!!`
                    }
                };
                const worbleAction = {
                    id: 'feed', text: 'FEED', action: {
                        type: 'OVERLAY_MENU',
                        title: 'Feed',
                        data: [
                            { id: 'fireberry', text: 'Fireberry', action: 'FEED_FIREBERRY' }
                        ]
                    }
                };
                WorbleManager.worbleState.next({
                    showEgg: false
                });
                WorbleManager.inboxMessages.next([message2, message1]);
                WorbleManager.worbleActions.next([worbleAction]);
                WorbleManager.ariState.next({
                    message: 'You have a new message from Gordon. Check your INBOX.',
                    forceMessageShow: true,
                    autoDismiss: 3000
                });
                break;
            }
            case 'WORBLE_FED_FIRBERRIES': {
                profile.progress = profile.progress + 10;
                WorbleManager.profileInfo.next(profile);
                WorbleManager.ariState.next({
                    message: 'That was cool... Your Worble can now spit FIRE !!',
                    forceMessageShow: true,
                    autoDismiss: 3000
                });
                WorbleManager.worbleState.next({
                    showEgg: false,
                    worbleImgSrc: AppConstants.WORBLE_BREATHING_FIREBERRY
                });
                setTimeout(() => {
                    WorbleManager.worbleState.next({
                        showEgg: false,
                        worbleImgSrc: AppConstants.WORBL_HAPPY_GIF
                    });
                    WorbleManager.appState.next('MESSAGE_FROM_GORDON_BAD');
                }, 5000)
                break;
            }
            case 'MESSAGE_FROM_GORDON_BAD': {
                profile.progress = 50;
                WorbleManager.profileInfo.next(profile);
                const message1 = {
                    id: 3, name: 'Gordon', message: `Marshmellows`, time: '50 mins ago', status: 'NEW', opened: false, messageContent: {
                        title: `Hey  ${profile.name} `,
                        text: `I have some awesome info for you. I read that Worbles love raw marshmellows. You should defintely try it out.`
                    }
                };
                const worbleAction = {
                    id: 'feed', text: 'FEED', action: {
                        type: 'OVERLAY_MENU',
                        title: 'Feed',
                        data: [
                            { id: 'fireberry', text: 'Fireberries', action: 'FEED_FIREBERRY' },
                            { id: 'raw_marshmallow', text: 'Raw Marshmallows', action: 'FEED_RAW_MARSHMELLOW' }
                        ]
                    }
                };
                WorbleManager.worbleState.next({
                    showEgg: false
                });
                WorbleManager.inboxMessages.next([message1]);
                WorbleManager.worbleActions.next([worbleAction]);
                WorbleManager.ariState.next({
                    message: 'You have a new message from Gordon. Check your INBOX.',
                    forceMessageShow: true,
                    autoDismiss: 5000
                });
                break;
            }
            case 'WORBLE_FED_RAW_MARSHMALLOWS': {
                profile.progress = 75;
                WorbleManager.profileInfo.next(profile);
                WorbleManager.ariState.next({
                    message: 'Your worble is not hungry anymore !!',
                    forceMessageShow: true,
                    autoDismiss: 2000
                });
                WorbleManager.worbleState.next({
                    showEgg: false,
                    worbleImgSrc: AppConstants.WORBL_HAPPY_GIF
                });
                setTimeout(() => {
                    WorbleManager.appState.next('WORBLE_SICK');
                }, 5000);
                break;
            }
            case 'WORBLE_SICK': {
                WorbleManager.worbleState.next({
                    showEgg: false,
                    worbleImgSrc: AppConstants.WORBL_SICK_GIF
                });
                const veripediaItem = {
                    id: 1, name: 'Guide to Veritas, VeriBooks Inc', message: `Worble Diet`, time: '5 mins ago', status: 'NEW', opened: false, messageContent: {
                        title: `Marshmallows - Good or Bad ? `,
                        text: `Worbles can't digest raw marshmallows! All marshmallows must be fully roasted before Worbles can eat them. Else they will fall sick. However, other food items like IceBread and fireberries do not need to be heated up.`
                    }
                };
                WorbleManager.veripediaItems.next([veripediaItem]);
                WorbleManager.ariState.next({
                    message: 'Uh oh... Your worble is sick. Check VERIPEDIA for more details !!',
                    forceMessageShow: true
                });
                break;
            }
        }
    }
}
export default WorbleGamePlay = new WorbleGamePlay();