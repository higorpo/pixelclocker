import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import brLocale from 'date-fns/locale/pt-BR';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, Text, View } from 'react-native';
import AnalogClock from 'react-native-clock-analog';
import { ActivityRecordContainer, ActivityRecordDescription, ActivityRecordTime, ClockerContainer, Container, DateLabel, EmptySchedule, Header, HourLabel, ScheduleContainer, ScheduledDescription, ScheduledTime, Section, SectionHeader, StopWatchLabelContainer, StopWatchLabelInput, Title } from './styles';
import { useSelector } from 'react-redux';

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

    const [scheduledData, setScheduledData] = useState<Array<any>>([]);

    /**
     * Store
     */
    const scheduled = useSelector(state => state.schedule);

    useEffect(() => {
        setHourFormated(format(new Date(), "HH:mm", { locale: brLocale }));
        setDateFormated(format(new Date(), "EEEE, dd", { locale: brLocale }));
    }, [])

    useEffect(() => {
        const today = new Date();
        let todaySchedules = scheduled.filter(item => new Date(item.date).getDate() == today.getDate() && new Date(item.date).getMonth() + 1 == today.getMonth() + 1 && new Date(item.date).getFullYear() == today.getFullYear())
        let sortedByDate = todaySchedules.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setScheduledData(sortedByDate);
    }, [scheduled])


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
                    data={scheduledData}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (
                        // @ts-ignore
                        <ScheduleContainer ref={index} descriptionLength={item.description.length}>
                            <ScheduledTime>{format(new Date(item.date), "HH:mm", { locale: brLocale })}</ScheduledTime>
                            <ScheduledDescription>{item.description}</ScheduledDescription>
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