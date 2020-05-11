import { useNavigation } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { format } from 'date-fns';
import brLocale from 'date-fns/locale/pt-BR';
import React, { useState } from 'react';
import { Alert, Button, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from 'react-redux';
import { Creators } from '../../store/ducks/schedule';
import { Input, InputContainer } from './styles';

const CreateNewEvent: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    navigation.setOptions({
        headerTitle: "Agendar novo evento",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    })

    /**
     * State
     */
    const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);

    const [dateTime, setDateTime] = useState<any>();
    const [formatedDateTime, setFormatedDateTime] = useState<string>("");

    const [description, setDescription] = useState<string>("");

    /**
     * Functions
     */
    function handleShowDatePicker() {
        setIsDatePickerVisible(true);
    }

    function handleConfirmDate(date) {
        setIsDatePickerVisible(false);
        setDateTime(format(new Date(date), "yyyy/MM/dd HH:mm", { locale: brLocale }));
        setFormatedDateTime(format(new Date(date), "EEEE, dd/MM/yyyy - HH:mm", { locale: brLocale }));
    }

    function handleCreateEvent() {
        console.log(description, dateTime);
        dispatch(Creators.addNewEvent(description, dateTime));
        navigation.goBack();

        Alert.alert("", "Evento adicionado a sua agenda!");
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <InputContainer>
                <Input
                    placeholder="Descrição da tarefa"
                    multiline={true}
                    numberOfLines={10}
                    textAlignVertical="top"
                    value={description}
                    onChangeText={value => setDescription(value)}
                    autoCapitalize="sentences"
                    autoCorrect={true}
                    autoFocus={true}
                />
            </InputContainer>
            <TouchableOpacity onPress={handleShowDatePicker}>
                <InputContainer>
                    <Text style={{ color: "white", paddingVertical: 8 }}>
                        {formatedDateTime.length > 0 ? formatedDateTime : "Adicionar data"}
                    </Text>
                </InputContainer>
            </TouchableOpacity>
            <Button
                title="Criar evento"
                color="#A2189D"
                disabled={description.length == 0 || !dateTime}
                onPress={handleCreateEvent}
            />


            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirmDate}
                onCancel={() => setIsDatePickerVisible(false)}
            />

        </View>
    );
}

export default CreateNewEvent;