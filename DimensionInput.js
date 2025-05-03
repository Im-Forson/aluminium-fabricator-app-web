import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { AlufappContext } from "./alufapp-context";

function DimensionInput({ number }) {
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [quantity, setQuantity] = useState('');
    const [inchWidthAddVal, setInchWidthAddVal] = useState('n');
    const [inchHeightAddVal, setInchHeightAddVal] = useState('n');
    const [isInch, setIsInch] = useState(false);
    const [isInchWidth, setIsInchWidth] = useState(false);
    const [isInchHeight, setIsInchHeight] = useState(false);
    const [isWidthInput, setIsWidthInput] = useState(false);
    const [isHeightInput, setIsHeightInput] = useState(false);
    const [isQtyInput, setIsQtyInput] = useState(false);
    const [isAllQtyAlert, setAllQtyAlert] = useState(false);

    const alufappContext = useContext(AlufappContext);
    const unit = alufappContext.unit;
    const allQty = alufappContext.allQty;
    const widthInputRef = useRef(null);
    const heightInputRef = useRef(null);
    const qtyInputRef = useRef(null);
    // const regex = /^[1-9][0-9]*$/;
    const regex = /^[1-9]+/;
    
    function widthHandler (enteredValue) {
        setWidth(enteredValue);
    }

    function heightHandler (enteredValue) {
        setHeight(enteredValue);
    }

    function quantityHandler (enteredValue) {
        setQuantity(enteredValue);
    }

    const focusWidthInput = () => {
        if (widthInputRef.current) {
            widthInputRef.current.blur();
            
            setTimeout(() => {
                widthInputRef.current.focus();
            }, 50)
        }
    }
    const focusHeightInput = () => {
        if (heightInputRef.current) {
            heightInputRef.current.blur();
            
            setTimeout(() => {
                heightInputRef.current.focus();
            }, 50)
        }
    }
    const focusQtyInput = () => {
        if (qtyInputRef.current) {
            qtyInputRef.current.blur();
            
            setTimeout(() => {
                qtyInputRef.current.focus();
            }, 50)
        }
    }

    const widthContainerStyle = [styles.widthContainer];
    const heightContainerStyle = [styles.heightContainer];
    const qtyContainerStyle = [styles.qtyContainer]

    const widthIsValid = alufappContext.dimensions[number].widthValid;
    const heightIsValid = alufappContext.dimensions[number].heightValid;
    const qtyIsValid = alufappContext.dimensions[number].qtyValid;
    const error = styles.error;
    
    if (widthIsValid === false) {
        widthContainerStyle.push(error);
        
    } else if (widthIsValid === true) {
        const errorIndex = widthContainerStyle.indexOf(error);
        widthContainerStyle.splice(errorIndex, 0);
    }

    if (heightIsValid === false) {
        heightContainerStyle.push(error);
        
    } else if (heightIsValid === true) {
        const errorIndex = heightContainerStyle.indexOf(error);
        heightContainerStyle.splice(errorIndex, 0);
    }

    if (qtyIsValid === false) {
        qtyContainerStyle.push(error);
        
    } else if (qtyIsValid === true) {
        const errorIndex = qtyContainerStyle.indexOf(error);
        qtyContainerStyle.splice(errorIndex, 0);
    }

    useEffect(() => {
        if (allQty !== null && allQty !== 'ind') {
            setQuantity(allQty);
        }
    }, [allQty]);

    useEffect(() => {
        try {
            const index = number;
            alufappContext.dimensions[index].width = width;
            alufappContext.dimensions[index].height = height;
            alufappContext.dimensions[index].quantity = quantity;
        } catch (error) {
            // console.log(error)
        }
        
    }, [width, height, quantity]);
    
    return (
        <View style={styles.container}>
            {/* WIDTH HEIGHT QUANTITY INPUTS */}
            <View style={{
                width: '100%',
                height: 40,
                flexDirection: 'row',
                // backgroundColor: 'yellow'
            }}>
                <View style={styles.numberContainer}>
                    <Text style={styles.number}>{number + 1}</Text>
                </View>
                <View style={widthContainerStyle}>
                    {/* <Pressable style={{
                        // backgroundColor: 'yellow',
                        display: isWidthInput ? 'none' : 'flex',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }} 
                     onPress={() => {
                        setIsWidthInput(true);
                        setIsHeightInput(false);
                        setIsQtyInput(false);
                        focusWidthInput();
                     }}
                    >
                        <Text style={styles.txtShowInput}>{width}</Text>
                    </Pressable> */}
                    <TextInput
                    //  textAlign="center"
                    //  ref={widthInputRef}
                     maxLength={6}
                     onChangeText={widthHandler}
                     value={width}
                     keyboardType="number-pad"
                    //  cursorColor='red'
                     style={[
                        styles.widthInput, styles.input,
                        {width: '100%'}
                    ]} 
                    />
                    {/* <Pressable style={({pressed}) => [{
                        display: isInches ? 'flex' : 'none',
                        width: '35%',
                        height: '100%',
                        borderLeftWidth: 1,
                        borderColor: 'rgba(0, 0, 0, 0.3)',
                        justifyContent: 'center',
                        paddingLeft: 5,
                        backgroundColor: isInchWidth && inchesAddId === number ? 'rgba(0, 0, 0, 0.13)' : 'transparent',
                    }, pressed && styles.pressed]}
                    onPress={() => {
                        
                        if (isInchWidth) {
                            alufappContext.setInchAddId(null);
                            setIsInch(false);
                            setIsInchWidth(false);
                            // setIsInchHeight(false); 
                        }
                        else {
                            alufappContext.setInchAddId(number);
                            setIsInch(true);
                            setIsInchWidth(true);
                            setIsInchHeight(false);
                        }
                    }}
                    >
                        <Text style={{
                            fontSize: 12,

                        }}>{inchWidthAddVal}</Text>
                    </Pressable> */}
                </View>
                <View style={heightContainerStyle}>
                    {/* <Pressable style={{
                        // backgroundColor: 'yellow',
                        display: isHeightInput ? 'none' : 'flex',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }} 
                     onPress={() => {
                        setIsWidthInput(false);
                        setIsHeightInput(true);
                        setIsQtyInput(false);
                        focusHeightInput();
                     }}
                    >
                        <Text style={styles.txtShowInput}>{height}</Text>
                    </Pressable> */}
                    <TextInput 
                    //  ref={heightInputRef} 
                     maxLength={6}
                     onChangeText={heightHandler}
                     value={height}
                     keyboardType="number-pad"
                    //  cursorColor={Colors.text100}
                    //  textAlign="center"
                     style={[
                        styles.heightInput, styles.input,
                        {width: '100%'}
                    ]}
                    onFocus={() => {
                        alufappContext.setInchAddId(null);
                        setIsInch(false);
                        setIsInchWidth(false);
                        setIsInchHeight(false);
                    }} 
                    onBlur={() => {
                        setIsHeightInput(false);
                    }}
                    />
                    {/* <Pressable style={({pressed}) => [{
                        display: isInches ? 'flex' : 'none',
                        width: '35%',
                        height: '100%',
                        borderLeftWidth: 1,
                        borderColor: 'rgba(0, 0, 0, 0.3)',
                        justifyContent: 'center',
                        paddingLeft: 5,
                        backgroundColor: isInchHeight && inchesAddId === number ? 'rgba(0, 0, 0, 0.13)' : 'transparent',
                    }, pressed && styles.pressed]}
                    onPress={() => {
                        // glassSheetCtx.setInchAddId(number);
                        if (isInchHeight) {
                            // glassSheetCtx.setInchAddId(null);
                            setIsInch(false);
                            // setIsInchWidth(false);
                            setIsInchHeight(false);
                        }
                        else {
                            glassSheetCtx.setInchAddId(number);
                            setIsInch(true);
                            setIsInchWidth(false);
                            setIsInchHeight(true);
                            
                        }
                        
                    }}
                    >
                        <Text style={{
                            fontSize: 12,
                            
                        }}>{inchHeightAddVal}</Text>
                    </Pressable> */}
                </View>
                <View style={qtyContainerStyle}>
                    {/* <Pressable style={{
                        // backgroundColor: 'yellow',
                        display: isQtyInput ? 'none' : 'flex',
                        width:  '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }} 
                     onPress={() => {
                        setIsWidthInput(false);
                        setIsHeightInput(false);
                        setIsQtyInput(true);
                        focusQtyInput();
                        if (allQty === null) {
                            alufappContext.showAllQtyAlert();
                        }
                     }}
                    >
                        <Text style={styles.txtShowInput}>{quantity}</Text>
                    </Pressable> */}
                    <TextInput
                    //  ref={qtyInputRef}
                     maxLength={3}
                     onChangeText={quantityHandler}
                     value={quantity}
                     keyboardType="number-pad"
                     cursorColor='#02182B'
                    //  textAlign="center"
                     style={[styles.qtyInput, styles.input,
                        {width: '100%', }
                    ]} 
                    onFocus={() => {
                        if (allQty === null) {
                            alufappContext.showAllQtyAlert();
                        }
                    }}
                    // onBlur={() => {
                    //     setIsQtyInput(false);
                    // }}
                    />
                </View>
            </View>
        </View>
    );
}

export default DimensionInput;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'row',
        height: 45,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        backgroundColor: 'rgba(236, 235, 228, 0.5)',
    },
    numberContainer: {
        width: '12%',
        borderRightWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    number: {
        fontSize: 13,
        fontWeight: 'bold',
        opacity: 0.4,
    },
    widthContainer: {
        width: '35%',
        height: '100%',
        flexDirection: 'row',
        borderRightWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heightContainer: {
        width: '35%',
        height: '100%',
        flexDirection: 'row',
        borderRightWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyContainer: {
        width: '18%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '60%',
        height: '80%',
        fontSize: 16,
        letterSpacing: 1,
        color: '#02182B',
        textAlign: 'center',
        // backgroundColor: 'yellow',
        paddingHorizontal: 5
    },
    txtShowInput: {
        fontSize: 16,
        letterSpacing: 1,
        color: '#02182B',
    },
    error: {
        borderWidth: 1,
        borderColor: 'maroon',
    }, 
    inchesAddTabStart: {
        width: '12.5%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        backgroundColor: 'rgba(0, 100, 50, 0.1)'
    },
    inchesAddTab: {
        width: '12.5%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        backgroundColor: 'rgba(0, 100, 50, 0.1)'
    },
    pressed: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
});