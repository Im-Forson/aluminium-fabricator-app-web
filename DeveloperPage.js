import { View, Text, TextInput, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AlufappContext } from './alufapp-context';

function DeveloperPage({ route }) {
    const sourcePage = route.params.page;
    const [sheetCalcUsage, setSheetCalcUsage] = useState('');
    const [matCalcUsage, setMatCalcUsage] = useState('');
    const [devCred, setDevCred] = useState('');
    const [devin, setDevin] = useState();
    const navigation = useNavigation();
    const regEx = /[1-9][0-9]*/;
    const alufappContext = useContext(AlufappContext);

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
            
        }
    }

    useEffect(() => {
        fetchDevin();
        // try {
        //     const credRef = ref(database, 'dev-info');
        //     onValue(credRef, (snapshot) => {
        //     setDevInfo(snapshot.val());
        // });
        // } catch (error) {
        //     window.alert('DevInfo error!. Check internet.')
        // }
    }, []);

    async function handler() {
        let existingSheetCalcUsage = alufappContext.sheetCalcUsage;
        let existingMatCalcUsage = alufappContext.matCalcusage;

        if (devCred === devin.cred_ps) {
            if (regEx.test(sheetCalcUsage)) {
                let newUsage = existingSheetCalcUsage + parseInt(sheetCalcUsage)
                alufappContext.setSheetCalcUsage(newUsage);
                await AsyncStorage.setItem('@gwusage', newUsage.toString());
                alufappContext.showToast();
                alufappContext.setWhichToast('dev-sheet-usage-toast');
            }
    
            if (regEx.test(matCalcUsage)) {
                let newUsage = existingMatCalcUsage + parseInt(matCalcUsage);
                alufappContext.setMatCalUsage(newUsage);
                await AsyncStorage.setItem('@mwusage', newUsage.toString());
                alufappContext.showToast();
                alufappContext.setWhichToast('dev-mat-usage-toast');
            }

            if (sourcePage == 'mat-list') {
                navigation.navigate('MaterialCalc');
            }
            else {
                navigation.navigate('SheetCalc');
            }
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ alignItems: 'center'}} style={{height: 1}}>
                {/* <Text style={styles.txtDeveloper}>Developer</Text> */}
                <Image style={{width: 100, height: 100, marginTop: 50, marginBottom: 10, borderRadius: 50}} 
                source={require('./assets/images/dev.jpeg')}
                />
                <Text style={styles.txtDeveloperInfo}>IM Forson</Text>
                <Text style={styles.txtDeveloperInfo}>Frontend Developer</Text>
                <Text style={styles.txtDeveloperInfo}>Midev Infotech</Text>
                <Text style={[styles.txtDeveloperInfo, {marginBottom: 100}]}>Ghana</Text>
                <TextInput style={styles.input}
                secureTextEntry={true}
                placeholder='cred'
                placeholderTextColor={'grey'}
                value={devCred}
                onChangeText={setDevCred}
                />
                <TextInput style={styles.input}
                keyboardType='number-pad'
                placeholder='sw-usage'
                placeholderTextColor={'grey'}
                value={sheetCalcUsage}
                onChangeText={setSheetCalcUsage}
                />
                <TextInput style={styles.input}
                keyboardType='number-pad'
                placeholder='mw-usage'
                placeholderTextColor={'grey'}
                value={matCalcUsage}
                onChangeText={setMatCalcUsage}
                />
                <Pressable style={({pressed}) => [
                    styles.button,
                    pressed && {opacity: 0.5}
                ]}
                onPress={handler}
                >
                    <Text style={styles.buttonTxt}>Add</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

export default DeveloperPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'black',
    },
    txtDeveloper: {
        fontSize: 18,
        letterSpacing: 3,
        color: 'maroon',
        marginTop: 30,
        marginBottom: 20,
    },
    txtDeveloperInfo: {
        fontSize: 11,
        fontFamily: 'Underdog',
        letterSpacing: 3,
        color: '#fff',
        marginBottom: 5,
    },
    input: {
        width: '50%',
        height: 50,
        borderWidth: 4,
        borderRadius: 10,
        borderColor: 'grey',
        marginBottom: 30,
        color: '#fff',
        paddingHorizontal: 5,
    },
    button: {
        width: '50%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#ff5',
    },
    buttonTxt: {
        letterSpacing: 3,
    }
});