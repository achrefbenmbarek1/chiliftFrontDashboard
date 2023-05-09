
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';

export function InspectArticle({ route, navigation }) {
    const isFocused = useIsFocused();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await SecureStore.getItemAsync('article');

                if (result !== null && result !== undefined) {
                    console.log('waywa focusi', result)
                    setArticle(JSON.parse(result));
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
        <ScrollView contentContainerStyle={styles.container}>
            {article ?
                <View style={styles.articleContainer}>
                    <Text style={styles.title}>{article?.title}</Text>
                    <Image
                        source={{ uri: Constants.manifest.extra.BACKEND_BASE_ENDPOINT + 'imagesArticle/' + article?.imageName }}
                        style={{ width: '90%', height: 100 }} />
                    <Text style={styles.content}>{article?.content}</Text>
                </View>
                :
                <Text>loading...</Text>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    articleContainer: {
        width: '90%',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        marginBottom: 10,
    },
}); 
