
import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import Constants from 'expo-constants';

const MyCard = ({ fields, inspectCard, modifyCard, deleteCard }) => {
    const screenWidth = Dimensions.get('window').width;
    const imageWidth = screenWidth * 0.8;

    return (
        <View style={styles.container}>
            <Card>
                <Card.Content>
                    {fields.map((field, index) => {
                        const FieldComponent = index === 0 ? Title : Text;
                        const fieldStyle = index === 0 ? styles.title : styles.text;
                        console.log(Constants.manifest.extra.BACKEND_BASE_ENDPOINT + 'imagesArticle/' + field.value)

                        return (
                            <View key={field.label}>
                                {field.label === 'Image' ? (
                                    <Image 
                                        source={{ uri: Constants.manifest.extra.BACKEND_BASE_ENDPOINT + 'imagesArticle/' + field.value }} 
                                        style={[styles.image,{ width: imageWidth }]} />
                                ) : (
                                    <FieldComponent style={fieldStyle}>
                                        {field.label}: {field.value}
                                    </FieldComponent>
                                )}
                            </View>
                        );
                    })}
                </Card.Content>
                <View style={styles.buttonContainer}>
                    <Button onPress={inspectCard} style={styles.button} mode='contained'>
                        Inspect
                    </Button>
                    {modifyCard && (
                        <Button onPress={modifyCard} style={styles.button} mode='contained'>
                            Modify
                        </Button>
                    )}
                    {deleteCard && (
                        <Button onPress={deleteCard} style={styles.button} mode='contained'>
                            Delete
                        </Button>
                    )}
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
    },
});

export default MyCard;

