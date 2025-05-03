import { createContext, useReducer } from "react";

export const AlufappContext = createContext({
    // SHEET CALCULATOR DECLARATIONS
    dimensions: [],
    pushDimensions: (quantity) => {},
    clearDimensions: () => {},
    addDimension: (id, width, height, quantity, valid) => {},

    sheetCalcUsage: null,
    setSheetCalcUsage: (usage) => {},

    matCalcusage: null,
    setMatCalUsage: (usage) => {},

    isSheetCalcLimited: true,
    setSheetCalcLimited: () => {},
    setSheetCalcUnlimited: () => {},

    isMaterialCalcLimited: true,
    setMaterialCalcLimited: () => {},
    setMaterialCalcUnlimited: () => {},

    previousWorkArea: null,
    setWorkArea: () => {},

    allQty: null,
    setAllQty: (qty) => {},
    
    isInternet: true,
    setIsInternet: (value) => {},

    offlineModalVisible: false,
    setOfflineModalVisible: (value) => {},

    inchDecimals: [],
    pushInchDecimal: (decimal) => {},
    resetInchDecimals: () => {},

    inchAddId: null,
    setInchAddId: (id) => {},

    prevDimensions: [],
    setPrevDimensions: (dimensions) => {},

    validity: [],
    initiateValidity: (id, widthValid, heightValid, qtyValid) => {},

    pieces: 0,
    incPieces: (value) => {},
    decPieces: (value) => {},

    works: [],
    saveWork: (id, title, totalSheet, totalPieces, numOfWindows, dimensions, diagramArray, sheetSize, unit) => {},
    removeWork: () => {},
    setWorks: (works) => {},

    refresh: true,
    onRefresh: () => {},
    offRefresh: () => {},

    worksVisible: false,
    showWorks: () => {},
    closeWorks: () => {},

    settingsVisible: false,
    showSettings: () => {},
    closeSettings: () => {},

    languagesVisible: false,
    showLanguages: () => {},
    closeLanguagess: () => {},

    developerVisible: false,
    showDeveloper: () => {},
    closeDeveloper: () => {},

    versionVisible: false,
    showVersion: () => {},
    closeVersion: () => {},

    removeAdsVisible: false,
    showRemoveAds: () => {},
    closeRemoveAds: () => {},

    loading: false,
    showLoading: () => {},
    closeLoading: () => {},

    isToast: false,
    showToast: () => {},
    closeToast: () => {},

    isWhichToast: null,
    setWhichToast: (page) => {},

    language: 'English',
    setEnglish: () => {},
    setFrench: () => {},

    alertVisible: false,
    showAlert: () => {},
    closeAlert: () => {},

    isAllQtyAlert: false,
    showAllQtyAlert: () => {},
    closeAllQtyAlert: () => {},

    workIndex: null,
    setWorkIndex: (workIndex) => {},

    viewWork: null,
    setViewWork: (work) => {},

    sheetCount: 0,
    increaseSheet: () => {},
    decreseSheet: () => {},

    numOfWindows: 0,
    setNumOfWindows: () => {},

    loadingComponent: null,
    setLoadingComponent: (component) => {},
    // --- SHEET CALCULATOR DECLARATIONS END -----------

    // ALUFAB DECLARATIONS
    priceList: null,
    setPriceList: (priceList) => {},

    materialList: null,
    setMaterialList: (materialList) => {},

    savedWorkList: [],
    setMatWorks: (works) => {},
    saveMatWork: (work) => {},
    removeMatWork: (index) => {},

    measurementsList: [],
    addMeasurementList: (list) => {},
    removeMeasurementList: (index) => {},
    setmeasurementList: (list) => {},

    openingsMeasurement: [],
    pushOpening: (opening) => {},
    popOpening: (opening) => {},

    isOpening: false,
    setIsOpening: (status) => {},

    isAlertVisible: false,
    closeAlert: () => {},
    showAlert: () => {},

    isLoading: false,
    closeLoading: () => {},
    showLoading: () => {},

    isLaunch: true,
    closeLaunch: () => {},

    prevWorkArea: null,
    setPreviousWorkArea: () => {},

    currentWorkArea: null,
    setCurrentWorkArea: () => {},
    // ---  ALUFAB DECLARATIONS END ---
});

