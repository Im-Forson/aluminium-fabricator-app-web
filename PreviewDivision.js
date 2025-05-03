import { View, Text, Pressable, StyleSheet, Modal, Dimensions } from 'react-native';

export default function PreviewDivision({ isVisible, workType, onPress, donePress, frameWidth, frameHeight, widthDivision, heightDivision, widthArr, heightArr }) { 
    const deviceScreen = Dimensions.get('screen');
    const deviceWidth = deviceScreen.width;
    const deviceHeight = deviceScreen.height;
    const totalLength = frameWidth + frameHeight;

    let divisor = deviceWidth;
    if (deviceWidth > deviceHeight) {
        divisor = deviceHeight/2;
    }

    let windowWidth = (frameWidth / totalLength) * divisor;
    let windowHeight = (frameHeight / totalLength) * divisor;
    let widthPercent = 100 / widthDivision;
    let heightPercent = 100 / heightDivision;
    widthPercent = widthPercent.toString() + '%';
    heightPercent = heightPercent.toString() + '%';

    // console.log('screen width: ', deviceWidth);
    // console.log('screen height: ', deviceHeight);
    // console.log('window Width: ', windowWidth);
    // console.log('window height: ', windowHeight);

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
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }}>
                <View style={styles.label}>
                    <Text style={styles.txtLabel}>
                        Single Panel Preview
                    </Text>
                </View>
                <View style={styles.preview}>
                    <View style={[
                        {
                            width: windowWidth,
                            height: windowHeight,
                            flexDirection: 'row',
                            borderWidth: 7,
                        }
                    ]}>
                        
                    </View>
                    <View style={[
                        styles.widthWindow,
                        {
                            width: windowWidth,
                            height: windowHeight,
                            flexDirection: 'row',
                            position: 'absolute'
                        }
                    ]}>
                         {widthArr.map((item, index) => (
                            <View style={{
                                width: widthPercent,
                                height: '100%',
                                borderRightWidth: 2,
                                borderLeftWidth: 2,
                            }} key={'widthDiv'+index}></View>
                        ))}
                    </View>
                    <View style={[
                        styles.heightWindow,
                        {
                            width: windowWidth,
                            height: windowHeight,
                            position: 'absolute'
                        }
                    ]}>
                        {heightArr.map((item, index) => (
                            <View style={{
                                width: '100%',
                                height: heightPercent,
                                borderTopWidth: 2,
                                borderBottomWidth: 2
                            }} key={'heightDiv'+index}></View>
                        ))}
                    </View>
                </View>
                <View style={styles.closeConPreview}>
                    <Pressable style={({pressed}) => [styles.btnClosePreview,
                        pressed && styles.btnClosePressedPreview
                     ]} onPress={onPress}>
                        <Text style={styles.txtClosePreview}>Close</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [styles.btnDonePreview,
                        {display: workType === 'Sliding (Division)' ? 'none' : 'flex'},
                        pressed && styles.btnDonePressedPreview
                     ]} onPress={donePress}>
                        <Text style={styles.txtDonePreview}>Done</Text>
                    </Pressable>
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
    preview: {
        width: '100%',
        // height: 400,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
        backgroundColor: 'white',
    },
    
    widthDiv: {
    
    },
    widthWindow: {
        
    },
    heightWindow: {
        
    },
    label: {
        alignItems: 'center',
        marginBottom: 15,
    },
    txtLabel: {
        width: 'auto',
        color: '#fff',
        fontSize: 18,
        letterSpacing: 3,
    },
    closeCon: {
        justifyContent: 'center',
        marginTop: 50,
    },
    btnClose: {
        paddingHorizontal: 25,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: 'rgba(200, 200, 200, 0.9)',
    },
    txtClose: {
        color: 'maroon',
        fontSize: 16,
        letterSpacing: 3,
        fontWeight: '500',
    },
    btnClosePressed: {
        backgroundColor: 'rgba(250, 250, 250, 0.2)',
    },
    closeConPreview: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 50,
    },
    btnClosePreview: {
        paddingHorizontal: 25,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: 'rgba(200, 200, 200, 0.9)',
    },
    btnClosePressedPreview: {
        backgroundColor: 'rgba(250, 250, 250, 0.2)',
    },
    btnDonePressedPreview: {
        backgroundColor: 'rgba(30, 90, 200, 0.2)',
    },
    txtClosePreview: {
        color: 'maroon',
        fontSize: 16,
        letterSpacing: 3,
        fontWeight: '500',
    },
    txtDonePreview: {
        color: '#fff',
        fontSize: 16,
        letterSpacing: 3,
        fontWeight: '500',
    },
    btnDonePreview: {
        paddingHorizontal: 25,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: 'rgba(30, 90, 200, 1)',
    },
    // container: {},
});