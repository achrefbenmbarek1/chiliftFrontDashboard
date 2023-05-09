import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import MyCard from '../components/MyCard';
import { Button } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';


export function Feedback({ navigation }) {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollViewRef = useRef(null);
    // const [cardWidth, setCardWidth] = useState(0);
    // const CARD_WIDTH = Dimensions.get("window").width -32;
    const scrollToPrevious = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, animated: true });
        }
    }

    const scrollToNext = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
            // scrollViewRef.current.scrollTo({ x: scrollViewRef.current?.contentOffset?.x + 3 * cardWidth, animated: true, animationDuration: 500 });
        }
    }
    // const onCardLayout = (event) => {
    //     setCardWidth(event.nativeEvent.layout.width);
    // }
    useEffect(() => {
        console.log(Constants.manifest.extra.BACKEND_BASE_ENDPOINT + 'feedbacks/all');
        fetch(Constants.manifest.extra.BACKEND_BASE_ENDPOINT + 'feedbacks/all')
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setFeedbacks(data)
                setLoading(false);
            })
            .catch((error) => console.log(error));

    }, [])
    return (
        <View style={styles.container}>
            {loading ?
                <Text>loading...</Text> :
                <View>
                    {/* <TouchableOpacity style={styles.arrowLeft} onPress={scrollToPrevious}> */}
                    {/*     <Text style={styles.arrowText}>{'<'}</Text> */}
                    {/* </TouchableOpacity> */}
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                    // onContentSizeChange={(contentWidth) => {
                    //     scrollViewRef.current.scrollToEnd({ animated: true });
                    // }}
                    >
                        {feedbacks?.map(feedback => {
                            const { rating, userEmail, anythingToAdd } = feedback;
                            return (
                                <MyCard key={feedback._id}
                                    fields={[
                                        { label: 'Rating', value: rating },
                                        { label: 'Email', value: userEmail },
                                        { label: 'Anything to Add', value: anythingToAdd },
                                    ]}
                                    inspectCard={async (e) => {
                                        await SecureStore.setItemAsync('feedback1', JSON.stringify(feedback))
                                        navigation.navigate('InspectorNestedNavigator', {
                                            screen: 'InspectorScreen',
                                            params: { data: 'data' }
                                        })
                                    }}
                                />
                            )
                        })}
                    </ScrollView>
                    <View style={styles.buttons}>
                        <Button mode='contained' onPress={scrollToPrevious} style={{ height: 40 }}>{'<<'}</Button>
                        <Button mode='contained' onPress={scrollToNext} style={{ height: 40 }}>{'>>'}</Button>
                    </View>
                    {/* <TouchableOpacity style={styles.arrowRight} onPress={scrollToNext}> */}
                    {/*     <Text style={styles.arrowText}>{'>'}</Text> */}
                    {/* </TouchableOpacity> */}
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // arrowLeft: {
    //     // position: 'absolute',
    //     top: 0,
    //     bottom: 0,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     left: 0,
    //     width: 40,
    // },
    // arrowRight: {
    //     position: 'absolute',
    //     top: 0,
    //     bottom: 0,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     right: 0,
    //     width: 40,
    // },
    // arrowText: {
    //     fontSize: 24,
    //     color: 'black',
    // },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8
    }
}); 
