import { CyclePeriod, CycleSpot, CycleUnit } from "renderer/store/data";
import styled from "styled-components";
import CycleSpotView from "../CycleSpotView";

export interface CyclePeriodViewProps {
  cycleUnit: CycleUnit,
  cyclePeriod: CyclePeriod,
  updateCyclePeriod: (cyclePeriod: CyclePeriod) => void,
}

export default (props: CyclePeriodViewProps) => {
  const {cycleUnit, cyclePeriod, cyclePeriod: {spotHead = {}, spotTail = {}}, updateCyclePeriod} = props;

  const updateCycleSpotHead = (cycleSpot?: CycleSpot) => {
    updateCyclePeriod && updateCyclePeriod({...cyclePeriod, spotHead: cycleSpot});
  }

  const updateCycleSpotTail = (cycleSpot?: CycleSpot) => {
    updateCyclePeriod && updateCyclePeriod({...cyclePeriod, spotTail: cycleSpot});
  }

  return (
    <Container>
      <CycleSpotView cycleUnit={cycleUnit} cycleSpot={spotHead} updateCycleSpot={updateCycleSpotHead}/>
      <Separator>-</Separator>
      <CycleSpotView cycleUnit={cycleUnit} cycleSpot={spotTail} updateCycleSpot={updateCycleSpotTail}/>
    </Container>
  );
};

const Container = styled.div`
  height: 40px;
  margin-bottom: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed lightgray;
  border-radius: 4px;
`;

const Separator = styled.p`
  margin: 0px 8px;
`;
