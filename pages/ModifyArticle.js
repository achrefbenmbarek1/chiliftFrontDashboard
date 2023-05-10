
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import MyImagePicker from '../components/MyImagePicker';
import { Articles } from './Articles';

export function ModifyArticle({ route, navigation }) {
    const isFocused = useIsFocused();
    const [article, setArticle] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageName, setImageName] = useState("");
    const scrollViewRef = useRef(null);

    const handleContentSizeChange = (event) => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };
    onModify = async () => {
        try {
            const id = article._id
            console.log(id)
            console.log(Constants.manifest.extra.BACKEND_BASE_ENDPOINT + 'articles/' + id)
            const response = await fetch(Constants.manifest.extra.BACKEND_BASE_ENDPOINT + 'articles/' + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({title, content, imageName})
            });

            if (!response.ok) {
                return console.log('Patch request unsuccessful');
            }
            navigation.navigate(Articles);
        } catch (error) {
            console.error('An error occurred during the patch request:', error);
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await SecureStore.getItemAsync('article');

                if (result !== null && result !== undefined) {
                    const parsedArticle = JSON.parse(result)
                    setArticle(parsedArticle);
                    setTitle(parsedArticle.title)
                    setContent(parsedArticle.content)
                    setImageName(parsedArticle.imageName)
                }
                await SecureStore.deleteItemAsync('article');


            } catch (error) {
                console.error('Error getting data from SecureStore:', error);
            }
        };

        getData();
    }, [isFocused]);

    useEffect(() => console.log(article), [article]);

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.content}>
                {article ? (
                    <View>
                        <Text>Title:</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                        />

                        <Text>Content:</Text>
                        <ScrollView
                            ref={scrollViewRef}
                            contentContainerStyle={styles.scrollViewContent}
                            keyboardShouldPersistTaps="handled"
                        >
                            <TextInput
                                value={content}
                                onChangeText={setContent}
                                multiline
                                onContentSizeChange={handleContentSizeChange}
                                style={styles.textInput}
                            />
                        </ScrollView>
                        <MyImagePicker 
                            key={article._id}
                            setImageName = {setImageName}/>
                        <Button mode='contained' style={{ height: 40 }} onPress={onModify}>modify</Button>

                    </View>

                ) : (
                    <Text>Loading...</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16
    },
    content: {
        flex: 1,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    textInput: {
        padding: 8,
        fontSize: 16,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
}); 