// --- SHEET CALCULATOR FUNCTIONS ---
function sheetCalcUsageReducer(state, action) {
    switch(action.type) {
        case 'SET': 
            return state = action.payload;
        default:
            return;
    }
}

function matCalcUsageReducer(state, action) {
    switch(action.type) {
        case 'SET': 
            return state = action.payload;
        default:
            return;
    }
}

function workAreaReducer(state, action) {
    switch(action.type) {
        case 'SET': 
            return state = action.payload;
        default:
            return;
    }
}

function inchAddIdReducer(state, action) {
    if (action.type === 'SET') {
        return state = action.payload;
    }
    else {return}
}

function inchDecimalsReducer(state, action) {
    switch(action.type) {
        case 'PUSH': 
            return state = [...state, action.payload];
        case 'RESET':
            return state = action.payload;
    }
}

function refreshRducer(state, action) {
    switch (action.type) {
        case 'ON':
            return state = action.payload;
        case 'OFF': 
            return state = action.payload;
        default:
            return;
    }
}

function unitReducer(state, action) {
    switch(action.type) {
        case 'SET':
            return state = action.payload;
        default:
            return;
    }
}

function allQtyReducer(state, action) {
    switch(action.type) {
        case 'SET':
            return state = action.payload;
        default:
            return;
    }
}

function workReducer(state, action) {
    switch(action.type) {
        case 'SAVE': 
            return [
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    totalSheet: action.payload.totalSheet,
                    totalPieces: action.payload.totalPieces,
                    numOfWindows: action.payload.numOfWindows,
                    dimensions: action.payload.dimensions,
                    diagramArray: action.payload.diagramArray,
                    sheetSize: action.payload.sheetSize,
                    unit: action.payload.unit
                }, ...state
            ];

        case 'REMOVE':
            let workIndex;
            for (let i = 0; i < state.length; i++) {
                if (action.payload.id === state[i].id && action.payload.title === state[i].title) {
                    workIndex = i;
                    break;
                }
            };
            // state.splice(workIndex, 1);
            // return state;
            return state.filter(work => {
                return work.id !== action.payload.id;
            })
        case 'SET':
            return state = action.payload;
        default:
            return;
    }
}

function piecesReducer(state, action) {
    switch(action.type) {
        case "INCREASE":
            return state + action.payload;
        case "DECREASE":
            return state - action.payload;
        default:
            return;
    }
}

function dimensionsReducer (state, action) {
    switch (action.type) {
        case "PUSH":
            state = [];
            for (let i = 0; i < action.payload; i++) {
                state.push({
                    id: i,
                    width: '',
                    height: '',
                    quantity: '',
                    widthValid: null,
                    heightValid: null,
                    qtyValid: null,
                    inchWidthDec: 0,
                    inchHeightDec: 0,
                });
            }
            return state; 
        case "CLEAR":
            return state = [];
        case "ADD":
            const dimensionIndex = action.payload.id;
            return state[dimensionIndex] = action.payload;
        default: 
            return;
    }
};

function prevDimensionsReducer(state, action) {
    switch(action.type) {
        case 'SET':
            return state = action.payload;
        default:
            return;
    }
}

function validityReducer(state, action) {
    switch(action.type) {
        case "INITIATE": 
            state = [];
            for (let i = 0; i < action.payload; i++) {
                state.push({
                    id: i,
                    widthValid: null,
                    heightValid: null,
                    qtyValid: null,
                });
            }
        default:
            return;
    }
}

function worksModalReducer(state, action) {
    switch (action.type) {
        case "SHOW":
            return state = action.payload;
        case "CLOSE":
            return state = action.payload;
        default:
            return;
    }
}

function settingsReducer(state, action) {
    switch (action.type) {
        case "SHOW":
            return state = action.payload;
        case "CLOSE":
            return state = action.payload;
        default:
            return;
    }
}

function alertReducer(state, action) {
    switch (action.type) {
        case "SHOW":
            return state = action.payload;
        case "CLOSE":
            return state = action.payload;
        default:
            return;
    }
}

function allQtyAlertReducer(state, action) {
    switch (action.type) {
        case "SHOW":
            return state = action.payload;
        case "CLOSE":
            return state = action.payload;
        default:
            return;
    }
}

