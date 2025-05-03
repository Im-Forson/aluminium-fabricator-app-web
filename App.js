import * as React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"

import MainPage from "./MainPage";
import SheetCalcHomePage from "./SheetCalcHomePage";
import MaterialCalcHomePage from "./MaterialCalcHomePage";
import AlufappContextProvider from "./alufapp-context";
import DimensionsPage from "./DimensionsPage";
import DrawingPage from "./DrawingPage";
import SavedWorkPage from "./SavedWorkPage";
import SavedWorkDrawingPage from "./SavedWorkDrawingPage";
import MatDimensionsPage from "./MatDimensionsPage";
import MaterialsOptionsPage from "./MaterialsOptionsPage";
import MaterialListPage from "./MaterialListPage";
import MatSavedWorksPage from "./MatSavedWorksPage";
import MatSavedWorkList from "./MatSavedWorksList";
import DeveloperPage from "./DeveloperPage";

const Stack = createStackNavigator();

const linking = {
  prefixes: ['http://localhost:19006', 'https://yourdomain.com'],
  config: {
    screens: {
      Main: '',
      SheetCalc: 'sheet',
      MaterialCalc: 'materials',
    }
  }
};

export default function App() {
  return (
    <AlufappContextProvider>
       <NavigationContainer linking={linking}>
          <Stack.Navigator>
            <Stack.Screen
            name="Main"
            component={MainPage}
            options={{
              header: () => {}
            }}
            /> 
            <Stack.Screen
            name="SheetCalc"
            component={SheetCalcHomePage}
            options={{
              header: () => {}
            }}
            />
            <Stack.Screen
            name="MaterialCalc"
            component={MaterialCalcHomePage}
            options={{
              header: () => {}
            }}
            />
            <Stack.Screen
             name="SheetDimensions"
             component={DimensionsPage}
             options={{
              header: () => {}
             }}
            />
            <Stack.Screen
             name="Drawing"
             component={DrawingPage}
             options={{
              header: () => {}
             }}
            />
            <Stack.Screen
             name="SavedWorks"
             component={SavedWorkPage}
             options={{
              header: () => {}
             }}
            />
            <Stack.Screen
             name="SavedDrawing"
             component={SavedWorkDrawingPage}
             options={{
              header: () => {}
             }}
            />
            <Stack.Screen
             name="MatDimensions"
             component={MatDimensionsPage}
             options={{
              header: () => {}
             }}
            />
            <Stack.Screen
             name="MaterialsOptions"
             component={MaterialsOptionsPage}
             options={{
              header: () => {}
             }}
            />
            <Stack.Screen
             name="MaterialList"
             component={MaterialListPage}
             options={{
              header: () => {}
             }}
            />
            <Stack.Screen
             name="MaterialsSavedWorks"
             component={MatSavedWorksPage}
             options={{
              header: () => {}
             }}
            />
            <Stack.Screen
             name="SavedMaterialList"
             component={MatSavedWorkList}
             options={{
              header: () => {}
             }}
            />
            <Stack.Screen
             name="Developer"
             component={DeveloperPage}
             options={{
              header: () => {}
             }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </AlufappContextProvider>
    
  );
}


