import React, { useState, useEffect } from 'react';
import { Image, View, FlatList, Text } from 'react-native';
import AnalogClock from 'react-native-clock-analog';
import { Container, Header, ClockerContainer, HourLabel, DateLabel, Section, Title, ScheduleContainer, ScheduledTime, ScheduledDescription, EmptySchedule } from './styles';
import { format, compareAsc } from 'date-fns'
import brLocale from 'date-fns/locale/pt-BR';

const logo = require("../../../assets/logo.png");


export default function Home() {
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
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10
                }}>
                    <Title>Sua agenda para hoje</Title>
                    <Text style={{ color: "#ccc" }}>Criar novo</Text>
                </View>
                <FlatList
                    data={[]}
                    keyExtractor={item => String(item)}
                    renderItem={({ item }) => (
                        <ScheduleContainer>
                            <ScheduledTime>22:10</ScheduledTime>
                            <ScheduledDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultrices.</ScheduledDescription>
                        </ScheduleContainer>
                    )}
                    ListEmptyComponent={<EmptySchedule>Não há nada agendado para hoje!</EmptySchedule>}
                />
            </Section>
        </Container>
    );
}
