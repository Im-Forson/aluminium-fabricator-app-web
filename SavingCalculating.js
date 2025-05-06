import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { useContext } from 'react';

import { AlufappContext } from './alufapp-context'; 

export default function SavingCalculating({ isVisible, text }) { 
    const alufappContext = useContext(AlufappContext);

    return (
        <View style={[
            {display: isVisible ? 'flex' : 'none',},
            styles.container
        ]}>
            <Modal
              transparent
              visible={isVisible}              
            >
            <View style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.6)'
            }}>
                <ActivityIndicator size={35} color='#fff' />
                <View style={{marginTop: 10}}>
                    <Text style={{
                        color: '#fff',
                        letterSpacing: 3,
                        fontSize: 16,
                        fontStyle: 'italic',
                    }}>{text}</Text>
                    <Text style={{
                        color: '#ff5',
                        letterSpacing: 3,
                        fontSize: 13,
                        fontStyle: 'italic',
                        marginTop: 10,
                    }}>just a moment</Text>
                </View>
            </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        
    },
    infoCon: {
        width: '90%',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: 'grey',
    },
    title: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        // marginBottom: 5,
        // backgroundColor: 'yellow'
        // borderColor: 'grey'
    },
    txtTitle: {
        fontSize: 17,
        fontWeight: '500',
        letterSpacing: 3,
        marginLeft: 5,
        // color: 'rgba(150, 0, 0, 1)'
    },
    info: {
        height: 80,
        paddingLeft: 20,
        paddingRight: 5,
        justifyContent: 'center',
        marginVertical: 10,
        // backgroundColor: 'yellow'
    },
    txtInfo: {
        fontSize: 16,
        letterSpacing: 2,
        lineHeight: 23,
    },
    btns: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'yellow'
    },
    btn: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow' 
    },
    txtBtn: {
        fontSize: 16,
        letterSpacing: 3,
        color: 'navy',
    },
    txtDecBtn: {},
    txtAccBtn: {},
    txtBtnPressed: {
        color: 'rgb(200, 100, 150)',
        fontWeight: 'bold',
    },
    // container: {},
    // container: {},
});