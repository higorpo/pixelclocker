import React from 'react';
import { Image } from 'react-native';
import AnalogClock from 'react-native-clock-analog';
import { Container, Header } from './styles';

const logo = require("../../../assets/logo.png");

export default function Home() {
    return (
        <Container>
            <Header>
                <Image
                    source={logo}
                />
            </Header>
            <AnalogClock
                colorClock="#6D216A"
                colorNumber="white"
                colorCenter="white"
                colorHour="#ccc"
                colorMinutes="#eee"
                hour="2"
                minutes={55}
            />
        </Container>
    );
}
