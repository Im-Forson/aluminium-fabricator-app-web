import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AlufappContext } from "./alufapp-context";
import AlufappToast from "./AlufappToast"
import SavingCalculating from "./SavingCalculating";

function SavedWorkPage() {
    const alufappContext = useContext(AlufappContext);
    const navigation = useNavigation();
    const works = alufappContext.works;
    const viewWork = alufappContext.viewWork;
    const workIndex = alufappContext.workIndex;
    const isToast = alufappContext.isToast;
    const isWhichToast = alufappContext.isWhichToast;
    let worksLength = works.length;

    const deviceDimension = Dimensions.get("window");
    const deviceWidth = deviceDimension.width;

    const [isWorkLoading, setWorkLoading] = useState(false);

    const [workTitle, setWorkTitle] = useState(null);
    const [selectedWork, setSelectedWork] = useState(null);
    const [removeWorkAlert, setRemoveWorkAlert] = useState(false);

    function viewWorkHandler(inwork) {
        navigation.navigate(
            'Home Drawing',
            {
                dimensions: inwork.dimensions,
                totalSheet: inwork.totalSheet,
                diagramArray: inwork.diagramArray,
                totalPieces: inwork.totalPieces,
                title: inwork.title, 
                numOfWindows: inwork.numOfWindows,
                sheetSize: inwork.sheetSize,
                thickness: inwork.thickness,
                unit: inwork.unit,
            }
        );
    }

    const removeWork = async (workId) => {
        try {
            const removedItem = await AsyncStorage.removeItem(workId);
            ToastAndroid.show("Work removed successfully", 3000);
        } catch (e) {
            ToastAndroid.show("Failed to remove work", 3000);
        }
    }

    function viewWorkHandler(inwork) {
        navigation.navigate(
            'SavedDrawing',
            {
                dimensions: inwork.dimensions,
                totalSheet: inwork.totalSheet,
                diagramArray: inwork.diagramArray,
                totalPieces: inwork.totalPieces,
                title: inwork.title, 
                numOfWindows: inwork.numOfWindows,
                sheetSize: inwork.sheetSize,
                thickness: inwork.thickness,
                unit: inwork.unit,
            }
        );
    }

    async function removeWorkHandler(inwork) {
        try {
            const response = window.confirm(`'${inwork.title}' will be removed permanently!`);

            if (response) {
                const removedItem = await AsyncStorage.removeItem(inwork.id);
                alufappContext.removeWork(inwork.id, inwork.title)
                alufappContext.showToast();
                alufappContext.setWhichToast('works-toast')
            }
        } catch (error) {
            alufappContext.showToast();
            alufappContext.setWhichToast('works-failure')
        }

        
        // setSelectedWork(inwork);
        // setWorkTitle(inwork.title);
        // setRemoveWorkAlert(true);
        // alufappContext.showAlert();
        alufappContext.setWorkIndex(null);

    }

    const workDetails = (work, type) => {
        let sheetStr = 'sheet', piecesStr = 'piece', windowStr = 'window';
        if (work.totalSheet > 1) {
            sheetStr = 'sheets'
        }
        if (work.totalPieces > 1) {
            piecesStr = 'pieces';
        }
        if (work.numOfWindows > 1) {
            windowStr = 'windows';
        }

        if (type === 'sheet') {
            return `${work.totalSheet} ${sheetStr}`
        }
        else if (type === 'pieces') {
            return `${work.totalPieces} ${piecesStr}`
        }
        else if (type === 'numOfWindows') {
            return `${work.numOfWindows} ${windowStr}`
        }
    }

    let WorkView = <ScrollView style={styles.list}>
        {
            works.map((work, index) => (
                <View style={styles.work} 
                //  key={'work'+index}
                //  onPress={() => {
                    
                //     glassSheetCtx.showLoading();
                //     alufappContext.setViewWork(work);
                //     alufappContext.setWorkIndex(index);

                //      }}
                 >
                    
                    <View style={[styles.workTitle]} key={'btnwork'+index}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.txtWorkTitle} key={'txtwork'+index}>{work.title}</Text>
                            <Text style={styles.txtWorkLength} key={'txtworklength'+index}>{worksLength--}</Text>
                        </View>
                        
                        <Text style={styles.txtWorkDetail}>{workDetails(work, 'sheet')}</Text>
                        <Text style={styles.txtWorkDetail}>{workDetails(work, 'numOfWindows')}</Text>
                        <Text style={styles.txtWorkDetail}>{workDetails(work, 'pieces')}</Text>
                    </View>
                    
                    <View style={styles.viewRemoveCon}>
                        <Pressable style={({pressed}) => [
                            styles.btnRemoveWork,
                            {borderRightWidth: 1},
                            pressed && styles.workPressed,
                            ]}
                            onPress={() => {
                                setWorkLoading(true);

                                setTimeout(() => {
                                    viewWorkHandler(work);
                                    setWorkLoading(false);
                                }, 2500);
                            }}
                            key={'removework'+index}
                            >
                            <Ionicons name="expand-outline" size={15} color='rgb(252, 246, 185)' key={'trashicon'+index}/>
                            <Text style={{letterSpacing:3, marginLeft: 10, color: 'rgb(252, 246, 185)'}}>View</Text>
                        </Pressable>
                        <Pressable style={({pressed}) => [
                            styles.btnRemoveWork,
                            pressed && styles.workPressed,
                            ]}
                            onPress={() => {removeWorkHandler(work)}}
                            key={'removework'+index}
                            >
                            <Ionicons name="trash-bin-outline" size={15} color="rgb(252, 246, 185)" key={'trashicon'+index}/>
                            <Text style={{letterSpacing:3, marginLeft: 10, color: 'rgb(252, 246, 185)',}}>Remove</Text>
                        </Pressable>
                    </View>
                    
                </View>
            ))
        }
    </ScrollView>;

    const EmptyWork = <View style={styles.emptyWorkList}><Text style={styles.txtEmptyWork}>No work available</Text></View>

    if (works.length == 0) {
        WorkView = EmptyWork;
    }

    if (works.length == 0) {
        display = <View style={styles.txtEmptyCon}>
            <Text style={styles.txtEmptyWOrk}>Empty work</Text>
            <Text style={styles.txtAddWork}>Go back to add new work</Text>
        </View>
    }

    return (
        <View style={styles.container}>
            <SavingCalculating isVisible={isWorkLoading} text='Loading...' />
            <AlufappToast toastVisible={isToast && isWhichToast === 'works-toast'} info="Work removed"/>
            <AlufappToast toastVisible={isToast && isWhichToast === 'works-failure'} info="Remove unsuccessful"/>
            <View style={styles.header}>
                {/* <Image style={{
                    width: deviceWidth < 500 ? 70 : 100, 
                    height: deviceWidth < 500 ? 70 : 100,
                }}
                source={require("./assets/images/icon.png")}
                /> */}
                <Pressable style={styles.headerInfo}
                 onPress={() => {
                    const response = window.confirm('Navigate to main screen');
                    if (response) {
                        navigation.navigate('Main');
                    }
                 }}
                >
                    {/* <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Aluminium</Text> */}
                    {/* <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Fabrication</Text> */}
                    {/* <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Apps</Text> */}
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Sheet</Text>
                    <Text style={[styles.txtHeaderInfo2, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Worker</Text>
                </Pressable>
                <View style={styles.infoSW}>
                    <Text style={[
                        styles.txtSheetWorker,
                        {fontSize: deviceWidth <= 500 ? 15 : 18}
                    ]}>Saved Works</Text>
                    <View style={{width: deviceWidth < 800 ? 0 : 200, height:0,}}></View>
                </View>
            </View>
            {WorkView}
        </View>
    );
}

export default SavedWorkPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#383961',
        marginBottom: 8,
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
        justifyContent: 'center',
    },
    txtSheetWorker: {
        color: '#fff',
        fontSize: 20,
        letterSpacing: 3,
        fontFamily: 'Underdog',
        textAlign: 'center',
    },

    workCon: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    txtEmptyCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtEmptyWOrk: {
        color: '#292F36',
        fontSize: 22,
        marginBottom: 3,
    },
    txtAddWork: {
        color: '#292F36',
    },
    tabsContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tab: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        // backgroundColor: Colors.header200
    },
    exitTxt: {
        color: '#fff',
        fontSize: 18,
        letterSpacing: 3
    },
    pressed: {
        opacity: 0.8,
    },

    list: {
        height: '70vh',
        paddingHorizontal: 3,
    },
    work: {
        width: '100%',
        // height: 140,
        // flexDirection: 'row',
        // alignItems: 'center',
        // marginTop: 8,
        marginBottom: 8,
        // borderWidth: 2,
        borderRadius: 4,
        // borderColor: 'rgba(0, 0, 0, 0.3)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    workTitle: {
        paddingHorizontal: 10,
        // width: '85%',
        // height: '100%',
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // borderColor: Colors.bcg100,
    },
    txtWorkLength: {
        // width: 25,
        // height: 25,
        textAlign: 'center',
        letterSpacing: 3,
        fontSize: 15,
        fontWeight: '500',
        color: 'rgba(252, 123, 123, 0.44)',
        marginBottom: 20,
        marginTop: 5,
        // borderWidth: 1,
        // paddingH: 10,
        // paddingVertical: 5,
        borderRadius: 10,
        // borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    txtWorkTitle: {
        letterSpacing: 3,
        fontSize: 15,
        fontWeight: '500',
        color: 'rgb(255, 231, 12)',
        marginBottom: 20,
        marginTop: 5,
    },
    txtWorkDetail: {
        letterSpacing: 3,
        fontStyle: 'italic', 
        fontSize: 14,
        color: 'rgb(255, 255, 255)',
        marginBottom: 10,
    },
    viewWork: {
        width: '12%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnRemoveWork: {
        width: '50%',
        // height: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: 10,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        // paddingHorizontal: 10,
        // paddingVertical: 5,
        // borderRadius: 5,
        // backgroundColor: 'brown',
    },
    workPressed: {
        backgroundColor: 'rgba(0, 0, 0, 1)'
    },
    emptyWorkList: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtEmptyWork: {
        letterSpacing: 3,
        fontSize: 17,
        fontWeight: '400',
        // color: Colors.text100
    },
    viewRemoveCon: {
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-around',
        borderTopWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        
    }
});