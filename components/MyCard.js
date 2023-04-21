import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const MyCard = ({ rating, userEmail, userName, anythingToAdd, questions, inspectCard }) => {
    return (
        <View style={styles.container}>
            <Card>
                <Card.Content>
                    <Title style={{ fontSize: 24, fontWeight: 'bold' }}>Rating: {rating}</Title>
                    <Text style={{ fontSize: 18  }}>
                        Email: {userEmail}
                    </Text>
                    <Text>Anything to add: </Text>
                    <Text>{anythingToAdd}</Text>
                    
                </Card.Content>
                <Button onPress={inspectCard} style={{margin:16}} mode='contained'>inspect</Button>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 16,
    },
});

export default MyCard;

