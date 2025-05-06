import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, Image, Modal, TextInput, ToastAndroid, BackHandler} from "react-native";
import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AlufappContext } from "./alufapp-context";
import AlufappToast from "./AlufappToast";

function MatSavedWorkList({ route }) {
    const navigation = useNavigation();
    const alufappContext = useContext(AlufappContext);
    

    const deviceDimension = Dimensions.get("window");
    const deviceWidth = deviceDimension.width;

    const id = route.params.id;
    const priceList = route.params.priceList;
    const workIndex = route.params.index;
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

    const [profileType, setProfileType] = useState(route.params.profileType);

    let slidingItemCount = 1;
    let projItemCount = 1;
    let hingeItemCount = 1;
    let swingItemCount = 1;
    let fixedItemCount = 1;

    const [isLoading, setLoading] = useState(false);
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

    const [outerTotalPrice, setOuterTotalPrice] = useState();
    const [leafTotalPrice, setLeafTotalPrice] = useState();
    const [divisionTotalPrice, setDivisionTotalPrice] = useState();
    const [interlockTotalPrice, setInterlockTotalPrice] = useState();
    const [netTotalPrice, setNetTotalPrice] = useState();
    const [glassTotalCost, setGlassTotalCost] = useState();
    const [frameCornersCost, setFrameCornersCost] = useState();
    const [leafCornersCost, setLeafCornersCost] = useState();
    const [netCornersCost, setNetCornersCost] = useState();
    const [brushCost, setBrushCost] = useState();
    const [rollersCost, setRollersCost] = useState();
    const [locksCost, setLocksCost] = useState();
    const [netHandlesCost, setNetHandlesCost] = useState();
    const [glazingRubbersCost, setGlazingRbbersCost] = useState();
    const [netRubbersCost, setNetRubbersCost] = useState();
    const [fiberNetCost, setFiberNetCost] = useState();
    const [installScrewsCost, setInstallScrewsCost] = useState();
    const [trialcoKitCost, setTrialcoKitCost] = useState();

    const [roundFramePrice, setRoundFramePrice] = useState();
    const [smallWallFramePrice, setSmallWallFramePrice] = useState();
    const [bigWallFramePrice, setBigWallFramePrice] = useState();
    const [flatLeafPrice, setFlatLeafPrice] = useState();
    const [roundLeafPrice, setRoundLeafPrice] = useState();
    const [smallNetLeafPrice, setSmallNetLeafPrice] = useState();
    const [bigNetLeafPrice, setBigNetLeafPrice] = useState();
    const [interlockPrice, setInterlockPrice] = useState();
    const [leafDivisionPrice, setLeafDivisionPrice] = useState();
    const [fourBayAdaptorPrice, setFourBayAdaptorPrice] = useState();
    const [ks50RoundFramePrice, setKs50RoundFramePrice] = useState();
    const [ks50WallFramePrice, setKs50WallFramePrice] = useState();
    const [ks50LeafPrice, setKs50LeafPrice] = useState();
    const [ks50InterlockPrice, setKs50InterlockPrice] = useState();
    const [trialcoRoundFramePrice, setTrialcoRoundFramePrice] = useState();
    const [trialcoWallFramePrice, setTrialcoWallFramePrice] = useState();
    const [trialcoLeafPrice, setTrialcoLeafPrice] = useState();
    const [trialcoInterlockPrice, setTrialcoInterlockPrice] = useState();
    const [frameCornerPrice, setFrameCornerPrice] = useState();
    const [leafCornerPrice, setLeafCornerPrice] = useState();
    const [netCornerPrice, setNetCornerPrice] = useState();
    const [O4CornerPrice, setO4CornerPrice] = useState();
    const [brushPrice, setBrushPrice] = useState();
    const [rollerPrice, setRollerPrice] = useState();
    const [heavyDutyRollerPrice, setHeavyDutyRollerPrice] = useState();
    const [trialcoRollerPrice, setTrialcoRollerPrice] = useState();
    const [trialcoKitPrice, setTrialcoKitPrice] = useState();
    const [metalLockPrice, setMetalLockPrice] = useState();
    const [pressLockPrice, setPressLockPrice] = useState();
    const [slidingKeyPrice, setSlidingKeyPrice] = useState();
    const [smallNetHandlePrice, setSmallNetHandlePrice] = useState();
    const [bigNetHandlePrice, setBigNetHandlePrice] = useState();
    const [shortFiberNetPrice, setShortFiberNetPrice] = useState();
    const [longFiberNetPrice, setLongFiberNetPrice] = useState();
    const [netRubberPrice, setNetRubberPrice] = useState();
    const [glazingRubberPrice, setGlazingRubberPrice] = useState();
    const [louterPrice, setLouterPrice] = useState();
    const [bigLPrice, setBigLPrice] = useState();
    const [smallTPrice, setSmallTPrice] = useState();
    const [bigTPrice, setBigTPrice] = useState();
    const [bigZPrice, setBigZPrice] = useState();
    const [mullionPrice, setMullionPrice] = useState();
    const [bottomPrice, setBottomPrice] = useState();
    const [hingeAdaptorPrice, setHingeAdaptorPrice] = useState();
    const [brushAdaptorPrice, setBrushAdaptorPrice] = useState();
    const [beadingPrice, setBeadingPrice] = useState();
    const [ecoLouterPrice, setECoLouterPrice] = useState();
    const [ecoBigLPrice, setEcoBigLPrice] = useState();
    const [ecoSmallTPrice, setEcoSmallTPrice] = useState();
    const [ecoBigTPrice, setEcoBigTPrice] = useState();
    const [ecoBigZPrice, setEcoBigZPrice] = useState();
    const [ecoMullionPrice, setEcoMullionPrice] = useState();
    const [ecoBottomPrice, setEcoBottomPrice] = useState();
    const [ecoBeadingPrice, setEcoBeadingPrice] = useState();
    //////////////////////////////////////////////////////
    const [louterCornerPrice, setLouterCornerPrice] = useState();
    const [bigZCornerPrice, setBigZCornerPrice] = useState();
    const [adaptorBrushPrice, setAdaptorBrushPrice] = useState();
    const [projectedHingesPrice, setProjectedHingesPrice] = useState();
    const [hingesPrice, setHingesPrice] = useState();
    const [hingeHandlePrice, setHingeHandlePrice] = useState();
    const [ecoHingesPrice, setEcoHingesPrice] = useState();
    const [beadingRubberPrice, setBeadingRubberPrice] = useState();
    const [frameRubberPrice, setFrameRubberPrice] = useState();
    const [casementStopperPrice, setCasementStopperPrice] = useState();
    const [projectedHandlePrice, setProjectedHandlePrice] = useState();
    const [doorHandlePrice, setDoorHandlePrice] = useState();
    const [downCloserPrice, setDownCloserPrice] = useState();
    const [hingeDoorKeyPrice, setHingeDoorKeyPrice] = useState();
    const [towerBoltPrice, setTowerBoltPrice] = useState();
    const [installScrewsPrice, setInstallationScrewPrice] = useState();
    const [wallPlugsPrice, setWallPlugPrice] = useState();
    const [glassPrice, setGlassPrice] = useState();
    const [doorBrushPrice, setDoorBrushPrice] = useState();
    const [pipeHandlePrice, setPipeHandlePrice] = useState();
    const [] = useState();

    const [LOuterCost, setLouterCost] = useState();
    const [bigLCost, setBigLCost] = useState();
    const [smallTCost, setTCost] = useState();
    const [bigTCost, setBigTCost] = useState();
    const [ZCost, setZCost] = useState();
    const [mullionCost, setMullionCost] = useState();
    const [bottomCost, setbottomCost] = useState();
    const [adaptorCost, setAdaptorCost] = useState();
    const [beadingCost, setBeadingCost] = useState();
    const [louterCornersCost, setLouterCornersCost] = useState();
    const [bigZornersCost, setBigZCornersCost] = useState();
    const [hingesCost, setHingesCost] = useState();
    const [keysCost, setKeysCost] = useState();
    const [handlesCost, setHandlesCost] = useState();
    const [projectedHandleCost, setProjectedHandleCost] = useState();
    const [casementStopperCost, setCasementStopperCost] = useState();
    const [towerBoltCost, setTowerBoltCost] = useState();
    const [frameRubberCost, setFrameRubberCost] = useState();
    const [beadingRubberCost, setBeadingRubberCost] = useState();
    const [doorBrushCost, setDoorBrushCost] = useState();
    const [downCloserCost, setDownCloserCost] = useState();
    const [adaptorBrushCost, setAdaptorBrushCost] = useState();
    const [wallPlugCost, setWallPlugCost] = useState();
    const [] = useState();

    const [isMaterials, setMaterials] = useState(true);
    const [isMeasurements, setMeasurements] = useState(false);
    const [isDelete, setDelete] = useState(false);

    const [title, setTitle] = useState();
    const [colorTitle, setColorTitle] = useState();
    const [totalArea, setTotalArea] = useState(0);

    useEffect(() => {
        if (profileColor === 'white') {setColorTitle('White Profiles')}
        else if (profileColor === 'grey') {setColorTitle('Grey Profiles')}
        else if (profileColor === 'black') {setColorTitle('Black Profiles')}
        else if (profileColor === 'champagne') {setColorTitle('Champagne Profiles')}
        else if (profileColor === 'silver') {setColorTitle('Silver Profiles')}
        else if (profileColor === 'wood') {setColorTitle('Wood Profiles')}

        if (profileType === 'Italian') {
            if (workType === 'Projected') {
                setTitle('Italian Projected Windows');
            }
            else if (workType === 'Casement') {
                setTitle('Italian Casement Windows');
            }
            else if (workType === 'Hinge') {
                setTitle('Italian Hinge Door');
            }
            else if (workType === 'Swing') {
                setTitle('Italian Swing Door');
            }
            else if (workType === 'Fixed') {
                setTitle('Italian Fixed Windows');
            }

            setItalian(true);
        }

        else if (profileType === 'Eco') {
            if (workType === 'Projected') {
                setTitle('Eco Projected Windows');
            }
            else if (workType === 'Casement') {
                setTitle('Eco Casement Windows');
            }
            else if (workType === 'Hinge') {
                setTitle('Eco Hinge Door');
            }
            else if (workType === 'Fixed') {
                setTitle('Eco Fixed Windows');
            }

            setEco(true);
        }

        else if (profileType === 'Skit-60') {
            setTitle(`Skit-60 Sliding Windows`);
            setSkit60(true);
        }

        else if (profileType === 'KS-50') {
            setTitle(`KS-50 Sliding Windows`);
            setKs50(true);
        }

        else if (profileType === 'Trialco') {
            setTitle(`Trialco Sliding Windows`);
            setTrialco(true);
        }

        let area = 0;
        for (let i = 0; i < dimensions.length; i++) {
            area += dimensions[i].area;
        }
        setTotalArea(area);

    }, [])
    
    useEffect( () => {
        let framesCost, AccCost, totalCost;
        
        if (workType === 'Sliding' || workType === 'Sliding-division') {
            if (profileType === 'Skit-60') {
                const framePrice = priceList.outerPrice;
                const leafPrice = priceList.leafPrice;
                const divisionPrice = priceList.divisionPrice;
                const adaptorPrice = priceList.interlockPrice;
                const netLeafPrice = priceList.netLeafPrice;
                const fcornerPrice = priceList.frameCornerPrice;
                const lcornerPrice = priceList.leafCornerPrice;
                const nCornerPrice = priceList.netCornerPrice;
                const brushPrc = priceList.brushPrice;
                const rollerPrc = priceList.rollerPrice;
                const lockPrice = priceList.lockPrice;
                const handlePrice = priceList.netHandlePrice;
                const fiberNetPrc = priceList.fiberNetPrice;
                const glzRubPrc = priceList.glazingRubberPrice;
                const netRubPrc = priceList.netRubberPrice;
                const installScrewsPrice = priceList.installScrewsPrice;
                const wallPlugPrice = priceList.wallPlugPrice;

                setRoundFramePrice(framePrice);
                setSmallWallFramePrice(framePrice);
                setBigWallFramePrice(framePrice);
                setFlatLeafPrice(leafPrice);
                setRoundLeafPrice(leafPrice);
                setSmallNetLeafPrice(netLeafPrice);
                setBigNetLeafPrice(netLeafPrice);
                setInterlockPrice(adaptorPrice);
                setLeafDivisionPrice(divisionPrice);
                setFrameCornerPrice(fcornerPrice);
                setLeafCornerPrice(lcornerPrice);
                setNetCornerPrice(nCornerPrice);
                setBrushPrice(brushPrc);
                setRollerPrice(rollerPrc);
                setMetalLockPrice(lockPrice);
                setPressLockPrice(lockPrice);
                setSmallNetHandlePrice(handlePrice);
                setBigNetHandlePrice(handlePrice);
                setShortFiberNetPrice(fiberNetPrc);
                setLongFiberNetPrice(fiberNetPrc);
                setGlazingRubberPrice(glzRubPrc);
                setNetRubberPrice(netRubPrc);
                setInstallationScrewPrice(installScrewsPrice);
                setWallPlugPrice(wallPlugPrice);
                setGlassPrice(priceList.glassPrice);

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
                const framePrice = priceList.outerPrice;
                const leafPrice = priceList.leafPrice;
                const divisionPrice = priceList.divisionPrice;
                const adaptorPrice = priceList.interlockPrice;
                const netLeafPrice = priceList.netLeafPrice;
                const fcornerPrice = priceList.frameCornerPrice;
                const lcornerPrice = priceList.leafCornerPrice;
                const nCornerPrice = priceList.netCornerPrice;
                const brushPrc = priceList.brushPrice;
                const rollerPrc = priceList.rollerPrice;
                const lockPrice = priceList.lockPrice;
                const handlePrice = priceList.netHandlePrice;
                const fiberNetPrc = priceList.fiberNetPrice;
                const glzRubPrc = priceList.glazingRubberPrice;
                const netRubPrc = priceList.netRubberPrice;
                const installScrewsPrice = priceList.installScrewsPrice;
                const wallPlugPrice = priceList.wallPlugPrice;

                setKs50RoundFramePrice(framePrice);
                setKs50WallFramePrice(framePrice);
                setKs50LeafPrice(leafPrice);
                setSmallNetLeafPrice(netLeafPrice);
                setBigNetLeafPrice(netLeafPrice);
                setKs50InterlockPrice(adaptorPrice);
                setLeafDivisionPrice(divisionPrice);
                setO4CornerPrice(fcornerPrice);
                setFrameCornerPrice(fcornerPrice);
                setLeafCornerPrice(lcornerPrice);
                setNetCornerPrice(nCornerPrice);
                setBrushPrice(brushPrc);
                setHeavyDutyRollerPrice(rollerPrc);
                setPressLockPrice(lockPrice);
                setBigNetHandlePrice(handlePrice);
                setShortFiberNetPrice(fiberNetPrc);
                setLongFiberNetPrice(fiberNetPrc);
                setGlazingRubberPrice(glzRubPrc);
                setNetRubberPrice(netRubPrc);
                setInstallationScrewPrice(installScrewsPrice);
                setWallPlugPrice(wallPlugPrice);
                setGlassPrice(priceList.glassPrice);

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
                const framePrice = priceList.outerPrice;
                const leafPrice = priceList.leafPrice;
                const divisionPrice = priceList.divisionPrice;
                const adaptorPrice = priceList.interlockPrice;
                const netLeafPrice = priceList.netLeafPrice;
                const fcornerPrice = priceList.frameCornerPrice;
                const lcornerPrice = priceList.leafCornerPrice;
                const nCornerPrice = priceList.netCornerPrice;
                const brushPrc = priceList.brushPrice;
                const rollerPrc = priceList.rollerPrice;
                const lockPrice = priceList.lockPrice;
                const handlePrice = priceList.netHandlePrice;
                const fiberNetPrc = priceList.fiberNetPrice;
                const glzRubPrc = priceList.glazingRubberPrice;
                const netRubPrc = priceList.netRubberPrice;
                const installScrewsPrice = priceList.installScrewsPrice;
                const wallPlugPrice = priceList.wallPlugPrice;
                const kitPrice = priceList.kitPrice;
                
                setTrialcoRoundFramePrice(framePrice);
                setTrialcoWallFramePrice(framePrice);
                setTrialcoLeafPrice(leafPrice);
                setBigNetLeafPrice(netLeafPrice);
                setTrialcoInterlockPrice(adaptorPrice);
                setLeafDivisionPrice(divisionPrice);
                setO4CornerPrice(fcornerPrice);
                setFrameCornerPrice(fcornerPrice);
                setLeafCornerPrice(lcornerPrice);
                setNetCornerPrice(nCornerPrice);
                setBrushPrice(brushPrc);
                setTrialcoRollerPrice(rollerPrc);
                setPressLockPrice(lockPrice);
                setBigNetHandlePrice(handlePrice);
                setShortFiberNetPrice(fiberNetPrc);
                setLongFiberNetPrice(fiberNetPrc);
                setGlazingRubberPrice(glzRubPrc);
                setNetRubberPrice(netRubPrc);
                setInstallationScrewPrice(installScrewsPrice);
                setWallPlugPrice(wallPlugPrice);
                setTrialcoKitPrice(kitPrice);
                setGlassPrice(priceList.glassPrice);

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
                const lPrice = priceList.lPrice;
                const tPrice = priceList.tPrice;
                const beadingPrc = priceList.beadingPrc;
                const hingesPrc = priceList.hingesPrc;
                const handlePrc = priceList.handlePrc;
                const casementStoperPrc = priceList.casementStoperPrc;
                const frameRubberPrc = priceList.frameRubberPrc;
                const beadingRubberPrc = priceList.beadingRubberPrc;
                const louterCornerPrice = priceList.louterCornerPrice;
                const bigZCornerPrice = priceList.bigZCornerPrice;
                const doorBrushPrc = priceList.doorBrushPrc;
                const installScrewsPrice = priceList.installScrewsPrice;
                const wallPlugPrice = priceList.wallPlugPrice;

                setLouterPrice(lPrice);
                setBigLPrice(lPrice);
                setSmallTPrice(tPrice);
                setBigTPrice(tPrice);
                setBeadingPrice(beadingPrc);
                setLouterCornerPrice(louterCornerPrice);
                setBigZCornerPrice(bigZCornerPrice);
                setHingesPrice(hingesPrc);
                setProjectedHingesPrice(hingesPrc);
                setProjectedHandlePrice(handlePrc);
                setCasementStopperPrice(casementStoperPrc);
                setFrameRubberPrice(frameRubberPrc);
                setBeadingRubberPrice(beadingRubberPrc);
                setDoorBrushPrice(doorBrushPrc);
                setInstallationScrewPrice(installScrewsPrice);
                setWallPlugPrice(wallPlugPrice);
                setGlassPrice(priceList.glassPrice);


                setLouterCost(materialList.LOuter * lPrice);
                setTCost(materialList.small_big_T * tPrice);
                setBeadingCost(materialList.beading * beadingPrc);
                setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                setBigZCornersCost(materialList.bigLCorner * bigZCornerPrice);
                setHingesCost(materialList.hinges * hingesPrc); 
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
                const lPrice = priceList.lPrice;
                const tPrice = priceList.tPrice;
                const beadingPrc = priceList.beadingPrc;
                const hingesPrc = priceList.hingesPrc;
                const handlePrc = priceList.handlePrc;
                const casementStoperPrc = priceList.casementStoperPrc;
                const frameRubberPrc = priceList.frameRubberPrc;
                const beadingRubberPrc = priceList.beadingRubberPrc;
                const louterCornerPrice = priceList.louterCornerPrice;
                const bigZCornerPrice = priceList.bigZCornerPrice;
                const doorBrushPrc = priceList.doorBrushPrc;
                const installScrewsPrice = priceList.installScrewsPrice;
                const wallPlugPrice = priceList.wallPlugPrice;

                setECoLouterPrice(lPrice);
                setEcoBigLPrice(lPrice);
                setEcoSmallTPrice(tPrice);
                setEcoBigTPrice(tPrice);
                setEcoBeadingPrice(beadingPrc);
                setLouterCornerPrice(louterCornerPrice);
                setBigZCornerPrice(bigZCornerPrice);
                setEcoHingesPrice(hingesPrc);
                setProjectedHingesPrice(hingesPrc);
                setProjectedHandlePrice(handlePrc);
                setCasementStopperPrice(casementStoperPrc);
                setFrameRubberPrice(frameRubberPrc);
                setBeadingRubberPrice(beadingRubberPrc);
                setDoorBrushPrice(doorBrushPrc);
                setInstallationScrewPrice(installScrewsPrice);
                setWallPlugPrice(wallPlugPrice);
                setGlassPrice(priceList.glassPrice);


                setLouterCost(materialList.LOuter * lPrice);
                setTCost(materialList.small_big_T * tPrice);
                setBeadingCost(materialList.beading * beadingPrc);
                setLouterCornersCost(materialList.louterCorner * louterCornerPrice);
                setProjectedHandleCost(materialList.handles * handlePrc);
                setHingesCost(materialList.hinges * hingesPrc);
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

            
            if (workType === 'Projected') {
                setProjected(true);
            }
            else {
                setCasement(true)
            }
        }
        else if (workType === 'Hinge') {
            if (profileType === 'Italian') {
                const lPrice = priceList.lPrice;
                const zPrice = priceList.zPrice;
                const tPrice = priceList.tPrice;
                const divisionPrice = priceList.divisionPrice;
                const bottomPrc = priceList.bottomPrc;
                const beadingPrc = priceList.beadingPrc;
                const adatorPrc = priceList.adatorPrc;
                const hingesPrc = priceList.hingesPrc;
                const handlePrc = priceList.handlePrc;
                const doorKeyPrc = priceList.doorKeyPrc;
                const towerBoltPrc = priceList.towerBoltPrc;
                const frameRubberPrc = priceList.frameRubberPrc;
                const beadingRubberPrc = priceList.beadingRubberPrc;
                const louterCornerPrice = priceList.louterCornerPrice;
                const bigZCornerPrice = priceList.bigZCornerPrice;
                const doorBrushPrc = priceList.doorBrushPrc;
                const installScrewsPrice = priceList.installScrewsPrice;
                const wallPlugPrice = priceList.wallPlugPrice;

                setLouterPrice(lPrice);
                setBigLPrice(lPrice);
                setBigZPrice(zPrice);
                setSmallTPrice(tPrice);
                setBigTPrice(tPrice);
                setMullionPrice(divisionPrice);
                setBottomPrice(bottomPrc);
                setBeadingPrice(beadingPrc);
                setHingeAdaptorPrice(adatorPrc);
                setLouterCornerPrice(louterCornerPrice);
                setBigZCornerPrice(bigZCornerPrice);
                setHingesPrice(hingesPrc);
                setHingeHandlePrice(handlePrc);
                setHingeDoorKeyPrice(doorKeyPrc);
                setTowerBoltPrice(towerBoltPrc);
                setFrameRubberPrice(frameRubberPrc);
                setBeadingRubberPrice(beadingRubberPrc);
                setDoorBrushPrice(doorBrushPrc);
                setInstallationScrewPrice(installScrewsPrice);
                setWallPlugPrice(wallPlugPrice);
                setGlassPrice(priceList.glassPrice);


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
                const lPrice = priceList.lPrice;
                const zPrice = priceList.zPrice;
                const tPrice = priceList.tPrice;
                const divisionPrice = priceList.divisionPrice;
                const bottomPrc = priceList.bottomPrc;
                const beadingPrc = priceList.beadingPrc;
                const hingesPrc = priceList.hingesPrc;
                const handlePrc = priceList.handlePrc;
                const doorKeyPrc = priceList.doorKeyPrc;
                const towerBoltPrc = priceList.towerBoltPrc;
                const frameRubberPrc = priceList.frameRubberPrc;
                const beadingRubberPrc = priceList.beadingRubberPrc;
                const louterCornerPrice = priceList.louterCornerPrice;
                const bigZCornerPrice = priceList.bigZCornerPrice;
                const doorBrushPrc = priceList.doorBrushPrc;
                const installScrewsPrice = priceList.installScrewsPrice;
                const wallPlugPrice = priceList.wallPlugPrice;

                setECoLouterPrice(lPrice);
                setEcoBigLPrice(lPrice);
                setEcoBigZPrice(zPrice);
                setEcoSmallTPrice(tPrice);
                setEcoBigTPrice(tPrice);
                setEcoMullionPrice(divisionPrice);
                setEcoBottomPrice(bottomPrc);
                setEcoBeadingPrice(beadingPrc);
                setLouterCornerPrice(louterCornerPrice);
                setBigZCornerPrice(bigZCornerPrice);
                setHingesPrice(hingesPrc);
                setHingeHandlePrice(handlePrc);
                setHingeDoorKeyPrice(doorKeyPrc);
                setTowerBoltPrice(towerBoltPrc);
                setFrameRubberPrice(frameRubberPrc);
                setBeadingRubberPrice(beadingRubberPrc);
                setDoorBrushPrice(doorBrushPrc);
                setInstallationScrewPrice(installScrewsPrice);
                setWallPlugPrice(wallPlugPrice);
                setGlassPrice(priceList.glassPrice);

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
            const lPrice = priceList.lPrice;
            const tPrice = priceList.tPrice;
            const divisionPrice = priceList.divisionPrice;
            const bottomPrc = priceList.bottomPrc;
            const brushAdaptorPrc = priceList.brushAdaptorPrc;
            const beadingPrc = priceList.beadingPrc;
            const downCloserPrc = priceList.downCloserPrc;
            const handlePrc = priceList.handlePrc;
            const doorKeyPrc = priceList.doorKeyPrc;
            const towerBoltPrc = priceList.towerBoltPrc;
            const frameRubberPrc = priceList.frameRubberPrc;
            const beadingRubberPrc = priceList.beadingRubberPrc;
            const louterCornerPrice = priceList.louterCornerPrice;
            const bigZCornerPrice = priceList.bigZCornerPrice;
            const adaptorBrushPrc = priceList.adaptorBrushPrc;
            const installScrewsPrice = priceList.installScrewsPrice;
            const wallPlugPrice = priceList.wallPlugPrice;

            setBigLPrice(lPrice);
            setSmallTPrice(tPrice);
            setBigTPrice(tPrice);
            setMullionPrice(divisionPrice);
            setBottomPrice(bottomPrc);
            setBeadingPrice(beadingPrc);
            setBrushAdaptorPrice(brushAdaptorPrc);
            setBigZCornerPrice(bigZCornerPrice);
            setDownCloserPrice(downCloserPrc);
            setPipeHandlePrice(handlePrc);
            setHingeDoorKeyPrice(doorKeyPrc);
            setTowerBoltPrice(towerBoltPrc);
            setFrameRubberPrice(frameRubberPrc);
            setBeadingRubberPrice(beadingRubberPrc);
            setAdaptorBrushPrice(adaptorBrushPrc);
            setInstallationScrewPrice(installScrewsPrice);
            setWallPlugPrice(wallPlugPrice);
            setGlassPrice(priceList.glassPrice);

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
                const lPrice = priceList.lPrice;
                const tPrice = priceList.tPrice;
                const beadingPrc = priceList.beadingPrc;
                const frameRubberPrc = priceList.frameRubberPrc;
                const beadingRubberPrc = priceList.beadingRubberPrc;
                const louterCornerPrice = priceList.louterCornerPrice;
                const installScrewsPrice = priceList.installScrewsPrice;
                const wallPlugPrice = priceList.wallPlugPrice;

                setLouterPrice(lPrice);
                setBigLPrice(lPrice);
                setSmallTPrice(tPrice);
                setBigTPrice(tPrice);
                setBeadingPrice(beadingPrc);
                setLouterCornerPrice(louterCornerPrice);
                setBigZCornerPrice(louterCornerPrice);
                setFrameRubberPrice(frameRubberPrc);
                setBeadingRubberPrice(beadingRubberPrc);
                setInstallationScrewPrice(installScrewsPrice);
                setWallPlugPrice(wallPlugPrice);
                setGlassPrice(priceList.glassPrice);

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
                const lPrice = priceList.lPrice;
                const tPrice = priceList.tPrice;
                const beadingPrc = priceList.beadingPrc;
                const frameRubberPrc = priceList.frameRubberPrc;
                const beadingRubberPrc = priceList.beadingRubberPrc;
                const louterCornerPrice = priceList.louterCornerPrice;
                const installScrewsPrice = priceList.installScrewsPrice;
                const wallPlugPrice = priceList.wallPlugPrice;

                setECoLouterPrice(lPrice);
                setEcoBigLPrice(lPrice);
                setEcoSmallTPrice(tPrice);
                setEcoBigTPrice(tPrice);
                setEcoBeadingPrice(beadingPrc);
                setLouterCornerPrice(louterCornerPrice);
                setBigZCornerPrice(louterCornerPrice);
                setFrameRubberPrice(frameRubberPrc);
                setBeadingRubberPrice(beadingRubberPrc);
                setInstallationScrewPrice(installScrewsPrice);
                setWallPlugPrice(wallPlugPrice);
                setGlassPrice(priceList.glassPrice);

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
        
        let glasPrice = priceList.glassPrice;
        
        totalCost = framesCost + materialList.glassSheet * glasPrice + AccCost;
        
        setGlassTotalCost(materialList.glassSheet * glasPrice)
        setFramesCost(framesCost),
        setAccessoriesCost(AccCost);
        setProjectTotalCost(totalCost);
        
    }, [profileType]);

    const removeAsyncMeas = async (id) => {
        try {
            alufappContext.removeMatWork(workIndex);
            const removedItem = await AsyncStorage.removeItem(id);
            alufappContext.showToast();
            alufappContext.setWhichToast('mat-deletion-toast');
            // ToastAndroid.show("Work removed successfully", 3000);
        } catch (e) {
            console.log(e)
            // ToastAndroid.show("Failed to remove work", 3000);
        }
    }

    return (
        <View style={styles.container}>
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
                <View style={styles.headerDetail}>
                    <Text style={styles.txtWorkType}>{title}</Text>
                    <Text style={styles.txtProfileColor}>{colorTitle}</Text>
                </View>
                <View style={styles.tabsContainer}>
                    <Pressable style={({pressed}) => [
                        styles.btnSave,
                        pressed && {opacity: 0.3}
                    ]}
                    onPress={() => {
                        if (!isMaterials) {
                            setMeasurements(false);
                            setMaterials(true);
                        }
                    }}
                    >
                        <Ionicons name="reader-outline" size={15} color={isMaterials ? 'navy' : '#020100'}/>
                        <Text style={[styles.txtBtnSave, {
                            color: isMaterials ? 'navy' : 'black',
                            fontWeight: isMaterials ? 'bold' : ''
                        }]}>Materials</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [
                        styles.btnSave,
                        pressed && {opacity: 0.3}
                    ]}
                    onPress={() => {
                        if (!isMeasurements) {
                            setMeasurements(true);
                            setMaterials(false);
                        }
                    }}
                    >
                        <Ionicons name="create-outline" size={15} color={isMeasurements ? 'navy' : '#020100'}/>
                        <Text style={[styles.txtBtnSave, 
                            {
                                color: isMeasurements ? 'navy' : 'black',
                                fontWeight: isMeasurements ? 'bold' : ''
                            }]}>Measurements</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [
                        styles.btnSave,
                        pressed && {opacity: 0.3}
                    ]}
                    onPress={() => {
                        const res = window.confirm('Work would be removed permanently!');
                        if (res) {
                            removeAsyncMeas(id);
                            navigation.goBack();
                        }
                    }}
                    >
                        <Ionicons name="trash-bin-outline" size={14} color='#020100'/>
                        <Text style={styles.txtBtnSave}>Delete</Text>
                    </Pressable>
                </View>
            </View>
            <View style={[styles.materialListHeader, {display: isMaterials ? 'flex' : 'none'}]}>
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
            <ScrollView style={[styles.materialListCon, {display: isMaterials ? 'flex' : 'none'}]}>
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
                                        (profileType === 'KS-50' && frameType === 'wall-frame' ? 'KS-50 Wall Frame' : (profileType === 'Trialco' && frameType === 'round-frame' ? 'Trialco Round Frame' :
                                            (profileType === 'KS-50' && frameType === 'small-wall-frame' ? 'KS-50 Wall Frame' : (profileType === 'KS-50' && frameType === 'big-wall-frame' ? 'KS-50 Wall Frame' :
                                                'Trialco Wall Frame'
                                            ))
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
                                        (profileType === 'KS-50' && frameType === 'wall-frame' ? ks50WallFramePrice : (profileType === 'Trialco' && frameType === 'round-frame' ? trialcoRoundFramePrice :
                                            (profileType === 'KS-50' && frameType === 'small-wall-frame' ? ks50WallFramePrice : (profileType === 'KS-50' && frameType === 'big-wall-frame' ? ks50WallFramePrice :
                                                trialcoWallFramePrice
                                            ))
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
                            <Text style={styles.txtMaterialCell}>Pipe Handle</Text>
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
            <View style={[styles.bottomBtnsCon, {display: isMaterials ? 'flex' : 'none'}]}>
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
            <View style={[
                styles.measurementLabel,
                {display: isMeasurements ? 'flex' : 'none'}
                ]}>
                {/* <Text style={styles.txtMsLabel}>Measurement</Text> */}
            </View>
            <ScrollView
                style={[styles.dimemsionsView, {display: isMeasurements ? 'flex' : 'none'}]}>
                {
                    dimensions.map((dimension, index) => (
                        <View style={styles.msCon} key={'ms-con'+index}>
                            <View style={styles.btnMsInfo}>
                                <View style={styles.msInfoNum}>
                                    <Text style={styles.txtMsInfoNum}>{dimension.num}.</Text>
                                </View>
                                <View style={styles.msInfoDims}>
                                    <Text style={styles.txtMsInfoDims}>{dimension.width}  x  {dimension.height}</Text>
                                </View>
                                <View style={styles.msInfoBay}>
                                    <Text style={styles.txtMsInfoBay}>{workType === 'Sliding' || workType === 'Sliding-division' ? dimension.bay : dimension.openingCount}
                                    {workType === 'Sliding' || workType === 'Sliding-division' ?  ' bay' : ' open'}</Text>
                                </View>
                                <View style={styles.msInfoQty}>
                                    <Text style={styles.txtMsInfoQty}>{dimension.qty} {dimension.qty > 1 ? 'pieces' : 'piece'}</Text>
                                </View>
                            </View>
                        </View>
                    ))
                }
                <View style={styles.totalCon}>
                    <Text style={styles.txtTotalSquare}>{Math.round(totalArea * 100) / 100}msq</Text>
                    <Text style={styles.txtTotalQty}>{totalPieces} {totalPieces > 1 ? 'pieces' : 'piece'}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default MatSavedWorkList;

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
    },
    backBtn: {
        paddingHorizontal: 20,
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
    txtProfileColor : {
        letterSpacing: 3,
        fontSize: 14,
        marginBottom: 10,
        color: 'maroon'
    },
    txtProfileType : {
        letterSpacing: 3,
        fontSize: 16,
        color: '#546A7B',
        fontWeight: '500',
    },
    tabsContainer : {
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
        color: 'rgba(255, 255, 255, 1)'
    },
    txtError : {
        color: 'red',
        fontSize: 12,
        fontStyle: 'italic',
        letterSpacing: 3,
        marginBottom: 10,
    },
    measurementLabel: {
        paddingVertical: 10,
    },
    txtMsLabel: {
        textAlign: 'center',
        letterSpacing: 3,
        color: 'navy',
        fontSize: 16,
    },
    dimemsionsView: {
        height: 1,
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
});