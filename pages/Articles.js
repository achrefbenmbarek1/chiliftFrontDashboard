
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import MyCard from '../components/MyCard';
import { Button } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';


export function Articles({ navigation }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollViewRef = useRef(null);
    const [reload,setReload] = useState(false);
    const isFocused = useIsFocused();

    const onDelete = async (id) => {
        try {
            console.log(id)
            console.log(Constants.manifest.extra.BACKEND_BASE_ENDPOINT + 'articles/' + id)
            const response = await fetch(Constants.manifest.extra.BACKEND_BASE_ENDPOINT + 'articles/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                return console.log('Delete request unsuccessful');
            }
        setReload(!reload);
        } catch (error) {
            console.error('An error occurred during the delete request:', error);
        }
    };


    const scrollToPrevious = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, animated: true });
        }
    }

    const scrollToNext = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }
    useEffect(() => {
        fetch(Constants.manifest.extra.BACKEND_BASE_ENDPOINT + 'articles/all')
            .then((response) => response.json())
            .then((data) => {
                setArticles(data)
                setLoading(false);
            })
            .catch((error) => console.log(error));

    }, [reload,isFocused])
    return (
        <View style={styles.container}>
            {loading ?
                <Text>loading...</Text> :
                <View>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                    >
                        {articles?.map(article => {
                            const { title, imageName } = article
                            return (
                                <MyCard key={article._id}
                                    fields={[
                                        { label: 'Title', value: title },
                                        { label: 'Image', value: imageName },
                                    ]}

                                    inspectCard={async (e) => {
                                        await SecureStore.setItemAsync('article', JSON.stringify(article))
                                        navigation.navigate('InspectorNestedNavigator', {
                                            screen: 'InspectArticle',
                                        })
                                    }
                                    }
                                    modifyCard={async (e) => {
                                        await SecureStore.setItemAsync('article', JSON.stringify(article))
                                        navigation.navigate('InspectorNestedNavigator', {
                                            screen: 'ModifyArticle',
                                        })
                                    }}
                                    deleteCard={async () => onDelete(article._id)}
                                />
                            )
                        })}
                    </ScrollView>
                    <View style={styles.buttons}>
                        <Button mode='contained' onPress={scrollToPrevious} style={{ height: 40 }}>{'<<'}</Button>
                        <Button mode='contained' onPress={scrollToNext} style={{ height: 40 }}>{'>>'}</Button>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8
    }
}); 
