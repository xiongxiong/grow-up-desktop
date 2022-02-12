import moment from "moment";
import { ChangeEvent } from "react";
import { Period } from "renderer/store/data";
import styled from "styled-components";

export interface TaskPeroidViewProps {
    period?: Period;
    updatePeroid: (period: Period) => void;
}

export default (props: TaskPeroidViewProps) => {
    const { period: { timeHead, timeTail } = {}, updatePeroid } = props;

    const format = "yyyy-MM-DDTHH:mm";

    const onChangeTimeHead = (e: ChangeEvent<HTMLInputElement>) =>
        updatePeroid({
            timeHead: e.currentTarget.value ? moment(e.currentTarget.value).valueOf() : undefined,
            timeTail,
        });

    const onChangeTimeTail = (e: ChangeEvent<HTMLInputElement>) =>
        updatePeroid({
            timeHead,
            timeTail: e.currentTarget.value ? moment(e.currentTarget.value).valueOf() : undefined,
        });

    return (
        <Container>
            {timeHead ? (
                <Input
                    type="datetime-local"
                    value={moment(timeHead).format(format)}
                    onChange={onChangeTimeHead}
                />
            ) : (
                <Input type="datetime-local" onChange={onChangeTimeHead} />
            )}
            <Separator>-</Separator>
            {timeTail ? (
                <Input
                    type="datetime-local"
                    value={moment(timeTail).format(format)}
                    onChange={onChangeTimeTail}
                />
            ) : (
                <Input type="datetime-local" onChange={onChangeTimeTail} />
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    flex: 1;
    height: 40px;
    padding: 0px 8px;
`;

const Separator = styled.p`
    margin: 0px 8px;
`;
