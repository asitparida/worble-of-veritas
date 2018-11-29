let _constants = {
    DEFAULT_WORBLE_EGG_STATE: {
        eggBgFill: '#F0867A',
        eggBorderStroke: '#000000',
        eggMoonFill: '#C73A4D',
        eggTextureFill: '#C73A4D',
        eggSpotsFill: '#F59E95'
    },
    NEW_WORBLE_EGG_STATE: {
        eggBgFill: '#fff0e6',
        eggBorderStroke: '#000000',
        eggMoonFill: '#998675',
        eggTextureFill: 'rgb(0,0,0,0)',
        eggSpotsFill: '#ffffff'
    },
    ProfileInfo: {
        name: '',
        set: false,
        introduction: false,
        level: 1,
        progress: 10
    }
};

let WorbleState = {
    showEgg: true,
    worbleImgSrc: require('../assets/images/happyworble.gif'),
    egg: _constants.NEW_WORBLE_EGG_STATE,
    personalized: false,
    incubated: false                      
};

let Introductions = [
    { text: 'Veritas is a world populated with strangely unique and wonderful creatures called Worbles. Humans and worbles are companions.'},
    { text: 'Life on Veritas is very different from life on earth. You will learn more throughout the game'},
    { text: `I'm here to guide you through your journey`}
]

export default AppConstants = {
    SECURE_STORAGE_ID: '_WORBLE_VERITAS',
    DEFAULT_WORBLE_EGG_STATE: _constants.DEFAULT_WORBLE_EGG_STATE,
    NEW_WORBLE_EGG_STATE: _constants.NEW_WORBLE_EGG_STATE,
    ProfileInfo: _constants.ProfileInfo,
    WorbleState: WorbleState,
    Introductions: Introductions,
    introduced: false,
    STORAGE_KEYS: {
        ARI_INTRODUCED: 'ARI_INTRODUCED',
        FIRST_EGG_PERSONALIZED: 'FIRST_EGG_PERSONALIZED',
        EGG_STATE: 'EGG_STATE',
        LEVEL_INFO: 'LEVEL_INFO',
        PROFILE_INFO: 'PROFILE_INFO'
    },
    WORBL_HAPPY_GIF: require('../assets/images/happyworble.gif'),
    WORBL_SICK_GIF: require('../assets/images/sickworble.gif'),
    WORBLE_EATING_FIREBERRY: require('../assets/images/worble_fire_berry.png'),
    WORBLE_BREATHING_FIREBERRY: require('../assets/images/worble_breathing_fire.png'),
    WORBLE_EATING_MARSHMALLOW: require('../assets/images/worble_eating_marshmallow.png')
};