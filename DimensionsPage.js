import { View, Text, StyleSheet, ScrollView, Image, Dimensions, Pressable } from "react-native";
import { useContext, useState, useEffect, useCallback, useef } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AlufappContext } from "./alufapp-context";
import DimensionInput from "./DimensionInput";
import AllQtyAlert from "./AllQtyAlert";
import RequirePaymentModal from "./RequirePaymentModal";
import AlufappToast from "./AlufappToast";
import SavingCalculating from "./SavingCalculating";


function DimensionsPage({ route }) {
    const title = route.params.title;
    const numOfWindows = route.params.numOfWindows;
    const SheetSize = route.params.sheetSize;
    const regex = /^[0-9]+/;

    const alufappContext = useContext(AlufappContext);
    const dimensions = alufappContext.dimensions;
    const unit = alufappContext.unit;
    const isAllQtyAlert = alufappContext.isAllQtyAlert;
    const previousWorkArea = alufappContext.previousWorkArea;
    const isLimited = alufappContext.isSheetCalcLimited;
    const usage = alufappContext.sheetCalcUsage;
    const isToast = alufappContext.isToast;
    const isWhichToast = alufappContext.isWhichToast;
    const windowsLimit = 7;

    const navigation = useNavigation();
    const deviceDimension = Dimensions.get("window");
    const deviceWidth = deviceDimension.width;
    const deviceHeight = deviceDimension.height;

    const [isCalculating, setCalculating] = useState(false);

    let lowestSide;
    if (unit === "Millimeter" || unit === "Millimètre") {
        lowestSide = '50'
    }
    else if (unit === "Centimeter" || unit === "Centimètre") {
        lowestSide = '5'
    }
    else if (unit === "Mètre" || unit === "Meter") {
        lowestSide = '0.05'
    }
    else {
        lowestSide = '2'
    }

    // const fetchResults = async () => {
    //     const res = await fetch('https://console.firebase.google.com/project/aluminium-fabricator-mate/overview', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ width: 4, height: 5 }),
    //     });
        
    //     const data = await res.json();
    //     console.log(data.results);
    // }

    const fetchResults = async (dim, size) => {
        try {
            const res = await fetch('http://localhost:3001/sheet', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ MainDimensions: dim, SHEETSIZE: size }),
              });
            
              const data = await res.json();
              return data;
        } catch (error) {
            alufappContext.setWhichToast('sheet-fetch-results');
            alufappContext.showToast();
        }
        
    };

    const CalculateButtonHandler = async () => {
        let firstValidity = null;
        let secondValidity = null;
        let thirdValidity = null
        let qtyValidity = null

        // FIRST VALIDATION
        for (let i = 0; i < dimensions.length; i++) {
            const widthStr = await dimensions[i].width.trim();
            const heightStr = await dimensions[i].height.trim();
            const quantityStr = await dimensions[i].quantity.trim();
            

            const testWidth = regex.test(widthStr);
            const testheight = regex.test(heightStr);
            const testQuantity = regex.test(quantityStr);
            
            const testWidth2 = isNaN(widthStr);
            const testheight2 = isNaN(heightStr);
            const testQuantity2 = isNaN(quantityStr);
            
            if ((!testWidth || testWidth2) || (!testheight || testheight2) || (!testQuantity || testQuantity2)) {
                if (!testWidth || testWidth2) {
                    dimensions[i].widthValid = false;
                }
                if (!testheight || testheight2) {
                    dimensions[i].heightValid = false;
                } 
                if (!testQuantity || testQuantity2) {
                    dimensions[i].qtyValid = false;
                    
                }

                firstValidity = false;  
            }

            if ((testWidth && !testWidth2) || (testheight && !testheight2) || (testQuantity && !testQuantity2)) {
                if (testWidth && !testWidth2) {
                    dimensions[i].widthValid = true;
                }
                if (testheight && !testheight2) {
                    dimensions[i].heightValid = true;
                }
                if (testQuantity && !testQuantity2) {
                    dimensions[i].qtyValid = true;
                }
            }
        }

        if (firstValidity === false) {
            // setError(false);
            // setValidityAlert2(false);
            // setValidityAlert3(false);
            // setValidityAlert1(true);
            // setValidityAlert2B(false);
            // alufappContext.showAlert();
            window.alert('Invalid input: Please enter numbers only into the cells. Leave no space between numbers.');
            firstValidity = true;
            return;
        }

        // SECOND VALIDATION: checking width or height too low to compute
        for (let i = 0; i < dimensions.length; i++) {

            const widthStr = dimensions[i].width.trim();
            const heightStr = dimensions[i].height.trim();

            const width = parseFloat(widthStr);
            const height = parseFloat(heightStr);
            let widthIsValid, heightIsValid;
            
            
            if (unit === "Millimeter") {
                widthIsValid = width >= 50;
                heightIsValid = height >= 50;
            }
            else if (unit === "Centimeter") {
                widthIsValid = width >= 5;
                heightIsValid = height >= 5;
            }
            else if (unit === "Meter") {
                widthIsValid = width >= 0.05;
                heightIsValid = height >= 0.05;
            }
            else {
                widthIsValid = width >= 2;
                heightIsValid = height >= 2;
            }
          
            if (!widthIsValid || !heightIsValid ) {

                if (!widthIsValid) {
                    dimensions[i].widthValid = false;
                }
                if (!heightIsValid) {
                    dimensions[i].heightValid = false;
                }
                
                secondValidity = false;
            }

            if (widthIsValid || heightIsValid) {

                if (widthIsValid) {
                    dimensions[i].widthValid = true;
                }
                if (heightIsValid) {
                    dimensions[i].heightValid = true;
                }
                
            }
        }

        if (secondValidity === false) {
            // setError(false)
            // setValidityAlert1(false);
            // setValidityAlert3(false);
            // setValidityAlert2(false);
            // setValidityAlert2B(true);
            // glassSheetCtx.showAlert();
            window.alert(`Number too low. Please enter a number equal to or above ${lowestSide}.`);
            
            return;
        }

        // THIRD VALIDATION: check if width or height greater than sheet size
        for (let i = 0; i < dimensions.length; i++) {

            const widthStr = dimensions[i].width.trim();
            const heightStr = dimensions[i].height.trim();
            const quantityStr = dimensions[i].quantity.trim();
            
            const width = parseFloat(widthStr);
            const height = parseFloat(heightStr);
            const quantity = parseInt(quantityStr);
            
            let widthValid1 = width <= SheetSize.width;
            let widthValid2 = width <= SheetSize.height
            let heightValid1 = height <= SheetSize.width
            let heightValid2 = height <= SheetSize.height
            
            let widthIsValid = widthValid1 || widthValid2;
            let heightIsValid = heightValid1 || heightValid2;
            let validPanel = widthIsValid && heightIsValid;
            
            if (!validPanel) {

                if (!widthIsValid) {
                    dimensions[i].widthValid = false;
                }
                if (!heightIsValid) {
                    dimensions[i].heightValid = false;
                }
                thirdValidity = false;
            }
            else {

                if (!widthIsValid) {
                    dimensions[i].widthValid = true;
                }
                if (!heightIsValid) {
                    dimensions[i].heightValid = true;
                }
            }
        }

        if (thirdValidity === false) {
            window.alert('Dimension exceeds sheet size. Please enter a value within the sheet dimensions.');
            return;
        }

        // Fourth validation
        let totalQty = 0;
        for (let i = 0; i < dimensions.length; i++) {
            const quantityStr = dimensions[i].quantity.trim();
            const quantity = parseInt(quantityStr);
            let quantityIsValid = quantity > 0;

            if (!quantityIsValid) {
                qtyValidity = false;
                dimensions[i].qtyValid = false;
            }
            else {
                dimensions[i].qtyValid = true;
                totalQty += quantity;
            }
        }

        if (qtyValidity === false) {
           window.alert('Invalid input. Quantity cannot be Zero. Please enter a valid number in the quantity field.');
            
            return;
        }
        else { 
            const DimensionList = [];
            let countID = 0, currentWorkArea = 0;

            for (let i = 0; i < dimensions.length; i++) {
                let dimensionQty = parseInt(dimensions[i].quantity);
                let dimensionWidth = parseFloat(dimensions[i].width);
                let dimensionHeight = parseFloat(dimensions[i].height);
                let dimensionArea = (dimensionWidth * dimensionHeight) / 1000000;
                let inchWidthDec = dimensions[i].inchWidthDec;
                let inchHeightDec = dimensions[i].inchHeightDec;
                let  fullDimensionWidth = dimensionWidth + inchWidthDec;
                let  fullDimensionHeight = dimensionHeight + inchHeightDec;

                // if (isSiteMs) {
                //     let halfPanelWidth = fullDimensionWidth / 2;
                //     let halfPanelHeight = fullDimensionHeight - 160;
                //     halfPanelWidth = halfPanelWidth - 100;
                //     fullDimensionWidth = halfPanelWidth;
                //     fullDimensionHeight = halfPanelHeight;
                //     dimensionQty *= 2;
                // }
                
                for (let j = 0; j < dimensionQty; j++) { 
                    DimensionList.push({
                        id: countID,
                        width: fullDimensionWidth,
                        height: fullDimensionHeight,
                        area: dimensionArea,
                    });

                    countID++; 
                    currentWorkArea += dimensionArea;
                }
            }
            
            // if (isLimited && totalQty > windowsLimit) {
            //     glassSheetCtx.closeLoading();
            //     glassSheetCtx.setOfflineModalVisible(true);
            //     return;
            // }

            if (isLimited && totalQty > windowsLimit) {
                if (previousWorkArea !== currentWorkArea) {
                    alufappContext.setOfflineModalVisible(true);
                    return;
                }
                
                
            }

            if (countID > 300) {
                window.alert('Unable to work more than 300 panels at a go. Please consider dividing your work.')
                return;
            }

            const results = await fetchResults(DimensionList, SheetSize);

            try {
                // const results = SheetCalculator(DimensionList, SheetSize);
                
                // console.log('results: ', results)
                
                // COMPARE CURRENT WORK TO PREVIOUS WORK
                if (!isLimited) {
                    // console.log("usage: ", usage);
                    if (previousWorkArea !== null) {
                        if (previousWorkArea === currentWorkArea) {
                            navigation.navigate(
                                'Drawing',
                                {
                                    dimensions: dimensions,
                                    totalSheet: results.totalSheet,
                                    diagramArray: results.diagramArray,
                                    totalPieces: countID,
                                    title: title, 
                                    numOfWindows: numOfWindows,
                                    sheetSize: SheetSize,
                                }
                            );
        
                            // glassSheetCtx.closeLoading();
                        }
                        else {
                            navigation.navigate(
                                'Drawing',
                                {
                                    dimensions: dimensions,
                                    totalSheet: results.totalSheet,
                                    diagramArray: results.diagramArray,
                                    totalPieces: countID,
                                    title: title, 
                                    numOfWindows: numOfWindows,
                                    sheetSize: SheetSize,
                                }
                            );
        
                            // glassSheetCtx.closeLoading();
                            let newUsage = usage - 1;
                            alufappContext.setUsage(newUsage);
                            let newUsageStr = newUsage.toString();
                            await AsyncStorage.setItem('@gwusage', newUsageStr);
                            if (newUsage <= 0) {
                                alufappContext.setSheetCalcLimited();
                            }
                        }
                    }
                    else {
                        navigation.navigate(
                            'Drawing',
                            {
                                dimensions: dimensions,
                                totalSheet: results.totalSheet,
                                diagramArray: results.diagramArray,
                                totalPieces: countID,
                                title: title, 
                                numOfWindows: numOfWindows,
                                sheetSize: SheetSize,
                            }
                        );
    
                        // alufappContext.closeLoading();
                        let newUsage = usage - 1;
                        alufappContext.setSheetCalcUsage(newUsage);
                        let newUsageStr = newUsage.toString();
                        await AsyncStorage.setItem('@gwusage', newUsageStr);
                        if (newUsage <= 0) {
                            alufappContext.setSheetCalcLimited();
                        }
                    }

                    alufappContext.setWorkArea(currentWorkArea);
                }
                else {
                    navigation.navigate(
                        'Drawing',
                        {
                            dimensions: dimensions,
                            totalSheet: results.totalSheet,
                            diagramArray: results.diagramArray,
                            totalPieces: countID,
                            title: title, 
                            numOfWindows: numOfWindows,
                            sheetSize: SheetSize,
                        }
                    );

                }
                
            } catch (error) {
                window.alert(`${error}`)
                return;
            }
        }
    }
    
    return (
        <View style={styles.container}>
            <SavingCalculating isVisible={isCalculating} text={'Calculating...'}/>
            <AllQtyAlert alertVisible={isAllQtyAlert && numOfWindows > 3}/>
            <RequirePaymentModal
             info1="Payment required"
             info2={`You can only work up to ${windowsLimit} panels in limited mode. Pay GH2 and work more panels`}
             info3="Pay"
             page='sheet-calc-dimension'
            />
            <AlufappToast toastVisible={isToast && isWhichToast == 'sheet-dimensions-pay-success'} info='Transaction successful'/>
            <AlufappToast toastVisible={isToast && isWhichToast == 'sheet-calc-dimension-pay-cancel'} info='Transaction cancelled'/>
            <AlufappToast toastVisible={isToast && isWhichToast == 'sheet-fetch-results'} info='Results failed! Check internet'/>
            <View style={styles.header}>
                <Image style={{
                    width: deviceWidth < 500 ? 70 : 100, 
                    height: deviceWidth < 500 ? 70 : 100,
                }}
                source={require("./assets/images/icon.png")}
                />
                <Pressable style={styles.headerInfo}
                 onPress={() => {
                    const response = window.confirm('Navigate to main screen');
                    if (response) {
                        navigation.navigate('Main');
                    }
                 }}
                >
                    {/* <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Aluminium</Text>
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Fabrication</Text>
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Apps</Text> */}
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Sheet</Text>
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Worker</Text>
                </Pressable>
                <View style={styles.infoSW}>
                    <Text style={[
                        styles.txtSheetWorker,
                        {fontSize: deviceWidth <= 500 ? 15 : 20}
                    ]}>Dimensions</Text>
                    <View style={{width: deviceWidth < 800 ? 0 : 200, height:0,}}></View>
                </View>
            </View>
            <View style={{}}>
                <View style={{alignItems: 'center'}}>
                    <View style={[
                        {
                            width: deviceWidth < 500 ? '100%' : ( deviceWidth < 800 ? '80%' : deviceWidth < 100 ? '60%' : '50%'),
                            // paddingHorizontal: deviceWidth < 500 ? 15 : 5,
                            alignItems: 'center',
                            // backgroundColor: 'blue',
                        }
                    ]}>
                        {/* WORK TITLE */}
                        <View style={styles.titleContainer}>
                            <View style={styles.titleInnerContainer}>
                                <Text style={styles.title}>{title}</Text>
                            </View>
                        </View>
                        <View style={styles.dimensionsHeader}>
                            <View style={[styles.cell, styles.numCell]}><Text style={styles.heading}>No.</Text></View>
                            <View style={[styles.cell, styles.widthCell]}><Text style={styles.heading}>Width</Text></View>
                            <View style={[styles.cell, styles.heightCell]}><Text style={styles.heading}>Height</Text></View>
                            <View style={[styles.cell, styles.qtyCell]}><Text style={styles.heading}>Qty</Text></View>
                        </View>
                        <ScrollView style={{height: '70vh', width: '100%'}}>
                            {dimensions.map((item, index) => (<DimensionInput key={index} number={item.id}/>))}
                            <View style={[styles.proceedBtnCon, {marginTop: 60}]}>
                                <Pressable style={({pressed}) => [
                                    styles.proceedBtn,
                                    pressed && {opacity: 0.5}
                                ]}
                                    onPress={() => {
                                        // fetchResults();
                                        // setCalculating(true);

                                        // setTimeout(() => {
                                            CalculateButtonHandler()
                                        //     setCalculating(false);
                                        // }, 2000);
                                    }}
                                >
                                    <Text style={styles.txtProceed}>Calculate</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                        
                    </View>
                </View>
            </View>
        </View>
    );
}

export default DimensionsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(236, 235, 228, 0.5)',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#383961',
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
        justifyContent: 'center',
    },
    txtSheetWorker: {
        color: '#fff',
        fontSize: 20,
        letterSpacing: 3,
        fontFamily: 'Underdog',
        textAlign: 'center',
    },
    titleContainer: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'rgba(208, 207, 207, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    titleInnerContainer: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        color: 'rgba(80, 0, 0, 1)',
        marginRight: 10,
        letterSpacing: 3
    },
    numOuterContainer: {
        flexDirection: 'row'
    },
    dimensionsHeader: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        backgroundColor: 'rgba(236, 235, 228, 0.5)',
    },
    cell: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.3)'
    },
    numCell: {
        width: '12%',
        borderRightWidth: 1,
        
    },
    widthCell: {
        width: '35%',
        borderRightWidth: 1,
    },
    heightCell: {
        width: '35%',
        borderRightWidth: 1,
    },
    qtyCell: {
        width: '18%'
    },
    heading: {
        // color: Colors.text100,
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
    },
    list: {
        flex: 1,
        marginBottom: 20,
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
        letterSpacing: 4,
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