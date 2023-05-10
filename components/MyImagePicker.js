import React, { useEffect, useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function MyImagePicker({ setImageName }) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri)
            setImage(result.assets[0].uri);
            uploadImageToServer(result.assets[0].uri);
        }
    };

    const undoImage = () => {
        setImage(null);
    };

    useEffect(() => {
        setImage(null);
    }, [setImageName]);

    const uploadImageToServer = async (imageURI) => {
        try {
            const formData = new FormData();
            let uriParts = imageURI.split('.');
            let fileType = uriParts[uriParts.length - 1];
            formData.append('file', {
                uri: imageURI,
                type: `image/${fileType}`,
                name: `image.${fileType}`
            });

            const response = await fetch(Constants.manifest.extra.BACKEND_BASE_ENDPOINT + 'articles/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                console.log('Image uploaded successfully');
                const responseText = await response.text()
                console.log(responseText)
                setImageName(responseText)

            } else {
                console.log('Image upload failed');
            }
        } catch (error) {
            console.log('Error uploading image:', error);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {!image && (
                <Button title="Pick an image from camera roll" onPress={pickImage} />
            )}
            {image && (
                <>
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                    <Button title="Undo" onPress={undoImage} />
                    <Button
                        title="Pick another image"
                        onPress={pickImage}
                        disabled={true}
                    />
                </>
            )}
        </View>
    );
}

