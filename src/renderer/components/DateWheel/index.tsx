import { memo } from "react";
import styled, { css } from "styled-components";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export enum DateUnit {
    Year = "Year",
    Month = "Month",
    Week = "Week",
    Day = "Day",
}

export interface DateWheelProps {
    unit: DateUnit;
    curDate: Date;
}

export default memo((props: DateWheelProps) => {
    const { unit, curDate = Date.now() } = props;

    return (
        <Container>
            <Btn>
                <BsChevronCompactLeft />
            </Btn>
            <Label>{"2022-02-04"}</Label>
            <Btn>
                <BsChevronCompactRight />
            </Btn>
        </Container>
    );
});

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Btn = styled.div`
    padding: 4px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: lightskyblue;
    }
    &:active {
        background-color: white;
    }
`;

const Label = styled.p`
    width: 80px;
    padding: 0px 8px;
    font-size: small;
    text-align: center;
`;
