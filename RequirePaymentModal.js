import { View, Text, StyleSheet, Modal, Pressable, ActivityIndicator, } from "react-native";
import { useContext, useEffect, useState, } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AlufappContext } from "./alufapp-context";

function RequirePaymentModal({info1, info2, info3, page})  {
    const navigation = useNavigation();
    const alufappContext = useContext(AlufappContext);
    const visible = alufappContext.offlineModalVisible;
    const loading = alufappContext.loading;
    const language = alufappContext.language;

    const [usageAmount, setUsageAmount] = useState(2);
    const [billingEmail, setBillingEmail] = useState('midevapps.info@gmail.com');
    const [defaultEmail, setDefaultEmail] = useState('midevapps.info@gmail.com');
    
    // Paystack setup
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
        
    }, []);

    useEffect(() => {
        if (page == 'mat-dimension') {
            setUsageAmount(3);
        }
    }, []);

    const setSheetCalcUsage = async () => {
        let usage = await AsyncStorage.getItem('@gwusage');
        usage = parseInt(usage);
        usage += 1;
        alufappContext.setSheetCalcUsage(usage);
        usage = usage.toString();
        await AsyncStorage.setItem('@gwusage', usage);
        alufappContext.setSheetCalcUnlimited();
    } 

    const setMatCalcUsage = async () => {
        let usage = await AsyncStorage.getItem('@mwusage');
        usage = parseInt(usage);
        usage += 1;
        alufappContext.setMatCalUsage(usage);
        usage = usage.toString();
        await AsyncStorage.setItem('@mwusage', usage);
        alufappContext.setMaterialCalcUnlimited();
    } 

    function btnHandler() {
        try {
            if (!window.PaystackPop) {
                window.alert('script not loaded');
    
                return;
            }
    
            const handler = window.PaystackPop.setup({
                key: "pk_live_799cee750ccc13e4fd2fe4daf8a91bae46a93092",
                email: billingEmail,
                amount: usageAmount * 100,
                currency: 'GHS',
                callback: (response) => {
                    const isMessage = response.message === "Approved";
                    const isStatus = response.status === "success";

                    if (page == 'sheet-calc-home') {
                        setSheetCalcUsage();
                        alufappContext.setOfflineModalVisible(false);
                        alufappContext.setWhichToast('main-pay-success');
                        alufappContext.showToast();
                    }
                    else if (page == 'sheet-calc-dimension') {
                        setSheetCalcUsage();
                        alufappContext.setOfflineModalVisible(false);
                        alufappContext.setWhichToast('sheet-dimensions-pay-success');
                        alufappContext.showToast();
                    }
                    else if (page == 'mat-dimension') {
                        setMatCalcUsage();
                        alufappContext.setOfflineModalVisible(false);
                        alufappContext.setWhichToast('mat-pay-success');
                        alufappContext.showToast();
                    }
                        
                    // if (isMessage && isStatus) {
                    //     setPaidUsage();
                    //     alufappContext.setOfflineModalVisible(false);
                    //     alufappContext.setWhichToast('main-pay-success');
                    //     alufappContext.showToast();
                    // }
                    // else {
                    //     alufappContext.setOfflineModalVisible(false);
                    //     alufappContext.setWhichToast('main-pay-fail');
                    //     alufappContext.showToast();
                    // }
                    
                },
                onClose: () => {
                    if (page == 'sheet-calc-home') {
                        alufappContext.setOfflineModalVisible(false);
                        alufappContext.setWhichToast('main-pay-cancel');
                        alufappContext.showToast();
                    }
                    else if (page == 'sheet-calc-dimension') {
                        alufappContext.setOfflineModalVisible(false);
                        alufappContext.setWhichToast('sheet-calc-dimension-pay-cancel');
                        alufappContext.showToast();
                    }
                    else if (page == 'mat-dimension') {
                        alufappContext.setOfflineModalVisible(false);
                        alufappContext.setWhichToast('mat-dimension-pay-cancel');
                        alufappContext.showToast();
                    }
                    
                },
            });
            
            handler.openIframe();
        } catch (error) {
            alufappContext.setOfflineModalVisible(false);
            window.alert('Loading failed. Please ensure you have internet and try again.')
        }
        
        
    }

    return (
        <View styles={[
            styles.container,
        ]}>
            <Modal
             transparent={true}
             animationType="slide" 
             visible={visible}
            //  onRequestClose={() => {glassSheetCtx.setOfflineModalVisible(false)}}
             >
                <View style={styles.alertModal}>
                    <View style={{
                        display: loading ? 'flex' : 'none'
                    }}>
                        {/* {loading ? (<ActivityIndicator size={50} color="#ECE2D0"/>) : ('')} */}
                    </View>
                    <View style={{
                            // display: loading ? 'none' : 'flex',
                            width: '100%',
                            alignItems: 'flex-end',
                            marginBottom: 60,
                            paddingHorizontal: 50,
                            // backgroundColor: 'yellow'
                        }}>
                            <Pressable style={({pressed}) => [
                                pressed && styles.cancelPressed,
                                {
                                // backgroundColor: 'yellow',
                                padding: 5,
                                borderRadius: 5,
                             }]}
                             onPress={() => {
                                alufappContext.setOfflineModalVisible(false);
                                // glassSheetCtx.setIsInternet(false);
                                // glassSheetCtx.closeLoading();
                             }}
                             >
                                <Ionicons name="close" size={25} color='rgba(200, 200, 200, 1)' />
                            </Pressable>
                        </View>
                    <View style={{
                        alignItems: 'center',
                        display: loading ? 'none' : 'flex'
                    }}>
                        
                        <View>
                            <Text style={{
                                color: 'rgba(240, 200, 180, 1)',
                                fontSize: 22,
                                fontWeight: '500',
                                marginBottom: 20,
                                textAlign: 'center',
                            }}>{info1}</Text>
                        </View>
                        <View style={{
                            paddingHorizontal: 10
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                                fontWeight: '500',
                                marginBottom: 80,
                                textAlign: 'center',
                                lineHeight: 30,
                            }}>{info2}</Text>
                        </View>
                        <Pressable
                         onPress={btnHandler}
                        style={({pressed}) => [
                           styles.btn,
                           pressed && styles.pressed,
                        ]}>
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                            }}>{info3}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default RequirePaymentModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'red'
    },
    alertModal: {
        // flex: 1,
        height: '100%',        
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    btn: {
        backgroundColor: '#255C99',
        paddingHorizontal: 65,
        paddingVertical: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
    },
    pressed: {
        backgroundColor: 'blue'
    },



    alertInfoCon: {
        width: '90%',
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
        lineHeight: 20
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
    cancelPressed: {
        backgroundColor: 'rgba(150, 150, 150, 1)'
    },
});