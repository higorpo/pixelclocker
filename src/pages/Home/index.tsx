import { useNavigation } from '@react-navigation/native';
import { format, differenceInSeconds } from 'date-fns';
import brLocale from 'date-fns/locale/pt-BR';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, Text, View, Alert, Clipboard } from 'react-native';
import AnalogClock from 'react-native-clock-analog';
import { ActivityRecordContainer, ActivityRecordDescription, ActivityRecordTime, ClockerContainer, Container, DateLabel, EmptySchedule, Header, HourLabel, ScheduleContainer, ScheduledDescription, ScheduledTime, Section, SectionHeader, StopWatchLabelContainer, StopWatchLabelInput, Title } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '../../store/ducks/activity_record';

const logo = require("../../../assets/logo.png");

const Home: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    /**
     * State
     */
    const [hour, setHour] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);

    const [hourFormated, setHourFormated] = useState<string>("00:00");
    const [dateFormated, setDateFormated] = useState<string>("Quarta-feira, 26/03");

    const [formatedStopwatchCounter, setFormatedStopwatchCounter] = useState<string>("");
    const [startedStopwatch, setStartedStopwatch] = useState<boolean>(false);
    const [stopwatchLabel, setStopwatchLabel] = useState<string>("");
    const [startedStopwatchTime, setStartedStopwatchTime] = useState<any>();

    const [scheduledData, setScheduledData] = useState<Array<any>>([]);
    const [activityRecordDate, setActivityRecordDate] = useState<Array<any>>([]);

    /**
     * Store
     */
    const scheduled = useSelector(state => state.schedule);
    const activity_records = useSelector(state => state.activity_record);

    useEffect(() => {
        const timer = setInterval(() => {
            setHourFormated(format(new Date(), "HH:mm", { locale: brLocale }));
            setDateFormated(format(new Date(), "EEEE, dd", { locale: brLocale }));

            setHour(new Date().getHours());
            setMinutes(new Date().getMinutes());
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, [])

    useEffect(() => {
        const today = new Date();
        let todaySchedules = scheduled.filter(item => new Date(item.date).getDate() == today.getDate() && new Date(item.date).getMonth() + 1 == today.getMonth() + 1 && new Date(item.date).getFullYear() == today.getFullYear())
        let sortedByDate = todaySchedules.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setScheduledData(sortedByDate);
    }, [scheduled])

    let timer = null;

    useEffect(() => {
        if (startedStopwatch) {
            timer = setInterval(() => {
                const startedDate = new Date(startedStopwatchTime);
                const diff = differenceInSeconds(new Date(), startedDate);

                if (!diff) setFormatedStopwatchCounter("00:00:00"); // divide by 0 protection
                const hours = Math.abs(Math.floor(diff / 60 / 60)).toString();
                const minutes = Math.abs(Math.floor(diff / 60) % 60).toString();
                const seconds = (diff - parseInt(hours) * 60 * 60 - (parseInt(minutes) * 60)).toString();

                setFormatedStopwatchCounter(`${hours.length < 2 ? 0 + hours : hours}:${minutes.length < 2 ? 0 + minutes : minutes}:${seconds.length < 2 ? 0 + seconds : seconds}`);
                // console.log(`${hours.length < 2 ? 0 + hours : hours}:${minutes.length < 2 ? 0 + minutes : minutes}:${seconds.length < 2 ? 0 + seconds : seconds}`)
            }, 1000);
        } else {
            setFormatedStopwatchCounter("00:00:00");
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        }
    }, [startedStopwatch])

    function handleStopwatch() {
        if (startedStopwatch) {
            handleClearStopwatch();
        } else {
            handleStartStopwatch();
        }
    }

    function handleStartStopwatch() {
        console.log("Oi")
        setStartedStopwatch(true);
        setStartedStopwatchTime(Date.now());
    }

    function handleClearStopwatch() {
        dispatch(Creators.addNewRecord(stopwatchLabel, formatedStopwatchCounter));
        setStartedStopwatch(false);
        setStopwatchLabel("");
        setStartedStopwatchTime("");
    }

    function handleDeleteAllActivityRecords() {
        Alert.alert(null, "Deseja excluir todos os registros de atividade?", [
            {
                text: "Sim",
                onPress: () => {
                    dispatch(Creators.deleteAllActivityRecords());
                }
            },
            {
                text: "Não",
                style: "cancel"
            }
        ])
    }

    function handleCopyActivityRecords() {
        let formatedString = "";

        activity_records.map(record => formatedString += `${record.description} - ${record.time}\n`);

        Clipboard.setString(formatedString);

        Alert.alert(null, "Copiado com sucesso!");
    }

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
                        <ScheduleContainer key={Date.now()} descriptionLength={item.description.length}>
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
                        {
                            startedStopwatch ?
                                <Text numberOfLines={1} style={{ color: "white", paddingVertical: 4 }}>
                                    {formatedStopwatchCounter} - {stopwatchLabel}
                                </Text>
                                :
                                <StopWatchLabelInput
                                    placeholder="O que você irá fazer?"
                                    value={stopwatchLabel}
                                    onChangeText={value => setStopwatchLabel(value)}
                                />
                        }
                    </StopWatchLabelContainer>
                    <View style={{
                        marginTop: -10
                    }}>
                        <Button
                            title={startedStopwatch ? "Parar" : "Iniciar"}
                            onPress={handleStopwatch}
                            color="#A2189D"
                        />
                    </View>
                </View>
            </Section>
            <Section style={{ marginBottom: 16 }}>
                <SectionHeader>
                    <Title>Suas atividades</Title>
                    <Text onPress={handleCopyActivityRecords} style={{ color: "#ccc" }}>Copiar</Text>
                    <Text onPress={handleDeleteAllActivityRecords} style={{ color: "#ccc" }}>Excluir</Text>
                </SectionHeader>
                <FlatList
                    data={activity_records}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (
                        // @ts-ignore
                        <ActivityRecordContainer key={Date.now()} descriptionLength={item.description.length}>
                            <ActivityRecordDescription>{item.description}</ActivityRecordDescription>
                            <ActivityRecordTime>{item.time}</ActivityRecordTime>
                        </ActivityRecordContainer>
                    )}
                    ListEmptyComponent={<EmptySchedule>Não há nenhuma atividade cadastrada!</EmptySchedule>}
                />
            </Section>
        </Container>
    );
}

export default Home;