function setLanguageReducer(state, action) {
    switch (action.type) {
        case 'ENG': 
            return state = action.payload;
        case 'FRN':
            return state = action.payload;
        default: return;
    }
}

function languagesReducer(state, action) {
    switch (action.type) {
        case "SHOW":
            return state = action.payload;
        case "CLOSE":
            return state = action.payload;
        default:
            return;
    }
}

function versionReducer(state, action) {
    switch (action.type) {
        case "SHOW":
            return state = action.payload;
        case "CLOSE":
            return state = action.payload;
        default:
            return;
    }
}

function developerReducer(state, action) {
    switch (action.type) {
        case "SHOW":
            return state = action.payload;
        case "CLOSE":
            return state = action.payload;
        default:
            return;
    }
}

function removeAdsReducer(state, action) {
    switch (action.type) {
        case "SHOW":
            return state = action.payload;
        case "CLOSE":
            return state = action.payload;
        default:
            return;
    }
}

function sheetCalcLimitedReducer(state, action) {
    switch (action.type) {
        case "LIMITED":
            return state = action.payload;
        case "UNLIMITED":
            return state = action.payload;
        default:
            return;
    }
}

function materialCalcLimitedReducer(state, action) {
    switch (action.type) {
        case "LIMITED":
            return state = action.payload;
        case "UNLIMITED":
            return state = action.payload;
        default:
            return;
    }
}

function loadingReducer(state, action) {
    switch (action.type) {
        case "SHOW":
            return state = action.payload;
        case "CLOSE":
            return state = action.payload;
        default:
            return;
    }
}

function toastReducer(state, action) {
    switch (action.type) {
        case "SHOW":
            return state = action.payload;
        case "CLOSE":
            return state = action.payload;
        default:
            return;
    }
}

function whichToastReducer(state, action) {
    switch(action.type) {
        case 'PAGE':
            return state = action.payload;
        default:
            return;
    }
}

function sheetCountReducer(state, action) {
    switch(action.type) {
        case "INCREASE":
            return state += 1;
        case "DECREASE":
            return state -= 1;
        default: 
            return;
    }
}

function viewWorkReducer(state, action) {
    switch (action.type) {
        case 'SET': 
            return state = action.payload;
        default:
            return;
    }
}

function workIndexReducer(state, action) {
    switch (action.type) {
        case 'SET': 
            return state = action.payload;
        default:
            return;
    }
}

function loadingComponentReducer(state, action) {
    switch (action.type) {
        case 'SET': 
            return state = action.payload;
        default:
            return;
    }
}

function isInternetReducer(state, action) {
    switch(action.type) {
        case 'SET':
            return state = action.payload;
        default:
            return;
    }
}

function offlineModalReducer(state, action) {
    switch(action.type) {
        case 'SET':
            return state = action.payload;
        default:
            return;
    }
}
// --- SHEET CALCULATOR REDUCER FUNCTIONS END ---

// ALUFAB REDUCER FUNCTIONS
function priceListReducer(state, action) {
    switch(action.type) {
        case 'SET': 
            return state = action.payload;
        default:
            return;
    }
}

function materialListReducer(state, action) {
    switch(action.type) {
        case 'SET': 
            return state = action.payload;
        default:
            return;
    }
}


function measurementReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            return state = [action.payload, ...state];
        case 'REMOVE':
            state.splice(action.payload, 1);
            return state;
        case 'SET':
            return state = action.payload;
    }
}

function saveWorkReducer(state, action) {
    switch(action.type) {
        case 'SET':
            return state = action.payload;
        case 'SAVE':
            return state = [action.payload, ...state];
        case 'REMOVE':
            state.splice(action.payload, 1);
            return state;
        default:
            return;
    }
}

function openingsReducer(state, action) {
    switch (action.type) {
        case 'PUSH':
            return state = action.payload;
        case 'POP': 
            let index;
            for (let i = 0; i < state.length; i++) {
                if (state[i].width === action.payload.width && state[i].height === action.payload.height) {
                    index = i;
                }
            }
            return state.splice(index, 1);
        default:
            return;
    }
}

