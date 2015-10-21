var React = require('react-native');
var Menu = require('./Menu');
var Main = require('./Main');
var Web = require('./Web');

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var SCREEN_HEIGHT = require('Dimensions').get('window').height;
var LIGHTBLUE = '#50ADDC';
var MIDBLUE = '#2579A2';
var DARKBLUE = '#10253F';
var ICON_COLOR = '#FFFFFF';
var ICON_FAMILY = 'icomoon';
var CORE_FONT = 'Century Gothic';
var Spd = 0.8;
var LoadSpd = 0.3;


var {
	AppRegistry,
	Easing,
	Image,
	ListView,
	StyleSheet,
	Text,
	TextInput,
	View,
	StatusBarIOS,
	Animated,
	TouchableOpacity,
	TouchableHighlight,
	InteractionManager,
	ProgressViewIOS,
} = React;


//var TimerMixin = require('react-timer-mixin');


class Load extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			r_opac_val: new Animated.Value(0),
			i_opac_val: new Animated.Value(0),
			d_opac_val: new Animated.Value(0),
			relid_text_opac: new Animated.Value(0),
			rid_top: new Animated.Value(253),
			r_text_opac: new Animated.Value(0),
			i_text_opac: new Animated.Value(0),
			d_text_opac: new Animated.Value(0),        
			relid_opac_val: new Animated.Value(0),
			logWrapOpac: new Animated.Value(0),
			logWarnOpac: new Animated.Value(0),
			passWrapOpac: new Animated.Value(0),
			passWarnOpac: new Animated.Value(0),
			progWrapOpac: new Animated.Value(0),
			progress: 0,
			inputUsername: '',
			inputPassword: '',
			login_button_text: 'Login',
			loginAttempts: 5,
			passAttempts: 5
		};
	}
	componentDidMount() {
		Animated.sequence([
			Animated.parallel([
				Animated.timing(this.state.r_opac_val, {
					toValue: 1,
					duration: 500 * Spd,
					delay:1000 * Spd,
				}),
				Animated.timing(this.state.r_text_opac, {
					toValue: 1,
					duration: 500 * Spd,
					delay:1000 * Spd,
				}),        
			]),
			Animated.parallel([
				Animated.timing(this.state.r_text_opac, {
				toValue: 0,
				duration: 500 * Spd,
				delay:1000 * Spd,
				}),  
				Animated.timing(this.state.i_opac_val, {
					toValue: 1,
					duration: 500 * Spd,
					delay: 1500 * Spd,
				}),
				Animated.timing(this.state.i_text_opac, {
				toValue: 1,
				duration: 500 * Spd,
				delay:1500 * Spd,
				}),
			]),
			Animated.parallel([
				Animated.timing(this.state.i_text_opac, {
				toValue: 0,
				duration: 500 * Spd,
				delay:1000 * Spd,
				}),
				Animated.timing(this.state.d_opac_val, {
					toValue: 1,
					duration: 500 * Spd,
					delay: 1500 * Spd,
				}),
				Animated.timing(this.state.d_text_opac, {
				toValue: 1,
				duration: 500 * Spd,
				delay:1500 * Spd,
				}),
			]),
			Animated.parallel([
				Animated.timing(this.state.d_text_opac, {
				toValue: 0,
				duration: 500 * Spd,
				delay:1000 * Spd,
				}),
				Animated.timing(this.state.relid_opac_val, {
					toValue: 1,
					duration: 500 * Spd,
					delay: 1500 * Spd,
				}),
				Animated.timing(this.state.relid_text_opac, {
				toValue: 1,
				duration: 500 * Spd,
				delay:1500 * Spd,
				}),
			]),


			Animated.parallel([
				Animated.timing(this.state.relid_opac_val, {
					toValue: 0,
					duration: 500 * Spd,
					delay: 1500 * Spd,
				}),
				Animated.timing(this.state.relid_text_opac, {
				toValue: 0,
				duration: 500 * Spd,
				delay:1500 * Spd,
				}),
				Animated.timing(this.state.rid_top, {
				toValue: 100,
				easing: Easing.inOut(Easing.cubic),
				duration: 1000 * Spd,
				delay:1600 * Spd,
				}),
			]),

			Animated.timing(this.state.logWrapOpac, {
				toValue: 1,
				duration: 500 * Spd,
				delay: 0 * Spd
				}
			)
			]).start(); 
		InteractionManager.runAfterInteractions(() => {
			this.refs.inputUsername.focus();
		});
	}
	

	onUsernameChange(event){
		this.setState({inputUsername: event.nativeEvent.text});
	}

	onPasswordChange(event){
		this.setState({inputPassword: event.nativeEvent.text});
	}

	checkUsername(){
		var un = this.state.inputUsername;
		var count = this.state.loginAttempts;

		if (un == 'test@uniken.com'){
			Animated.sequence([
			Animated.timing(this.state.logWrapOpac, {
				toValue: 0,
				duration: 500 * Spd,
				delay: 0 * Spd
				}
			),
			Animated.timing(this.state.passWrapOpac, {
				toValue: 1,
				duration: 500 * Spd,
				delay: 0 * Spd
				}
			),
			]).start();  
			this.refs.inputPassword.focus();  
		}else{
			Animated.sequence([
			Animated.timing(this.state.logWarnOpac, {
				toValue: 1,
				duration: 500 * Spd,
				delay: 0 * Spd
				}
			)
			]).start(); 
			this.refs.inputUsername.focus();
		}
	}

	updateProgress() {
		console.log('yes')
		setTimeout((function() {
			this.setState({ progress: this.state.progress + (0.1*LoadSpd)});
			if(this.state.progress < 1){
				this.updateProgress();
			}else{
				console.log('complete');
				this.props.navigator.push(
					{id: "Main"}
				);
			}
		}).bind(this), 30);
	}

	getProgress(offset) {
		var progress = this.state.progress + offset;
		return progress;
	}

	checkPassword(){
		var pw = this.state.inputPassword;
		var count = this.state.passAttempts;

		if (pw == '1234'){
			this.refs.inputPassword.blur();
			Animated.sequence([
			Animated.timing(this.state.progWrapOpac, {
				toValue: 1,
				duration: 500 * Spd,
				delay: 0 * Spd
			})
			]).start();
			this.updateProgress();
		}else if(count>0){
			Animated.sequence([
			Animated.timing(this.state.passWarnOpac, {
				toValue: 1,
				duration: 500 * Spd,
				delay: 0 * Spd
			})
			]).start(); 
			this.setState({login_button_text: "Login ("+count+" attempts)"});
			this.setState({passAttempts: count-1});
		}
	}

	render() {
		StatusBarIOS.setStyle(1);
		return (
			<View style={styles.container}>
			
			<Image style={styles.bgimage} source={require('image!bg')} />
			<View style={styles.bgcolorizer}></View>
			
			<View style={styles.loadwrap}>
				<Animated.View style={[styles.rid_wrap, {top: this.state.rid_top}]}>
					<View style={styles.rid_center}>
						<Animated.Text style={[styles.logo_rid, styles.logo_r,{opacity: this.state.r_opac_val}]}>g</Animated.Text>
						<Animated.Text style={[styles.logo_rid, styles.logo_i,{opacity: this.state.i_opac_val}]}>h</Animated.Text>
						<Animated.Text style={[styles.logo_rid, styles.logo_d,{opacity: this.state.d_opac_val}]}>i</Animated.Text>
					</View>
				</Animated.View>

				<View style={styles.logo_relid_wrap}>
					<Animated.Text style={[styles.logo_relid,{opacity: this.state.relid_opac_val}]}>W</Animated.Text>
				</View> 

				<View style={styles.load_text_wrap}>
					<Animated.Text style={[styles.load_text,{opacity:this.state.r_text_opac}]}>Initializing Authentication</Animated.Text>
					<Animated.Text style={[styles.load_text,{opacity:this.state.i_text_opac}]}>Authenticating Device</Animated.Text>
					<Animated.Text style={[styles.load_text,{opacity:this.state.d_text_opac}]}>Securing Connection</Animated.Text>
					<Animated.Text style={[styles.load_text,{opacity:this.state.relid_text_opac}]}>Secure Access Established</Animated.Text>
				</View>

			</View>


			<Animated.View style={[logStyle.wrap,{opacity: this.state.logWrapOpac}]}>
				<Animated.Text style={[logStyle.warning,{opacity: this.state.logWarnOpac}]}>
					- Invalide Username - 
				</Animated.Text>
				<TextInput
					ref='inputUsername'
					returnKeyType={'next'}
					autoCorrect={false}
					keyboardType={'email-address'}
					placeholder={'Enter Username'}
					placeholderTextColor={'rgba(255,255,255,0.5)'}
					style={logStyle.input}
					value={this.state.inputUsername}
					onSubmitEditing={this.checkUsername.bind(this)}
					onChange={this.onUsernameChange.bind(this)} 
				/>
				<TouchableHighlight 
					style={logStyle.buttonWrap}
					underlayColor='#C7C7C7'
					activeOpacity={1}
					onPress={this.checkUsername.bind(this)}
				>
					<Text style={logStyle.button}>
						{this.state.login_button_text}
					</Text>
				</TouchableHighlight>
			</Animated.View>
			
			<Animated.View style={[logStyle.wrap,{opacity: this.state.passWrapOpac}]}>
				<Animated.Text style={[logStyle.warning,{opacity: this.state.passWarnOpac}]}>
					- Invalide Password - 
				</Animated.Text>
				<TextInput
					ref='inputPassword'
					returnKeyType={'next'}
					secureTextEntry={true} 
					placeholder={'Enter Password'}
					placeholderTextColor={'rgba(255,255,255,0.5)'}
					style={logStyle.input}
					value={this.state.inputPassword}
					onSubmitEditing={this.checkPassword.bind(this)}
					onChange={this.onPasswordChange.bind(this)} 
				/>
				<TouchableHighlight 
					style={logStyle.buttonWrap}
					underlayColor='#C7C7C7'
					activeOpacity={1}
					onPress={this.checkPassword.bind(this)}
				>
					<Text style={logStyle.button}>
						{this.state.login_button_text}
					</Text>
				</TouchableHighlight>
			</Animated.View>

			<Animated.View style={[progStyle.wrap,{opacity: this.state.progWrapOpac}]}>
				<Text style={[progStyle.warning]}>
					Loading Applications 
				</Text>
				<ProgressViewIOS 
					style={progStyle.progressView} 
					progress={this.getProgress(0)}
					trackTintColor={'rgba(255,255,255,1)'}
					progressTintColor={LIGHTBLUE}
				/>
			</Animated.View>

			</View>

		);
	}
	
};


