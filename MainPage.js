import { StyleSheet, Text, View, Pressable, Image, Dimensions, ScrollView, Linking, Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

function MainPage() {
    const navigation = useNavigation();
    const deviceDimension = Dimensions.get("window");
    const deviceWidth = deviceDimension.width;
    const deviceHeight = deviceDimension.height;

    // console.log("device width: ", deviceWidth);
    // console.log("device height: ", deviceHeight);

    const [isWorkSheetHoverIn, setWorkSheetHoverIn] = useState(false)
    const [isWorkWinDorHoverIn, setWorkWinDorHoverIn] = useState(false)
    const [isDownloadApps, setDownloadApps] = useState(false);
    const [isSheetAndroid, setSheetAndroid] = useState(false);
    const [isSheetIos, setSheetIos] = useState(false);
    const [isMaterialsIos, setMaterialsIos] = useState(false)
    const [isMaterialsAndroid, setMaterialsAndroid] = useState(false)
    const [] = useState(false)
    const [] = useState(false)

    useEffect(() => {
      if (isSheetIos) {
        setTimeout(() => {
          setSheetIos(false);
        }, 2000);
      }
      if (isSheetAndroid) {
        setTimeout(() => {
          setSheetAndroid(false);
        }, 2000);
      }

      if (isMaterialsIos) {
        setTimeout(() => {
          setMaterialsIos(false);
        }, 4000);
      }
    }, [isSheetIos, isMaterialsIos, isSheetAndroid]);

    const downloadSWAndroid = () => {
      Linking.openURL('https://github.com/Im-Forson/aluminium-fabrication-apps/releases/download/v1.0.0/application-e5fe8b51-f9b2-4e04-a7fa-54fd4468b249.1.apk')
    }
    const downloadSWIos = () => {
      setSheetIos(true);
      // window.alert('ios version unavailable');
      // Linking.openURL('https://github.com/Im-Forson/aluminium-fabrication-apps/releases/download/v1.0.0/application-e5fe8b51-f9b2-4e04-a7fa-54fd4468b249.1.apk')
    }
    const downloadMWAndroid = () => {
      // Linking.openURL('https://github.com/Im-Forson/aluminium-fabrication-apps/releases/download/v1.0.0/application-e5fe8b51-f9b2-4e04-a7fa-54fd4468b249.1.apk')
      Linking.openURL('https://alufab-mate.en.uptodown.com/android/download')
    }
    const downloadMaterialsIos = () => {
      setMaterialsIos(true);
      // window.alert('ios version unavailable');
      // Linking.openURL('https://github.com/Im-Forson/aluminium-fabrication-apps/releases/download/v1.0.0/application-e5fe8b51-f9b2-4e04-a7fa-54fd4468b249.1.apk')
    }
//https://drive.google.com/file/d/1A5vrdgTbo3lzTZdYydmZIqR11XpdaJ4y/view?usp=sharing
    const handleSheetAndroidDownload = () => {
      setSheetAndroid(true)
      // if (Platform.OS === 'web') {
      //   const a = document.createElement('a');
      //   a.href = 'https://drive.google.com/uc?export=download&id=1A5vrdgTbo3lzTZdYydmZIqR11XpdaJ4y';
      //   a.download = 'alufapp-apk';
      //   a.style.display = 'none';
      //   document.body.appendChild(a);
      //   a.click();
      //   document.body.removeChild(a);
      // }
    }

    const [fontsLoaded] = useFonts({
      'Inconsolata': require('./assets/fonts/Inconsolata.ttf'),
      'Underdog': require('./assets/fonts/Underdog.ttf'),
    });
  
    if (!fontsLoaded) {
      return null; 
    }

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled={true} style={{height: 1,}}>
        <View style={styles.header}>
          {/* <Image style={{width: 100, height: 100}}
          source={require("./assets/images/icon.png")}
          /> */}
          <View style={styles.appLogo}>
              <View style={styles.alu}></View>
              <View style={styles.fab}></View>
              <View style={styles.ap}></View>
          </View>
          <View style={styles.headerInfo}>
            {/* <Text style={styles.txtHeaderInfo}>Alufapp</Text> */}
            <Text style={styles.txtHeaderInfo}>Aluminium</Text>
            <Text style={styles.txtHeaderInfo}>Fab Apps</Text>
            {/* <Text style={styles.txtHeaderInfo}>Apps</Text> */}
          </View>
        </View>
        <View>
          <View style={styles.bodyInfo}>
            <Text style={[
              styles.bodyInfoTxt1,
              {
                fontSize: deviceWidth <= 500 ? 20 : 20,
              }
            ]}>Estimation made easy</Text>
            <Text style={[
              styles.bodyInfoTxt2,
              {
                width: deviceWidth <= 500 ? '75%' : '50%',
                fontSize: deviceWidth <= 500 ? 15 : 15,
              }
            ]}>Simply input your windows and doors measurements and instantly know the accurate and exact material quantities. </Text>
          </View>
          <View style={styles.body}>
            <View style={[styles.selectWork, {marginBottom: isDownloadApps ? 0 : 30,}]}>
              <Text style={[styles.txtSelectWork, {display: isDownloadApps ? 'none' : 'flex'}]}>Select and Start Work</Text>
              <Text style={[styles.txtSelectWork, styles.txtDownloadHead, {display: isDownloadApps ? 'flex' : 'none'}]}>Download Mobile App Version</Text>
            </View>                     
            <View style={{
              display: isDownloadApps ? 'none' : 'flex',
              flexDirection: deviceWidth <= 500 ? 'column' : 'row',
              alignItems: deviceWidth <= 500 ? 'center' : '',
            }}>
              <Pressable style={({pressed}) => [
                styles.workSheetOption, 
                {
                  width: deviceWidth <= 500 ? 180 : 200,
                  height: deviceWidth <= 500 ? 100 : 100,
                  marginRight: deviceWidth <= 500 ? 0 : 25,
                  marginBottom: deviceWidth <= 500 ? 30 : 0
                },
                isWorkSheetHoverIn && {backgroundColor: '#3E8914'},
                pressed && {opacity: 0.5}
              ]}
              onPress={() => navigation.navigate('SheetCalc')}
              onHoverIn={() => {setWorkSheetHoverIn(true)}}
              onHoverOut={() => {setWorkSheetHoverIn(false)}}
              >
                <Text style={styles.txtWorkOption}>Work Glasses</Text>
              </Pressable>
              <Pressable style={({pressed}) => [
                styles.workWinDorOption, 
                {
                  width: deviceWidth <= 500 ? 180 : 200,
                  height: deviceWidth <= 500 ? 100 : 100,
                  marginLeft: deviceWidth <= 500 ? 0 : 25,
                },
                isWorkWinDorHoverIn && {backgroundColor: '#3E8914'},
                pressed && {opacity: 0.5}
              ]}
              onPress={() => navigation.navigate('MaterialCalc')}
              onHoverIn={() => {setWorkWinDorHoverIn(true)}}
              onHoverOut={() => {setWorkWinDorHoverIn(false)}}
              >
                <Text style={styles.txtWorkOption}>Work Windows & Doors</Text>
              </Pressable>
            </View>
          </View>
          {/* <View style={styles.footer}>
            <Text style={styles.footerTxt}>Developed by Midev</Text>
          </View> */}
        </View>
        <View style={styles.downloadCon}>
          <Pressable style={({pressed}) => [styles.downloadBtn, {display: isDownloadApps ? 'none' : 'flex'}, pressed && {backgroundColor: 'grey'}]}
           onPress={() => setDownloadApps(true)}
          >
            <Text style={styles.txtDownloadApps}>download apps</Text>
          </Pressable>
          <View style={{display: isDownloadApps ? 'flex' : 'none', alignItems: 'center'}}>
            <View style={styles.apps}>
            <Pressable style={({pressed}) => [styles.app, pressed && {backgroundColor: 'black'}]}
               onPress={downloadMWAndroid}
              >
                <Text style={styles.appName}>Material Worker</Text>
                <View style={styles.logo}>
                  <Ionicons name='logo-android' size={20} color='#fff'/>
                  <Text style={[styles.appType, {color: '#A4C639'}]}>android</Text>
                </View>
                <View style={styles.downloadApp}>
                  <Ionicons name='download-outline' size={20} color='#fff'/>
                </View>
              </Pressable>
              <Pressable style={({pressed}) => [styles.app, pressed && {backgroundColor: 'black'}]}
                // onPress={downloadMaterialsIos}
              >
                <Text style={styles.appNameUnav}>Material Worker</Text>
                <View style={styles.logo}>
                  <Ionicons name='logo-apple' size={20} color='grey'/>
                  <Text style={[styles.appType, {color: 'grey'}]}>ios</Text>
                </View>
                <View style={styles.downloadApp}>
                  <Ionicons name='download-outline' size={20} color='grey'/>
                </View>
              </Pressable>
              <View style={[styles.unvalaible, {display: isMaterialsIos ? 'flex' : 'none',}]}>
                <Text style={styles.txtUnavailable}>version not yet available</Text>
              </View>
              <Pressable style={({pressed}) => [styles.app, pressed && {backgroundColor: 'black'}]}
                // onPress={handleSheetAndroidDownload}
              >
                <Text style={styles.appNameUnav}>Sheet Worker</Text>
                <View style={styles.logo}>
                  <Ionicons name='logo-android' size={20} color='grey'/>
                  <Text style={[styles.appType, {color: 'grey'}]}>android</Text>
                </View>
                <View style={styles.downloadApp}>
                  <Ionicons name='download-outline' size={20} color='grey'/>
                </View>
              </Pressable>
              <View style={[styles.unvalaible, {display: isSheetAndroid ? 'flex' : 'none',}]}>
                <Text style={styles.txtUnavailable}>version not yet available</Text>
              </View>
              <Pressable style={({pressed}) => [styles.app, pressed && {backgroundColor: 'black'}]}
                // onPress={downloadSWIos}
              >
                <Text style={styles.appNameUnav}>Sheet Worker</Text>
                <View style={styles.logo}>
                  <Ionicons name='logo-apple' size={20} color='grey'/>
                  <Text style={[styles.appType, {color: 'grey'}]}>ios</Text>
                </View>
                <View style={styles.downloadApp}>
                  <Ionicons name='download-outline' size={20} color='grey'/>
                </View>
              </Pressable>
              <View style={[styles.unvalaible, {display: isSheetIos ? 'flex' : 'none',}]}>
                <Text style={styles.txtUnavailable}>version not yet available</Text>
              </View>
              <Pressable style={({pressed}) => [styles.downloadBtn, pressed && {backgroundColor: 'grey'}]}
               onPress={() => setDownloadApps(false)}
              >
                <Text style={styles.txtDownloadApps}>close</Text>
              </Pressable>
            </View>
            
          </View>
        </View>
      </ScrollView>
      
    </View>
  );
}

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383961',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'static',
    marginTop: 15,
  },
  appLogo: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 15,
    padding: 8,
    borderRadius: 3,
    backgroundColor: 'rgb(97, 60, 84)',
    // borderWidth: 1,
    // borderColor: 'grey'
  },
  alu: {
    width: 10,
    height: 20,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#fff',
  },
  fab: {
    width: 10,
    height: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#fff',
    // marginRight: 5,
  },
  ap: {
    width: 10,
    height: 12,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    marginTop: 8,
    borderColor: '#fff',
  },
  headerInfo: {
    // flexDirection: 'row'
  },
  txtHeaderInfo: {
    color: '#fff',
    fontSize: 10,
    letterSpacing: 3,
    fontFamily: 'Underdog',
    textAlign: 'center',
    marginBottom: 5,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 40,
  },
  bodyInfo: {
    alignItems: 'center',
    marginTop: 50,
  },
  bodyInfoTxt1: {
    color: '#fff',
    
    letterSpacing: 3,
    fontFamily: 'Underdog',
    textAlign: 'center',
    marginBottom: 20,
  },
  bodyInfoTxt2: {
    color: '#ff9',
    // fontSize: 15,
    letterSpacing: 3,
    fontFamily: 'Inconsolata',
    textAlign: 'center',
    // width: '50%',
    lineHeight: 25
  },
  workOptions: {
    flexDirection: 'row'
    
  },
  workSheetOption: {
    // width: 200,
    // height: 100,
    backgroundColor: '#3DA35D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    
  },
  workWinDorOption: {
    // width: 200,
    // height: 100,
    backgroundColor: '#3DA35D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    // marginLeft: 25,
  },
  txtWorkOption: {
    color: '#fff',
    letterSpacing: 3,
    fontSize: 15,
    fontFamily: 'Inconsolata',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  selectWork: {
    alignItems: 'center',
    
  },
  txtSelectWork: {
    letterSpacing: 3,
    fontSize: 14,
    color: '#E8FCCF',
    fontFamily: 'Inconsolata',
  },
  footer: {
    // backgroundColor: 'yellow',
    marginTop: 160,
    // marginBottom: 20,
    // backgroundColor: '#383961',
    alignItems: 'center',
  },
  footerTxt: {
    fontSize: 12,
    color: 'rgba(150, 150, 150, 1)',
    textAlign: 'center',
  },
  downloadCon: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 20,
    // backgroundColor: 'yellow',
  },
  txtDownloadApps: {
    letterSpacing: 3,
    fontSize: 12,
    fontStyle: 'italic',
    fontFamily: 'Underdog',
    color: 'rgb(250, 151, 151)'
  },
  downloadBtn: {
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 10,
  },
  apps: {
    // paddingHorizontal: 30,
    // paddingVertical: 20,
    // borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  app: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    // borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  appIos: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    // borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  appName: {
    width: 130,
    fontSize: 12,
    letterSpacing: 3,
    color: '#fff',
  },
  appNameUnav: {
    width: 130,
    fontSize: 12,
    letterSpacing: 3,
    color: 'grey',
  },
  appType: {
    letterSpacing: 2,
    fontSize: 10,
    fontStyle: 'italic',
    color: '#fff',
    marginLeft: 20,
    marginRight: 20,
  },
  appTypeUnav: {
    letterSpacing: 2,
    fontSize: 10,
    fontStyle: 'italic',
    color: 'grey',
    marginLeft: 20,
    marginRight: 20,
  },
  downloadApp: {
    padding: 5,
    borderRadius: 5,
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  txtDownloadHead: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 5,
  },
  logo: {
    alignItems: 'center',
    width: 50,
    alignItems: 'center',
    marginHorizontal: 50,
    // backgroundColor: 'yellow'
  },
  unvalaible: {
    marginTop: -12,
    marginBottom: 30,
  },
  txtUnavailable: {
    color: 'rgba(243, 87, 87, 0.8)',
    fontStyle: 'italic',
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 3,
    fontWeight: '500',
  },
  xxx: {},
  xxx: {},
});