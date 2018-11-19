import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Svg } from 'expo';
import Constants from '../constants/Constants';

export default class WorbleHolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEgg: true,
            worbleImgSrc: require('../assets/images/worble.png'),
            egg: Constants.NEW_WORBLE_EGG_STATE
        };
    }
    componentWillUnmount() {
        [
            this.worbleImgSrcSusbscription,
            this.eggStateSusbscription
        ].forEach(x => {
            if (x) {
                x.unsubscribe();
                x = null;
            }
        });
    }
    componentWillMount() {
        const dontListen = this.props.dontListen || false;
        if (!dontListen) {
            this.eggStateSusbscription = WorbleManager.eggState$.subscribe((state) => {
                if (state) {
                    this.setState({
                        showEgg: true,
                        egg: state
                    });
                }
            });
            this.worbleImgSrcSusbscription = WorbleManager.worbleImgSrc$.subscribe((state) => {
                this.setState({
                    worbleImgSrc: state
                });
            });
        }
    }
    getProgressBarStyle = () => {
        const progress = this.props.progress;
        const progresBarWidth = (progress / 100) * 200;
        styles.progressBar.width = progresBarWidth;
        return Object.assign({}, styles.progressBar, {
            width: progresBarWidth
        });
    }
    openWorbleAppearanceChanger() {
        if (this.props.listenToClick || false) {
            WorbleManager.showWorbleAppearance.next(true);
        }
    }
    render() {
        let worbleImgSrc = this.state.worbleImgSrc;
        let worbleEggDimensions = {
            width: 180,
            height: 180,
        }
        let worbleDimensions = this.props.worbleDimensions;
        let dimension = worbleDimensions.width / 3.25;
        worbleShadowDimensions = {
            height: dimension,
            width: dimension,
            marginTop: dimension + 20,
            borderRadius: dimension / 2,
            bottom: -15
        }
        if (this.state.showEgg) {
            dimension = 10;
            worbleShadowDimensions = {
                height: dimension,
                width: dimension,
                marginTop: dimension + 20,
                borderRadius: dimension / 2,
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderColor: 'rgba(0,0,0,0.03)',
                transform: [
                    { scaleX: 3 },
                    { translateX: -0 }
                ],
                bottom: -15
            }
        }
        let egg = {}
        if (this.props.egg) {
            egg = this.props.egg;
        } else {
            egg = this.state.egg
        }
        const {
            eggBgFill,
            eggBorderStroke,
            eggMoonFill,
            eggTextureFill,
            eggSpotsFill
        } = egg;
        return (
            <View style={[this.props.worbleDimensions, { position: 'relative' }]} >
                {this.state.showEgg &&
                    <TouchableWithoutFeedback onLongPress={this.openWorbleAppearanceChanger.bind(this)}>
                        <Animatable.View style={styles.welcomeEgg} animation="wobble" useNativeDriver={true} iterationCount={2} duration={2000}>
                            <Svg width={worbleEggDimensions.width} height={worbleEggDimensions.height} viewBox="0 0 394 538" >
                                <Svg.G stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <Svg.Path className={'egg-bg'} fill={eggBgFill} d="M191.450809,-7.99377075e-05 C297.186014,-7.99377075e-05 382.901618,117.925625 382.901618,263.394666 C382.901618,408.863707 297.186014,526.789412 191.450809,526.789412 C85.7156049,526.789412 0,408.863707 0,263.394666 C0,117.925625 85.7156049,-7.99377075e-05 191.450809,-7.99377075e-05"></Svg.Path>
                                    <Svg.Path className={'egg-border'} stroke={eggBorderStroke} stroke-width={10} d="M191.450809,-7.99377075e-05 C297.186014,-7.99377075e-05 382.901618,117.925625 382.901618,263.394666 C382.901618,408.863707 297.186014,526.789412 191.450809,526.789412 C85.7156049,526.789412 0,408.863707 0,263.394666 C0,117.925625 85.7156049,-7.99377075e-05 191.450809,-7.99377075e-05 Z"></Svg.Path>
                                    <Svg.Path className={'egg-moon'} fill={eggMoonFill} opacity="0.62" d="M306.081642,128.379958 C322.069183,177.621586 318.392048,239.253558 309.359088,300.645718 C293.611359,408.002059 249.405807,487.060451 170.587227,512.480642 C171.306667,512.56058 171.946168,512.720455 172.665608,512.800393 C223.507698,520.285225 273.620192,494.573415 310.610665,448.325171 C338.409505,413.568992 358.797388,367.214399 366.514548,314.634816 C377.865703,237.734742 359.320155,165.710867 321.909308,119.58681 C315.514291,111.672977 302.884133,118.627558 306.081642,128.379958 Z"></Svg.Path>
                                    <Svg.Path className={'egg-texture'} fill={eggTextureFill} d="M358.200947,144.127846 C346.689917,176.022992 354.363937,211.755147 377.945561,236.216085 C375.627367,204.720629 368.992537,173.704798 358.200947,144.127846 M181.058987,37.5708824 C181.058987,62.1117585 200.963476,81.93631 225.424415,81.93631 C249.965291,81.93631 269.789842,62.0318208 269.789842,37.5708824 C269.789842,33.8937478 269.310216,30.2166133 268.430901,26.6993541 C246.288156,13.1099439 221.907156,5.19611086 196.327089,4.15692066 C186.574689,12.5503799 181.058987,24.7808492 181.058987,37.5708824 M84.6541121,477.468086 C96.2450796,455.884905 88.1713712,428.945898 66.5881902,417.35493 C60.1132359,413.917609 52.9188422,412.079042 45.5645732,412.079042 C43.1664419,412.079042 40.8482484,412.238118 38.5300549,412.637806 C51.080275,437.739046 66.6681279,459.721915 84.6541121,477.468086 M4.71640467,296.808867 C39.2494943,290.653664 62.271554,257.719329 56.1962882,223.106301 C52.1994029,200.48393 36.2118614,181.778506 14.468805,174.184424 C6.95466048,203.28175 3.11765053,233.25839 3.19758823,263.394906 C3.19758823,274.745261 3.67721448,285.857402 4.71640467,296.808867 M302.164614,410.480287 C277.623738,410.480287 257.799186,430.384777 257.799186,454.845715 C257.799186,470.433568 265.952832,484.902293 279.382367,492.896064 C301.525112,476.188283 320.949975,453.726587 336.617766,426.867517 C328.224307,416.555553 315.514211,410.480287 302.164614,410.480287 M183.856807,148.284607 C141.729635,148.284607 107.516296,182.497946 107.516296,224.625118 C107.516296,266.75149 141.729635,300.965628 183.856807,300.965628 C225.983979,300.965628 260.197318,266.75149 260.197318,224.625118 C260.197318,182.497946 225.983979,148.284607 183.856807,148.284607 M327.904556,275.385562 C310.957762,275.385562 297.288414,294.570612 297.288414,318.152235 C297.288414,341.733859 311.037699,360.918909 327.904556,360.918909 C344.771412,360.918909 358.520698,341.733859 358.520698,318.152235 C358.520698,294.570612 344.771412,275.385562 327.904556,275.385562 M176.582476,410.160537 C164.831633,421.91138 145.806458,421.91138 134.135553,410.160537 C122.38471,398.409694 122.38471,379.384519 134.135553,367.713614 C145.886396,355.962771 164.831633,355.962771 176.582476,367.713614 C188.333319,379.384519 188.333319,398.409694 176.582476,410.160537" ></Svg.Path>
                                    <Svg.Path className={'egg-spots'} fill={eggSpotsFill} d="M110.394054,488.179259 C119.826703,496.332905 132.456861,499.770227 144.68733,497.531971 C144.607393,495.13384 142.289199,493.535086 140.210819,492.256882 C131.657484,487.220806 116.549257,472.032642 107.196546,470.433888 C92.4880074,467.955019 103.599349,482.183931 110.394054,488.179259 M133.575989,52.9184425 C131.337733,72.1034923 119.746766,92.8872962 109.434801,109.034713 C108.315673,110.793343 107.116608,112.552772 105.278041,113.591162 C103.439473,114.630353 101.201218,114.71029 99.0428994,114.71029 C94.5663878,114.790228 90.0099385,114.790228 85.6933023,113.431287 C84.1744858,113.031599 82.8155448,112.232221 81.6964169,111.113094 C80.0976628,109.355263 79.7779119,106.796457 79.7779119,104.398326 C79.6979742,88.7305355 91.1290664,75.2210629 103.999037,66.2680397 C111.673057,60.9929504 124.223277,52.1190655 133.575989,52.9184425"></Svg.Path>
                                </Svg.G>
                            </Svg>
                            <View style={[styles.shadowBar, worbleShadowDimensions]} />
                        </Animatable.View>
                    </TouchableWithoutFeedback>
                }
                {!this.state.showEgg &&
                    <View>
                        <Image
                            source={worbleImgSrc}
                            style={[styles.welcomeImage, this.props.worbleDimensions]} />
                        <View style={[styles.shadowBar, worbleShadowDimensions]} />
                    </View>
                }
            </View>
        );
    }
}
let styles = StyleSheet.create({
    welcomeImage: {
        position: 'relative',
        zIndex: 2,
        resizeMode: 'contain',
        marginTop: 20,
        marginLeft: -10,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.10,
                shadowRadius: 10,
            },
            android: {
                elevation: 20,
            }
        })
    },
    justShadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 30,
            },
            android: {
                elevation: 20,
            }
        })
    },
    shadowBar: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1,
        bottom: -30,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)',
        transform: [
            { scaleX: 3 },
            { translateX: -3 }
        ]
    },
    welcomeEgg: {
        position: 'relative',
        zIndex: 2,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});