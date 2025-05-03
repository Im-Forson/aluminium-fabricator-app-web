import { View, Text, TextInput, StyleSheet, Image, Dimensions, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onValue, ref } from "firebase/database";

import { AlufappContext } from "./alufapp-context";
import { database } from "./firebaseConfig";
import AlufappToast from "./AlufappToast";

function MaterialCalcHomePage() {
    const navigation = useNavigation();
    const deviceDimension = Dimensions.get("window");
    const deviceWidth = deviceDimension.width;
    const deviceHeight = deviceDimension.height;

    const alufappContext = useContext(AlufappContext);
    const savedWorkList = alufappContext.savedWorkList;
    const isToast = alufappContext.isToast;
    const isWhichToast = alufappContext.isWhichToast;
    const usage = alufappContext.matCalcusage;

    const [workTitle, setWorkTitle] = useState('');
    const [devin, setDevin] = useState('');

    const [typeValue, setTypeValue] = useState('Sliding');
    const [isNormalSliding, setNormalSliding] = useState(true);
    const [isDivisionSliding, setDivisionSliding] = useState(false);
    const [isHinge, setHinge] = useState(false);
    const [isSwing, setSwing] = useState(false);
    const [isProjected, setProjected] = useState(false);
    const [isCasement, setCasement] = useState(false);
    const [isFixed, setFixed] = useState(false);
    
    const [profileValue, setProfileValue] = useState('Skit-60');
    const [isRoundFrame, setSkit60] = useState(true);
    const [isKS50RoundFrame, setKS50] = useState(false);
    const [isTrialcoRound, setTrialco] = useState(false);
    const [isItalian, setItalian] = useState(true);
    const [isEco, setEco] = useState(false);

    const fetchPriceData = async () => {
        try {
            const priceListRef = ref(database, 'price-list');
            onValue(priceListRef, (snapshot) => {
                alufappContext.setPriceList(snapshot.val());
            });
            
        } catch (error) {
            alufappContext.showToast();
            alufappContext.setWhichToast('home-price-toast')
        }
    }

    const fetchPriceList = async () => {
        try {
            const res = await fetch('http://localhost:3001/datalist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await res.json();
            alufappContext.setPriceList(data.priceList);
            setDevin(data.devin);
            
        } catch (error) {
            alufappContext.showToast();
            alufappContext.setWhichToast('home-price-toast');
        }
    }

    const fetchdevInfo = async () => {
            try {
                const devInfoRef = ref(database, 'dev-info');
                onValue(devInfoRef, (snapshot) => {
                    setDevin(snapshot.val());
                });
            } catch (error) {
                window.alert('DevInfo error!. Check internet');
            }
        }

    const setUsage = async () => {
        try {
            let usage = await AsyncStorage.getItem('@mwusage');

            if (usage === null) {
                AsyncStorage.setItem('@mwusage', '0');
                alufappContext.setMatCalUsage(0);
                alufappContext.setMaterialCalcLimited();
            }
            else {
                usage = parseInt(usage);
                alufappContext.setMatCalUsage(usage);
                if (usage > 0) {
                    alufappContext.setMaterialCalcUnlimited();
                }
                else {
                    alufappContext.setMaterialCalcLimited();
                }
                // AsyncStorage.setItem('@mwusage', '3');
                // alufappContext.setMatCalUsage(3);
            }
        } catch (error) {
            // console.log(error)
        }
    }

    const loadWorksData = async () => {
        try {
            const workKeys = await AsyncStorage.getAllKeys();
            if (workKeys.length > 0) {
                const workList = [];
                for (let i = workKeys.length-1; i >= 0; i--) {
                    let workKey = workKeys[i], prefix = '';

                    for (let j = 0; j <=3; j++) {
                        prefix += workKey[j];
                    }

                    if (prefix == '@mw-') {
                        const work = await AsyncStorage.getItem(workKeys[i]);
                        workList.push(JSON.parse(work));
                    }
                }
                
                if (workList.length > 0) {
                    alufappContext.setMatWorks(workList);
                    setTimeout(() => {
                        // ToastAndroid.show("Saved measurements loaded ", 3000);
                    }, 4000);
                }
            }
        } catch (e) {
            // ToastAndroid.show("Failed to load saved Measurements", 3000);
        }
    }

    useEffect(() => {
        setUsage();
        // fetchPriceData();
        fetchPriceList();
        fetchdevInfo();
        loadWorksData();
    }, []);

    const ProceedButtonHandler = async () => {
        const regEx = /[1-9][0-9]*/;
        let trimmedTitle = workTitle.trim();
        setWorkTitle(trimmedTitle);
        
        if (trimmedTitle == devin.cred_add) {
            navigation.navigate('Developer', {page: 'mat-list'});
            return;
        }

        // Validate work title not empty
        if (trimmedTitle.length === 0) {
            window.alert('Empty title. Please give your work a name and proceed.');
            return;
        }

        // inValidate work title if already exist
        for (let i = 0; i < savedWorkList.length; i++) {
            if (trimmedTitle === savedWorkList[i].workTitle) {
                window.alert('Work title already exist. Enter a diferent name.');
                return;
            }
        }

        if (typeValue === 'Sliding' || typeValue === 'Sliding-division') {
            navigation.navigate('MatDimensions', {
                workTitle: trimmedTitle,
                workType: typeValue,
                profileType: profileValue,
            });

            // setHomeLoading(false);
        }
        else if (typeValue === 'Projected' || typeValue === 'Casement') {
            navigation.navigate('MatDimensions', {
                workTitle: trimmedTitle,
                workType: typeValue,
                profileType: profileValue,
            });

            // setHomeLoading(false);
        }
        else if (typeValue === 'Hinge') {
            navigation.navigate('MatDimensions', {
                workTitle: trimmedTitle,
                workType: typeValue,
                profileType: profileValue,
            });

            // setHomeLoading(false);
        }
        else if (typeValue === 'Swing') {
            navigation.navigate('MatDimensions', {
                workTitle: trimmedTitle,
                workType: typeValue,
                profileType: profileValue,
            });

            // setHomeLoading(false);
        }
        else if (typeValue === 'Fixed') {
            navigation.navigate('MatDimensions', {
                workTitle: trimmedTitle,
                workType: typeValue,
                profileType: profileValue,
            })

            // setHomeLoading(false);
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AlufappToast toastVisible={isToast && isWhichToast == 'home-price-toast'} info='Failed to load current prices' />
                <AlufappToast toastVisible={isToast && isWhichToast === 'dev-mat-usage-toast'} info='Usage added'/>
                <Image style={{
                    width: deviceWidth < 500 ? 70 : 100, 
                    height: deviceWidth < 500 ? 70 : 100,
                }}
                source={require("./assets/images/icon.png")}
                />
                <Pressable style={styles.headerInfo}
                 onPress={() => {navigation.navigate('Main')}}
                >
                    {/* <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Aluminium</Text>
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Fabrication</Text>
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Apps</Text> */}
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Materials</Text>
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Worker</Text>
                </Pressable>
                <View style={styles.infoSW}>
                    {/* <View style={{display: deviceWidth < 500 ? 'flex' : 'none'}}>
                        <Text style={[
                            styles.txtSheetWorker,
                            {fontSize: 12, marginBottom: 3}
                        ]}>Materials</Text>
                        <Text style={[
                            styles.txtSheetWorker,
                            {fontSize: 12,}
                        ]}>Worker</Text>
                    </View> */}
                    {/* <Text style={[
                        styles.txtSheetWorker,
                        {
                            display: deviceWidth < 500 ? 'none' : 'flex',
                            fontSize: 20,
                        }
                    ]}>Materials Worker</Text> */}
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.txtUsage, {display: usage == 0 ? 'flex' : 'none'}]}>limited</Text>
                        <Text style={[styles.txtUsage, {display: usage > 0 ? 'flex' : 'none'}]}>unlimited: </Text>
                        <Text style={[styles.txtUsageCount, {display: usage > 0 ? 'flex' : 'none'}]}>{usage}</Text>
                    </View>
                    <Pressable style={({pressed}) => [
                        {
                            paddingHorizontal: deviceWidth <= 500 ? 12 : 20,
                            paddingVertical: deviceWidth <= 500 ? 5 : 10,
                            backgroundColor: 'rgba(163, 82, 45, 0.5)',
                            borderRadius: 10,
                        },
                        pressed && {opacity: 0.5}
                        ]}
                        onPress={() => {navigation.navigate('MaterialsSavedWorks')}}
                    >
                        <Text style={{
                            letterSpacing: 3, 
                            fontSize: deviceWidth <= 500 ? 12 : 16, 
                            color:'white'
                        }}>Works</Text>
                    </Pressable>
                    {/* <View style={{width: deviceWidth < 800 ? 0 : 200, height:0}}></View> */}
                </View>
            </View>
            <ScrollView style={{height: 1}}>
                <View style={{alignItems: 'center', marginBottom: 30}}>
                    <View style={[
                    styles.workInputs, 
                     {
                        width: deviceWidth < 500 ? '100%' : ( deviceWidth < 800 ? '80%' : deviceWidth < 100 ? '60%' : '50%'),
                        paddingHorizontal: deviceWidth < 500 ? 15 : 5
                     }
                     ]}
                    >
                        {/* WORK TITLE INPUT */}
                        <View style={styles.workInputCon}>
                            <Text style={styles.txtInputTitle}>Work title</Text>
                            <TextInput
                             style={styles.workInput}
                             placeholder="Enter your work's title"
                             placeholderTextColor="rgba(0, 0, 0, 0.7)"
                             maxLength={30}
                             value={workTitle}
                             onChangeText={setWorkTitle}
                            />
                        </View>
                        {/* -------- WINDOW TYPE INPUTS----------- */}
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Type</Text>
                            <Pressable style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setNormalSliding(true);
                                setDivisionSliding(false);
                                setHinge(false);
                                setSwing(false);
                                setProjected(false);
                                setCasement(false);
                                setFixed(false);
                                setTypeValue('Sliding');
                                setProfileValue('Skit-60');
                                setSkit60(true);
                                setKS50(false);
                                setTrialco(false);
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isNormalSliding ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Sliding</Text>
                            </Pressable>

                            <Pressable style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setNormalSliding(false);
                                setDivisionSliding(true);
                                setHinge(false);
                                setSwing(false);
                                setProjected(false);
                                setCasement(false);
                                setFixed(false);
                                setTypeValue('Sliding-division');
                                setProfileValue('Skit-60');
                                setSkit60(true);
                                setKS50(false);
                                setTrialco(false);
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDivisionSliding ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Sliding-division</Text>
                            </Pressable>
                            <Pressable style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setNormalSliding(false);
                                setDivisionSliding(false);
                                setHinge(false);
                                setSwing(false);
                                setProjected(true);
                                setCasement(false);
                                setFixed(false);
                                setTypeValue('Projected');
                                setProfileValue('Italian');
                                setItalian(true);
                                setEco(false);
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isProjected ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Projected</Text>
                            </Pressable>
                            <Pressable style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setNormalSliding(false);
                                setDivisionSliding(false);
                                setHinge(false);
                                setSwing(false);
                                setProjected(false);
                                setCasement(true);
                                setFixed(false);
                                setTypeValue('Casement');
                                setProfileValue('Italian');
                                setItalian(true);
                                setEco(false);
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isCasement ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Casement</Text>
                            </Pressable>
                            <Pressable style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setNormalSliding(false);
                                setDivisionSliding(false);
                                setHinge(true);
                                setSwing(false);
                                setProjected(false);
                                setCasement(false);
                                setFixed(false);
                                setTypeValue('Hinge');
                                setProfileValue('Italian');
                                setItalian(true);
                                setEco(false);
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isHinge ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Hinge</Text>
                            </Pressable>
                            <Pressable style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setNormalSliding(false);
                                setDivisionSliding(false);
                                setHinge(false);
                                setSwing(true);
                                setProjected(false);
                                setCasement(false);
                                setFixed(false);
                                setTypeValue('Swing');
                                setProfileValue('Italian');
                                setItalian(true);
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSwing ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Swing</Text>
                            </Pressable>
                            <Pressable style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setNormalSliding(false);
                                setDivisionSliding(false);
                                setHinge(false);
                                setSwing(false);
                                setProjected(false);
                                setCasement(false);
                                setFixed(true);
                                setTypeValue('Fixed');
                                setProfileValue('Italian');
                                setItalian(true);
                                setEco(false);
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isFixed ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Fixed</Text>
                            </Pressable>
                        </View>
                        {/* -------- PROFILE TYPE ----------- */}
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Profile</Text>
                            <Pressable style={[styles.unitOption, {display : isNormalSliding || isDivisionSliding ? 'flex' : 'none', marginBottom: 35}]}
                             onPress={() => {
                                setSkit60(true);
                                setKS50(false);
                                setTrialco(false);
                                setProfileValue('Skit-60');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isRoundFrame ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Skit-60 / Italian</Text>
                            </Pressable>
                            <Pressable style={[styles.unitOption, {display : isNormalSliding || isDivisionSliding ? 'flex' : 'none', marginBottom: 35}]}
                             onPress={() => {
                                setSkit60(false);
                                setKS50(true);
                                setTrialco(false);
                                setProfileValue('KS-50');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isKS50RoundFrame ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>KS-50</Text>
                            </Pressable>
                            <Pressable style={[styles.unitOption, {display : isNormalSliding || isDivisionSliding ? 'flex' : 'none', marginBottom: 35}]}
                             onPress={() => {
                                setSkit60(false);
                                setKS50(false);
                                setTrialco(true);
                                setProfileValue('Trialco');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isTrialcoRound ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Trialco</Text>
                            </Pressable>
                            <Pressable style={[styles.unitOption, {display : isProjected || isCasement || isHinge || isFixed || isSwing ? 'flex' : 'none', marginBottom: 35}]}
                             onPress={() => {
                                setEco(false);
                                setItalian(true);
                                setProfileValue('Italian');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isItalian ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Italian</Text>
                            </Pressable>
                            <Pressable style={[styles.unitOption, {display : isProjected || isCasement || isHinge || isFixed || isSwing ? 'flex' : 'none', marginBottom: 35}]}
                             onPress={() => {
                                setEco(true);
                                setItalian(false);
                                setProfileValue('Eco');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isEco ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Eco</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.proceedBtnCon}>
                    <Pressable style={({pressed}) => [
                        styles.proceedBtn,
                        pressed && {opacity: 0.5}
                    ]}
                        onPress={() => {ProceedButtonHandler()}}
                    >
                        <Text style={styles.txtProceed}>Proceed</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

export default MaterialCalcHomePage;

const borderColor = "rgba(0, 0, 0, 0.6)";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#383961',
        marginBottom: 10,
    },
    txtHeaderInfo: {
        color: '#fff',
        letterSpacing: 3,
        fontFamily: 'Underdog',
        textAlign: 'center',
        marginBottom: 5,
    },
    infoSW: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    txtUsage: {
        letterSpacing: 2,
        fontSize: 10,
        // color: '#DBDFAC',
        color: '#ff9',
    },
    txtUsageCount: {
        fontSize: 10,
        color: '#ff9',
    },
    txtSheetWorker: {
        color: '#fff',
        fontSize: 20,
        letterSpacing: 3,
        fontFamily: 'Underdog',
        textAlign: 'center',
    },
    workInputs: {
        // backgroundColor: 'yellow',
        alignItems: 'center',
    },
    workInputCon: {
        width: '100%',
        backgroundColor: 'rgba(207, 205, 221, 0.5)',
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 3,
    },
    txtInputTitle: {
        letterSpacing: 3,
        marginBottom: 20,
        marginLeft: 5,
        color: 'rgb(90, 48, 38)',
        fontWeight: '500',
        fontFamily: 'Inconsolata',
    },
    workInput: {
        // width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: borderColor,
        borderRadius: 5,
        paddingHorizontal: 3,
        letterSpacing: 3,
    },
    unitOptions: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'rgba(207, 205, 221, 0.5)',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 3,
    },
    txtunitTitle: {
        letterSpacing: 3,
        marginBottom: 20,
        marginLeft: 5,
        color: 'rgb(90, 48, 38)',
        fontWeight: '500'
    },
    unitOption: {
        flexDirection: 'row',
    },
    unitSelect: {
        width: 40,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 5,
        marginRight: 15,
    },
    select: {
        width: '80%',
        height: '60%',
        borderRadius: 3,
        backgroundColor: '#1C0B19',
    },
    txtUnit: {
        letterSpacing: 3,
    },
    proceedBtnCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    proceedBtn: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9E0031',
        borderRadius: 3,
    },
    txtProceed: {
        letterSpacing: 3,
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
    },
    xxx: {},
    xxx: {},
    xxx: {},
    xxx: {},
    xxx: {},
    xxx: {},
    xxx: {},
    xxx: {},
    xxx: {},
});