import React, { useState, useEffect } from 'react';
import { Image, View, FlatList, Text, TextInput, Button } from 'react-native';
import AnalogClock from 'react-native-clock-analog';
import { Container, Header, ClockerContainer, HourLabel, DateLabel, Section, Title, ScheduleContainer, ScheduledTime, ScheduledDescription, EmptySchedule, SectionHeader, StopWatchLabelInput, StopWatchLabelContainer, ActivityRecordContainer, ActivityRecordDescription, ActivityRecordTime } from './styles';
import { format, compareAsc } from 'date-fns'
import brLocale from 'date-fns/locale/pt-BR';
import { useNavigation } from '@react-navigation/native';

const logo = require("../../../assets/logo.png");

const Home: React.FC = () => {
    const navigation = useNavigation();

    /**
     * State
     */
    const [hour, setHour] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);

    const [hourFormated, setHourFormated] = useState<string>("00:00");
    const [dateFormated, setDateFormated] = useState<string>("Quarta-feira, 26/03");

    useEffect(() => {
        setHourFormated(format(new Date(), "HH:mm", { locale: brLocale }));
        setDateFormated(format(new Date(), "EEEE, dd", { locale: brLocale }));
    }, [])


    // setTimeout(() => {
    //     setHourFormated(format(new Date(), "HH:mm", { locale: brLocale }));
    //     setDateFormated(format(new Date(), "EEEE, dd", { locale: brLocale }));

    //     setHour(new Date().getHours());
    //     setMinutes(new Date().getMinutes());
    // }, 1000);

    return (
        <Container>
            <Header>
                <Image
                    source={logo}
                />
            </Header>
            <ClockerContainer>
                <AnalogClock
                    key={1}
                    colorClock="#6D216A"
                    colorNumber="white"
                    colorCenter="white"
                    colorHour="#ccc"
                    colorMinutes="#eee"
                    hour={hour}
                    minutes={minutes}
                />
                <View style={{ marginLeft: 20 }}>
                    <HourLabel>{hourFormated}</HourLabel>
                    <DateLabel>{dateFormated}</DateLabel>
                </View>
            </ClockerContainer>

            <Section>
                <SectionHeader>
                    <Title>Sua agenda para hoje</Title>
                    <Text style={{ color: "#ccc" }} onPress={() => navigation.navigate("CreateNewEvent")}>Criar novo</Text>
                </SectionHeader>
                <FlatList
                    data={[]}
                    keyExtractor={item => String(item)}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <ScheduleContainer>
                            <ScheduledTime>22:10</ScheduledTime>
                            <ScheduledDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultrices.</ScheduledDescription>
                        </ScheduleContainer>
                    )}
                    ListEmptyComponent={<EmptySchedule>Não há nada agendado para hoje!</EmptySchedule>}
                />
            </Section>
            <Section>
                <SectionHeader>
                    <Title>Cronometrar</Title>
                </SectionHeader>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <StopWatchLabelContainer>
                        <StopWatchLabelInput
                            placeholder="O que você irá fazer?"
                        />
                    </StopWatchLabelContainer>
                    <View style={{
                        marginTop: -10
                    }}>
                        <Button
                            title="Iniciar"
                            onPress={() => null}
                            color="#A2189D"
                        />
                    </View>
                </View>
            </Section>
            <Section style={{ marginBottom: 16 }}>
                <SectionHeader>
                    <Title>Registro de atividades</Title>
                    <Text style={{ color: "#ccc" }}>Copiar</Text>
                </SectionHeader>
                <FlatList
                    data={[0, 1, 2, 3]}
                    keyExtractor={item => String(item)}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <ActivityRecordContainer>
                            <ActivityRecordDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultrices.</ActivityRecordDescription>
                            <ActivityRecordTime>1:06:10</ActivityRecordTime>
                        </ActivityRecordContainer>
                    )}
                    ListEmptyComponent={<EmptySchedule>Não há nenhuma atividade cadastrada!</EmptySchedule>}
                />
            </Section>
        </Container>
    );
}

export default Home;