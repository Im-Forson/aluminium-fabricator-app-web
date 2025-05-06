import { View, Text, StyleSheet, Modal, Pressable, Dimensions } from "react-native";
import {useContext, useState, useEffect} from "react";

import { AlufappContext } from "./alufapp-context";

function AlufappToast({ toastVisible, info, info2 })  {
    const deviceDimension = Dimensions.get("window");
    const deviceWidth = deviceDimension.width;
    const alufappContext = useContext(AlufappContext);
    const isToast = alufappContext.isToast;

    let infoStr, declineStr, acceptStr;
    infoStr = 'Set every quantity to';
    declineStr = 'Cancel';
    acceptStr = 'Set';

    useEffect(() => {
        if(isToast) {
            setTimeout(() => {
                alufappContext.closeToast();
            }, 2000);
        }
    }, [isToast]);
    
    return (
        <View styles={styles.container}>
            <Modal transparent={true} animationType="slide" visible={toastVisible}>
                <View style={styles.alertModal}>
                    <View style={[styles.alertInfoCon, ]}>
                        <Text style={styles.txtInfo}>{info}</Text>                            
                        <Text style={styles.txtInfo}>{info2}</Text>                            
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default AlufappToast;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    alertModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        // justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    alertInfoCon: {
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'rgb(136, 134, 28)',
        marginBottom: 10,
        borderColor: 'maroon',
    },
    alertInfoTitle: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingLeft: 25,
        // paddingRight: 0,
        // backgroundColor: '#EDF2F4'
    },
    
    txtInfo: {
        letterSpacing: 4,
        fontSize: 14,
        color: '#fff',
        fontWeight: '500'
    },
    alertInfoBody: {
        height:150,
        justifyContent: 'center',
        paddingLeft: 25,
        paddingRight: 5,
        marginTop: -10,
        // backgroundColor: '#EDF2F4',
    },
});