var progStyle = StyleSheet.create({
	wrap: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		backgroundColor: 'rgba(0,20,40,0.95)'
	},
	progressView: {
		top: 200,
		width: 250,
		height: 10,
		left: (SCREEN_WIDTH - 250) / 2,
	},
	warning: {
		top: 190,
		fontFamily: 'Century Gothic',
		color: 'rgba(255,255,255,0.8)',
		fontSize: 22,
		textAlign: 'center',
		height: 35,
	}
});

var logStyle = StyleSheet.create({
	wrap: {
		position: 'absolute',
		top: 245,
		height: 200,
		width: SCREEN_WIDTH,
		backgroundColor: 'transparent'
	},
	button: {
		fontFamily: 'Century Gothic',
		backgroundColor: 'transparent',
		height: 55,
		fontSize: 22,
		paddingTop: 13,
		color: MIDBLUE,
	},
	buttonWrap: {
		top: 15,
		width: 280,
		left: ((SCREEN_WIDTH - 280) / 2),
		backgroundColor: 'rgba(255,255,255,1)',
		alignItems: 'center',
	},
	input: {
		fontFamily: 'Century Gothic',
		backgroundColor: 'rgba(255,255,255,0.1)',
		height: 55,
		fontSize: 22,
		width: 280,
		paddingLeft: 10,
		color: 'rgba(255,255,255,1)',
		alignItems: 'center',
		left: ((SCREEN_WIDTH - 280) / 2),
	},
	warning: {
		fontFamily: 'Century Gothic',
		color: 'rgba(255,255,255,0.8)',
		fontSize: 22,
		textAlign: 'center',
		height: 35,
	}
});




