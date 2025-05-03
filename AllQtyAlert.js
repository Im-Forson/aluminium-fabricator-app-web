import { View, Text, StyleSheet, Modal, Pressable, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {useContext, useState} from "react";

import { AlufappContext } from "./alufapp-context";

function AllQtyAlert({acceptHandler, alertVisible})  {
    const deviceDimension = Dimensions.get("window");
    const deviceWidth = deviceDimension.width;

    const alufappContext = useContext(AlufappContext);
    const [qty, setQty] = useState(2);

    let infoStr, declineStr, acceptStr;
    infoStr = 'Set every quantity to';
    declineStr = 'Cancel';
    acceptStr = 'Set';

    function decQtyHandler() {
        if (qty > 1) {
            setQty(qty - 1);
        }
    }
    function incQtyHandler() {
        setQty(qty + 1);
    }
    function setHandler() {
        alufappContext.setAllQty(qty.toString());
        alufappContext.closeAllQtyAlert();
    }

    return (
        <View styles={styles.container}>
            <Modal transparent={true} animationType="slide" visible={alertVisible}>
                <View style={styles.alertModal}>
                    <View style={[styles.alertInfoCon, {width: deviceWidth < 500 ? '90%' : deviceWidth < 800 ? '70%' : '50%'}]}>
                        <View style={styles.alertInfoTitle}>
                            <Ionicons name="alert-circle-outline" size={30} color="maroon" />
                            <Pressable
                             style={styles.cancelIcon}
                             onPress={() => {
                                alufappContext.setAllQty('ind'); // individual entry
                                alufappContext.closeAllQtyAlert();
                                alufappContext.closeLoading()
                             }}
                            >
                                <Ionicons name="close-outline" size={20} color="black" />
                            </Pressable>
                        </View>
                        <View style={styles.alertInfoBody}>
                            <Text style={[styles.txtAlertInfoBody, styles.info1]}>{infoStr}</Text>
                            <View style={styles.qtyCon}>
                                <Text style={styles.txtQty}>{qty.toString()}</Text>
                                <Pressable style={({pressed}) => [
                                        styles.count,
                                        styles.decCount,
                                        pressed && styles.countPressed
                                    ]}
                                    onPress={decQtyHandler}
                                    >
                                        <Ionicons name="chevron-down-outline" size={22} color='' />
                                    </Pressable>
                                    <Pressable style={({pressed}) => [
                                        styles.count,
                                        styles.incCount,
                                        pressed && styles.countPressed
                                    ]}
                                    onPress={incQtyHandler}
                                    >
                                        <Ionicons name="chevron-up-outline" size={22} color='' />
                                    </Pressable>
                                <View style={styles.countIcons}>
                                    
                                </View>
                                
                            </View>
                        </View>
                        <View style={styles.alertInfoTabs}>
                            <Pressable style={({pressed}) => [
                                {display: declineStr !== "" ? 'flex' : 'none'},
                                styles.alertInfoTab, 
                                styles.leftAlertInfoTab, 
                                pressed && styles.alertInfoTabPressed
                            ]}
                             onPress={() => {
                                alufappContext.setAllQty('ind'); // individual entry
                                alufappContext.closeAllQtyAlert();
                             }}>
                                <Text style={styles.txtAlertInfoTab}>{declineStr}</Text>
                            </Pressable>
                            <Pressable style={({pressed}) => [styles.alertInfoTab, pressed && styles.alertInfoTabPressed]}
                             onPress={setHandler}>
                                <Text style={styles.txtAlertInfoTab}>{acceptStr}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default AllQtyAlert;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    alertModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    alertInfoCon: {
        // width: '50%',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'rgba(236, 235, 228, 1)',
        // borderColor: 'maroon'
    },
    alertInfoTitle: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 25,
        // paddingRight: 0,
        // backgroundColor: '#EDF2F4'
    },
    cancelIcon: {
        width: 50,
        height: '100%',
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtAlertInfoTitle: {
        letterSpacing: 3,
        color: 'maroon',
    },
    alertInfoBody: {
        height:150,
        justifyContent: 'center',
        paddingLeft: 25,
        paddingRight: 5,
        marginTop: -10,
        // backgroundColor: '#EDF2F4',
    },
    txtAlertInfoBody: {
        // color: Colors.text100,
        fontSize: 16,
        letterSpacing: 2,
    },
    info1: {
        marginBottom: 10,
        fontWeight: '500'
    },
    info2: {
        lineHeight: 23
    },
    alertInfoTabs: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
        // borderTopWidth: 1,
        // borderColor: 'maroon',
        // backgroundColor: '#EDF2F4',
    },
    alertInfoTab: {
        width: '30%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        borderRadius: 15,
        // borderColor: 'rgba(128, 0, 0, 0.2)',
        // borderColor: '#293F14',
        backgroundColor: 'rgba(130, 0, 0, 0.6)',
    },
    leftAlertInfoTab: {
        // borderRightWidth: 1,
    },
    rightAlertInfoTab: {},
    alertInfoTabPressed: {},
    txtAlertInfoTab: {
        letterSpacing: 2,
        color: '#fff',
    },
    alertInfoTabPressed: {
        backgroundColor: 'rgba(130, 0, 0, 1)',
    },
    qtyCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    txtQty: {
        paddingHorizontal: 45,
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 5,
        fontSize: 18,
        // marginRight: 10,
    },
    count: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    decCount: {
        marginHorizontal: 20,
    },
    incCount: {},
    countPressed: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 5,
    },
});