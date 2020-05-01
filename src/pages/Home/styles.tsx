import styled from 'styled-components/native';

export const Container = styled.View`
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