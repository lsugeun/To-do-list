import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Screen/Home';
import ListScreen from './Screen/List';
import CompletedListScreen from './Screen/CompletedList';
import { useState } from 'react';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="To Do List" 
        component={HomeScreen} 
        options={{ headerTitleAlign: 'center' }} />
      <Stack.Screen
       name="List" 
       component={ListScreen} 
       options={{ headerTitle: '할 일 목록', headerTitleAlign: 'center' }} />

    </Stack.Navigator>
  );
};

export default function App() {

const [taskList] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ title: 'TO DO LIST', headerTitleAlign: 'center', headerShown: false }}
          initialParams={{ taskList: taskList }}
        />
        <Tab.Screen
          name="CompletedList"
          component={CompletedListScreen}
          options={{ title: '완료된 목록' }}
          initialParams={{ completedTasks: [] }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