function isOpeningReducer(state, action) {
    switch (action.type) {
        case 'SET':
            return state = action.payload;
        default:
            return;
    }
}

function previousWorkAreaReducer(state, action) {
    switch(action.type) {
        case 'SET': 
            return state = action.payload;
        default:
            return;
    }
}

function currentWorkAreaReducer(state, action) {
    switch(action.type) {
        case 'SET': 
            return state = action.payload;
        default:
            return;
    }
}
// ALUFAB REDUCER FUNCTIONS END ---

function AlufappContextProvider({ children }) {
    // SHEEET CALCULATOR -------------
    const [sheetCalUsageState, sheetCalcUsageDispatch] = useReducer(sheetCalcUsageReducer, null);
    const [matCalcUsageState, matCalcUsageDispatch] = useReducer(matCalcUsageReducer, null);
    const [workAreaState, workAreaDispatch] = useReducer(workAreaReducer, null);
    const [inchAddIdState, inchAddIdDispatch] = useReducer(inchAddIdReducer, null);
    const [incDecimalsState, inchDecimalsDispatch] = useReducer(inchDecimalsReducer, []);
    const [unitState, unitDispatch] = useReducer(unitReducer, false);
    const [allQtyState, allQtyDispatch] = useReducer(allQtyReducer, null);
    const [prevDimensionsState, prevDimensionsDispatch] = useReducer(prevDimensionsReducer, []);
    const [refreshState, refreshDispatch] = useReducer(refreshRducer, true);
    const [worksModalState, worksModalDispatch] = useReducer(worksModalReducer, false);
    const [settingsState, settingsDispatch] = useReducer(settingsReducer, false);
    const [languagesState, languagesDispatch] = useReducer(languagesReducer, false);
    const [setLanguageState, setLanguageDispatch] = useReducer(setLanguageReducer, 'English');
    const [versionState, versionDispatch] = useReducer(versionReducer, false);
    const [developerState, developerDispatch] = useReducer(developerReducer, false);
    const [removeAdsState, removeAdsDispatch] = useReducer(removeAdsReducer, false);
    const [loadingState, loadingDispatch] = useReducer(loadingReducer, false);
    const [toastState, toastDispatch] = useReducer(toastReducer, false);
    const [whichToastState, whichToastDispatch] = useReducer(whichToastReducer, false);
    const [sheetCalcLimitedState, sheetCalcLimitedDispatch] = useReducer(sheetCalcLimitedReducer, true);
    const [materialCalcLimitedState, materialCalcLimitedDispatch] = useReducer(materialCalcLimitedReducer, true);
    const [alertState, alertDispatch] = useReducer(alertReducer, false);
    const [allQtyAlertState, allQtyAlertDispatch] = useReducer(allQtyAlertReducer, false);
    const [workIndexState, workIndexDispatch] = useReducer(workIndexReducer, null);
    const [viewWorkState, viewWorkDispatch] = useReducer(viewWorkReducer, null);
    const [sheetCountState, sheetCountDispatch] = useReducer(sheetCountReducer, 0);
    const [dimensionsState, dimensionsDispatch] = useReducer(dimensionsReducer, []);
    const [piecesState, piecesDispatch] = useReducer(piecesReducer, 0);
    const [validityState, validityDispatch] = useReducer(validityReducer, []);
    const [workState, workDispatch] = useReducer(workReducer, []);
    const [loadingComponentState, loadingComponentDispatch] = useReducer(loadingComponentReducer, null);
    const [isInternetState, isInternetDispatch] = useReducer(isInternetReducer, true);
    const [offlineModalState, offlineModalDispatch] = useReducer(offlineModalReducer, false);

    function setSheetCalcUsage(usage) {
        sheetCalcUsageDispatch({ type: 'SET', payload: usage});
    }

    function setMatCalUsage(usage) {
        matCalcUsageDispatch({ type: 'SET', payload: usage});
    }

    function setWorkArea(area) {
        workAreaDispatch({ type: 'SET', payload: area});
    }

    function setIsInternet(value) {
        isInternetDispatch({ type: 'SET', payload: value });
    }
    function setOfflineModalVisible(value) {
        offlineModalDispatch({ type: 'SET', payload: value });
    }
    function setUnit(unit) {
        unitDispatch({ type: 'SET', payload: unit });
    }

    function setAllQty(qty) {
        allQtyDispatch({ type: 'SET', payload: qty });
    }

    function setInchAddId(id) {
        inchAddIdDispatch({ type: 'SET', payload: id });
    }

    function pushInchDecimal(decimal) {
        inchDecimalsDispatch({ type: 'PUSH', payload: decimal })
    }
    function resetInchDecimals() {
        inchDecimalsDispatch({ type: 'RESET', payload: [] })
    }

    function setPrevDimensions(dimensions) {
        prevDimensionsDispatch({ type:'SET', payload: dimensions});
    }

    function onRefresh() {
        refreshDispatch({ type: "ON", payload: true });
    }
    function offRefresh() {
        refreshDispatch({ type: "OFF", payload: false });
    }

    function incPieces(value) {
        piecesDispatch({ type: "INCREASE", payload: value});
    }

    function decPieces(value) {
        piecesDispatch({ type: "DECREASE", payload: value});
    }

    function pushDimensions(numberOfWindows) {
        dimensionsDispatch({type: "PUSH", payload: numberOfWindows})
    }

    function clearDimensions() {
        dimensionsDispatch({ type: "CLEAR" });
    }

    function addDimension(id, width, height, quantity, valid) {
        dimensionsDispatch({ type: "ADD", payload: {id: id, width: width, height: height, quantity: quantity, valid: valid} })
    }

    function showWorks() {
        worksModalDispatch({ type: "SHOW", payload: true });
    }

    function closeWorks() {
        worksModalDispatch({ type: "CLOSE", payload: false });
    }

    function showSettings() {
        settingsDispatch({ type: "SHOW", payload: true });
    }

    function closeSettings() {
        settingsDispatch({ type: "CLOSE", payload: false });
    }

    function setEnglish() {
        setLanguageDispatch({type: "ENG", payload: "English"});
    }

    function setFrench() {
        setLanguageDispatch({type: "FRN", payload: "French"});
    }

    function showLanguages() {
        languagesDispatch({ type: "SHOW", payload: true });
    }

    function closeLanguages() {
        languagesDispatch({ type: "CLOSE", payload: false });
    }

    function showVersion() {
        versionDispatch({ type: "SHOW", payload: true });
    }

    function closeVersion() {
        versionDispatch({ type: "CLOSE", payload: false });
    }

    function showDeveloper() {
        developerDispatch({ type: "SHOW", payload: true });
    }

    function closeDeveloper() {
        developerDispatch({ type: "CLOSE", payload: false });
    }

    function showRemoveAds() {
        removeAdsDispatch({ type: "SHOW", payload: true });
    }

    function closeRemoveAds() {
        removeAdsDispatch({ type: "CLOSE", payload: false });
    }

    function showLoading() {
        loadingDispatch({ type: "SHOW", payload: true });
    }

    function closeLoading() {
        loadingDispatch({ type: "CLOSE", payload: false });
    }

    function showToast() {
        toastDispatch({ type: "SHOW", payload: true });
    }
    function setWhichToast(page) {
        whichToastDispatch({ type: "PAGE", payload: page });
    }

    function closeToast() {
        toastDispatch({ type: "CLOSE", payload: false });
    }

    function setSheetCalcLimited() {
        sheetCalcLimitedDispatch({ type: "LIMITED", payload: true });
    }
    function setSheetCalcUnlimited() {
        sheetCalcLimitedDispatch({ type: "UNLIMITED", payload: false });
    }

    function setMaterialCalcLimited() {
        materialCalcLimitedDispatch({ type: "LIMITED", payload: true });
    }
    function setMaterialCalcUnlimited() {
        materialCalcLimitedDispatch({ type: "UNLIMITED", payload: false });
    }

    function increaseSheet() {
        sheetCountDispatch({ type: "INCREASE", payload: 1})
    }

    function showAlert() {
        alertDispatch({type: "SHOW", payload: true});
    }

    function closeAlert() {
        alertDispatch({type: "CLOSE", payload: false});
    }

    function showAllQtyAlert() {
        allQtyAlertDispatch({type: "SHOW", payload: true});
    }

    function closeAllQtyAlert() {
        allQtyAlertDispatch({type: "CLOSE", payload: false});
    }

    function decreaseSheet() {
        sheetCountDispatch({ type: "DECREASE", payload: 1})
    }

    function setWorkIndex(workIndex) {
        workIndexDispatch({type: 'SET', payload: workIndex});
    }

    function setViewWork(work) {
        viewWorkDispatch({type: 'SET', payload: work});
    }

    function initiateValidity(id, widthValid, heightValid, qtyValid) {
        validityDispatch({ type: "INITIATE", payload: {
            id: id, widthValid: widthValid, heightValid: heightValid, qtyValid: qtyValid
        }})
    }

    function saveWork(id, title, totalSheet, totalPieces, numOfWindows, dimensions, diagramArray, sheetSize, unit) {
        workDispatch({
            type: "SAVE",
            payload: {
                id: id,
                title: title,
                totalSheet: totalSheet,
                totalPieces: totalPieces,
                numOfWindows: numOfWindows,
                dimensions: dimensions,
                diagramArray: diagramArray,
                sheetSize: sheetSize,
                unit: unit
            }
        });
    }

    function removeWork(id, title) {
        workDispatch({
            type: "REMOVE",
            payload: {
                id: id,
                title: title
            }
        });
    }

    function setWorks(works) {
        workDispatch({ type: 'SET', payload: works });
    }

    function setLoadingComponent(component) {
        loadingComponentDispatch({ type: 'SET', payload: component });
    }
    // SHEEET CALCULATOR END -------------

    // ALUFAB
    const [priceListState, priceListDispatch] = useReducer(priceListReducer, null);
    const [materialListState, materialListDispatch] = useReducer(materialListReducer, null);
    const [savedWorkState, savedWorkDispatch] = useReducer(saveWorkReducer, []);
    const [measurementsState, measurementsDispatch] = useReducer(measurementReducer, []);
    const [openingsState, openingsDispatch] = useReducer(openingsReducer, []);
    const [isOpeningsState, isOpeningsDispatch] = useReducer(isOpeningReducer, false);
    const [previousWorkAreaState, previousWorkAreaDispatch] = useReducer(previousWorkAreaReducer, null);
    const [currentWorkAreaState, currentWorkAreaDispatch] = useReducer(currentWorkAreaReducer, null);

    function setPriceList(priceList) {
        priceListDispatch({ type: 'SET', payload: priceList});
    }

    function setMatrialList(materialList) {
        materialListDispatch({ type: 'SET', payload: materialList});
    }

    function setMatWorks(works) {
        savedWorkDispatch({ type: 'SET', payload: works});
    }
    function saveMatWork(work) {
        savedWorkDispatch({ type: 'SAVE', payload: work});
    }
    function removeMatWork(index) {
        savedWorkDispatch({ type: 'REMOVE', payload: index});
    }

    function addMeasurementList(list) {
        measurementsDispatch({ type: 'ADD', payload: list});
    }
    function removeMeasurementList(index) {
        measurementsDispatch({ type: 'REMOVE', payload: index});
    }
    function setmeasurementList(list) {
        measurementsDispatch({ type: 'SET', payload: list});
    }

    function pushOpening(opening) {
        openingsDispatch({ type: 'PUSH', payload: opening});
    }
    function popOpening(opening) {
        openingsDispatch({ type: 'POP', payload: opening});
    }

    function setIsOpening(status) {
        isOpeningsDispatch({ type: 'SET', payload: status});
    }
    
    function setPreviousWorkArea(area) {
        previousWorkAreaDispatch({ type: 'SET', payload: area});
    }
    function setCurrentWorkArea(area) {
        currentWorkAreaDispatch({ type: 'SET', payload: area});
    }
    // ALUFAB-----------------------

    const value = {
        // SHEEET CALCULATOR VALUES
        sheetCalcUsage: sheetCalUsageState,
        setSheetCalcUsage: setSheetCalcUsage,
        matCalcusage: matCalcUsageState,
        setMatCalUsage: setMatCalUsage,
        previousWorkArea: workAreaState,
        setWorkArea: setWorkArea,
        isSheetCalcLimited: sheetCalcLimitedState,
        setSheetCalcLimited: setSheetCalcLimited,
        setSheetCalcUnlimited: setSheetCalcUnlimited,
        isMaterialCalcLimited: materialCalcLimitedState,
        setMaterialCalcLimited: setMaterialCalcLimited,
        setMaterialCalcUnlimited: setMaterialCalcUnlimited,
        isToast: toastState,
        showToast: showToast,
        closeToast: closeToast,
        isWhichToast: whichToastState,
        setWhichToast: setWhichToast,
        unit: unitState,
        allQty: allQtyState,
        inchAddId: inchAddIdState,
        inchDecimals: incDecimalsState,
        prevDimensions: prevDimensionsState,
        dimensions: dimensionsState,
        worksVisible: worksModalState,
        settingsVisible: settingsState,
        languagesVisible: languagesState,
        versionVisible: versionState,
        developerVisible: developerState,
        removeAdsVisible: removeAdsState,
        loading: loadingState,
        language: setLanguageState,
        alertVisible: alertState,
        isAllQtyAlert: allQtyAlertState,
        sheetCount: sheetCountState,
        pieces: piecesState,
        validity: validityState,
        works: workState,
        refresh: refreshState,
        viewWork: viewWorkState,
        workIndex: workIndexState,
        loadingComponent: loadingComponentState,
        isInternet: isInternetState,
        offlineModalVisible: offlineModalState,
        setUnit: setUnit,
        setAllQty: setAllQty,
        setInchAddId: setInchAddId,
        pushInchDecimal: pushInchDecimal,
        resetInchDecimals: resetInchDecimals,
        setPrevDimensions: setPrevDimensions,
        initiateValidity: initiateValidity,
        incPieces: incPieces,
        decPieces: decPieces,
        pushDimensions: pushDimensions,
        clearDimensions: clearDimensions,
        addDimension: addDimension,
        onRefresh: onRefresh,
        offRefresh: offRefresh,
        showWorks: showWorks,
        closeWorks: closeWorks,
        showSettings: showSettings,
        closeSettings: closeSettings,
        showDeveloper: showDeveloper,
        closeDeveloper: closeDeveloper,
        showVersion: showVersion,
        closeVersion: closeVersion,
        showRemoveAds: showRemoveAds,
        closeRemoveAds: closeRemoveAds,
        showLoading: showLoading,
        closeLoading: closeLoading,
        setViewWork: setViewWork,
        setWorkIndex: setWorkIndex,
        setEnglish: setEnglish,
        setFrench: setFrench,
        showLanguages: showLanguages,
        closeLanguages: closeLanguages,
        showAlert: showAlert,
        closeAlert: closeAlert,
        showAllQtyAlert: showAllQtyAlert,
        closeAllQtyAlert: closeAllQtyAlert,
        increaseSheet: increaseSheet,
        decreaseSheet: decreaseSheet,
        saveWork: saveWork,
        removeWork: removeWork,
        setWorks: setWorks,
        setLoadingComponent: setLoadingComponent,
        setIsInternet: setIsInternet,
        setOfflineModalVisible: setOfflineModalVisible,
        // SHEEET CALCULATOR END -------------

        // ALUFAB VALUES
        priceList: priceListState,
        setPriceList: setPriceList,

        materialList: materialListState,
        setMatrialList: setMatrialList,

        savedWorkList: savedWorkState,
        setMatWorks: setMatWorks,
        saveMatWork: saveMatWork,
        removeMatWork: removeMatWork,
        
        measurementsList: measurementsState,
        addMeasurementList: addMeasurementList,
        removeMeasurementList: removeMeasurementList,
        setmeasurementList: setmeasurementList,

        openingsMeasurement: openingsState,
        pushOpening: pushOpening,
        popOpening: popOpening,

        isOpening: isOpeningsState,
        setIsOpening: setIsOpening,

        prevWorkArea: previousWorkAreaState,
        setPreviousWorkArea: setPreviousWorkArea,

        currentWorkArea: currentWorkAreaState,
        setCurrentWorkArea: setCurrentWorkArea,
        // ALUFAB-----------------------
    };

    return <AlufappContext.Provider value={value}>{children}</AlufappContext.Provider>
}

export default AlufappContextProvider;