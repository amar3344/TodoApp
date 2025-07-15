import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProjectsList from './components/screens/ProjectsList';
import ProjectDetails from './components/screens/ProjectDetails';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="ProjectsList" component={ProjectsList} />
        <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;