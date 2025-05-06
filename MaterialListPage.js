import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, Image, Modal, TextInput, ToastAndroid, BackHandler} from "react-native";
import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AlufappContext } from "./alufapp-context";
import AlufappToast from "./AlufappToast";
import SavingCalculating from "./SavingCalculating";

function MaterialListPage({ route }) {
    const dimensions = route.params.dimensions;
    const materialList = route.params.materialList;
    const offcutlList = route.params.offcutlList;
    const workTitle = route.params.workTitle;
    const workType = route.params.workType;
    const profileColor = route.params.profileColor;
    const totalPieces = route.params.totalPieces;
    const glassColor = route.params.glassColor;
    const frameType = route.params.frameType;
    const leafType = route.params.leafType;
    const netType = route.params.netType;
    const lockType = route.params.lockType;
    const netHandleType = route.params.netHandleType;
    const fiberNetType = route.params.fiberNetType;
    const lType = route.params.lType;
    const tType = route.params.tType;
    const divisionType = route.params.divisionType;
    const bottomType = route.params.bottomType;
    const cursorColor = '#ff9';

    const alufappContext = useContext(AlufappContext);
    const priceList = alufappContext.priceList;
    const usage = alufappContext.matCalcusage;
    const isLimited = alufappContext.isMaterialCalcLimited;
    const previousWorkArea = alufappContext.prevWorkArea;
    const currentWorkArea = alufappContext.currentWorkArea;
    const windowsLimit = 3;

    const isToast = alufappContext.isToast;
    const isWhichToast = alufappContext.isWhichToast;

    const navigation = useNavigation();
    const deviceDimension = Dimensions.get("window");
    const deviceWidth = deviceDimension.width;

    const [profileType, setProfileType] = useState(route.params.profileType);

    let slidingItemCount = 1;
    let projItemCount = 1;
    let hingeItemCount = 1;
    let swingItemCount = 1;
    let fixedItemCount = 1;

    const [isHomeAlert, setHomeAlert] = useState(false);
    const [isSaving, setSaving] = useState(false);
    const [isSetPrices, setSetPrices] = useState(false);

    const [currentDate, setCurrentDate] = useState();
    const [selfPriceList, setSelfPriceList] = useState(null);
    const [isMatListLoading, setMatListLoading] = useState(false);

    const [isSliding, setSliding] = useState(false);
    const [isDivision, setDivision] = useState(false);
    const [isProjected, setProjected] = useState(false);
    const [isCasement, setCasement] = useState(false);
    const [isHinge, setHinge] = useState(false);
    const [isSwing, setSwing] = useState(false);
    const [isFixed, setFixed] = useState(false);

    const [isSkit60, setSkit60] = useState(false);
    const [isKs50, setKs50] = useState(false);
    const [isTrialco, setTrialco] = useState(false);
    const [isItalian, setItalian] = useState(false);
    const [isEco, setEco] = useState(false);

    const [framesCost, setFramesCost] = useState(0);
    const [accessoriesCost, setAccessoriesCost] = useState(0);
    const [projectTotalCost, setProjectTotalCost] = useState(0);

    const [outerTotalPrice, setOuterTotalPrice] = useState(0);
    const [leafTotalPrice, setLeafTotalPrice] = useState(0);
    const [divisionTotalPrice, setDivisionTotalPrice] = useState(0);
    const [interlockTotalPrice, setInterlockTotalPrice] = useState(0);
    const [netTotalPrice, setNetTotalPrice] = useState(0);
    const [glassTotalCost, setGlassTotalCost] = useState(0);
    const [frameCornersCost, setFrameCornersCost] = useState(0);
    const [leafCornersCost, setLeafCornersCost] = useState(0);
    const [netCornersCost, setNetCornersCost] = useState(0);
    const [brushCost, setBrushCost] = useState(0);
    const [rollersCost, setRollersCost] = useState(0);
    const [locksCost, setLocksCost] = useState(0);
    const [netHandlesCost, setNetHandlesCost] = useState(0);
    const [glazingRubbersCost, setGlazingRbbersCost] = useState(0);
    const [netRubbersCost, setNetRubbersCost] = useState(0);
    const [fiberNetCost, setFiberNetCost] = useState(0);
    const [installScrewsCost, setInstallScrewsCost] = useState(0);
    const [trialcoKitCost, setTrialcoKitCost] = useState(0);

    const [roundFramePrice, setRoundFramePrice] = useState(0);
    const [smallWallFramePrice, setSmallWallFramePrice] = useState(0);
    const [bigWallFramePrice, setBigWallFramePrice] = useState(0);
    const [flatLeafPrice, setFlatLeafPrice] = useState(0);
    const [roundLeafPrice, setRoundLeafPrice] = useState(0);
    const [smallNetLeafPrice, setSmallNetLeafPrice] = useState(0);
    const [bigNetLeafPrice, setBigNetLeafPrice] = useState(0);
    const [interlockPrice, setInterlockPrice] = useState(0);
    const [leafDivisionPrice, setLeafDivisionPrice] = useState(0);
    const [fourBayAdaptorPrice, setFourBayAdaptorPrice] = useState(0);
    const [ks50RoundFramePrice, setKs50RoundFramePrice] = useState(0);
    const [ks50WallFramePrice, setKs50WallFramePrice] = useState(0);
    const [ks50LeafPrice, setKs50LeafPrice] = useState(0);
    const [ks50InterlockPrice, setKs50InterlockPrice] = useState(0);
    const [trialcoRoundFramePrice, setTrialcoRoundFramePrice] = useState(0);
    const [trialcoWallFramePrice, setTrialcoWallFramePrice] = useState(0);
    const [trialcoLeafPrice, setTrialcoLeafPrice] = useState(0);
    const [trialcoInterlockPrice, setTrialcoInterlockPrice] = useState(0);
    const [frameCornerPrice, setFrameCornerPrice] = useState(0);
    const [leafCornerPrice, setLeafCornerPrice] = useState(0);
    const [netCornerPrice, setNetCornerPrice] = useState(0);
    const [O4CornerPrice, setO4CornerPrice] = useState(0);
    const [brushPrice, setBrushPrice] = useState(0);
    const [rollerPrice, setRollerPrice] = useState(0);
    const [heavyDutyRollerPrice, setHeavyDutyRollerPrice] = useState(0);
    const [trialcoRollerPrice, setTrialcoRollerPrice] = useState(0);
    const [trialcoKitPrice, setTrialcoKitPrice] = useState(0);
    const [metalLockPrice, setMetalLockPrice] = useState(0);
    const [pressLockPrice, setPressLockPrice] = useState(0);
    const [slidingKeyPrice, setSlidingKeyPrice] = useState(0);
    const [smallNetHandlePrice, setSmallNetHandlePrice] = useState(0);
    const [bigNetHandlePrice, setBigNetHandlePrice] = useState(0);
    const [shortFiberNetPrice, setShortFiberNetPrice] = useState(0);
    const [longFiberNetPrice, setLongFiberNetPrice] = useState(0);
    const [netRubberPrice, setNetRubberPrice] = useState(0);
    const [glazingRubberPrice, setGlazingRubberPrice] = useState(0);
    const [louterPrice, setLouterPrice] = useState(0);
    const [bigLPrice, setBigLPrice] = useState(0);
    const [smallTPrice, setSmallTPrice] = useState(0);
    const [bigTPrice, setBigTPrice] = useState(0);
    const [bigZPrice, setBigZPrice] = useState(0);
    const [mullionPrice, setMullionPrice] = useState(0);
    const [bottomPrice, setBottomPrice] = useState(0);
    const [hingeAdaptorPrice, setHingeAdaptorPrice] = useState(0);
    const [brushAdaptorPrice, setBrushAdaptorPrice] = useState(0);
    const [beadingPrice, setBeadingPrice] = useState(0);
    const [ecoLouterPrice, setECoLouterPrice] = useState(0);
    const [ecoBigLPrice, setEcoBigLPrice] = useState(0);
    const [ecoSmallTPrice, setEcoSmallTPrice] = useState(0);
    const [ecoBigTPrice, setEcoBigTPrice] = useState(0);
    const [ecoBigZPrice, setEcoBigZPrice] = useState(0);
    const [ecoMullionPrice, setEcoMullionPrice] = useState(0);
    const [ecoBottomPrice, setEcoBottomPrice] = useState(0);
    const [ecoBeadingPrice, setEcoBeadingPrice] = useState(0);
    //////////////////////////////////////////////////////
    const [louterCornerPrice, setLouterCornerPrice] = useState(0);
    const [bigZCornerPrice, setBigZCornerPrice] = useState(0);
    const [adaptorBrushPrice, setAdaptorBrushPrice] = useState(0);
    const [projectedHingesPrice, setProjectedHingesPrice] = useState();
    const [hingesPrice, setHingesPrice] = useState(0);
    const [hingeHandlePrice, setHingeHandlePrice] = useState(0);
    const [ecoHingesPrice, setEcoHingesPrice] = useState(0);
    const [beadingRubberPrice, setBeadingRubberPrice] = useState(0);
    const [frameRubberPrice, setFrameRubberPrice] = useState(0);
    const [casementStopperPrice, setCasementStopperPrice] = useState(0);
    const [projectedHandlePrice, setProjectedHandlePrice] = useState(0);
    const [doorHandlePrice, setDoorHandlePrice] = useState(0);
    const [downCloserPrice, setDownCloserPrice] = useState(0);
    const [hingeDoorKeyPrice, setHingeDoorKeyPrice] = useState(0);
    const [towerBoltPrice, setTowerBoltPrice] = useState(0);
    const [installScrewsPrice, setInstallationScrewPrice] = useState(0);
    const [wallPlugsPrice, setWallPlugPrice] = useState(0);
    const [glassPrice, setGlassPrice] = useState(0);
    const [doorBrushPrice, setDoorBrushPrice] = useState(0);
    const [pipeHandlePrice, setPipeHandlePrice] = useState(0);
    const [] = useState();

    const [LOuterCost, setLouterCost] = useState(0);
    const [bigLCost, setBigLCost] = useState(0);
    const [smallTCost, setTCost] = useState(0);
    const [bigTCost, setBigTCost] = useState(0);
    const [ZCost, setZCost] = useState(0);
    const [mullionCost, setMullionCost] = useState(0);
    const [bottomCost, setbottomCost] = useState(0);
    const [adaptorCost, setAdaptorCost] = useState(0);
    const [beadingCost, setBeadingCost] = useState(0);
    const [louterCornersCost, setLouterCornersCost] = useState(0);
    const [bigZornersCost, setBigZCornersCost] = useState(0);
    const [hingesCost, setHingesCost] = useState(0);
    const [keysCost, setKeysCost] = useState(0);
    const [handlesCost, setHandlesCost] = useState(0);
    const [projectedHandleCost, setProjectedHandleCost] = useState(0);
    const [casementStopperCost, setCasementStopperCost] = useState(0);
    const [towerBoltCost, setTowerBoltCost] = useState(0);
    const [frameRubberCost, setFrameRubberCost] = useState(0);
    const [beadingRubberCost, setBeadingRubberCost] = useState(0);
    const [doorBrushCost, setDoorBrushCost] = useState(0);
    const [downCloserCost, setDownCloserCost] = useState(0);
    const [adaptorBrushCost, setAdaptorBrushCost] = useState(0);
    const [wallPlugCost, setWallPlugCost] = useState(0);

    const setUsage = async () => {
        try {
            if (!isLimited && totalPieces > windowsLimit) {
                if (previousWorkArea !== null) {
                    if (previousWorkArea !== currentWorkArea) {
                        let newUsage = usage - 1;
                        if (newUsage <= 0) {
                            newUsage = 0;
                            alufappContext.setMaterialCalcLimited();
                        }
                        alufappContext.setMatCalUsage(newUsage);
                        await AsyncStorage.setItem('@mwusage', newUsage.toString());
                    }
                }
                else {
                    let newUsage = usage - 1;
                    if (newUsage <= 0) {
                        newUsage = 0;
                        alufappContext.setMaterialCalcLimited();
                    }
                    alufappContext.setMatCalUsage(newUsage);
                    await AsyncStorage.setItem('@mwusage', newUsage.toString());
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setDate = () => {
        const date = new Date();
        const day = date.getDay();
        const month = date.getMonth() + 1;
        let dayStr = '';
        let monthStr = '';
        
        if (day == 1) {dayStr = 'Monday,'}
        else if (day == 2) {dayStr = 'Tuesday,'}
        else if (day == 3) {dayStr = 'Wednesday,'}
        else if (day == 4) {dayStr = 'Thursday,'}
        else if (day == 5) {dayStr = 'Friday,'}
        else if (day == 6) {dayStr = 'Saturday,'}
        else {dayStr = 'Sunday,'}

        if (month == 1) {monthStr = 'Jan'}
        else if (month == 2) {monthStr = 'Feb'}
        else if (month == 3) {monthStr = 'Mar'}
        else if (month == 4) {monthStr = 'Apr'}
        else if (month == 5) {monthStr = 'May'}
        else if (month == 6) {monthStr = 'Jun'}
        else if (month == 7) {monthStr = 'Jul'}
        else if (month == 8) {monthStr = 'Aug'}
        else if (month == 9) {monthStr = 'Sep'}
        else if (month == 10) {monthStr = 'Oct'}
        else if (month == 11) {monthStr = 'Nov'}
        else if (month == 12) {monthStr = 'Dec'}

        let dateStr = `${dayStr} ${date.getDate()}/${monthStr}/${date.getFullYear()}`
        setCurrentDate(dateStr);
        
    }

    useEffect(() => {
        alufappContext.closeMatCalculating();
        setUsage();
        setDate();

        if (profileType === 'Italian') {
            setItalian(true);
        }
        else if (profileType === 'Eco') {
            setEco(true);
        }
        else if (profileType === 'Skit-60') {
            setSkit60(true);
        }
        else if (profileType === 'KS-50') {
            setKs50(true);
        }
        else if (profileType === 'Trialco') {
            setTrialco(true);
        }
    }, []);
    
    useEffect( () => {
        let pricesFetched = false;

        try {
            let type = typeof(priceList);
            if (type === 'object') {
                if (priceList.hasOwnProperty("accessories")) {
                    pricesFetched = true;
                }
                else {
                    pricesFetched = false;
                }
            }
            else {
                pricesFetched = false;
            }
        } catch (error) {
            pricesFetched = false;
        }
        
        if (pricesFetched) {
            try {
                let framesCost, AccCost, totalCost;
                
                if (profileColor === 'white') {
                    setRoundFramePrice(parseFloat(priceList.round_frame.white));
                    setSmallWallFramePrice(parseFloat(priceList.small_wall_frame.white));
                    setBigWallFramePrice(parseFloat(priceList.big_wall_frame.white));
                    setFlatLeafPrice(parseFloat(priceList.flat_leaf.white));
                    setRoundLeafPrice(parseFloat(priceList.round_leaf.white));
                    setSmallNetLeafPrice(parseFloat(priceList.net_leaf.white));
                    setBigNetLeafPrice(parseFloat(priceList.big_net_leaf.white));
                    setInterlockPrice(parseFloat(priceList.interlock.white));
                    setLeafDivisionPrice(parseFloat(priceList.leaf_division.white));
                    setFourBayAdaptorPrice(parseFloat(priceList.four_bay_adpt.white));
                    setKs50RoundFramePrice(parseFloat(priceList.ks50_round_frame.white));
                    setKs50WallFramePrice(parseFloat(priceList.ks50_wall_frame.white));
                    setKs50LeafPrice(parseFloat(priceList.ks50_leaf.white));
                    setKs50InterlockPrice(parseFloat(priceList.ks50_interlock.white));
                    setTrialcoRoundFramePrice(parseFloat(priceList.trialco_round_frame.white));
                    setTrialcoWallFramePrice(parseFloat(priceList.trialco_wall_frame.white));
                    setTrialcoLeafPrice(parseFloat(priceList.trialco_leaf.white));
                    setTrialcoInterlockPrice(parseFloat(priceList.trialco_interlock.white));
                    setLouterPrice(parseFloat(priceList.louter.white));
                    setBigLPrice(parseFloat(priceList.big_l.white));
                    setSmallTPrice(parseFloat(priceList.small_t.white));
                    setBigTPrice(parseFloat(priceList.big_t.white));
                    setBigZPrice(parseFloat(priceList.big_z.white));
                    setMullionPrice(parseFloat(priceList.mullion.white));
                    setBottomPrice(parseFloat(priceList.bottom.white));
                    setHingeAdaptorPrice(parseFloat(priceList.double_hinge_adaptor.white));
                    setBrushAdaptorPrice(parseFloat(priceList.brush_adpt.white));
                    setBeadingPrice(parseFloat(priceList.beading.white));
                    setECoLouterPrice(parseFloat(priceList.eco_louter.white));
                    setEcoBigLPrice(parseFloat(priceList.eco_big_l.white));
                    setEcoSmallTPrice(parseFloat(priceList.eco_small_t.white));
                    setEcoBigTPrice(parseFloat(priceList.eco_big_t.white));
                    setEcoBigZPrice(parseFloat(priceList.eco_big_z.white));
                    setEcoMullionPrice(parseFloat(priceList.eco_mullion.white));
                    setEcoBottomPrice(parseFloat(priceList.eco_bottom.white));
                    setEcoBeadingPrice(parseFloat(priceList.eco_beading.white));


                    if (workType === 'Sliding' || workType === 'Sliding-division') {
                        
                        if (profileType === 'Skit-60') {
                            const leafPrice = parseFloat(priceList.flat_leaf.white);
                            const divisionPrice = parseFloat(priceList.leaf_division.white);
                            const adaptorPrice = parseFloat(priceList.interlock.white);
                            const fcornerPrice =  parseFloat(priceList.accessories.frame_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.leaf_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, netLeafPrice, lockPrice, handlePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.round_frame.white;
                            }
                            else if (frameType === 'small-wall-frame') {
                                framePrice = priceList.small_wall_frame.white;
                            }
                            else if (frameType === 'big-wall-frame') {
                                framePrice = priceList.big_wall_frame.white
                            }

                            if (netType === 'small-net-leaf') {netLeafPrice = parseFloat(priceList.net_leaf.white)}
                            else {netLeafPrice =  parseFloat(priceList.big_net_leaf.white)}

                            if (lockType === 'metal-lock') {lockPrice = parseFloat(priceList.accessories.metal_lock)}
                            else {lockPrice = parseFloat(priceList.accessories.press_lock)}

                            if (netHandleType === 'small-net-handle') {handlePrice = parseFloat(priceList.accessories.small_net_handle)}
                            else {handlePrice = parseFloat(priceList.accessories.big_net_handle)}

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }


                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'KS-50') {
                            const leafPrice = parseFloat(priceList.ks50_leaf.white);
                            const divisionPrice = parseFloat(priceList.leaf_division.white);
                            const netLeafPrice =  parseFloat(priceList.big_net_leaf.white);
                            const adaptorPrice = parseFloat(priceList.ks50_interlock.white);
                            const fcornerPrice =  parseFloat(priceList.accessories.O4_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.O4_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.heavy_duty_roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const lockPrice = parseFloat(priceList.accessories.press_lock);
                            const handlePrice = parseFloat(priceList.accessories.big_net_handle);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.ks50_round_frame.white;
                            }
                            else if (frameType === 'wall-frame') {
                                framePrice = priceList.ks50_wall_frame.white
                            }
                            else {
                                framePrice = priceList.ks50_wall_frame.white
                            }

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }
                            console.log(framePrice);
                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
            
                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'Trialco') {
                            const leafPrice = parseFloat(priceList.trialco_leaf.white);
                            const divisionPrice = parseFloat(priceList.leaf_division.white);
                            const netLeafPrice =  parseFloat(priceList.big_net_leaf.white);
                            const adaptorPrice = parseFloat(priceList.trialco_interlock.white);
                            const fcornerPrice =  parseFloat(priceList.accessories.O4_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.O4_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.trialco_roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const lockPrice = parseFloat(priceList.accessories.press_lock);
                            const handlePrice = parseFloat(priceList.accessories.big_net_handle);
                            const kitPrice = parseFloat(priceList.accessories.trialco_kit);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.trialco_round_frame.white;
                            }
                            else if (frameType === 'big-wall-frame') {
                                framePrice = priceList.trialco_wall_frame.white;
                            }
                            else {
                                framePrice = priceList.trialco_wall_frame.white;
                            }

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                kitPrice: kitPrice,
                                glassPrice: glassPrice,
                            });

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setTrialcoKitCost(materialList.kit * kitPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
            
                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.kit * kitPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        if (workType === 'Sliding-division' && materialList.leafDivision > 0) {
                            setDivision(true);
                        }
            
                        setSliding(true);
                    }
                    else if (workType === 'Projected' || workType === 'Casement') {
                        if (profileType === 'Italian') {
                            let lPrice, tPrice;
                            let hingesPrc;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.white;
                            }
                            else {
                                lPrice = priceList.louter.white;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.big_t.white;
                            }
                            else {
                                tPrice = priceList.small_t.white;
                            }

                            if (workType === 'Projected') {
                                hingesPrc = priceList.accessories.projected_hinges;
                                setHingesCost(materialList.hinges * hingesPrc); 
                                setProjected(true);
                            }
                            else {
                                hingesPrc = priceList.accessories.hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setCasement(true)
                            }

                            const beadingPrc = priceList.beading.white;
                            const handlePrc = priceList.accessories.projected_handle;
                            const casementStoperPrc = priceList.accessories.casement_stopper;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                hingesPrc: hingesPrc,
                                handlePrc: handlePrc,
                                casementStoperPrc: casementStoperPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigLCorner * bigZCornerPrice);
                            setProjectedHandleCost(materialList.handles * handlePrc);
                            setCasementStopperCost(materialList.casementStopper * casementStoperPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.louterCorner * louterCornerPrice + materialList.bigLCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.handles * handlePrc +
                                materialList.casementStopper * casementStoperPrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }
            
                        else if (profileType === 'Eco') {
                            let lPrice, tPrice;
                            let hingesPrc;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.white;
                            }
                            else {
                                lPrice = priceList.eco_louter.white;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.eco_big_t.white;
                            }
                            else {
                                tPrice = priceList.eco_small_t.white;
                            }

                            if (workType === 'Projected') {
                                hingesPrc = priceList.accessories.projected_hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setProjected(true);
                            }
                            else {
                                hingesPrc = priceList.accessories.eco_hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setCasement(true)
                            }

                            const beadingPrc = priceList.eco_beading.white;
                            const handlePrc = priceList.accessories.projected_handle;
                            const casementStoperPrc = priceList.accessories.casement_stopper;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;
                            
                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                hingesPrc: hingesPrc,
                                handlePrc: handlePrc,
                                casementStoperPrc: casementStoperPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setProjectedHandleCost(materialList.handles * handlePrc);
                            setCasementStopperCost(materialList.casementStopper * casementStoperPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.louterCorner * louterCornerPrice + materialList.hinges * hingesPrc + materialList.handles * handlePrc +
                                materialList.casementStopper * casementStoperPrc + materialList.frameRubber * frameRubberPrc + 
                                materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc + 
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }
                    }
                    else if (workType === 'Hinge') {
                        if (profileType === 'Italian') {
                            let lPrice, divisionPrice = 0;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.white;
                            }
                            else {
                                lPrice = priceList.louter.white;
                            }

                            if (divisionType === 'mullion') {
                                divisionPrice = priceList.mullion.white;
                            }
                            
                            const zPrice = priceList.big_z.white;
                            const tPrice = priceList.big_t.white;
                            const bottomPrc = priceList.bottom.white;
                            const beadingPrc = priceList.beading.white;
                            const adatorPrc = priceList.double_hinge_adaptor.white;
                            const handlePrc = priceList.accessories.hinge_handle;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const hingesPrc = priceList.accessories.hinges;
                            const doorKeyPrc = priceList.accessories.hinge_door_key;
                            const towerBoltPrc = priceList.accessories.tower_bolt;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                zPrice: zPrice,
                                tPrice: tPrice,
                                bottomPrc: bottomPrc,
                                divisionPrice: divisionPrice,
                                beadingPrc: beadingPrc,
                                adatorPrc: adatorPrc,
                                handlePrc: handlePrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                hingesPrc: hingesPrc,
                                doorKeyPrc: doorKeyPrc,
                                towerBoltPrc: towerBoltPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setZCost(materialList.bigZ * zPrice);
                            setBigTCost(materialList.small_big_T * tPrice);
                            setMullionCost(materialList.mollium * divisionPrice);
                            setbottomCost(materialList.bottom * bottomPrc);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setAdaptorCost(materialList.adaptor * adatorPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigZCorner * bigZCornerPrice);
                            setHingesCost(materialList.hinges * hingesPrc);
                            setKeysCost(materialList.key * doorKeyPrc);
                            setHandlesCost(materialList.handles * handlePrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                            framesCost = materialList.LOuter * lPrice + materialList.bigZ * zPrice + materialList.small_big_T * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.adaptor * adatorPrc;
                            AccCost = materialList.louterCorner * louterCornerPrice +  materialList.bigZCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.key * doorKeyPrc +
                                        materialList.handles * handlePrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc +
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc;
                        }
                        else if (profileType === 'Eco') {
                            let lPrice, divisionPrice = 0;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.white;
                            }
                            else {
                                lPrice = priceList.eco_louter.white;
                            }

                            if (divisionType === 'mullion') {
                                divisionPrice = priceList.eco_mullion.white;
                            }
                            
                            const zPrice = priceList.eco_big_z.white;
                            const tPrice = priceList.eco_big_t.white;
                            const bottomPrc = priceList.eco_bottom.white;
                            const beadingPrc = priceList.eco_beading.white;
                            const handlePrc = priceList.accessories.hinge_handle;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const hingesPrc = priceList.accessories.hinges;
                            const doorKeyPrc = priceList.accessories.hinge_door_key;
                            const towerBoltPrc = priceList.accessories.tower_bolt;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                zPrice: zPrice,
                                tPrice: tPrice,
                                bottomPrc: bottomPrc,
                                divisionPrice: divisionPrice,
                                beadingPrc: beadingPrc,
                                handlePrc: handlePrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                hingesPrc: hingesPrc,
                                doorKeyPrc: doorKeyPrc,
                                towerBoltPrc: towerBoltPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setZCost(materialList.bigZ * zPrice);
                            setBigTCost(materialList.small_big_T * tPrice);
                            setMullionCost(materialList.mollium * divisionPrice);
                            setbottomCost(materialList.bottom * bottomPrc);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setAdaptorCost(materialList.adaptor * tPrice);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigZCorner * bigZCornerPrice);
                            setHingesCost(materialList.hinges * hingesPrc);
                            setKeysCost(materialList.key * doorKeyPrc);
                            setHandlesCost(materialList.handles * handlePrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                            framesCost = materialList.LOuter * lPrice + materialList.bigZ * zPrice + materialList.small_big_T * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.adaptor * tPrice;
                            AccCost = materialList.louterCorner * louterCornerPrice +  materialList.bigZCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.key * doorKeyPrc +
                                        materialList.handles * handlePrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc +
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc;
                        }

                        setHinge(true);
                    }
                    else if (workType === 'Swing') { 
                        
                        let divisionPrice = 0;

                        if (divisionType === 'mullion') {
                            divisionPrice = priceList.mullion.white;
                        }

                        const lPrice = priceList.big_l.white;
                        const brushAdaptorPrc = priceList.brush_adpt.white;
                        const tPrice = priceList.big_t.white;
                        const bottomPrc = priceList.bottom.white;
                        const beadingPrc = priceList.beading.white;
                        const handlePrc = priceList.accessories.swing_door_pipe_handle;
                        const frameRubberPrc = priceList.accessories.frame_rubber;
                        const beadingRubberPrc = priceList.accessories.beading_rubber;
                        const bigZCornerPrice = priceList.accessories.big_z_corner;
                        const adaptorBrushPrc = priceList.accessories.adaptor_brush;
                        const downCloserPrc = priceList.accessories.down_closer;
                        const doorKeyPrc = priceList.accessories.hinge_door_key;
                        const towerBoltPrc = priceList.accessories.tower_bolt;
                        const installScrewsPrice = priceList.accessories.installation_screw;
                        const wallPlugPrice = priceList.accessories.wall_plug;

                        let glassPrice;
                        if (glassColor === 'tinted') {
                            setGlassPrice(priceList.glass.tinted);
                            glassPrice = priceList.glass.tinted;
                        }
                        else if (glassColor === 'bronze-ref') {
                            setGlassPrice(priceList.glass.bronze_reflective);
                            glassPrice = priceList.glass.bronze_reflective;
                        }
                        else if (glassColor === 'dark') {
                            setGlassPrice(priceList.glass.dark);
                            glassPrice = priceList.glass.dark;
                        }
                        else if (glassColor === 'dark-ref') {
                            setGlassPrice(priceList.glass.dark_reflective);
                            glassPrice = priceList.glass.dark_reflective;
                        }
                        else if (glassColor === 'blue-ref') {
                            setGlassPrice(priceList.glass.blue_reflective);
                            glassPrice = priceList.glass.blue_reflective;
                        }
                        else if (glassColor === 'plain') {
                            setGlassPrice(priceList.glass.plain);
                            glassPrice = priceList.glass.plain;
                        }

                        setSelfPriceList({
                            lPrice: lPrice,
                            brushAdaptorPrc: brushAdaptorPrc,
                            tPrice: tPrice,
                            bottomPrc: bottomPrc,
                            divisionPrice: divisionPrice,
                            beadingPrc: beadingPrc,
                            handlePrc: handlePrc,
                            frameRubberPrc: frameRubberPrc,
                            beadingRubberPrc: beadingRubberPrc,
                            bigZCornerPrice: bigZCornerPrice,
                            adaptorBrushPrc: adaptorBrushPrc,
                            downCloserPrc: downCloserPrc,
                            doorKeyPrc: doorKeyPrc,
                            towerBoltPrc: towerBoltPrc,
                            installScrewsPrice: installScrewsPrice,
                            wallPlugPrice: wallPlugPrice,
                            glassPrice: glassPrice,
                        });

                        setBigLCost(materialList.bigL * lPrice);
                        setBigTCost(materialList.bigT * tPrice);
                        setMullionCost(materialList.mollium * divisionPrice);
                        setbottomCost(materialList.bottom * bottomPrc);
                        setBeadingCost(materialList.beading * beadingPrc);
                        setAdaptorCost(materialList.brushAdaptor * brushAdaptorPrc);
                        setBigZCornersCost(materialList.corners * bigZCornerPrice);
                        setDownCloserCost(materialList.downCloser * downCloserPrc);
                        setKeysCost(materialList.key * doorKeyPrc);
                        setHandlesCost(materialList.handle * handlePrc);
                        setAdaptorBrushCost(materialList.adaptorBrush * adaptorBrushPrc);
                        setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                        setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                        setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                        setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                        setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                        framesCost = materialList.bigL * lPrice + materialList.bigT * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.brushAdaptor * brushAdaptorPrc;
                        AccCost = materialList.corners * bigZCornerPrice + materialList.key * doorKeyPrc + materialList.adaptorBrush * adaptorBrushPrc +
                                        materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.downCloser * downCloserPrc +
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc +
                                        materialList.handle * handlePrc;

                        setSwing(true);
                    }
                    else if (workType === 'Fixed') {
                        if (profileType === 'Italian') {
                            let lPrice, tPrice, louterCornerPrice;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.white;
                                louterCornerPrice = priceList.accessories.big_z_corner;

                            }
                            else {
                                lPrice = priceList.louter.white;
                                louterCornerPrice = priceList.accessories.louter_corner;
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.big_t.white;
                            }
                            else {
                                tPrice = priceList.small_t.white;
                            }

                            const beadingPrc = priceList.beading.white;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.corners * louterCornerPrice);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.corners * louterCornerPrice + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'Eco') {
                            let lPrice, tPrice;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.white;
                            }
                            else {
                                lPrice = priceList.eco_louter.white;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.eco_big_t.white;
                            }
                            else {
                                tPrice = priceList.eco_small_t.white;
                            }

                            const beadingPrc = priceList.eco_beading.white;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.corners * louterCornerPrice);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.corners * louterCornerPrice + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        setFixed(true);
                    }
                    
                    
                }
                else if (profileColor === 'grey') {
                    setRoundFramePrice(parseFloat(priceList.round_frame.grey));
                    setSmallWallFramePrice(parseFloat(priceList.small_wall_frame.grey));
                    setBigWallFramePrice(parseFloat(priceList.big_wall_frame.grey));
                    setFlatLeafPrice(parseFloat(priceList.flat_leaf.grey));
                    setRoundLeafPrice(parseFloat(priceList.round_leaf.grey));
                    setSmallNetLeafPrice(parseFloat(priceList.net_leaf.grey));
                    setBigNetLeafPrice(parseFloat(priceList.big_net_leaf.grey));
                    setInterlockPrice(parseFloat(priceList.interlock.grey));
                    setLeafDivisionPrice(parseFloat(priceList.leaf_division.grey));
                    setFourBayAdaptorPrice(parseFloat(priceList.four_bay_adpt.grey));
                    setKs50RoundFramePrice(parseFloat(priceList.ks50_round_frame.grey));
                    setKs50WallFramePrice(parseFloat(priceList.ks50_wall_frame.grey));
                    setKs50LeafPrice(parseFloat(priceList.ks50_leaf.grey));
                    setKs50InterlockPrice(parseFloat(priceList.ks50_interlock.grey));
                    setTrialcoRoundFramePrice(parseFloat(priceList.trialco_round_frame.grey));
                    setTrialcoWallFramePrice(parseFloat(priceList.trialco_wall_frame.grey));
                    setTrialcoLeafPrice(parseFloat(priceList.trialco_leaf.grey));
                    setTrialcoInterlockPrice(parseFloat(priceList.trialco_interlock.grey));
                    setLouterPrice(parseFloat(priceList.louter.grey));
                    setBigLPrice(parseFloat(priceList.big_l.grey));
                    setSmallTPrice(parseFloat(priceList.small_t.grey));
                    setBigTPrice(parseFloat(priceList.big_t.grey));
                    setBigZPrice(parseFloat(priceList.big_z.grey));
                    setMullionPrice(parseFloat(priceList.mullion.grey));
                    setBottomPrice(parseFloat(priceList.bottom.grey));
                    setHingeAdaptorPrice(parseFloat(priceList.double_hinge_adaptor.grey));
                    setBrushAdaptorPrice(parseFloat(priceList.brush_adpt.grey));
                    setBeadingPrice(parseFloat(priceList.beading.grey));
                    setECoLouterPrice(parseFloat(priceList.eco_louter.grey));
                    setEcoBigLPrice(parseFloat(priceList.eco_big_l.grey));
                    setEcoSmallTPrice(parseFloat(priceList.eco_small_t.grey));
                    setEcoBigTPrice(parseFloat(priceList.eco_big_t.grey));
                    setEcoBigZPrice(parseFloat(priceList.eco_big_z.grey));
                    setEcoMullionPrice(parseFloat(priceList.eco_mullion.grey));
                    setEcoBottomPrice(parseFloat(priceList.eco_bottom.grey));
                    setEcoBeadingPrice(parseFloat(priceList.eco_beading.grey));

                    if (workType === 'Sliding' || workType === 'Sliding-division') {
                        if (profileType === 'Skit-60') {
                            const leafPrice = parseFloat(priceList.flat_leaf.grey);
                            const divisionPrice = parseFloat(priceList.leaf_division.grey);
                            const adaptorPrice = parseFloat(priceList.interlock.grey);
                            const fcornerPrice =  parseFloat(priceList.accessories.frame_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.leaf_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, netLeafPrice, lockPrice, handlePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.round_frame.grey;
                            }
                            else if (frameType === 'small-wall-frame') {
                                framePrice = priceList.small_wall_frame.grey;
                            }
                            else if (frameType === 'big-wall-frame') {
                                framePrice = priceList.big_wall_frame.grey
                            }

                            if (netType === 'small-net-leaf') {netLeafPrice = parseFloat(priceList.net_leaf.grey)}
                            else {netLeafPrice =  parseFloat(priceList.big_net_leaf.grey)}

                            if (lockType === 'metal-lock') {lockPrice = parseFloat(priceList.accessories.metal_lock)}
                            else {lockPrice = parseFloat(priceList.accessories.press_lock)}

                            if (netHandleType === 'small-net-handle') {handlePrice = parseFloat(priceList.accessories.small_net_handle)}
                            else {handlePrice = parseFloat(priceList.accessories.big_net_handle)}

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }


                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'KS-50') {
                            const leafPrice = parseFloat(priceList.ks50_leaf.grey);
                            const divisionPrice = parseFloat(priceList.leaf_division.grey);
                            const netLeafPrice =  parseFloat(priceList.big_net_leaf.grey);
                            const adaptorPrice = parseFloat(priceList.ks50_interlock.grey);
                            const fcornerPrice =  parseFloat(priceList.accessories.O4_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.O4_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.heavy_duty_roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const lockPrice = parseFloat(priceList.accessories.press_lock);
                            const handlePrice = parseFloat(priceList.accessories.big_net_handle);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.ks50_round_frame.grey;
                            }
                            else if (frameType === 'wall-frame') {
                                framePrice = priceList.ks50_wall_frame.grey
                            }
                            else {
                                framePrice = priceList.ks50_wall_frame.grey
                            }

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
            
                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        
                            
                        }

                        else if (profileType === 'Trialco') {
                            const leafPrice = parseFloat(priceList.trialco_leaf.grey);
                            const divisionPrice = parseFloat(priceList.leaf_division.grey);
                            const netLeafPrice =  parseFloat(priceList.big_net_leaf.grey);
                            const adaptorPrice = parseFloat(priceList.trialco_interlock.grey);
                            const fcornerPrice =  parseFloat(priceList.accessories.O4_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.O4_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.trialco_roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const lockPrice = parseFloat(priceList.accessories.press_lock);
                            const handlePrice = parseFloat(priceList.accessories.big_net_handle);
                            const kitPrice = parseFloat(priceList.accessories.trialco_kit);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.trialco_round_frame.grey;
                            }
                            else if (frameType === 'big-wall-frame') {
                                framePrice = priceList.trialco_wall_frame.grey;
                            }
                            else {
                                framePrice = priceList.trialco_wall_frame.grey;
                            }

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setTrialcoKitCost(materialList.kit * kitPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                kitPrice: kitPrice,
                                glassPrice: glassPrice,
                            });
            
                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.kit * kitPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        if (workType === 'Sliding-division' && materialList.leafDivision > 0) {
                            setDivision(true);
                        }
            
                        setSliding(true);
                    }
                    else if (workType === 'Projected' || workType === 'Casement') {
                        if (profileType === 'Italian') {
                            let lPrice, tPrice;
                            let hingesPrc;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.grey;
                            }
                            else {
                                lPrice = priceList.louter.grey;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.big_t.grey;
                            }
                            else {
                                tPrice = priceList.small_t.grey;
                            }

                            if (workType === 'Projected') {
                                hingesPrc = priceList.accessories.projected_hinges;
                                setHingesCost(materialList.hinges * hingesPrc); 
                                setProjected(true);
                            }
                            else {
                                hingesPrc = priceList.accessories.hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setCasement(true)
                            }

                            const beadingPrc = priceList.beading.grey;
                            const handlePrc = priceList.accessories.projected_handle;
                            const casementStoperPrc = priceList.accessories.casement_stopper;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                hingesPrc: hingesPrc,
                                handlePrc: handlePrc,
                                casementStoperPrc: casementStoperPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigLCorner * bigZCornerPrice);
                            setProjectedHandleCost(materialList.handles * handlePrc);
                            setCasementStopperCost(materialList.casementStopper * casementStoperPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.louterCorner * louterCornerPrice + materialList.bigLCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.handles * handlePrc +
                                materialList.casementStopper * casementStoperPrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }
            
                        else if (profileType === 'Eco') {
                            let lPrice, tPrice;
                            let hingesPrc;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.grey;
                            }
                            else {
                                lPrice = priceList.eco_louter.grey;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.eco_big_t.grey;
                            }
                            else {
                                tPrice = priceList.eco_small_t.grey;
                            }

                            if (workType === 'Projected') {
                                hingesPrc = priceList.accessories.projected_hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setProjected(true);
                            }
                            else {
                                hingesPrc = priceList.accessories.eco_hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setCasement(true)
                            }

                            const beadingPrc = priceList.eco_beading.grey;
                            const handlePrc = priceList.accessories.projected_handle;
                            const casementStoperPrc = priceList.accessories.casement_stopper;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                hingesPrc: hingesPrc,
                                handlePrc: handlePrc,
                                casementStoperPrc: casementStoperPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setProjectedHandleCost(materialList.handles * handlePrc);
                            setCasementStopperCost(materialList.casementStopper * casementStoperPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.louterCorner * louterCornerPrice + materialList.hinges * hingesPrc + materialList.handles * handlePrc +
                                materialList.casementStopper * casementStoperPrc + materialList.frameRubber * frameRubberPrc + 
                                materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc + 
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }
                    }
                    else if (workType === 'Hinge') {
                        if (profileType === 'Italian') {
                            let lPrice, divisionPrice = 0;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.grey;
                            }
                            else {
                                lPrice = priceList.louter.grey;
                            }

                            if (divisionType === 'mullion') {
                                divisionPrice = priceList.mullion.grey;
                            }
                            
                            const zPrice = priceList.big_z.grey;
                            const tPrice = priceList.big_t.grey;
                            const bottomPrc = priceList.bottom.grey;
                            const beadingPrc = priceList.beading.grey;
                            const adatorPrc = priceList.double_hinge_adaptor.grey;
                            const handlePrc = priceList.accessories.hinge_handle;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const hingesPrc = priceList.accessories.hinges;
                            const doorKeyPrc = priceList.accessories.hinge_door_key;
                            const towerBoltPrc = priceList.accessories.tower_bolt;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                zPrice: zPrice,
                                tPrice: tPrice,
                                bottomPrc: bottomPrc,
                                divisionPrice: divisionPrice,
                                beadingPrc: beadingPrc,
                                adatorPrc: adatorPrc,
                                handlePrc: handlePrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                hingesPrc: hingesPrc,
                                doorKeyPrc: doorKeyPrc,
                                towerBoltPrc: towerBoltPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setZCost(materialList.bigZ * zPrice);
                            setBigTCost(materialList.small_big_T * tPrice);
                            setMullionCost(materialList.mollium * divisionPrice);
                            setbottomCost(materialList.bottom * bottomPrc);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setAdaptorCost(materialList.adaptor * adatorPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigZCorner * bigZCornerPrice);
                            setHingesCost(materialList.hinges * hingesPrc);
                            setKeysCost(materialList.key * doorKeyPrc);
                            setHandlesCost(materialList.handles * handlePrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                            framesCost = materialList.LOuter * lPrice + materialList.bigZ * zPrice + materialList.small_big_T * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.adaptor * adatorPrc;
                            AccCost = materialList.louterCorner * louterCornerPrice +  materialList.bigZCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.key * doorKeyPrc +
                                        materialList.handles * handlePrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + 
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc;
                        }
                        else if (profileType === 'Eco') {
                            let lPrice, divisionPrice = 0;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.grey;
                            }
                            else {
                                lPrice = priceList.eco_louter.grey;
                            }

                            if (divisionType === 'mullion') {
                                divisionPrice = priceList.eco_mullion.grey;
                            }
                            
                            const zPrice = priceList.eco_big_z.grey;
                            const tPrice = priceList.eco_big_t.grey;
                            const bottomPrc = priceList.eco_bottom.grey;
                            const beadingPrc = priceList.eco_beading.grey;
                            const handlePrc = priceList.accessories.hinge_handle;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const hingesPrc = priceList.accessories.hinges;
                            const doorKeyPrc = priceList.accessories.hinge_door_key;
                            const towerBoltPrc = priceList.accessories.tower_bolt;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                zPrice: zPrice,
                                tPrice: tPrice,
                                bottomPrc: bottomPrc,
                                divisionPrice: divisionPrice,
                                beadingPrc: beadingPrc,
                                handlePrc: handlePrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                hingesPrc: hingesPrc,
                                doorKeyPrc: doorKeyPrc,
                                towerBoltPrc: towerBoltPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setZCost(materialList.bigZ * zPrice);
                            setBigTCost(materialList.small_big_T * tPrice);
                            setMullionCost(materialList.mollium * divisionPrice);
                            setbottomCost(materialList.bottom * bottomPrc);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setAdaptorCost(materialList.adaptor * tPrice);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigZCorner * bigZCornerPrice);
                            setHingesCost(materialList.hinges * hingesPrc);
                            setKeysCost(materialList.key * doorKeyPrc);
                            setHandlesCost(materialList.handles * handlePrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                            framesCost = materialList.LOuter * lPrice + materialList.bigZ * zPrice + materialList.small_big_T * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.adaptor * tPrice;
                            AccCost = materialList.louterCorner * louterCornerPrice +  materialList.bigZCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.key * doorKeyPrc +
                                        materialList.handles * handlePrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + 
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc;
                        }

                        setHinge(true);
                    }
                    else if (workType === 'Swing') { 
                        
                        let divisionPrice = 0;

                        if (divisionType === 'mullion') {
                            divisionPrice = priceList.mullion.grey;
                        }

                        const lPrice = priceList.big_l.grey;
                        const brushAdaptorPrc = priceList.brush_adpt.grey;
                        const tPrice = priceList.big_t.grey;
                        const bottomPrc = priceList.bottom.grey;
                        const beadingPrc = priceList.beading.grey;
                        const handlePrc = priceList.accessories.swing_door_pipe_handle;
                        const frameRubberPrc = priceList.accessories.frame_rubber;
                        const beadingRubberPrc = priceList.accessories.beading_rubber;
                        const bigZCornerPrice = priceList.accessories.big_z_corner;
                        const adaptorBrushPrc = priceList.accessories.adaptor_brush;
                        const downCloserPrc = priceList.accessories.down_closer;
                        const doorKeyPrc = priceList.accessories.hinge_door_key;
                        const towerBoltPrc = priceList.accessories.tower_bolt;
                        const installScrewsPrice = priceList.accessories.installation_screw;
                        const wallPlugPrice = priceList.accessories.wall_plug;

                        let glassPrice;
                        if (glassColor === 'tinted') {
                            setGlassPrice(priceList.glass.tinted);
                            glassPrice = priceList.glass.tinted;
                        }
                        else if (glassColor === 'bronze-ref') {
                            setGlassPrice(priceList.glass.bronze_reflective);
                            glassPrice = priceList.glass.bronze_reflective;
                        }
                        else if (glassColor === 'dark') {
                            setGlassPrice(priceList.glass.dark);
                            glassPrice = priceList.glass.dark;
                        }
                        else if (glassColor === 'dark-ref') {
                            setGlassPrice(priceList.glass.dark_reflective);
                            glassPrice = priceList.glass.dark_reflective;
                        }
                        else if (glassColor === 'blue-ref') {
                            setGlassPrice(priceList.glass.blue_reflective);
                            glassPrice = priceList.glass.blue_reflective;
                        }
                        else if (glassColor === 'plain') {
                            setGlassPrice(priceList.glass.plain);
                            glassPrice = priceList.glass.plain;
                        }

                        setSelfPriceList({
                            lPrice: lPrice,
                            brushAdaptorPrc: brushAdaptorPrc,
                            tPrice: tPrice,
                            bottomPrc: bottomPrc,
                            divisionPrice: divisionPrice,
                            beadingPrc: beadingPrc,
                            handlePrc: handlePrc,
                            frameRubberPrc: frameRubberPrc,
                            beadingRubberPrc: beadingRubberPrc,
                            bigZCornerPrice: bigZCornerPrice,
                            adaptorBrushPrc: adaptorBrushPrc,
                            downCloserPrc: downCloserPrc,
                            doorKeyPrc: doorKeyPrc,
                            towerBoltPrc: towerBoltPrc,
                            installScrewsPrice: installScrewsPrice,
                            wallPlugPrice: wallPlugPrice,
                            glassPrice: glassPrice,
                        });

                        setBigLCost(materialList.bigL * lPrice);
                        setBigTCost(materialList.bigT * tPrice);
                        setMullionCost(materialList.mollium * divisionPrice);
                        setbottomCost(materialList.bottom * bottomPrc);
                        setBeadingCost(materialList.beading * beadingPrc);
                        setAdaptorCost(materialList.brushAdaptor * brushAdaptorPrc);
                        setBigZCornersCost(materialList.corners * bigZCornerPrice);
                        setDownCloserCost(materialList.downCloser * downCloserPrc);
                        setKeysCost(materialList.key * doorKeyPrc);
                        setHandlesCost(materialList.handle * handlePrc);
                        setAdaptorBrushCost(materialList.adaptorBrush * adaptorBrushPrc);
                        setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                        setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                        setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                        setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                        setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                        framesCost = materialList.bigL * lPrice + materialList.bigT * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.brushAdaptor * brushAdaptorPrc;
                        AccCost = materialList.corners * bigZCornerPrice + materialList.key * doorKeyPrc + materialList.adaptorBrush * adaptorBrushPrc +
                                        materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.downCloser * downCloserPrc +
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc +
                                        materialList.handle * handlePrc;

                        setSwing(true);
                    }
                    else if (workType === 'Fixed') {
                        
                        if (profileType === 'Italian') {
                            let lPrice, tPrice, louterCornerPrice;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.grey;
                                louterCornerPrice = priceList.accessories.big_z_corner;

                            }
                            else {
                                lPrice = priceList.louter.grey;
                                louterCornerPrice = priceList.accessories.louter_corner;
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.big_t.grey;
                            }
                            else {
                                tPrice = priceList.small_t.grey;
                            }

                            const beadingPrc = priceList.beading.grey;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.corners * louterCornerPrice);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.corners * louterCornerPrice + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'Eco') {
                            let lPrice, tPrice;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.grey;
                            }
                            else {
                                lPrice = priceList.eco_louter.grey;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.eco_big_t.grey;
                            }
                            else {
                                tPrice = priceList.eco_small_t.grey;
                            }

                            const beadingPrc = priceList.eco_beading.grey;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.corners * louterCornerPrice);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.corners * louterCornerPrice + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        setFixed(true);
                    }
                }
                else if (profileColor === 'black') {
                    setRoundFramePrice(parseFloat(priceList.round_frame.black));
                    setSmallWallFramePrice(parseFloat(priceList.small_wall_frame.black));
                    setBigWallFramePrice(parseFloat(priceList.big_wall_frame.black));
                    setFlatLeafPrice(parseFloat(priceList.flat_leaf.black));
                    setRoundLeafPrice(parseFloat(priceList.round_leaf.black));
                    setSmallNetLeafPrice(parseFloat(priceList.net_leaf.black));
                    setBigNetLeafPrice(parseFloat(priceList.big_net_leaf.black));
                    setInterlockPrice(parseFloat(priceList.interlock.black));
                    setLeafDivisionPrice(parseFloat(priceList.leaf_division.black));
                    setFourBayAdaptorPrice(parseFloat(priceList.four_bay_adpt.black));
                    setKs50RoundFramePrice(parseFloat(priceList.ks50_round_frame.black));
                    setKs50WallFramePrice(parseFloat(priceList.ks50_wall_frame.black));
                    setKs50LeafPrice(parseFloat(priceList.ks50_leaf.black));
                    setKs50InterlockPrice(parseFloat(priceList.ks50_interlock.black));
                    setTrialcoRoundFramePrice(parseFloat(priceList.trialco_round_frame.black));
                    setTrialcoWallFramePrice(parseFloat(priceList.trialco_wall_frame.black));
                    setTrialcoLeafPrice(parseFloat(priceList.trialco_leaf.black));
                    setTrialcoInterlockPrice(parseFloat(priceList.trialco_interlock.black));
                    setLouterPrice(parseFloat(priceList.louter.black));
                    setBigLPrice(parseFloat(priceList.big_l.black));
                    setSmallTPrice(parseFloat(priceList.small_t.black));
                    setBigTPrice(parseFloat(priceList.big_t.black));
                    setBigZPrice(parseFloat(priceList.big_z.black));
                    setMullionPrice(parseFloat(priceList.mullion.black));
                    setBottomPrice(parseFloat(priceList.bottom.black));
                    setHingeAdaptorPrice(parseFloat(priceList.double_hinge_adaptor.black));
                    setBrushAdaptorPrice(parseFloat(priceList.brush_adpt.black));
                    setBeadingPrice(parseFloat(priceList.beading.black));
                    setECoLouterPrice(parseFloat(priceList.eco_louter.black));
                    setEcoBigLPrice(parseFloat(priceList.eco_big_l.black));
                    setEcoSmallTPrice(parseFloat(priceList.eco_small_t.black));
                    setEcoBigTPrice(parseFloat(priceList.eco_big_t.black));
                    setEcoBigZPrice(parseFloat(priceList.eco_big_z.black));
                    setEcoMullionPrice(parseFloat(priceList.eco_mullion.black));
                    setEcoBottomPrice(parseFloat(priceList.eco_bottom.black));
                    setEcoBeadingPrice(parseFloat(priceList.eco_beading.black));

                    if (workType === 'Sliding' || workType === 'Sliding-division') {
                        if (profileType === 'Skit-60') {
                            const leafPrice = parseFloat(priceList.flat_leaf.black);
                            const divisionPrice = parseFloat(priceList.leaf_division.black);
                            const adaptorPrice = parseFloat(priceList.interlock.black);
                            const fcornerPrice =  parseFloat(priceList.accessories.frame_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.leaf_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, netLeafPrice, lockPrice, handlePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.round_frame.black;
                            }
                            else if (frameType === 'small-wall-frame') {
                                framePrice = priceList.small_wall_frame.black;
                            }
                            else if (frameType === 'big-wall-frame') {
                                framePrice = priceList.big_wall_frame.black
                            }

                            if (netType === 'small-net-leaf') {netLeafPrice = parseFloat(priceList.net_leaf.black)}
                            else {netLeafPrice =  parseFloat(priceList.big_net_leaf.black)}

                            if (lockType === 'metal-lock') {lockPrice = parseFloat(priceList.accessories.metal_lock)}
                            else {lockPrice = parseFloat(priceList.accessories.press_lock)}

                            if (netHandleType === 'small-net-handle') {handlePrice = parseFloat(priceList.accessories.small_net_handle)}
                            else {handlePrice = parseFloat(priceList.accessories.big_net_handle)}

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }


                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'KS-50') {
                            const leafPrice = parseFloat(priceList.ks50_leaf.black);
                            const divisionPrice = parseFloat(priceList.leaf_division.black);
                            const netLeafPrice =  parseFloat(priceList.big_net_leaf.black);
                            const adaptorPrice = parseFloat(priceList.ks50_interlock.black);
                            const fcornerPrice =  parseFloat(priceList.accessories.O4_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.O4_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.heavy_duty_roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const lockPrice = parseFloat(priceList.accessories.press_lock);
                            const handlePrice = parseFloat(priceList.accessories.big_net_handle);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.ks50_round_frame.black;
                            }
                            else if (frameType === 'wall-frame') {
                                framePrice = priceList.ks50_wall_frame.black
                            }
                            else {
                                framePrice = priceList.ks50_wall_frame.black
                            }

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
            
                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'Trialco') {
                            const leafPrice = parseFloat(priceList.trialco_leaf.black);
                            const divisionPrice = parseFloat(priceList.leaf_division.black);
                            const netLeafPrice =  parseFloat(priceList.big_net_leaf.black);
                            const adaptorPrice = parseFloat(priceList.trialco_interlock.black);
                            const fcornerPrice =  parseFloat(priceList.accessories.O4_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.O4_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.trialco_roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const lockPrice = parseFloat(priceList.accessories.press_lock);
                            const handlePrice = parseFloat(priceList.accessories.big_net_handle);
                            const kitPrice = parseFloat(priceList.accessories.trialco_kit);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.trialco_round_frame.black;
                            }
                            else if (frameType === 'big-wall-frame') {
                                framePrice = priceList.trialco_wall_frame.black;
                            }
                            else {
                                framePrice = priceList.trialco_wall_frame.black;
                            }

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                kitPrice: kitPrice,
                                glassPrice: glassPrice,
                            });

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setTrialcoKitCost(materialList.kit * kitPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
            
                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.kit * kitPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        if (workType === 'Sliding-division' && materialList.leafDivision > 0) {
                            setDivision(true);
                        }
            
                        setSliding(true);
                    }
                    else if (workType === 'Projected' || workType === 'Casement') {
                        if (profileType === 'Italian') {
                            let lPrice, tPrice;
                            let hingesPrc;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.black;
                            }
                            else {
                                lPrice = priceList.louter.black;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.big_t.black;
                            }
                            else {
                                tPrice = priceList.small_t.black;
                            }

                            if (workType === 'Projected') {
                                hingesPrc = priceList.accessories.projected_hinges;
                                setHingesCost(materialList.hinges * hingesPrc); 
                                setProjected(true);
                            }
                            else {
                                hingesPrc = priceList.accessories.hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setCasement(true)
                            }

                            const beadingPrc = priceList.beading.black;
                            const handlePrc = priceList.accessories.projected_handle;
                            const casementStoperPrc = priceList.accessories.casement_stopper;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                hingesPrc: hingesPrc,
                                handlePrc: handlePrc,
                                casementStoperPrc: casementStoperPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigLCorner * bigZCornerPrice);
                            setProjectedHandleCost(materialList.handles * handlePrc);
                            setCasementStopperCost(materialList.casementStopper * casementStoperPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.louterCorner * louterCornerPrice + materialList.bigLCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.handles * handlePrc +
                                materialList.casementStopper * casementStoperPrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }
            
                        else if (profileType === 'Eco') {
                            let lPrice, tPrice;
                            let hingesPrc;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.black;
                            }
                            else {
                                lPrice = priceList.eco_louter.black;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.eco_big_t.black;
                            }
                            else {
                                tPrice = priceList.eco_small_t.black;
                            }

                            if (workType === 'Projected') {
                                hingesPrc = priceList.accessories.projected_hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setProjected(true);
                            }
                            else {
                                hingesPrc = priceList.accessories.eco_hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setCasement(true)
                            }

                            const beadingPrc = priceList.eco_beading.black;
                            const handlePrc = priceList.accessories.projected_handle;
                            const casementStoperPrc = priceList.accessories.casement_stopper;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                hingesPrc: hingesPrc,
                                handlePrc: handlePrc,
                                casementStoperPrc: casementStoperPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setProjectedHandleCost(materialList.handles * handlePrc);
                            setCasementStopperCost(materialList.casementStopper * casementStoperPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.louterCorner * louterCornerPrice + materialList.hinges * hingesPrc + materialList.handles * handlePrc +
                                materialList.casementStopper * casementStoperPrc + materialList.frameRubber * frameRubberPrc + 
                                materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc + 
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }
                    }
                    else if (workType === 'Hinge') {
                        if (profileType === 'Italian') {
                            let lPrice, divisionPrice = 0;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.black;
                            }
                            else {
                                lPrice = priceList.louter.black;
                            }

                            if (divisionType === 'mullion') {
                                divisionPrice = priceList.mullion.black;
                            }
                            
                            const zPrice = priceList.big_z.black;
                            const tPrice = priceList.big_t.black;
                            const bottomPrc = priceList.bottom.black;
                            const beadingPrc = priceList.beading.black;
                            const adatorPrc = priceList.double_hinge_adaptor.black;
                            const handlePrc = priceList.accessories.hinge_handle;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const hingesPrc = priceList.accessories.hinges;
                            const doorKeyPrc = priceList.accessories.hinge_door_key;
                            const towerBoltPrc = priceList.accessories.tower_bolt;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setZCost(materialList.bigZ * zPrice);
                            setBigTCost(materialList.small_big_T * tPrice);
                            setMullionCost(materialList.mollium * divisionPrice);
                            setbottomCost(materialList.bottom * bottomPrc);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setAdaptorCost(materialList.adaptor * adatorPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigZCorner * bigZCornerPrice);
                            setHingesCost(materialList.hinges * hingesPrc);
                            setKeysCost(materialList.key * doorKeyPrc);
                            setHandlesCost(materialList.handles * handlePrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                zPrice: zPrice,
                                tPrice: tPrice,
                                bottomPrc: bottomPrc,
                                divisionPrice: divisionPrice,
                                beadingPrc: beadingPrc,
                                adatorPrc: adatorPrc,
                                handlePrc: handlePrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                hingesPrc: hingesPrc,
                                doorKeyPrc: doorKeyPrc,
                                towerBoltPrc: towerBoltPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.LOuter * lPrice + materialList.bigZ * zPrice + materialList.small_big_T * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.adaptor * adatorPrc;
                            AccCost = materialList.louterCorner * louterCornerPrice +  materialList.bigZCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.key * doorKeyPrc +
                                        materialList.handles * handlePrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + 
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc;
                        }
                        else if (profileType === 'Eco') {
                            let lPrice, divisionPrice = 0;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.black;
                            }
                            else {
                                lPrice = priceList.eco_louter.black;
                            }

                            if (divisionType === 'mullion') {
                                divisionPrice = priceList.eco_mullion.black;
                            }
                            
                            const zPrice = priceList.eco_big_z.black;
                            const tPrice = priceList.eco_big_t.black;
                            const bottomPrc = priceList.eco_bottom.black;
                            const beadingPrc = priceList.eco_beading.black;
                            const handlePrc = priceList.accessories.hinge_handle;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const hingesPrc = priceList.accessories.hinges;
                            const doorKeyPrc = priceList.accessories.hinge_door_key;
                            const towerBoltPrc = priceList.accessories.tower_bolt;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setZCost(materialList.bigZ * zPrice);
                            setBigTCost(materialList.small_big_T * tPrice);
                            setMullionCost(materialList.mollium * divisionPrice);
                            setbottomCost(materialList.bottom * bottomPrc);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setAdaptorCost(materialList.adaptor * tPrice);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigZCorner * bigZCornerPrice);
                            setHingesCost(materialList.hinges * hingesPrc);
                            setKeysCost(materialList.key * doorKeyPrc);
                            setHandlesCost(materialList.handles * handlePrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                zPrice: zPrice,
                                tPrice: tPrice,
                                bottomPrc: bottomPrc,
                                divisionPrice: divisionPrice,
                                beadingPrc: beadingPrc,
                                handlePrc: handlePrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                hingesPrc: hingesPrc,
                                doorKeyPrc: doorKeyPrc,
                                towerBoltPrc: towerBoltPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.LOuter * lPrice + materialList.bigZ * zPrice + materialList.small_big_T * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.adaptor * tPrice;
                            AccCost = materialList.louterCorner * louterCornerPrice +  materialList.bigZCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.key * doorKeyPrc +
                                        materialList.handles * handlePrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + 
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc;
                        }

                        setHinge(true);
                    }
                    else if (workType === 'Swing') { 
                        let divisionPrice = 0;

                        if (divisionType === 'mullion') {
                            divisionPrice = priceList.mullion.black;
                        }

                        const lPrice = priceList.big_l.black;
                        const brushAdaptorPrc = priceList.brush_adpt.black;
                        const tPrice = priceList.big_t.black;
                        const bottomPrc = priceList.bottom.black;
                        const beadingPrc = priceList.beading.black;
                        const handlePrc = priceList.accessories.swing_door_pipe_handle;
                        const frameRubberPrc = priceList.accessories.frame_rubber;
                        const beadingRubberPrc = priceList.accessories.beading_rubber;
                        const bigZCornerPrice = priceList.accessories.big_z_corner;
                        const adaptorBrushPrc = priceList.accessories.adaptor_brush;
                        const downCloserPrc = priceList.accessories.down_closer;
                        const doorKeyPrc = priceList.accessories.hinge_door_key;
                        const towerBoltPrc = priceList.accessories.tower_bolt;
                        const installScrewsPrice = priceList.accessories.installation_screw;
                        const wallPlugPrice = priceList.accessories.wall_plug;

                        setBigLCost(materialList.bigL * lPrice);
                        setBigTCost(materialList.bigT * tPrice);
                        setMullionCost(materialList.mollium * divisionPrice);
                        setbottomCost(materialList.bottom * bottomPrc);
                        setBeadingCost(materialList.beading * beadingPrc);
                        setAdaptorCost(materialList.brushAdaptor * brushAdaptorPrc);
                        setBigZCornersCost(materialList.corners * bigZCornerPrice);
                        setDownCloserCost(materialList.downCloser * downCloserPrc);
                        setKeysCost(materialList.key * doorKeyPrc);
                        setHandlesCost(materialList.handle * handlePrc);
                        setAdaptorBrushCost(materialList.adaptorBrush * adaptorBrushPrc);
                        setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                        setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                        setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                        setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                        setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                        let glassPrice;
                        if (glassColor === 'tinted') {
                            setGlassPrice(priceList.glass.tinted);
                            glassPrice = priceList.glass.tinted;
                        }
                        else if (glassColor === 'bronze-ref') {
                            setGlassPrice(priceList.glass.bronze_reflective);
                            glassPrice = priceList.glass.bronze_reflective;
                        }
                        else if (glassColor === 'dark') {
                            setGlassPrice(priceList.glass.dark);
                            glassPrice = priceList.glass.dark;
                        }
                        else if (glassColor === 'dark-ref') {
                            setGlassPrice(priceList.glass.dark_reflective);
                            glassPrice = priceList.glass.dark_reflective;
                        }
                        else if (glassColor === 'blue-ref') {
                            setGlassPrice(priceList.glass.blue_reflective);
                            glassPrice = priceList.glass.blue_reflective;
                        }
                        else if (glassColor === 'plain') {
                            setGlassPrice(priceList.glass.plain);
                            glassPrice = priceList.glass.plain;
                        }

                        setSelfPriceList({
                            lPrice: lPrice,
                            brushAdaptorPrc: brushAdaptorPrc,
                            tPrice: tPrice,
                            bottomPrc: bottomPrc,
                            divisionPrice: divisionPrice,
                            beadingPrc: beadingPrc,
                            handlePrc: handlePrc,
                            frameRubberPrc: frameRubberPrc,
                            beadingRubberPrc: beadingRubberPrc,
                            bigZCornerPrice: bigZCornerPrice,
                            adaptorBrushPrc: adaptorBrushPrc,
                            downCloserPrc: downCloserPrc,
                            doorKeyPrc: doorKeyPrc,
                            towerBoltPrc: towerBoltPrc,
                            installScrewsPrice: installScrewsPrice,
                            wallPlugPrice: wallPlugPrice,
                            glassPrice: glassPrice,
                        });

                        framesCost = materialList.bigL * lPrice + materialList.bigT * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.brushAdaptor * brushAdaptorPrc;
                        AccCost = materialList.corners * bigZCornerPrice + materialList.key * doorKeyPrc + materialList.adaptorBrush * adaptorBrushPrc +
                                        materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.downCloser * downCloserPrc +
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc +
                                        materialList.handle * handlePrc;

                        setSwing(true);
                    }
                    else if (workType === 'Fixed') {
                        if (profileType === 'Italian') {
                            let lPrice, tPrice, louterCornerPrice;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.black;
                                louterCornerPrice = priceList.accessories.big_z_corner;

                            }
                            else {
                                lPrice = priceList.louter.black;
                                louterCornerPrice = priceList.accessories.louter_corner;
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.big_t.black;
                            }
                            else {
                                tPrice = priceList.small_t.black;
                            }

                            const beadingPrc = priceList.beading.black;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.corners * louterCornerPrice);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.corners * louterCornerPrice + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'Eco') {
                            let lPrice, tPrice;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.black;
                            }
                            else {
                                lPrice = priceList.eco_louter.black;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.eco_big_t.black;
                            }
                            else {
                                tPrice = priceList.eco_small_t.black;
                            }

                            const beadingPrc = priceList.eco_beading.black;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.corners * louterCornerPrice);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.corners * louterCornerPrice + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        setFixed(true);
                    }
                }
                else if (profileColor === 'champagne') {
                    setRoundFramePrice(parseFloat(priceList.round_frame.champagne));
                    setSmallWallFramePrice(parseFloat(priceList.small_wall_frame.champagne));
                    setBigWallFramePrice(parseFloat(priceList.big_wall_frame.champagne));
                    setFlatLeafPrice(parseFloat(priceList.flat_leaf.champagne));
                    setRoundLeafPrice(parseFloat(priceList.round_leaf.champagne));
                    setSmallNetLeafPrice(parseFloat(priceList.net_leaf.champagne));
                    setBigNetLeafPrice(parseFloat(priceList.big_net_leaf.champagne));
                    setInterlockPrice(parseFloat(priceList.interlock.champagne));
                    setLeafDivisionPrice(parseFloat(priceList.leaf_division.champagne));
                    setFourBayAdaptorPrice(parseFloat(priceList.four_bay_adpt.champagne));
                    setKs50RoundFramePrice(parseFloat(priceList.ks50_round_frame.champagne));
                    setKs50WallFramePrice(parseFloat(priceList.ks50_wall_frame.champagne));
                    setKs50LeafPrice(parseFloat(priceList.ks50_leaf.champagne));
                    setKs50InterlockPrice(parseFloat(priceList.ks50_interlock.champagne));
                    setTrialcoRoundFramePrice(parseFloat(priceList.trialco_round_frame.champagne));
                    setTrialcoWallFramePrice(parseFloat(priceList.trialco_wall_frame.champagne));
                    setTrialcoLeafPrice(parseFloat(priceList.trialco_leaf.champagne));
                    setTrialcoInterlockPrice(parseFloat(priceList.trialco_interlock.champagne));
                    setLouterPrice(parseFloat(priceList.louter.champagne));
                    setBigLPrice(parseFloat(priceList.big_l.champagne));
                    setSmallTPrice(parseFloat(priceList.small_t.champagne));
                    setBigTPrice(parseFloat(priceList.big_t.champagne));
                    setBigZPrice(parseFloat(priceList.big_z.champagne));
                    setMullionPrice(parseFloat(priceList.mullion.champagne));
                    setBottomPrice(parseFloat(priceList.bottom.champagne));
                    setHingeAdaptorPrice(parseFloat(priceList.double_hinge_adaptor.champagne));
                    setBrushAdaptorPrice(parseFloat(priceList.brush_adpt.champagne));
                    setBeadingPrice(parseFloat(priceList.beading.champagne));
                    setECoLouterPrice(parseFloat(priceList.eco_louter.champagne));
                    setEcoBigLPrice(parseFloat(priceList.eco_big_l.champagne));
                    setEcoSmallTPrice(parseFloat(priceList.eco_small_t.champagne));
                    setEcoBigTPrice(parseFloat(priceList.eco_big_t.champagne));
                    setEcoBigZPrice(parseFloat(priceList.eco_big_z.champagne));
                    setEcoMullionPrice(parseFloat(priceList.eco_mullion.champagne));
                    setEcoBottomPrice(parseFloat(priceList.eco_bottom.champagne));
                    setEcoBeadingPrice(parseFloat(priceList.eco_beading.champagne));

                    if (workType === 'Sliding' || workType === 'Sliding-division') {
                        if (profileType === 'Skit-60') {
                            const leafPrice = parseFloat(priceList.flat_leaf.champagne);
                            const divisionPrice = parseFloat(priceList.leaf_division.champagne);
                            const adaptorPrice = parseFloat(priceList.interlock.champagne);
                            const fcornerPrice =  parseFloat(priceList.accessories.frame_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.leaf_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, netLeafPrice, lockPrice, handlePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.round_frame.champagne;
                            }
                            else if (frameType === 'small-wall-frame') {
                                framePrice = priceList.small_wall_frame.champagne;
                            }
                            else if (frameType === 'big-wall-frame') {
                                framePrice = priceList.big_wall_frame.champagne
                            }

                            if (netType === 'small-net-leaf') {netLeafPrice = parseFloat(priceList.net_leaf.champagne)}
                            else {netLeafPrice =  parseFloat(priceList.big_net_leaf.champagne)}

                            if (lockType === 'metal-lock') {lockPrice = parseFloat(priceList.accessories.metal_lock)}
                            else {lockPrice = parseFloat(priceList.accessories.press_lock)}

                            if (netHandleType === 'small-net-handle') {handlePrice = parseFloat(priceList.accessories.small_net_handle)}
                            else {handlePrice = parseFloat(priceList.accessories.big_net_handle)}

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'KS-50') {
                            const leafPrice = parseFloat(priceList.ks50_leaf.champagne);
                            const divisionPrice = parseFloat(priceList.leaf_division.champagne);
                            const netLeafPrice =  parseFloat(priceList.big_net_leaf.champagne);
                            const adaptorPrice = parseFloat(priceList.ks50_interlock.champagne);
                            const fcornerPrice =  parseFloat(priceList.accessories.O4_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.O4_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.heavy_duty_roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const lockPrice = parseFloat(priceList.accessories.press_lock);
                            const handlePrice = parseFloat(priceList.accessories.big_net_handle);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.ks50_round_frame.champagne;
                            }
                            else if (frameType === 'wall-frame') {
                                framePrice = priceList.ks50_wall_frame.champagne
                            }
                            else {
                                framePrice = priceList.ks50_wall_frame.champagne
                            }

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
            
                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'Trialco') {
                            const leafPrice = parseFloat(priceList.trialco_leaf.champagne);
                            const divisionPrice = parseFloat(priceList.leaf_division.champagne);
                            const netLeafPrice =  parseFloat(priceList.big_net_leaf.champagne);
                            const adaptorPrice = parseFloat(priceList.trialco_interlock.champagne);
                            const fcornerPrice =  parseFloat(priceList.accessories.O4_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.O4_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.trialco_roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const lockPrice = parseFloat(priceList.accessories.press_lock);
                            const handlePrice = parseFloat(priceList.accessories.big_net_handle);
                            const kitPrice = parseFloat(priceList.accessories.trialco_kit);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.trialco_round_frame.champagne;
                            }
                            else if (frameType === 'big-wall-frame') {
                                framePrice = priceList.trialco_wall_frame.champagne;
                            }
                            else {
                                framePrice = priceList.trialco_wall_frame.champagne;
                            }

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setTrialcoKitCost(materialList.kit * kitPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                kitPrice: kitPrice,
                                glassPrice: glassPrice,
                            });
            
                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.kit * kitPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        if (workType === 'Sliding-division' && materialList.leafDivision > 0) {
                            setDivision(true);
                        }
            
                        setSliding(true);
                    }
                    else if (workType === 'Projected' || workType === 'Casement') {
                        if (profileType === 'Italian') {
                            let lPrice, tPrice;
                            let hingesPrc;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.champagne;
                            }
                            else {
                                lPrice = priceList.louter.champagne;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.big_t.champagne;
                            }
                            else {
                                tPrice = priceList.small_t.champagne;
                            }

                            if (workType === 'Projected') {
                                hingesPrc = priceList.accessories.projected_hinges;
                                setHingesCost(materialList.hinges * hingesPrc); 
                                setProjected(true);
                            }
                            else {
                                hingesPrc = priceList.accessories.hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setCasement(true)
                            }

                            const beadingPrc = priceList.beading.champagne;
                            const handlePrc = priceList.accessories.projected_handle;
                            const casementStoperPrc = priceList.accessories.casement_stopper;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigLCorner * bigZCornerPrice);
                            setProjectedHandleCost(materialList.handles * handlePrc);
                            setCasementStopperCost(materialList.casementStopper * casementStoperPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                hingesPrc: hingesPrc,
                                handlePrc: handlePrc,
                                casementStoperPrc: casementStoperPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.louterCorner * louterCornerPrice + materialList.bigLCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.handles * handlePrc +
                                materialList.casementStopper * casementStoperPrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }
            
                        else if (profileType === 'Eco') {
                            let lPrice, tPrice;
                            let hingesPrc;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.champagne;
                            }
                            else {
                                lPrice = priceList.eco_louter.champagne;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.eco_big_t.champagne;
                            }
                            else {
                                tPrice = priceList.eco_small_t.champagne;
                            }

                            if (workType === 'Projected') {
                                hingesPrc = priceList.accessories.projected_hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setProjected(true);
                            }
                            else {
                                hingesPrc = priceList.accessories.eco_hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setCasement(true)
                            }

                            const beadingPrc = priceList.eco_beading.champagne;
                            const handlePrc = priceList.accessories.projected_handle;
                            const casementStoperPrc = priceList.accessories.casement_stopper;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                hingesPrc: hingesPrc,
                                handlePrc: handlePrc,
                                casementStoperPrc: casementStoperPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setProjectedHandleCost(materialList.handles * handlePrc);
                            setCasementStopperCost(materialList.casementStopper * casementStoperPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.louterCorner * louterCornerPrice + materialList.hinges * hingesPrc + materialList.handles * handlePrc +
                                materialList.casementStopper * casementStoperPrc + materialList.frameRubber * frameRubberPrc + 
                                materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc + 
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }
                    }
                    else if (workType === 'Hinge') {
                        if (profileType === 'Italian') {
                            let lPrice, divisionPrice = 0;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.champagne;
                            }
                            else {
                                lPrice = priceList.louter.champagne;
                            }

                            if (divisionType === 'mullion') {
                                divisionPrice = priceList.mullion.champagne;
                            }
                            
                            const zPrice = priceList.big_z.champagne;
                            const tPrice = priceList.big_t.champagne;
                            const bottomPrc = priceList.bottom.champagne;
                            const beadingPrc = priceList.beading.champagne;
                            const adatorPrc = priceList.double_hinge_adaptor.champagne;
                            const handlePrc = priceList.accessories.hinge_handle;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const hingesPrc = priceList.accessories.hinges;
                            const doorKeyPrc = priceList.accessories.hinge_door_key;
                            const towerBoltPrc = priceList.accessories.tower_bolt;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setZCost(materialList.bigZ * zPrice);
                            setBigTCost(materialList.small_big_T * tPrice);
                            setMullionCost(materialList.mollium * divisionPrice);
                            setbottomCost(materialList.bottom * bottomPrc);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setAdaptorCost(materialList.adaptor * adatorPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigZCorner * bigZCornerPrice);
                            setHingesCost(materialList.hinges * hingesPrc);
                            setKeysCost(materialList.key * doorKeyPrc);
                            setHandlesCost(materialList.handles * handlePrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                zPrice: zPrice,
                                tPrice: tPrice,
                                bottomPrc: bottomPrc,
                                divisionPrice: divisionPrice,
                                beadingPrc: beadingPrc,
                                adatorPrc: adatorPrc,
                                handlePrc: handlePrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                hingesPrc: hingesPrc,
                                doorKeyPrc: doorKeyPrc,
                                towerBoltPrc: towerBoltPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.LOuter * lPrice + materialList.bigZ * zPrice + materialList.small_big_T * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.adaptor * adatorPrc;
                            AccCost = materialList.louterCorner * louterCornerPrice +  materialList.bigZCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.key * doorKeyPrc +
                                        materialList.handles * handlePrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + 
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc;
                        }
                        else if (profileType === 'Eco') {
                            let lPrice, divisionPrice = 0;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.champagne;
                            }
                            else {
                                lPrice = priceList.eco_louter.champagne;
                            }

                            if (divisionType === 'mullion') {
                                divisionPrice = priceList.eco_mullion.champagne;
                            }
                            
                            const zPrice = priceList.eco_big_z.champagne;
                            const tPrice = priceList.eco_big_t.champagne;
                            const bottomPrc = priceList.eco_bottom.champagne;
                            const beadingPrc = priceList.eco_beading.champagne;
                            const handlePrc = priceList.accessories.hinge_handle;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const hingesPrc = priceList.accessories.hinges;
                            const doorKeyPrc = priceList.accessories.hinge_door_key;
                            const towerBoltPrc = priceList.accessories.tower_bolt;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setZCost(materialList.bigZ * zPrice);
                            setBigTCost(materialList.small_big_T * tPrice);
                            setMullionCost(materialList.mollium * divisionPrice);
                            setbottomCost(materialList.bottom * bottomPrc);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setAdaptorCost(materialList.adaptor * tPrice);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigZCorner * bigZCornerPrice);
                            setHingesCost(materialList.hinges * hingesPrc);
                            setKeysCost(materialList.key * doorKeyPrc);
                            setHandlesCost(materialList.handles * handlePrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                zPrice: zPrice,
                                tPrice: tPrice,
                                bottomPrc: bottomPrc,
                                divisionPrice: divisionPrice,
                                beadingPrc: beadingPrc,
                                handlePrc: handlePrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                hingesPrc: hingesPrc,
                                doorKeyPrc: doorKeyPrc,
                                towerBoltPrc: towerBoltPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.LOuter * lPrice + materialList.bigZ * zPrice + materialList.small_big_T * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.adaptor * tPrice;
                            AccCost = materialList.louterCorner * louterCornerPrice +  materialList.bigZCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.key * doorKeyPrc +
                                        materialList.handles * handlePrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + 
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc;
                        }

                        setHinge(true);
                    }
                    else if (workType === 'Swing') { 
                        let divisionPrice = 0;

                        if (divisionType === 'mullion') {
                            divisionPrice = priceList.mullion.champagne;
                        }

                        const lPrice = priceList.big_l.champagne;
                        const brushAdaptorPrc = priceList.brush_adpt.champagne;
                        const tPrice = priceList.big_t.champagne;
                        const bottomPrc = priceList.bottom.champagne;
                        const beadingPrc = priceList.beading.champagne;
                        const handlePrc = priceList.accessories.swing_door_pipe_handle;
                        const frameRubberPrc = priceList.accessories.frame_rubber;
                        const beadingRubberPrc = priceList.accessories.beading_rubber;
                        const bigZCornerPrice = priceList.accessories.big_z_corner;
                        const adaptorBrushPrc = priceList.accessories.adaptor_brush;
                        const downCloserPrc = priceList.accessories.down_closer;
                        const doorKeyPrc = priceList.accessories.hinge_door_key;
                        const towerBoltPrc = priceList.accessories.tower_bolt;
                        const installScrewsPrice = priceList.accessories.installation_screw;
                        const wallPlugPrice = priceList.accessories.wall_plug;

                        setBigLCost(materialList.bigL * lPrice);
                        setBigTCost(materialList.bigT * tPrice);
                        setMullionCost(materialList.mollium * divisionPrice);
                        setbottomCost(materialList.bottom * bottomPrc);
                        setBeadingCost(materialList.beading * beadingPrc);
                        setAdaptorCost(materialList.brushAdaptor * brushAdaptorPrc);
                        setBigZCornersCost(materialList.corners * bigZCornerPrice);
                        setDownCloserCost(materialList.downCloser * downCloserPrc);
                        setKeysCost(materialList.key * doorKeyPrc);
                        setHandlesCost(materialList.handle * handlePrc);
                        setAdaptorBrushCost(materialList.adaptorBrush * adaptorBrushPrc);
                        setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                        setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                        setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                        setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                        setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                        let glassPrice;
                        if (glassColor === 'tinted') {
                            setGlassPrice(priceList.glass.tinted);
                            glassPrice = priceList.glass.tinted;
                        }
                        else if (glassColor === 'bronze-ref') {
                            setGlassPrice(priceList.glass.bronze_reflective);
                            glassPrice = priceList.glass.bronze_reflective;
                        }
                        else if (glassColor === 'dark') {
                            setGlassPrice(priceList.glass.dark);
                            glassPrice = priceList.glass.dark;
                        }
                        else if (glassColor === 'dark-ref') {
                            setGlassPrice(priceList.glass.dark_reflective);
                            glassPrice = priceList.glass.dark_reflective;
                        }
                        else if (glassColor === 'blue-ref') {
                            setGlassPrice(priceList.glass.blue_reflective);
                            glassPrice = priceList.glass.blue_reflective;
                        }
                        else if (glassColor === 'plain') {
                            setGlassPrice(priceList.glass.plain);
                            glassPrice = priceList.glass.plain;
                        }

                        setSelfPriceList({
                            lPrice: lPrice,
                            brushAdaptorPrc: brushAdaptorPrc,
                            tPrice: tPrice,
                            bottomPrc: bottomPrc,
                            divisionPrice: divisionPrice,
                            beadingPrc: beadingPrc,
                            handlePrc: handlePrc,
                            frameRubberPrc: frameRubberPrc,
                            beadingRubberPrc: beadingRubberPrc,
                            bigZCornerPrice: bigZCornerPrice,
                            adaptorBrushPrc: adaptorBrushPrc,
                            downCloserPrc: downCloserPrc,
                            doorKeyPrc: doorKeyPrc,
                            towerBoltPrc: towerBoltPrc,
                            installScrewsPrice: installScrewsPrice,
                            wallPlugPrice: wallPlugPrice,
                            glassPrice: glassPrice,
                        });

                        framesCost = materialList.bigL * lPrice + materialList.bigT * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.brushAdaptor * brushAdaptorPrc;
                        AccCost = materialList.corners * bigZCornerPrice + materialList.key * doorKeyPrc + materialList.adaptorBrush * adaptorBrushPrc +
                                        materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.downCloser * downCloserPrc +
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc +
                                        materialList.handle * handlePrc;

                        setSwing(true);
                    }
                    else if (workType === 'Fixed') {
                        if (profileType === 'Italian') {
                            let lPrice, tPrice, louterCornerPrice;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.champagne;
                                louterCornerPrice = priceList.accessories.big_z_corner;

                            }
                            else {
                                lPrice = priceList.louter.champagne;
                                louterCornerPrice = priceList.accessories.louter_corner;
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.big_t.champagne;
                            }
                            else {
                                tPrice = priceList.small_t.champagne;
                            }

                            const beadingPrc = priceList.beading.champagne;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.corners * louterCornerPrice);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.corners * louterCornerPrice + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'Eco') {
                            let lPrice, tPrice;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.champagne;
                            }
                            else {
                                lPrice = priceList.eco_louter.champagne;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.eco_big_t.champagne;
                            }
                            else {
                                tPrice = priceList.eco_small_t.champagne;
                            }

                            const beadingPrc = priceList.eco_beading.champagne;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.corners * louterCornerPrice);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.corners * louterCornerPrice + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        setFixed(true);
                    }
                }
                else if (profileColor === 'silver') {
                    setRoundFramePrice(parseFloat(priceList.round_frame.silver));
                    setSmallWallFramePrice(parseFloat(priceList.small_wall_frame.silver));
                    setBigWallFramePrice(parseFloat(priceList.big_wall_frame.silver));
                    setFlatLeafPrice(parseFloat(priceList.flat_leaf.silver));
                    setRoundLeafPrice(parseFloat(priceList.round_leaf.silver));
                    setSmallNetLeafPrice(parseFloat(priceList.net_leaf.silver));
                    setBigNetLeafPrice(parseFloat(priceList.big_net_leaf.silver));
                    setInterlockPrice(parseFloat(priceList.interlock.silver));
                    setLeafDivisionPrice(parseFloat(priceList.leaf_division.silver));
                    setFourBayAdaptorPrice(parseFloat(priceList.four_bay_adpt.silver));
                    setKs50RoundFramePrice(parseFloat(priceList.ks50_round_frame.silver));
                    setKs50WallFramePrice(parseFloat(priceList.ks50_wall_frame.silver));
                    setKs50LeafPrice(parseFloat(priceList.ks50_leaf.silver));
                    setKs50InterlockPrice(parseFloat(priceList.ks50_interlock.silver));
                    setTrialcoRoundFramePrice(parseFloat(priceList.trialco_round_frame.silver));
                    setTrialcoWallFramePrice(parseFloat(priceList.trialco_wall_frame.silver));
                    setTrialcoLeafPrice(parseFloat(priceList.trialco_leaf.silver));
                    setTrialcoInterlockPrice(parseFloat(priceList.trialco_interlock.silver));
                    setLouterPrice(parseFloat(priceList.louter.silver));
                    setBigLPrice(parseFloat(priceList.big_l.silver));
                    setSmallTPrice(parseFloat(priceList.small_t.silver));
                    setBigTPrice(parseFloat(priceList.big_t.silver));
                    setBigZPrice(parseFloat(priceList.big_z.silver));
                    setMullionPrice(parseFloat(priceList.mullion.silver));
                    setBottomPrice(parseFloat(priceList.bottom.silver));
                    setHingeAdaptorPrice(parseFloat(priceList.double_hinge_adaptor.silver));
                    setBrushAdaptorPrice(parseFloat(priceList.brush_adpt.silver));
                    setBeadingPrice(parseFloat(priceList.beading.silver));
                    setECoLouterPrice(parseFloat(priceList.eco_louter.silver));
                    setEcoBigLPrice(parseFloat(priceList.eco_big_l.silver));
                    setEcoSmallTPrice(parseFloat(priceList.eco_small_t.silver));
                    setEcoBigTPrice(parseFloat(priceList.eco_big_t.silver));
                    setEcoBigZPrice(parseFloat(priceList.eco_big_z.silver));
                    setEcoMullionPrice(parseFloat(priceList.eco_mullion.silver));
                    setEcoBottomPrice(parseFloat(priceList.eco_bottom.silver));
                    setEcoBeadingPrice(parseFloat(priceList.eco_beading.silver));

                    if (workType === 'Sliding' || workType === 'Sliding-division') {
                        if (profileType === 'Skit-60') {
                            const leafPrice = parseFloat(priceList.flat_leaf.silver);
                            const divisionPrice = parseFloat(priceList.leaf_division.silver);
                            const adaptorPrice = parseFloat(priceList.interlock.silver);
                            const fcornerPrice =  parseFloat(priceList.accessories.frame_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.leaf_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, netLeafPrice, lockPrice, handlePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.round_frame.silver;
                            }
                            else if (frameType === 'small-wall-frame') {
                                framePrice = priceList.small_wall_frame.silver;
                            }
                            else if (frameType === 'big-wall-frame') {
                                framePrice = priceList.big_wall_frame.silver
                            }

                            if (netType === 'small-net-leaf') {netLeafPrice = parseFloat(priceList.net_leaf.silver)}
                            else {netLeafPrice =  parseFloat(priceList.big_net_leaf.silver)}

                            if (lockType === 'metal-lock') {lockPrice = parseFloat(priceList.accessories.metal_lock)}
                            else {lockPrice = parseFloat(priceList.accessories.press_lock)}

                            if (netHandleType === 'small-net-handle') {handlePrice = parseFloat(priceList.accessories.small_net_handle)}
                            else {handlePrice = parseFloat(priceList.accessories.big_net_handle)}

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }


                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'KS-50') {
                            const leafPrice = parseFloat(priceList.ks50_leaf.silver);
                            const divisionPrice = parseFloat(priceList.leaf_division.silver);
                            const netLeafPrice =  parseFloat(priceList.big_net_leaf.silver);
                            const adaptorPrice = parseFloat(priceList.ks50_interlock.silver);
                            const fcornerPrice =  parseFloat(priceList.accessories.O4_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.O4_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.heavy_duty_roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const lockPrice = parseFloat(priceList.accessories.press_lock);
                            const handlePrice = parseFloat(priceList.accessories.big_net_handle);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.ks50_round_frame.silver;
                            }
                            else if (frameType === 'wall-frame') {
                                framePrice = priceList.ks50_wall_frame.silver
                            }
                            else {
                                framePrice = priceList.ks50_wall_frame.silver
                            }

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
            
                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'Trialco') {
                            const leafPrice = parseFloat(priceList.trialco_leaf.silver);
                            const divisionPrice = parseFloat(priceList.leaf_division.silver);
                            const netLeafPrice =  parseFloat(priceList.big_net_leaf.silver);
                            const adaptorPrice = parseFloat(priceList.trialco_interlock.silver);
                            const fcornerPrice =  parseFloat(priceList.accessories.O4_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.O4_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.trialco_roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const lockPrice = parseFloat(priceList.accessories.press_lock);
                            const handlePrice = parseFloat(priceList.accessories.big_net_handle);
                            const kitPrice = parseFloat(priceList.accessories.trialco_kit);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.trialco_round_frame.silver;
                            }
                            else if (frameType === 'big-wall-frame') {
                                framePrice = priceList.trialco_wall_frame.silver;
                            }
                            else {
                                framePrice = priceList.trialco_wall_frame.silver;
                            }

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setTrialcoKitCost(materialList.kit * kitPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                kitPrice: kitPrice,
                                glassPrice: glassPrice,
                            });
            
                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.kit * kitPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        if (workType === 'Sliding-division' && materialList.leafDivision > 0) {
                            setDivision(true);
                        }
            
                        setSliding(true);
                    }
                    else if (workType === 'Projected' || workType === 'Casement') {
                        if (profileType === 'Italian') {
                            let lPrice, tPrice;
                            let hingesPrc;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.silver;
                            }
                            else {
                                lPrice = priceList.louter.silver;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.big_t.silver;
                            }
                            else {
                                tPrice = priceList.small_t.silver;
                            }

                            if (workType === 'Projected') {
                                hingesPrc = priceList.accessories.projected_hinges;
                                setHingesCost(materialList.hinges * hingesPrc); 
                                setProjected(true);
                            }
                            else {
                                hingesPrc = priceList.accessories.hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setCasement(true)
                            }

                            const beadingPrc = priceList.beading.silver;
                            const handlePrc = priceList.accessories.projected_handle;
                            const casementStoperPrc = priceList.accessories.casement_stopper;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigLCorner * bigZCornerPrice);
                            setProjectedHandleCost(materialList.handles * handlePrc);
                            setCasementStopperCost(materialList.casementStopper * casementStoperPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                hingesPrc: hingesPrc,
                                handlePrc: handlePrc,
                                casementStoperPrc: casementStoperPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.louterCorner * louterCornerPrice + materialList.bigLCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.handles * handlePrc +
                                materialList.casementStopper * casementStoperPrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }
            
                        else if (profileType === 'Eco') {
                            let lPrice, tPrice;
                            let hingesPrc;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.silver;
                            }
                            else {
                                lPrice = priceList.eco_louter.silver;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.eco_big_t.silver;
                            }
                            else {
                                tPrice = priceList.eco_small_t.silver;
                            }

                            if (workType === 'Projected') {
                                hingesPrc = priceList.accessories.projected_hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setProjected(true);
                            }
                            else {
                                hingesPrc = priceList.accessories.eco_hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setCasement(true)
                            }

                            const beadingPrc = priceList.eco_beading.silver;
                            const handlePrc = priceList.accessories.projected_handle;
                            const casementStoperPrc = priceList.accessories.casement_stopper;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                hingesPrc: hingesPrc,
                                handlePrc: handlePrc,
                                casementStoperPrc: casementStoperPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setProjectedHandleCost(materialList.handles * handlePrc);
                            setCasementStopperCost(materialList.casementStopper * casementStoperPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.louterCorner * louterCornerPrice + materialList.hinges * hingesPrc + materialList.handles * handlePrc +
                                materialList.casementStopper * casementStoperPrc + materialList.frameRubber * frameRubberPrc + 
                                materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc + 
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }
                    }
                    else if (workType === 'Hinge') {
                        if (profileType === 'Italian') {
                            let lPrice, divisionPrice = 0;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.silver;
                            }
                            else {
                                lPrice = priceList.louter.silver;
                            }

                            if (divisionType === 'mullion') {
                                divisionPrice = priceList.mullion.silver;
                            }
                            
                            const zPrice = priceList.big_z.silver;
                            const tPrice = priceList.big_t.silver;
                            const bottomPrc = priceList.bottom.silver;
                            const beadingPrc = priceList.beading.silver;
                            const adatorPrc = priceList.double_hinge_adaptor.silver;
                            const handlePrc = priceList.accessories.hinge_handle;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const hingesPrc = priceList.accessories.hinges;
                            const doorKeyPrc = priceList.accessories.hinge_door_key;
                            const towerBoltPrc = priceList.accessories.tower_bolt;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setZCost(materialList.bigZ * zPrice);
                            setBigTCost(materialList.small_big_T * tPrice);
                            setMullionCost(materialList.mollium * divisionPrice);
                            setbottomCost(materialList.bottom * bottomPrc);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setAdaptorCost(materialList.adaptor * adatorPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigZCorner * bigZCornerPrice);
                            setHingesCost(materialList.hinges * hingesPrc);
                            setKeysCost(materialList.key * doorKeyPrc);
                            setHandlesCost(materialList.handles * handlePrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                zPrice: zPrice,
                                tPrice: tPrice,
                                bottomPrc: bottomPrc,
                                divisionPrice: divisionPrice,
                                beadingPrc: beadingPrc,
                                adatorPrc: adatorPrc,
                                handlePrc: handlePrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                hingesPrc: hingesPrc,
                                doorKeyPrc: doorKeyPrc,
                                towerBoltPrc: towerBoltPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.LOuter * lPrice + materialList.bigZ * zPrice + materialList.small_big_T * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.adaptor * adatorPrc;
                            AccCost = materialList.louterCorner * louterCornerPrice +  materialList.bigZCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.key * doorKeyPrc +
                                        materialList.handles * handlePrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + 
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc;
                        }
                        else if (profileType === 'Eco') {
                            let lPrice, divisionPrice = 0;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.silver;
                            }
                            else {
                                lPrice = priceList.eco_louter.silver;
                            }

                            if (divisionType === 'mullion') {
                                divisionPrice = priceList.eco_mullion.silver;
                            }
                            
                            const zPrice = priceList.eco_big_z.silver;
                            const tPrice = priceList.eco_big_t.silver;
                            const bottomPrc = priceList.eco_bottom.silver;
                            const beadingPrc = priceList.eco_beading.silver;
                            const handlePrc = priceList.accessories.hinge_handle;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const hingesPrc = priceList.accessories.hinges;
                            const doorKeyPrc = priceList.accessories.hinge_door_key;
                            const towerBoltPrc = priceList.accessories.tower_bolt;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setZCost(materialList.bigZ * zPrice);
                            setBigTCost(materialList.small_big_T * tPrice);
                            setMullionCost(materialList.mollium * divisionPrice);
                            setbottomCost(materialList.bottom * bottomPrc);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setAdaptorCost(materialList.adaptor * tPrice);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigZCorner * bigZCornerPrice);
                            setHingesCost(materialList.hinges * hingesPrc);
                            setKeysCost(materialList.key * doorKeyPrc);
                            setHandlesCost(materialList.handles * handlePrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                zPrice: zPrice,
                                tPrice: tPrice,
                                bottomPrc: bottomPrc,
                                divisionPrice: divisionPrice,
                                beadingPrc: beadingPrc,
                                handlePrc: handlePrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                hingesPrc: hingesPrc,
                                doorKeyPrc: doorKeyPrc,
                                towerBoltPrc: towerBoltPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.LOuter * lPrice + materialList.bigZ * zPrice + materialList.small_big_T * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.adaptor * tPrice;
                            AccCost = materialList.louterCorner * louterCornerPrice +  materialList.bigZCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.key * doorKeyPrc +
                                        materialList.handles * handlePrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + 
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc;
                        }

                        setHinge(true);
                    }
                    else if (workType === 'Swing') { 
                        let divisionPrice = 0;

                        if (divisionType === 'mullion') {
                            divisionPrice = priceList.mullion.silver;
                        }

                        const lPrice = priceList.big_l.silver;
                        const brushAdaptorPrc = priceList.brush_adpt.silver;
                        const tPrice = priceList.big_t.silver;
                        const bottomPrc = priceList.bottom.silver;
                        const beadingPrc = priceList.beading.silver;
                        const handlePrc = priceList.accessories.swing_door_pipe_handle;
                        const frameRubberPrc = priceList.accessories.frame_rubber;
                        const beadingRubberPrc = priceList.accessories.beading_rubber;
                        const bigZCornerPrice = priceList.accessories.big_z_corner;
                        const adaptorBrushPrc = priceList.accessories.adaptor_brush;
                        const downCloserPrc = priceList.accessories.down_closer;
                        const doorKeyPrc = priceList.accessories.hinge_door_key;
                        const towerBoltPrc = priceList.accessories.tower_bolt;
                        const installScrewsPrice = priceList.accessories.installation_screw;
                        const wallPlugPrice = priceList.accessories.wall_plug;

                        setBigLCost(materialList.bigL * lPrice);
                        setBigTCost(materialList.bigT * tPrice);
                        setMullionCost(materialList.mollium * divisionPrice);
                        setbottomCost(materialList.bottom * bottomPrc);
                        setBeadingCost(materialList.beading * beadingPrc);
                        setAdaptorCost(materialList.brushAdaptor * brushAdaptorPrc);
                        setBigZCornersCost(materialList.corners * bigZCornerPrice);
                        setDownCloserCost(materialList.downCloser * downCloserPrc);
                        setKeysCost(materialList.key * doorKeyPrc);
                        setHandlesCost(materialList.handle * handlePrc);
                        setAdaptorBrushCost(materialList.adaptorBrush * adaptorBrushPrc);
                        setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                        setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                        setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                        setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                        setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                        let glassPrice;
                        if (glassColor === 'tinted') {
                            setGlassPrice(priceList.glass.tinted);
                            glassPrice = priceList.glass.tinted;
                        }
                        else if (glassColor === 'bronze-ref') {
                            setGlassPrice(priceList.glass.bronze_reflective);
                            glassPrice = priceList.glass.bronze_reflective;
                        }
                        else if (glassColor === 'dark') {
                            setGlassPrice(priceList.glass.dark);
                            glassPrice = priceList.glass.dark;
                        }
                        else if (glassColor === 'dark-ref') {
                            setGlassPrice(priceList.glass.dark_reflective);
                            glassPrice = priceList.glass.dark_reflective;
                        }
                        else if (glassColor === 'blue-ref') {
                            setGlassPrice(priceList.glass.blue_reflective);
                            glassPrice = priceList.glass.blue_reflective;
                        }
                        else if (glassColor === 'plain') {
                            setGlassPrice(priceList.glass.plain);
                            glassPrice = priceList.glass.plain;
                        }

                        setSelfPriceList({
                            lPrice: lPrice,
                            brushAdaptorPrc: brushAdaptorPrc,
                            tPrice: tPrice,
                            bottomPrc: bottomPrc,
                            divisionPrice: divisionPrice,
                            beadingPrc: beadingPrc,
                            handlePrc: handlePrc,
                            frameRubberPrc: frameRubberPrc,
                            beadingRubberPrc: beadingRubberPrc,
                            bigZCornerPrice: bigZCornerPrice,
                            adaptorBrushPrc: adaptorBrushPrc,
                            downCloserPrc: downCloserPrc,
                            doorKeyPrc: doorKeyPrc,
                            towerBoltPrc: towerBoltPrc,
                            installScrewsPrice: installScrewsPrice,
                            wallPlugPrice: wallPlugPrice,
                            glassPrice: glassPrice,
                        });

                        framesCost = materialList.bigL * lPrice + materialList.bigT * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.brushAdaptor * brushAdaptorPrc;
                        AccCost = materialList.corners * bigZCornerPrice + materialList.key * doorKeyPrc + materialList.adaptorBrush * adaptorBrushPrc +
                                        materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.downCloser * downCloserPrc +
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc +
                                        materialList.handle * handlePrc;

                        setSwing(true);
                    }
                    else if (workType === 'Fixed') {
                        if (profileType === 'Italian') {
                            let lPrice, tPrice, louterCornerPrice;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.silver;
                                louterCornerPrice = priceList.accessories.big_z_corner;

                            }
                            else {
                                lPrice = priceList.louter.silver;
                                louterCornerPrice = priceList.accessories.louter_corner;
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.big_t.silver;
                            }
                            else {
                                tPrice = priceList.small_t.silver;
                            }

                            const beadingPrc = priceList.beading.silver;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.corners * louterCornerPrice);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.corners * louterCornerPrice + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'Eco') {
                            let lPrice, tPrice;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.silver;
                            }
                            else {
                                lPrice = priceList.eco_louter.silver;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.eco_big_t.silver;
                            }
                            else {
                                tPrice = priceList.eco_small_t.silver;
                            }

                            const beadingPrc = priceList.eco_beading.silver;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.corners * louterCornerPrice);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.corners * louterCornerPrice + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        setFixed(true);
                    }
                }
                else if (profileColor === 'wood') {
                    setRoundFramePrice(parseFloat(priceList.round_frame.wood));
                    setSmallWallFramePrice(parseFloat(priceList.small_wall_frame.wood));
                    setBigWallFramePrice(parseFloat(priceList.big_wall_frame.wood));
                    setFlatLeafPrice(parseFloat(priceList.flat_leaf.wood));
                    setRoundLeafPrice(parseFloat(priceList.round_leaf.wood));
                    setSmallNetLeafPrice(parseFloat(priceList.net_leaf.wood));
                    setBigNetLeafPrice(parseFloat(priceList.big_net_leaf.wood));
                    setInterlockPrice(parseFloat(priceList.interlock.wood));
                    setLeafDivisionPrice(parseFloat(priceList.leaf_division.wood));
                    setFourBayAdaptorPrice(parseFloat(priceList.four_bay_adpt.wood));
                    setKs50RoundFramePrice(parseFloat(priceList.ks50_round_frame.wood));
                    setKs50WallFramePrice(parseFloat(priceList.ks50_wall_frame.wood));
                    setKs50LeafPrice(parseFloat(priceList.ks50_leaf.wood));
                    setKs50InterlockPrice(parseFloat(priceList.ks50_interlock.wood));
                    setTrialcoRoundFramePrice(parseFloat(priceList.trialco_round_frame.wood));
                    setTrialcoWallFramePrice(parseFloat(priceList.trialco_wall_frame.wood));
                    setTrialcoLeafPrice(parseFloat(priceList.trialco_leaf.wood));
                    setTrialcoInterlockPrice(parseFloat(priceList.trialco_interlock.wood));
                    setLouterPrice(parseFloat(priceList.louter.wood));
                    setBigLPrice(parseFloat(priceList.big_l.wood));
                    setSmallTPrice(parseFloat(priceList.small_t.wood));
                    setBigTPrice(parseFloat(priceList.big_t.wood));
                    setBigZPrice(parseFloat(priceList.big_z.wood));
                    setMullionPrice(parseFloat(priceList.mullion.wood));
                    setBottomPrice(parseFloat(priceList.bottom.wood));
                    setHingeAdaptorPrice(parseFloat(priceList.double_hinge_adaptor.wood));
                    setBrushAdaptorPrice(parseFloat(priceList.brush_adpt.wood));
                    setBeadingPrice(parseFloat(priceList.beading.wood));
                    setECoLouterPrice(parseFloat(priceList.eco_louter.wood));
                    setEcoBigLPrice(parseFloat(priceList.eco_big_l.wood));
                    setEcoSmallTPrice(parseFloat(priceList.eco_small_t.wood));
                    setEcoBigTPrice(parseFloat(priceList.eco_big_t.wood));
                    setEcoBigZPrice(parseFloat(priceList.eco_big_z.wood));
                    setEcoMullionPrice(parseFloat(priceList.eco_mullion.wood));
                    setEcoBottomPrice(parseFloat(priceList.eco_bottom.wood));
                    setEcoBeadingPrice(parseFloat(priceList.eco_beading.wood));

                    if (workType === 'Sliding' || workType === 'Sliding-division') {
                        if (profileType === 'Skit-60') {
                            const leafPrice = parseFloat(priceList.flat_leaf.wood);
                            const divisionPrice = parseFloat(priceList.leaf_division.wood);
                            const adaptorPrice = parseFloat(priceList.interlock.wood);
                            const fcornerPrice =  parseFloat(priceList.accessories.frame_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.leaf_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, netLeafPrice, lockPrice, handlePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.round_frame.wood;
                            }
                            else if (frameType === 'small-wall-frame') {
                                framePrice = priceList.small_wall_frame.wood;
                            }
                            else if (frameType === 'big-wall-frame') {
                                framePrice = priceList.big_wall_frame.wood
                            }

                            if (netType === 'small-net-leaf') {netLeafPrice = parseFloat(priceList.net_leaf.wood)}
                            else {netLeafPrice =  parseFloat(priceList.big_net_leaf.wood)}

                            if (lockType === 'metal-lock') {lockPrice = parseFloat(priceList.accessories.metal_lock)}
                            else {lockPrice = parseFloat(priceList.accessories.press_lock)}

                            if (netHandleType === 'small-net-handle') {handlePrice = parseFloat(priceList.accessories.small_net_handle)}
                            else {handlePrice = parseFloat(priceList.accessories.big_net_handle)}

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'KS-50') {
                            const leafPrice = parseFloat(priceList.ks50_leaf.wood);
                            const divisionPrice = parseFloat(priceList.leaf_division.wood);
                            const netLeafPrice =  parseFloat(priceList.big_net_leaf.wood);
                            const adaptorPrice = parseFloat(priceList.ks50_interlock.wood);
                            const fcornerPrice =  parseFloat(priceList.accessories.O4_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.O4_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.heavy_duty_roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const lockPrice = parseFloat(priceList.accessories.press_lock);
                            const handlePrice = parseFloat(priceList.accessories.big_net_handle);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.ks50_round_frame.wood;
                            }
                            else if (frameType === 'wall-frame') {
                                framePrice = priceList.ks50_wall_frame.wood
                            }
                            else {
                                framePrice = priceList.ks50_wall_frame.wood
                            }

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
            
                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'Trialco') {
                            const leafPrice = parseFloat(priceList.trialco_leaf.wood);
                            const divisionPrice = parseFloat(priceList.leaf_division.wood);
                            const netLeafPrice =  parseFloat(priceList.big_net_leaf.wood);
                            const adaptorPrice = parseFloat(priceList.trialco_interlock.wood);
                            const fcornerPrice =  parseFloat(priceList.accessories.O4_corner);
                            const lcornerPrice = parseFloat(priceList.accessories.O4_corner);
                            const nCornerPrice =  parseFloat(priceList.accessories.net_corner);
                            const brushPrc =  parseFloat(priceList.accessories.brush);
                            const rollerPrc = parseFloat(priceList.accessories.trialco_roller);
                            const glzRubPrc = parseFloat(priceList.accessories.glazing_rubber);
                            const netRubPrc = parseFloat(priceList.accessories.net_rubber);
                            const installScrewsPrice = parseFloat(priceList.accessories.installation_screw);
                            const lockPrice = parseFloat(priceList.accessories.press_lock);
                            const handlePrice = parseFloat(priceList.accessories.big_net_handle);
                            const kitPrice = parseFloat(priceList.accessories.trialco_kit);
                            const wallPlugPrice = parseFloat(priceList.accessories.wall_plug);

                            let framePrice, fiberNetPrc;

                            if (frameType === 'round-frame') {
                                framePrice = priceList.trialco_round_frame.wood;
                            }
                            else if (frameType === 'big-wall-frame') {
                                framePrice = priceList.trialco_wall_frame.wood;
                            }
                            else {
                                framePrice = priceList.trialco_wall_frame.wood;
                            }

                            if (fiberNetType === 'long') {fiberNetPrc = parseFloat(priceList.accessories.long_fiber_net)}
                            else {fiberNetPrc = parseFloat(priceList.accessories.short_fiber_net)}

                            setOuterTotalPrice(materialList.outerFrame * framePrice);
                            setLeafTotalPrice(materialList.innerLeaf * leafPrice);
                            setDivisionTotalPrice(materialList.leafDivision * divisionPrice);
                            setInterlockTotalPrice(materialList.adaptor * adaptorPrice);
                            setNetTotalPrice(materialList.netInner * netLeafPrice);
                            setFrameCornersCost(materialList.frameCorner * fcornerPrice);
                            setLeafCornersCost(materialList.leafCorner * lcornerPrice);
                            setNetCornersCost(materialList.netCorner * nCornerPrice);
                            setBrushCost(materialList.brush * brushPrc);
                            setRollersCost(materialList.roller * rollerPrc);
                            setLocksCost(materialList.pressLock * lockPrice)
                            setNetHandlesCost(materialList.netHandle * handlePrice)
                            setGlazingRbbersCost(materialList.glazingRubber * glzRubPrc);
                            setNetRubbersCost(materialList.netRubber * netRubPrc);
                            setFiberNetCost(materialList.fiberNet * fiberNetPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setTrialcoKitCost(materialList.kit * kitPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                outerPrice: framePrice,
                                leafPrice: leafPrice,
                                divisionPrice: divisionPrice,
                                interlockPrice: adaptorPrice,
                                netLeafPrice: netLeafPrice,
                                frameCornerPrice: fcornerPrice,
                                leafCornerPrice: lcornerPrice,
                                netCornerPrice: nCornerPrice,
                                brushPrice: brushPrc,
                                rollerPrice: rollerPrc,
                                lockPrice: lockPrice,
                                netHandlePrice: handlePrice,
                                fiberNetPrice: fiberNetPrc,
                                glazingRubberPrice: glzRubPrc,
                                netRubberPrice: netRubPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                kitPrice: kitPrice,
                                glassPrice: glassPrice,
                            });
            
                            framesCost = materialList.outerFrame * framePrice + materialList.innerLeaf * leafPrice + materialList.leafDivision * divisionPrice +
                                            materialList.adaptor * adaptorPrice + materialList.netInner * netLeafPrice;
                            AccCost = materialList.frameCorner * fcornerPrice + materialList.leafCorner * lcornerPrice + materialList.netCorner * nCornerPrice + materialList.brush * brushPrc +
                                        materialList.roller * rollerPrc + materialList.pressLock * lockPrice + materialList.netHandle * handlePrice + materialList.glazingRubber * glzRubPrc +
                                        materialList.netRubber * netRubPrc + fiberNetPrc + materialList.installScrews * installScrewsPrice + materialList.kit * kitPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        if (workType === 'Sliding-division' && materialList.leafDivision > 0) {
                            setDivision(true);
                        }
            
                        setSliding(true);
                    }
                    else if (workType === 'Projected' || workType === 'Casement') {
                        if (profileType === 'Italian') {
                            let lPrice, tPrice;
                            let hingesPrc;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.wood;
                            }
                            else {
                                lPrice = priceList.louter.wood;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.big_t.wood;
                            }
                            else {
                                tPrice = priceList.small_t.wood;
                            }

                            if (workType === 'Projected') {
                                hingesPrc = priceList.accessories.projected_hinges;
                                setHingesCost(materialList.hinges * hingesPrc); 
                                setProjected(true);
                            }
                            else {
                                hingesPrc = priceList.accessories.hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setCasement(true)
                            }

                            const beadingPrc = priceList.beading.wood;
                            const handlePrc = priceList.accessories.projected_handle;
                            const casementStoperPrc = priceList.accessories.casement_stopper;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigLCorner * bigZCornerPrice);
                            setProjectedHandleCost(materialList.handles * handlePrc);
                            setCasementStopperCost(materialList.casementStopper * casementStoperPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                hingesPrc: hingesPrc,
                                handlePrc: handlePrc,
                                casementStoperPrc: casementStoperPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.louterCorner * louterCornerPrice + materialList.bigLCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.handles * handlePrc +
                                materialList.casementStopper * casementStoperPrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }
            
                        else if (profileType === 'Eco') {
                            let lPrice, tPrice;
                            let hingesPrc;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.wood;
                            }
                            else {
                                lPrice = priceList.eco_louter.wood;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.eco_big_t.wood;
                            }
                            else {
                                tPrice = priceList.eco_small_t.wood;
                            }

                            if (workType === 'Projected') {
                                hingesPrc = priceList.accessories.projected_hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setProjected(true);
                            }
                            else {
                                hingesPrc = priceList.accessories.eco_hinges;
                                setHingesCost(materialList.hinges * hingesPrc);
                                setCasement(true)
                            }

                            const beadingPrc = priceList.eco_beading.wood;
                            const handlePrc = priceList.accessories.projected_handle;
                            const casementStoperPrc = priceList.accessories.casement_stopper;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setProjectedHandleCost(materialList.handles * handlePrc);
                            setCasementStopperCost(materialList.casementStopper * casementStoperPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                hingesPrc: hingesPrc,
                                handlePrc: handlePrc,
                                casementStoperPrc: casementStoperPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.louterCorner * louterCornerPrice + materialList.hinges * hingesPrc + materialList.handles * handlePrc +
                                materialList.casementStopper * casementStoperPrc + materialList.frameRubber * frameRubberPrc + 
                                materialList.beadingRubber * beadingRubberPrc + materialList.doorBrush * doorBrushPrc + 
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }
                    }
                    else if (workType === 'Hinge') {
                        if (profileType === 'Italian') {
                            let lPrice, divisionPrice = 0;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.wood;
                            }
                            else {
                                lPrice = priceList.louter.wood;
                            }

                            if (divisionType === 'mullion') {
                                divisionPrice = priceList.mullion.wood;
                            }
                            
                            const zPrice = priceList.big_z.wood;
                            const tPrice = priceList.big_t.wood;
                            const bottomPrc = priceList.bottom.wood;
                            const beadingPrc = priceList.beading.wood;
                            const adatorPrc = priceList.double_hinge_adaptor.wood;
                            const handlePrc = priceList.accessories.hinge_handle;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const hingesPrc = priceList.accessories.hinges;
                            const doorKeyPrc = priceList.accessories.hinge_door_key;
                            const towerBoltPrc = priceList.accessories.tower_bolt;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setZCost(materialList.bigZ * zPrice);
                            setBigTCost(materialList.small_big_T * tPrice);
                            setMullionCost(materialList.mollium * divisionPrice);
                            setbottomCost(materialList.bottom * bottomPrc);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setAdaptorCost(materialList.adaptor * adatorPrc);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigZCorner * bigZCornerPrice);
                            setHingesCost(materialList.hinges * hingesPrc);
                            setKeysCost(materialList.key * doorKeyPrc);
                            setHandlesCost(materialList.handles * handlePrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                zPrice: zPrice,
                                tPrice: tPrice,
                                bottomPrc: bottomPrc,
                                divisionPrice: divisionPrice,
                                beadingPrc: beadingPrc,
                                adatorPrc: adatorPrc,
                                handlePrc: handlePrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                hingesPrc: hingesPrc,
                                doorKeyPrc: doorKeyPrc,
                                towerBoltPrc: towerBoltPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.LOuter * lPrice + materialList.bigZ * zPrice + materialList.small_big_T * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.adaptor * adatorPrc;
                            AccCost = materialList.louterCorner * louterCornerPrice +  materialList.bigZCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.key * doorKeyPrc +
                                        materialList.handles * handlePrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + 
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc;
                        }
                        else if (profileType === 'Eco') {
                            let lPrice, divisionPrice = 0;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.wood;
                            }
                            else {
                                lPrice = priceList.eco_louter.wood;
                            }

                            if (divisionType === 'mullion') {
                                divisionPrice = priceList.eco_mullion.wood;
                            }
                            
                            const zPrice = priceList.eco_big_z.wood;
                            const tPrice = priceList.eco_big_t.wood;
                            const bottomPrc = priceList.eco_bottom.wood;
                            const beadingPrc = priceList.eco_beading.wood;
                            const handlePrc = priceList.accessories.hinge_handle;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const bigZCornerPrice = priceList.accessories.big_z_corner;
                            const doorBrushPrc = priceList.accessories.door_brush;
                            const hingesPrc = priceList.accessories.hinges;
                            const doorKeyPrc = priceList.accessories.hinge_door_key;
                            const towerBoltPrc = priceList.accessories.tower_bolt;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setZCost(materialList.bigZ * zPrice);
                            setBigTCost(materialList.small_big_T * tPrice);
                            setMullionCost(materialList.mollium * divisionPrice);
                            setbottomCost(materialList.bottom * bottomPrc);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setAdaptorCost(materialList.adaptor * tPrice);
                            setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                            setBigZCornersCost(materialList.bigZCorner * bigZCornerPrice);
                            setHingesCost(materialList.hinges * hingesPrc);
                            setKeysCost(materialList.key * doorKeyPrc);
                            setHandlesCost(materialList.handles * handlePrc);
                            setDoorBrushCost(materialList.doorBrush * doorBrushPrc);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                            setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                zPrice: zPrice,
                                tPrice: tPrice,
                                bottomPrc: bottomPrc,
                                divisionPrice: divisionPrice,
                                beadingPrc: beadingPrc,
                                handlePrc: handlePrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                bigZCornerPrice: bigZCornerPrice,
                                doorBrushPrc: doorBrushPrc,
                                hingesPrc: hingesPrc,
                                doorKeyPrc: doorKeyPrc,
                                towerBoltPrc: towerBoltPrc,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });

                            framesCost = materialList.LOuter * lPrice + materialList.bigZ * zPrice + materialList.small_big_T * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.adaptor * tPrice;
                            AccCost = materialList.louterCorner * louterCornerPrice +  materialList.bigZCorner * bigZCornerPrice + materialList.hinges * hingesPrc + materialList.key * doorKeyPrc +
                                        materialList.handles * handlePrc + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + 
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc;
                        }

                        setHinge(true);
                    }
                    else if (workType === 'Swing') { 
                        let divisionPrice = 0;

                        if (divisionType === 'mullion') {
                            divisionPrice = priceList.mullion.wood;
                        }

                        const lPrice = priceList.big_l.wood;
                        const brushAdaptorPrc = priceList.brush_adpt.wood;
                        const tPrice = priceList.big_t.wood;
                        const bottomPrc = priceList.bottom.wood;
                        const beadingPrc = priceList.beading.wood;
                        const handlePrc = priceList.accessories.swing_door_pipe_handle;
                        const frameRubberPrc = priceList.accessories.frame_rubber;
                        const beadingRubberPrc = priceList.accessories.beading_rubber;
                        const bigZCornerPrice = priceList.accessories.big_z_corner;
                        const adaptorBrushPrc = priceList.accessories.adaptor_brush;
                        const downCloserPrc = priceList.accessories.down_closer;
                        const doorKeyPrc = priceList.accessories.hinge_door_key;
                        const towerBoltPrc = priceList.accessories.tower_bolt;
                        const installScrewsPrice = priceList.accessories.installation_screw;
                        const wallPlugPrice = priceList.accessories.wall_plug;

                        setBigLCost(materialList.bigL * lPrice);
                        setBigTCost(materialList.bigT * tPrice);
                        setMullionCost(materialList.mollium * divisionPrice);
                        setbottomCost(materialList.bottom * bottomPrc);
                        setBeadingCost(materialList.beading * beadingPrc);
                        setAdaptorCost(materialList.brushAdaptor * brushAdaptorPrc);
                        setBigZCornersCost(materialList.corners * bigZCornerPrice);
                        setDownCloserCost(materialList.downCloser * downCloserPrc);
                        setKeysCost(materialList.key * doorKeyPrc);
                        setHandlesCost(materialList.handle * handlePrc);
                        setAdaptorBrushCost(materialList.adaptorBrush * adaptorBrushPrc);
                        setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                        setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                        setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                        setWallPlugCost(materialList.wallPlug * wallPlugPrice);
                        setTowerBoltCost(materialList.towerBolt * towerBoltPrc);

                        let glassPrice;
                        if (glassColor === 'tinted') {
                            setGlassPrice(priceList.glass.tinted);
                            glassPrice = priceList.glass.tinted;
                        }
                        else if (glassColor === 'bronze-ref') {
                            setGlassPrice(priceList.glass.bronze_reflective);
                            glassPrice = priceList.glass.bronze_reflective;
                        }
                        else if (glassColor === 'dark') {
                            setGlassPrice(priceList.glass.dark);
                            glassPrice = priceList.glass.dark;
                        }
                        else if (glassColor === 'dark-ref') {
                            setGlassPrice(priceList.glass.dark_reflective);
                            glassPrice = priceList.glass.dark_reflective;
                        }
                        else if (glassColor === 'blue-ref') {
                            setGlassPrice(priceList.glass.blue_reflective);
                            glassPrice = priceList.glass.blue_reflective;
                        }
                        else if (glassColor === 'plain') {
                            setGlassPrice(priceList.glass.plain);
                            glassPrice = priceList.glass.plain;
                        }

                        setSelfPriceList({
                            lPrice: lPrice,
                            brushAdaptorPrc: brushAdaptorPrc,
                            tPrice: tPrice,
                            bottomPrc: bottomPrc,
                            divisionPrice: divisionPrice,
                            beadingPrc: beadingPrc,
                            handlePrc: handlePrc,
                            frameRubberPrc: frameRubberPrc,
                            beadingRubberPrc: beadingRubberPrc,
                            bigZCornerPrice: bigZCornerPrice,
                            adaptorBrushPrc: adaptorBrushPrc,
                            downCloserPrc: downCloserPrc,
                            doorKeyPrc: doorKeyPrc,
                            towerBoltPrc: towerBoltPrc,
                            installScrewsPrice: installScrewsPrice,
                            wallPlugPrice: wallPlugPrice,
                            glassPrice: glassPrice,
                        });

                        framesCost = materialList.bigL * lPrice + materialList.bigT * tPrice + materialList.bottom * bottomPrc +
                                    materialList.mollium * divisionPrice + materialList.beading * beadingPrc + materialList.brushAdaptor * brushAdaptorPrc;
                        AccCost = materialList.corners * bigZCornerPrice + materialList.key * doorKeyPrc + materialList.adaptorBrush * adaptorBrushPrc +
                                        materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc + materialList.downCloser * downCloserPrc +
                                        materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice + materialList.towerBolt * towerBoltPrc +
                                        materialList.handle * handlePrc;

                        setSwing(true);
                    }
                    else if (workType === 'Fixed') {
                        if (profileType === 'Italian') {
                            let lPrice, tPrice, louterCornerPrice;

                            if (lType === 'big-l') {
                                lPrice = priceList.big_l.wood;
                                louterCornerPrice = priceList.accessories.big_z_corner;

                            }
                            else {
                                lPrice = priceList.louter.wood;
                                louterCornerPrice = priceList.accessories.louter_corner;
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.big_t.wood;
                            }
                            else {
                                tPrice = priceList.small_t.wood;
                            }

                            const beadingPrc = priceList.beading.wood;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.corners * louterCornerPrice);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.corners * louterCornerPrice + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        else if (profileType === 'Eco') {
                            let lPrice, tPrice;

                            if (lType === 'big-l') {
                                lPrice = priceList.eco_big_l.wood;
                            }
                            else {
                                lPrice = priceList.eco_louter.wood;
                                
                            }

                            if (tType === 'big-t') {
                                tPrice = priceList.eco_big_t.wood;
                            }
                            else {
                                tPrice = priceList.eco_small_t.wood;
                            }

                            const beadingPrc = priceList.eco_beading.wood;
                            const frameRubberPrc = priceList.accessories.frame_rubber;
                            const beadingRubberPrc = priceList.accessories.beading_rubber;
                            const louterCornerPrice = priceList.accessories.louter_corner;
                            const installScrewsPrice = priceList.accessories.installation_screw;
                            const wallPlugPrice = priceList.accessories.wall_plug;

                            setLouterCost(materialList.LOuter * lPrice);
                            setTCost(materialList.small_big_T * tPrice);
                            setBeadingCost(materialList.beading * beadingPrc);
                            setLouterCornersCost(materialList.corners * louterCornerPrice);
                            setFrameRubberCost(materialList.frameRubber * frameRubberPrc);
                            setBeadingRubberCost(materialList.beadingRubber * beadingRubberPrc);
                            setInstallScrewsCost(materialList.installScrews * installScrewsPrice);
                            setWallPlugCost(materialList.wallPlug * wallPlugPrice);

                            let glassPrice;
                            if (glassColor === 'tinted') {
                                setGlassPrice(priceList.glass.tinted);
                                glassPrice = priceList.glass.tinted;
                            }
                            else if (glassColor === 'bronze-ref') {
                                setGlassPrice(priceList.glass.bronze_reflective);
                                glassPrice = priceList.glass.bronze_reflective;
                            }
                            else if (glassColor === 'dark') {
                                setGlassPrice(priceList.glass.dark);
                                glassPrice = priceList.glass.dark;
                            }
                            else if (glassColor === 'dark-ref') {
                                setGlassPrice(priceList.glass.dark_reflective);
                                glassPrice = priceList.glass.dark_reflective;
                            }
                            else if (glassColor === 'blue-ref') {
                                setGlassPrice(priceList.glass.blue_reflective);
                                glassPrice = priceList.glass.blue_reflective;
                            }
                            else if (glassColor === 'plain') {
                                setGlassPrice(priceList.glass.plain);
                                glassPrice = priceList.glass.plain;
                            }

                            setSelfPriceList({
                                lPrice: lPrice,
                                tPrice: tPrice,
                                beadingPrc: beadingPrc,
                                frameRubberPrc: frameRubberPrc,
                                beadingRubberPrc: beadingRubberPrc,
                                louterCornerPrice: louterCornerPrice,
                                installScrewsPrice: installScrewsPrice,
                                wallPlugPrice: wallPlugPrice,
                                glassPrice: glassPrice,
                            });
                            
                            framesCost = materialList.LOuter * lPrice + materialList.small_big_T * tPrice + materialList.beading * beadingPrc;
                            AccCost =  materialList.corners * louterCornerPrice + materialList.frameRubber * frameRubberPrc + materialList.beadingRubber * beadingRubberPrc +
                                materialList.installScrews * installScrewsPrice + materialList.wallPlug * wallPlugPrice;
                        }

                        setFixed(true);
                    }
                }

                setFrameCornerPrice(parseFloat(priceList.accessories.frame_corner));
                setLeafCornerPrice(parseFloat(priceList.accessories.leaf_corner));
                setNetCornerPrice(parseFloat(priceList.accessories.net_corner));
                setBrushPrice(parseFloat(priceList.accessories.brush));
                setRollerPrice(parseFloat(priceList.accessories.roller));
                setMetalLockPrice(parseFloat(priceList.accessories.metal_lock));
                setPressLockPrice(parseFloat(priceList.accessories.press_lock));
                setSlidingKeyPrice(parseFloat(priceList.accessories.sliding_key));
                setSmallNetHandlePrice(parseFloat(priceList.accessories.small_net_handle));
                setBigNetHandlePrice(parseFloat(priceList.accessories.big_net_handle));
                setShortFiberNetPrice(parseFloat(priceList.accessories.short_fiber_net));
                setLongFiberNetPrice(parseFloat(priceList.accessories.long_fiber_net));
                setNetRubberPrice(parseFloat(priceList.accessories.net_rubber));
                setGlazingRubberPrice(parseFloat(priceList.accessories.glazing_rubber));
                setO4CornerPrice(parseFloat(priceList.accessories.O4_corner));
                setHeavyDutyRollerPrice(parseFloat(priceList.accessories.heavy_duty_roller));
                setTrialcoRollerPrice(parseFloat(priceList.accessories.trialco_roller));
                setTrialcoKitPrice(parseFloat(priceList.accessories.trialco_kit));
                setLouterCornerPrice(parseFloat(priceList.accessories.louter_corner));
                setBigZCornerPrice(parseFloat(priceList.accessories.big_z_corner));
                setAdaptorBrushPrice(parseFloat(priceList.accessories.adaptor_brush));
                setProjectedHingesPrice(parseFloat(priceList.accessories.projected_hinges));
                setHingesPrice(parseFloat(priceList.accessories.hinges));
                setEcoHingesPrice(parseFloat(priceList.accessories.eco_hinges));
                setBeadingRubberPrice(parseFloat(priceList.accessories.beading_rubber));
                setFrameRubberPrice(parseFloat(priceList.accessories.door_rubber));
                setCasementStopperPrice(parseFloat(priceList.accessories.casement_stopper));
                setProjectedHandlePrice(parseFloat(priceList.accessories.projected_handle));
                setDoorHandlePrice(parseFloat(priceList.accessories.door_handle));
                setDownCloserPrice(parseFloat(priceList.accessories.down_closer));
                setHingeDoorKeyPrice(parseFloat(priceList.accessories.hinge_door_key));
                setTowerBoltPrice(parseFloat(priceList.accessories.tower_bolt));
                setInstallationScrewPrice(parseFloat(priceList.accessories.installation_screw));
                setWallPlugPrice(parseFloat(priceList.accessories.wall_plug));
                setDoorBrushPrice(parseFloat(priceList.accessories.door_brush));
                setHingeHandlePrice(priceList.accessories.hinge_handle)
                setPipeHandlePrice(priceList.accessories.swing_door_pipe_handle)

                let glasPrice;
                if (glassColor === 'tinted') {
                    setGlassPrice(priceList.glass.tinted);
                    glasPrice = priceList.glass.tinted;
                }
                else if (glassColor === 'bronze-ref') {
                    setGlassPrice(priceList.glass.bronze_reflective);
                    glasPrice = priceList.glass.bronze_reflective;
                }
                else if (glassColor === 'dark') {
                    setGlassPrice(priceList.glass.dark);
                    glasPrice = priceList.glass.dark;
                }
                else if (glassColor === 'dark-ref') {
                    setGlassPrice(priceList.glass.dark_reflective);
                    glasPrice = priceList.glass.dark_reflective;
                }
                else if (glassColor === 'blue-ref') {
                    setGlassPrice(priceList.glass.blue_reflective);
                    glasPrice = priceList.glass.blue_reflective;
                }
                else if (glassColor === 'plain') {
                    setGlassPrice(priceList.glass.plain);
                    glasPrice = priceList.glass.plain;
                }

                totalCost = framesCost + materialList.glassSheet * glasPrice + AccCost;
                
                setGlassTotalCost(materialList.glassSheet * glasPrice)
                setFramesCost(framesCost),
                setAccessoriesCost(AccCost);
                setProjectTotalCost(totalCost);
            } catch(error) {
                if (workType === 'Sliding' || workType === 'Sliding-division') {
                    if (workType === 'Sliding-division' && materialList.leafDivision > 0) {
                        setDivision(true);
                    }
        
                    setSliding(true);
                }
                else if (workType === 'Projected' || workType === 'Casement') {
                    if (workType === 'Projected') {
                        setProjected(true);
                    }
                    else {
                        setCasement(true)
                    }
                }
                else if (workType === 'Hinge') {
                    setHinge(true);
                }
                else if (workType === 'Swing') {
                    setSwing(true);
                }
                else if (workType === 'Fixed') {
                    setFixed(true);
                }
                
                ToastAndroid.show("Failed to fetch current prices", ToastAndroid.LONG);
            }
        }  
        else { // IF NO INTERNET
            console.log('no fetch--------')
            if (workType === 'Sliding' || workType === 'Sliding-division') {
                if (workType === 'Sliding-division' && materialList.leafDivision > 0) {
                    setDivision(true);
                }
    
                setSliding(true);
            }
            else if (workType === 'Projected' || workType === 'Casement') {
                if (workType === 'Projected') {
                    setProjected(true);
                }
                else {
                    setCasement(true)
                }
            }
            else if (workType === 'Hinge') {
                setHinge(true);
            }
            else if (workType === 'Swing') {
                setSwing(true);
            }
            else if (workType === 'Fixed') {
                setFixed(true);
            }

            alufappContext.showToast();
            alufappContext.setWhichToast('prices-toast');
        } 
    }, [profileType]);

    function saveHandler() {
        let firstRandNum = Math.ceil(Math.random() * 1000);
        let secondRandNum = Math.ceil(Math.random() * 100);
        const id = '@mw-' + workTitle + firstRandNum.toString() + '-' + secondRandNum.toString();
        if (isSliding) {
            const newList = {
                id: id,
                date: currentDate,
                dimensions: dimensions,
                workTitle: workTitle,
                materialList: materialList, 
                offcutlList: offcutlList,
                workType: workType,
                profileColor: profileColor,
                glassColor: glassColor,
                profileType: profileType,
                frameType: frameType,
                leafType: leafType,
                netType: netType,
                lockType: lockType,
                fiberNetType: fiberNetType,
                netHandleType: netHandleType,
                priceList: selfPriceList,
                totalPieces: totalPieces,
            }

            AsyncStorage.setItem(id, JSON.stringify(newList));
            alufappContext.saveMatWork(newList);
        }
        else if (isProjected || isCasement) {
            const newList = {
                id: id,
                date: currentDate,
                dimensions: dimensions,
                workTitle: workTitle,
                materialList: materialList, 
                offcutlList: offcutlList,
                workType: workType,
                profileColor: profileColor,
                glassColor: glassColor,
                profileType: profileType,
                lType: lType,
                tType: tType,
                priceList: selfPriceList,
                totalPieces: totalPieces,
            }

            AsyncStorage.setItem(id, JSON.stringify(newList));
            alufappContext.saveMatWork(newList);
        }
        else if (isHinge) {
            const newList = {
                id: id,
                date: currentDate,
                dimensions: dimensions,
                workTitle: workTitle,
                materialList: materialList, 
                offcutlList: offcutlList,
                workType: workType,
                profileColor: profileColor,
                glassColor: glassColor,
                profileType: profileType,
                lType: lType,
                tType: tType,
                divisionType: divisionType,
                priceList: selfPriceList,
                totalPieces: totalPieces,
            }
            
            AsyncStorage.setItem(id, JSON.stringify(newList));
            alufappContext.saveMatWork(newList);
        }
        else if (isSwing) {
            const newList = {
                id: id,
                date: currentDate,
                dimensions: dimensions,
                workTitle: workTitle,
                materialList: materialList, 
                offcutlList: offcutlList,
                workType: workType,
                profileColor: profileColor,
                glassColor: glassColor,
                profileType: profileType,
                divisionType: divisionType,
                priceList: selfPriceList,
                totalPieces: totalPieces,
            }
            
            AsyncStorage.setItem(id, JSON.stringify(newList));
            alufappContext.saveMatWork(newList);
        }
        else {
            const newList = {
                id: id,
                date: currentDate,
                dimensions: dimensions,
                workTitle: workTitle,
                materialList: materialList, 
                offcutlList: offcutlList,
                workType: workType,
                profileColor: profileColor,
                glassColor: glassColor,
                profileType: profileType,
                lType: lType,
                tType: tType,
                priceList: selfPriceList,
                totalPieces: totalPieces,
            }
            
            AsyncStorage.setItem(id, JSON.stringify(newList));
            alufappContext.saveMatWork(newList);
        }

        navigation.navigate('MaterialCalc');
    }

    const SetPrices = ({visible}) => {
        const [isError, setError] = useState(false);
        const [] = useState('');
        const [] = useState('');

        const [framePrc,setFramePrc] = useState('');
        const [leafPrc,setLeafPrc] = useState('');
        const [netInnerPrc,setNetInnerPrc] = useState('');
        const [interlockPrc,setInterlockPrc] = useState('');
        const [leafDivPrc, setLeafDivPrc] = useState('');
        const [glassPrc, setGlassPrc] = useState('');
        const [fcPrc, setFCPrc] = useState('');
        const [lcPrc, setLCPrc] = useState('');
        const [ncPrc, setNCPrc] = useState('');
        const [brushshPrc, setBrushPrc] = useState('');
        const [rollerPrc, setRollerPrc] = useState('');
        const [lockPrc, setLockPrc] = useState('');
        const [kitPrc, setkitPrc] = useState('');
        const [netHandlePrc, setNetHandlePrc] = useState('');
        const [fiberPrc, setFiberPrc] = useState('');
        const [gRubPrc, setGRubPrc] = useState('');
        const [nRubPrc, setNRubPrc] = useState('');
        const [intScrewPrc, setIntScrewPrc] = useState('');
        const [plugPrc, setPlugPrc] = useState('');

        const [lPrc, setLPrice] = useState('');
        const [zPrc, setZPrice] = useState('');
        const [tPrc, setTPrice] = useState('');
        const [mulPrc, setMulPrice] = useState('');
        const [botPrc, setBotPrice] = useState('');
        const [brushAdpPrc, setBrushAdpPrice] = useState('');
        const [hingeAdapPrc, setHingeAdapPrc] = useState('');
        const [BeadinPrc, setBeadinPrc] = useState('');
        const [loutCornerPrc, setLoutCornerPrc] = useState('');
        const [bigLCornerPrc, setBigLCornerPrc] = useState('');
        const [hingePrc, setHingePrc] = useState('');
        const [hingeHandlePrc, setHingeHandlePrc] = useState('');
        const [hingeKeyPrc, setHingeKeyPrc] = useState('');
        const [projHandlePrc, setProjHandlePrc] = useState('');
        const [casementStopPrc, setCasementStopPrc] = useState('');
        const [frameRubPrc, setFrameRubPrc] = useState('');
        const [beadingRubPrc, setBeadingRubPrc] = useState('');
        const [doorBrushPrc, setDoorBrushPrc] = useState('');
        const [adapBrushPrc, setAdapBrushPrc] = useState('');
        const [towerBoltPrc, setTowerBoltPrc] = useState('');
        const [downCloserPrc, setDownCloserPrc] = useState('');
        const [pipeHandlePrc, setPipeHandlePrc] = useState('');
        const [] = useState('');
        const [] = useState('');
        const [] = useState('');

        function setPricesHandler () {
            const regex = /[1-9]+/;
            let totalDeduction = 0, totalAddition = 0;
            let frameDeduction = 0, frameAddition = 0;
            let accessoriesDeduction = 0, accessoriesAddition = 0;

            if (isSliding) {
                if (framePrc.length > 0) {
                    if (regex.test(framePrc)) {
                        let newPrice = parseFloat(framePrc);
                        if (frameType === 'round-frame') {
                            if (profileType === 'Skit-60') {
                                setRoundFramePrice(newPrice);
                            }
                            else if (profileType === 'KS-50') {
                                setKs50RoundFramePrice(newPrice);
                            }
                            else {
                                setTrialcoRoundFramePrice(newPrice);
                            }
                            
                        }
                        else if (frameType === 'small-wall-frame') {
                            setSmallWallFramePrice(newPrice);
                        }
                        else {
                            if (profileType === 'Skit-60') {
                                setBigWallFramePrice(newPrice);
                            }
                            else if (profileType === 'KS-50') {
                                setKs50WallFramePrice(newPrice);
                            }
                            else {
                                setTrialcoWallFramePrice(newPrice);
                            }
                            
                        }
                        
                        // setProjectTotalCost(projectTotalCost - outerTotalPrice + materialList.outerFrame * newPrice);
                        frameDeduction += outerTotalPrice;
                        frameAddition += materialList.outerFrame * newPrice;
                        totalDeduction += outerTotalPrice;
                        totalAddition += materialList.outerFrame * newPrice;
                        setOuterTotalPrice(materialList.outerFrame * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            outerPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (leafPrc.length > 0) {
                    if (regex.test(leafPrc)) {
                        let newPrice = parseFloat(leafPrc);
                        if (leafType === 'round-leaf') {
                            if (profileType === 'Skit-60') {
                                setRoundLeafPrice(newPrice);
                            }
                            else if (profileType === 'KS-50') {
                                setKs50LeafPrice(newPrice);
                            }
                            else {
                                setTrialcoLeafPrice(newPrice);
                            }
                        }
                        else {
                            if (profileType === 'Skit-60') {
                                setFlatLeafPrice(newPrice);
                            }
                            else if (profileType === 'KS-50') {
                                setKs50LeafPrice(newPrice);
                            }
                            else {
                                setTrialcoLeafPrice(newPrice);
                            }
                        }
                        
                        // setProjectTotalCost(projectTotalCost - leafTotalPrice + materialList.innerLeaf * newPrice)
                        frameDeduction += leafTotalPrice;
                        frameAddition += materialList.innerLeaf * newPrice;
                        totalDeduction += leafTotalPrice;
                        totalAddition += materialList.innerLeaf * newPrice;
                        setLeafTotalPrice(materialList.innerLeaf * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            leafPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (netInnerPrc.length > 0) {
                    if (regex.test(netInnerPrc)) {
                        let newPrice = parseFloat(netInnerPrc);
                        if (netType === 'big-net') {
                            setBigNetLeafPrice(newPrice);
                        }
                        else {
                            setSmallNetLeafPrice(newPrice)
                        }
                        
                        // setProjectTotalCost(projectTotalCost - netTotalPrice + materialList.netInner * netInnerPrc);
                        frameDeduction += netTotalPrice;
                        frameAddition += materialList.netInner * newPrice;
                        totalDeduction += netTotalPrice;
                        totalAddition += materialList.netInner * newPrice;
                        setNetTotalPrice(materialList.netInner * netInnerPrc);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            netLeafPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (interlockPrc.length > 0) {
                    if (regex.test(interlockPrc)) {
                        let newPrice = parseFloat(interlockPrc);
                        
                        if (profileType === 'Skit-60') {
                            setInterlockPrice(newPrice);
                        }
                        else if (profileType === 'KS-50') {
                            setKs50InterlockPrice(newPrice);
                        }
                        else {
                            setTrialcoInterlockPrice(newPrice);
                        }

                        // setProjectTotalCost(projectTotalCost - interlockTotalPrice + materialList.adaptor * newPrice);
                        frameDeduction += interlockTotalPrice;
                        frameAddition += materialList.adaptor * newPrice;
                        totalDeduction += interlockTotalPrice;
                        totalAddition += materialList.adaptor * newPrice;
                        setInterlockTotalPrice(materialList.adaptor * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            interlockPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (leafDivPrc.length > 0) {
                    if (regex.test(leafDivPrc)) {
                        let newPrice = parseFloat(leafDivPrc);
                        setLeafDivisionPrice(newPrice);
                        // setProjectTotalCost(projectTotalCost - divisionTotalPrice + materialList.leafDivision * newPrice);
                        frameDeduction += divisionTotalPrice;
                        frameAddition += materialList.leafDivision * newPrice;
                        totalDeduction += divisionTotalPrice;
                        totalAddition += materialList.leafDivision * newPrice;
                        setDivisionTotalPrice(materialList.leafDivision * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            divisionPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (glassPrc.length > 0) {
                    if (regex.test(glassPrc)) {
                        let newPrice = parseFloat(glassPrc);
                        setGlassPrice(newPrice);
                        // setProjectTotalCost(projectTotalCost - glassTotalCost + materialList.glassSheet * newPrice);
                        totalDeduction += glassTotalCost;
                        totalAddition += materialList.glassSheet * newPrice;
                        setGlassTotalCost(materialList.glassSheet * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            glassPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (fcPrc.length > 0) {
                    if (regex.test(fcPrc)) {
                        let newPrice = parseFloat(fcPrc);
                        setFrameCornerPrice(newPrice);
                       
                        accessoriesDeduction += frameCornersCost;
                        accessoriesAddition += materialList.frameCorner * newPrice;
                        totalDeduction += frameCornersCost;
                        totalAddition += materialList.frameCorner * newPrice;
                        setFrameCornersCost(materialList.frameCorner * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            frameCornerPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (lcPrc.length > 0) {
                    if (regex.test(lcPrc)) {
                        let newPrice = parseFloat(lcPrc);
                        setLeafCornerPrice(newPrice);

                        accessoriesDeduction += leafCornersCost;
                        accessoriesAddition += materialList.leafCorner * newPrice;
                        totalDeduction += leafCornersCost;
                        totalAddition += materialList.leafCorner * newPrice;
                        setLeafCornersCost(materialList.leafCorner * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            leafCornerPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (ncPrc.length > 0) {
                    if (regex.test(ncPrc)) {
                        let newPrice = parseFloat(ncPrc);
                        setNetCornerPrice(newPrice);
                        
                        accessoriesDeduction += netCornersCost;
                        accessoriesAddition += materialList.netCorner * newPrice;
                        totalDeduction += netCornersCost;
                        totalAddition += materialList.netCorner * newPrice;
                        setNetCornersCost(materialList.netCorner * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            netCornerPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (brushshPrc.length > 0) {
                    if (regex.test(brushshPrc)) {
                        let newPrice = parseFloat(brushshPrc);
                        setBrushPrice(newPrice);
                        // setProjectTotalCost(projectTotalCost - brushCost + materialList.brush * newPrice);
                        accessoriesDeduction += brushCost;
                        accessoriesAddition += materialList.brush * newPrice;
                        totalDeduction += brushCost;
                        totalAddition += materialList.brush * newPrice;
                        setBrushCost(materialList.brush * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            brushPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (kitPrc.length > 0) {
                    if (regex.test(kitPrc)) {
                        let newPrice = parseFloat(kitPrc);
                        setTrialcoKitPrice(newPrice);
                        
                        accessoriesDeduction += trialcoKitCost;
                        accessoriesAddition += materialList.kit * newPrice;
                        totalDeduction += trialcoKitCost;
                        totalAddition += materialList.kit * newPrice;
                        setTrialcoKitCost(materialList.kit * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            kitPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (rollerPrc.length > 0) {
                    if (regex.test(rollerPrc)) {
                        let newPrice = parseFloat(rollerPrc);

                        if (profileType === 'Skit-60') {
                            setRollerPrice(newPrice);
                        }
                        else if (profileType === 'KS-50') {
                            setHeavyDutyRollerPrice(newPrice);
                        }
                        else {
                            setTrialcoRollerPrice(newPrice);
                        }

                        accessoriesDeduction += rollersCost;
                        accessoriesAddition += materialList.roller * newPrice;
                        totalDeduction += rollersCost;
                        totalAddition += materialList.roller * newPrice;
                        setRollersCost(materialList.roller * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            rollerPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (lockPrc.length > 0) {
                    if (regex.test(lockPrc)) {
                        let newPrice = parseFloat(lockPrc);
                        if (lockType === 'metal-lock') {
                            setMetalLockPrice(newPrice);
                        }
                        else {
                            setPressLockPrice(newPrice)
                        }
                        
                        accessoriesDeduction += locksCost;
                        accessoriesAddition += materialList.pressLock * newPrice;
                        totalDeduction += locksCost;
                        totalAddition += materialList.pressLock * newPrice;
                        setLocksCost(materialList.pressLock * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            lockPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (netHandlePrc.length > 0) {
                    if (regex.test(netHandlePrc)) {
                        let newPrice = parseFloat(netHandlePrc);
                        if (netHandleType === 'big-net') {
                            setBigNetHandlePrice(newPrice);
                        }
                        else {
                            setSmallNetHandlePrice(newPrice);
                        }
                        
                        accessoriesDeduction += netHandlesCost;
                        accessoriesAddition += materialList.netHandle * newPrice;
                        totalDeduction += netHandlesCost;
                        totalAddition += materialList.netHandle * newPrice;
                        setNetHandlesCost(materialList.netHandle * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            netHandlePrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (fiberPrc.length > 0) {
                    if (regex.test(fiberPrc)) {
                        let newPrice = parseFloat(fiberPrc);
                        if (fiberNetType === 'short') {
                            setShortFiberNetPrice(newPrice);
                        }
                        else {
                            setLongFiberNetPrice(newPrice);
                        }
                        
                        accessoriesDeduction += fiberNetCost;
                        accessoriesAddition += materialList.fiberNet * newPrice;
                        totalDeduction += fiberNetCost;
                        totalAddition += materialList.fiberNet * newPrice;
                        setFiberNetCost(materialList.fiberNet * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            fiberNetPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (gRubPrc.length > 0) {
                    if (regex.test(gRubPrc)) {
                        let newPrice = parseFloat(gRubPrc);
                        setGlazingRubberPrice(newPrice);

                        accessoriesDeduction += glazingRubbersCost;
                        accessoriesAddition += materialList.glazingRubber * newPrice;
                        totalDeduction += glazingRubbersCost;
                        totalAddition += materialList.glazingRubber * newPrice;
                        setGlazingRbbersCost(materialList.glazingRubber * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            glazingRubberPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (nRubPrc.length > 0) {
                    if (regex.test(nRubPrc)) {
                        let newPrice = parseFloat(nRubPrc);
                        setNetRubberPrice(newPrice);

                        accessoriesDeduction += netRubbersCost;
                        accessoriesAddition += materialList.netRubber * newPrice;
                        totalDeduction += netRubbersCost;
                        totalAddition += materialList.netRubber * newPrice;
                        setNetRubbersCost(materialList.netRubber * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            netRubberPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (intScrewPrc.length > 0) {
                    if (regex.test(intScrewPrc)) {
                        let newPrice = parseFloat(intScrewPrc);
                        setInstallationScrewPrice(newPrice);
                        
                        accessoriesDeduction += installScrewsCost;
                        accessoriesAddition += materialList.installScrews * newPrice;
                        totalDeduction += installScrewsCost;
                        totalAddition += materialList.installScrews * newPrice;
                        setInstallScrewsCost(materialList.installScrews * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            installScrewsPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (plugPrc.length > 0) {
                    if (regex.test(plugPrc)) {
                        let newPrice = parseFloat(plugPrc);
                        setWallPlugPrice(newPrice);

                        accessoriesDeduction += wallPlugCost;
                        accessoriesAddition += materialList.wallPlug * newPrice;
                        totalDeduction += wallPlugCost;
                        totalAddition += materialList.wallPlug * newPrice;
                        setWallPlugCost(materialList.wallPlug * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            wallPlugPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }

                setProjectTotalCost(projectTotalCost - totalDeduction + totalAddition);
                setFramesCost(framesCost - frameDeduction + frameAddition);
                setAccessoriesCost(accessoriesCost - accessoriesDeduction + accessoriesAddition);

                setSetPrices(false);
                setFramePrc(''); setLeafPrc(''); setNetInnerPrc(''); setInterlockPrc(''); setLeafDivPrc('');
                setGlassPrc(''); setFCPrc(''); setLCPrc(''); setNCPrc(''); setBrushPrc(''); setRollerPrc('');
                setLockPrc(''); setNetHandlePrc(''); setFiberPrc(''); setGRubPrc('');
                setNRubPrc(''); setIntScrewPrc(''); setPlugPrc('');
            }
            else if (isProjected || isCasement || isHinge) {
                if (lPrc.length > 0) {
                    if (regex.test(lPrc)) {
                        let newPrice = parseFloat(lPrc);
                        if (lType === 'big-l') {
                            if (profileType === 'Italian') {
                                setBigLPrice(newPrice);
                            }
                            else {
                                setEcoBigLPrice(newPrice);
                            }
                        }
                        else {
                            if (profileType === 'Italian') {
                                setLouterPrice(newPrice);
                            }
                            else {
                                setECoLouterPrice(newPrice);
                            }
                        }
                        
                        frameDeduction += LOuterCost;
                        frameAddition += materialList.LOuter * newPrice;
                        totalDeduction += LOuterCost;
                        totalAddition += materialList.LOuter * newPrice;
                        setLouterCost(materialList.LOuter * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            lPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (zPrc.length > 0) {
                    if (regex.test(zPrc)) {
                        let newPrice = parseFloat(zPrc);
                        if (profileType === 'Italian') {
                            setBigZPrice(newPrice);
                        }
                        else {
                            setEcoBigZPrice(newPrice)
                        }
                        
                        frameDeduction += ZCost;
                        frameAddition += materialList.bigZ * newPrice;
                        totalDeduction += ZCost;
                        totalAddition += materialList.bigZ * newPrice;
                        setZCost(materialList.bigZ * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            zPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (tPrc.length > 0) {
                    if (regex.test(tPrc)) {
                        let newPrice = parseFloat(tPrc);
                        if (tType === 'big-t') {
                            if (profileType === 'Italian') {
                                setBigTPrice(newPrice);
                            }
                            else {
                                setEcoBigTPrice(newPrice);
                            }
                        }
                        else {
                            if (profileType === 'Italian') {
                                setSmallTPrice(newPrice);
                            }
                            else {
                                setEcoSmallTPrice(newPrice);
                            }
                        }
                        
                        
                        
                        if (workType === 'Hinge') {
                            frameDeduction += bigTCost;
                            frameAddition += materialList.small_big_T * newPrice;
                            totalDeduction += bigTCost;
                            totalAddition += materialList.small_big_T * newPrice;
                            setBigTCost(materialList.small_big_T * newPrice);
                        }
                        else {
                            frameDeduction += smallTCost;
                            frameAddition += materialList.small_big_T * newPrice;
                            totalDeduction += smallTCost;
                            totalAddition += materialList.small_big_T * newPrice;
                            setTCost(materialList.small_big_T * newPrice);
                        }

                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            tPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (mulPrc.length > 0) {
                    if (regex.test(mulPrc)) {
                        let newPrice = parseFloat(mulPrc);
                        if (profileType === 'Italian') {
                            setMullionPrice(newPrice);
                        }
                        else {
                            setEcoMullionPrice(newPrice)
                        }
                        
                        frameDeduction += mullionCost;
                        frameAddition += materialList.mollium * newPrice;
                        totalDeduction += mullionCost;
                        totalAddition += materialList.mollium * newPrice;
                        setMullionCost(materialList.mollium * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            divisionPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (botPrc.length > 0) {
                    if (regex.test(botPrc)) {
                        let newPrice = parseFloat(botPrc);
                        if (profileType === 'Italian') {
                            setBottomPrice(newPrice);
                        }
                        else {
                            setEcoBottomPrice(newPrice)
                        }
                        
                        frameDeduction += bottomCost;
                        frameAddition += materialList.bottom * newPrice;
                        totalDeduction += bottomCost;
                        totalAddition += materialList.bottom * newPrice;
                        setbottomCost(materialList.bottom * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            bottomPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (hingeAdapPrc.length > 0) {
                    if (regex.test(hingeAdapPrc)) {
                        let newPrice = parseFloat(hingeAdapPrc);
                        setHingeAdaptorPrice(newPrice);
                        
                        frameDeduction += adaptorCost;
                        frameAddition += materialList.adaptor * newPrice;
                        totalDeduction += adaptorCost;
                        totalAddition += materialList.adaptor * newPrice;
                        setAdaptorCost(materialList.adaptor * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            adatorPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (BeadinPrc.length > 0) {
                    if (regex.test(BeadinPrc)) {
                        let newPrice = parseFloat(BeadinPrc);
                        if (profileType === 'Italian') {
                            setBeadingPrice(newPrice);
                        }
                        else {
                            setEcoBeadingPrice(newPrice)
                        }
                        
                        frameDeduction += beadingCost;
                        frameAddition += materialList.beading * newPrice;
                        totalDeduction += beadingCost;
                        totalAddition += materialList.beading * newPrice;
                        setBeadingCost(materialList.beading * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            beadingPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (glassPrc.length > 0) {
                    if (regex.test(glassPrc)) {
                        let newPrice = parseFloat(glassPrc);
                        setGlassPrice(newPrice);
                       
                        totalDeduction += glassTotalCost;
                        totalAddition += materialList.glassSheet * newPrice;
                        setGlassTotalCost(materialList.glassSheet * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            glassPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (loutCornerPrc.length > 0) {
                    if (regex.test(loutCornerPrc)) {
                        let newPrice = parseFloat(loutCornerPrc);
                        setLouterCornerPrice(newPrice);
                        
                        accessoriesDeduction += louterCornersCost;
                        accessoriesAddition += materialList.louterCorner * newPrice;
                        totalDeduction += louterCornersCost;
                        totalAddition += materialList.louterCorner * newPrice;

                        setLouterCornersCost(materialList.louterCorner * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            louterCornerPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (bigLCornerPrc.length > 0) {
                    if (regex.test(bigLCornerPrc)) {
                        let newPrice = parseFloat(bigLCornerPrc);
                        setBigZCornerPrice(newPrice);
                        
                        
                        
                        if (isHinge) {
                            accessoriesDeduction += bigZornersCost;
                            accessoriesAddition += materialList.bigZCorner * newPrice;
                            totalDeduction += bigZornersCost;
                            totalAddition += materialList.bigZCorner * newPrice;
                            setBigZCornersCost(materialList.bigZCorner * newPrice);
                        }
                        else {
                            accessoriesDeduction += bigZornersCost;
                            accessoriesAddition += materialList.bigLCorner * newPrice;
                            totalDeduction += bigZornersCost;
                            totalAddition += materialList.bigLCorner * newPrice;
                            setBigZCornersCost(materialList.bigLCorner * newPrice);
                        }

                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            bigZCornerPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (hingePrc.length > 0) {
                    if (regex.test(hingePrc)) {
                        let newPrice = parseFloat(hingePrc);
                        
                        if (workType === 'Projected') {
                            setProjectedHingesPrice(newPrice);
                        }
                        else {
                            
                            if (profileType === 'Italian') {
                                setHingesPrice(newPrice);
                            }
                            else {
                                setEcoHingesPrice(newPrice)
                            }
                        }

                        accessoriesDeduction += hingesCost;
                        accessoriesAddition += materialList.hinges * newPrice;
                        totalDeduction += hingesCost;
                        totalAddition += materialList.hinges * newPrice;
                        setHingesCost(materialList.hinges * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            hingesPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (hingeKeyPrc.length > 0) {
                    if (regex.test(hingeKeyPrc)) {
                        let newPrice = parseFloat(hingeKeyPrc);
                        setHingeDoorKeyPrice(newPrice);
                        
                        accessoriesDeduction += keysCost;
                        accessoriesAddition += materialList.key * newPrice;
                        totalDeduction += keysCost;
                        totalAddition += materialList.key * newPrice;
                        setKeysCost(materialList.key * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            doorKeyPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (hingeHandlePrc.length > 0) {
                    if (regex.test(hingeHandlePrc)) {
                        let newPrice = parseFloat(hingeHandlePrc);
                        setHingeHandlePrice(newPrice);
                        
                        accessoriesDeduction += handlesCost;
                        accessoriesAddition += materialList.handles * newPrice;
                        totalDeduction += handlesCost;
                        totalAddition += materialList.handles * newPrice;
                        setHandlesCost(materialList.handles * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            handlePrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (towerBoltPrc.length > 0) {
                    if (regex.test(towerBoltPrc)) {
                        let newPrice = parseFloat(towerBoltPrc);
                        setTowerBoltPrice(newPrice);
                        
                        accessoriesDeduction += towerBoltCost;
                        accessoriesAddition += materialList.towerBolt * newPrice;
                        totalDeduction += towerBoltCost;
                        totalAddition += materialList.towerBolt * newPrice;
                        setTowerBoltCost(materialList.towerBolt * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            towerBoltPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (projHandlePrc.length > 0) {
                    if (regex.test(projHandlePrc)) {
                        let newPrice = parseFloat(projHandlePrc);
                        setProjectedHandlePrice(newPrice);
                        
                        accessoriesDeduction += projectedHandleCost;
                        accessoriesAddition += materialList.handles * newPrice;
                        totalDeduction += projectedHandleCost;
                        totalAddition += materialList.handles * newPrice;
                        setProjectedHandleCost(materialList.handles * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            handlePrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (casementStopPrc.length > 0) {
                    if (regex.test(casementStopPrc)) {
                        let newPrice = parseFloat(casementStopPrc);
                        setCasementStopperPrice(newPrice);
                        
                        accessoriesDeduction += casementStopperCost;
                        accessoriesAddition += materialList.casementStopper * newPrice;
                        totalDeduction += casementStopperCost;
                        totalAddition += materialList.casementStopper * newPrice;
                        setCasementStopperCost(materialList.casementStopper * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            casementStoperPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (frameRubPrc.length > 0) {
                    if (regex.test(frameRubPrc)) {
                        let newPrice = parseFloat(frameRubPrc);
                        setFrameRubberPrice(newPrice);
                        
                        accessoriesDeduction += frameRubberCost;
                        accessoriesAddition += materialList.frameRubber * newPrice;
                        totalDeduction += frameRubberCost;
                        totalAddition += materialList.frameRubber * newPrice;
                        setFrameRubberCost(materialList.frameRubber * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            frameRubberPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (beadingRubPrc.length > 0) {
                    if (regex.test(beadingRubPrc)) {
                        let newPrice = parseFloat(beadingRubPrc);
                        setBeadingRubberPrice(newPrice);
                       
                        accessoriesDeduction += beadingRubberCost;
                        accessoriesAddition += materialList.beadingRubber * newPrice;
                        totalDeduction += beadingRubberCost;
                        totalAddition += materialList.beadingRubber * newPrice;
                        setBeadingRubberCost(materialList.beadingRubber * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            beadingRubberPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (doorBrushPrc.length > 0) {
                    if (regex.test(doorBrushPrc)) {
                        let newPrice = parseFloat(doorBrushPrc);
                        setDoorBrushPrice(newPrice);
                        
                        accessoriesDeduction += doorBrushCost;
                        accessoriesAddition += materialList.doorBrush * newPrice;
                        totalDeduction += doorBrushCost;
                        totalAddition += materialList.doorBrush * newPrice;
                        setDoorBrushCost(materialList.doorBrush * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            doorBrushPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (intScrewPrc.length > 0) {
                    if (regex.test(intScrewPrc)) {
                        let newPrice = parseFloat(intScrewPrc);
                        setInstallationScrewPrice(newPrice);
                        
                        accessoriesDeduction += installScrewsCost;
                        accessoriesAddition += materialList.installScrews * newPrice;
                        totalDeduction += installScrewsCost;
                        totalAddition += materialList.installScrews * newPrice;
                        setInstallScrewsCost(materialList.installScrews * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            installScrewsPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (plugPrc.length > 0) {
                    if (regex.test(plugPrc)) {
                        let newPrice = parseFloat(plugPrc);
                        setWallPlugPrice(newPrice);
                        
                        accessoriesDeduction += wallPlugCost;
                        accessoriesAddition += materialList.wallPlug * newPrice;
                        totalDeduction += wallPlugCost;
                        totalAddition += materialList.wallPlug * newPrice;
                        setWallPlugCost(materialList.wallPlug * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            wallPlugPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }

                setProjectTotalCost(projectTotalCost - totalDeduction + totalAddition);
                setFramesCost(framesCost - frameDeduction + frameAddition);
                setAccessoriesCost(accessoriesCost - accessoriesDeduction + accessoriesAddition);

                setLPrice(''); setTPrice(''); setBeadinPrc(''); setLoutCornerPrc(''); setBotPrice(''); setMulPrice(''); setGlassPrc('');
                setHingePrc(''); setProjHandlePrc(''); setCasementStopPrc(''); setFrameRubPrc(''); setHingeHandlePrc(''); setTowerBoltPrc('');
                setHingeKeyPrc(''); setBeadingRubPrc(''); setDoorBrushPrc(''); setIntScrewPrc(''); setPlugPrc(''); setBigLCornerPrc('');
                setSetPrices(false);
            }
            else if (isSwing) {
                if (lPrc.length > 0) {
                    if (regex.test(lPrc)) {
                        let newPrice = parseFloat(lPrc);
                        setBigLPrice(newPrice);
                        frameDeduction += bigLCost;
                        frameAddition += materialList.bigL * newPrice;
                        totalDeduction += bigLCost;
                        totalAddition += materialList.bigL * newPrice;
                        setBigLCost(materialList.bigL * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            lPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (tPrc.length > 0) {
                    if (regex.test(tPrc)) {
                        let newPrice = parseFloat(tPrc);
                        setBigTPrice(newPrice);

                        frameDeduction += bigTCost;
                        frameAddition += materialList.bigT * newPrice;
                        totalDeduction += bigTCost;
                        totalAddition += materialList.bigT * newPrice;
                        setBigTCost(materialList.bigT * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            tPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (mulPrc.length > 0) {
                    if (regex.test(mulPrc)) {
                        let newPrice = parseFloat(mulPrc);
                        setMullionPrice(newPrice);
                        
                        frameDeduction += mullionCost;
                        frameAddition += materialList.mollium * newPrice;
                        totalDeduction += mullionCost;
                        totalAddition += materialList.mollium * newPrice;
                        setMullionCost(materialList.mollium * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            divisionPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (botPrc.length > 0) {
                    if (regex.test(botPrc)) {
                        let newPrice = parseFloat(botPrc);
                        setBottomPrice(newPrice);
                        
                        frameDeduction += bottomCost;
                        frameAddition += materialList.bottom * newPrice;
                        totalDeduction += bottomCost;
                        totalAddition += materialList.bottom * newPrice;
                        setbottomCost(materialList.bottom * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            bottomPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (brushAdpPrc.length > 0) {
                    if (regex.test(brushAdpPrc)) {
                        let newPrice = parseFloat(brushAdpPrc);
                        setBrushAdaptorPrice(newPrice);
                        
                        frameDeduction += adaptorCost;
                        frameAddition += materialList.brushAdaptor * newPrice;
                        totalDeduction += adaptorCost;
                        totalAddition += materialList.brushAdaptor * newPrice;
                        setAdaptorCost(materialList.brushAdaptor * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            brushAdaptorPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (BeadinPrc.length > 0) {
                    if (regex.test(BeadinPrc)) {
                        let newPrice = parseFloat(BeadinPrc);
                        setBeadingPrice(newPrice);
                        
                        frameDeduction += beadingCost;
                        frameAddition += materialList.beading * newPrice;
                        totalDeduction += beadingCost;
                        totalAddition += materialList.beading * newPrice;
                        setBeadingCost(materialList.beading * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            beadingPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (glassPrc.length > 0) {
                    if (regex.test(glassPrc)) {
                        let newPrice = parseFloat(glassPrc);
                        setGlassPrice(newPrice);
                       
                        totalDeduction += glassTotalCost;
                        totalAddition += materialList.glassSheet * newPrice;
                        setGlassTotalCost(materialList.glassSheet * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            glassPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (bigLCornerPrc.length > 0) {
                    if (regex.test(bigLCornerPrc)) {
                        let newPrice = parseFloat(bigLCornerPrc);
                        setBigZCornerPrice(newPrice);
                        
                        accessoriesDeduction += bigZornersCost;
                        accessoriesAddition += materialList.corners * newPrice;
                        totalDeduction += bigZornersCost;
                        totalAddition += materialList.corners * newPrice;
                        setBigZCornersCost(materialList.corners * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            bigZCornerPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (adapBrushPrc.length > 0) {
                    if (regex.test(adapBrushPrc)) {
                        let newPrice = parseFloat(adapBrushPrc);
                        setAdaptorBrushPrice(newPrice);
                        
                        accessoriesDeduction += adaptorBrushCost;
                        accessoriesAddition += materialList.adaptorBrush * newPrice;
                        totalDeduction += adaptorBrushCost;
                        totalAddition += materialList.adaptorBrush * newPrice;
                        setAdaptorBrushCost(materialList.adaptorBrush * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            adaptorBrushPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (downCloserPrc.length > 0) {
                    if (regex.test(downCloserPrc)) {
                        let newPrice = parseFloat(downCloserPrc);
                        setDownCloserPrice(newPrice);
                        
                        accessoriesDeduction += downCloserCost;
                        accessoriesAddition += materialList.downCloser * newPrice;
                        totalDeduction += downCloserCost;
                        totalAddition += materialList.downCloser * newPrice;
                        setDownCloserCost(materialList.downCloser * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            downCloserPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (hingeKeyPrc.length > 0) {
                    if (regex.test(hingeKeyPrc)) {
                        let newPrice = parseFloat(hingeKeyPrc);
                        setHingeDoorKeyPrice(newPrice);
                        
                        accessoriesDeduction += keysCost;
                        accessoriesAddition += materialList.key * newPrice;
                        totalDeduction += keysCost;
                        totalAddition += materialList.key * newPrice;
                        setKeysCost(materialList.key * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            doorKeyPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (pipeHandlePrc.length > 0) {
                    if (regex.test(pipeHandlePrc)) {
                        let newPrice = parseFloat(pipeHandlePrc);
                        setPipeHandlePrice(newPrice);
                        
                        accessoriesDeduction += handlesCost;
                        accessoriesAddition += materialList.handle * newPrice;
                        totalDeduction += handlesCost;
                        totalAddition += materialList.handle * newPrice;
                        setHandlesCost(materialList.handle * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            handlePrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (towerBoltPrc.length > 0) {
                    if (regex.test(towerBoltPrc)) {
                        let newPrice = parseFloat(towerBoltPrc);
                        setTowerBoltPrice(newPrice);
                        
                        accessoriesDeduction += towerBoltCost;
                        accessoriesAddition += materialList.towerBolt * newPrice;
                        totalDeduction += towerBoltCost;
                        totalAddition += materialList.towerBolt * newPrice;
                        setTowerBoltCost(materialList.towerBolt * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            towerBoltPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (frameRubPrc.length > 0) {
                    if (regex.test(frameRubPrc)) {
                        let newPrice = parseFloat(frameRubPrc);
                        setFrameRubberPrice(newPrice);
                        
                        accessoriesDeduction += frameRubberCost;
                        accessoriesAddition += materialList.frameRubber * newPrice;
                        totalDeduction += frameRubberCost;
                        totalAddition += materialList.frameRubber * newPrice;
                        setFrameRubberCost(materialList.frameRubber * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            frameRubberPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (beadingRubPrc.length > 0) {
                    if (regex.test(beadingRubPrc)) {
                        let newPrice = parseFloat(beadingRubPrc);
                        setBeadingRubberPrice(newPrice);
                       
                        accessoriesDeduction += beadingRubberCost;
                        accessoriesAddition += materialList.beadingRubber * newPrice;
                        totalDeduction += beadingRubberCost;
                        totalAddition += materialList.beadingRubber * newPrice;
                        setBeadingRubberCost(materialList.beadingRubber * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            beadingRubberPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (intScrewPrc.length > 0) {
                    if (regex.test(intScrewPrc)) {
                        let newPrice = parseFloat(intScrewPrc);
                        setInstallationScrewPrice(newPrice);
                        
                        accessoriesDeduction += installScrewsCost;
                        accessoriesAddition += materialList.installScrews * newPrice;
                        totalDeduction += installScrewsCost;
                        totalAddition += materialList.installScrews * newPrice;
                        setInstallScrewsCost(materialList.installScrews * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            installScrewsPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (plugPrc.length > 0) {
                    if (regex.test(plugPrc)) {
                        let newPrice = parseFloat(plugPrc);
                        setWallPlugPrice(newPrice);
                        
                        accessoriesDeduction += wallPlugCost;
                        accessoriesAddition += materialList.wallPlug * newPrice;
                        totalDeduction += wallPlugCost;
                        totalAddition += materialList.wallPlug * newPrice;
                        setWallPlugCost(materialList.wallPlug * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            wallPlugPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }

                setProjectTotalCost(projectTotalCost - totalDeduction + totalAddition);
                setFramesCost(framesCost - frameDeduction + frameAddition);
                setAccessoriesCost(accessoriesCost - accessoriesDeduction + accessoriesAddition);

                setLPrice(''); setTPrice(''); setBeadinPrc(''); setLoutCornerPrc(''); setBotPrice(''); setMulPrice(''); setBrushAdpPrice('');
                setGlassPrc(''); setBigLCornerPrc(''); setAdapBrushPrc(''); setDownCloserPrc(''); setTowerBoltPrc(); setFrameRubPrc(''); setHingeHandlePrc('');
                setHingeKeyPrc(''); setPipeHandlePrc(''); setBeadingRubPrc(''); setDoorBrushPrc(''); setIntScrewPrc(''); setPlugPrc('');
                setSetPrices(false);
            }
            else if (isFixed) {
                if (lPrc.length > 0) {
                    if (regex.test(lPrc)) {
                        let newPrice = parseFloat(lPrc);
                        if (lType === 'big-l') {
                            if (profileType === 'Italian') {
                                setBigLPrice(newPrice);
                            }
                            else {
                                setEcoBigLPrice(newPrice);
                            }
                        }
                        else {
                            if (profileType === 'Italian') {
                                setLouterPrice(newPrice);
                            }
                            else {
                                setECoLouterPrice(newPrice);
                            }
                        }
                        
                        frameDeduction += LOuterCost;
                        frameAddition += materialList.LOuter * newPrice;
                        totalDeduction += LOuterCost;
                        totalAddition += materialList.LOuter * newPrice;
                        setLouterCost(materialList.LOuter * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            lPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (tPrc.length > 0) {
                    if (regex.test(tPrc)) {
                        let newPrice = parseFloat(tPrc);
                        if (tType === 'big-t') {
                            if (profileType === 'Italian') {
                                setBigTPrice(newPrice);
                            }
                            else {
                                setEcoBigTPrice(newPrice);
                            }
                        }
                        else {
                            if (profileType === 'Italian') {
                                setSmallTPrice(newPrice);
                            }
                            else {
                                setEcoSmallTPrice(newPrice);
                            }
                        }
                        
                        frameDeduction += smallTCost;
                        frameAddition += materialList.small_big_T * newPrice;
                        totalDeduction += smallTCost;
                        totalAddition += materialList.small_big_T * newPrice;
                        setTCost(materialList.small_big_T * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            tPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                // if (botPrc.length > 0) {
                //     if (regex.test(botPrc)) {
                //         let newPrice = parseFloat(botPrc);
                //         if (profileType === 'Italian') {
                //             setBottomPrice(newPrice);
                //         }
                //         else {
                //             setEcoBottomPrice(newPrice)
                //         }
                        
                //         frameDeduction += bottomCost;
                //         frameAddition += materialList.bottom * newPrice;
                //         totalDeduction += bottomCost;
                //         totalAddition += materialList.bottom * newPrice;
                //         setbottomCost(materialList.bottom * newPrice);
                //         setError(false);
                //     }
                //     else {
                //         setError(true);
                //         return;
                //     }
                // }
                if (BeadinPrc.length > 0) {
                    if (regex.test(BeadinPrc)) {
                        let newPrice = parseFloat(BeadinPrc);
                        if (profileType === 'Italian') {
                            setBeadingPrice(newPrice);
                        }
                        else {
                            setEcoBeadingPrice(newPrice)
                        }
                        
                        frameDeduction += beadingCost;
                        frameAddition += materialList.beading * newPrice;
                        totalDeduction += beadingCost;
                        totalAddition += materialList.beading * newPrice;
                        setBeadingCost(materialList.beading * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            beadingPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (glassPrc.length > 0) {
                    if (regex.test(glassPrc)) {
                        let newPrice = parseFloat(glassPrc);
                        setGlassPrice(newPrice);
                       
                        totalDeduction += glassTotalCost;
                        totalAddition += materialList.glassSheet * newPrice;
                        setGlassTotalCost(materialList.glassSheet * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            glassPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (loutCornerPrc.length > 0) {
                    if (regex.test(loutCornerPrc)) {
                        let newPrice = parseFloat(loutCornerPrc);
                        
                        if (profileType === 'Italian' && lType === 'big-l') {
                            setBigZCornerPrice(newPrice);
                            accessoriesDeduction += bigZornersCost;
                            accessoriesAddition += materialList.corners * newPrice;
                            totalDeduction += bigZornersCost;
                            totalAddition += materialList.corners * newPrice;
                            setBigZCornersCost(materialList.corners * newPrice);
                        }
                        else {
                            setLouterCornerPrice(newPrice);
                            accessoriesDeduction += louterCornersCost;
                            accessoriesAddition += materialList.corners * newPrice;
                            totalDeduction += louterCornersCost;
                            totalAddition += materialList.corners * newPrice;
                            setLouterCornersCost(materialList.corners * newPrice);
                        }
                        
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            louterCornerPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (frameRubPrc.length > 0) {
                    if (regex.test(frameRubPrc)) {
                        let newPrice = parseFloat(frameRubPrc);
                        setFrameRubberPrice(newPrice);
                        
                        accessoriesDeduction += frameRubberCost;
                        accessoriesAddition += materialList.frameRubber * newPrice;
                        totalDeduction += frameRubberCost;
                        totalAddition += materialList.frameRubber * newPrice;
                        setFrameRubberCost(materialList.frameRubber * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            frameRubberPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (beadingRubPrc.length > 0) {
                    if (regex.test(beadingRubPrc)) {
                        let newPrice = parseFloat(beadingRubPrc);
                        setBeadingRubberPrice(newPrice);
                       
                        accessoriesDeduction += beadingRubberCost;
                        accessoriesAddition += materialList.beadingRubber * newPrice;
                        totalDeduction += beadingRubberCost;
                        totalAddition += materialList.beadingRubber * newPrice;
                        setBeadingRubberCost(materialList.beadingRubber * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            beadingRubberPrc: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (intScrewPrc.length > 0) {
                    if (regex.test(intScrewPrc)) {
                        let newPrice = parseFloat(intScrewPrc);
                        setInstallationScrewPrice(newPrice);
                        
                        accessoriesDeduction += installScrewsCost;
                        accessoriesAddition += materialList.installScrews * newPrice;
                        totalDeduction += installScrewsCost;
                        totalAddition += materialList.installScrews * newPrice;
                        setInstallScrewsCost(materialList.installScrews * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            installScrewsPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }
                if (plugPrc.length > 0) {
                    if (regex.test(plugPrc)) {
                        let newPrice = parseFloat(plugPrc);
                        setWallPlugPrice(newPrice);
                        
                        accessoriesDeduction += wallPlugCost;
                        accessoriesAddition += materialList.wallPlug * newPrice;
                        totalDeduction += wallPlugCost;
                        totalAddition += materialList.wallPlug * newPrice;
                        setWallPlugCost(materialList.wallPlug * newPrice);
                        setError(false);

                        setSelfPriceList(prevState => ({
                            ...prevState,
                            wallPlugPrice: newPrice
                        }));
                    }
                    else {
                        setError(true);
                        return;
                    }
                }

                setProjectTotalCost(projectTotalCost - totalDeduction + totalAddition);
                setFramesCost(framesCost - frameDeduction + frameAddition);
                setAccessoriesCost(accessoriesCost - accessoriesDeduction + accessoriesAddition);

                setLPrice(''); setTPrice(''); setBeadinPrc(''); setLoutCornerPrc(''); setGlassPrc('');
                setFrameRubPrc(''); setHingeHandlePrc(''); setTowerBoltPrc('');
                setBeadingRubPrc(''); setIntScrewPrc(''); setPlugPrc(''); 
                setSetPrices(false);
            }
            
        }

        return (
            <View style={[{flex: 1, position: 'absolute', display: visible ? 'flex' : 'none', }]}>
                <Modal transparent visible={visible}>
                    <View style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)'
                    }}>
                        <View style={styles.setPricesHeader}>
                            <Text style={styles.txtHeader}>Set Prices</Text>
                            <View style={styles.closeCon}>
                                <Pressable style={({pressed}) => [
                                    styles.btnClose,
                                    pressed && {opacity: 0.5}
                                ]}
                                onPress={() => {
                                    setSetPrices(false);
                                }}>
                                    <Ionicons name='close-outline' size={22} color='#fff' />
                                </Pressable >
                            </View>
                        </View>
                        <ScrollView style={{flex:1, width: '100%', paddingLeft:20,}}
                         keyboardShouldPersistTaps="always"
                        >
                            <View style={{display: isSliding ? 'flex' : 'none'}}>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>
                                        {
                                            profileType == 'Skit-60' && frameType == 'round-frame' ? 'Round Frame' : (
                                                profileType == 'Skit-60' && frameType == 'small-wall-frame' ? 'Small Wall Frame' : (
                                                    profileType == 'Skit-60' && frameType == 'big-wall-frame' ? 'Big Wall Frame' : (
                                                        profileType == 'KS-50' && frameType == 'round-frame' ? 'KS-50 Round Frame' : (
                                                            profileType == 'KS-50' && frameType == 'wall-frame' ? 'KS-50 Wall Frame' :(
                                                                profileType == 'Trialco' && frameType == 'round-frame' ? 'Trialco Round Frame' : 'Trialco Wall Frame'
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        cursorColor={cursorColor}
                                        keyboardType="numeric"
                                        placeholder={
                                        profileType == 'Skit-60' && frameType == 'round-frame' ? JSON.stringify(roundFramePrice) : (
                                            profileType == 'Skit-60' && frameType == 'small-wall-frame' ? JSON.stringify(smallWallFramePrice) : (
                                                profileType == 'Skit-60' && frameType == 'big-wall-frame' ? JSON.stringify(bigWallFramePrice) : (
                                                    profileType == 'KS-50' && frameType == 'round-frame' ? JSON.stringify(ks50RoundFramePrice) : (
                                                        profileType == 'KS-50' && frameType == 'wall-frame' ? JSON.stringify(ks50WallFramePrice) :(
                                                            profileType == 'Trialco' && frameType == 'round-frame' ? JSON.stringify(trialcoRoundFramePrice) : JSON.stringify(trialcoWallFramePrice)
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                        }
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={framePrc}
                                        onChangeText={setFramePrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>
                                        {
                                            profileType === 'Skit-60' && leafType == 'flat-leaf' ? 'Flat Leaf' : (
                                                profileType === 'Skit-60' && leafType == 'round-leaf' ? 'Round Leaf' : (
                                                    profileType === 'KS-50' ? 'KS-50 Leaf' : 'Trialco Leaf'
                                                )
                                            )
                                        }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        cursorColor={cursorColor}
                                        keyboardType="numeric"
                                        placeholder={
                                        profileType === 'Skit-60' && leafType == 'flat-leaf' ? JSON.stringify(flatLeafPrice) : (
                                            profileType === 'Skit-60' && leafType == 'round-leaf' ? JSON.stringify(roundLeafPrice) : (
                                                profileType === 'KS-50' ? JSON.stringify(ks50LeafPrice) : JSON.stringify(trialcoLeafPrice)
                                            )
                                        )
                                        }
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={leafPrc}
                                        onChangeText={setLeafPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>
                                        {netType == 'big-net' ? 'Big Net Inner' : 'Small Net Inner'}
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        cursorColor={cursorColor}
                                        keyboardType="numeric"
                                        placeholder={netType == 'big-net' ? JSON.stringify(bigNetLeafPrice) : JSON.stringify(smallNetLeafPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={netInnerPrc}
                                        onChangeText={setNetInnerPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>
                                    {profileType == 'Skit-60' ? 'Interlock' : (profileType == 'KS-50' ? 'KS-50 Interlock' : 'Trialco Interlock')}
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        cursorColor={cursorColor}
                                        keyboardType="numeric"
                                        placeholder={
                                        profileType == 'Skit-60' ? JSON.stringify(interlockPrice) : (profileType == 'KS-50' ? JSON.stringify(ks50InterlockPrice) : JSON.stringify(trialcoInterlockPrice))
                                        }
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={interlockPrc}
                                        onChangeText={setInterlockPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: materialList.leafDivision > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>Leaf Division</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(leafDivisionPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={leafDivPrc}
                                        onChangeText={setLeafDivPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow]}>
                                    <Text style={styles.priceLabel}>
                                    {
                                        glassColor === 'tinted' ? 'Tinted Glass' : (
                                            glassColor === 'bronze-ref' ? 'Bronze Reflective Glass' : (
                                                glassColor === 'dark' ? 'Dark Glass' : (
                                                    glassColor === 'dark-ref' ? 'Dark Glass' : (
                                                        glassColor === 'blue-ref' ? 'Blue Reflective Glass' : 'Plain Glass'
                                                    ) 
                                                )
                                            )
                                        )
                                    }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(glassPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={glassPrc}
                                        onChangeText={setGlassPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Frame Corner</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(frameCornerPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={fcPrc}
                                        onChangeText={setFCPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Leaf Corner</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(leafCornerPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={lcPrc}
                                        onChangeText={setLCPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Net Corner</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(netCornerPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={ncPrc}
                                        onChangeText={setNCPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Brush</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(brushPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={brushshPrc}
                                        onChangeText={setBrushPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>
                                    {profileType == 'Skit-60' ? 'Roller' : (profileType == 'KS-50' ? 'KS-50 Roller' : 'Trialco Roller')}
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={profileType == 'Skit-60' ? JSON.stringify(rollerPrice) : (profileType == 'KS-50' ? JSON.stringify(heavyDutyRollerPrice) : JSON.stringify(trialcoRollerPrice))}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={rollerPrc}
                                        onChangeText={setRollerPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>
                                        {lockType === 'metal-lock' ? 'Metal Lock' : 'Press Lock'}
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={lockType === 'metal-lock' ? JSON.stringify(metalLockPrice)  : JSON.stringify(pressLockPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={lockPrc}
                                        onChangeText={setLockPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>
                                        {netHandleType === 'big-net' ? 'Big Net Handle' : 'Small Net Handle'}
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={netHandleType === 'big-net' ? JSON.stringify(bigNetHandlePrice) : JSON.stringify(smallNetHandlePrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={netHandlePrc}
                                        onChangeText={setNetHandlePrc}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: profileType === 'Trialco' ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>Trialco Kit</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(trialcoKitPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={kitPrc}
                                        onChangeText={setkitPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>
                                        {fiberNetType === 'short' ? 'Short Fiber Net' : 'Long Fiber Net'}
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={fiberNetType === 'short' ? JSON.stringify(shortFiberNetPrice) : JSON.stringify(longFiberNetPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={fiberPrc}
                                        onChangeText={setFiberPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Glazing Rubber</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(glazingRubberPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={gRubPrc}
                                        onChangeText={setGRubPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Net Rubber</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(netRubberPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={nRubPrc}
                                        onChangeText={setNRubPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Install Screws</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(installScrewsPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={intScrewPrc}
                                        onChangeText={setIntScrewPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Wall Plug</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(wallPlugsPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={plugPrc}
                                        onChangeText={setPlugPrc}
                                    />
                                </View>
                                {/* </View> */}
                            </View>
                            <View style={{display: isProjected || isCasement || isHinge ? 'flex' : 'none'}}>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>
                                        {
                                            profileType === 'Italian' && lType === 'small-l' ? 'Small L' : (
                                                profileType === 'Italian' && lType === 'big-l' ? 'Big L' : (
                                                    profileType === 'Eco' && lType === 'small-l' ? 'Eco Small L' : 'Eco Big L'
                                                )
                                            )
                                        }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={
                                            
                                            profileType === 'Italian' && lType === 'small-l' ? JSON.stringify(louterPrice) : (
                                                profileType === 'Italian' && lType === 'big-l' ? JSON.stringify(bigLPrice) : (
                                                    profileType === 'Eco' && lType === 'small-l' ? JSON.stringify(ecoLouterPrice) : 
                                                    JSON.stringify(ecoBigLPrice)
                                                )
                                            )
                                        }
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={lPrc}
                                        onChangeText={setLPrice}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: isHinge && materialList.bigZ > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>
                                    {
                                        profileType === 'Italian' ? 'Big Z' : 'Eco Big Z'
                                    }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={
                                            profileType === 'Italian' ? JSON.stringify(bigZPrice) : JSON.stringify(ecoBigZPrice)
                                        }
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={zPrc}
                                        onChangeText={setZPrice}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: materialList.small_big_T > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>
                                    {
                                        profileType === 'Italian' && tType === 'small-t' ? 'Small T' : (
                                            profileType === 'Italian' && tType === 'big-t' ? 'Big T' : (
                                                profileType === 'Eco' && tType === 'small-t' ? 'Eco Small T' : 'Eco Big T'
                                            )
                                        )
                                    }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={
                                            profileType === 'Italian' && tType === 'small-t' ? JSON.stringify(smallTPrice) : (
                                                profileType === 'Italian' && tType === 'big-t' ? JSON.stringify(bigTPrice) : (
                                                    profileType === 'Eco' && tType === 'small-t' ? JSON.stringify(ecoSmallTPrice) : 
                                                    JSON.stringify(ecoBigTPrice)
                                                )
                                            )
                                        }
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={tPrc}
                                        onChangeText={setTPrice}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: isHinge && materialList.mollium > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>
                                    {
                                        profileType === 'Italian' ? 'Mullion' : 'Eco Mullion'
                                    }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={
                                            profileType === 'Italian' ? JSON.stringify(mullionPrice) : JSON.stringify(ecoMullionPrice)
                                        }
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={mulPrc}
                                        onChangeText={setMulPrice}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: isHinge && materialList.bottom > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>
                                    {
                                        profileType === 'Italian' ? 'Bottom' : 'Eco Bottom'
                                    }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={
                                            profileType === 'Italian' ? JSON.stringify(bottomPrice) : JSON.stringify(ecoBottomPrice)
                                        }
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={botPrc}
                                        onChangeText={setBotPrice}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>{profileType === 'Italian' ? 'Beading' : 'Eco Beading'}</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={profileType === 'Italian' ? JSON.stringify(beadingPrice) : JSON.stringify(ecoBeadingPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={BeadinPrc}
                                        onChangeText={setBeadinPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: isHinge && materialList.adaptor > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>Door Adaptor</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(hingeAdaptorPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={hingeAdapPrc}
                                        onChangeText={setHingeAdapPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow]}>
                                    <Text style={styles.priceLabel}>
                                    {
                                        glassColor === 'tinted' ? 'Tinted Glass' : (
                                            glassColor === 'bronze-ref' ? 'Bronze Reflective Glass' : (
                                                glassColor === 'dark' ? 'Dark Glass' : (
                                                    glassColor === 'dark-ref' ? 'Dark Glass' : (
                                                        glassColor === 'blue-ref' ? 'Blue Reflective Glass' : 'Plain Glass'
                                                    ) 
                                                )
                                            )
                                        )
                                    }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(glassPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={glassPrc}
                                        onChangeText={setGlassPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: materialList.louterCorner > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>Louter Corner</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(louterCornerPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={loutCornerPrc}
                                        onChangeText={setLoutCornerPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: materialList.bigLCorner > 0 ||  materialList.bigZCorner > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>{isHinge ? 'Big Z Corner' : 'Big L Corner'}</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(bigZCornerPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={bigLCornerPrc}
                                        onChangeText={setBigLCornerPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>
                                        {
                                            workType ==='Projected' ? 'Projected Hinges' : (
                                                profileType === 'Italian' ? 'Hinges' : 'Eco Hinges'
                                            )
                                        }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={workType ==='Projected' ? JSON.stringify(projectedHingesPrice) : (
                                            workType === 'Casement' && profileType === 'Italian' ?
                                            JSON.stringify(hingesPrice) : JSON.stringify(ecoHingesPrice)
                                        )}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={hingePrc}
                                        onChangeText={setHingePrc}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: isHinge ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>Hinge Door Key</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(hingeDoorKeyPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={hingeKeyPrc}
                                        onChangeText={setHingeKeyPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: isHinge ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>Hinge Handle</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(hingeHandlePrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={hingeHandlePrc}
                                        onChangeText={setHingeHandlePrc}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: isHinge ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>Tower Bolt</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(towerBoltPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={towerBoltPrc}
                                        onChangeText={setTowerBoltPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: isProjected || isCasement ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>{workType === 'Projected' ? 'Projected Handle' : 'Casement Handle'}</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(projectedHandlePrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={projHandlePrc}
                                        onChangeText={setProjHandlePrc}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: workType === 'Casement' ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>Casement Stopper</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(casementStopperPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={casementStopPrc}
                                        onChangeText={setCasementStopPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Frame Rubber</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(frameRubberPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={frameRubPrc}
                                        onChangeText={setFrameRubPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Beading Rubber</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(beadingRubberPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={beadingRubPrc}
                                        onChangeText={setBeadingRubPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Door Brush</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(doorBrushPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={doorBrushPrc}
                                        onChangeText={setDoorBrushPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Install Screws</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(installScrewsPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={intScrewPrc}
                                        onChangeText={setIntScrewPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Wall Plug</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(wallPlugsPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={plugPrc}
                                        onChangeText={setPlugPrc}
                                    />
                                </View>
                            </View>
                            <View style={{display: isSwing ? 'flex' : 'none'}}>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Big L</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(bigLPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={lPrc}
                                        onChangeText={setLPrice}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: materialList.bigT > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>Big T</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(bigTPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={tPrc}
                                        onChangeText={setTPrice}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: materialList.bottom > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>Bottom</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(bottomPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={botPrc}
                                        onChangeText={setBotPrice}
                                    />
                                </View>
                                <View style={[styles.priceRow]}>
                                    <Text style={styles.priceLabel}>Brush Adaptor</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(brushAdaptorPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={brushAdpPrc}
                                        onChangeText={setBrushAdpPrice}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: materialList.mollium > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>Mullion</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(mullionPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={mulPrc}
                                        onChangeText={setMulPrice}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Beading</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(beadingPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={BeadinPrc}
                                        onChangeText={setBeadinPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow]}>
                                    <Text style={styles.priceLabel}>
                                    {
                                        glassColor === 'tinted' ? 'Tinted Glass' : (
                                            glassColor === 'bronze-ref' ? 'Bronze Reflective Glass' : (
                                                glassColor === 'dark' ? 'Dark Glass' : (
                                                    glassColor === 'dark-ref' ? 'Dark Glass' : (
                                                        glassColor === 'blue-ref' ? 'Blue Reflective Glass' : 'Plain Glass'
                                                    ) 
                                                )
                                            )
                                        )
                                    }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(glassPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={glassPrc}
                                        onChangeText={setGlassPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow]}>
                                    <Text style={styles.priceLabel}>Big L Corner</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(bigZCornerPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={bigLCornerPrc}
                                        onChangeText={setBigLCornerPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Adaptor Brush</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(adaptorBrushPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={adapBrushPrc}
                                        onChangeText={setAdapBrushPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Down Closer</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(downCloserPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={downCloserPrc}
                                        onChangeText={setDownCloserPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow]}>
                                    <Text style={styles.priceLabel}>Door Key</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(hingeDoorKeyPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={hingeKeyPrc}
                                        onChangeText={setHingeKeyPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow]}>
                                    <Text style={styles.priceLabel}>Handle</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(pipeHandlePrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={pipeHandlePrc}
                                        onChangeText={setPipeHandlePrc}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: materialList.towerBolt > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>Tower Bolt</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(towerBoltPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={towerBoltPrc}
                                        onChangeText={setTowerBoltPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Frame Rubber</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(frameRubberPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={frameRubPrc}
                                        onChangeText={setFrameRubPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Beading Rubber</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(beadingRubberPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={beadingRubPrc}
                                        onChangeText={setBeadingRubPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Install Screws</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(installScrewsPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={intScrewPrc}
                                        onChangeText={setIntScrewPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Wall Plug</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(wallPlugsPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={plugPrc}
                                        onChangeText={setPlugPrc}
                                    />
                                </View>
                            </View>
                            <View style={{display: isFixed ? 'flex' : 'none'}}>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>
                                        {
                                            profileType === 'Italian' && lType === 'small-l' ? 'Small L' : (
                                                profileType === 'Italian' && lType === 'big-l' ? 'Big L' : (
                                                    profileType === 'Eco' && lType === 'small-l' ? 'Eco Small L' : 'Eco Big L'
                                                )
                                            )
                                        }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={
                                            profileType === 'Italian' && lType === 'small-l' ? JSON.stringify(louterPrice) : (
                                                profileType === 'Italian' && lType === 'big-l' ? JSON.stringify(bigLPrice) : (
                                                    profileType === 'Eco' && lType === 'small-l' ? JSON.stringify(ecoLouterPrice) : 
                                                    JSON.stringify(ecoBigLPrice)
                                                )
                                            )
                                        }
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={lPrc}
                                        onChangeText={setLPrice}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: materialList.small_big_T > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>
                                    {
                                        profileType === 'Italian' && tType === 'small-t' ? 'Small T' : (
                                            profileType === 'Italian' && tType === 'big-t' ? 'Big T' : (
                                                profileType === 'Eco' && tType === 'small-t' ? 'Eco Small T' : 'Eco Big T'
                                            )
                                        )
                                    }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={
                                            profileType === 'Italian' && tType === 'small-t' ? JSON.stringify(smallTPrice) : (
                                                profileType === 'Italian' && tType === 'big-t' ? JSON.stringify(bigTPrice) : (
                                                    profileType === 'Eco' && tType === 'small-t' ? JSON.stringify(ecoSmallTPrice) : 
                                                    JSON.stringify(ecoBigTPrice)
                                                )
                                            )
                                        }
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={tPrc}
                                        onChangeText={setTPrice}
                                    />
                                </View>
                                <View style={[styles.priceRow, {display: materialList.bottom > 0 ? 'flex' : 'none'}]}>
                                    <Text style={styles.priceLabel}>Bottom</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(bottomPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={botPrc}
                                        onChangeText={setBotPrice}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>{profileType === 'Italian' ? 'Beading' : 'Eco Beading'}</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={profileType === 'Italian' ? JSON.stringify(beadingPrice) : JSON.stringify(ecoBeadingPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={BeadinPrc}
                                        onChangeText={setBeadinPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow]}>
                                    <Text style={styles.priceLabel}>
                                    {
                                        glassColor === 'tinted' ? 'Tinted Glass' : (
                                            glassColor === 'bronze-ref' ? 'Bronze Reflective Glass' : (
                                                glassColor === 'dark' ? 'Dark Glass' : (
                                                    glassColor === 'dark-ref' ? 'Dark Glass' : (
                                                        glassColor === 'blue-ref' ? 'Blue Reflective Glass' : 'Plain Glass'
                                                    ) 
                                                )
                                            )
                                        )
                                    }
                                    </Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(glassPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={glassPrc}
                                        onChangeText={setGlassPrc}
                                    />
                                </View>
                                <View style={[styles.priceRow]}>
                                    <Text style={styles.priceLabel}>{lType === 'big-l' ? 'Big L Corner' : 'Louter Corner'}</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={lType === 'big-l' ? JSON.stringify(bigZCornerPrice) : JSON.stringify(louterCornerPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={loutCornerPrc}
                                        onChangeText={setLoutCornerPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Frame Rubber</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(frameRubberPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={frameRubPrc}
                                        onChangeText={setFrameRubPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Beading Rubber</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(beadingRubberPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={beadingRubPrc}
                                        onChangeText={setBeadingRubPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Install Screws</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(installScrewsPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={intScrewPrc}
                                        onChangeText={setIntScrewPrc}
                                    />
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>Wall Plug</Text>
                                    <TextInput style={styles.priceInput}
                                        keyboardType="numeric"
                                        cursorColor={cursorColor}
                                        placeholder={JSON.stringify(wallPlugsPrice)}
                                        placeholderTextColor='rgba(255, 255, 255, 1)'
                                        value={plugPrc}
                                        onChangeText={setPlugPrc}
                                    />
                                </View>
                            </View>
                            <View style={styles.calculate}>
                                <Text style={[styles.txtError, {display: isError ? 'flex' : 'none'}]}>Invalid number entered</Text>
                                <Pressable style={({pressed}) => [
                                    styles.btnCalculate,
                                    pressed && {opacity: 0.5}
                                ]}
                                onPress={setPricesHandler}>
                                    <Text style={styles.txtCalculate}>Set</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                        
                    </View>
                </Modal>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SavingCalculating isVisible={isSaving} text='Saving...' />
            <SetPrices visible={isSetPrices}/>
            <AlufappToast toastVisible={isToast && isWhichToast === 'prices-toast'} info='Failed to fetch current prices'/>
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
                    ]}>Material List</Text>
                    <View style={{width: deviceWidth < 800 ? 0 : 100, height:0,}}></View>
                </View>
            </View>
            <View style={styles.head}>
                <View style={styles.topBtnsCon}>
                    <Pressable style={({pressed}) => [
                        styles.btnHome,
                        pressed && {opacity: 0.3}
                     ]}
                     onPress={() => {
                        const response = window.confirm('Returning to home screen without saving');
                        if (response) {
                            navigation.navigate('MaterialCalc')
                        }
                     }}
                    >
                        <Ionicons name="home-outline" size={14} color='#020100'/>
                        <Text style={styles.txtBtnHome}>Exit</Text>
                    </Pressable>
                    
                    <Pressable style={({pressed}) => [
                        styles.btnSave,
                        pressed && {opacity: 0.3}
                    ]}
                    onPress={() => {
                        const response = window.confirm('Save and return to home screen');
                        if (response) {
                            setSaving(true);
                            setTimeout(() => {
                                saveHandler();
                                setSaving(false);
                            }, 2000);
                            
                        }
                    }}
                    >
                        <Ionicons name="save-outline" size={14} color='#020100'/>
                        <Text style={styles.txtBtnSave}>save</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [
                        styles.btnHome,
                        pressed && {opacity: 0.3}
                     ]}
                     onPress={() => {
                        setSetPrices(true);
                     }}
                    >
                        <Ionicons name="reader-outline" size={14} color='#020100'/>
                        <Text style={styles.txtBtnHome}>set prices</Text>
                    </Pressable>
                </View>
                <View style={styles.headerDetail}>
                    <Text style={styles.txtWorkType}>
                        {
                            workType === 'Sliding' || workType === 'Sliding-division' ? 'Sliding Windows' : (
                                workType === 'Projected' ? 'Projected Windows' : ( workType === 'Casement' ? 'Casement Windows' :
                                    workType === 'Hinge' ? 'Hinge Doors' : (workType === 'Swing' ? 'Swing Doors' : 'Fixed Windows'
                                    )
                                )
                            ) 
                        }
                    </Text>
                </View>
                <View style={[styles.companies, {display: workType === 'Sliding' || workType === 'Sliding-division' ? 'flex' : 'none'}]}>
                    <Pressable style={[
                        styles.btnCompany,
                        {backgroundColor: isSkit60 ? '#E18335' : 'transparent'}
                     ]}
                     onPress={() => {
                        if (!isSkit60) {
                            setSkit60(true);
                            setKs50(false);
                            setTrialco(false);
                            setProfileType('Skit-60');
                        }
                     }}
                    >
                        <Text style={[
                            styles.txtCompany,
                            {color: isSkit60 ? '#fff' : 'black'}
                        ]}>Skit-60</Text>
                    </Pressable>
                    <Pressable style={[
                        styles.btnCompany,
                        {backgroundColor: isKs50 ? '#E18335' : 'transparent'}
                     ]}
                     onPress={() => {
                        if (!isKs50) {
                            setKs50(true);
                            setSkit60(false);
                            setTrialco(false);
                            setProfileType('KS-50');
                        }
                     }}
                    >
                        <Text style={[
                            styles.txtCompany,
                            {color: isKs50 ? '#fff' : 'black'}
                        ]}>KS-50</Text>
                    </Pressable>
                    <Pressable style={[
                        styles.btnCompany,
                        {backgroundColor: isTrialco ? '#E18335' : 'transparent'}
                     ]}
                     onPress={() => {
                        if (!isTrialco) {
                            setSkit60(false);
                            setKs50(false);
                            setTrialco(true);
                            setProfileType('Trialco');
                        }
                     }}
                    >
                        <Text style={[
                            styles.txtCompany,
                            {color: isTrialco ? '#fff' : 'black'}
                        ]}>Trialco</Text>
                    </Pressable>
                </View>
                <View style={[
                    styles.companies, 
                    {
                        display: workType === 'Projected' || workType === 'Casement'  ||
                        workType === 'Hinge' || workType === 'Fixed' ? 'flex' : 'none'
                    }
                ]}>
                    <Pressable style={[
                        styles.btnCompany,
                        {backgroundColor: isItalian ? '#E18335' : 'transparent'}
                     ]}
                     onPress={() => {
                        if (!isItalian) {
                            setItalian(true);
                            setEco(false);
                            setProfileType('Italian');
                            (false);
                        }
                     }}
                    >
                        <Text style={[
                            styles.txtCompany,
                            {color: isItalian ? '#fff' : 'black'}
                        ]}>Italian</Text>
                    </Pressable>
                    <Pressable style={[
                        styles.btnCompany,
                        {backgroundColor: isEco ? '#E18335' : 'transparent'}
                     ]}
                     onPress={() => {
                        if (!isEco) {
                            setItalian(false);
                            setEco(true);
                            setProfileType('Eco');
                        }
                     }}
                    >
                        <Text style={[
                            styles.txtCompany,
                            {color: isEco ? '#fff' : 'black'}
                        ]}>Eco</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.materialListHeader}>
                <View style={[styles.materialColHeader, styles.numHeader]}>
                    <Text style={styles.txtMaterial}>No.</Text>
                </View>
                <View style={[styles.materialColHeader, styles.materialHeader]}>
                    <Text style={styles.txtMaterial}>Material</Text>
                </View>
                <View style={[styles.materialColHeader, styles.qtyHeader]}>
                    <Text style={styles.txtMaterial}>Qty</Text>
                </View>
                <View style={[styles.materialColHeader, styles.unitPriceHeader]}>
                    <Text style={styles.txtMaterial}>Unit Price</Text>
                </View>
                <View style={[styles.materialColHeader, styles.totalPriceHeader]}>
                    <Text style={styles.txtMaterial}>Total Price</Text>
                </View>
            </View>
            <ScrollView style={styles.materialListCon}>
                <View style={{display: isSliding ? 'flex' : 'none'}}>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                             {
                                profileType === 'Skit-60' && frameType === 'round-frame' ? 'Round Frame' : (profileType === 'Skit-60' && frameType === 'small-wall-frame' ? 'Small Wall Frame' : 
                                    profileType === 'Skit-60' && frameType === 'big-wall-frame' ? 'Big Wall Frame' : (profileType === 'KS-50' && frameType === 'round-frame' ? 'KS-50 Round Frame' : 
                                        (profileType === 'KS-50' && (frameType === 'wall-frame' || frameType === 'small-wall-frame' || frameType === 'big-wall-frame') ? 'KS-50 Wall Frame' : (profileType === 'Trialco' && frameType === 'round-frame' ? 'Trialco Round Frame' :
                                            'Trialco Wall Frame'
                                        ))
                                    )
                                )
                             }
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.outerFrame}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {
                                profileType === 'Skit-60' && frameType === 'round-frame' ? roundFramePrice : (profileType === 'Skit-60' && frameType === 'small-wall-frame' ? smallWallFramePrice : 
                                    profileType === 'Skit-60' && frameType === 'big-wall-frame' ? bigWallFramePrice : (profileType === 'KS-50' && frameType === 'round-frame' ? ks50RoundFramePrice : 
                                        (profileType === 'KS-50' && (frameType === 'wall-frame' || frameType === 'small-wall-frame' || frameType === 'big-wall-frame') ? ks50WallFramePrice : (profileType === 'Trialco' && frameType === 'round-frame' ? trialcoRoundFramePrice :
                                            trialcoWallFramePrice
                                        ))
                                    )
                                )
                             }
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{outerTotalPrice}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                             {
                                profileType === 'Skit-60' && leafType === 'flat-leaf' ? 'Flat Leaf' :(profileType === 'KS-50' ? 'KS-50 Leaf' : 
                                    (profileType === 'Trialco' ? 'Trialco Leaf' : 'Round Leaf')
                                )
                             }
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.innerLeaf}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {
                                profileType === 'Skit-60' && leafType === 'flat-leaf' ? flatLeafPrice :(profileType === 'KS-50' ? ks50LeafPrice : 
                                    (profileType === 'Trialco' ? trialcoLeafPrice : roundLeafPrice)
                                )
                             }
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{leafTotalPrice}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                             {profileType === 'Skit-60' ? 'Interlock' : (profileType === 'KS-50' ? 'KS-50 Interlock' : 'Trialco Interlock')}
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.adaptor}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Skit-60' ? interlockPrice : (profileType === 'KS-50' ? ks50InterlockPrice : trialcoInterlockPrice)}
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{interlockTotalPrice}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>{netType === 'big-net' ? 'Big Net Inner' : 'Net Inner'}</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.netInner}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{netType === 'big-net' ? bigNetLeafPrice : smallNetLeafPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{netTotalPrice}</Text>
                        </View>
                    </View>
                    
                    <View style={[styles.materialListRow, {display: isDivision ? 'flex' : 'none'}]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{isDivision ? slidingItemCount++ : ''}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Leaf Division</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.leafDivision}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{leafDivisionPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{divisionTotalPrice}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                                {
                                    glassColor === 'tinted' ? 'Tinted Glass' : (
                                        glassColor === 'bronze-ref' ? 'Bronze Reflective Glass' : (
                                            glassColor === 'dark' ? 'Dark Glass' : (
                                                glassColor === 'dark-ref' ? 'Dark Glass' : (
                                                    glassColor === 'blue-ref' ? 'Blue Reflective Glass' : 'Plain Glass'
                                                ) 
                                            )
                                        )
                                    )
                                }
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.glassSheet}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{glassPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{glassTotalCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Frame Corner</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.frameCorner}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{frameCornerPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{frameCornersCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Leaf Corner</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.leafCorner}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{leafCornerPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{leafCornersCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Net Corner</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.netCorner}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{netCornerPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{netCornersCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Brush</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.brush}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{brushPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{brushCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                                {profileType === 'Skit-60' ? 'Roller' : (profileType === 'KS-50' ? 'KS-50 roller' : 'Trialco roller')}
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.roller}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                                {profileType === 'Skit-60' ? rollerPrice : (profileType === 'KS-50' ? heavyDutyRollerPrice : trialcoRollerPrice)}
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{rollersCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                                {profileType === 'Skit-60' && lockType === 'metal-lock' ? 'Metal Lock' : 'Press Lock'}
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.pressLock}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                                {profileType === 'Skit-60' && lockType === 'metal-lock' ? metalLockPrice : pressLockPrice}
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{locksCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>{netHandleType === 'small-net-handle' ? 'Small Net Handle' : 'Big Net Handle'}</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.netHandle}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{netHandleType === 'small-net-handle' ? smallNetHandlePrice : bigNetHandlePrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{netHandlesCost}</Text>
                        </View>
                    </View>
                    <View style={[styles.materialListRow, {display: profileType === 'Trialco' ? 'flex' : 'none'}]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{profileType === 'Trialco' ? slidingItemCount++ : ''}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Trialco Kit</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.kit}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{trialcoKitPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{trialcoKitCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>{fiberNetType === 'long' ? 'Long Fiber Net' : 'Fiber Net'}</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.fiberNet}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{fiberNetType === 'long' ? longFiberNetPrice : shortFiberNetPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{fiberNetCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Glazing Rubber</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.glazingRubber}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{glazingRubberPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{glazingRubbersCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Net Rubber</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.netRubber}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{netRubberPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{netRubbersCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Install Screws 144pcs</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.installScrews}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{installScrewsPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{installScrewsCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{slidingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Wall Plug 100pcs</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.wallPlug}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{wallPlugsPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{wallPlugCost}</Text>
                        </View>
                    </View>
                </View>
                <View style={{display: isProjected || isCasement ? 'flex' : 'none'}}>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{projItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                                {
                                    profileType === 'Italian' && lType === 'big-l' ? 'Big L' : (
                                        profileType === 'Italian' && lType === 'small-l' ? 'Small L' : (
                                            profileType === 'Eco' && lType === 'big-l' ? 'Eco big L' : 'Eco small L'
                                        )
                                    )
                                }
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.LOuter}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {
                                profileType === 'Italian' && lType === 'big-l' ? bigLPrice : (
                                    profileType === 'Italian' && lType === 'small-l' ? louterPrice : (
                                        profileType === 'Eco' && lType === 'big-l' ? ecoBigLPrice : ecoLouterPrice
                                    )
                                )
                            }
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{LOuterCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{projItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                                {
                                    profileType === 'Italian' && tType === 'big-t' ? 'Big T' : (
                                        profileType === 'Italian' && tType === 'small-t' ? 'Small T' : (
                                            profileType === 'Eco' && tType === 'big-t' ? 'Eco Big T' : 'Eco Small T'
                                        )
                                    )
                                }
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.small_big_T}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {
                                    profileType === 'Italian' && tType === 'big-t' ? bigTPrice : (
                                        profileType === 'Italian' && tType === 'small-t' ? smallTPrice : (
                                            profileType === 'Eco' && tType === 'big-t' ? ecoBigTPrice : ecoSmallTPrice
                                        )
                                    )
                                }
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{smallTCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{projItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>{profileType === 'Italian' ? 'Beading' : 'Eco Beading'}</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.beading}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                                {profileType === 'Italian' ? beadingPrice : ecoBeadingPrice}
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{beadingCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{projItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                            {
                                glassColor === 'tinted' ? 'Tinted Glass' : (
                                    glassColor === 'bronze-ref' ? 'Bronze Reflective Glass' : (
                                        glassColor === 'dark' ? 'Dark Glass' : (
                                            glassColor === 'dark-ref' ? 'Dark Reflective Glass' : (
                                                glassColor === 'blue-ref' ? 'Blue Reflective Glass' : 'Plain Glass'
                                            )
                                        )
                                    )
                                ) 
                            }
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.glassSheet}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{glassPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{glassTotalCost}</Text>
                        </View>
                    </View>
                    <View style={[styles.materialListRow, {display: materialList.louterCorner > 0 ? 'flex' : 'none'}]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.louterCorner > 0 ? projItemCount++ : ''}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Louter corner</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.louterCorner}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{louterCornerPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{louterCornersCost}</Text>
                        </View>
                    </View>
                    <View style={[styles.materialListRow, {display: materialList.bigLCorner > 0 ? 'flex' : 'none'}]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.bigLCorner > 0 ? projItemCount++ : ''}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Big-Z Corner</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.bigLCorner}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bigZCornerPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bigZornersCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{projItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                                {workType === 'Projected' ? 'Projected Hinges' : (
                                    workType === 'Casement' && profileType === 'Italian' ? 'Hinges' : 'Eco Hinges'
                                )}
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.hinges}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {workType === 'Projected' ? projectedHingesPrice : (
                                workType === 'Casement' && profileType === 'Italian' ? hingesPrice : ecoHingesPrice
                            )}
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{hingesCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{projItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                                {workType === 'Projected' ? 'Projected Handle' : 'Casement Handle'}
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.handles}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{projectedHandlePrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{projectedHandleCost}</Text>
                        </View>
                    </View>
                    <View style={[styles.materialListRow, {display: isCasement ? 'flex' : 'none'}]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{isCasement ? projItemCount++ : ''}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Casement Stopper</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.casementStopper}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{casementStopperPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{casementStopperCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{projItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Frame Rubber</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.frameRubber}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{frameRubberPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{frameRubberCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{projItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Beading Rubber</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.beadingRubber}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{beadingRubberPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{beadingRubberCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{projItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Door Brush</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.doorBrush}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{doorBrushPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{doorBrushCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{projItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Install Screws 144pcs</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.installScrews}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{installScrewsPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{installScrewsCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{projItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Wall Plug 100pcs</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.wallPlug}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{wallPlugsPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{wallPlugCost}</Text>
                        </View>
                    </View>
                </View>
                <View style={{display: isHinge ? 'flex' : 'none'}}>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{hingeItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                                {
                                    profileType === 'Italian' && lType === 'big-l' ? 'Big L' : (
                                        profileType === 'Italian' && lType === 'small-l' ? 'Small L' : (
                                            profileType === 'Eco' && lType === 'big-l' ? 'Eco Big L' : 'Eco Small L'
                                        )
                                    )
                                }
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.LOuter}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {
                                profileType === 'Italian' && lType === 'big-l' ? bigLPrice : (
                                    profileType === 'Italian' && lType === 'small-l' ? louterPrice : (
                                        profileType === 'Eco' && lType === 'big-l' ? ecoBigLPrice : ecoLouterPrice
                                    )
                                )
                            }
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{LOuterCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{hingeItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Italian'  ? 'Big Z' : 'Eco Big Z'}
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.bigZ}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Italian'  ? bigZPrice : ecoBigZPrice}
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{ZCost}</Text>
                        </View>
                    </View>
                    <View style={[styles.materialListRow, {display: materialList.small_big_T > 0 ? 'flex' : 'none'}]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.small_big_T > 0 ? hingeItemCount++ : ''}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Italian'  ? 'Big T' : 'Eco Big T'}
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.small_big_T}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Italian'  ? bigTPrice : ecoBigTPrice}
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bigTCost}</Text>
                        </View>
                    </View>
                    <View style={[styles.materialListRow, 
                     {display: materialList.mollium > 0 ? 'flex' : 'none'}
                     ]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.mollium > 0 ? hingeItemCount++ : ''}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Italian'  ? 'Mullion' : 'Eco Mullion'}
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.mollium}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Italian'  ? mullionPrice : ecoMullionPrice}
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{mullionCost}</Text>
                        </View>
                    </View>
                    <View style={[styles.materialListRow]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{ hingeItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Italian'  ? 'Bottom' : 'Eco Bottom'}
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.bottom}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Italian'  ? bottomPrice : ecoBottomPrice}
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bottomCost}</Text>
                        </View>
                    </View>
                    <View style={[styles.materialListRow, {display: materialList.adaptor > 0 ? 'flex' : 'none'}]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.adaptor > 0 ? hingeItemCount++ : ''}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Door Adaptor</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.adaptor}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{hingeAdaptorPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{adaptorCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{hingeItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Italian'  ? 'Beading' : 'Eco Beading'}
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.beading}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Italian'  ? beadingPrice : ecoBeadingPrice}
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{beadingCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{hingeItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                            {
                                glassColor === 'tinted' ? 'Tinted Glass' : (
                                    glassColor === 'bronze-ref' ? 'Bronze Reflective Glass' : (
                                        glassColor === 'dark' ? 'Dark Glass' : (
                                            glassColor === 'dark-ref' ? 'Dark Geflective Glass' : (
                                                glassColor === 'blue-ref' ? 'Blue Reflective Glass' : 'Plain Glass'
                                            )
                                        )
                                    )
                                ) 
                            }
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.glassSheet}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{glassPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{glassTotalCost}</Text>
                        </View>
                    </View>
                    <View style={[
                        styles.materialListRow,
                        {display: materialList.louterCorner > 0 ? 'flex' : 'none'}
                    ]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.louterCorner > 0 ? hingeItemCount++ : ''}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Louter Corner</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.louterCorner}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{louterCornerPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{louterCornersCost}</Text>
                        </View>
                    </View>
                    <View style={[
                        styles.materialListRow,
                        {display: materialList.bigZCorner > 0 ? 'flex' : 'none'}
                     ]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.bigZCorner > 0 ? hingeItemCount++ : ''}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Big-Z Corner</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.bigZCorner}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bigZCornerPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bigZornersCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{hingeItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Italian'  ? 'Hinges' : 'Eco Hinges'}
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.hinges}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{hingesPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{hingesCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{hingeItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Hinge Door Key</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.key}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{hingeDoorKeyPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{keysCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{hingeItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Hinge Handle</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.handles}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{hingeHandlePrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{handlesCost}</Text>
                        </View>
                    </View>
                    <View style={[
                        styles.materialListRow,
                        {display: materialList.towerBolt > 0 ? 'flex' : 'none'}
                    ]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.towerBolt > 0 ? hingeItemCount++ : ''}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Tower Bolt</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.towerBolt}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{towerBoltPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{towerBoltCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{hingeItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Frame Rubber</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.frameRubber}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{frameRubberPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{frameRubberCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{hingeItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Beading Rubber</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.beadingRubber}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{beadingRubberPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{beadingRubberCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{hingeItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Door Brush</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.doorBrush}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{doorBrushPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{doorBrushCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{hingeItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Install Screws 144pcs</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.installScrews}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{installScrewsPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{installScrewsCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{hingeItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Wall Plug 100pcs</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.wallPlug}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{wallPlugsPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{wallPlugCost}</Text>
                        </View>
                    </View>
                </View>
                <View style={{display: isSwing ? 'flex' : 'none'}}>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{swingItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Big L</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.bigL}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bigLPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bigLCost}</Text>
                        </View>
                    </View>
                    <View style={[styles.materialListRow, {display: materialList.bigT > 0 ? 'flex' : 'none'}]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.bigT > 0 ? swingItemCount++ : ''}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Big T</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.bigT}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bigTPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bigTCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.bottom > 0 ? swingItemCount++ : ''}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Bottom</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.bottom}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bottomPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bottomCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{swingItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Brush Adaptor</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.brushAdaptor}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{brushAdaptorPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{adaptorCost}</Text>
                        </View>
                    </View>
                    <View style={[styles.materialListRow, 
                     {display: materialList.mollium > 0 ? 'flex' : 'none'}
                     ]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.mollium > 0 ? swingItemCount++ : ''}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Mullion</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.mollium}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{mullionPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{mullionCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{swingItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Beading</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.beading}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{beadingPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{beadingCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{swingItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                            {
                                glassColor === 'tinted' ? 'Tinted Glass' : (
                                    glassColor === 'bronze-ref' ? 'Bronze Reflective Glass' : (
                                        glassColor === 'dark' ? 'Dark Glass' : (
                                            glassColor === 'dark-ref' ? 'Dark Geflective Glass' : (
                                                glassColor === 'blue-ref' ? 'Blue Reflective Glass' : 'Plain Glass'
                                            )
                                        )
                                    )
                                ) 
                            }
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.glassSheet}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{glassPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{glassTotalCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{swingItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Big L Corner</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.corners}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bigZCornerPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{bigZornersCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{swingItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Adaptor Brush</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.adaptorBrush}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{adaptorBrushPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{adaptorBrushCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{swingItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Down Closer</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.downCloser}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{downCloserPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{downCloserCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{swingItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Door Key</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.key}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{hingeDoorKeyPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{keysCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{swingItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Handle</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.handle}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{pipeHandlePrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{handlesCost}</Text>
                        </View>
                    </View>
                    <View style={[
                        styles.materialListRow,
                        {display: materialList.towerBolt > 0 ? 'flex' : 'none'}
                    ]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.towerBolt > 0 ? swingItemCount++ : ''}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Tower Bolt</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.towerBolt}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{towerBoltPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{towerBoltCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{swingItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Frame Rubber</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.frameRubber}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{frameRubberPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{frameRubberCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{swingItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Beading Rubber</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.beadingRubber}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{beadingRubberPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{beadingRubberCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{swingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Install Screws 144pcs</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.installScrews}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{installScrewsPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{installScrewsCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{swingItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Wall Plug 100pcs</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.wallPlug}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{wallPlugsPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{wallPlugCost}</Text>
                        </View>
                    </View>
                </View>
                <View style={{display: isFixed ? 'flex' : 'none'}}>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{fixedItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                                {
                                    profileType === 'Italian' && lType === 'big-l' ? 'Big L-outer' : (
                                        profileType === 'Italian' && lType === 'small-l' ? 'Small L-outer' : (
                                            profileType === 'Eco' && lType === 'big-l' ? 'Eco big L-outer' : 'Eco small L-outer'
                                        )
                                    )
                                }
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.LOuter}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {
                                profileType === 'Italian' && lType === 'big-l' ? bigLPrice : (
                                    profileType === 'Italian' && lType === 'small-l' ? louterPrice : (
                                        profileType === 'Eco' && lType === 'big-l' ? ecoBigLPrice : ecoLouterPrice
                                    )
                                )
                            }
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{LOuterCost}</Text>
                        </View>
                    </View>
                    <View style={[styles.materialListRow, {display: materialList.small_big_T > 0 ? 'flex' : 'none'}]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.small_big_T > 0 ? fixedItemCount++ : ''}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                                {
                                    profileType === 'Italian' && tType === 'big-t' ? 'Big T' : (
                                        profileType === 'Italian' && tType === 'small-t' ? 'Small T' : (
                                            profileType === 'Eco' && tType === 'big-t' ? 'Eco big T' : 'Eco small T'
                                        )
                                    )
                                }
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.small_big_T}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {
                                    profileType === 'Italian' && tType === 'big-t' ? bigTPrice : (
                                        profileType === 'Italian' && tType === 'small-t' ? smallTPrice : (
                                            profileType === 'Eco' && tType === 'big-t' ? ecoBigTPrice : ecoSmallTPrice
                                        )
                                    )
                                }
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{smallTCost}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{fixedItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>{profileType === 'Italian' ? 'Beading' : 'Eco beading'}</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.beading}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                                {profileType === 'Italian' ? beadingPrice : ecoBeadingPrice}
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{beadingCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{fixedItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                            {
                                glassColor === 'tinted' ? 'Tinted glass' : (
                                    glassColor === 'bronze-ref' ? 'Bronze reflective glass' : (
                                        glassColor === 'dark' ? 'Dark glass' : (
                                            glassColor === 'dark-ref' ? 'Dark reflective glass' : (
                                                glassColor === 'blue-ref' ? 'Blue reflective glass' : 'Plain glass'
                                            )
                                        )
                                    )
                                ) 
                            }
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.glassSheet}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{glassPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{glassTotalCost}</Text>
                        </View>
                    </View>
                    <View style={[styles.materialListRow]}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{fixedItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Italian' && lType === 'big-l' ? 'Big L Corner' : 'Louter Corner'}
                            </Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.corners}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>
                            {profileType === 'Italian' && lType === 'big-l' ? bigZCornerPrice : louterCornerPrice}
                            </Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{louterCornersCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{fixedItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Frame rubber</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.frameRubber}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{frameRubberPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{frameRubberCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{fixedItemCount++}.</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Beading rubber</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.beadingRubber}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{beadingRubberPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{beadingRubberCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{fixedItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Install screws 144pcs</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.installScrews}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{installScrewsPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{installScrewsCost}</Text>
                        </View>
                    </View>
                    <View style={styles.materialListRow}>
                        <View style={styles.numCell}>
                            <Text style={styles.txtMaterialCell}>{fixedItemCount++}</Text>
                        </View>
                        <View style={styles.materialCell}>
                            <Text style={styles.txtMaterialCell}>Wall plug 100pcs</Text>
                        </View>
                        <View style={styles.qtyCell}>
                            <Text style={styles.txtMaterialCell}>{materialList.wallPlug}</Text>
                        </View>
                        <View style={styles.unitPriceCell}>
                            <Text style={styles.txtMaterialCell}>{wallPlugsPrice}</Text>
                        </View>
                        <View style={styles.totalPriceCell}>
                            <Text style={styles.txtMaterialCell}>{wallPlugCost}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomBtnsCon}>
                <View style={styles.totalRow}>
                    <View style={styles.grandTotalCell}>
                        <Text style={styles.txtTotalLabel}>total cost</Text>
                    </View>
                    <View style={styles.grandTotalPriceCell}>
                        <Text style={styles.txtTotalCost}>Ghc {projectTotalCost}</Text>
                    </View>
                </View>
                <View style={styles.totals}>
                    <View style={styles.total}>
                        <Text style={styles.txtTotal}>Frames: {framesCost}</Text>
                    </View>
                    <View style={styles.total}>
                        <Text style={styles.txtTotal}>Glass: {glassTotalCost}</Text>
                    </View>
                    <View style={styles.total}>
                        <Text style={styles.txtTotal}>Accessories: {accessoriesCost}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default MaterialListPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#383961',
        marginBottom: 10,
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
        justifyContent: 'space-evenly',
    },
    txtSheetWorker: {
        color: '#fff',
        fontSize: 20,
        letterSpacing: 3,
        fontFamily: 'Underdog',
        textAlign: 'center',
    },

    head : {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        paddingBottom: 15,
    },
    statusBar: {
        height: 35,
        // backgroundColor: '#E6E8E6'
    },
    backBtn: {
        paddingHorizontal: 10,
    },
    headerDetails : {
        flexDirection: 'row',
    },
    headerDetail : {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtWorkType : {
        letterSpacing: 3,
        fontSize: 16,
        marginBottom: 10,
        color: 'maroon'
    },
    txtProfileType : {
        letterSpacing: 3,
        fontSize: 16,
        color: '#546A7B',
        fontWeight: '500',
    },
    companies : {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    btnCompany: {
        width: 90,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    txtCompany : {
        letterSpacing: 3,
        fontSize: 12,
    },
    materialListLabel : {
        paddingTop: 20,
        marginBottom: 20,
    },
    txtMaterialListLabel : {
        letterSpacing: 3,
        textAlign: 'center',
        color: 'maroon',
        fontWeight: '500',
    },
    materialListHeader : {
        flexDirection: 'row',
    },
    numHeader : {
        width: '10%',
        height: 35,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    materialHeader : {
        width: '35%',
        height: 35,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    qtyHeader : {
        width: '10%',
        height: 35,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    unitPriceHeader : {
        width: '22%',
        height: 35,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    totalPriceHeader : {
        width: '23%',
        height: 35,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    txtMaterial : {
        textAlign: 'center',
        letterSpacing: 1,
        fontSize: 12,
    },
    materialListRow : {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    numCell : {
        width: '10%',
        height: 35,
        justifyContent: 'center',
    },
    materialCell : {
        width: '35%',
        height: 35,
        justifyContent: 'center',
    },
    qtyCell : {
        width: '10%',
        height: 35,
        justifyContent: 'center',
    },
    unitPriceCell : {
        width: '22%',
        height: 35,
        justifyContent: 'center',
    },
    grandTotalCell : {
        width: '50%',
        height: 35,
        justifyContent: 'center',
    },
    grandUnitPriceCell : {
        width: '15%',
        height: 35,
        justifyContent: 'center',
    },
    totalPriceCell : {
        width: '23%',
        height: 35,
        justifyContent: 'center',
    },
    grandTotalPriceCell : {
        width: '50%',
        height: 35,
        justifyContent: 'center',
        paddingRight: 2,
    },
    txtMaterialCell : {
        textAlign: 'center',
        letterSpacing: 1,
        fontSize: 12,
    },
    totalRow : {
        flexDirection: 'row',
    },
    totalLabel : {
        width: '67%',
        height: 35,
        justifyContent: 'center',
    },
    txtTotalLabel : {
        textAlign: 'center',
        letterSpacing: 2,
        fontSize: 12,
        fontStyle: 'italic',
        fontWeight: '500',
    },
    txtTotalCost : {
        textAlign: 'center',
        letterSpacing: 2,
        fontSize: 13,
        fontStyle: 'italic',
        color: 'maroon',
        fontWeight: '500',
    },
    totals : {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    total : {},
    txtTotal : {
        color: 'black',
        fontSize: 10,
        letterSpacing: 1,
    },
    xxx : {},
    xxx : {},
    topBtnsCon : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 25,
    },
    bottomBtnsCon : {
        justifyContent: 'space-evenly',
    },
    txtBtnCompany : {
        letterSpacing: 3,
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        fontStyle: 'italic',
        marginLeft: 10,
    },
    txtBtnHome : {
        letterSpacing: 3,
        fontSize: 11,
        color: 'black',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    txtBtnSave : {
        letterSpacing: 3,
        fontSize: 11,
        color: 'black',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    btnCompanyList : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius:5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    btnHome : {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 5,
    },
    btnSave : {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 10,
    },
    xxx : {},
    xxx : {},
    materialListCon : {
        height: 1,
    },

    setPricesHeader: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 1,
    },
    txtHeader: {
        width: 250,
        letterSpacing: 4,
        fontSize: 18,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        textAlign: 'center',
    },
    closeCon: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 15,
        marginTop: 15,
    },
    btnClose: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    btnCalculate: {
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'blue',
    },
    txtCalculate: {
        letterSpacing: 3,
        color: '#fff',
        fontSize: 15,
    },
    calculate: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
    },

    priceRow : {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    priceLabel : {
        letterSpacing: 3,
        color: '#fff',
        marginRight: 20,
    },
    priceInput : {
        width: 100,
        height: 36,
        borderWidth: 1,
        paddingLeft: 5,
        borderRadius: 5,
        letterSpacing: 3,
        borderColor: 'rgba(255, 255, 255, 1)',
        color: '#ff1'
    },
    txtError : {
        color: 'red',
        fontSize: 12,
        fontStyle: 'italic',
        letterSpacing: 3,
        marginBottom: 10,
    },
});