import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
    background-color: #82327E;
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
`;

export const ClockerContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`

export const HourLabel = styled.Text`
    color: white;
    font-size: 40px;
    font-weight: bold;
`;
export const DateLabel = styled.Text`
    color: white;
    margin-top: -5px;
`
export const Section = styled.View`
    background-color: #6D216A;
    padding: 8px 16px;
    margin: 16px;
    margin-bottom: 0px;
    border-radius: 10px;
`
export const SectionHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`

export const Title = styled.Text`
    color: white;
    font-size: 20px;
`
export const ScheduleContainer = styled.View`
    flex-direction: row;
    padding: 10px 0px;
    align-items: ${(props: any) => props.descriptionLength > 35 ? 'flex-start' : 'center'};
`

export const ScheduledTime = styled.Text`
    color: white;
    font-size: 22px;
    margin-right: 10px;
`

export const ScheduledDescription = styled.Text`
    flex: 1;
    color: white;
`

export const EmptySchedule = styled.Text`
    color: rgba(255,255,255,0.35);
    text-align: center;
    margin: 10px 0px;
`

export const StopWatchLabelInput = styled.TextInput`
    color: white;
`
export const StopWatchLabelContainer = styled.View`
    background-color: rgba(0,0,0,0.2);
    padding: 5px;
    padding-left: 10px;
    margin-bottom: 10px;
    color: white;
    flex: 1;
    margin-right: 10px;
`

export const ActivityRecordContainer = styled.View`
    flex-direction: row;
    padding: 10px 0px;
    align-items: ${(props: any) => props.descriptionLength > 35 ? 'flex-start' : 'center'};
`

export const ActivityRecordTime = styled.Text`
    color: white;
    font-size: 22px;
    margin-right: 10px;
    min-width: 75px;
    text-align: right;
`

export const ActivityRecordDescription = styled.Text`
    flex: 1;
    color: white;
`