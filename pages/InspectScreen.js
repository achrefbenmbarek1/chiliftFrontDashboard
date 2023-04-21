import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';

export function InspectScreen({ route, navigation }) {
    // const {feedback} = route.params;
    const isFocused = useIsFocused();
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {

        console.log(route);
        const getData = async () => {
            try {
                const result = await SecureStore.getItemAsync('feedback1');

                if (result !== null && result !== undefined) {
                    console.log('waywa focusi', result)
                    setFeedback(JSON.parse(result));
                }
                await SecureStore.deleteItemAsync('feedback1');


            } catch (error) {
                console.error('Error getting data from SecureStore:', error);
            }
        };

        getData();
    }, [isFocused]);
    useEffect(()=>console.log(feedback),[feedback]);
    return (
        <View style={styles.container}>
            {feedback ?
                <View>
                <Text>Rating: {feedback?.rating}</Text>
                <Text>User Name: {feedback.userName}</Text>
                <Text>User Email: {feedback.userEmail}</Text>
                <Text>Questions: </Text>
                <Text>Question 1: </Text>
                <Text>{'\t'+ feedback.questions.question1}</Text>
                <Text>Question 2: </Text>
                <Text>{'\t'+ feedback.questions.question2}</Text>
                <Text>Question 3: </Text>
                <Text>{'\t'+ feedback.questions.question3}</Text>
                <Text>Other comments: </Text>
                <Text>{'\t' + feedback.anythingToAdd}</Text>
                </View>
                :
                <Text>loading...</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
}); 
