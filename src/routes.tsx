import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './pages/Home';
import CreateNewEvent from './pages/CreateNewEvent';

export default function Routes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#6D216A",
                }
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    header: () => null
                }}
            />
            <Stack.Screen
                name="CreateNewEvent"
                component={CreateNewEvent}
            />
        </Stack.Navigator>
    );
}