import { View, Text, TextInput, StyleSheet, Image, Dimensions, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";

import { AlufappContext } from "./alufapp-context";
import PreviewDivision from "./PreviewDivision";
import PreviewDrawing from "./PreviewDrawing";
import RequirePaymentModal from "./RequirePaymentModal";
import AlufappToast from "./AlufappToast";

function MatDimensionsPage({ route }) {
    const workTitle = route.params.workTitle;
    const workType = route.params.workType;
    const profileType = route.params.profileType;

    const alufappContext = useContext(AlufappContext);
    const navigation = useNavigation();
    const deviceDimension = Dimensions.get("window");
    const deviceWidth = deviceDimension.width;
    const isToast = alufappContext.isToast;
    const isWhichToast = alufappContext.isWhichToast;

    const regex = /[0-9]/;
    const doorLowestWidth = 400;
    const doorLowetHeight = 1000;
    const qunatityLimit = 150;
    const windowsLimit = 3;
    const amountPayable = 'GH3';
    
    const openingsMeasurement = alufappContext.openingsMeasurement;
    const currentWorkArea = alufappContext.currentWorkArea;
    const isLimited = alufappContext.isMaterialCalcLimited;

    const [dimensions, setDimensions] = useState([]);
    const [isDimensionsLoading, setDimensionsLoading] = useState(false);

    const [outerDivisionLength, setOuterDivisionsLength] = useState([]);
    const [outerDrawingObj, setOuterDrawingObj] = useState(null);
    const [openingsDivisionsObj, setOpeningDivisionsObj] = useState({widthDivision: 0, heightDivision: 0});

    const [measurementValid, setMeasurementValid] = useState(false);
    const [msCount, setMsCount] = useState(0);
    const [isRemEditMs, setRemEditMs] = useState(false);
    const [msIndex, setMsIndex] = useState(null);
    const [totalPieces, setTotalPieces] = useState(0);
    const [totalArea, setTotalArea] = useState(0);
    const [isEdit, setEdit] = useState(false);
    const [isRemove, setRemove] = useState(false);
    const [EditMsQty, setEditMsQty] = useState();
    
    const [isUsageAlert, setUsageAlert] = useState(false);
    const [isReturnAlert, setReturnAlert] = useState(false);
    const [isEmptyAlert, setEmptyAlert] = useState(false);
    const [isMsLowAlert, setMsLowAlert] = useState(false);
    const [isDivisionAlert, setDivisionAlert] = useState(false);
    const [isDivisionSetAlert, setDivisionSetAlert] = useState(false);
    const [isDoorAlert, setDoorAlert] = useState(false);
    const [isQtyExceedAlert, setQtyExceedAlert] = useState(false);
    
    const [bayValue, setBayValue] = useState(2);
    const [widthValue, setWidthValue] = useState('');
    const [heightValue, setHeightValue] = useState('');
    const [qtyValue, setQtyValue] = useState('');
    const [] = useState(false);

    const [divWidthVal, setDivWidthVal] = useState(1);
    const [divHeightVal, setDivHeightVal] = useState(1);
    const [divWidthArr, setDivWidthArr] = useState([1]);
    const [divHeightArr, setDivHeightArr] = useState([1]);
    const [isPreviewDivision, setPrevDivision] = useState(false);
    const [isPreviewDrawing, setPreviewDrawing] = useState(false);
    const [drawwingArr1, setDrawingArr1] = useState([]);
    const [innerDivisionsArr, setInnerDivisionsArr] = useState([]);
    const [isFinalSet, setFinalSet] = useState(false);
    const [divideInnerPreviewWidth, setDivideInnerPreviewWidth] = useState(null);
    const [divideInnerPreviewHeight, setDivideInnerPreviewHeight] = useState(null);
    const [] = useState(false);
    
    const [isSetDivisions, setSetDivisions] = useState(false);
    const [isProjOuter, setProjOuter] = useState(true);
    const [isProjInner, setProjInner] = useState(false);
    const [projWidthDivVal, setProjWidthDivVal] = useState(2);
    const [projWidthHeightDivVal, setProjWidthHeightDivVal] = useState(2);
    const [projWidthDivArr, setProjWidthDivArr] = useState([]);
    const [projWidthDivHeightArr, setProjWidthDivHeightArr] = useState([]);
    const [projectedDivisionWidth, setProjectedDivisionWidth] = useState('');
    const [projectedDivisionWidthHeight, setProjectedDivisionWidthHeight] = useState('');
    const [isProjDivideOuterWidth, setProjDivideOuterWidth] = useState(false);
    const [isProjDivideOuterHeight, setProjDivideOuterHeight] = useState(false);
    const [projectedDivisionIndex, setProjectedDivisionIndex] = useState(null);
    const [projectedWHDivisionIndex, setProjectedWHDivisionIndex] = useState(null);
    const [isProjectedDivisionInput, setProjectedDivisionInput] = useState(false);
    const [isProjectedWHDivisionInput, setProjectedWHDivisionInput] = useState(false);
    const [projDivsLock, setProjDivsLock] = useState([]);
    const [projDivsWHLock, setProjDivsWHLock] = useState([]);
    const [isDivideDivision, setDivideDivision] = useState(false);
    const [divisionWidth, setDivisionWidth] = useState(null);
    const [divisionHeight, setDivisionHeight] = useState(null);
    const [isWidthDivisionHeight, setWidthDivisionHeight] = useState(false);
    const [isOuterWidth, setOuterWidth] = useState(false);
    const [isOuterHeight, setOuterHeight] = useState(false);
    const [divisionDirection, setDivisionDirection] = useState('');
    const [isBottom, setBottom] = useState(true);

    const [windowDoorType, setWindowDoorType] = useState('windows');

    useEffect(() => {
        if (workType === 'Sliding (Division)') {
            setDivWidthVal(2);
            setDivHeightVal(2);
            setDivWidthArr([1,2]);
            setDivHeightArr([1,2]);
        }
        if (workType === 'Fixed') {
            setBottom(false);
        }

        if (workType === 'Hinge' || workType === 'Swing' || workType === 'Fixed') {
            setWindowDoorType('doors')
        }
    }, []);

    useEffect(() => {
        const widthIsNum = regex.test(widthValue);
        const heightIsNum = regex.test(heightValue);
        const widthLengthValid = (widthValue.trim()).length >= 3;
        const heightLengthValid = (heightValue.trim()).length >= 3;
        const isWidthValid = widthIsNum && widthLengthValid;
        const isHeightValid = heightIsNum && heightLengthValid;

        if (isWidthValid && isHeightValid) {
            setMeasurementValid(true);
        }
        else {
            setMeasurementValid(false)
        }
    }, [widthValue, heightValue]);

    function previewSlidingDivisionHandler() {
        let trimmedWidth = widthValue.trim();
        let trimmedHeight = heightValue.trim();
        let trimmedQty = qtyValue.trim();
        if (trimmedQty.length === 0) {
            trimmedQty = '1';
        }
        const widthEmpty = trimmedWidth.length === 0;
        const heightEmpty = trimmedHeight.length === 0;
        if (widthEmpty || heightEmpty) {
            window.alert('Invalid Input. Please fill all fields with valid numbers only.');
            return;
        }

        
        let parsedWidth = parseFloat(trimmedWidth);
        let parsedHeight = parseFloat(trimmedHeight);
        let parsedQty = parseInt(trimmedQty);
        const widthIsNum = regex.test(parsedWidth);
        const heightIsNum = regex.test(parsedHeight);
        const qtyIsNum = regex.test(parsedQty);
        if (!widthIsNum || !heightIsNum || !qtyIsNum) {
            window.alert('Invalid Input. Please fill all fields with valid numbers only.');
            return;
        }

        const widthIsValid = ( parsedWidth / divWidthVal ) >= 100;
        const heightIsValid = ( parsedHeight / divHeightVal ) >= 100;
        const qtyIsValid = parsedQty <= 100;
        if (!widthIsValid || !heightIsValid) {
            window.alert(`Measurement too low for ${divWidthVal * divHeightVal} divisions on each panel. Consider reducing divisions.`);
            return;
        }

        setDivideInnerPreviewWidth(parseInt(widthValue) / bayValue);
        setDivideInnerPreviewHeight(parseInt(heightValue));
        setPrevDivision(true);
    }

    function closeDivisionsHandler() {
        if (isWidthDivisionHeight) {
            setWidthDivisionHeight(false);
            setDivideDivision(false);
            setSetDivisions(true);
            setProjWidthHeightDivVal(2);
            setProjWidthDivHeightArr([]);
            setProjectedDivisionWidthHeight('');
            setProjectedWHDivisionIndex(null);
            setProjectedWHDivisionInput(false);
            setProjDivsWHLock([]);

            // setInnerDivisionsArr([]);
            // console.log(innerDivisionsArr);
            if (innerDivisionsArr.length > 0) {
                let innerDivs = innerDivisionsArr;
                innerDivs[projectedDivisionIndex] = [];
                setInnerDivisionsArr(innerDivs);
            }
            
        }
        else {
            setProjDivideOuterWidth(false);
            setProjDivideOuterHeight(false);
            setProjWidthDivVal(2);
            setProjWidthDivArr([]);
            setProjectedDivisionWidth('');
            setProjectedDivisionIndex(null);
            setProjectedDivisionInput(false);
            setProjDivsLock([]);
            setDrawingArr1([]);
            setInnerDivisionsArr([]);
            setOuterDivisionsLength([]);
            setOuterDrawingObj(null);
            setOpeningDivisionsObj({widthDivision: 0, heightDivision: 0});
            setDivWidthVal(1);
            setDivHeightVal(1);
            setDivWidthArr([1]);
            setDivHeightArr([1]);
            setDivideInnerPreviewWidth(null);
            setDivideInnerPreviewHeight(null);
            alufappContext.pushOpening([]);
        }
    }

    function previewDrawingHandler() {
        let trimmedWidth = widthValue.trim();
        let trimmedHeight = heightValue.trim();
        let trimmedQty = qtyValue.trim();
        if (trimmedQty.length === 0) {
            trimmedQty = '1';
        }
        const widthEmpty = trimmedWidth.length === 0;
        const heightEmpty = trimmedHeight.length === 0;
        if (widthEmpty || heightEmpty) {
            window.alert('Invalid Input. Please fill all fields with valid numbers only.');
            return;
        }

        
        let parsedWidth = parseFloat(trimmedWidth);
        let parsedHeight = parseFloat(trimmedHeight);
        let parsedQty = parseInt(trimmedQty);
        const widthIsNum = regex.test(parsedWidth);
        const heightIsNum = regex.test(parsedHeight);
        const qtyIsNum = regex.test(parsedQty);
        if (!widthIsNum || !heightIsNum || !qtyIsNum) {
            window.alert('Invalid Input. Please fill all fields with valid numbers only.');
            return;
        }

        const widthIsValid = ( parsedWidth / divWidthVal ) >= 100;
        const heightIsValid = ( parsedHeight / divHeightVal ) >= 100;
        const qtyIsValid = parsedQty <= 100;
        if (!widthIsValid || !heightIsValid) {
            window.alert(`Measurement too low for ${divWidthVal * divHeightVal} divisions on each panel. Consider reducing divisions.`);
            return;
        }

        if (isProjDivideOuterWidth) {
            let divisions = [], divisionsIn = [];

            for (let i = 0; i < projWidthDivArr.length; i++) {
                let width = parseFloat(projWidthDivArr[i]);
                let height = parseFloat(heightValue);
                let obj = {width: width, height: height};
                divisions.push(obj);
            }
            
            
            if (projWidthDivHeightArr.length > 0) {
                let innerDivisions = []; 
                if (innerDivisionsArr.length === 0) {
                    for (let i = 0; i < projWidthDivArr.length; i++) {
                        innerDivisions.push([])
                    }
                    // setInnerDivisionsArr(divisions);
                }
                else {innerDivisions = innerDivisionsArr}

                let columnWidth = parseFloat(projWidthDivArr[projectedDivisionIndex]);
                let columnArr = [];
                
                for (let i = 0; i < projWidthDivHeightArr.length; i++) {
                    let istop = false, isbottom = false;
                    if (i === 0) {istop = true}
                    if (i === projWidthDivHeightArr.length -1) {isbottom = true}
                    let obj = {
                        width: columnWidth,
                        height: parseFloat(projWidthDivHeightArr[i]),
                        isTop: istop,
                        isBottom: isbottom,
                    }

                    columnArr.push(obj);
                }
                
                innerDivisions[projectedDivisionIndex] = columnArr;
                setInnerDivisionsArr(innerDivisions);
            }
            
            setDivisionDirection('outer-width');
            setDrawingArr1(divisions);
        }

        else if (isProjDivideOuterHeight) {
            let divisions = [], divisionsIn = [];

            for (let i = 0; i < projWidthDivArr.length; i++) {
                let width = parseFloat(widthValue);
                let height = parseFloat(projWidthDivArr[i]);
                let obj = {width: width, height: height};
                divisions.push(obj);
            }

            if (projWidthDivHeightArr.length > 0) {
                let innerDivisions = []; 
                if (innerDivisionsArr.length === 0) {
                    for (let i = 0; i < projWidthDivArr.length; i++) {
                        innerDivisions.push([])
                    }
                }

                else {innerDivisions = innerDivisionsArr}

                let rowHeight = parseFloat(projWidthDivArr[projectedDivisionIndex]);
                let rowArr = [];
                
                for (let i = 0; i < projWidthDivHeightArr.length; i++) {
                    let isFirst = false, isLast = false;
                    if (i === 0) {isFirst = true}
                    if (i === projWidthDivHeightArr.length -1) {isLast = true}
                    let obj = {
                        width: parseFloat(projWidthDivHeightArr[i]),
                        height: rowHeight,
                        isFirst: isFirst,
                        isLast: isLast,
                        isTop: '',
                        isBottom: '',
                    }

                    rowArr.push(obj);
                }
                
                innerDivisions[projectedDivisionIndex] = rowArr;
                setInnerDivisionsArr(innerDivisions);
            }

            setDivisionDirection('outer-height');
            setDrawingArr1(divisions);
        }
        
        setPreviewDrawing(true);
    }

    function saveDivisionsHandler() {
        let divisions = [], innerDivisions = [];

         // OUTER WIDTH SECTION
        if (isProjDivideOuterWidth) {
            if (isWidthDivisionHeight) {
                if (projWidthDivHeightArr.length > 0) {
                    if (innerDivisionsArr.length === 0) {
                        for (let i = 0; i < projWidthDivArr.length; i++) {
                            innerDivisions.push([])
                        }
                        // setInnerDivisionsArr(divisions);
                    }
                    else {innerDivisions = innerDivisionsArr}
    
                    let columnWidth = parseFloat(projWidthDivArr[projectedDivisionIndex]);
                    let columnArr = [];
                    
                    for (let i = 0; i < projWidthDivHeightArr.length; i++) {
                        let istop = false, isbottom = false;
                        if (i === 0) {istop = true}
                        if (i === projWidthDivHeightArr.length -1) {isbottom = true}
                        let obj = {
                            width: columnWidth,
                            height: parseFloat(projWidthDivHeightArr[i]),
                            isTop: istop,
                            isBottom: isbottom,
                        }
    
                        columnArr.push(obj);
                    }
                    
                    innerDivisions[projectedDivisionIndex] = columnArr;
                    setInnerDivisionsArr(innerDivisions);
                }
    
                setWidthDivisionHeight(false);
                setDivideDivision(false);
                setSetDivisions(true);
                setProjWidthHeightDivVal(2);
                setProjWidthDivHeightArr([]);
                setProjectedDivisionWidthHeight('');
                setProjectedWHDivisionIndex(null);
                setProjectedWHDivisionInput(false);
                setProjDivsWHLock([]);
    
            }
            else {
                // FINAL SET SECTION - OUTER WIDTH
                for (let i = 0; i < projWidthDivArr.length; i++) {
                    let width = parseFloat(projWidthDivArr[i]);
                    let height = parseFloat(heightValue);
                    let obj = {width: width, height: height};
                    divisions.push(obj);
                }
    
                let divisionLength = [];
                for (let i = 0; i < divisions.length-1; i++) {
                    if (isProjDivideOuterWidth) {
                        divisionLength.push(divisions[i].height);
                    }
                    else {
                        divisionLength.push(divisions[i].width);
                    }
                }
    
                for (let i = 0; i < innerDivisionsArr.length; i++) {
                    let innerDiv = innerDivisionsArr[i];
    
                    if (innerDiv.length > 0) {
                        for (let j = 0; j < innerDiv.length-1; j++) {
                            if (isProjDivideOuterWidth) {
                                divisionLength.push(innerDiv[j].width);
                            }
                            else {
                                divisionLength.push(innerDiv[j].height);
                            }
                        }
                    }
                }

                
                setOuterDivisionsLength(divisionLength);
                setOuterDrawingObj({
                    divisions: divisions,
                    innerDivisions: innerDivisionsArr,
                    direction: 'outer-width',
                });

                setDivisionDirection('outer-width');
                setDrawingArr1(divisions);

                setPreviewDrawing(true);
                setFinalSet(true);
                
            }
        }

        // OUTER HEIGHT SECTION
        else {
            if (isWidthDivisionHeight) {
                if (projWidthDivHeightArr.length > 0) {
                    if (innerDivisionsArr.length === 0) {
                        for (let i = 0; i < projWidthDivArr.length; i++) {
                            innerDivisions.push([])
                        }
                    }

                    else {innerDivisions = innerDivisionsArr}

                    let rowHeight = parseFloat(projWidthDivArr[projectedDivisionIndex]);
                    let rowArr = [];
                    
                    for (let i = 0; i < projWidthDivHeightArr.length; i++) {
                        let isFirst = false, isLast = false;
                        if (i === 0) {isFirst = true}
                        if (i === projWidthDivHeightArr.length -1) {isLast = true}
                        let obj = {
                            width: parseFloat(projWidthDivHeightArr[i]),
                            height: rowHeight,
                            isFirst: isFirst,
                            isLast: isLast,
                            isTop: '',
                            isBottom: '',
                        }

                        rowArr.push(obj);
                    }
                    
                    innerDivisions[projectedDivisionIndex] = rowArr;
                    setInnerDivisionsArr(innerDivisions);
                }
    
                setWidthDivisionHeight(false);
                setDivideDivision(false);
                setSetDivisions(true);
                setProjWidthHeightDivVal(2);
                setProjWidthDivHeightArr([]);
                setProjectedDivisionWidthHeight('');
                setProjectedWHDivisionIndex(null);
                setProjectedWHDivisionInput(false);
                setProjDivsWHLock([]);
    
            }
            else {
                // FINAL SET SECTION - OUTER HEIGHT
                for (let i = 0; i < projWidthDivArr.length; i++) {
                    let width = parseFloat(widthValue);
                    let height = parseFloat(projWidthDivArr[i]);
                    let obj = {width: width, height: height};
                    divisions.push(obj);
                }
    
                let divisionLength = [];
                for (let i = 0; i < divisions.length-1; i++) {
                    if (isProjDivideOuterWidth) {
                        divisionLength.push(divisions[i].height);
                    }
                    else {
                        divisionLength.push(divisions[i].width);
                    }
                }
    
                for (let i = 0; i < innerDivisionsArr.length; i++) {
                    let innerDiv = innerDivisionsArr[i];
    
                    if (innerDiv.length > 0) {
                        for (let j = 0; j < innerDiv.length-1; j++) {
                            if (isProjDivideOuterWidth) {
                                divisionLength.push(innerDiv[j].width);
                            }
                            else {
                                divisionLength.push(innerDiv[j].height);
                            }
                        }
                    }
                }

                if (isProjOuter) {
                    setOuterDivisionsLength(divisionLength);
                    setOuterDrawingObj({
                        divisions: divisions,
                        innerDivisions: innerDivisionsArr,
                        direction: 'outer-height',
                    });
                }
               
                setDivisionDirection('outer-height');
                setDrawingArr1(divisions);
                setPreviewDrawing(true);
                setFinalSet(true);
            }
        }
    }

    function increaseDivWidth() {
        let count = divWidthVal;
        let newDivWidthArr = [];
        count += 1;
        let limit = 200;

        if (workType === 'Sliding (Division)') {
            limit = 50;
        }

        let parsedWidth = parseInt(widthValue);
        let division = parsedWidth / count;
        division = Math.round(division * 100) / 100;

        if (division < 200) {
            count = 1;
        }

        for (let i = 1; i <= count; i++) {
            newDivWidthArr.push(i);
        }

        setDivWidthArr(newDivWidthArr);
        setDivWidthVal(count);
    }
    function decreaseDivWidth() {
        let count = divWidthVal;
        let newDivWidthArr = [];
        
        let limit = 200;

        if (count > 1) {
            count -= 1;
        }

        if (workType === 'Sliding (Division)') {
            limit = 50;
        }

        let parsedWidth = parseInt(widthValue);

        if (count < 1) {
            count = Math.round(parsedWidth /200);
        }

        for (let i = 1; i <= count; i++) {
            newDivWidthArr.push(i);
        }

        setDivWidthArr(newDivWidthArr);
        setDivWidthVal(count);
    }

    function increaseDivHeight() {
        let count = divHeightVal;
        let newDivHeightArr = [];
        count += 1;
        let limit = 200;

        if (workType === 'Sliding (Division)') {
            limit = 50;
        }

        let parsedWidth = parseInt(heightValue);
        let division = parsedWidth / count;
        division = Math.round(division * 100) / 100;

        if (division < 200) {
            count = 1;
        }

        for (let i = 1; i <= count; i++) {
            newDivHeightArr.push(i);
        }

        setDivHeightArr(newDivHeightArr);
        setDivHeightVal(count);
    }
    function decreaseDivHeight() {
        let count = divHeightVal;
        let newDivWidthArr = [];
        
        let limit = 200;

        if (count > 1) {
            count -= 1;
        }

        if (workType === 'Sliding (Division)') {
            limit = 50;
        }

        let parsedHeight = parseInt(heightValue);

        if (count < 1) {
            count = Math.round(parsedHeight /limit);
        }

        for (let i = 1; i <= count; i++) {
            newDivWidthArr.push(i);
        }

        setDivHeightArr(newDivWidthArr);
        setDivHeightVal(count);
    }

    function increaseBay() {
        let count = bayValue;
        count += 1;
        if (count > 10) {
            count = 2;
        }
        setBayValue(count);
    }
    
    function decreaseBay() {
        let count = bayValue;
        count -= 1;
        if (count < 2) {
            count = 10;
        }
        setBayValue(count);
    }

    function setDivisionsHandler() {
        if (!measurementValid) {return;}

        let trimmedWidth = widthValue.trim();
        let trimmedHeight = heightValue.trim();
        let trimmedQty = qtyValue.trim();
        if (trimmedQty.length === 0) {
            trimmedQty = '1';
        }
        const widthEmpty = trimmedWidth.length === 0;
        const heightEmpty = trimmedHeight.length === 0;
        if (widthEmpty || heightEmpty) {
            window.alert('Invalid Input. Please fill all fields with valid numbers only.');
            return;
        }

        const regex = /[0-9]/;
        let parsedWidth = parseFloat(trimmedWidth);
        let parsedHeight = parseFloat(trimmedHeight);
        let parsedQty = parseInt(trimmedQty);
        const widthIsNum = regex.test(parsedWidth);
        const heightIsNum = regex.test(parsedHeight);
        const qtyIsNum = regex.test(parsedQty);
        if (!widthIsNum || !heightIsNum || !qtyIsNum) {
            window.alert('Invalid Input. Please fill all fields with valid numbers only.');
            return;
        }

        const widthIsValid = parsedWidth >= 200;
        const heightIsValid = parsedHeight >= 200;
        const qtyIsValid = parsedQty <= 100;
        if (!widthIsValid || !heightIsValid) {
            window.alert('Measurement is too low. Please enter a valid window dimensions.')
            return;
        }

        setSetDivisions(true);
    }

    // PROJECTED HANDLERS START //
    function projDivideOuterWidthHandler(side) {
        let parsedWidth = parseInt(widthValue);
        
        if (side === 'divide-height') {
            parsedWidth = parseInt(heightValue);
        }
        
        let division = parsedWidth / projWidthDivVal;
        division = Math.round(division * 100) / 100;
        setProjectedDivisionWidth(division.toString());

        let divisionArr = [], locksArr = [];
        for (let i = 0; i < projWidthDivVal; i++) {
            divisionArr.push(division.toString());
            locksArr.push('unlock');
        }

        setProjWidthDivArr(divisionArr);
        setProjDivsLock(locksArr);
        setInnerDivisionsArr([]);
    }
    function projDivideOuterWidthHeightHandler() {
        setWidthDivisionHeight(true);

        let parsedWidth = parseInt(heightValue);
        if (isProjDivideOuterHeight) {parsedWidth = parseInt(widthValue);}
        let division = parsedWidth / projWidthHeightDivVal;
        division = Math.round(division * 100) / 100;
        setProjectedDivisionWidthHeight(division.toString());

        let divisionArr = [], locksArr = [];
        for (let i = 0; i < projWidthHeightDivVal; i++) {
            divisionArr.push(division.toString());
            locksArr.push('unlock');
        }

        setProjWidthDivHeightArr(divisionArr);
        setProjDivsWHLock(locksArr);
    }

    function incProjWidthDiv() {
        let count = projWidthDivVal;
        let newArr = [], locksArr = [];
        count += 1;
       
        let parsedWidth = parseInt(widthValue);
        if (isProjDivideOuterHeight) {parsedWidth = parseInt(heightValue);}
        let division = parsedWidth / count;
        division = Math.round(division * 100) / 100;

        if (division < 200) {
            count = 2;
            division = parsedWidth / count;
        }

        for (let i = 0; i < count; i++) {
            newArr.push(division.toString());
            locksArr.push('unlock');
        }

        setProjectedDivisionWidth(division.toString());
        setProjWidthDivArr(newArr);
        setProjDivsLock(locksArr);
        setProjWidthDivVal(count);
        setInnerDivisionsArr([]);
    }

    function decProjWidthDiv() {
        let parsedWidth = parseInt(widthValue);
        if (isProjDivideOuterHeight) {parsedWidth = parseInt(heightValue);}
        let count = projWidthDivVal;
        let newArr = [], locksArr = [];
        count -= 1;

        if (count < 2) {
            count = Math.round(parsedWidth /200);
        }

        let division = parsedWidth / count;
        division = Math.round(division * 100) / 100;

        for (let i = 1; i <= count; i++) {
            newArr.push(division.toString());
            locksArr.push('unlock');
        }
        
        setProjectedDivisionWidth(division.toString());
        setProjWidthDivArr(newArr);
        setProjDivsLock(locksArr);
        setProjWidthDivVal(count);
        setInnerDivisionsArr([]);
    }

    function incProjWidthHeightDiv() {
        let count = projWidthHeightDivVal;
        let newArr = [], locksArr = [];
        count += 1;
       
        let parsedHeight = parseInt(heightValue);
        if (isProjDivideOuterHeight) {parsedHeight = parseInt(widthValue);}
        let division = parsedHeight / count;
        division = Math.round(division * 100) / 100;

        if (division < 200) {
            count = 2;
            division = parsedHeight / count;
        }

        for (let i = 0; i < count; i++) {
            newArr.push(division.toString());
            locksArr.push('unlock');
        }

        setProjectedDivisionWidthHeight(division.toString());
        setProjWidthDivHeightArr(newArr);
        setProjDivsWHLock(locksArr);
        setProjWidthHeightDivVal(count);
    }

    function decProjWidthHeightDiv() {
        let parsedHeight = parseInt(heightValue);
        if (isProjDivideOuterHeight) {parsedHeight = parseInt(widthValue);}
        let count = projWidthHeightDivVal;
        let newArr = [], locksArr = [];
        count -= 1;

        if (count < 2) {
            count = Math.round(parsedHeight /200);
        }

        let division = parsedHeight / count;
        division = Math.round(division * 100) / 100;

        for (let i = 1; i <= count; i++) {
            newArr.push(division.toString());
            locksArr.push('unlock');
        }
        
        setProjectedDivisionWidthHeight(division.toString());
        setProjWidthDivHeightArr(newArr);
        setProjDivsWHLock(locksArr);
        setProjWidthHeightDivVal(count);
    }

    function divideInnerHandler() {
        setProjInner(true);
        setProjOuter(false);

        if (openingsMeasurement.length > 0) {
            let index = 0; 
            let area = openingsMeasurement[0].width * openingsMeasurement[0].height;
            for (let i = 0; i < openingsMeasurement.length; i++) {
                let nextArea = openingsMeasurement[i].width * openingsMeasurement[i].height;
                if (nextArea > area) {
                    index = i;
                }
            }

            setDivideInnerPreviewWidth(openingsMeasurement[index].width);
            setDivideInnerPreviewHeight(openingsMeasurement[index].height);
        }
        else {
            setDivideInnerPreviewWidth(parseInt(widthValue));
            setDivideInnerPreviewHeight(parseInt(heightValue));
        }
    }

    function projTextChangeHandler(value) {
        let lockedCount = 0;
        for (let i = 0; i < projDivsLock.length; i++) {
            if (projDivsLock[i] === 'lock') {
                lockedCount += 1;
            }
        }

        if (projDivsLock.length - lockedCount === 1) {
            return;
        }

        setProjectedDivisionWidth(value);
        projWidthDivArr[projectedDivisionIndex] = value;

        const regEx = /^[1-9][0-9]+/
        let totalWidth = parseFloat(widthValue);
        if (isProjDivideOuterHeight) {totalWidth = parseFloat(heightValue);}
        let curDivisionValue = value.trim();
        if (curDivisionValue.length === 0) {curDivisionValue = 0;}
        if (!regex.test(curDivisionValue)) {curDivisionValue = 0;}
        curDivisionValue = parseFloat(curDivisionValue);
        totalWidth -= curDivisionValue;

        let unlockCount = 0, lockValue = 0;
        for (let i = 0; i < projDivsLock.length; i++) {
            if (projDivsLock[i] === 'unlock') {
                unlockCount += 1;
            }
            else if (projDivsLock[i] === 'lock') {
                lockValue += parseInt(projWidthDivArr[i]);
            }
        }

        totalWidth -= lockValue;
        let newDivision = totalWidth / (unlockCount - 1);

        for (let i = 0; i < projWidthDivArr.length; i++) {
            if (projectedDivisionIndex !== i && projDivsLock[i] === 'unlock') {
                projWidthDivArr[i] = newDivision.toString();
            }
        }
    }

    function projWHTextChangeHandler(value) {
        let lockedCount = 0;
        for (let i = 0; i < projDivsWHLock.length; i++) {
            if (projDivsWHLock[i] === 'lock') {
                lockedCount += 1;
            }
        }

        if (projDivsWHLock.length - lockedCount === 1) {
            return;
        }

        setProjectedDivisionWidthHeight(value);
        projWidthDivHeightArr[projectedWHDivisionIndex] = value;

        const regEx = /^[1-9][0-9]+/
        let totalWidth = parseFloat(heightValue);
        if (isProjDivideOuterHeight) {totalWidth = parseFloat(widthValue);}
        let curDivisionValue = value.trim();
        if (curDivisionValue.length === 0) {curDivisionValue = 0;}
        if (!regex.test(curDivisionValue)) {curDivisionValue = 0;}
        curDivisionValue = parseFloat(curDivisionValue);
        totalWidth -= curDivisionValue;

        let unlockCount = 0, lockValue = 0;
        for (let i = 0; i < projDivsWHLock.length; i++) {
            if (projDivsWHLock[i] === 'unlock') {
                unlockCount += 1;
            }
            else if (projDivsWHLock[i] === 'lock') {
                lockValue += parseInt(projWidthDivHeightArr[i]);
            }
        }

        totalWidth -= lockValue;
        let newDivision = totalWidth / (unlockCount - 1);
        newDivision = Math.round(newDivision * 100) / 100;

        for (let i = 0; i < projWidthDivHeightArr.length; i++) {
            if (projectedWHDivisionIndex !== i && projDivsWHLock[i] === 'unlock') {
                projWidthDivHeightArr[i] = newDivision.toString();
            }
        }
    }
   
    function projWidthDivInputHandler(index) {
        
        let divisionValue = projWidthDivArr[index];
        setProjectedDivisionWidth(divisionValue);
    }

    function projWidthHeightDivInputHandler(index) {
        let divisionValue = projWidthDivHeightArr[index];
        setProjectedDivisionWidthHeight(divisionValue);
    }

    function drawingDoneHandler() {
        setPreviewDrawing(false);
        setFinalSet(false)
        setProjDivideOuterWidth(false);
        setProjDivideOuterHeight(false);
        setProjDivideOuterWidth(false);
        setProjDivideOuterHeight(false);
        setProjWidthDivVal(2);
        setProjWidthDivArr([]);
        setProjectedDivisionWidth('');
        setProjectedDivisionIndex(null);
        setProjectedDivisionInput(false);
        setProjDivsLock([]);
    }

    function divideInnerDrawingDone() {
        let openingDivisions = {
            widthDivision: divWidthVal-1,
            heightDivision: divHeightVal-1,
        };
       
        setOpeningDivisionsObj(openingDivisions);
        setPrevDivision(false);
        setSetDivisions(false);
        setProjOuter(true);
        setProjInner(false)
    }
    // PROJECTED HANDLERS END //

    function addHandler() {
        let trimmedWidth = widthValue.trim();
        let trimmedHeight = heightValue.trim();
        let trimmedQty = qtyValue.trim();

        if (trimmedQty.length === 0) {
            trimmedQty = '1';
        }

        const regex = /[0-9]/;
        let parsedWidth = parseFloat(trimmedWidth);
        let parsedHeight = parseFloat(trimmedHeight);
        let parsedQty = parseInt(trimmedQty);
        
        if (isLimited && (totalPieces >= windowsLimit || parsedQty > windowsLimit)) {
            if (isEdit) {
                let newMsQty = totalPieces - EditMsQty + parsedQty;
                if (newMsQty > windowsLimit) {
                    alufappContext.setOfflineModalVisible(true);
                    return;
                }
            }
            else {
                alufappContext.setOfflineModalVisible(true);
                return;
            }
        }

        if (isLimited && (totalPieces >= windowsLimit || parsedQty > windowsLimit)) {
            if (isEdit) {
                let newMsQty = totalPieces - EditMsQty + parsedQty;
                if (newMsQty > windowsLimit) {
                    alufappContext.setOfflineModalVisible(true);
                    return;
                }
            }
            else {
                alufappContext.setOfflineModalVisible(true);
                return;
            }
        }

        const widthEmpty = trimmedWidth.length === 0;
        const heightEmpty = trimmedHeight.length === 0;
        if (widthEmpty || heightEmpty) {
            window.alert('Invalid Input. Please fill all fields with valid numbers only.');
            return;
        }

        const widthIsNum = regex.test(parsedWidth);
        const heightIsNum = regex.test(parsedHeight);
        const qtyIsNum = regex.test(parsedQty);

        if (!widthIsNum || !heightIsNum || !qtyIsNum) {
            window.alert('Invalid Input. Please fill all fields with valid numbers only.');
            return;
        }

        const widthIsValid = parsedWidth >= 300;
        const heightIsValid = parsedHeight >= 200;
        if (!widthIsValid || !heightIsValid) {
            window.alert('Invalid Input. Measurement is too low. Please enter a valid window dimensions.');
            return;
        }

        const qtyIsValid = (parsedQty + totalPieces) <= qunatityLimit;
        if (!qtyIsValid) {
            window.alert(`Limit Exceeded. Cannot calculate more than ${qunatityLimit} pieces at once. Please split your measurements into smaller parts.`)
            return;
        }

        const widthIsValid2 = parsedWidth <= 5800;
        const heightIsValid2 = parsedHeight <= 5800;
        if (!widthIsValid2 || !heightIsValid2) {
            window.alert('Invalid Input. Please fill all fields with valid numbers only.');
            return;
        }

        const sheetWidth = 3300;
        const sheetHeight = 2250;
        let glassDivisions = 1;
        if (workType === 'Sliding') {
            let panelWidth = parsedWidth / bayValue;
            let panelHeight = parsedHeight - 150;

            let panelValid1 = panelWidth <= sheetWidth && panelHeight <= sheetHeight;
            let panelValid2 = panelHeight <= sheetWidth && panelWidth <= sheetHeight;
            
            if (!panelValid1 && !panelValid2) {
                window.alert('Invalid Input. Please fill all fields with valid numbers only.');
                return;
            }
        }
        else if (workType === 'Sliding-division') {
            let panelWidth = parsedWidth / bayValue;
            let panelHeight = parsedHeight - 150;
            let singleGlassWidth = panelWidth / divWidthVal;
            let singleGlassHeight = panelHeight / divHeightVal;

            let panelValid1 = singleGlassWidth <= sheetWidth && singleGlassHeight <= sheetHeight;
            let panelValid2 = singleGlassHeight <= sheetWidth && singleGlassWidth <= sheetHeight;
            
            if (!panelValid1 && !panelValid2) {
                window.alert('Invalid Input. Please fill all fields with valid numbers only.');
                return;
            }
        }
        else if (workType === 'Fixed') {
            if (outerDivisionLength.length === 0) {
                let panelWidth = parsedWidth - 50;
                let panelHeight = parsedHeight - 50;

                let panelValid1 = panelWidth <= sheetWidth && panelHeight <= sheetHeight;
                let panelValid2 = panelHeight <= sheetWidth && panelWidth <= sheetHeight;
                
                if (!panelValid1 && !panelValid2) {
                    let panelWidthDiv2 = panelWidth / 2;
                    let _2panelValid1 = panelWidthDiv2 <= sheetWidth && panelHeight <= sheetHeight;
                    let _2panelValid2 = panelHeight <= sheetWidth && panelWidthDiv2 <= sheetHeight;
                    glassDivisions = 2;

                    if (!_2panelValid1 && !_2panelValid2) {
                        let panelWidthDiv3 = panelWidth / 3;
                        let _3panelValid1 = panelWidthDiv3 <= sheetWidth && panelHeight <= sheetHeight;
                        let _3panelValid2 = panelHeight <= sheetWidth && panelWidthDiv3 <= sheetHeight;
                        glassDivisions = 3;

                        if (!_3panelValid1 && !_3panelValid2) {
                            window.alert('Invalid Input. Please fill all fields with valid numbers only.');
                            return;
                        }
                    }
                }
            }
            else {
                // console.log(outerDrawingObj)
                // console.log(outerDrawingObj.innerDivisions)
                // console.log(divHeightArr)
            }
        }

        if (isEdit) {
            if (workType === 'Sliding') {
                let editableMs = dimensions[msIndex];
                let prevQty = editableMs.qty;
                let prevArea = editableMs.area;
                let newArea = (parsedWidth/1000) * (parsedHeight/1000) * parsedQty;
                setTotalPieces(totalPieces - prevQty + parsedQty);
                setTotalArea(totalArea - prevArea + newArea);
                dimensions[msIndex].width = parsedWidth;
                dimensions[msIndex].height = parsedHeight;
                dimensions[msIndex].qty = parsedQty;
                dimensions[msIndex].bay = bayValue;
                dimensions[msIndex].area = newArea;
            }
            

            else if (workType === 'Sliding-division') {
                let editableMs = dimensions[msIndex];
                let prevQty = editableMs.qty;
                let prevArea = editableMs.area;
                let newArea = (parsedWidth/1000) * (parsedHeight/1000) * parsedQty;
                setTotalPieces(totalPieces - prevQty + parsedQty);
                setTotalArea(totalArea - prevArea + newArea);
                dimensions[msIndex].width = parsedWidth;
                dimensions[msIndex].height = parsedHeight;
                dimensions[msIndex].qty = parsedQty;
                dimensions[msIndex].bay = bayValue;
                dimensions[msIndex].area = newArea;
                dimensions[msIndex].widthDiv = divWidthVal;
                dimensions[msIndex].heightDiv = divHeightVal;
            }

            else if (workType === 'Fixed') {
                let editableMs = dimensions[msIndex];
                let prevQty = editableMs.qty;
                let prevArea = editableMs.area;
                let newArea = (parsedWidth/1000) * (parsedHeight/1000) * parsedQty;
                setTotalPieces(totalPieces - prevQty + parsedQty);
                setTotalArea(totalArea - prevArea + newArea);
                dimensions[msIndex].width = parsedWidth;
                dimensions[msIndex].height = parsedHeight;
                dimensions[msIndex].qty = parsedQty;
                dimensions[msIndex].area = newArea;
                dimensions[msIndex].outerDivision = outerDivisionLength;
                // dimensions[msIndex].openings = openingsMeasurement;
                // dimensions[msIndex].openingDivision = openingsDivisionsObj;
                dimensions[msIndex].openingCount = 0;

                setOuterDivisionsLength([]);
                setOuterDrawingObj(null);
                // setOpeningDivisionsObj({widthDivision: 0, heightDivision: 0});
                setDivWidthVal(1);
                setDivHeightVal(1);
                setDivWidthArr([1]);
                setDivHeightArr([1]);
                setDrawingArr1([]);
                // setInnerDivisionsArr([]);
                // setDivideInnerPreviewWidth(null);
                // setDivideInnerPreviewHeight(null);
                // alufabContext.pushOpening([]);
            }
            else {
                if (workType === 'Hinge' || workType === 'Swing') {
                    if (parsedWidth < doorLowestWidth || parsedHeight < doorLowetHeight) {
                        window.alert(`Invalid Input. Door measurement is too small. Please resize to a standard door measurement (e.g., 800 x 2100).`);
                        return;
                    }
                }
                
                let editableMs = dimensions[msIndex];
                let prevQty = editableMs.qty;
                let prevArea = editableMs.area;
                let newArea = (parsedWidth/1000) * (parsedHeight/1000) * parsedQty;
                setTotalPieces(totalPieces - prevQty + parsedQty);
                setTotalArea(totalArea - prevArea + newArea);
                dimensions[msIndex].width = parsedWidth;
                dimensions[msIndex].height = parsedHeight;
                dimensions[msIndex].qty = parsedQty;
                dimensions[msIndex].area = newArea;
                dimensions[msIndex].outerDivision = outerDivisionLength;
                dimensions[msIndex].openings = openingsMeasurement;
                dimensions[msIndex].openingDivision = openingsDivisionsObj;
                dimensions[msIndex].openingCount = openingsMeasurement.length === 0 ? 1 : openingsMeasurement.length;

                setOuterDivisionsLength([]);
                setOuterDrawingObj(null);
                setOpeningDivisionsObj({widthDivision: 0, heightDivision: 0});
                setDivWidthVal(1);
                setDivHeightVal(1);
                setDivWidthArr([1]);
                setDivHeightArr([1]);
                setDrawingArr1([]);
                setInnerDivisionsArr([]);
                setDivideInnerPreviewWidth(null);
                setDivideInnerPreviewHeight(null);
                alufappContext.pushOpening([]);
            }

            setEdit(false);
            setMsIndex(null);
            setRemEditMs(false);
        }

        else {
            if (workType === 'Hinge' || workType === 'Swing') {
                if (parsedWidth < doorLowestWidth || parsedHeight < doorLowetHeight) {
                    window.alert(`Invalid Input. Door measurement is too small. Please resize to a standard door measurement (e.g., 800 x 2100).`);
                    return;
                }
            }

            
    
            let area = (parsedWidth/1000) * (parsedHeight/1000);
            area = area * parsedQty;
            setTotalArea(totalArea + area);
            setTotalPieces(totalPieces + parsedQty);

            
            let sameMs = false, sameIndex = -1;
            if (workType === 'Sliding') {
                for (let i = 0; i < dimensions.length; i++) {
                    let dimWidth = dimensions[i].width;
                    let dimHeight = dimensions[i].height;
                    let dimBay = dimensions[i].bay;

                    if (parsedWidth === dimWidth && parsedHeight === dimHeight && bayValue === dimBay) {
                        sameMs = true;
                        sameIndex = i;
                        break;
                    }
                }
                
                if (sameMs) {
                    let dims = dimensions;
                    let sameQty = dims[sameIndex].qty; 
                    dims[sameIndex].qty = sameQty + parsedQty;

                    setDimensions(dims);
                }
                else {
                    let count = msCount;
                    count += 1;
                    setMsCount(count);

                    setDimensions([
                        ...dimensions,
                        {
                            num: count,
                            width: parsedWidth,
                            height: parsedHeight,
                            qty: parsedQty,
                            bay: bayValue,
                            area: area,
                        }
                    ]);
                }
            }
            else if (workType === 'Sliding-division') {
                for (let i = 0; i < dimensions.length; i++) {
                    let dimWidth = dimensions[i].width;
                    let dimHeight = dimensions[i].height;
                    let dimBay = dimensions[i].bay;
                    let dimWidthDiv = dimensions[i].widthDiv;
                    let dimHeightDiv = dimensions[i].heightDiv;

                    if (parsedWidth === dimWidth && parsedHeight === dimHeight && bayValue === dimBay
                        && divWidthVal === dimWidthDiv && divHeightVal === dimHeightDiv
                    ) {
                        sameMs = true;
                        sameIndex = i;
                        break;
                    }
                }
                
                if (sameMs) {
                    let dims = dimensions;
                    let sameQty = dims[sameIndex].qty; 
                    dims[sameIndex].qty = sameQty + parsedQty;

                    setDimensions(dims);
                }
                else {
                    let count = msCount;
                    count += 1;
                    setMsCount(count);
                    
                    setDimensions([
                        ...dimensions,
                        {
                            num: count,
                            width: parsedWidth,
                            height: parsedHeight,
                            widthDiv: divWidthVal,
                            heightDiv: divHeightVal,
                            qty: parsedQty,
                            bay: bayValue,
                            area: area,
                        }
                    ]);
                }
                
            }
            else if (workType === 'Fixed') {
                for (let i = 0; i < dimensions.length; i++) {
                    let isSameDims = parsedWidth === dimensions[i].width && parsedHeight ===  dimensions[i].height;
                    let isSameOuterDiv = true;

                    if (outerDivisionLength.length === (dimensions[i].outerDivision).length) {
                        let outerDiv = dimensions[i].outerDivision;
                        for (let j = 0; j < outerDivisionLength.length; j++) {
                            if (outerDivisionLength[j] !== outerDiv[j]) {
                                isSameOuterDiv = false;
                                break;
                            }
                        }
                    }
                    else {
                        isSameOuterDiv = false;
                    }

                    if (isSameDims && isSameOuterDiv) {
                            sameMs = true;
                            sameIndex = i;
                            break;
                        }

                }

                if (sameMs) {
                    let dims = dimensions;
                    let sameQty = dims[sameIndex].qty; 
                    dims[sameIndex].qty = sameQty + parsedQty;

                    setDimensions(dims);
                }
                else {
                    

                    const glassDimensions = [];
                    if (innerDivisionsArr.length > 0) {
                        for (let i = 0; i < drawwingArr1.length; i++) {
                            let column = innerDivisionsArr[i];
                            if (column.length === 0) {
                                glassDimensions.push({
                                    width: drawwingArr1[i].width - 50,
                                    height: drawwingArr1[i].height - 50,
                                    area: ((drawwingArr1[i].width - 50) * (drawwingArr1[i].height - 50)) / 1000000,
                                });
                            }
                            else {
                                for (let j = 0; j < column.length; j++) {
                                    glassDimensions.push({
                                        width: column[j].width - 50,
                                        height: column[j].height - 50,
                                        area: ((column[j].width - 50) * (column[j].height - 50)) / 1000000,
                                    });
                                }
                            }
                        }
                    }
                    else {
                        
                        if (drawwingArr1.length > 0) {
                            
                            for (let i = 0; i < drawwingArr1.length; i++) {
                                glassDimensions.push({
                                    width: drawwingArr1[i].width - 55,
                                    height: drawwingArr1[i].height - 55,
                                    area: ((drawwingArr1[i].width - 55) * (drawwingArr1[i].height - 55)) / 1000000,
                                });
                            }
                        }
                        else {
                            for (let i = 0; i < glassDivisions; i++) {
                                let glassWidth = (parseInt(widthValue) / glassDivisions) - 30;
                                let glassHeight = parseInt(heightValue) - 50;

                                glassDimensions.push({
                                    width: glassWidth,
                                    height: glassHeight,
                                    area: (glassWidth * glassHeight) / 1000000,
                                });
                            }
                            
                        }
                    }
                    
                    // CHECKING FOR INVALID GLASS SIZE
                    let invalids = [], invalidsIndex = [];
                    for (let i = 0; i < glassDimensions.length; i++) {
                        let glassWidth = glassDimensions[i].width;
                        let glassHeight = glassDimensions[i].height;

                        let panelWidth = glassWidth - 30;
                        let panelHeight = glassHeight - 30;

                        let panelValid1 = panelWidth <= sheetWidth && panelHeight <= sheetHeight;
                        let panelValid2 = panelHeight <= sheetWidth && panelWidth <= sheetHeight;

                        if (!panelValid1 && !panelValid2) {
                            invalids.push(glassDimensions[i]);
                            invalidsIndex.push(i);
                        }
                    }

                    
                    if (invalids.length > 0) {
                        let glassDivs = [];
                        for (let i = 0; i < invalids.length; i++) {
                            let glassWidth = invalids[i].width / 2;
                            let glassHeight = invalids[i].height;

                            let panelWidth = glassWidth;
                            let panelHeight = glassHeight;

                            let panelValid1 = panelWidth <= sheetWidth && panelHeight <= sheetHeight;
                            let panelValid2 = panelHeight <= sheetWidth && panelWidth <= sheetHeight;

                            if (!panelValid1 && !panelValid2) {
                                let glassWidth = invalids[i].width / 3;
                                let glassHeight = invalids[i].height;

                                let panelWidth = glassWidth;
                                let panelHeight = glassHeight;

                                let panelValid1 = panelWidth <= sheetWidth && panelHeight <= sheetHeight;
                                let panelValid2 = panelHeight <= sheetWidth && panelWidth <= sheetHeight;
                                if (!panelValid1 && !panelValid2) {
                                    window.alert('Invalid Input. Please fill all fields with valid numbers only.');
                                    return;
                                }
                                else {
                                    glassDivs.push({
                                        width: glassWidth,
                                        height: glassHeight,
                                        area: (glassWidth * glassHeight) / 1000000,
                                    });
                                    glassDivs.push({
                                        width: glassWidth,
                                        height: glassHeight,
                                        area: (glassWidth * glassHeight) / 1000000,
                                    });
                                    glassDivs.push({
                                        width: glassWidth,
                                        height: glassHeight,
                                        area: (glassWidth * glassHeight) / 1000000,
                                    });
                                }
                            }
                            else {
                                glassDivs.push({
                                    width: glassWidth,
                                    height: glassHeight,
                                    area: (glassWidth * glassHeight) / 1000000,
                                });
                                glassDivs.push({
                                    width: glassWidth,
                                    height: glassHeight,
                                    area: (glassWidth * glassHeight) / 1000000,
                                });
                            }
                        }
                        
                       // CLEARING INVALID GLASS SIZE
                        for (let i = 0; i < invalidsIndex.length; i++) {
                            glassDimensions.splice(invalidsIndex[i], 1);
                        }

                        // INSERTING DIVIDED GLASSES
                        for (let i = 0; i < glassDivs.length; i++) {
                            glassDimensions.push(glassDivs[i]);
                        }
                    }
                    

                    let count = msCount;
                    count += 1;
                    setMsCount(count);

                    setDimensions([
                        ...dimensions,
                        {
                            num: count,
                            width: parsedWidth,
                            height: parsedHeight,
                            qty: parsedQty,
                            area: area,
                            outerDivision: outerDivisionLength,
                            glassDimensions: glassDimensions,
                            openingCount: 0,
                        }
                    ]);
                }
                setOuterDivisionsLength([]);
                setOuterDrawingObj(null);
                setDivWidthVal(1);
                setDivHeightVal(1);
                setDivWidthArr([1]);
                setDivHeightArr([1]);
                setDrawingArr1([]);
                setInnerDivisionsArr([]);
            }
            else {
                for (let i = 0; i < dimensions.length; i++) {
                    let isSameDims = parsedWidth === dimensions[i].width && parsedHeight ===  dimensions[i].height;
                    let isSameOuterDiv = true;
                    let isSameOpenings = true;
                    let isSameOpeningDiv = true;

                    if (outerDivisionLength.length === (dimensions[i].outerDivision).length) {
                        let outerDiv = dimensions[i].outerDivision;
                        for (let j = 0; j < outerDivisionLength.length; j++) {
                            if (outerDivisionLength[j] !== outerDiv[j]) {
                                isSameOuterDiv = false;
                                break;
                            }
                        }
                    }
                    else {
                        isSameOuterDiv = false;
                    }

                    let dimOpenings = dimensions[i].openings;
                    if (openingsMeasurement.length === dimOpenings.length) {
                        for (let i = 0; i < openingsMeasurement.length; i++) {
                            let isSameWidth = openingsMeasurement[i].width === dimOpenings[i].width;
                            let isSameHeight = openingsMeasurement[i].height === dimOpenings[i].height;

                            if (!isSameWidth || !isSameHeight) {
                                isSameOpenings = false;
                                break;
                            }
                        }
                    }
                    else {
                        isSameOpenings = false;
                    }

                    let dimOpeningDiv = dimensions[i].openingDivision;
                    let isSamewidthDiv = openingsDivisionsObj.widthDivision === dimOpeningDiv.widthDivision;
                    let isSameHeightDiv = openingsDivisionsObj.heightDivision === dimOpeningDiv.heightDivision;

                    if (!isSamewidthDiv || !isSameHeightDiv) {
                        isSameOpeningDiv = false;
                    }

                    if (isSameDims && isSameOuterDiv && isSameOpenings && isSameOpeningDiv) {
                        sameMs = true;
                        sameIndex = i;
                        break;
                    }
                }
                
                if (sameMs) {
                    let dims = dimensions;
                    let sameQty = dims[sameIndex].qty; 
                    dims[sameIndex].qty = sameQty + parsedQty;

                    setDimensions(dims);
                }
                else {
                    
                    
                    const glassDimensions = [];
                    if (innerDivisionsArr.length > 0) {
                        for (let i = 0; i < drawwingArr1.length; i++) {
                            let column = innerDivisionsArr[i];
                            if (column.length === 0) {
                                glassDimensions.push({
                                    width: drawwingArr1[i].width - 50,
                                    height: drawwingArr1[i].height - 50,
                                    area: ((drawwingArr1[i].width - 50) * (drawwingArr1[i].height - 50)) / 1000000,
                                });
                            }
                            else {
                                for (let j = 0; j < column.length; j++) {
                                    glassDimensions.push({
                                        width: column[j].width - 50,
                                        height: column[j].height - 50,
                                        area: ((column[j].width - 50) * (column[j].height - 50)) / 1000000,
                                    });
                                }
                            }
                        }
                    }
                    else {
                        if (drawwingArr1.length > 0) {
                            for (let i = 0; i < drawwingArr1.length; i++) {
                                glassDimensions.push({
                                    width: drawwingArr1[i].width - 55,
                                    height: drawwingArr1[i].height - 55,
                                    area: ((drawwingArr1[i].width - 55) * (drawwingArr1[i].height - 55)) / 1000000,
                                });
                            }
                        }
                        else {
                            glassDimensions.push({
                                width: parseInt(widthValue) - 100,
                                height: parseInt(heightValue) - 100,
                                area: ((parseInt(widthValue) - 100) * (parseInt(heightValue) - 100)) / 1000000,
                            });
                        }
                    }
                    
                    // CHECKING FOR INVALID GLASS SIZE
                    let invalids = [], invalidsIndex = [];
                    for (let i = 0; i < glassDimensions.length; i++) {
                        let glassWidth = glassDimensions[i].width;
                        let glassHeight = glassDimensions[i].height;

                        let panelWidth = glassWidth - 30;
                        let panelHeight = glassHeight - 30;

                        let panelValid1 = panelWidth <= sheetWidth && panelHeight <= sheetHeight;
                        let panelValid2 = panelHeight <= sheetWidth && panelWidth <= sheetHeight;

                        if (!panelValid1 && !panelValid2) {
                            invalids.push(glassDimensions[i]);
                            invalidsIndex.push(i);
                        }
                    }

                    
                    if (invalids.length > 0) {
                        let glassDivs = [];
                        for (let i = 0; i < invalids.length; i++) {
                            let glassWidth = invalids[i].width / 2;
                            let glassHeight = invalids[i].height;

                            let panelWidth = glassWidth;
                            let panelHeight = glassHeight;

                            let panelValid1 = panelWidth <= sheetWidth && panelHeight <= sheetHeight;
                            let panelValid2 = panelHeight <= sheetWidth && panelWidth <= sheetHeight;

                            if (!panelValid1 && !panelValid2) {
                                let glassWidth = invalids[i].width / 3;
                                let glassHeight = invalids[i].height;

                                let panelWidth = glassWidth;
                                let panelHeight = glassHeight;

                                let panelValid1 = panelWidth <= sheetWidth && panelHeight <= sheetHeight;
                                let panelValid2 = panelHeight <= sheetWidth && panelWidth <= sheetHeight;
                                if (!panelValid1 && !panelValid2) {
                                    window.alert('Invalid Input. Please fill all fields with valid numbers only.');
                                    return;
                                }
                                else {
                                    glassDivs.push({
                                        width: glassWidth,
                                        height: glassHeight,
                                        area: (glassWidth * glassHeight) / 1000000,
                                    });
                                    glassDivs.push({
                                        width: glassWidth,
                                        height: glassHeight,
                                        area: (glassWidth * glassHeight) / 1000000,
                                    });
                                    glassDivs.push({
                                        width: glassWidth,
                                        height: glassHeight,
                                        area: (glassWidth * glassHeight) / 1000000,
                                    });
                                }
                            }
                            else {
                                glassDivs.push({
                                    width: glassWidth,
                                    height: glassHeight,
                                    area: (glassWidth * glassHeight) / 1000000,
                                });
                                glassDivs.push({
                                    width: glassWidth,
                                    height: glassHeight,
                                    area: (glassWidth * glassHeight) / 1000000,
                                });
                            }
                        }
                        
                       // CLEARING INVALID GLASS SIZE
                        for (let i = 0; i < invalidsIndex.length; i++) {
                            glassDimensions.splice(invalidsIndex[i], 1);
                        }

                        // INSERTING DIVIDED GLASSES
                        for (let i = 0; i < glassDivs.length; i++) {
                            glassDimensions.push(glassDivs[i]);
                        }
                    }

                    let count = msCount;
                    count += 1;
                    setMsCount(count);

                    setDimensions([
                        ...dimensions,
                        {
                            num: count,
                            width: parsedWidth,
                            height: parsedHeight,
                            qty: parsedQty,
                            area: area,
                            glassDimensions: glassDimensions,
                            outerDivision: outerDivisionLength,
                            openings: openingsMeasurement,
                            openingDivision: openingsDivisionsObj,
                            openingCount: openingsMeasurement.length === 0 ? 1 : openingsMeasurement.length,
                        }
                    ]);
                }
                setOuterDivisionsLength([]);
                setOuterDrawingObj(null);
                setOpeningDivisionsObj({widthDivision: 0, heightDivision: 0});
                setDivWidthVal(1);
                setDivHeightVal(1);
                setDivWidthArr([1]);
                setDivHeightArr([1]);
                setDrawingArr1([]);
                setInnerDivisionsArr([]);
                setDivideInnerPreviewWidth(null);
                setDivideInnerPreviewHeight(null);
                alufappContext.pushOpening([]);
            }
           
        }

        setWidthValue('');
        setHeightValue('');
        setQtyValue('');
        setBayValue(2);
        // ToastAndroid.show('Measurement added', 3000);
    }

    function removeHandler() {
        let editableMs = dimensions[msIndex];
        let qty = editableMs.qty;
        let area = editableMs.area;
        let index = msIndex;
        index += 1;

        let newDims = dimensions.filter((item) => {
            if (item.num !== index) {
                return item;
            }
        });

        for (let i = 0; i < newDims.length; i++) {
            newDims[i].num = i+1;
        }

        setTotalPieces(totalPieces - qty);
        setTotalArea(totalArea - area);
        setDimensions(newDims);
        setMsCount(msCount -1);
        setRemove(false);
        setRemEditMs(false);
        setMsIndex(null);
        // console.log(newDims)
    }

    function editHandler() {
        if (workType === 'Sliding') {
            let editableMs = dimensions[msIndex];
            let width = editableMs.width;
            let height = editableMs.height;
            let qty = editableMs.qty;
            let bay = editableMs.bay;

            setWidthValue(width.toString());
            setHeightValue(height.toString());
            setQtyValue(qty.toString());
            setBayValue(bay.toString());
            setEditMsQty(qty);
        }

        else if (workType === 'Sliding-division') {
            let editableMs = dimensions[msIndex];
            let width = editableMs.width;
            let height = editableMs.height;
            let qty = editableMs.qty;
            let bay = editableMs.bay;
            let widthDiv = editableMs.widthDiv;
            let heightDiv = editableMs.heightDiv;

            setWidthValue(width.toString());
            setHeightValue(height.toString());
            setQtyValue(qty.toString());
            setBayValue(bay.toString());
            setDivWidthVal(widthDiv);
            setDivHeightVal(heightDiv);
            setEditMsQty(qty);
        }

        else {
            let editableMs = dimensions[msIndex];
            let width = editableMs.width;
            let height = editableMs.height;
            let qty = editableMs.qty;

            setWidthValue(width.toString());
            setHeightValue(height.toString());
            setQtyValue(qty.toString());
            setEditMsQty(qty);
        }

        setEdit(true);
    }

    
    function doneHandler() {
        if (currentWorkArea !== null) {
            alufappContext.setPreviousWorkArea(currentWorkArea) // set previous work area
        }

        alufappContext.setCurrentWorkArea(totalArea);

        navigation.navigate(
            'MaterialsOptions', {
                dimensions: dimensions,
                workType: workType, 
                profileType: profileType,
                workTitle: workTitle,
                totalPieces: totalPieces,
            }
        );
    }

    return (
        <View style={styles.container}>
            <RequirePaymentModal
             info1="Payment required"
             info2={`You can only work up to ${windowsLimit} ${windowDoorType} in limited mode. Pay ${amountPayable} and work more windows`}
             info3="Pay"
             page='mat-dimension'
            />
            <AlufappToast toastVisible={isToast && isWhichToast == 'mat-pay-success'} info='Transaction successful'/>
            <AlufappToast toastVisible={isToast && isWhichToast == 'mat-dimension-pay-cancel'} info='Transaction cancelled'/>
            <PreviewDivision 
             isVisible={isPreviewDivision}
             workType={workType}
             frameWidth={divideInnerPreviewWidth}
             frameHeight={divideInnerPreviewHeight}
             widthDivision={divWidthVal}
             heightDivision={divHeightVal}
             widthArr={divWidthArr}
             heightArr={divHeightArr}
             donePress={divideInnerDrawingDone}
             onPress={() => {setPrevDivision(false)}}
            />
            <PreviewDrawing
             isVisible={isPreviewDrawing}
             msWidth={widthValue}
             msHeight={heightValue}
             divisions={drawwingArr1}
             divisionsIn={innerDivisionsArr}
             direction={divisionDirection}
             doneoPress={drawingDoneHandler}
             isFinal={isFinalSet}
            //  openDimensions={openings}
             type={workType}
             onPress={() => {
                setPreviewDrawing(false);
                if (isFinalSet) {setFinalSet(false)}
             }}
            />
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
                    ]}>Dimensions</Text>
                    <View style={{width: deviceWidth < 800 ? 0 : 200, height:0,}}></View>
                </View>
            </View>
            <View style={{flex: 1}}>
                <View style={{alignItems: 'center', flex: 1}}>
                    <View style={[
                        {
                            width: deviceWidth < 500 ? '100%' : ( deviceWidth < 800 ? '80%' : deviceWidth < 100 ? '60%' : '50%'),
                            // paddingHorizontal: deviceWidth < 500 ? 15 : 5,
                            alignItems: 'center',
                            backgroundColor: '#484D6D',
                            paddingBottom: 15,
                            // backgroundColor: 'blue',
                        }
                     ]}>
                        {/* Work type & profile */}
                        <View style={styles.otherInfo}>
                            <View style={styles.workType}>
                                <Text style={styles.txtWorkType}>{workType} {
                                    workType === 'Hinge' || workType === 'Swing' ? 'Doors' : 'Windows'}</Text>
                            </View>
                            <View style={styles.profileType}>
                                <Text style={styles.txtProfileType}>{profileType}</Text>
                            </View>
                        </View>
                        {/* Measurement title */}
                        <View style={styles.msInputLbl}>
                            <Text style={styles.txtMsInputLbl}>Measurement</Text>
                            <Text style={styles.txtMsCount}>{msCount}</Text>
                        </View>
                        {/* Measurement inputs */}
                        <View style={styles.dimensionsInputs}>
                            <View style={styles.widthInputCon}>
                                <TextInput
                                cursorColor='rgba(250, 50, 150, 0.8)'
                                maxLength={4}
                                readOnly={isSetDivisions}
                                style={styles.widthInput}
                                placeholder="width"
                                keyboardType="numeric"
                                value={widthValue}
                                onChangeText={setWidthValue}
                                />
                            </View>
                            <View style={styles.heightInputCon}>
                                <TextInput
                                cursorColor='rgba(250, 50, 150, 0.8)'
                                maxLength={4}
                                readOnly={isSetDivisions}
                                style={styles.heightInput}
                                placeholder="height"
                                keyboardType="numeric"
                                value={heightValue}
                                onChangeText={setHeightValue}
                                />
                            </View>
                            <View style={styles.qtyInputCon}>
                                <TextInput
                                cursorColor='rgba(250, 50, 150, 0.8)'
                                maxLength={3}
                                readOnly={isSetDivisions}
                                style={styles.qtyInput}
                                placeholder="qty: 1"
                                keyboardType="numeric"
                                value={qtyValue}
                                onChangeText={setQtyValue}
                                />
                            </View>                                             
                        </View>
                        {/* Sliding divisions buttons */}
                        <View style={[
                            styles.slidingDivCon,
                            {display: workType === 'Sliding-division' ? 'flex' : 'none'}
                        ]}
                        >
                            <View style={styles.divideInnerWidthCon}>
                                <View style={styles.iconDivideWidthCon}>
                                    <View style={styles.iconDivideWidthIn}></View>
                                </View>
                                <Text style={styles.txtDivideWidthProj}>Width divisions:</Text>
                                <Text style={styles.txtDivideInnerVal}>{divWidthVal}</Text>
                                <Pressable style={({pressed}) => [
                                    styles.divideInnerDec,
                                    pressed && {backgroundColor: 'rgba(0,0,0,0.5)'}
                                ]}
                                onPress={decreaseDivWidth}
                                >
                                    <Ionicons name="chevron-down-outline" size={16} color='grey'/>
                                </Pressable>
                                <Pressable style={({pressed}) => [
                                    styles.divideInnerInc,
                                    pressed && {backgroundColor: 'rgba(0,0,0,0.5)'}
                                ]}
                                onPress={increaseDivWidth}
                                >
                                    <Ionicons name="chevron-up-outline" size={16} color='grey'/>
                                </Pressable>
                            </View>
                            <View style={styles.divideInnerHeightConSlide}>
                                <View style={styles.iconDivideWidthCon}>
                                    <View style={styles.iconDivideHeightIn}></View>
                                </View>
                                <Text style={styles.txtDivideWidthProj}>Height divisions:</Text>
                                <Text style={styles.txtDivideInnerVal}>{divHeightVal}</Text>
                                <Pressable style={({pressed}) => [
                                    styles.divideInnerDec,
                                    pressed && {backgroundColor: 'rgba(50,0,30,0.5)'}
                                ]}
                                onPress={decreaseDivHeight}
                                >
                                    <Ionicons name="chevron-down-outline" size={16} color='grey'/>
                                </Pressable>
                                <Pressable style={({pressed}) => [
                                    styles.divideInnerInc,
                                    pressed && {backgroundColor: 'rgba(50,0,30,0.5)'}
                                ]}
                                onPress={increaseDivHeight}
                                >
                                    <Ionicons name="chevron-up-outline" size={16} color='grey'/>
                                </Pressable>
                            </View>
                        </View>
                        {/* SLIDING BAY BUTTONS & PREVIEW & ADD BUTTONS*/}
                        <View style={[
                            styles.slidingBtnsCon,
                            {display: workType === 'Sliding' || workType === 'Sliding-division' ? 'flex' : 'none'}
                        ]}>
                            <View style={styles.bayCon}>
                                <View style={styles.txtBayCon}>
                                    <Text style={styles.txtBay}>{bayValue} Bay</Text>
                                </View>
                                <View style={styles.incDecCon}>
                                    <Pressable style={({pressed}) => [
                                        styles.btnDecBay,
                                        styles.btnIncDecBay,
                                        pressed && styles.incDecPressed
                                    ]}
                                    onPress={decreaseBay}
                                    >
                                        <Ionicons name="chevron-down-outline" size={20} color='#E0D0C1'/>
                                    </Pressable>
                                    <Pressable style={({pressed}) => [
                                        styles.btnIncBay,
                                        styles.btnIncDecBay,
                                        pressed && styles.incDecPressed
                                    ]}
                                    onPress={increaseBay}
                                    >
                                        <Ionicons name="chevron-up-outline" size={20} color='#E0D0C1'/>
                                    </Pressable>
                                </View>
                            </View>
                            {/* DIVISION SLLIDING PREVIEW BUTTON */}
                            <Pressable style={({pressed}) => [
                                styles.previewDivision,
                                {display: workType === 'Sliding-division' ? 'flex' : 'none'},
                            ]}
                            onPress={previewSlidingDivisionHandler}
                            >
                                {({pressed}) => (
                                    <Text style={[
                                        {color: widthValue.length > 2 && heightValue.length > 2 ? '#ff9' : 'grey',},
                                        styles.txtPreviewDiv, 
                                        pressed && styles.previewDivPressed
                                    ]}>Preview</Text>
                                )}
                            </Pressable>
                            <View style={styles.addBtnCon}>
                                <Pressable style={({pressed}) => [
                                    styles.addBtn,
                                    pressed && styles.addBtnPressed
                                ]}
                                onPress={addHandler}
                                >
                                    <Ionicons name="add" size={25} color='#E0D0C1'/>
                                    {/* <Text style={styles.txtAddBtn}>Add</Text> */}
                                </Pressable>
                            </View>
                        </View>
                        {/* PROJECTED WINDOWS INPUTS AND BUTTONS */}
                        <View style={{width: '100%', display: workType === 'Sliding' || workType === 'Sliding-division' ? 'none' : 'flex'}}>
                            <View style={[
                                styles.projectedCon,
                                {display: isSetDivisions && !(isProjDivideOuterWidth || isProjDivideOuterHeight) && workType !== 'Fixed' ? 'flex' : 'none'}
                            ]}>
                                <Pressable style={[
                                    styles.btnDivideProj,
                                    {backgroundColor: isProjOuter ? '#175676' : 'transparent'}
                                ]}
                                onPress={() => {setProjOuter(true);setProjInner(false)}}
                                >
                                    <Text style={styles.txtDivideProj}>Divide outer</Text>
                                </Pressable>
                                <Pressable style={[
                                    styles.btnDivideProj,
                                    {backgroundColor: isProjInner ? '#175676' : 'transparent'}
                                ]}
                                onPress={divideInnerHandler}
                                >
                                    <Text style={styles.txtDivideProj}>Divide inner</Text>
                                </Pressable>
                            </View>
                            <View style={styles.projDivCompCon}>
                                {/* ----- DIVIDE INNER SECTION ------- */}
                                <View style={[styles.divideOuterProj, {display: isSetDivisions && isProjOuter ? 'flex' : 'none'}]}>
                                    <Pressable style={({pressed}) => [
                                        {display: isProjDivideOuterHeight ? 'none' : 'flex'},
                                        styles.btnDivideWidthProj,
                                        pressed && {backgroundColor: 'rgba(0,0,0,0.4)'}
                                    ]}
                                    onPress={() => {
                                        if (isProjOuter && outerDivisionLength.length > 0) {
                                            setOuterWidth(true);
                                            setOuterHeight(false);

                                            const response = window.confirm('Dvision already set.\n Press ok to reset.');

                                            if (response) {
                                                setFinalSet(false);

                                                if (isProjOuter) {
                                                    setOuterDivisionsLength(false);
                                                    setOuterDrawingObj(null);
                                                }

                                                if (isOuterWidth) {
                                                    setProjDivideOuterWidth(true);
                                                    projDivideOuterWidthHandler('divide-width');
                                                }
                                                else if (isOuterHeight) {
                                                    setProjDivideOuterHeight(true);
                                                    projDivideOuterWidthHandler('divide-height');
                                                }
                                            }
                                            // return;
                                        }
                                        else {
                                            setProjDivideOuterWidth(true);
                                            projDivideOuterWidthHandler('divide-width');
                                        }
                                    }}
                                    >
                                        <View style={styles.iconDivideWidthCon}>
                                            <View style={styles.iconDivideWidthIn}></View>
                                        </View>
                                        <Text style={styles.txtDivideWidthProj}>{isProjInner ? 'Divide inner width then height' : 'Divide outer width then height'}</Text>
                                    </Pressable>
                                    <Pressable style={({pressed}) => [
                                        {display: isProjDivideOuterWidth ? 'none' : 'flex'},
                                        styles.btnDivideWidthProj,
                                        pressed && {backgroundColor: 'rgba(0,0,0,0.4)'}
                                    ]}
                                    // onPress={projDivideOuterHeightHandler}
                                    onPress={() => {
                                        if (isProjOuter && outerDivisionLength.length > 0) {
                                            setOuterWidth(false);
                                            setOuterHeight(true);
                                            const response = window.confirm('Dvision already set.\n Press ok to reset.');

                                            if (response) {
                                                setFinalSet(false);

                                                if (isProjOuter) {
                                                    setOuterDivisionsLength(false);
                                                    setOuterDrawingObj(null);
                                                }

                                                if (isOuterWidth) {
                                                    setProjDivideOuterWidth(true);
                                                    projDivideOuterWidthHandler('divide-width');
                                                }
                                                else if (isOuterHeight) {
                                                    setProjDivideOuterHeight(true);
                                                    projDivideOuterWidthHandler('divide-height');
                                                }
                                            }
                                        }
                                        else {
                                            setProjDivideOuterHeight(true);
                                            projDivideOuterWidthHandler('divide-height');
                                        }
                                    }}
                                    >
                                        <View style={styles.iconDivideWidthCon}>
                                            <View style={styles.iconDivideHeightIn}></View>
                                        </View>
                                        <Text style={styles.txtDivideWidthProj}>{isProjInner ? 'Divide inner height then width' : 'Divide outer height then width'}</Text>
                                    </Pressable>
                                    <Pressable style={({pressed}) => [
                                        styles.btnDivideWidthProj,
                                        {display: isProjDivideOuterWidth || isProjDivideOuterHeight ? 'none' : 'flex'},
                                        pressed && {backgroundColor: 'rgba(0,0,0,0.4)'}
                                    ]}
                                    onPress={() => {
                                        if (outerDrawingObj === null) {return}
                                        setDrawingArr1(outerDrawingObj.divisions);
                                        setInnerDivisionsArr(outerDrawingObj.innerDivisions);
                                        setDivisionDirection(outerDrawingObj.direction)
                                        setPreviewDrawing(true);
                                        
                                    }}>
                                        <Ionicons name="expand-outline" size={20} color='rgba(255,255,255,0.6)'/>
                                        <Text style={styles.txtDivideWidthProj}>Preview</Text>
                                    </Pressable>
                                    <Pressable style={({pressed}) => [
                                        styles.btnDivideWidthProj,
                                        {display: isProjDivideOuterWidth || isProjDivideOuterHeight ? 'none' : 'flex'},
                                        pressed && {backgroundColor: 'rgba(0,0,0,0.4)'}
                                    ]}
                                    onPress={() => {
                                        setSetDivisions(false);
                                    }}>
                                        <Ionicons name="close-circle" size={20} color='rgba(255,255,255,0.6)'/>
                                        <Text style={styles.txtDivideWidthProj}>Close</Text>
                                    </Pressable>
                                </View>
                                <View style={[styles.projDivOuter]}>
                                    <View style={[styles.widthCon, {display: isProjDivideOuterWidth || isProjDivideOuterHeight ? 'flex' : 'none'}]}>
                                        <View style={[styles.projDivWidth, {display: isDivideDivision ? 'none' : 'flex'}]}>
                                            <View style={styles.projDivWidthLbl}>
                                                <Text style={styles.txtProjDivWidth}>Divisions:</Text>
                                            </View>
                                            <View style={styles.projDivWidthVal}>
                                                <Text style={styles.txtProjDivWidthVal}>{projWidthDivVal}</Text>
                                            </View>
                                            <View style={styles.projDivWidthBtns}>
                                                <Pressable style={({pressed}) => [
                                                    styles.btnProjDivWidth, 
                                                    pressed && styles.incDivPressed
                                                ]}
                                                onPress={decProjWidthDiv}
                                                >
                                                    <Ionicons name="chevron-down-outline" size={20} color='grey'/>
                                                </Pressable>
                                                <Pressable style={({pressed}) => [
                                                    styles.btnProjDivWidth, 
                                                    pressed && styles.incDivPressed
                                                ]}
                                                onPress={incProjWidthDiv}
                                                >
                                                    <Ionicons name="chevron-up-outline" size={20} color='grey'/>
                                                </Pressable>
                                            </View>
                                        </View>
                                        <ScrollView style={[styles.projWidthDivisions, {display: isDivideDivision ? 'none' : 'flex'}]}
                                        keyboardShouldPersistTaps="always">
                                                {projWidthDivArr.map((item, index) => (
                                                <View key={'proj-div'+index} style={{
                                                    flexDirection: 'row',
                                                }}>
                                                    <View style={styles.projDivisionCon} >
                                                        <View style={styles.projDivisionLbl}>
                                                            <Text style={styles.txtProjDivision}>Division {index+1}</Text>
                                                        </View>
                                                        <TextInput style={[
                                                            styles.projDivInput,
                                                            {display: isProjectedDivisionInput && projectedDivisionIndex === index ? 'flex' : 'none' }
                                                        ]}
                                                        readOnly={projDivsLock[index] === 'lock'}
                                                        keyboardType="numeric"
                                                        value={projectedDivisionWidth}
                                                        onChangeText={projTextChangeHandler}
                                                        //  onFocus={()=>{}}
                                                        //  onBlur={() => {console.log('on blur')}}
                                                        />
                                                        <Pressable style={[
                                                            styles.projDivLabel, 
                                                            {display: isProjectedDivisionInput && projectedDivisionIndex === index ? 'none' : 'flex'}
                                                        ]}
                                                        onPress={() => {
                                                            if (projDivsLock[index] === 'unlock') {
                                                                setProjectedDivisionInput(true);
                                                                setProjectedDivisionIndex(index);
                                                                projWidthDivInputHandler(index);
                                                            }
                                                        }}
                                                        >
                                                            <Text style={styles.txtProjDivLabel}>{projWidthDivArr[index]}</Text>
                                                        </Pressable>
                                                        <Pressable style={({pressed}) => [
                                                            {display: projDivsLock[index] === 'lock' ? 'none' : 'flex'},
                                                            styles.projUnlockBtn,
                                                            pressed && {backgroundColor: 'rgba(0,0,0,0.2)'}
                                                        ]}
                                                        onPress={() => {
                                                                projDivsLock[index] = 'lock'
                                                                setProjectedDivisionIndex(index);
                                                                setProjectedDivisionInput(false);
                                                                Keyboard.dismiss();
                                                        }}
                                                        >
                                                            <View style={{
                                                                display: 'flex'
                                                            }}>
                                                                <Ionicons name="lock-open-outline" size={16} color='blue'/>
                                                            </View>
                                                        </Pressable>
                                                        <Pressable style={({pressed}) => [
                                                            {display: projDivsLock[index] === 'unlock' ? 'none' : 'flex'},
                                                            styles.projUnlockBtn,
                                                            pressed && {backgroundColor: 'rgba(0,0,0,0.2)'}
                                                        ]}
                                                        onPress={() => {
                                                                projDivsLock[index] = 'unlock'
                                                                setProjectedDivisionIndex(index);
                                                                projWidthDivInputHandler(index);
                                                                setProjectedDivisionInput(true);
                                                                Keyboard.dismiss();
                                                        }}
                                                        >
                                                            <View style={{
                                                                display: 'flex'
                                                            }}>
                                                                <Ionicons name="lock-closed-outline" size={16} color='blue'/>
                                                            </View>
                                                        </Pressable>
                                                    </View>
                                                    <View style={styles.divideDivisionProj}>
                                                        <Pressable style={({pressed}) => [
                                                            styles.btnDivideDivisionProj,
                                                            {backgroundColor: innerDivisionsArr.length > 0 ? 
                                                                (innerDivisionsArr[index].length > 0? 'rgba(255,255,255,0.9)' : 'transparent')
                                                                : 'transparent'},
                                                            pressed && {backgroundColor: 'rgba(0,0,0,0.3)'}
                                                        ]}
                                                        onPress={() => {
                                                            if (isProjDivideOuterHeight) {
                                                                setProjectedDivisionIndex(index);
                                                                setDivisionWidth(widthValue);
                                                                setDivisionHeight(projWidthDivArr[index]);
                                                                setSetDivisions(false)
                                                                setDivideDivision(true);
                                                                setProjectedDivisionInput(false);
                                                            }
                                                            else {
                                                                setProjectedDivisionIndex(index);
                                                                setDivisionWidth(projWidthDivArr[index]);
                                                                setDivisionHeight(heightValue);
                                                                setSetDivisions(false)
                                                                setDivideDivision(true);
                                                                setProjectedDivisionInput(false);
                                                            }
                                                            
                                                        }}
                                                        >
                                                            <View style={[
                                                                styles.crossDivision,
                                                                {borderColor: innerDivisionsArr.length > 0 ? 
                                                                    (innerDivisionsArr[index].length > 0 ? 'green' : 'rgba(255,255,255,0.6)'): 
                                                                    'rgba(255,255,255,0.6)'},
                                                            ]}>
                                                                <View style={[
                                                                    styles.divideDivisionHorizontal,
                                                                    {borderColor: innerDivisionsArr.length > 0 ? 
                                                                        (innerDivisionsArr[index].length > 0 ? 'green' : 'rgba(255,255,255,0.6)')
                                                                        : 'rgba(255,255,255,0.6)'},
                                                                ]}></View>
                                                                <View style={[
                                                                    styles.divideDivisionVertical,
                                                                    {borderColor: innerDivisionsArr.length > 0 ? 
                                                                        (innerDivisionsArr[index].length > 0 ? 'green' : 'rgba(255,255,255,0.6)')
                                                                        : 'rgba(255,255,255,0.6)'},
                                                                ]}></View>
                                                            </View>
                                                            
                                                        </Pressable>
                                                    </View>
                                                    
                                                </View>
                                                ))}
                                        </ScrollView>
                                        {/* DIVIDE WIDTH DIVISION */}
                                        <View style={[styles.divideWidthDivision, {display: isDivideDivision ? 'flex' : 'none'}]}>
                                            <View style={styles.btnDivideWidthProj}>
                                                <View style={styles.iconDivideWidthCon}>
                                                    {/* <View style={styles.iconDivideHeightIn}></View> */}
                                                </View>
                                                <Text style={styles.txtDivideWidthProj}>Division {projectedDivisionIndex+1}: {divisionWidth} x {divisionHeight}</Text>
                                            </View>
                                            <View style={[styles.divideOuterProj, {display: isWidthDivisionHeight ? 'none' : 'flex'}]}>
                                                <Pressable style={({pressed}) => [
                                                    // {display: isWidthDivisionHeight ? 'none' : 'flex'},
                                                    styles.btnDivideWidthProj,
                                                    pressed && {backgroundColor: 'rgba(0,0,0,0.4)'}
                                                ]}
                                                onPress={projDivideOuterWidthHeightHandler}
                                                >
                                                    <View style={styles.iconDivideWidthCon}>
                                                        {isProjDivideOuterHeight ? <View style={styles.iconDivideWidthIn}></View> :
                                                        <View style={styles.iconDivideHeightIn}></View>}
                                                        
                                                    </View>
                                                    <Text style={styles.txtDivideWidthProj}>{isProjDivideOuterHeight ? 'Divide width' : 'Divide height'}</Text>
                                                </Pressable>
                                                <Pressable style={({pressed}) => [
                                                    styles.btnDivideWidthProj,
                                                    {display: isWidthDivisionHeight ? 'none' : 'flex'},
                                                    pressed && {backgroundColor: 'rgba(0,0,0,0.4)'}
                                                ]}
                                                onPress={() => {
                                                    setDivideDivision(false);
                                                    setSetDivisions(true);
                                                }}>
                                                    <Ionicons name="close-circle" size={20} color='rgba(255,255,255,0.6)'/>
                                                    <Text style={styles.txtDivideWidthProj}>Close</Text>
                                                </Pressable>
                                            </View>
                                            <View style={[styles.projDivWidth, {display: isWidthDivisionHeight ? 'flex' : 'none'}]}>
                                                <View style={styles.projDivWidthLbl}>
                                                    <Text style={styles.txtProjDivWidth}>Divisions:</Text>
                                                </View>
                                                <View style={styles.projDivWidthVal}>
                                                    <Text style={styles.txtProjDivWidthVal}>{projWidthHeightDivVal}</Text>
                                                </View>
                                                <View style={styles.projDivWidthBtns}>
                                                    <Pressable style={({pressed}) => [
                                                        styles.btnProjDivWidth, 
                                                        pressed && styles.incDivPressed
                                                    ]}
                                                    onPress={decProjWidthHeightDiv}
                                                    >
                                                        <Ionicons name="chevron-down-outline" size={20} color='grey'/>
                                                    </Pressable>
                                                    <Pressable style={({pressed}) => [
                                                        styles.btnProjDivWidth, 
                                                        pressed && styles.incDivPressed
                                                    ]}
                                                    onPress={incProjWidthHeightDiv}
                                                    >
                                                        <Ionicons name="chevron-up-outline" size={20} color='grey'/>
                                                    </Pressable>
                                                </View>
                                            </View>
                                            <ScrollView 
                                            style={[styles.projWidthDivisions, {display: isWidthDivisionHeight ? 'flex' : 'none'}]}
                                            keyboardShouldPersistTaps="always">
                                                    {projWidthDivHeightArr.map((item, index) => (
                                                    <View key={'proj-div'+index} style={{
                                                        flexDirection: 'row',
                                                    }}>
                                                        <View style={styles.projDivisionCon} >
                                                            <View style={styles.projDivisionLbl}>
                                                                <Text style={styles.txtProjDivision}>Division {index+1}</Text>
                                                            </View>
                                                            <TextInput style={[
                                                                styles.projDivInput,
                                                                {display: isProjectedWHDivisionInput && projectedWHDivisionIndex === index ? 'flex' : 'none' }
                                                            ]}
                                                            readOnly={projDivsWHLock[index] === 'lock'}
                                                            keyboardType="numeric"
                                                            value={projectedDivisionWidthHeight}
                                                            onChangeText={projWHTextChangeHandler}
                                                            />
                                                            <Pressable style={[
                                                                styles.projDivLabel, 
                                                                {display: isProjectedWHDivisionInput && projectedWHDivisionIndex === index ? 'none' : 'flex'}
                                                            ]}
                                                            onPress={() => {
                                                                if (projDivsWHLock[index] === 'unlock') {
                                                                    setProjectedWHDivisionInput(true);
                                                                    setProjectedWHDivisionIndex(index);
                                                                    projWidthHeightDivInputHandler(index);
                                                                }
                                                            }}
                                                            >
                                                                <Text style={styles.txtProjDivLabel}>{projWidthDivHeightArr[index]}</Text>
                                                            </Pressable>
                                                            <Pressable style={({pressed}) => [
                                                                {display: projDivsWHLock[index] === 'lock' ? 'none' : 'flex'},
                                                                styles.projUnlockBtn,
                                                                pressed && {backgroundColor: 'rgba(0,0,0,0.2)'}
                                                            ]}
                                                            onPress={() => {
                                                                    projDivsWHLock[index] = 'lock'
                                                                    setProjectedWHDivisionIndex(index);
                                                                    setProjectedWHDivisionInput(false);
                                                                    Keyboard.dismiss();
                                                            }}
                                                            >
                                                                <View style={{
                                                                    display: 'flex'
                                                                }}>
                                                                    <Ionicons name="lock-open-outline" size={16} color='blue'/>
                                                                </View>
                                                            </Pressable>
                                                            <Pressable style={({pressed}) => [
                                                                {display: projDivsWHLock[index] === 'unlock' ? 'none' : 'flex'},
                                                                styles.projUnlockBtn,
                                                                pressed && {backgroundColor: 'rgba(0,0,0,0.2)'}
                                                            ]}
                                                            onPress={() => {
                                                                projDivsWHLock[index] = 'unlock'
                                                                setProjectedWHDivisionIndex(index);
                                                                projWidthHeightDivInputHandler(index);
                                                                setProjectedWHDivisionInput(true);
                                                                Keyboard.dismiss();
                                                            }}
                                                            >
                                                                <View style={{
                                                                    display: 'flex'
                                                                }}>
                                                                    <Ionicons name="lock-closed-outline" size={16} color='blue'/>
                                                                </View>
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                    ))}
                                            </ScrollView>
                                        </View>
                                    </View>
                                </View>
                                {/* -----END DIVIDE OUTER SECTION END------- */}
                                {/* ----- DIVIDE INNER SECTION ------- */}
                                {/* <View style={[styles.divideInnerProj, {display: isSetDivisions && isProjInner ? 'flex' : 'none'}]}> */}
                                <View style={[styles.divideInnerComponents, {display: isSetDivisions && isProjInner ? 'flex' : 'none'}]}>
                                    <View style={styles.divideInnerWidthCon}>
                                        <View style={styles.iconDivideWidthCon}>
                                            <View style={styles.iconDivideWidthIn}></View>
                                        </View>
                                        <Text style={styles.txtDivideWidthProj}>Width divisions:</Text>
                                        <Text style={styles.txtDivideInnerVal}>{divWidthVal}</Text>
                                        <Pressable style={({pressed}) => [
                                            styles.divideInnerDec,
                                            pressed && {backgroundColor: 'rgba(0,0,0,0.5)'}
                                        ]}
                                        onPress={decreaseDivWidth}
                                        >
                                            <Ionicons name="chevron-down-outline" size={16} color='grey'/>
                                        </Pressable>
                                        <Pressable style={({pressed}) => [
                                            styles.divideInnerInc,
                                            pressed && {backgroundColor: 'rgba(0,0,0,0.5)'}
                                        ]}
                                        onPress={increaseDivWidth}
                                        >
                                            <Ionicons name="chevron-up-outline" size={16} color='grey'/>
                                        </Pressable>
                                    </View>
                                    <View style={styles.divideInnerHeightCon}>
                                        <View style={styles.iconDivideWidthCon}>
                                            <View style={styles.iconDivideHeightIn}></View>
                                        </View>
                                        <Text style={styles.txtDivideWidthProj}>Height divisions:</Text>
                                        <Text style={styles.txtDivideInnerVal}>{divHeightVal}</Text>
                                        <Pressable style={({pressed}) => [
                                            styles.divideInnerDec,
                                            pressed && {backgroundColor: 'rgba(50,0,30,0.5)'}
                                        ]}
                                        onPress={decreaseDivHeight}
                                        >
                                            <Ionicons name="chevron-down-outline" size={16} color='grey'/>
                                        </Pressable>
                                        <Pressable style={({pressed}) => [
                                            styles.divideInnerInc,
                                            pressed && {backgroundColor: 'rgba(50,0,30,0.5)'}
                                        ]}
                                        onPress={increaseDivHeight}
                                        >
                                            <Ionicons name="chevron-up-outline" size={16} color='grey'/>
                                        </Pressable>
                                    </View>
                                    <View style={styles.divInnerclosePrevSet}>
                                        <Pressable style={({pressed}) => [
                                        styles.divideInnerBtnClose,
                                        pressed && {backgroundColor: 'rgba(0,0,0,0.4)'}
                                        ]}
                                        onPress={() => {
                                            setSetDivisions(false);
                                            setProjInner(false);
                                            setProjOuter(true);
                                            setDivWidthVal(1)
                                            setDivHeightVal(1)
                                        }}>
                                            <Ionicons name="close-circle" size={20} color='rgba(255,255,255,0.6)'/>
                                            <Text style={styles.txtDivideInnerBtn}>Close</Text>
                                        </Pressable>
                                        <Pressable style={({pressed}) => [
                                        styles.divideInnerBtnPreview,
                                        pressed && {backgroundColor: 'rgba(0,0,0,0.4)'}
                                        ]}
                                        onPress={() => {
                                            setPrevDivision(true);
                                            console.log(openingsMeasurement);
                                        }}>
                                            <Ionicons name="expand-outline" size={20} color='rgba(255,255,255,0.6)'/>
                                            <Text style={styles.txtDivideInnerBtn}>Preview</Text>
                                        </Pressable>
                                        <Pressable style={({pressed}) => [
                                        styles.btnDivideWidthProj,
                                        pressed && {backgroundColor: 'rgba(0,0,0,0.4)'}
                                        ]}
                                        onPress={divideInnerDrawingDone}>
                                            <View style={[
                                                styles.crossDivision,
                                                {borderColor: 'rgb(211, 211, 171)'},
                                            ]}>
                                                <View style={[
                                                    styles.divideDivisionHorizontal,
                                                    {borderColor: 'rgb(211, 211, 171)'},
                                                ]}></View>
                                                <View style={[
                                                    styles.divideDivisionVertical,
                                                    {borderColor: 'rgb(211, 211, 171)'},
                                                ]}></View>
                                            </View>
                                            <Text style={styles.txtDivideInnerSetBtn}>Set</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                {/* </View> */}
                                {/* -----END DIVIDE INNER SECTION END------- */}
                                <View style={[styles.projCloseSetBtnsCon, {display: isWidthDivisionHeight || ((isProjDivideOuterWidth || isProjDivideOuterHeight) && !isDivideDivision) ? 'flex' : 'none'}]}>
                                    <Pressable style={({pressed}) => [
                                        styles.projCloseSetBtn,
                                        pressed && {backgroundColor: 'rgba(17, 4, 4, 0.4)'}
                                    ]}
                                    onPress={closeDivisionsHandler}
                                    >
                                        <Text style={[styles.txtProjCloseSetBtn, {color: 'rgba(255,255,255,0.9)'}]}>Cancel</Text>
                                    </Pressable>
                                    <Pressable style={({pressed}) => [
                                        styles.projCloseSetBtn,
                                        pressed && {backgroundColor: 'rgba(0,0,0,0.4)'}
                                    ]}
                                    onPress={previewDrawingHandler}
                                    >
                                        <Text style={[styles.txtProjCloseSetBtn, {color: '#ff9'}]}>Preview</Text>
                                    </Pressable>
                                    <Pressable style={({pressed}) => [
                                    styles.projCloseSetBtn,
                                    pressed && {backgroundColor: 'rgba(0,0,0,0.4)'}
                                    ]}
                                    onPress={saveDivisionsHandler}
                                    >
                                        <Text style={[styles.txtProjCloseSetBtn, {color: '#ff9'}]}>Set</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={{
                                display: isSetDivisions || isDivideDivision ||
                                workType === 'Sliding (Normal)' || workType === 'Sliding (Division)' ? 'none' : 'flex',
                                // paddingRight: 20, 
                                paddingTop: 15,
                            }}>
                                
                                <View style={styles.addBtnCon}>
                                    <Pressable style={({pressed}) => [
                                        styles.btnSetDivisions,
                                        pressed && {backgroundColor: 'rgba(0,0,0,0.4)'}
                                    ]}
                                    onPress={setDivisionsHandler}
                                    >
                                        <Text style={[styles.txtSetDivisions, {color: measurementValid ? '#ff9' : 'grey'}]}>Set divisions</Text>
                                    </Pressable>
                                    <Pressable style={({pressed}) => [
                                        styles.addBtn,
                                        pressed && styles.addBtnPressed
                                    ]}
                                    onPress={addHandler}
                                    >
                                        <Ionicons name="add" size={25} color='#E0D0C1'/>
                                        {/* <Text style={styles.txtAddBtn}>Add</Text> */}
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        {/* ---END PROJECTED WINDOWS INPUTS AND BUTTONS END--- */}
                        
                    </View>
                    <View style={{
                        flex: 1,
                        width: deviceWidth < 500 ? '100%' : ( deviceWidth < 800 ? '80%' : deviceWidth < 100 ? '60%' : '50%'),
                        alignItems: 'center',
                        // backgroundColor: '#fff',
                        paddingBottom: 15,
                        // backgroundColor: 'yellow',
                        // borderBottomWidth:5
                    }}>
                        <View style={[
                            styles.measurementLabel,
                            {display: dimensions.length > 0 ? 'flex' : 'none'}
                         ]}>
                            <Text style={styles.txtMsLabel}>Measurements</Text>
                        </View>
                        <ScrollView
                         style={styles.dimemsionsView}>
                            {
                                dimensions.map((dimension, index) => (
                                    <View style={[
                                        styles.msCon,
                                        {backgroundColor: isRemEditMs && msIndex === index ? 'rgba(0,0,0,0.5)' : 'transparent'}
                                    ]} key={'ms-con'+index}>
                                        
                                        <Pressable style={({ pressed }) => [
                                            styles.btnMsInfo,
                                            pressed && styles.msInfoPressed
                                        ]}
                                        onPress={() => {
                                            if (isEdit) {return;}
                                            setMsIndex(index);
                                            setRemEditMs(true);
                                        }}
                                        >
                                            <View style={styles.msInfoNum}>
                                                <Text style={[
                                                    styles.txtMsInfoNum,
                                                    {color: isRemEditMs && msIndex === index ? 'rgba(255,255,255,0.8)' : 'black'}
                                                ]}>{dimension.num}.</Text>
                                            </View>
                                            <View style={styles.msInfoDims}>
                                                <Text style={[
                                                    styles.txtMsInfoDims,
                                                    {color: isRemEditMs && msIndex === index ? 'rgba(255,255,255,0.8)' : 'black'}
                                                ]}>{dimension.width}  x  {dimension.height}</Text>
                                            </View>
                                            <View style={styles.msInfoBay}>
                                                <Text style={[
                                                    styles.txtMsInfoBay,
                                                    {color: isRemEditMs && msIndex === index ? 'rgba(255,255,255,0.8)' : 'black'}
                                                ]}>{workType === 'Sliding' || workType === 'Sliding-division' ? dimension.bay : dimension.openingCount}
                                                {workType === 'Sliding' || workType === 'Sliding-division' ?  ' bay' : ' open'}</Text>
                                            </View>
                                            <View style={styles.msInfoQty}>
                                                <Text style={[
                                                    styles.txtMsInfoQty,
                                                    {color: isRemEditMs && msIndex === index ? 'rgba(255,255,255,0.8)' : 'black'}
                                                ]}>{dimension.qty} {dimension.qty > 1 ? 'pieces' : 'piece'}</Text>
                                            </View>
                                        </Pressable>
                                        <View style={[
                                            styles.removeEditCon,
                                            {display: isRemEditMs && msIndex === index ? 'flex' : 'none'}
                                        ]}>
                                            <Pressable style={({pressed}) => [
                                                styles.btnRemEditClose,
                                                pressed && styles.remEditClosePressed,
                                                {backgroundColor: isRemove ? 'rgba(110,10,10,0.7)' : 'rgba(255,255,255,0.6)',},
                                            ]}
                                            onPress={() => {
                                                // setRemove(true);
                                                // alufabContext.showAlert();
                                                // setEdit(false);
                                                const response = window.confirm('Measurement would be removed permanently!');
                                                if (response) {
                                                    removeHandler();
                                                }
                                            }}
                                            >
                                                <Ionicons name="trash-bin-outline" size={15} color={isRemove ?'rgba(255,255,255,0.9)' :  'maroon'}/>
                                                <Text style={[
                                                    styles.txtremEditClose,
                                                    {color: isRemove ? 'rgba(255,255,255,0.9)' : 'black'}
                                                ]}>remove</Text>
                                            </Pressable>
                                            <Pressable style={({pressed}) => [
                                                styles.btnRemEditClose,
                                                {backgroundColor: isEdit ? 'rgba(0,120,50,0.5)' : 'rgba(255,255,255,0.6)',},
                                                pressed && styles.remEditClosePressed
                                            ]}
                                            onPress={editHandler}
                                            >
                                                <Ionicons name="open-outline" size={15} color={isEdit ?'rgba(255,255,255,0.9)' :  '#002A22'}/>
                                                <Text style={[
                                                    styles.txtremEditClose,
                                                    {color: isEdit ? 'rgba(255,255,255,0.9)' : 'black'}
                                                ]}>edit</Text>
                                            </Pressable>
                                            <Pressable style={({pressed}) => [
                                                styles.btnRemEditClose,
                                                pressed && styles.remEditClosePressed
                                            ]}
                                            onPress={() => {
                                                setRemEditMs(false);
                                                setMsIndex(null);
                                                setEdit(false);
                                                setRemove(false);
                                                setWidthValue('');
                                                setHeightValue('');
                                                setQtyValue('');
                                            }}
                                            >
                                                <Ionicons name="remove-outline" size={15} color='maroon'/>
                                                <Text style={styles.txtremEditClose}>close</Text>
                                                {/* <Text style={styles.txtremEditClose}>close</Text> */}
                                            </Pressable>
                                        </View>
                                    </View>
                                ))
                            }
                            <View style={[
                                styles.totalCon,
                                {display: msCount > 0 && !isSetDivisions? 'flex' : 'none'}
                            ]}>
                                <Text style={styles.txtTotalSquare}>{Math.round(totalArea * 100) / 100}msq</Text>
                                <Text style={styles.txtTotalQty}>{totalPieces} {totalPieces > 1 ? 'pieces' : 'piece'}</Text>
                            </View>
                        </ScrollView>
                        <View style={[styles.proceedBtnCon, {display: dimensions.length > 0 ? 'flex' : 'none'}]}>
                            <Pressable style={({pressed}) => [
                                styles.proceedBtn,
                                pressed && {opacity: 0.5}
                            ]}
                            onPress={() => {
                                // alufabContext.showLoading();
                                // setDimensionsLoading(true);
                                // setTimeout(() => {doneHandler()}, 500)
                                doneHandler();
                            }}
                            >
                                <Text style={styles.txtProceed}>Finish</Text>
                            </Pressable>
                        </View>
                    </View>
                    
                    
                </View>
            </View>
        </View>
    );
}

