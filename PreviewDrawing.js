import { View, Text, Pressable, StyleSheet, Modal, Dimensions, ToastAndroid } from 'react-native';
import { useState, useContext, } from 'react';

import { AlufappContext } from './alufapp-context'; 
import AlufappToast from './AlufappToast';

export default function PreviewDrawing({ isVisible, onPress, type, direction, msWidth, msHeight, divisions, divisionsIn, doneoPress, isFinal }) { 
    const alufappContext = useContext(AlufappContext);
    const isToast = alufappContext.isToast;
    const isWhichToast = alufappContext.isWhichToast;

    const deviceScreen = Dimensions.get('screen');
    const deviceWidth = deviceScreen.width;
    const deviceHeight = deviceScreen.height;
    const totalLength = parseFloat(msWidth) + parseFloat(msHeight);

    let outerWidth = parseFloat(msWidth) / totalLength;
    let outerHeight = parseFloat(msHeight) / totalLength;

    const [isOpeningError, setOpeningError] = useState(false);

    let divisor = deviceWidth;
    if (deviceWidth > deviceHeight) {
        divisor = deviceHeight/2;
    }

    outerWidth = outerWidth * divisor;
    outerHeight = outerHeight * divisor;

    const openDimensions = [];
    const [] = useState();

    const OpenFixed = ({width, height, id}) => {
        const [isOpen, setOpen] = useState(false);
        

        return (
            <Pressable style={({pressed}) => [{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
             },
             pressed && {backgroundColor: isFinal ? 'rgba(50,50,200,0.2)' : 'transparent'}
             ]}
             onPress={() => {
                if (!isFinal) {return;}
                if (type === 'Fixed') {return;}

                if(isOpen) {
                    let index;
                    for (let i = 0; i < openDimensions.length; i++) {
                        if (openDimensions[i].width === width && openDimensions[i].height === height) {
                            index = i;
                        }
                    }

                    openDimensions.splice(index, 1);
                    setOpen(false);
                }
                else {
                    openDimensions.push({width: width, height: height})
                    setOpen(true);
                }
             }}
             >
                {isFinal ? <Text style={styles.txtOpenFixed}>{isOpen ? 'open' : 'fixed'}</Text> : ''}
            </Pressable>
        )
    }

    return (
        <View style={[
            {display: isVisible ? 'flex' : 'none',},
            styles.containerPreview
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
                <View style={styles.labelPreview}>
                    <Text style={styles.txtLabelPreview}>
                        Single Panel Preview
                    </Text>
                </View>
                <View style={[
                    styles.preview,
                    {
                        height: divisor, // devisor is deviceWidth or deviceHeight/2
                    }
                ]}>
                    <View style={[
                        styles.outer,
                        {
                            width: outerWidth,
                            height: outerHeight,
                            flexDirection: direction === 'outer-width' ?  'row' : 'column',
                            // flexWrap: 'wrap',
                            borderWidth: 7,
                            borderBottomWidth: 7,
                            backgroundColor: 'black'
                        }
                    ]}>
                        {divisions.length > 0 ? divisions.map((div, divIndex) => {
                            let widthPercent = (div.width / parseFloat(msWidth)) * 100;
                            let heightPercent = div.height / parseFloat(msHeight) * 100;
                            widthPercent = widthPercent.toString() + '%';
                            heightPercent = heightPercent.toString() + '%';
                            

                            return (
                                <View key={'div'+divIndex} style={{
                                    width: widthPercent,
                                    height: heightPercent,
                                    flexDirection: direction === 'outer-width' ?  'column' : 'row',
                                    // flexWrap: 'wrap',
                                    borderWidth: 3,
                                    backgroundColor: 'white'
                                   }}>
                                    {divisionsIn.length > 0 ? (divisionsIn[divIndex].length > 0 ? 
                                     divisionsIn[divIndex].map((indiv, index) => {
                                        let widthPercent = (indiv.width / parseFloat(msWidth)) * 100;
                                        let heightPercent = indiv.height / parseFloat(msHeight) * 100;
                                        widthPercent = widthPercent.toString() + '%';
                                        heightPercent = heightPercent.toString() + '%';
                                        let isFixed = false

                                        return (
                                            <View  style={ [{
                                             width: direction === 'outer-width' ? '100%' : widthPercent,
                                             height: direction === 'outer-width' ? heightPercent : '100%',
                                             borderTopWidth:  direction === 'outer-width' ? (indiv.isTop ? 0 : 3) : 0,
                                             borderBottomWidth: direction === 'outer-width' ? (indiv.isBottom ? 0 : 3) : 0,
                                             borderLeftWidth: direction === 'outer-height' ? (indiv.isFirst ? 0 : 3) : 0,
                                             borderRightWidth: direction === 'outer-height' ? (indiv.isLast ? 0 : 3) : 0,
                                            //  justifyContent: 'center',
                                            //  alignItems: 'center',
                                             }
                                             ]}
                                             key={'indiv'+index}
                                            >
                                                <OpenFixed width={indiv.width} height={indiv.height} />
                                            </View>
                                        )}) : <OpenFixed width={div.width} height={div.height}  />)
                                            : <OpenFixed width={div.width} height={div.height}  />}
                                            
                                </View>
                            )
                        }) : ''}
                    </View>
                </View>
                <View style={styles.closeConPreview}>
                    
                    <Pressable style={({pressed}) => [styles.btnClosePreview,
                        pressed && styles.btnClosePressedPreview
                    ]} onPress={onPress}>
                        <Text style={styles.txtClosePreview}>Close</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [styles.btnDonePreview,
                        {display: isFinal ? 'flex' : 'none'},
                        pressed && styles.btnDonePressedPreview
                    ]} onPress={() => {
                        if (openDimensions.length === 0 && type !== 'Fixed') {
                            window.alert('Openig not specified!\nPlease press on the drawing to specify opening');
                            return;
                        }

                        alufappContext.pushOpening(openDimensions);
                        setOpeningError(false);
                        doneoPress();
                    }}>
                        <Text style={styles.txtDonePreview}>Done</Text>
                    </Pressable>
                </View>
            </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    containerPreview: {
        flex: 1,
        position: 'absolute',
        
    }, 
    preview: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    widthWindowPreview: {
        width: '50%',
        height: 250,
        flexDirection: 'row',
        position: 'absolute'
    },
    heightWindowPreview: {
        width: '50%',
        height: 250,
        position: 'absolute'
    },
    labelPreview: {
        alignItems: 'center',
        marginBottom: 15,
    },
    txtLabelPreview: {
        width: 'auto',
        color: '#fff',
        fontSize: 18,
        letterSpacing: 3,
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
    btnDonePreview: {
        paddingHorizontal: 25,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: 'rgba(30, 90, 200, 1)',
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
    btnClosePressedPreview: {
        backgroundColor: 'rgba(250, 250, 250, 0.2)',
    },
    btnDonePressedPreview: {
        backgroundColor: 'rgba(30, 90, 200, 0.2)',
    },
    txtOpenFixed: {
        letterSpacing: 2,
        fontSize: 10,
        fontStyle: 'italic',
    },
    pressedPreview: {
        backgroundColor: 'rgba(50,50,200,0.2)',
        height: 100,
    },
    // container: {},
    // container: {},
});
