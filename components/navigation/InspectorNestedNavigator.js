
import { createStackNavigator } from '@react-navigation/stack';
import { InspectArticle } from '../../pages/InspectArticle';
import { InspectScreen } from '../../pages/InspectScreen';
import { ModifyArticle } from '../../pages/ModifyArticle';

const Stack = createStackNavigator();
function InspectorNestedNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="InspectScreen" component={InspectScreen} />
            <Stack.Screen name="ModifyArticle" component={ModifyArticle} />
            <Stack.Screen name="InspectArticle" component={InspectArticle} />
        </Stack.Navigator>

    );
}
export default InspectorNestedNavigator;
