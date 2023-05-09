import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View } from 'react-native';

const CustomDrawerContent = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView>
                <DrawerItem
                    label="Table"
                    onPress={() => navigation.navigate('Table')}
                />
                <DrawerItem
                    label="Feedback"
                    onPress={() => navigation.navigate('Feedback')}
                />
                <DrawerItem
                    label="Articles"
                    onPress={() => navigation.navigate('Articles')}
                />
            </DrawerContentScrollView>
        </View>
    );
};
export default CustomDrawerContent;
