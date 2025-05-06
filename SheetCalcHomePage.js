import { View, Text, TextInput, StyleSheet, Image, Dimensions, ScrollView, Pressable, Alert} from "react-native";
import { useState, useContext, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AlufappContext } from "./alufapp-context";
import AlufappToast from "./AlufappToast";
import RequirePaymentModal from "./RequirePaymentModal";

function SheetCalcHomePage() {
    const navigation = useNavigation();
    const deviceDimension = Dimensions.get("window");
    const deviceWidth = deviceDimension.width;
    const deviceHeight = deviceDimension.height;
    const alufappContext = useContext(AlufappContext);
    const works = alufappContext.works;
    const isToast = alufappContext.isToast;
    const isWhichToast = alufappContext.isWhichToast;
    const isLimited = alufappContext.isSheetCalcLimited;
    const usage = alufappContext.sheetCalcUsage;
    const windowsLimit = 5;

    const [sheetWidth, setSheetWidth] = useState('3300');
    const [sheetHeight, setSheetHeight] = useState('2250');
    const [sheetSize, setSheetSize] = useState();
    const [unit, setUnit] = useState('Millimeter');
    const [minSheetSize, setMinSheetSize] = useState('');
    const [] = useState();

    const [isdecHover, setDecHover] = useState(false);
    const [isIncHover, setIncHover] = useState(false);
    const [] = useState(false);

    const [numberOfWindows, setNumOfWindows] = useState('1');
    const [isMillimeter, setMillimeter] = useState(true);
    const [isCentimeter, setCentimeter] = useState(false);
    const [isMeter, setMeter] = useState(false);
    
    const [isPredefined, setPredefined] = useState(true);
    const [isCustom, setCustom] = useState(false);
    
    const [isPredSize_1, setPresSize_1] = useState(true);
    const [isPredSize_2, setPresSize_2] = useState(false);
    const [isPredSize_3, setPresSize_3] = useState(false);
    const [isPredSize_4, setPresSize_4] = useState(false);
    const [isPredSize_5, setPresSize_5] = useState(false);
    const [isPredSize_6, setPresSize_6] = useState(false);
    const [isPredSize_7, setPresSize_7] = useState(false);
    const [isPredSize_8, setPresSize_8] = useState(false);
    const [isPredSize_9, setPresSize_9] = useState(false);
    
    const [workTitle, setWorkTitle] = useState('');
    const [devin, setDevin] = useState('');

    const [] = useState();
    const [] = useState();

    // Load and set usage and limitation
    const loadUsage = async () => {
        try {
            let getUsage = await AsyncStorage.getItem('@gwusage');
           
            if (getUsage === null) {
                await AsyncStorage.setItem('@gwusage', '0');
                alufappContext.setSheetCalcUsage(0);
                alufappContext.setSheetCalcLimited();
            }
            else {
                getUsage = parseInt(getUsage);
                alufappContext.setSheetCalcUsage(getUsage);
                if (getUsage > 0) {
                    alufappContext.setSheetCalcUnlimited();
                }
                else {alufappContext.setSheetCalcLimited();}
                // await AsyncStorage.setItem('@gwusage', '3'); 
                // glassSheetCtx.setSheetCalcUsage(3);
            }
        } catch (e) {
            // console.log(e)
        }
    }

    // Load and set saved works to context
    const loadWorksData = async () => {
        try {
            const workKeys = await AsyncStorage.getAllKeys();
            if (workKeys.length > 0) {
                const works = [];
                for (let i = workKeys.length-1; i >= 0; i--) {
                    let workKey = workKeys[i], prefix = '';

                    for (let j = 0; j <=3; j++) {
                        prefix += workKey[j];
                    }

                    if (prefix == '@gw-') {
                        const work = await AsyncStorage.getItem(workKeys[i]);
                        works.push(JSON.parse(work));
                    }
                }

                if (works.length > 0) {
                    alufappContext.setWorks(works);
                }
                
                // window.alert('Works loaded');
                // ToastAndroid.show("Saved works loaded ", 3000);
            }
        } catch (e) {
            // console.log(e)
            window.alert('Works loading failed');
            // ToastAndroid.show("Failed to load saved works", 3000);
        }
    }

    // const fetchdevInfo = async () => {
    //     try {
    //         const devInfoRef = ref(database, 'dev-info');

    //         onValue(devInfoRef, (snapshot) => {
    //             setDevInfo(snapshot.val());
    //         });
    //     } catch (error) {
    //         window.alert('DevInfo error!. Check internet');
    //     }
    // }

    const fetchDevin = async () => {
        try {
            const res = await fetch('https://alufapp-backend.onrender.com/dataList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await res.json();
            setDevin(data.devin);

        } catch (error) {
            // console.log(error)
        }
    }

    useEffect(() => { 
        // loadLanguage();
        loadWorksData();
        loadUsage();
        fetchDevin();
    }, []);

    // Set all same quantity to null when on this page
    useFocusEffect(
        useCallback(() => {
            alufappContext.setAllQty(null);
        })
    );

    // INCREASE WINDOWS QUANTITY
    const incWindows = () => {
        let parsedValue = parseInt(numberOfWindows);
        if (parsedValue < 100) {
            parsedValue += 1;
        }

        setNumOfWindows(parsedValue.toString());
    }

    // DECCREASE WINDOWS QUANTITY
    const decWindows = () => {
        let parsedValue = parseInt(numberOfWindows);
        if (parsedValue > 1) {
            parsedValue -= 1;
        }

        setNumOfWindows(parsedValue.toString());
    }

    // PROCEED BUTTON HANDLER
    const ProceedButtonHandler = async () => {
        const regex = /^[A-Za-z0-9]([A-Za-z0-9]*|(\s)*$)/;
        const enteredTitle = workTitle.trim();
        const titleIsValid = regex.test(enteredTitle);
        const windowsQuantity = parseInt(numberOfWindows);
        const quantityIsValid = !isNaN(windowsQuantity);

        if (enteredTitle === devin.cred_add) {
            setWorkTitle('');
            navigation.navigate('Developer', {page: 'mat-list'});
            return;
        }
        
        const isOverWIndowsLimit = parseInt(numberOfWindows) > windowsLimit;
        if (isLimited && isOverWIndowsLimit) {
            alufappContext.setOfflineModalVisible(true);
            // window.alert('Payment required')
            return;
        }
        
        // window.confirm("This is an alert in React Native Web!");
        if (!titleIsValid || !quantityIsValid || windowsQuantity <= 0 || windowsQuantity > 100)  {
            if (enteredTitle == "") {
                window.alert('Empty title. Please give your work a name and proceed.');
            }
            else if (!titleIsValid) {
                window.alert('Wrong characters. Please give your work a proper name and proceed.');
            }

            if (!quantityIsValid) {
                window.alert('Invalid number of windows. Please enter numbers only.')
            }
            if (windowsQuantity <= 0) {
                window.alert('Number of windows cannot be less than 1. Please enter a valid number.')
            }
            if (windowsQuantity > 100) {
                window.alert('Number of windows cannot exceed 100. Please enter number between 1 and 100.')
            }

            return;
        }

        // Check work title exist
        let titleExist = false;
        if (works.length > 0) {
            for (let i = 0; i < works.length; i++) {
                if (works[i].title === enteredTitle) {
                    titleExist = true;
                    break;
                }
                
            }

            if (titleExist) {
                window.alert('Work title already exist. Enter a diferent name.');
                return;
            }
        }

        // Validate sheet width and height
        let regex2 = /^[0-9][0-9]*/;
        let customWidthT = sheetWidth.trim();
        let customHeightT = sheetHeight.trim();
        let validCustomWidth = regex2.test(customWidthT);
        let validCustomHeight = regex2.test(customHeightT);

        if (!validCustomWidth || !validCustomHeight) {
            if (!validCustomWidth) {
                window.alert('Invalid sheet width');
             }
             
 
            if (!validCustomHeight) {
                window.alert('Invalid sheet height');
            }
            
            return;
         }

         // VALIDATING CUSTOM SIZE GREATER OR EQUAL TO MINIMUM SIZE
        let minimumSize, minSizeStr;
        if(unit === "Millimeter") {
            minimumSize = 100;
            minSizeStr = '100 millimeters';
        }
        else if (unit === "Centimeter") {
            minimumSize = 10;
            minSizeStr = '10 centimeters';
        }
        else if (unit === "Meter") {
            minimumSize = 0.1;
            minSizeStr = '0.1 meter';
        }
        
        let widthSizeValid = parseFloat(customWidthT) >= minimumSize;
        let heightSizeValid = parseFloat(customHeightT) >= minimumSize;
        
        
        if (!widthSizeValid || !heightSizeValid) {
            window.alert(`Sheet length must be at least ${minSizeStr}.`)
            return;
        }

        let widthSize = parseFloat(sheetWidth);
        let heightSize = parseFloat(sheetHeight);
        let lowerSide = widthSize;
        let higherSide = heightSize;

        if (lowerSide > higherSide) {
            lowerSide = higherSide;
            higherSide = widthSize;
        }

        let fraction = lowerSide / higherSide;
        
        if (fraction < 0.2) {
            window.alert('Invalid dimensions. Sheet width and height differ widely. Please enter a valid sheet size.')
            return;
        }
        
        // Setting windows quantity and unit
        alufappContext.pushDimensions(windowsQuantity);

        if(unit === "Millimeter") {
            alufappContext.setUnit("Millimeter");
        }
        else if (unit === "Centimeter") {
            alufappContext.setUnit("Centimeter");
        }
        else if (unit === "Meter") {
            alufappContext.setUnit("Meter");
        }

        let trimSheetWidth = sheetWidth.trim();
        let trimSheetHeight = sheetHeight.trim();

        let parsedWidth = parseFloat(trimSheetWidth);
        let parsedHeight = parseFloat(trimSheetHeight);
        let longerSide = parsedWidth;
        let lowestSide = parsedHeight;

        if (lowestSide > longerSide) {
            longerSide = lowestSide;
            lowestSide = widthSize;
        }

        let areaDivisor;
        if (unit === 'Millimeter') {
            areaDivisor = 1000000;
        }
        else if (unit === 'Centimeter') {
            areaDivisor = 10000;
        }
        else {
            areaDivisor = 1;
        }
        const Sheet = {
            width: longerSide,
            height: lowestSide,
            signWidth: longerSide,
            signHeight: lowestSide,
            decWidth: '',
            decHeight: '',
            area: (lowestSide * longerSide) / areaDivisor
        };

        // Navigate to dimensions entry screen
        navigation.navigate(
            "SheetDimensions",
            {
                title: enteredTitle,
                numOfWindows: numberOfWindows,
                sheetSize: Sheet,
                
            }
        );
        
    }

    return (
        <View style={styles.container}>
            <AlufappToast toastVisible={isToast && isWhichToast === 'main-toast'} info='Work successfully saved'/>
            <AlufappToast toastVisible={isToast && isWhichToast === 'main-pay-success'} info='Transaction successful'/>
            <AlufappToast toastVisible={isToast && isWhichToast === 'main-pay-fail'} info='Transaction failed'/>
            <AlufappToast toastVisible={isToast && isWhichToast === 'main-pay-cancel'} info='Transaction cancelled'/>
            <AlufappToast toastVisible={isToast && isWhichToast === 'dev-sheet-usage-toast'} info='Usage added'/>
            <RequirePaymentModal
             info1="Payment Required"
             info2={`Working more than ${windowsLimit} windows reqiure payment. Pay GH2 and continue working more.`}
             info3="Pay"
             page='sheet-calc-home'
            />
            <View style={styles.header}>
                {/* <Image style={{
                    width: deviceWidth < 500 ? 70 : 100, 
                    height: deviceWidth < 500 ? 70 : 100,
                }}
                source={require("./assets/images/icon.png")}
                /> */}
                <Pressable style={styles.headerInfo}
                 onPress={() => {navigation.navigate('Main')}}
                >
                    {/* <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Aluminium</Text>
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Fabrication</Text>
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Apps</Text> */}
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Sheet</Text>
                    <Text style={[styles.txtHeaderInfo2, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Worker</Text>
                </Pressable>
                <View style={styles.infoSW}>
                    {/* <View style={{display: deviceWidth < 500 ? 'flex' : 'none'}}>
                        <Text style={[
                            styles.txtSheetWorker,
                            {fontSize: 12, marginBottom: 3}
                        ]}>Sheet</Text>
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
                    ]}>Sheet Worker</Text> */}
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
                     onPress={() => {navigation.navigate('SavedWorks')}}
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
            <ScrollView style={{height:1}}>
                <View style={{alignItems: 'center'}}>
                    <View style={[
                        styles.workInputs, 
                        {
                            width: deviceWidth < 500 ? '100%' : ( deviceWidth < 800 ? '80%' : deviceWidth < 100 ? '60%' : '50%'),
                            paddingHorizontal: deviceWidth < 500 ? 15 : 5,
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
                        {/* NUMBER OF WINDOWS INPUT */}
                        <View style={styles.windowsInputCon}>
                            <Text style={styles.txtInputTitle}>Number of windows</Text>
                            <View style={styles.windowsInputs}>
                                <TextInput
                                 style={styles.windowsInput}
                                 value={numberOfWindows}
                                 onChangeText={setNumOfWindows}
                                 keyboardType="number-pad"
                                 maxLength={3}
                                />
                                <View style={{marginLeft: 40}}>
                                    <Pressable
                                    style={({pressed}) => [
                                        styles.windowsBtn,
                                        {
                                            width: deviceWidth < 500 ? 100 : deviceWidth < 800 ? 150 : 180, 
                                            backgroundColor: isIncHover ? "rgba(0, 0, 0, 1)" : "#1C0B19",
                                            opacity: isIncHover ? 0.5 : 1,
                                            marginBottom: 20
                                        },
                                        pressed && {opacity: 0.5}
                                    ]}
                                    onHoverIn={() => {setIncHover(true)}}
                                    onHoverOut={() => {setIncHover(false)}}
                                    onPress={() => {incWindows()}}
                                    >
                                        <Ionicons name="chevron-up-outline" size={25} color='#ff9'/>
                                    </Pressable>
                                    <Pressable
                                    style={({pressed}) => [
                                        styles.windowsBtn,
                                        {
                                            width: deviceWidth < 500 ? 100 : deviceWidth < 800 ? 150 : 180,
                                            backgroundColor: isdecHover ? "rgba(0, 0, 0, 1)" : "#1C0B19",
                                            opacity: isdecHover ? 0.5 : 1,
                                        },
                                        pressed && {opacity: 0.5}
                                    ]}
                                    onHoverIn={() => {setDecHover(true)}}
                                    onHoverOut={() => {setDecHover(false)}}
                                    onPress={() => {decWindows()}}
                                    >
                                        <Ionicons name="chevron-down-outline" size={25} color='#ff9'/>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        {/* UNIT INPUT */}
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Measurement unit</Text>
                            <Pressable style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setMillimeter(true);
                                setCentimeter(false);
                                setMeter(false);
                                setUnit('Millimeter');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isMillimeter ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Millimeter</Text>
                            </Pressable>
                            <Pressable style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setMillimeter(false);
                                setCentimeter(true);
                                setMeter(false);
                                setUnit('Centimeter');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isCentimeter ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Centimeter</Text>
                            </Pressable>
                            <Pressable style={styles.unitOption}
                             onPress={() => {
                                setMillimeter(false);
                                setCentimeter(false);
                                setMeter(true);
                                setUnit('Meter');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isMeter ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Meter</Text>
                            </Pressable>
                        </View>
                        {/* SHEET SIZE INPUT */}
                        <View style={styles.sheetSize}>
                            <View style={styles.sizeTypes}>
                                <Text style={[styles.txtSizeTitle, {marginRight: 15}]}>Sheet size</Text>
                                <Pressable style={({pressed}) => [
                                    styles.sizeType,
                                    {
                                        marginRight: 15,
                                        backgroundColor: isPredefined ? '#A8D5E2' : 'transparent'
                                    },
                                    pressed && {opacity: 0.5}
                                 ]}
                                 onPress={() => {
                                    setPredefined(true);
                                    setCustom(false);
                                    if (isMillimeter) {
                                        setSheetWidth('3300');
                                        setSheetHeight('2250');
                                    }
                                    else if (isCentimeter) {
                                        setSheetWidth('330');
                                        setSheetHeight('225');
                                    }
                                    else {
                                        setSheetWidth('3.3');
                                        setSheetHeight('2.25');
                                    }
                                 }}
                                >
                                    <Text style={styles.txtSizeType}>Standard</Text>
                                </Pressable>
                                <Pressable style={({pressed}) => [
                                    styles.sizeType,
                                    {backgroundColor: isCustom ? '#A8D5E2' : 'transparent'},
                                    pressed && {opacity: 0.5}
                                 ]}
                                 onPress={() => {
                                    setPredefined(false);
                                    setCustom(true);
                                    setSheetWidth('');
                                    setSheetHeight('');
                                 }}
                                >
                                    <Text style={styles.txtSizeType}>Custom</Text>
                                </Pressable>
                            </View>
                            {/* PREDEFINED VIEW */}
                            <ScrollView style={[styles.predSizes, {display: isPredefined ? 'flex' : 'none'}]}
                            //  horizontal={true}
                            >
                                <Pressable style={[styles.predSize, {backgroundColor: isPredSize_1 ? '#1C0B19' : 'transparent'}]}
                                 onPress={() => {
                                    setPresSize_1(true);
                                    setPresSize_2(false);
                                    setPresSize_3(false);
                                    setPresSize_4(false);
                                    setPresSize_5(false);
                                    setPresSize_6(false);
                                    setPresSize_7(false);
                                    setPresSize_8(false);
                                    setPresSize_9(false);
                                    
                                    if (isMillimeter) {
                                        setSheetWidth('3300');
                                        setSheetHeight('2250');
                                    }
                                    else if (isCentimeter) {
                                        setSheetWidth('330');
                                        setSheetHeight('225');
                                    }
                                    else {
                                        setSheetWidth('3.3');
                                        setSheetHeight('2.25');
                                    }
                                 }}
                                >
                                    <Text style={[styles.txtUnit, {color: isPredSize_1 ? '#fff' : 'black', backgroundColor: isPredSize_1 ? '#1C0B19' : 'transparent'}]}>
                                        {
                                            isMillimeter ? 'Glass: 3300mm x 2250mm' : isCentimeter ? 'Glass 330cm x 225cm' : 'Glass 3.3m x 2.25m'
                                        }
                                    </Text>
                                </Pressable>
                                <Pressable style={[styles.predSize, {backgroundColor: isPredSize_2 ? '#1C0B19' : 'transparent'}]}
                                 onPress={() => {
                                    setPresSize_1(false);
                                    setPresSize_2(true);
                                    setPresSize_3(false);
                                    setPresSize_4(false);
                                    setPresSize_5(false);
                                    setPresSize_6(false);
                                    setPresSize_7(false);
                                    setPresSize_8(false);
                                    setPresSize_9(false);
                                    
                                    if (isMillimeter) {
                                        setSheetWidth('3300');
                                        setSheetHeight('2200');
                                    }
                                    else if (isCentimeter) {
                                        setSheetWidth('330');
                                        setSheetHeight('220');
                                    }
                                    else {
                                        setSheetWidth('3.3');
                                        setSheetHeight('2.2');
                                    }
                                }}
                                >
                                    <Text style={[styles.txtUnit, {color: isPredSize_2 ? '#fff' : 'black'}]}>
                                        {
                                            isMillimeter ? 'Glass: 3300mm x 2200mm' : isCentimeter ? 'Glass 330cm x 220cm' : 'Glass 3.3m x 2.2m'
                                        }
                                    </Text>
                                </Pressable>
                                <Pressable style={[styles.predSize, {backgroundColor: isPredSize_3 ? '#1C0B19' : 'transparent'}]}
                                 onPress={() => {
                                    setPresSize_1(false);
                                    setPresSize_2(false);
                                    setPresSize_3(true);
                                    setPresSize_4(false);
                                    setPresSize_5(false);
                                    setPresSize_6(false);
                                    setPresSize_7(false);
                                    setPresSize_8(false);
                                    setPresSize_9(false);
                                    
                                    if (isMillimeter) {
                                        setSheetWidth('3210');
                                        setSheetHeight('2250');
                                    }
                                    else if (isCentimeter) {
                                        setSheetWidth('321');
                                        setSheetHeight('225');
                                    }
                                    else {
                                        setSheetWidth('3.21');
                                        setSheetHeight('2.25');
                                    }
                                }}
                                >
                                    <Text style={[styles.txtUnit, {color: isPredSize_3 ? '#fff' : 'black'}]}>
                                    {
                                            isMillimeter ? 'Glass: 3210mm x 2250mm' : isCentimeter ? 'Glass 321cm x 225cm' : 'Glass 3.21m x 2.25m'
                                        }
                                    </Text>
                                </Pressable>
                                <Pressable style={[styles.predSize, {backgroundColor: isPredSize_4 ? '#1C0B19' : 'transparent'}]}
                                 onPress={() => {
                                    setPresSize_1(false);
                                    setPresSize_2(false);
                                    setPresSize_3(false);
                                    setPresSize_4(true);
                                    setPresSize_5(false);
                                    setPresSize_6(false);
                                    setPresSize_7(false);
                                    setPresSize_8(false);
                                    setPresSize_9(false);
                                    
                                    if (isMillimeter) {
                                        setSheetWidth('3210');
                                        setSheetHeight('2140');
                                    }
                                    else if (isCentimeter) {
                                        setSheetWidth('321');
                                        setSheetHeight('214');
                                    }
                                    else {
                                        setSheetWidth('3.21');
                                        setSheetHeight('2.14');
                                    }
                                }}
                                >
                                    <Text style={[styles.txtUnit, {color: isPredSize_4 ? '#fff' : 'black'}]}>
                                    {
                                            isMillimeter ? 'Glass: 3210mm x 2140mm' : isCentimeter ? 'Glass 321cm x 214cm' : 'Glass 3.21m x 2.14m'
                                        }
                                    </Text>
                                </Pressable>
                                <Pressable style={[styles.predSize, {backgroundColor: isPredSize_5 ? '#1C0B19' : 'transparent'}]}
                                 onPress={() => {
                                    setPresSize_1(false);
                                    setPresSize_2(false);
                                    setPresSize_3(false);
                                    setPresSize_4(false);
                                    setPresSize_5(true);
                                    setPresSize_6(false);
                                    setPresSize_7(false);
                                    setPresSize_8(false);
                                    setPresSize_9(false);
                                    
                                    if (isMillimeter) {
                                        setSheetWidth('3210');
                                        setSheetHeight('2200');
                                    }
                                    else if (isCentimeter) {
                                        setSheetWidth('321');
                                        setSheetHeight('220');
                                    }
                                    else {
                                        setSheetWidth('3.21');
                                        setSheetHeight('2.2');
                                    }
                                }}
                                >
                                    <Text style={[styles.txtUnit, {color: isPredSize_5 ? '#fff' : 'black'}]}>
                                    {
                                            isMillimeter ? 'Glass: 3210mm x 2200mm' : isCentimeter ? 'Glass 321cm x 220cm' : 'Glass 3.21m x 2.2m'
                                        }
                                    </Text>
                                </Pressable>
                                <Pressable style={[styles.predSize, {backgroundColor: isPredSize_6 ? '#1C0B19' : 'transparent'}]}
                                 onPress={() => {
                                    setPresSize_1(false);
                                    setPresSize_2(false);
                                    setPresSize_3(false);
                                    setPresSize_4(false);
                                    setPresSize_5(false);
                                    setPresSize_6(true);
                                    setPresSize_7(false);
                                    setPresSize_8(false);
                                    setPresSize_9(false);
                                    
                                    if (isMillimeter) {
                                        setSheetWidth('1830');
                                        setSheetHeight('2440');
                                    }
                                    else if (isCentimeter) {
                                        setSheetWidth('183');
                                        setSheetHeight('244');
                                    }
                                    else {
                                        setSheetWidth('1.83');
                                        setSheetHeight('2.44');
                                    }
                                }}
                                >
                                    <Text style={[styles.txtUnit, {color: isPredSize_6 ? '#fff' : 'black'}]}>
                                    {
                                            isMillimeter ? 'Glass: 1830mm x 2440mm' : isCentimeter ? 'Glass 183cm x 244cm' : 'Glass 1.83m x 2.44m'
                                        }
                                    </Text>
                                </Pressable>
                                
                                <Pressable style={[styles.predSize, {backgroundColor: isPredSize_7 ? '#1C0B19' : 'transparent'}]}
                                 onPress={() => {
                                    setPresSize_1(false);
                                    setPresSize_2(false);
                                    setPresSize_3(false);
                                    setPresSize_4(false);
                                    setPresSize_5(false);
                                    setPresSize_6(false);
                                    setPresSize_7(true);
                                    setPresSize_8(false);
                                    setPresSize_9(false);
                                    
                                    if (isMillimeter) {
                                        setSheetWidth('1320');
                                        setSheetHeight('2140');
                                    }
                                    else if (isCentimeter) {
                                        setSheetWidth('132');
                                        setSheetHeight('214');
                                    }
                                    else {
                                        setSheetWidth('1.32');
                                        setSheetHeight('2.14');
                                    }
                                }}
                                >
                                    <Text style={[styles.txtUnit, {color: isPredSize_7 ? '#fff' : 'black'}]}>
                                    {
                                            isMillimeter ? 'Glass: 1320mm x 2140mm' : isCentimeter ? 'Glass 132cm x 214cm' : 'Glass 1.32m x 2.14m'
                                        }
                                    </Text>
                                </Pressable>
                                <Pressable style={[styles.predSize, {backgroundColor: isPredSize_8 ? '#1C0B19' : 'transparent'}]}
                                 onPress={() => {
                                    setPresSize_1(false);
                                    setPresSize_2(false);
                                    setPresSize_3(false);
                                    setPresSize_4(false);
                                    setPresSize_5(false);
                                    setPresSize_6(false);
                                    setPresSize_7(false);
                                    setPresSize_8(true);
                                    setPresSize_9(false);
                                    
                                    if (isMillimeter) {
                                        setSheetWidth('1220');
                                        setSheetHeight('2440');
                                    }
                                    else if (isCentimeter) {
                                        setSheetWidth('122');
                                        setSheetHeight('244');
                                    }
                                    else {
                                        setSheetWidth('1.22');
                                        setSheetHeight('2.44');
                                    }
                                }}
                                >
                                    <Text style={[styles.txtUnit, {color: isPredSize_8 ? '#fff' : 'black'}]}>
                                        {
                                            isMillimeter ? 'Alucobond: 1220mm x 2440mm' : isCentimeter ? 'Alucobond 122cm x 244cm' : 'Alucobond 1.22m x 2.44m'
                                        }
                                    </Text>
                                </Pressable>
                                <Pressable style={[styles.predSize, {backgroundColor: isPredSize_9 ? '#1C0B19' : 'transparent'}]}
                                 onPress={() => {
                                    setPresSize_1(false);
                                    setPresSize_2(false);
                                    setPresSize_3(false);
                                    setPresSize_4(false);
                                    setPresSize_5(false);
                                    setPresSize_6(false);
                                    setPresSize_7(false);
                                    setPresSize_8(false);
                                    setPresSize_9(true);
                                    
                                    if (isMillimeter) {
                                        setSheetWidth('1500');
                                        setSheetHeight('2900');
                                    }
                                    else if (isCentimeter) {
                                        setSheetWidth('150');
                                        setSheetHeight('290');
                                    }
                                    else {
                                        setSheetWidth('1.5');
                                        setSheetHeight('2.9');
                                    }
                                }}
                                >
                                    <Text style={[styles.txtUnit, {color: isPredSize_9 ? '#fff' : 'black'}]}>
                                    {
                                            isMillimeter ? 'Alucobond: 1500mm x 2900mm' : isCentimeter ? 'Alucobond 150cm x 290cm' : 'Alucobond 1.5m x 2.9m'
                                        }
                                    </Text>
                                </Pressable>
                            </ScrollView>
                            {/* PREDEFINED VIEW */}
                            <View style={{marginBottom: 10, display: isCustom ? 'flex' : 'none'}}>
                                {/* <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30}}> */}
                                    {/* <Text style={{letterSpacing: 3}}>Sheet width: </Text> */}
                                    <TextInput style={[styles.sheetSizeInput, {marginBottom: 20}]}
                                    placeholder="Enter sheet width"
                                    placeholderTextColor="rgba(0, 0, 0, 0.7)"
                                    keyboardType="number-pad"
                                    maxLength={isMillimeter ? 4 : 3}
                                    readOnly={isCustom ? false : true}
                                    value={sheetWidth}
                                    onChangeText={setSheetWidth}
                                    />
                                {/* </View> */}
                                {/* <View style={{flexDirection: 'row', alignItems: 'center'}}> */}
                                    {/* <Text style={{letterSpacing: 3}}>Sheet height: </Text> */}
                                    <TextInput style={styles.sheetSizeInput}
                                    placeholder="Enter sheet height"
                                    placeholderTextColor="rgba(0, 0, 0, 0.7)"
                                    keyboardType="number-pad"
                                    maxLength={isMillimeter ? 4 : 3}
                                    readOnly={isCustom ? false : true}
                                    value={sheetHeight}
                                    onChangeText={setSheetHeight}
                                    />
                            </View>
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

export default SheetCalcHomePage;

const borderColor = "rgba(0, 0, 0, 0.6)";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#383961',
        marginBottom: 10,
    },
    headerInfo: {
        borderRightWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingRight: 7,
        paddingLeft: 15,
    },
    txtHeaderInfo: {
        color: '#fff',
        letterSpacing: 3,
        fontFamily: 'Underdog',
        textAlign: 'center',
        marginBottom: 5,
    },
    txtHeaderInfo2: {
        color: '#fff',
        letterSpacing: 3,
        fontFamily: 'Underdog',
        textAlign: 'center',
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
    windowsInputCon: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'rgba(207, 205, 221, 0.5)',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 3,
    },
    windowsInputs: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    windowsInput: {
        width: '40%',
        height: 60,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: borderColor,
        borderRadius: 5,
        letterSpacing: 2,
        fontSize: 20,
    },
    windowsBtn: {
        height: 35,
        // width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 3,
        // borderColor: '#6A041D',
        borderColor: 'rgba(0, 0, 0, 0.4)',
        // backgroundColor: '#A8D5E2',
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
    sheetSize: {
        width: '100%',
        backgroundColor: 'rgba(207, 205, 221, 0.5)',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 3,
        marginBottom: 40,
    },
    sizeTypes: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    sizeType: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 3,
        
    },
    txtSizeTitle: {
        letterSpacing: 3,
        // marginBottom: 20,
        marginLeft: 5,
        color: 'rgb(90, 48, 38)',
        fontWeight: '500'
    },
    txtSizeType: {
        letterSpacing: 3
    },
    predSizes: {
        height: 200,
        // borderLeftWidth: 1,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        // borderWidth: 1,
        marginBottom: 10,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'space-evenly',
        // borderColor: 'grey',
        borderRadius: 2,
    },
    predSize: {
        // width: 130,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: 20,
        borderBottomWidth: 1,
        // marginTop: 10,
        // marginBottom: 15,
        // marginLeft: 10,
        // borderWidth: 1,
        // borderRadius: 10,
        borderColor: 'grey',
    },
    sheetSizeInput: {
        // width: 250,
        height: 40,
        borderWidth: 1,
        borderColor: borderColor,
        borderRadius: 5,
        paddingHorizontal: 3,
        letterSpacing: 2,
        // marginLeft: 15,
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
});