export default MatDimensionsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(236, 235, 228, 0.5)',
    },
    header: {
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#383961',
        marginBottom: 1,
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

    otherInfo: {
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    workType: {
        width: '70%',
        paddingVertical: 5,
    },
    txtWorkType: {
        width: '100%',
        letterSpacing: 2,
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        paddingVertical: 3,
        borderRightWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    profileType: {
        width: '30%',
        paddingVertical: 5,
    },
    txtProfileType: {
        width: '100%',
        letterSpacing: 2,
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        paddingVertical: 3,
        
    },
    dimensionsInputs: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: 8,
        justifyContent: 'space-around',
        // paddingHorizontal: 5,
    },
    msInputLbl: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 25,
        paddingTop: 20,
    },
    txtMsInputLbl: {
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 3,
        fontSize: 14,
    },
    txtMsCount: {
        color: 'rgba(255,200,240,0.7)',
        letterSpacing: 2,
        fontSize: 13,
        borderWidth: 1,
        borderColor: 'rgba(255,240,240,0.1)',
        borderRadius: 10,
        paddingHorizontal: 7,
        paddingVertical: 2,
        // backgroundColor: 'yellow'

    },
    widthInputCon: {
        width: '35%',
    },
    heightInputCon: {
        width: '35%',
    },
    qtyInputCon: {
        width: '20%',
    },
    widthInput: {
        width: '100%',
        height: 35,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 5,
        color: '#360A14',
        fontWeight: '500',
        letterSpacing: 2,
        paddingLeft: 3,
        // borderRightWidth: 5,
        // borderColor: '#484D6D',
    },
    heightInput: {
        width: '100%',
        height: 35,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 5,
        color: '#360A14',
        fontWeight: '500',
        letterSpacing: 2,
        paddingLeft: 3,
        // borderRightWidth: 5,
        // borderColor: '#484D6D',
    },
    qtyInput: {
        width: '100%',
        height: 35,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 5,
        color: '#360A14',
        fontWeight: '500',
        letterSpacing: 2,
        paddingLeft: 3,
        // borderColor: '#484D6D',
    },
    slidingDivCon: {
        width: '100%',
        marginTop: 25,
        paddingHorizontal: 10,
    },
    divisionLabel: {
        width: '100%',
        paddingTop: 25,
        paddingLeft: 15,
        // alignItems: 'center',
    },
    txtDivisionLabel: {
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 3,
        fontSize: 13,
    },
    divideCon: {
        width: '47%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 5,
    },
    txtDivide: {
        width: '50%',
        fontSize: 13,
        color: 'rgba(0,0,0,0.7)',
        letterSpacing: 2,
        paddingLeft: 5,
        
    },
    txtDivideVal: {
        width: '15%',
        fontSize: 15,
        color: 'rgba(0,0,0,0.6)',
    },
    btnIncDiv: {
        width: '35%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 1,
    },
    incDivPressed: {
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    divideInput: {
        width: '50%',
        height: 35, 
        borderLeftWidth: 1,
        borderColor: 'rgba(0,0,0,0.4)',
        paddingLeft: 5,
        // color: '#360A14',
    },
    previewDivision: {
        height: 35,
        justifyContent: 'center',
        paddingHorizontal: 3,
    },
    txtPreviewDiv: {
        
        letterSpacing: 2,
        fontStyle: 'italic',
        fontSize: 13,
    },
    previewDivPressed: {
        color: 'grey'
    },
    slidingBtnsCon: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 25,
        paddingLeft: 10,
        paddingRight: 15,
    },
    bayCon: {
        flexDirection: 'row',
        alignItems: 'center',
        // width: '60%',
        // paddingLeft: 15,
    },
    addBtnCon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'yellow',
        // width: '40%',
        // paddingRight: 20,
    },
    btnSetDivisions: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    txtSetDivisions: {
        letterSpacing:3,
        color: '#ff9',
    },
    incDecCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    btnIncDecBay: {
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255,255,255,0.4)',
        paddingVertical: 5,
        borderRadius: 5,
    },
    btnDecBay: {
        marginHorizontal: 15,
    },
    incDecPressed: {
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    txtBayCon: {
        height: 35,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    txtBay: {
        letterSpacing: 2,
        color: '#360A14',
        fontWeight: '500',
    },
    // xxx: {},
    addBtn: {
        // width: '80%',
        // height: 35,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 2,
        marginRight: 25,
        marginLeft: 30,
        // paddingVertical: 7,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#E0D0C1',
        // backgroundColor: 'rgb(0, 100, 0)'
    },
    addBtnPressed: {
        backgroundColor: 'green'
    },
    txtAddBtn: {
        color: '#fff',
        textAlign: 'center',
    },
    dimemsionsView: {
        height: 1,
        width: '100%',
        marginBottom: 10,
        // backgroundColor: 'grey'
    },
    calcualateCon: {
        // borderTopWidth: 1,
        // borderColor: '#484D6D',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 15,
        paddingBottom: 10,
    },
    btnCaculate: {
        width: 110,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#9A031E',
        backgroundColor: '#14080E',
        borderRadius: 5,
    },
    txtBtnCalculate: {
        color: '#fff',
        letterSpacing: 3,
        fontSize: 16,
        fontWeight: '500',
    },
    measurementLabel: {
        // width: '100%',
        paddingVertical: 10,
        // backgroundColor: '#rgb(249, 250, 225)'
    },
    txtMsLabel: {
        textAlign: 'center',
        letterSpacing: 3,
        color: 'navy',
        // fontWeight: '500',
        fontSize: 16,
    },
    msCon: {
        // flexDirection: 'row',
    },
    removeEditCon: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    txtRemoveEditPressed: {
        color: 'red',
    },
    btnRemEditClose: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        paddingHorizontal: 5,
        paddingVertical: 1,
        borderRadius: 5,
    },
    remEditClosePressed: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    txtremEditClose: {
        marginLeft: 10,
        letterSpacing: 2,
        fontStyle: 'italic',
    },
    btnMsInfo: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    msCon: {
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    msInfoNum: {
        width: '10%',
        height: '100%',
        justifyContent: 'center',
    },
    msInfoDims: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
    },
    msInfoQty: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
    },
    msInfoBay: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
    },
    txtMsInfoNum: {
        textAlign: 'center',
        fontSize: 13,
    },
    txtMsInfoDims: {
        textAlign: 'center',
        letterSpacing: 2,
    },
    txtMsInfoQty: {
        textAlign: 'center',
        letterSpacing: 2,
        fontSize: 13,
        // fontStyle: 'italic',
    },
    txtMsInfoBay: {
        textAlign: 'center',
        letterSpacing: 2,
        fontSize: 13,
    },
   
    totalCon: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    txtTotalSquare: {
        width: '65%',
        textAlign: 'center',
        fontStyle: 'italic',
        letterSpacing: 2,
        color: '#2F131E',
        fontWeight: '500',
    },
    txtTotalQty: {
        width: '35%',
        textAlign: 'center',
        fontStyle: 'italic',
        letterSpacing: 2,
        color: '#2F131E',
        fontWeight: '500',
    },
    // PROJECTED WINDOWS INPUTS AND BUTTONS
    projectedCon: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 25,
    },
    btnDivideProj: {
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        borderRadius: 3,
    },
    txtDivideProj: {
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 3,
        fontSize: 13,
    },
    projDivCompCon: {
        paddingTop: 25,
        // paddingHorizontal: 10,
    },
    projDivOuter: {
        // height: 280,
        paddingLeft: 20,
    },
    projDivWidth: {
        width: '76%',
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 5,
        paddingLeft: 5,
    },
    projDivWidthLbl: {
        width: '45%',
        height: 35,
        justifyContent: 'center',
    },
    txtProjDivWidth: {
        letterSpacing: 3,
        fontSize: 13,
    },
    projDivWidthVal: {
        width: '20%',
        justifyContent: 'center',
        height: 35,
    },
    txtProjDivWidthVal: {},
    projDivWidthBtns: {
        width: '35%',
        flexDirection: 'row',
    },
    btnProjDivWidth: {
        width: '50%',
        height: 35,
        paddingHorizontal: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    projWidthDivisions: {
        width: '90%',
        height: 180,
        // backgroundColor: 'red'
    },
    projDivisionCon: {
        width: '85%',
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 5,
        paddingLeft: 5,
        marginTop: 10
    },
    projDivisionLbl: {
        width: '43%',
        height: 35,
        justifyContent: 'center',
        // borderRightWidth: 1,
        // borderColor: 'grey',
    },
    txtProjDivision: {
        letterSpacing: 3,
        fontSize: 13,
    },
    projDivInput: {
        width: '40%',
        height: 35,
        borderLeftWidth: 1,
        borderColor: 'grey',
        // borderTopRightRadius: 5,
        paddingLeft: 5,
        letterSpacing: 2,
        backgroundColor: 'rgba(177, 41, 41, 0.2)'
    },
    projDivLabel: {
        width: '40%',
        height: 35,
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderColor: 'grey',
        paddingLeft: 5,
        letterSpacing: 2,
        // backgroundColor: 'red'
    },
    projUnlockBtn: {
        width: '17%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderColor: 'grey',
    },
    divideDivisionProj: {
        width: '15%',
        height: 35,
        marginTop: 10,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#484D6D',
    },
    btnDivideDivisionProj: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
    },
    crossDivision: {
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        borderRadius: 2,
        borderWidth: 1,
    },
    divideDivisionHorizontal: {
        width: '100%',
        borderTopWidth: 1,
    },
    divideDivisionVertical: {
        position: 'absolute',
        height: '100%',
        borderRightWidth: 1,
    },
    txtProjDivLabel: {
        letterSpacing: 2,
    },
    divideOuterProj: {
        paddingLeft: 15,
        // flexDirection: 'row',
        // justifyContent: 'space-evenly'
    },
    btnDivideWidthProj: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 15,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
    },
    txtDivideWidthProj: {
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 3,
        fontSize: 13,
        fontStyle: 'italic',
        marginLeft: 12,
    },
    iconDivideWidthCon: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
        borderRadius: 3,
    },
    iconDivideWidthIn: {
        height: 18,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
    },
    iconDivideHeightIn: {
        width: 18,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
    },
    projCloseSetBtnsCon: {
        width: '82%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        // paddingRight: 40,
        // backgroundColor: 'yellow'
    },
    projCloseSetBtn: {
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    txtProjCloseSetBtn: {
        letterSpacing: 3,
    },
    // xxx: {},
    // xxx: {},
    // xxx: {},

    // DIVIDE INNER STYLES
    divideInnerProj: {
       
    },
    divideInnerComponents: {
        paddingLeft: 20,
        marginTop: 5,
    },
    divideInnerWidthCon: {
        flexDirection: 'row',
        alignItems: 'center',
        // width: '85%',
        borderRadius: 5,
        marginBottom: 25,
        // backgroundColor: 'rgba(255,255,255,0.6)',
    },
    divideInnerHeightCon: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    divideInnerHeightConSlide: {
        flexDirection: 'row',
        // marginBottom: 10,
    },
    divideInnerWidthLabel: {
        height: 35,
        width: '45%',
        justifyContent: 'center',
        paddingLeft: 5,
    },
    txtDivideInnerWidthLabel: {
        letterSpacing: 3,
    },
    divideInnerWidthVal: {
        height: 35,
        width: '15%',
        justifyContent: 'center',
        // alignItems: 'center',
        borderRightWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    divideInnerWidthBtns: {
        flexDirection: 'row',
        height: 35,
        width: 100,
        marginLeft: 25,
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    divideInnerDec: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 1,
        marginLeft: 20,
        // borderWidth: 1,
        borderRadius: 10,
        // borderColor: 'grey'
    },
    divideInnerInc: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 1,
        marginLeft: 20,
        // borderWidth: 1,
        borderRadius: 10,
        // borderColor: 'grey'
    },
    divideInnerIncDecPressed: {
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    txtDivideInnerVal: {
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 3,
        fontSize: 14,
        fontWeight: '500',
        fontStyle: 'italic',
        marginLeft: 12,
    },
    divInnerclosePrevSet: {
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
    },
    divideInnerBtnClose: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        // marginBottom: 15,
        paddingRight: 5,
        paddingVertical: 5,
        borderRadius: 5,
    },
    divideInnerBtnPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginHorizontal: 25,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
    },
    txtDivideInnerBtn: {
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 3,
        fontSize: 13,
        fontStyle: 'italic',
        marginLeft: 5,
    },
    txtDivideInnerSetBtn: {
        color: 'rgb(211, 211, 171)',
        letterSpacing: 3,
        fontSize: 13,
        fontStyle: 'italic',
        marginLeft: 5,
    },
    txtUsage: {
        letterSpacing: 2,
        fontSize: 12,
        // color: '#DBDFAC',
        color: '#ff9',
    },
    txtUsageCount: {
        fontSize: 12,
        color: '#ff9',
    },
    proceedBtnCon: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        // paddingHorizontal: 15,
        // marginBottom: 10,
        // marginTop: 20
    },
    proceedBtn: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9E0031',
        borderRadius: 3,
    },
    txtProceed: {
        letterSpacing: 4,
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
    },
    
    xxx: {},
    xxx: {},
    xxx: {},
    xxx: {},
});