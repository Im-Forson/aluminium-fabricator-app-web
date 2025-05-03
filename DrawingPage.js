import { useContext, useState, useEffect } from "react";
import { View, SafeAreaView, Text, StyleSheet, Pressable, ActivityIndicator, ScrollView, Dimensions, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AlufappContext } from "./alufapp-context";
import SavingCalculating from "./SavingCalculating";

function DrawingPage({ route }) {
    const totalSheet = route.params.totalSheet;
    const diagramArray = route.params.diagramArray;
    const totalPieces = route.params.totalPieces;
    const sheetSize = route.params.sheetSize;

    const title = route.params.title;
    const dimensions = route.params.dimensions;
    const numOfWindows = route.params.numOfWindows;
    // const thickness = route.params.thicknessValue
    const navigation = useNavigation();

    const deviceDimension = Dimensions.get("window");
    const deviceWidth = deviceDimension.width;
    const deviceHeight = deviceDimension.height;

    const alufappContext = useContext(AlufappContext);
    const language = alufappContext.language;
    const alertVisible = alufappContext.alertVisible;
    const loading = alufappContext.loading;
    const unit = alufappContext.unit;

    const [isSaving, setSaving] = useState(false);

    const [exitAlert, setExitAlert] = useState(false);
    const [save, setSave] = useState(false);
    const [unSaveAlert, setUnSavedAlert] = useState(false);

    const sheetWidth = deviceWidth - 20;
    let inSheetWidth = sheetSize.width;
    let inSheetHeight = sheetSize.height;
    let fraction = inSheetHeight / inSheetWidth;
    let sheetHeight = sheetWidth * fraction; 
    const offHeightLimit = 0.01 * sheetSize.height;

    async function SaveHandler() {
        

        let firstRandNum = Math.ceil(Math.random() * 1000);
        let secondRandNum = Math.ceil(Math.random() * 100);
        const id = title + firstRandNum.toString() + '-' + secondRandNum.toString();

        try {
            const nework = {
                id: id,
                title: title,
                totalSheet: totalSheet,
                totalPieces: totalPieces,
                numOfWindows: numOfWindows,
                dimensions: dimensions,
                diagramArray: diagramArray,
                sheetSize: sheetSize,
                unit: unit
            };

            await AsyncStorage.setItem(id, JSON.stringify(nework));
            alufappContext.saveWork(id, title, totalSheet, totalPieces, numOfWindows, dimensions, diagramArray, sheetSize, unit);
            navigation.navigate('SheetCalc');
            alufappContext.showToast();
            alufappContext.setWhichToast('main-toast');
            

        } catch (error) {
            
        }
    }

    function ExitHandler() {
        const results = window.confirm("Exiting to main page without saving!");
        if (results) {
            navigation.navigate('SheetCalc');
        }
    }

    const PanelDimensions = ({panelWidth, panelHeight, status}) => {
        let sheetWidthDecimal = '';
        let sheetHeightDecimal = ''; 
        let signSheetWidth = Math.round(panelWidth * 100) / 100;
        let signSheetHeight = Math.round(panelHeight * 100) / 100;
        
        return (
            <View style={{
                display: panelHeight < offHeightLimit ? 'none' : 'flex',
                width: '100%',
                height: '100%',
                backgroundColor: status == 'off' ? 'rgba(220, 184, 203, 0)' : 'rgba(251, 254, 255, 1)',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={[styles.txtSheetSize,
                    {
                        display: panelHeight < offHeightLimit ? 'none' : 'flex',
                        textAlign: 'center',
                    }
                ]}>
                    {signSheetWidth} <Text style={styles.txtSheetSize2}>{sheetWidthDecimal}</Text> x {signSheetHeight} <Text style={styles.txtSheetSize2}>{sheetHeightDecimal}</Text>
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SavingCalculating isVisible={isSaving} text='Saving...' />
            <View style={styles.header}>
                <Image style={{
                    width: deviceWidth < 500 ? 70 : 100, 
                    height: deviceWidth < 500 ? 70 : 100,
                }}
                source={require("./assets/images/icon.png")}
                />
                <Pressable style={styles.headerInfo}
                 onPress={() => {
                    const response = window.confirm('Navigate to main screen without saving');
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
                    ]}>Drawing</Text>
                    <View style={{width: deviceWidth < 800 ? 0 : 200, height:0,}}></View>
                </View>
            </View>
            <View style={styles.totalContainer}>
                <View style={[styles.totalSheet]}><Text style={styles.totaltxt}>{totalSheet} <Text style={styles.txtSheet}>{totalSheet > 1 ? 'sheets' : 'sheet'}</Text></Text></View>
                <View style={[styles.totalPieces]}><Text style={styles.piecestxt}>{totalPieces} {totalPieces > 1 ? 'pieces' : 'piece'}</Text></View>
            </View>
            <ScrollView style={{paddingHorizontal: 10, height: '65vh'}}>
                {diagramArray.map((sheet, sheetIndex) => (
                    <View style={styles.drawingContainer} key={'sht'+sheetIndex}>
                        <View style={styles.sheetInfo}>
                            <Text style={styles.sheetLabel} key={'shtlbl'+sheetIndex}>sheet {sheetIndex + 1}</Text>
                            <Text style={styles.txtSheetSize} key={'shtsz'+sheetIndex}> ({sheetSize.signWidth} <Text style={styles.txtSheetSize2}>{sheetSize.decWidth}</Text>  x  {sheetSize.signHeight} <Text style={styles.txtSheetSize2}>{sheetSize.decHeight}</Text>)</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[styles.sheet, {
                                width: sheetWidth+2,
                                height: sheetHeight,
                                flexDirection: 'row'
                            }]} key={sheetIndex}>
                                {
                                    sheet.map((DColumns, DColumnId) => (
                                        <View key={'col'+DColumnId} style={{
                                            width: (sheetWidth * (DColumns[0] / sheetSize.width))+2,
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                        }}>
                                            {
                                                DColumns[1].map((DColumn, rowId) => (
                                                    <View key={'row'+rowId} style={{
                                                        width: (sheetWidth * (DColumn[0] / sheetSize.width))+0.1,
                                                        flexDirection: 'row',
                                                        flexWrap: 'wrap',
                                                        backgroundColor: 'rgba(220, 184, 203, 0.3)',
                                                    }}>
                                                        {
                                                            DColumn[1].map((DCRows, DCRowsId) => (
                                                                <View key={'rowcolms'+DCRowsId} style={{
                                                                    width: (sheetWidth * (DCRows[0] / sheetSize.width)),
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    {
                                                                        DCRows[1].map((row, rowId) => (
                                                                            <View key={'row'+rowId} style={{
                                                                                width: (sheetWidth * (row[0] / sheetSize.width)),
                                                                                flexDirection: 'row',
                                                                                flexWrap: 'wrap',
                                                                                
                                                                            }}>
                                                                                {
                                                                                    row[1].map((panel, panelId) => (
                                                                                        <View key={'panel'+panelId} style={{
                                                                                            display: panel[2] === 'off' && panel[1] < offHeightLimit ? 'none' : 'flex',
                                                                                            width: (sheetWidth * (panel[0] / sheetSize.width)),
                                                                                            height: (sheetHeight * (panel[1] / sheetSize.height)),
                                                                                            borderWidth: 1,
                                                                                            justifyContent: 'center',
                                                                                            alignItems: 'center',
                                                                                        }}>
                                                                                            <PanelDimensions panelWidth={panel[0]} panelHeight={panel[1]} status={panel[2]}/>
                                                                                        </View>
                                                                                    ))
                                                                                }
                                                                            </View>
                                                                        ))
                                                                    }
                                                                </View>
                                                            ))
                                                        }
                                                    </View>
                                                ))
                                            }
                                        </View>
                                    ))
                                }
                            </View>
                            <View style={{ height: sheetHeight, borderRightWidth:1}}></View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.tabsContainer}>
                <Pressable 
                 onPress={ExitHandler}
                 style={({pressed}) => [styles.exitTab, styles.tab, pressed && styles.exitPressed]}>
                    <Text style={[styles.exitTxt, styles.tabTxt]}>Exit</Text>
                </Pressable>
                <Pressable
                 onPress={() => {
                    const response = window.confirm('Save work and exit to main page');
                    if (response) {
                        setSaving(true);

                        setTimeout(() => {
                            SaveHandler();
                            setSaving(false);
                        }, 2000);
                    }
                    
                 }}
                 style={({pressed}) => [styles.saveTab, styles.tab, pressed && styles.pressed]}>
                    <Text style={[styles.saveTxt, styles.tabTxt]}>Save</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default DrawingPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    totalContainer:{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(208, 207, 207, 1)',
        marginBottom: 10,
    },
    thickness: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(208, 207, 207, 1)',
    },
    totalSheet: {
        height: '100%',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(208, 207, 207, 1)',
    },
    totalPieces: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(208, 207, 207, 1)',
    },
    txtThickness: {
        fontSize: 15,
        letterSpacing: 2,
        color: '#0E402D',
        fontWeight: '500'
    },
    totaltxt: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'maroon',
        letterSpacing: 3
    },
    txtSheet: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'maroon',
        letterSpacing: 3
    },
    piecestxt: {
        fontSize: 15,
        color: '#0E402D',
        letterSpacing: 2,
        fontWeight: '500'
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    sheetInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sheetLabel: {
        color: '#0D1821',
        fontStyle: 'italic',
    },
    txtSheetSize: {
        color: '#0D1821',
        fontSize: 10,
        fontStyle: 'italic'
    },
    txtSheetSize2: {
        color: '#0D1821',
        fontSize: 8,
        fontStyle: 'italic'
    },
    sheet: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 30,
        borderWidth: 1,
    },
    tabsContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderColor: '#485665',
        
    },
    tab: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    exitTab: {
        borderColor: '#485665',
        borderWidth: 1,
    },
    exitTxt: {
        fontSize: 17,
        color: 'maroon',
    },
    saveTab: {
        backgroundColor: '#9E0031',
        borderColor: '#485665',
        borderTopWidth: 1,
    },
    saveTxt: {
        color: '#fff',
    },
    tabTxt: {
        fontSize: 17,
        letterSpacing: 3,
        fontWeight: '500',
    },
    exitPressed: {
        backgroundColor: 'rgba(72, 86, 101, 0.5)'
    },
    pressed: {
        opacity: 0.8,
    },
    txtDimensions: {
        fontSize: 10,
    }
});