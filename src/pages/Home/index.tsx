import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import AnalogClock from 'react-native-clock-analog';
import { Container, Header, ClockerContainer, HourLabel, DateLabel } from './styles';
import { format, compareAsc } from 'date-fns'
import brLocale from 'date-fns/locale/pt-BR';

const logo = require("../../../assets/logo.png");


export default function Home() {
    /**
     * State
     */
    const [hour, setHour] = useState<string>("00:00");
    const [date, setDate] = useState<string>("Quarta-feira, 26/03");

    useEffect(() => {
        setHour(format(new Date(), "HH:mm", { locale: brLocale }));
        setDate(format(new Date(), "EEEE, dd", { locale: brLocale }));
    }, [])

    return (
        <Container>
            <Header>
                <Image
                    source={logo}
                />
            </Header>
            <ClockerContainer>
                <AnalogClock
                    key="1"
                    colorClock="#6D216A"
                    colorNumber="white"
                    colorCenter="white"
                    colorHour="#ccc"
                    colorMinutes="#eee"
                    hour={new Date().getHours()}
                    minutes={new Date().getMinutes()}
                />
                <View style={{ marginLeft: 20 }}>
                    <HourLabel>{hour}</HourLabel>
                    <DateLabel>{date}</DateLabel>
                </View>
            </ClockerContainer>
        </Container>
    );
}
