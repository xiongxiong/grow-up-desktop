import { CyclePeriod, CycleSpot, CycleUnit } from "renderer/store/data";
import styled from "styled-components";
import CycleSpotView from "../CycleSpotView";
import {AiOutlineMinusCircle} from "react-icons/ai";
import BasicBtn from "../BasicBtn";

export interface CyclePeriodViewProps {
  cycleUnit: CycleUnit,
  cyclePeriod: CyclePeriod,
  updateCyclePeriod: (cyclePeriod: CyclePeriod) => void,
  removeCyclePeriod: () => void,
}

export default (props: CyclePeriodViewProps) => {
  const {cycleUnit, cyclePeriod, cyclePeriod: {spotHead, spotTail}, updateCyclePeriod, removeCyclePeriod} = props;

  const updateCycleSpotHead = (cycleSpot?: CycleSpot) => updateCyclePeriod({...cyclePeriod, spotHead: cycleSpot});

  const updateCycleSpotTail = (cycleSpot?: CycleSpot) => updateCyclePeriod({...cyclePeriod, spotTail: cycleSpot});

  return (
    <Container>
      <CycleSpotView cycleUnit={cycleUnit} cycleSpot={spotHead} updateCycleSpot={updateCycleSpotHead}/>
      <Spacer>-</Spacer>
      <CycleSpotView cycleUnit={cycleUnit} cycleSpot={spotTail} updateCycleSpot={updateCycleSpotTail}/>
      <Btn onClick={removeCyclePeriod}>
        <AiOutlineMinusCircle />
      </Btn>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed lightgray;
  border-radius: 4px;
`;

const Spacer = styled.p`
  margin: 0px 8px;
`;

const Btn = styled(BasicBtn)`
    padding: 4px;
    margin-left: 4px;
    border-radius: 4px;
`;
