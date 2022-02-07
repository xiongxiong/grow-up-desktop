import { memo } from "react";
import styled, { css } from "styled-components";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "renderer/store";
import { setTaskViewAnchor, TaskViewUnit } from "renderer/store/settings";
import moment from "moment";

export interface DateWheelProps {}

export default memo((props: DateWheelProps) => {
    const dispatch = useDispatch();

    const taskViewUnit = useSelector(
        (state: RootState) => state.settings.taskViewUnit
    );

    const taskViewAnchor = useSelector(
        (state: RootState) => state.settings.taskViewAnchor || Date.now()
    );

    const anchorPrev = () => {
        switch (taskViewUnit) {
            case TaskViewUnit.Month:
                dispatch(
                    setTaskViewAnchor(
                        moment(taskViewAnchor).subtract(1, "months").valueOf()
                    )
                );
                break;
            case TaskViewUnit.Week:
                dispatch(
                    setTaskViewAnchor(
                        moment(taskViewAnchor).subtract(1, "weeks").valueOf()
                    )
                );
                break;
            case TaskViewUnit.Day:
                dispatch(
                    setTaskViewAnchor(
                        moment(taskViewAnchor).subtract(1, "days").valueOf()
                    )
                );
                break;
            default:
                break;
        }
    };

    const anchorNext = () => {
        switch (taskViewUnit) {
            case TaskViewUnit.Month:
                dispatch(
                    setTaskViewAnchor(
                        moment(taskViewAnchor).add(1, "months").valueOf()
                    )
                );
                break;
            case TaskViewUnit.Week:
                dispatch(
                    setTaskViewAnchor(
                        moment(taskViewAnchor).add(1, "weeks").valueOf()
                    )
                );
                break;
            case TaskViewUnit.Day:
                dispatch(
                    setTaskViewAnchor(
                        moment(taskViewAnchor).add(1, "days").valueOf()
                    )
                );
                break;
            default:
                break;
        }
    };

    const anchorText = () => {
        switch (taskViewUnit) {
            case TaskViewUnit.Month:
                return moment(taskViewAnchor).format("YYYY-MM");
            case TaskViewUnit.Week:
                return moment(taskViewAnchor).format("YYYY, Wo");
            default:
                return moment(taskViewAnchor).format("YYYY-MM-DD");
        }
    };

    return (
        <Container>
            <Btn onClick={anchorPrev}>
                <BsChevronCompactLeft />
            </Btn>
            <Label>{anchorText()}</Label>
            <Btn onClick={anchorNext}>
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
