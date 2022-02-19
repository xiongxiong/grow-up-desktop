import { memo } from "react";
import styled from "styled-components";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "renderer/store";
import { setTimeAnchor, switchViewUnit, ViewUnit } from "renderer/store/settings";
import moment from "moment";
import BasicBtn from "../BasicBtn";

export interface DateWheelProps {}

export default (props: DateWheelProps) => {
    const dispatch = useDispatch();

    const viewUnit = useSelector(
        (state: RootState) => state.settings.viewUnit
    );

    const timeAnchor = useSelector(
        (state: RootState) => state.settings.timeAnchor || Date.now()
    );

    const anchorPrev = () => {
        switch (viewUnit) {
            case ViewUnit.Month:
                dispatch(
                    setTimeAnchor(
                        moment(timeAnchor).subtract(1, "months").valueOf()
                    )
                );
                break;
            case ViewUnit.Week:
                dispatch(
                    setTimeAnchor(
                        moment(timeAnchor).subtract(1, "weeks").valueOf()
                    )
                );
                break;
            case ViewUnit.Day:
                dispatch(
                    setTimeAnchor(
                        moment(timeAnchor).subtract(1, "days").valueOf()
                    )
                );
                break;
            default:
                break;
        }
    };

    const anchorNext = () => {
        switch (viewUnit) {
            case ViewUnit.Month:
                dispatch(
                    setTimeAnchor(
                        moment(timeAnchor).add(1, "months").valueOf()
                    )
                );
                break;
            case ViewUnit.Week:
                dispatch(
                    setTimeAnchor(
                        moment(timeAnchor).add(1, "weeks").valueOf()
                    )
                );
                break;
            case ViewUnit.Day:
                dispatch(
                    setTimeAnchor(
                        moment(timeAnchor).add(1, "days").valueOf()
                    )
                );
                break;
            default:
                break;
        }
    };

    const anchorText = () => {
        switch (viewUnit) {
            case ViewUnit.Month:
                return moment(timeAnchor).format("YYYY-MM");
            case ViewUnit.Week:
                return moment(timeAnchor).format("YYYY, Wo");
            default:
                return moment(timeAnchor).format("YYYY-MM-DD");
        }
    };

    return (
        <Container>
            <Btn onClick={anchorPrev}>
                <BsChevronCompactLeft />
            </Btn>
            <Label onClick={() => dispatch(switchViewUnit())}>{anchorText()}</Label>
            <Btn onClick={anchorNext}>
                <BsChevronCompactRight />
            </Btn>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Btn = styled(BasicBtn)`
    padding: 4px;
    border-radius: 2px;
`;

const Label = styled.div`
    width: 80px;
    padding: 0px 8px;
    font-size: small;
    text-align: center;
    user-select: none;

    &:hover {
      color: "#FF9F1C";
    }
`;
