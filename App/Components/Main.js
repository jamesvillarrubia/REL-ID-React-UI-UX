

var React = require('react-native');
var Drawer = require('react-native-drawer');
//var NavigationBar = require('react-native-navbar');
var Menu = require('./Menu');
var Load = require('./Load');
var ControlPanel = require('./ControlPanel');

var MIDBLUE = '#2579A2';
var CORE_FONT = 'Century Gothic';
var NAV_BAR_TINT = '#FFFFFF'
var NAV_SHADOW_BOOL = true;
var MENU_TXT_COLOR = '#2579A2';
var ICON_COLOR = '#FFFFFF';
var ICON_FAMILY = 'icomoon';

var {
  View,
  Text,
  Navigator,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  StyleSheet,
  StatusBarIOS,
} = React;


var styles = StyleSheet.create({
  bar:{
    backgroundColor: MIDBLUE,
    width: 20,
    height:3,
    marginTop:3,
  },
  navbar:{
    backgroundColor: '#ffffff',
    height: 65,
    flexDirection: 'row',
    padding: 10,
    paddingTop:30
  },
  navButton:{
    //backgroundColor:'#dddddd',
    backgroundColor: 'transparent',
    width: 100,
    height: 20,

    flex:1,

  },
  navButtonText:{
    //textAlign: 'left',
    //fontFamily: CORE_FONT,
  },
  navButtonIcon:{
    fontFamily: CORE_FONT,
  },
  navRight:{
    //textAlign: 'right'
   // right: 0,
   // position: 'absolute'
  },
  navLeft:{
    //left: 0,
   // position: 'absolute',
    //flex:1
  },
  navTitle:{
    flex:2,
    fontFamily: CORE_FONT,
    textAlign: 'center',
    color: MIDBLUE,
    fontSize: 20,
  }
});

class Main extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      controlPanelOpen:false
    }
  }

  toggleControlPanel(){
    if(this.state.controlPanelOpen){
      this.refs.drawer.close();
      this.setState({controlPanelOpen:false});
    }else{
      this.refs.drawer.open();
      this.setState({controlPanelOpen:true});     
    }
  }
  render() {
    StatusBarIOS.setStyle(0);
    return (
      <Drawer
        ref="drawer"
        type="static"
        content={<ControlPanel navigator={this.props.navigator} toggle={this.toggleControlPanel.bind(this)}/>}
        openDrawerOffset={50}
        styles={{main: {shadowColor: "#000000", shadowOpacity: 1, shadowRadius: 20}}}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <View style={styles.navbar}>
          <TouchableHighlight 
            style={[styles.navButton,styles.navLeft]} 
            onPress={this.toggleControlPanel.bind(this)}
            underlayColor={'#FFFFFF'}
            activeOpacity={0.6}
          >
            <View style={styles.navButtonText}>
              <Text style={styles.bar}></Text>
              <Text style={styles.bar}></Text>
              <Text style={styles.bar}></Text>
            </View>
          </TouchableHighlight>

          <Text style={styles.navTitle}>Menu</Text>

          <TouchableHighlight 
            style={[styles.navButton,styles.navRight]}
            underlayColor={'#FFFFFF'}
            activeOpacity={0.6}
          >
            <Text style={[styles.navButtonText,{textAlign: 'right'}]}></Text>
          </TouchableHighlight>

        </View>
        <Menu navigator={this.props.navigator}/>
      </Drawer>
    )
  }
};

module.exports = Main;

