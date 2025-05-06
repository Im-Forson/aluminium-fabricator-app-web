import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, Image } from "react-native";
import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { AlufappContext } from "./alufapp-context";
import AlufappToast from "./AlufappToast";
import SavingCalculating from "./SavingCalculating";

function MatSavedWorksPage({ route }) {
    const navigation = useNavigation();
    const alufappContext = useContext(AlufappContext);
    const savedWorks = alufappContext.savedWorkList;
    const isToast = alufappContext.isToast;
    const isWhichToast = alufappContext.isWhichToast;

    const deviceDimension = Dimensions.get("window");
    const deviceWidth = deviceDimension.width;

    const [isWorkLoading, setWorkLoading] = useState(false);

    const [isNewWork, setNewWork] = useState(false);
    const [isSavedWork, setSavedWork] = useState();
    const [isOptions, setOptions] = useState(false);

    function ViewWork(work, index) {
        if (work.workType === 'Sliding' || work.workType === 'Sliding-division') {
            navigation.navigate(
                'SavedMaterialList',
                {
                    index: index,
                    id: work.id,
                    dimensions: work.dimensions,
                    workTitle: work.workTitle,
                    materialList: work.materialList,
                    offcutlList: work.offcutlList,
                    workType: work.workType,
                    profileType: work.profileType,
                    profileColor: work.profileColor,
                    glassColor: work.glassColor,
                    frameType: work.frameType,
                    leafType: work.leafType,
                    netType: work.netType,
                    lockType: work.lockType,
                    netHandleType: work.netHandleType,
                    fiberNetType: work.fiberNetType,
                    priceList: work.priceList,
                    totalPieces: work.totalPieces,
                }
            );
        }
        else if (work.workType === 'Casement' || work.workType === 'Projected') {
            navigation.navigate(
                'SavedMaterialList',
                {
                    index: index,
                    id: work.id,
                    dimensions: work.dimensions,
                    workTitle: work.workTitle,
                    materialList: work.materialList,
                    offcutlList: work.offcutlList,
                    workType: work.workType,
                    profileType: work.profileType,
                    profileColor: work.profileColor,
                    glassColor: work.glassColor,
                    lType: work.lType,
                    tType: work.tType,
                    priceList: work.priceList,
                    totalPieces: work.totalPieces,
                }
            );
        }
        else if (work.workType === 'Hinge') {
            navigation.navigate(
                'SavedMaterialList',
                {
                    index: index,
                    id: work.id,
                    dimensions: work.dimensions,
                    workTitle: work.workTitle,
                    materialList: work.materialList,
                    offcutlList: work.offcutlList,
                    workType: work.workType,
                    profileType: work.profileType,
                    profileColor: work.profileColor,
                    glassColor: work.glassColor,
                    lType: work.lType,
                    tType: work.tType,
                    divisionType: work.divisionType,
                    priceList: work.priceList,
                    totalPieces: work.totalPieces,
                }
            );
        }
        else if (work.workType === 'Swing') {
            navigation.navigate(
                'SavedMaterialList',
                {
                    index: index,
                    id: work.id,
                    dimensions: work.dimensions,
                    workTitle: work.workTitle,
                    materialList: work.materialList,
                    offcutlList: work.offcutlList,
                    workType: work.workType,
                    profileType: work.profileType,
                    profileColor: work.profileColor,
                    glassColor: work.glassColor,
                    divisionType: work.divisionType,
                    priceList: work.priceList,
                    totalPieces: work.totalPieces,
                }
            );
        }
        else if (work.workType === 'Fixed') {
            navigation.navigate(
                'SavedMaterialList',
                {
                    index: index,
                    id: work.id,
                    dimensions: work.dimensions,
                    workTitle: work.workTitle,
                    materialList: work.materialList,
                    offcutlList: work.offcutlList,
                    workType: work.workType,
                    profileType: work.profileType,
                    profileColor: work.profileColor,
                    glassColor: work.glassColor,
                    lType: work.lType,
                    tType: work.tType,
                    priceList: work.priceList,
                    totalPieces: work.totalPieces,
                }
            );
        }
    }

    return (
        <View style={styles.container}>
            <SavingCalculating isVisible={isWorkLoading} text='Loading'/>
            <AlufappToast toastVisible={isToast && isWhichToast === 'mat-deletion-toast'} info='Work removed'/>
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
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Materials</Text>
                    <Text style={[styles.txtHeaderInfo2, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Worker</Text>
                </Pressable>
                <View style={styles.infoSW}>
                    <Text style={[
                        styles.txtSheetWorker,
                        {fontSize: deviceWidth <= 500 ? 15 : 18}
                    ]}>Works</Text>
                    <View style={{width: deviceWidth < 800 ? 0 : 100, height:0,}}></View>
                </View>
            </View>
            {
                savedWorks.length > 0 ? 
                <ScrollView style={styles.worksView}>
                {
                    savedWorks.map((work, index) => (
                        <Pressable style={({pressed})=>[styles.workCon, pressed && {backgroundColor: 'rgba(0,0,70,0.2)'}]} key={index}
                        onPress={() => {
                            setWorkLoading(true);

                            setTimeout(() => {
                                ViewWork(work);
                                setWorkLoading(false);
                            }, 2500);
                            
                        }}>
                            <Text style={styles.txtDate}>{work.date}</Text>
                            <Text style={styles.txtWorkTitle}>{work.workTitle}</Text>
                        </Pressable>
                    ))
                }
                </ScrollView>
                : 
                <View style={styles.empty}>
                    <Text style={styles.txtEmptyWork}>Empty Work List</Text>
                </View>
            }
        </View>
    );
}

export default MatSavedWorksPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    txtSheetWorker: {
        color: '#fff',
        fontSize: 20,
        letterSpacing: 3,
        fontFamily: 'Underdog',
        textAlign: 'center',
    },
    worksView: {
        flex: 1,
    },
    workCon: {
        paddingHorizontal: 5,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    },
    txtDate: {
        letterSpacing: 3,
        fontSize: 12,
        marginBottom: 12,
    },
    txtWorkTitle: {
        letterSpacing: 3,
        fontSize: 16,
        color: 'rgb(120, 70, 50)',
        fontWeight: '500',
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtEmptyWork: {
        letterSpacing: 3,
        color: 'maroon',
    },
});