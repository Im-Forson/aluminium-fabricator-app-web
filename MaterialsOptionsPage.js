import { View, Text, TextInput, StyleSheet, Image, Dimensions, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";

import { AlufappContext } from "./alufapp-context";
import SavingCalculating from "./SavingCalculating";
import AlufappToast from "./AlufappToast";

export default function MaterialsOptionsPage({ route }) {
    const dimensions = route.params.dimensions;
    const workTitle = route.params.workTitle;
    const workType = route.params.workType;
    const profileType = route.params.profileType;
    const totalPieces = route.params.totalPieces;

    const navigation = useNavigation();
    const deviceDimension = Dimensions.get("window");
    const deviceWidth = deviceDimension.width;
    
    const alufappContext = useContext(AlufappContext);
    const isToast = alufappContext.isToast;
    const isWhichToast = alufappContext.isWhichToast;

    const [isMatOptLoading, setMatOptLoading] = useState(false);

    const [isWhite, setWhite] = useState(true);
    const [isGrey, setGrey] = useState(false);
    const [isBlack, setBlack] = useState(false);
    const [isChampagne, setChampagne] = useState(false);
    const [isSilver, setSilver] = useState(false);
    const [isWood, setWood] = useState(false);
    const [isRoundFrame, setRoundFrame] = useState(true);
    const [isSmallWallFrame, setSmallWallFrame] = useState(false);
    const [isBigWallFrame, setBigWallFrame] = useState(false);
    const [isKS50RoundFrame, setKS50RoundFrame] = useState(false);
    const [isKS50WallFrame, setKS50WallFrame] = useState(false);
    const [isTrialcoRound, setTrialcoRoundFrame] = useState(false);
    const [isTrialcoWall, setTrialcoWall] = useState(false);
    const [isRoundLeaf, setRoundLeaf] = useState(false);
    const [isFlatLeaf, setFlatLeaf] = useState(true);
    const [isSmallNet, setSmallNet] = useState(false)
    const [isBigNet, setBigNet] = useState(true);
    const [isSmallL, setSmallL] = useState(true);
    const [isBigL, setBigL] = useState(false);
    const [isSmallT, setSmallT] = useState(true);
    const [isBigT, setBigT] = useState(false);
    const [isBigZ, setBigZ] = useState(true);
    const [isBigTasZ, setBigTasZ] = useState(false);
    const [isBottom, setBottom] = useState(true);
    const [isMolliumAsBottom, setMolliumAsBottom] = useState(false);
    const [isTasBottom, setTasBottom] = useState(false);
    const [isMolliumForDiv, setMolliumForDiv] = useState(true);
    const [isBigTForDiv, setBigTForDiv] = useState(false);
    const [isHingeSmallL, setHingeSmallL] = useState(false);
    const [isHingeBigL, setHingeBigL] = useState(true);
    const [] = useState(false);
    const [] = useState(false);
    const [] = useState(false);
    const [isMetalLock, setMetalLock] = useState(true);
    const [isPressLock, setPressLock] = useState(false);
    const [isBigNetHandle, setBigNetHandle] = useState(true);
    const [isSmallNetHandle, setSmallNetHandle] = useState(false);
    const [] = useState(false);
    const [] = useState(false);
    const [isTintedGlass, setTintedGlass] = useState(true);
    const [isBronzeRefGlass, setBronzeRefGlass] = useState(false);
    const [isDarkGlass, setDarkGlass] = useState(false);
    const [isDarkRefGlass, setDarkRefGlass] = useState(false);
    const [isBlueRefGlass, setBlueRefGlass] = useState(false);
    const [isPlainGlass, setPlainGlass] = useState(false);
    const [] = useState(false);
    const [] = useState(false);
    const [] = useState(false);
    const [] = useState(false);
    const [] = useState(false);
    

    const [frameType, setFrameType] = useState('round-frame');
    const [leafType, setLeafType] = useState('flat-leaf');
    const [netType, setNetType] = useState('big-net');
    const [profileColor, setProfileColor] = useState('white');
    const [lockType, setLockType] = useState('metal-lock');
    const [netHandleType, setNetHandleType] = useState('big-net');
    const [glassColor, setGlassColor] = useState('tinted');
    const [fiberNetType, setFiberNetType] = useState('short');
    const [lType, setLType] = useState('small-l');
    const [tType, setTType] = useState('small-t');
    const [hingeLType, sethingeLType] = useState('big-l');
    const [zType, setZType] = useState('big-z');
    const [bottomType, setBottomType] = useState('bottom');
    const [divisionType, setDivisionType] = useState('mullion');
    
    const [isCalculateBtn, setCalculateBtn] = useState(false);
    const [isUsageExhausted, setUsageExhausted] = useState(false);
    const [] = useState(false);
    const [] = useState(false);

    useEffect(() => {
        if (profileType !== 'Skit-60') {
            setLockType('press-lock');
        }
    });

    function closeHandler() {
        if (workType === 'Sliding' || workType === 'Sliding-division') {
            setWhite(true);
            setGrey(false);
            setBlack(false);
            setChampagne(false);
            setSilver(false);
            setWood(false);
            setRoundFrame(true);
            setSmallWallFrame(false);
            setBigWallFrame(false);
            setRoundLeaf(true);
            setFlatLeaf(false);
            setSmallNet(false);
            setBigNet(true);
            setMetalLock(true);
            setPressLock(false);
            setBigNetHandle(true);
            setSmallNetHandle(false);
            (false);
        }

        setTintedGlass(true);
        setBronzeRefGlass(false);
        setDarkGlass(false);
        setDarkRefGlass(false);
        setBlueRefGlass(false);
        setPlainGlass(false);
    }

    const fetchProfileResults = async (dims, profileLength) => {
        try {
            const res = await fetch('http://localhost:3001/profile', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ DIMENSIONS: dims, CONSTANT_LENGTH: profileLength }),
            });
            
            const data = await res.json();
            return data;
        } catch (error) {
            alufappContext.setWhichToast('mat-fetch-results');
            alufappContext.showToast();
        }
        
      
    };

    const fetchSheetResults = async (dim, size) => {
        try {
            const res = await fetch('http://localhost:3001/sheet', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ MainDimensions: dim, SHEETSIZE: size }),
              });
            
              const data = await res.json();
              return data;
        } catch (error) {
            alufappContext.setWhichToast('mat-fetch-results');
            alufappContext.showToast();
        }
        
    };

    async function calculateHandler() {
        let sheetSize = {width: 3300, height: 2250, area: 3300*2250};
        const profileFullLength = 5800;
        
        if (workType === 'Sliding' || workType === 'Sliding-division') {
            let smallFiberNetSize = {width: 20000, height: 1200, area: 20000*1200};
            let bigFiberNetSize = {width: 25000, height: 1500, area: 25000*1500};
            const brushFullLength = 10000;
            const glazingRubberFullLength = 27000;
            const netRubberFullLength = 70000;
            
            const frameDimensions = [];
            const leafDimensions = [];
            const netDimensions = [];
            const adaptorDimensions = [];
            const divisionsDimensions = [];
            const glassDimensions = [];
            const fiberNetDimensions = [];
            const fiberNetWidthDimensions = [];
            
            let coverValue = 50;
            let bayAddition = 0;
            let profileTypeAddValue = 0;
            let leafDeduction = 60;
            let netHeightDeduction = 0;
            let divisionDeduction = 110
            let glassDeduction = 100;
            let rollerLimit = 350;

            let frameCorner = 0, leafCorner = 0, netCorner = 0, brush = 0, rollers;
            let singleRoller = 0, doubleRoller = 0, pressLock = 0, netHandle = 0;
            let glazingRubber = 0, netRubber = 0, fiberNet = 0, installScrews = 0;

            let brushLength = 0, glazingRubberLength = 0, netRubberLength = 0;

            let countId = 0, netId = 0;

            for (let i = 0; i < dimensions.length; i++) {

                let width = dimensions[i].width + coverValue;
                let height = dimensions[i].height + coverValue;
                let qty = dimensions[i].qty;
                let bay = dimensions[i].bay;
                for (let j = 0; j < qty; j++) {
                    frameDimensions.push(width) //push top frame
                    frameDimensions.push(width) //push bottom frame
                    frameDimensions.push(height) //push left frame
                    frameDimensions.push(height) //push right frame
                    installScrews += 8;
                }

                let leafWidth = (width + bayAddition) / bay;
                let leafHeight = height - leafDeduction;
                
                for (let j = 0; j < qty; j++) {
                    for (let k = 0; k < bay; k++) {
                        leafDimensions.push(leafWidth);
                        leafDimensions.push(leafWidth);
                        leafDimensions.push(leafHeight);
                        leafDimensions.push(leafHeight);
                    }
                }

                let netBay = 1;
                if (bay > 3) {netBay = 2};
                let netWidth = leafWidth;
                let netHeight = leafHeight;
                fiberNetWidthDimensions.push(netWidth);
                for (let j = 0; j < qty; j++) {
                    for (let k = 0; k < netBay; k++) {
                        netDimensions.push(netWidth);
                        netDimensions.push(netWidth);
                        netDimensions.push(netHeight);
                        netDimensions.push(netHeight);
                    }
                }

                let adaptorLength = leafHeight;
                for (let j = 0; j < qty; j++) {
                    for (let k = 0; k < bay; k++) {
                        adaptorDimensions.push(adaptorLength);
                    }
                }

                if (workType === 'Sliding-division') {
                    let widthLength = leafWidth - divisionDeduction;
                    let heightLength = leafHeight - divisionDeduction;
                    let widthDiv = dimensions[i].widthDiv;
                    let heightDiv = dimensions[i].heightDiv;
                    for (let j = 0; j < qty; j++) {
                        for (let k = 0; k < bay; k++) {
                            for (let l = 1; l < widthDiv; l++) {
                                divisionsDimensions.push(widthLength);
                            }
                            for (let l = 1; l < heightDiv; l++) {
                                divisionsDimensions.push(heightLength);
                            }
                        }
                    }
                }

                let glassWidth = leafWidth - glassDeduction;
                let glassHeight = leafHeight - glassDeduction;
                let glassArea = glassWidth/1000 * glassHeight/1000;
                
                
                for (let j = 0; j < qty; j++) {
                    for (let k = 0; k < bay; k++) {
                        glassDimensions.push({
                            id: countId,
                            width: glassWidth,
                            height: glassHeight,
                            area: glassArea
                        });

                        countId += 1;
                    }

                    for (let k = 0; k < netBay; k++) {
                        fiberNetDimensions.push({
                            id: netId,
                            width: leafWidth,
                            height: leafHeight,
                            area: (leafWidth * leafHeight) / 1000000,
                        });

                        netId += 1;
                    }
                }
                
                // ACCESSORIES
                for (let j = 0; j < qty; j++) {
                    frameCorner += 4;
                    pressLock += 1;

                    for (let k = 0; k < bay; k++) {
                        leafCorner += 4;
                        brushLength += (leafWidth + leafHeight) * 2;
                        glazingRubberLength += ((leafWidth - divisionDeduction) + (leafHeight - divisionDeduction)) * 2;
                        
                    }

                    for (let k = 0; k < netBay; k++) {
                        netCorner += 4;
                        netHandle += 1;
                        netRubberLength += ((leafWidth-50) + (leafHeight-50)) * 2;
                    }

                    if (leafWidth <= rollerLimit) {
                        singleRoller += 1;
                    }
                    else {
                        doubleRoller += 1;
                    }
                }
            }
            
            const outerFrame = await fetchProfileResults(frameDimensions, profileFullLength); 
            const innerLeaf = await fetchProfileResults(leafDimensions, profileFullLength); 
            const netInner = await fetchProfileResults(netDimensions, profileFullLength); 
            const adaptor = await fetchProfileResults(adaptorDimensions, profileFullLength); 
            const divisions = await fetchProfileResults(divisionsDimensions, profileFullLength);
            const glassSheet = await fetchSheetResults(glassDimensions, sheetSize);
            
            brush = Math.ceil(brushLength / brushFullLength); 
            glazingRubber = Math.ceil(glazingRubberLength / glazingRubberFullLength); 
            netRubber = Math.ceil(netRubberLength / netRubberFullLength);
            rollers = Math.ceil(glassDimensions.length / 2); 
            doubleRoller = rollers - singleRoller;

            let longestNetWidth = fiberNetDimensions[0].width;
            for (let i = 1; i < fiberNetDimensions.length; i++) {
                if (longestNetWidth < fiberNetDimensions[i].width) {
                    longestNetWidth = fiberNetDimensions[i].width;
                }
            }
            
            if (longestNetWidth <= 1200) { 
                fiberNet = await fetchSheetResults(fiberNetDimensions, smallFiberNetSize);
            }
            else if (longestNetWidth <= 1500) {
                fiberNet = await fetchSheetResults(fiberNetDimensions, bigFiberNetSize);
                setFiberNetType('long');
            }
            else if (longestNetWidth > 1500) {
                let longestArr = [], normalArr = [], dividedArr = [], newNetArr = [];

                for (let i = 0; i < fiberNetDimensions.length; i++) {
                    if (fiberNetDimensions[i].width > 1500) {
                        longestArr.push(fiberNetDimensions[i]);
                    }
                    else {
                        normalArr.push(fiberNetDimensions[i]);
                    }
                }

                for (let i = 0; i < longestArr.length; i++) {
                    let newHeight = longestArr[i].height / 2;
                    let width = longestArr[i].width;
                    if (newHeight > 1500) {
                        newHeight = longestArr[i].height / 3; 
                        let newNet = {width: width, height: newHeight, area: (width*newHeight)/1000000};
                        dividedArr.push(newNet);
                        dividedArr.push(newNet);
                        dividedArr.push(newNet);
                    }
                    else {
                        let newNet = {width: width, height: newHeight, area: (width*newHeight)/1000000};
                        dividedArr.push(newNet);
                        dividedArr.push(newNet);
                    }
                }

                for (let i = 0; i < normalArr.length; i++) {
                    newNetArr.push(normalArr[i]);
                }

                for (let i = 0; i < dividedArr.length; i++) {
                    newNetArr.push(dividedArr[i]);
                }
                
                fiberNet = await fetchSheetResults(newNetArr, bigFiberNetSize);
                setFiberNetType('long');
            }
           
            const materialList = {
                outerFrame: outerFrame.totalProfiles,
                innerLeaf: innerLeaf.totalProfiles,
                netInner: netInner.totalProfiles,
                adaptor: adaptor.totalProfiles,
                leafDivision: divisions.totalProfiles,
                glassSheet: glassSheet.totalSheet,
                frameCorner: frameCorner,
                leafCorner: leafCorner,
                netCorner: netCorner,
                roller: rollers,
                kit: rollers,
                pressLock: pressLock,
                brush: brush,
                netHandle: netHandle,
                glazingRubber: glazingRubber,
                netRubber: netRubber,
                installScrews: Math.ceil(installScrews / 144),
                wallPlug: Math.ceil(installScrews / 100),
                fiberNet: Math.ceil(fiberNet.totalSheet),
            }

            const offcutlList = {
                outerOff: outerFrame.offcuts,
                leafOff: innerLeaf.offcuts,
                netInnerOff: netInner.offcuts,
                adaptorOff: adaptor.offcuts,
            }
           
            navigation.navigate(
                'MaterialList',
                {
                    dimensions: dimensions,
                    workTitle: workTitle,
                    materialList: materialList,
                    offcutlList: offcutlList,
                    workType: workType,
                    profileType: profileType,
                    profileColor: profileColor,
                    glassColor: glassColor,
                    frameType: frameType,
                    leafType: leafType,
                    netType: netType,
                    lockType: lockType,
                    netHandleType: netHandleType,
                    fiberNetType: fiberNetType,
                    totalPieces: totalPieces,
                }
            );
        }

        else if (workType === 'Casement' || workType === 'Projected') { 
            const LOuterDimensions = [];
            const TDimensions = [];
            const beadingDimensions = [];
            const glassDimensions = [];
            const doorRubberLength = 65000;
            const beadingRubberLength = 65000;
            const doorBrushLength = 100000;
            let outerCornersCount = 0;
            let openingsCount = 0;
            let installScrewsCount = 0;
            let wallPlugCount = 0;
            let totalFrameRubberLength = 0;
            let totalBeadingRubberLength = 0;
            let totalDoorBrushLength = 0;
            
            

            for (let i = 0; i < dimensions.length; i++) {
                let width = dimensions[i].width;
                let height = dimensions[i].height;
                let qty = dimensions[i].qty;
                
                for (let j = 0; j < qty; j++) {
                    LOuterDimensions.push(width);
                    LOuterDimensions.push(width);
                    LOuterDimensions.push(height);
                    LOuterDimensions.push(height);

                    outerCornersCount += 4;
                    installScrewsCount += 8;
                    wallPlugCount += 8;
                }

                let outerDivisions = dimensions[i].outerDivision;
                for (let j = 0; j < qty; j++) {
                    for (let k = 0; k < outerDivisions.length; k++) {
                        TDimensions.push(outerDivisions[k]);
                    }
                }

                let openings = dimensions[i].openings;
                for (let j = 0; j < qty; j++) {
                    if (openings.length === 0) {
                        let arr = [{width: width, height: height}];
                        openings = arr;
                    }
                    
                    for (let k = 0; k < openings.length; k++) {
                        TDimensions.push(openings[k].width);
                        TDimensions.push(openings[k].width);
                        TDimensions.push(openings[k].height);
                        TDimensions.push(openings[k].height);
                        totalDoorBrushLength += (width * 2 + height * 2); 
                        openingsCount += 1;
                    }
                }

                let openingWidthDivision = (dimensions[i].openingDivision).widthDivision;
                let openingHeightDivision = (dimensions[i].openingDivision).heightDivision;
                for (let j = 0; j < qty; j++) {
                    let openings = dimensions[i].openings;
                    for (let p = 0; p < openings.length; p++) {
                        let opening = openings[p];
                        for (let k = 0; k < openingWidthDivision; k++) {
                            TDimensions.push(opening.height);
                        }
    
                        for (let k = 0; k < openingHeightDivision; k++) {
                            TDimensions.push(opening.width);
                        }
                    }
                }
                
                for (let j = 0; j < qty; j++) {
                    let glasses = dimensions[i].glassDimensions;
                    for (let k = 0; k < glasses.length; k++) {
                        let glassId = glassDimensions.length + 1;
                        glassDimensions.push({
                            id: glassId,
                            width: glasses[k].width,
                            height: glasses[k].height,
                            area: glasses[k].area,
                        });

                        beadingDimensions.push(glasses[k].width);
                        beadingDimensions.push(glasses[k].width);
                        beadingDimensions.push(glasses[k].height - 30);
                        beadingDimensions.push(glasses[k].height - 30);

                        totalFrameRubberLength += glasses[k].width;
                        totalFrameRubberLength += glasses[k].width;
                        totalFrameRubberLength += glasses[k].height;
                        totalFrameRubberLength += glasses[k].height;

                        totalBeadingRubberLength += glasses[k].width;
                        totalBeadingRubberLength += glasses[k].width;
                        totalBeadingRubberLength += glasses[k].height;
                        totalBeadingRubberLength += glasses[k].height;
                    }
                }
            }

            const LOuter = await fetchProfileResults(LOuterDimensions, profileFullLength);
            const small_big_T = await fetchProfileResults(TDimensions, profileFullLength);
            const beading = await fetchProfileResults(beadingDimensions, profileFullLength);
            const glassSheet = await fetchSheetResults(glassDimensions, sheetSize);
            
            let hinges = openingsCount;
            let frameRubber = Math.ceil(totalFrameRubberLength / doorRubberLength);
            let beadingRubber = Math.ceil(totalBeadingRubberLength / beadingRubberLength);
            let doorBrush = Math.ceil(totalDoorBrushLength / doorBrushLength);
            let handles = Math.ceil(openingsCount / 2);
            let casementStopper = 0;

            let louterCorner = 0;
            let bigLCorner = 0;
            if (profileType === 'Italian') {
                if (isSmallL) {
                    louterCorner += outerCornersCount;
                }
                else {
                    bigLCorner += outerCornersCount;
                }
    
                if (isSmallT) {
                    louterCorner += openingsCount * 4;
                }
                else {
                    bigLCorner += openingsCount * 4;
                }
            }
            else {
                louterCorner = outerCornersCount + openingsCount * 4;
            }
            
            if (workType === 'Casement') {
                casementStopper = Math.ceil(openingsCount / 2);
                
            }

            const materialList = {
                LOuter: LOuter.totalProfiles,
                small_big_T: small_big_T.totalProfiles,
                beading: beading.totalProfiles,
                glassSheet: glassSheet.totalSheet,
                louterCorner: louterCorner,
                bigLCorner: bigLCorner,
                hinges: hinges,
                handles: handles,
                casementStopper: casementStopper,
                frameRubber: frameRubber,
                beadingRubber: beadingRubber,
                doorBrush: doorBrush,
                installScrews: Math.ceil(installScrewsCount / 144),
                wallPlug: Math.ceil(wallPlugCount / 100),
            };

            const offcutlList = {
                LOuterOff: LOuter.offcuts,
                small_big_TOff: small_big_T.offcuts,
                beadingOff: beading.offcuts,
            }
            
            navigation.navigate(
                'MaterialList',
                {
                    dimensions: dimensions,
                    workTitle: workTitle,
                    materialList: materialList,
                    offcutlList: offcutlList,
                    workType: workType,
                    profileType: profileType,
                    profileColor: profileColor,
                    glassColor: glassColor,
                    lType: lType,
                    tType: tType,
                    totalPieces: totalPieces,
                }
            );
        }

        else if (workType === 'Hinge') {
            const LOuterDimensions = [];
            const bottomDimensions = [];
            const molliumDimensions = [];
            const TDimensions = [];
            const ZDimensions = [];
            const adaptorDimensions = [];
            const beadingDimensions = [];
            const glassDimensions = [];
            const doorRubberLength = 65000;
            const beadingRubberLength = 65000;
            const doorBrushLength = 100000;
            let key = 0;
            let openingsCount = 0;
            let outerCornersCount = 0;
            let installScrewsCount = 0;
            let wallPlugCount = 0;
            let lCornersCount = 0;
            let towerBolt = 0;
            let totalDoorRubberLength = 0;
            let totalBeadingRubberLength = 0;
            let totalDoorBrushLength = 0;
            
            for (let i = 0; i < dimensions.length; i++) {
                let width = dimensions[i].width;
                let height = dimensions[i].height;
                let qty = dimensions[i].qty;

                for (let j = 0; j < qty; j++) {
                    LOuterDimensions.push(width);
                    LOuterDimensions.push(height);
                    LOuterDimensions.push(height);

                    bottomDimensions.push(width - 100);
                    outerCornersCount += 2;
                    installScrewsCount += 8;
                    wallPlugCount += 8;
                }

                let outerDivisions = dimensions[i].outerDivision;
                for (let j = 0; j < qty; j++) {
                    for (let k = 0; k < outerDivisions.length; k++) {
                        TDimensions.push(outerDivisions[k]);
                    }
                }

                let openings = dimensions[i].openings;
                
                for (let j = 0; j < qty; j++) {
                    key += 1;
                    if (openings.length === 0) {
                        let arr = [];
                        arr.push({width: width, height: height})
                        openings = arr;
                    }
                    
                    for (let k = 0; k < openings.length; k++) {
                        ZDimensions.push(openings[k].width);
                        ZDimensions.push(openings[k].height);
                        ZDimensions.push(openings[k].height);
                        totalDoorBrushLength += (width + height * 2); 
                        
                        openingsCount += 1;
                    }
                    
                    if (openings.length > 1) {
                        adaptorDimensions.push(openings[0].height);
                        towerBolt += 1;
                    }
                }
                    
                let openingWidthDivision = (dimensions[i].openingDivision).widthDivision;
                let openingHeightDivision = (dimensions[i].openingDivision).heightDivision;
                
                for (let j = 0; j < qty; j++) {
                    let openings = dimensions[i].openings;
                    if (openings.length === 0) {
                        openings = [{width: width, height: height}]
                    }
                    
                    for (let p = 0; p < openings.length; p++) {
                        let opening = openings[p];
                        for (let k = 0; k < openingWidthDivision; k++) {
                            TDimensions.push(opening.height);
                        }
    
                        for (let k = 0; k < openingHeightDivision; k++) {
                            if (divisionType === 'mullion') {
                                molliumDimensions.push(opening.width);
                            }
                            else {
                                TDimensions.push(opening.width);
                            }
                        }
                    }
                }

                for (let j = 0; j < qty; j++) {
                    let glasses = dimensions[i].glassDimensions;
                    for (let k = 0; k < glasses.length; k++) {
                        let glassId = glassDimensions.length + 1;
                        glassDimensions.push({
                            id: glassId,
                            width: glasses[k].width,
                            height: glasses[k].height,
                            area: glasses[k].area,
                        });

                        beadingDimensions.push(glasses[k].width);
                        beadingDimensions.push(glasses[k].width);
                        beadingDimensions.push(glasses[k].height - 30);
                        beadingDimensions.push(glasses[k].height - 30);

                        totalDoorRubberLength += glasses[k].width;
                        totalDoorRubberLength += glasses[k].width;
                        totalDoorRubberLength += glasses[k].height;
                        totalDoorRubberLength += glasses[k].height;

                        totalBeadingRubberLength += glasses[k].width;
                        totalBeadingRubberLength += glasses[k].width;
                        totalBeadingRubberLength += glasses[k].height;
                        totalBeadingRubberLength += glasses[k].height;
                    }
                    
                }
            }

            const LOuter = await fetchProfileResults(LOuterDimensions, profileFullLength);
            const bigZ = await fetchProfileResults(ZDimensions, profileFullLength);
            const small_big_T = await fetchProfileResults(TDimensions, profileFullLength);
            const adaptor = await fetchProfileResults(adaptorDimensions, profileFullLength);
            const mollium = await fetchProfileResults(molliumDimensions, profileFullLength);
            const bottom = await fetchProfileResults(bottomDimensions, profileFullLength);
            const beading = await fetchProfileResults(beadingDimensions, profileFullLength);
            const glassSheet = await fetchSheetResults(glassDimensions, sheetSize);
            
            let hinges = openingsCount;
            let handles = openingsCount;
            let frameRubber = Math.ceil(totalDoorRubberLength / doorRubberLength);
            let beadingRubber = Math.ceil(totalBeadingRubberLength / beadingRubberLength);
            let doorBrush = Math.ceil(totalDoorBrushLength / doorBrushLength);

            let louterCorner = 0;
            let bigZCorner = 0;
            if (profileType === 'Italian') {
                bigZCorner = openingsCount * 2;
                if (isHingeSmallL) {
                    louterCorner += outerCornersCount;
                }
                else {
                    bigZCorner += outerCornersCount;
                }
            }
            else {
                louterCorner = outerCornersCount + openingsCount * 2;
            }
            
            const materialList = {
                LOuter: LOuter.totalProfiles,
                bigZ: bigZ.totalProfiles,
                small_big_T: small_big_T.totalProfiles,
                adaptor: adaptor.totalProfiles,
                mollium: mollium.totalProfiles,
                bottom: bottom.totalProfiles,
                beading: beading.totalProfiles,
                glassSheet: glassSheet.totalSheet,
                louterCorner: louterCorner,
                bigZCorner: bigZCorner,
                hinges: hinges,
                key: key,
                towerBolt: towerBolt,
                handles: handles,
                doorBrush: doorBrush,
                frameRubber: frameRubber,
                beadingRubber: beadingRubber,
                installScrews: Math.ceil(installScrewsCount / 144),
                wallPlug: Math.ceil(wallPlugCount / 100),
            }

            const offcutlList = {
                LOuterOff: LOuter.offcuts,
                bigZ: bigZ.offcuts,
                small_big_TOff: small_big_T.offcuts,
                adaptor: adaptor.offcuts,
                mollium: bottom.offcuts,
                beadingOff: beading.offcuts,
            }
            
            navigation.navigate(
                'MaterialList',
                {
                    dimensions: dimensions,
                    workTitle: workTitle,
                    materialList: materialList,
                    offcutlList: offcutlList,
                    workType: workType,
                    profileType: profileType,
                    profileColor: profileColor,
                    glassColor: glassColor,
                    lType: hingeLType,
                    tType: 'big-t',
                    divisionType: divisionType,
                    totalPieces: totalPieces,
                }
            );
        }

        else if (workType === 'Swing') {
            const bigLDimensions = [];
            const bottomDimensions = [];
            const molliumDimensions = [];
            const TDimensions = [];
            const brushAdaptorDimensions = [];
            const beadingDimensions = [];
            const glassDimensions = [];
            const doorRubberLength = 65000;
            const beadingRubberLength = 65000;
            const brushFullLength = 50000;
            let openingsCount = 0;
            let cornersCount = 0;
            let keysCount = 0;
            let totalBrushLength = 0;
            let totalDoorRubberLength = 0;
            let totalBeadingRubberLength = 0;
            let installScrewsCount = 0;
            let wallPlugCount = 0;
            let towerBolt = 0;

            for (let i = 0; i < dimensions.length; i++) {
                let width = dimensions[i].width;
                let height = dimensions[i].height;
                let qty = dimensions[i].qty;

                for (let j = 0; j < qty; j++) {
                    bigLDimensions.push(width);
                    bigLDimensions.push(height);
                    bigLDimensions.push(height);

                    cornersCount += 2;
                    installScrewsCount += 8;
                    wallPlugCount += 8;
                }

                let outerDivisions = dimensions[i].outerDivision;
                let openings = dimensions[i].openings;
                for (let j = 0; j < qty; j++) {

                    for (let k = 0; k < outerDivisions.length; k++) {
                        TDimensions.push(outerDivisions[k]);
                    }

                    if (openings.length > 1) {
                        let numOfOpenings = openings.length;
                        let removeHeightNum = numOfOpenings - 1;
                        for (let k = 0; k < removeHeightNum; k++) {
                            for (let l = 0; l < TDimensions.length; l++) {
                                if (TDimensions[l] === height || TDimensions[l] === openings[0].height) {
                                    TDimensions.splice(l, 1);
                                    break;
                                }
                            }
                        }

                    }
                }

                for (let j = 0; j < qty; j++) {
                    if (openings.length === 0) {
                        let arr = [];
                        arr.push({width: width, height: height});
                        openings = arr;
                    }
                    
                    let totalOpeningsWidth = 0, openingHeight = openings[0].height;
                    for (let k = 0; k < openings.length; k++) {
                        bigLDimensions.push(openings[k].width);
                        bigLDimensions.push(openings[k].height);
                        bigLDimensions.push(openings[k].height);
                        bottomDimensions.push(openings[k].width);

                        totalOpeningsWidth += openings[k].width;

                        totalBrushLength += openings[k].width;
                        totalBrushLength += openings[k].width;
                        totalBrushLength += openings[k].height;
                        totalBrushLength += openings[k].height;

                        openingsCount += 1;
                    }

                    brushAdaptorDimensions.push(totalOpeningsWidth);
                    brushAdaptorDimensions.push(openingHeight);
                    brushAdaptorDimensions.push(openingHeight);

                    totalBrushLength += totalOpeningsWidth * 2;
                    totalBrushLength += openingHeight * 4;

                    if (openings.length > 1 && brushAdaptorDimensions.length === 0) {
                        brushAdaptorDimensions.push(openings[0].height);
                    }

                    if (openings.length > 1) {
                        towerBolt += 1;
                    }

                    keysCount += 1;
                }

                let openingWidthDivision = (dimensions[i].openingDivision).widthDivision;
                let openingHeightDivision = (dimensions[i].openingDivision).heightDivision;
                for (let j = 0; j < qty; j++) {
                    
                    for (let p = 0; p < openings.length; p++) {
                        let opening = openings[p];
                        for (let k = 0; k < openingWidthDivision; k++) {
                            TDimensions.push(opening.height);
                        }
                        
                        for (let k = 0; k < openingHeightDivision; k++) {
                            if (isMolliumForDiv) {
                                molliumDimensions.push(opening.width);
                            }
                            else {
                                TDimensions.push(opening.width);
                            }
                            
                        }
                    }
                }

                for (let j = 0; j < qty; j++) {
                    let glasses = dimensions[i].glassDimensions;
                    for (let k = 0; k < glasses.length; k++) {
                        let glassId = glassDimensions.length + 1;
                        glassDimensions.push({
                            id: glassId,
                            width: glasses[k].width,
                            height: glasses[k].height,
                            area: glasses[k].area,
                        });

                        beadingDimensions.push(glasses[k].width);
                        beadingDimensions.push(glasses[k].width);
                        beadingDimensions.push(glasses[k].height - 30);
                        beadingDimensions.push(glasses[k].height - 30);

                        totalDoorRubberLength += glasses[k].width;
                        totalDoorRubberLength += glasses[k].width;
                        totalDoorRubberLength += glasses[k].height;
                        totalDoorRubberLength += glasses[k].height;

                        totalBeadingRubberLength += glasses[k].width;
                        totalBeadingRubberLength += glasses[k].width;
                        totalBeadingRubberLength += glasses[k].height;
                        totalBeadingRubberLength += glasses[k].height;
                    }
                }

            }
            
            const bigL = await fetchProfileResults(bigLDimensions, profileFullLength);
            const bigT = await fetchProfileResults(TDimensions, profileFullLength);
            const mollium = await fetchProfileResults(molliumDimensions, profileFullLength);
            const bottom = await fetchProfileResults(bottomDimensions, profileFullLength);
            const brushAdaptor = await fetchProfileResults(brushAdaptorDimensions, profileFullLength);
            const glassSheet = await fetchSheetResults(glassDimensions, sheetSize);
            const beading = await fetchProfileResults(beadingDimensions, profileFullLength);
            const corners = cornersCount + openingsCount * 2;
            const adaptorBrush = Math.ceil(totalBrushLength / brushFullLength);
            const frameRubber = Math.ceil(totalDoorRubberLength / doorRubberLength);
            const beadingRubber = Math.ceil(totalBeadingRubberLength / beadingRubberLength);
            const downCloser = openingsCount;
            const key = keysCount;
            const handle = openingsCount;
            
            const materialList = {
                bigL: bigL.totalProfiles,
                bigT: bigT.totalProfiles,
                mollium: mollium.totalProfiles,
                bottom: bottom.totalProfiles,
                brushAdaptor: brushAdaptor.totalProfiles,
                beading: beading.totalProfiles,
                glassSheet: glassSheet.totalSheet,
                corners: corners,
                adaptorBrush: adaptorBrush,
                frameRubber: frameRubber,
                beadingRubber: beadingRubber,
                downCloser: downCloser,
                key: key,
                handle: handle,
                towerBolt: towerBolt,
                installScrews: Math.ceil(installScrewsCount / 144),
                wallPlug: Math.ceil(wallPlugCount / 100),
            }
            
            const offcutlList = {
                bigL: bigL.offcuts,
                bigT: bigT.offcuts,
                bottom: bottom.offcuts,
                brushAdaptor: brushAdaptor.offcuts,
                beading: beading.offcuts,
            }

            navigation.navigate(
                'MaterialList',
                {
                    dimensions: dimensions,
                    workTitle: workTitle,
                    materialList: materialList,
                    offcutlList: offcutlList,
                    workType: workType,
                    profileType: profileType,
                    profileColor: profileColor,
                    glassColor: glassColor,
                    divisionType: divisionType,
                    totalPieces: totalPieces,
                }
            );
        }
        else {
            const LOuterDimensions = [];
            const TDimensions = [];
            const beadingDimensions = [];
            const bottomDimensions = [];
            const glassDimensions = [];
            const doorRubberLength = 65000;
            const beadingRubberLength = 65000;
            let totalDoorRubberLength = 0;
            let totalBeadingRubberLength = 0;
            let cornersCount = 0;
            let installScrewsCount = 0;
            let wallPlugCount = 0;
            
            for (let i = 0; i < dimensions.length; i++) {
                let width = dimensions[i].width;
                let height = dimensions[i].height;
                let qty = dimensions[i].qty;
                
                for (let j = 0; j < qty; j++) {
                    LOuterDimensions.push(width);
                    LOuterDimensions.push(height);
                    LOuterDimensions.push(height);

                    if (isBottom) {
                        bottomDimensions.push(width);
                    }
                    else {
                        LOuterDimensions.push(width);
                    }

                    cornersCount += 4;
                    installScrewsCount += 8;
                    wallPlugCount += 8;
                }
                
                let outerDivisions = dimensions[i].outerDivision;
                
                for (let j = 0; j < qty; j++) {
                    for (let k = 0; k < outerDivisions.length; k++) {
                        TDimensions.push(outerDivisions[k]);
                    }
                }

                for (let j = 0; j < qty; j++) {
                    let glasses = dimensions[i].glassDimensions;

                    for (let k = 0; k < glasses.length; k++) {
                        let glassId = glassDimensions.length + 1;
                        glassDimensions.push({
                            id: glassId,
                            width: glasses[k].width,
                            height: glasses[k].height,
                            area: glasses[k].area,
                        });

                        beadingDimensions.push(glasses[k].width);
                        beadingDimensions.push(glasses[k].width);
                        beadingDimensions.push(glasses[k].height - 30);
                        beadingDimensions.push(glasses[k].height - 30);

                        totalDoorRubberLength += glasses[k].width;
                        totalDoorRubberLength += glasses[k].width;
                        totalDoorRubberLength += glasses[k].height;
                        totalDoorRubberLength += glasses[k].height;

                        totalBeadingRubberLength += glasses[k].width;
                        totalBeadingRubberLength += glasses[k].width;
                        totalBeadingRubberLength += glasses[k].height;
                        totalBeadingRubberLength += glasses[k].height;
                    }

                    
                }
                
            }

            const LOuter = await fetchProfileResults(LOuterDimensions, profileFullLength);
            const small_big_T = await fetchProfileResults(TDimensions, profileFullLength);
            const bottom = await fetchProfileResults(bottomDimensions, profileFullLength);
            const beading = await fetchProfileResults(beadingDimensions, profileFullLength);
            const glassSheet = await fetchSheetResults(glassDimensions, sheetSize);
            let corners = cornersCount;
            let frameRubber = Math.ceil(totalDoorRubberLength / doorRubberLength);
            let beadingRubber = Math.ceil(totalBeadingRubberLength / beadingRubberLength);

            const materialList = {
                LOuter: LOuter.totalProfiles,
                small_big_T: small_big_T.totalProfiles,
                bottom: bottom.totalProfiles,
                beading: beading.totalProfiles,
                glassSheet: glassSheet.totalSheet,
                corners: corners,
                frameRubber: frameRubber,
                beadingRubber: beadingRubber,
                installScrews: Math.ceil(installScrewsCount / 144),
                wallPlug: Math.ceil(wallPlugCount / 100),
            }

            const offcutlList = {
                LOuterOff: LOuter.offcuts,
                small_big_TOff: small_big_T.offcuts,
                beadingOff: beading.offcuts,
            }

            navigation.navigate(
                'MaterialList',
                {
                    dimensions: dimensions,
                    workTitle: workTitle,
                    materialList: materialList,
                    offcutlList: offcutlList,
                    workType: workType,
                    profileType: profileType,
                    profileColor: profileColor,
                    glassColor: glassColor,
                    tType: tType,
                    lType: lType,
                    totalPieces: totalPieces,
                }
            );
        }
    }

    return (
        <View style={styles.container}>

            <SavingCalculating isVisible={isMatOptLoading} text={'Calculating...'}/>
            <AlufappToast toastVisible={isToast && isWhichToast == 'mat-fetch-results'} info='Results fetch failed! Check internet'/>
            <View style={styles.header}>
                <Image style={{
                    width: deviceWidth < 500 ? 70 : 100, 
                    height: deviceWidth < 500 ? 70 : 100,
                }}
                source={require("./assets/images/icon.png")}
                />
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
                    <Text style={[styles.txtHeaderInfo, {fontSize: deviceWidth <= 500 ? 8 : 10}]}>Worker</Text>
                </Pressable>
                <View style={styles.infoSW}>
                    <Text style={[
                        styles.txtSheetWorker,
                        {fontSize: deviceWidth <= 500 ? 15 : 20}
                    ]}>Materials Options</Text>
                    <View style={{width: deviceWidth < 800 ? 0 : 100, height:0,}}></View>
                </View>
            </View>
            {/* SLIDING VIEW */}
            <ScrollView style={{
                height: 1,
                display: workType === 'Sliding' || workType === 'Sliding-division' ? 'flex' : 'none',
            }}>
                {/* SKIT-60 */}
                <View style={{display: profileType === 'Skit-60' ? 'flex' : 'none', alignItems: 'center', marginBottom: 30}}>
                    <View style={[
                     styles.workInputs, 
                     {
                     width: deviceWidth < 500 ? '100%' : ( deviceWidth < 800 ? '80%' : deviceWidth < 100 ? '60%' : '50%'),
                     paddingHorizontal: deviceWidth < 500 ? 15 : 5
                     }]}>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select outer frame</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setRoundFrame(true);
                                setSmallWallFrame(false);
                                setBigWallFrame(false);
                                setFrameType('round-frame');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isRoundFrame ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Round frame</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setRoundFrame(false);
                                setSmallWallFrame(true);
                                setBigWallFrame(false);
                                setFrameType('small-wall-frame');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSmallWallFrame ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Small wall frame</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setRoundFrame(false);
                                setSmallWallFrame(false);
                                setBigWallFrame(true);
                                setFrameType('big-wall-frame');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBigWallFrame ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Big wall frame</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select leaf</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setRoundLeaf(false);
                                setFlatLeaf(true);
                                setLeafType('flat-leaf');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isFlatLeaf ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Flat leaf</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setRoundLeaf(true);
                                setFlatLeaf(false);
                                setLeafType('round-leaf');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isRoundLeaf ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Round leaf</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select net leaf</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setBigNet(true);
                                setSmallNet(false);
                                setNetType('big-net-leaf');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBigNet ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Big net leaf</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setBigNet(false);
                                setSmallNet(true);
                                setNetType('small-net-leaf');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSmallNet ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Small net leaf</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Profile Color</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(true);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('white');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWhite ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>White</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(true);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('grey');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isGrey ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Grey</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(true);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('black');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlack ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Black</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(true);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('champagne');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isChampagne ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Champagne</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                    setGrey(false);
                                    setBlack(false);
                                    setChampagne(false);
                                    setSilver(true);
                                    setWood(false);
                                    setProfileColor('silver');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSilver ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Silver</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(true);
                                setProfileColor('wood');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWood ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Wood</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select lock type</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setMetalLock(true);
                                setPressLock(false);
                                setLockType('metal-lock');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isMetalLock ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Metal lock</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setMetalLock(false);
                                setPressLock(true);
                                setLockType('press-lock');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isPressLock ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Press lock</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select net handle</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setBigNetHandle(true);
                                setSmallNetHandle(false);
                                setNetHandleType('big-net-handle');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBigNetHandle ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Big net handle</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setBigNetHandle(false);
                                setSmallNetHandle(true);
                                setNetHandleType('small-net-handle');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSmallNetHandle ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Small net handle</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Glass Type</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(true);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('tinted');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isTintedGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Tinted glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(true);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('bronze-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBronzeRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Bronze reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(true);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('dark');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(true);
                                setBlueRefGlass(false);
                                setGlassColor('dark-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(true);
                                setGlassColor('blue-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlueRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Blue reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(true);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('plain');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isPlainGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Plain glass</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                {/* --- SKIT-60 END --- */}
                {/*  KS50 */}
                <View style={{display: profileType === 'KS-50' ? 'flex' : 'none', alignItems: 'center', marginBottom: 30}}>
                    <View style={[
                     styles.workInputs, 
                     {
                     width: deviceWidth < 500 ? '100%' : ( deviceWidth < 800 ? '80%' : deviceWidth < 100 ? '60%' : '50%'),
                     paddingHorizontal: deviceWidth < 500 ? 15 : 5
                     }]}>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select outer frame</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setRoundFrame(true);
                                setBigWallFrame(false);
                                setFrameType('round-frame');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isRoundFrame ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Round frame</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setRoundFrame(false);
                                setBigWallFrame(true);
                                setFrameType('wall-frame');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBigWallFrame ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Wall frame</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Profile Color</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(true);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('white');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWhite ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>White</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(true);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('grey');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isGrey ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Grey</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(true);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('black');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlack ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Black</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(true);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('champagne');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isChampagne ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Champagne</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                    setGrey(false);
                                    setBlack(false);
                                    setChampagne(false);
                                    setSilver(true);
                                    setWood(false);
                                    setProfileColor('silver');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSilver ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Silver</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(true);
                                setProfileColor('wood');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWood ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Wood</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Glass Type</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(true);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('tinted');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isTintedGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Tinted glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(true);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('bronze-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBronzeRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Bronze reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(true);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('dark');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(true);
                                setBlueRefGlass(false);
                                setGlassColor('dark-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(true);
                                setGlassColor('blue-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlueRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Blue reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(true);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('plain');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isPlainGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Plain glass</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                {/* --- KS50 END --- */}
                {/* --- TRIALCO --- */}
                <View style={{display: profileType === 'Trialco' ? 'flex' : 'none', alignItems: 'center', marginBottom: 30}}>
                    <View style={[
                     styles.workInputs, 
                     {
                     width: deviceWidth < 500 ? '100%' : ( deviceWidth < 800 ? '80%' : deviceWidth < 100 ? '60%' : '50%'),
                     paddingHorizontal: deviceWidth < 500 ? 15 : 5
                     }]}>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select outer frame</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setRoundFrame(true);
                                setBigWallFrame(false);
                                setFrameType('round-frame');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isRoundFrame ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Round frame</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setRoundFrame(false);
                                setBigWallFrame(true);
                                setFrameType('wall-frame');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBigWallFrame ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Wall frame</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Profile Color</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(true);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('white');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWhite ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>White</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(true);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('grey');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isGrey ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Grey</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(true);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('black');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlack ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Black</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(true);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('champagne');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isChampagne ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Champagne</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                    setGrey(false);
                                    setBlack(false);
                                    setChampagne(false);
                                    setSilver(true);
                                    setWood(false);
                                    setProfileColor('silver');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSilver ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Silver</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(true);
                                setProfileColor('wood');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWood ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Wood</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Glass Type</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(true);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('tinted');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isTintedGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Tinted glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(true);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('bronze-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBronzeRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Bronze reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(true);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('dark');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(true);
                                setBlueRefGlass(false);
                                setGlassColor('dark-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(true);
                                setGlassColor('blue-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlueRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Blue reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(true);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('plain');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isPlainGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Plain glass</Text>
                            </Pressable>
                        </View>
                    </View>
                </View> 
                {/* --- TRIALCO END --- */}
                <View style={styles.proceedBtnCon}>
                    <Pressable style={({pressed}) => [
                        styles.proceedBtn,
                        pressed && {opacity: 0.5}
                    ]}
                    onPress={() => {
                        setMatOptLoading(true);
                        
                        setTimeout(() => {
                            calculateHandler();
                            setMatOptLoading(false); 
                        }, 2000);
                    }}
                    >
                        <Text style={styles.txtProceed}>Calculate</Text>
                    </Pressable>
                </View>
            </ScrollView> 
            {/* --- SLIDING VIEW END --- */}
            {/* PROJECTED & CASEMENT VIEW */}
            <ScrollView style={{
                height: 1,
                display: workType === 'Projected' || workType === 'Casement' ? 'flex' : 'none',
            }}>
                <View style={{alignItems: 'center', marginBottom: 30}}>
                    <View style={[
                     styles.workInputs, 
                     {
                     width: deviceWidth < 500 ? '100%' : ( deviceWidth < 800 ? '80%' : deviceWidth < 100 ? '60%' : '50%'),
                     paddingHorizontal: deviceWidth < 500 ? 15 : 5
                     }]}>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select outer frame</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setSmallL(true);
                                setBigL(false);
                                setLType('small-l');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSmallL ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Small L-outer</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setSmallL(false);
                                setBigL(true);
                                setLType('big-l');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBigL ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Big L-outer</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select T type</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setSmallT(true);
                                    setBigT(false);
                                    setTType('small-t');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSmallT ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Small T</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setSmallT(false);
                                setBigT(true);
                                setTType('big-t');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBigT ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Big T</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Profile Color</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(true);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('white');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWhite ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>White</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(true);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('grey');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isGrey ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Grey</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(true);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('black');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlack ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Black</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(true);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('champagne');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isChampagne ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Champagne</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                    setGrey(false);
                                    setBlack(false);
                                    setChampagne(false);
                                    setSilver(true);
                                    setWood(false);
                                    setProfileColor('silver');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSilver ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Silver</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(true);
                                setProfileColor('wood');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWood ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Wood</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Glass Type</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(true);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('tinted');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isTintedGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Tinted glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(true);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('bronze-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBronzeRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Bronze reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(true);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('dark');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(true);
                                setBlueRefGlass(false);
                                setGlassColor('dark-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(true);
                                setGlassColor('blue-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlueRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Blue reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(true);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('plain');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isPlainGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Plain glass</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.proceedBtnCon}>
                    <Pressable style={({pressed}) => [
                        styles.proceedBtn,
                        pressed && {opacity: 0.5}
                    ]}
                    onPress={() => {
                        setMatOptLoading(true);
                        
                        setTimeout(() => {
                            calculateHandler();
                            setMatOptLoading(false); 
                        }, 2000);
                    }}
                    >
                        <Text style={styles.txtProceed}>Calculate</Text>
                    </Pressable>
                </View>
            </ScrollView> 
            {/* --- PROJECTED & CASEMENT VIEW END --- */}
            {/* HINGE VIEW */}
            <ScrollView style={{
                height: 1,
                display: workType === 'Hinge' ? 'flex' : 'none',
             }}>
                <View style={{alignItems: 'center', marginBottom: 30}}>
                    <View style={[
                     styles.workInputs, 
                     {
                     width: deviceWidth < 500 ? '100%' : ( deviceWidth < 800 ? '80%' : deviceWidth < 100 ? '60%' : '50%'),
                     paddingHorizontal: deviceWidth < 500 ? 15 : 5
                     }]}>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select outer frame</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setHingeSmallL(false);
                                setHingeBigL(true);
                                sethingeLType('big-l');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isHingeBigL ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Big L-outer</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setHingeSmallL(true);
                                setHingeBigL(false);
                                sethingeLType('small-l');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isHingeSmallL ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Small L-outer</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select T type</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setSmallT(true);
                                setBigT(false);
                                setTType('small-t');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSmallT ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Small T</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setSmallT(false);
                                setBigT(true);
                                setTType('big-t');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBigT ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Big T</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select division profile</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setMolliumForDiv(true);
                                setBigTForDiv(false);
                                setDivisionType('mullion');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isMolliumForDiv ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Mollium</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setMolliumForDiv(false);
                                setBigTForDiv(true);
                                setDivisionType('big-t');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBigTForDiv ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Use Big-T as mollium</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Profile Color</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(true);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('white');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWhite ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>White</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(true);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('grey');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isGrey ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Grey</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(true);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('black');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlack ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Black</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(true);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('champagne');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isChampagne ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Champagne</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                    setGrey(false);
                                    setBlack(false);
                                    setChampagne(false);
                                    setSilver(true);
                                    setWood(false);
                                    setProfileColor('silver');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSilver ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Silver</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(true);
                                setProfileColor('wood');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWood ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Wood</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Glass Type</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(true);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('tinted');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isTintedGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Tinted glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(true);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('bronze-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBronzeRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Bronze reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(true);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('dark');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(true);
                                setBlueRefGlass(false);
                                setGlassColor('dark-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(true);
                                setGlassColor('blue-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlueRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Blue reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(true);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('plain');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isPlainGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Plain glass</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.proceedBtnCon}>
                    <Pressable style={({pressed}) => [
                        styles.proceedBtn,
                        pressed && {opacity: 0.5}
                    ]}
                    onPress={() => {
                        setMatOptLoading(true);
                        
                        setTimeout(() => {
                            calculateHandler();
                            setMatOptLoading(false); 
                        }, 2000);
                    }}
                    >
                        <Text style={styles.txtProceed}>Calculate</Text>
                    </Pressable>
                </View>
            </ScrollView> 
            {/* ---- HINGE VIEW END ---- */}
            {/* SWING VIEW */}
            <ScrollView style={{
                height: 1,
                display: workType === 'Swing' ? 'flex' : 'none',
             }}>
                <View style={{alignItems: 'center', marginBottom: 30}}>
                    <View style={[
                     styles.workInputs, 
                     {
                     width: deviceWidth < 500 ? '100%' : ( deviceWidth < 800 ? '80%' : deviceWidth < 100 ? '60%' : '50%'),
                     paddingHorizontal: deviceWidth < 500 ? 15 : 5
                     }]}>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select door division profile</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setMolliumForDiv(true);
                                setBigTForDiv(false);
                                setDivisionType('mullion');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isMolliumForDiv ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Mollium</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setMolliumForDiv(false);
                                setBigTForDiv(true);
                                setDivisionType('big-t');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBigTForDiv ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Use Big-T as mollium</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Profile Color</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(true);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('white');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWhite ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>White</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(true);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('grey');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isGrey ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Grey</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(true);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('black');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlack ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Black</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(true);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('champagne');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isChampagne ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Champagne</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                    setGrey(false);
                                    setBlack(false);
                                    setChampagne(false);
                                    setSilver(true);
                                    setWood(false);
                                    setProfileColor('silver');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSilver ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Silver</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(true);
                                setProfileColor('wood');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWood ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Wood</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Glass Type</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(true);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('tinted');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isTintedGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Tinted glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(true);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('bronze-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBronzeRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Bronze reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(true);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('dark');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(true);
                                setBlueRefGlass(false);
                                setGlassColor('dark-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(true);
                                setGlassColor('blue-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlueRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Blue reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(true);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('plain');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isPlainGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Plain glass</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.proceedBtnCon}>
                    <Pressable style={({pressed}) => [
                        styles.proceedBtn,
                        pressed && {opacity: 0.5}
                    ]}
                    onPress={() => {
                        setMatOptLoading(true);
                        
                        setTimeout(() => {
                            calculateHandler();
                            setMatOptLoading(false); 
                        }, 2000);
                    }}
                    >
                        <Text style={styles.txtProceed}>Calculate</Text>
                    </Pressable>
                </View>
            </ScrollView> 
            {/* ---- SWING VIEW END ---- */}
            {/* FIXED VIEW */}
            <ScrollView style={{
                height: 1,
                display: workType === 'Fixed' ? 'flex' : 'none',
             }}>
                <View style={{alignItems: 'center', marginBottom: 30}}>
                    <View style={[
                     styles.workInputs, 
                     {
                     width: deviceWidth < 500 ? '100%' : ( deviceWidth < 800 ? '80%' : deviceWidth < 100 ? '60%' : '50%'),
                     paddingHorizontal: deviceWidth < 500 ? 15 : 5
                     }]}>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select outer frame</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setSmallL(true);
                                setBigL(false);
                                setLType('small-l');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSmallL ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Small L-outer</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setSmallL(false);
                                setBigL(true);
                                setLType('big-l');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBigL ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Big L-outer</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select T type</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setSmallT(true);
                                setBigT(false);
                                setTType('small-t');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSmallT ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Small T</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setSmallT(false);
                                setBigT(true);
                                setTType('big-t');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBigT ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Big T</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Profile Color</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(true);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('white');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWhite ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>White</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(true);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('grey');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isGrey ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Grey</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(true);
                                setChampagne(false);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('black');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlack ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Black</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(true);
                                setSilver(false);
                                setWood(false);
                                setProfileColor('champagne');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isChampagne ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Champagne</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                    setGrey(false);
                                    setBlack(false);
                                    setChampagne(false);
                                    setSilver(true);
                                    setWood(false);
                                    setProfileColor('silver');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isSilver ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Silver</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setWhite(false);
                                setGrey(false);
                                setBlack(false);
                                setChampagne(false);
                                setSilver(false);
                                setWood(true);
                                setProfileColor('wood');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isWood ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Wood</Text>
                            </Pressable>
                        </View>
                        <View style={styles.unitOptions}>
                            <Text style={styles.txtunitTitle}>Select Glass Type</Text>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(true);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('tinted');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isTintedGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Tinted glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(true);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('bronze-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBronzeRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Bronze reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(true);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('dark');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(true);
                                setBlueRefGlass(false);
                                setGlassColor('dark-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isDarkRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Dark reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(false);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(true);
                                setGlassColor('blue-ref');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isBlueRefGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Blue reflective glass</Text>
                            </Pressable>
                            <Pressable
                             style={[styles.unitOption, {marginBottom: 35}]}
                             onPress={() => {
                                setPlainGlass(true);
                                setTintedGlass(false);
                                setBronzeRefGlass(false);
                                setDarkGlass(false);
                                setDarkRefGlass(false);
                                setBlueRefGlass(false);
                                setGlassColor('plain');
                             }}
                            >
                                <View style={styles.unitSelect}>
                                    <View style={[styles.select, {display: isPlainGlass ? 'flex' : 'none'}]}></View>
                                </View>
                                <Text style={styles.txtUnit}>Plain glass</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.proceedBtnCon}>
                    <Pressable style={({pressed}) => [
                        styles.proceedBtn,
                        pressed && {opacity: 0.5}
                    ]}
                        onPress={() => {
                            setMatOptLoading(true);
                            
                            setTimeout(() => {
                                calculateHandler();
                                setMatOptLoading(false); 
                            }, 2000);
                        }}
                    >
                        <Text style={styles.txtProceed}>Calculate</Text>
                    </Pressable>
                </View>
            </ScrollView> 
            {/* --- FIXED VIEW END --- */}
        </View>
    );
}

const borderColor = "rgba(0, 0, 0, 0.6)";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#383961',
        marginBottom: 10,
    },
    txtHeaderInfo: {
        color: '#fff',
        letterSpacing: 3,
        fontFamily: 'Underdog',
        textAlign: 'center',
        marginBottom: 5,
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
    workInputs: {
        // backgroundColor: 'yellow',
        alignItems: 'center',
    },
    unitOptions: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'rgba(207, 205, 221, 0.5)',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 3,
    },
    txtunitTitle: {
        letterSpacing: 3,
        marginBottom: 20,
        marginLeft: 5,
        color: 'rgb(90, 48, 38)',
        fontWeight: '500'
    },
    unitOption: {
        flexDirection: 'row',
    },
    unitSelect: {
        width: 40,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 5,
        marginRight: 15,
    },
    select: {
        width: '80%',
        height: '60%',
        borderRadius: 3,
        backgroundColor: '#1C0B19',
    },
    txtUnit: {
        letterSpacing: 3,
    },
    proceedBtnCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
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
        letterSpacing: 3,
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
    },
});