var leftrid = 23;
var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bgimage: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
	},
	bgcolorizer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(8,26,60,0.9)'
	},


	loadwrap: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'transparent',
		//backgroundColor: 'rgba(17,200,62,0.2)'
	},
	rid_wrap: {
		alignItems: 'center',
		//backgroundColor: 'rgba(50,250,250,0.2)',
	},
	rid_center: {
		alignItems: 'center',
		width: 160,
		//height:130,
		// backgroundColor: 'rgba(0,50,200,0.2)',    
	},
	logo_rid: {
		fontFamily: 'icomoon',
	},
	logo_i: {
		position: 'absolute',
		fontSize: 89,
		width: 160,
		paddingLeft: 31 + leftrid,
		paddingTop: 31,
		color: LIGHTBLUE,
		//backgroundColor: 'rgba(70,0,0,0.5)',

	},
	logo_r: {
		position: 'absolute',
		fontSize: 120,
		width: 160,
		paddingLeft: leftrid,
		color: '#FFFFFF',
		//backgroundColor: 'rgba(70,0,0,0.5)',
	},
	logo_d: {
		position: 'absolute',
		fontSize: 120,
		width: 160,
		paddingLeft: 62 + leftrid,
		color: MIDBLUE,
		//backgroundColor: 'rgba(70,0,0,0.5)',
	},
	logo_relid_wrap: {
		alignItems: 'center',
		top: 380,
	},
	logo_relid: {
		fontFamily: 'icomoon',
		fontSize: 21,
		paddingLeft: 22,
		width: 160,
		color: '#FFFFFF',
		backgroundColor: 'transparent',
		//backgroundColor: 'rgba(0,100,0,0.5)',
	},
	load_text_wrap: {
		top: 450,
		alignItems: 'center',
	},
	load_text: {
		color: '#FFFFFF',
		fontFamily: 'Century Gothic',
		fontSize: 20,
		position: 'absolute',
		width: 200,
		left: ((SCREEN_WIDTH - 200) / 2),
		fontWeight: 'bold',
		textAlign: 'center',
		alignItems: 'center',
		//backgroundColor: 'rgba(100,100,0,0.5)',
	},


});


module.exports = Load;