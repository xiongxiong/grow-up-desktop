import { CyclePeriod, CycleHead, CycleTail } from "renderer/store/data";
import styled from "styled-components";
import CycleHeadView from "../CycleHead";
import CycleTailView from "../CycleTail";
import { AiOutlineMinusCircle } from "react-icons/ai";
import BasicBtn from "../BasicBtn";

export interface CyclePeriodProps {
    cyclePeriod: CyclePeriod;
    updateCyclePeriod: (cyclePeriod: CyclePeriod) => void;
    removeCyclePeriod: () => void;
}

export default (props: CyclePeriodProps) => {
    const {
        cyclePeriod,
        cyclePeriod: { cycleHead, cycleTail },
        updateCyclePeriod,
        removeCyclePeriod,
    } = props;

    const updateCycleHead = (cycleHead?: CycleHead) =>
        updateCyclePeriod({ ...cyclePeriod, cycleHead: cycleHead });

    const updateCycleTail = (cycleTail?: CycleTail) =>
        updateCyclePeriod({ ...cyclePeriod, cycleTail: cycleTail });

    return (
        <Container>
            <LeftBox></LeftBox>
            <MiddleBox>
                <CycleHeadView
                    cycleHead={cycleHead}
                    updateCycleHead={updateCycleHead}
                />
                <CycleTailView
                    cycleTail={cycleTail}
                    updateCycleTail={updateCycleTail}
                    style={{marginTop: "4px"}}
                />
            </MiddleBox>
            <Btn onClick={removeCyclePeriod}>
                <AiOutlineMinusCircle />
            </Btn>
        </Container>
    );
};

const Container = styled.div`
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: stretch;
    border: 1px dashed lightgray;
    border-radius: 4px;
    margin-bottom: 4px;
`;

const LeftBox = styled.div`
    width: 8px;
`;

const MiddleBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

const RightBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Spacer = styled.p`
    margin: 0px 8px;
`;

const Btn = styled(BasicBtn)`
    padding: 12px;
`;
