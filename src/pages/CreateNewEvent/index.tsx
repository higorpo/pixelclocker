import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateNewEvent: React.FC = () => {
    const navigation = useNavigation();

    navigation.setOptions({
        headerTitle: "Agendar novo evento"
    })

    return <View />;
}

export default CreateNewEvent;