import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UsersTable from './pages/UsersTable';
import Constants from 'expo-constants';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Feedback } from './pages/Feedback';
import CustomDrawerContent from './components/navigation/CustomDrawerContent';
import InspectorNestedNavigator from './components/navigation/InspectorNestedNavigator';
import { Articles } from './pages/Articles';

const Drawer = createDrawerNavigator();
export default function App() {
    const [table, setTable] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(Constants.manifest.extra.BACKEND_BASE_ENDPOINT + 'usersData/');
        fetch(Constants.manifest.extra.BACKEND_BASE_ENDPOINT + 'usersData/')
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setTable(data)
                setLoading(false);
            })
            .catch((error) => console.log(error));

    }, [])
    // useEffect(() => console.log("mil useEffect", table), [table]);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {loading ? (
                <Text style={{flex:1 ,justifyContent:'center',alignItems:'center', fontSize:20}}>Loading...</Text>
            ) :
                <NavigationContainer>
                    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
                        <Drawer.Screen name="Table" component={UsersTable} initialParams={{ table: table }}>
                        </Drawer.Screen>
                        <Drawer.Screen name="Feedback" component={Feedback}>
                        </Drawer.Screen>
                        <Drawer.Screen name="Articles" component={Articles}>
                        </Drawer.Screen>
                        <Drawer.Screen name="InspectorNestedNavigator"
                            component={InspectorNestedNavigator}
                            options={{ headerShown: false }} />

                    </Drawer.Navigator>
                </NavigationContainer>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
