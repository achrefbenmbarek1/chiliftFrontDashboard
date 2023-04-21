
import { createStackNavigator } from '@react-navigation/stack';
import { InspectScreen } from '../../pages/InspectScreen';

const Stack = createStackNavigator();
function InspectorNestedNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="InspectScreen" component={InspectScreen} />
        </Stack.Navigator>

    );
}
export default InspectorNestedNavigator;
