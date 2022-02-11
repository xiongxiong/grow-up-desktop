import { ChangeEvent, useState } from "react";
import { CycleSpot, CycleUnit } from "renderer/store/data";
import styled from "styled-components";

export interface CycleSpotViewProps {
  cycleUnit: CycleUnit,
};

export default (props: CycleSpotViewProps) => {
  const {cycleUnit} = props;

  const [cycleSpot, setCycleSpot] = useState({} as CycleSpot);

  return (
    <Container tabIndex={0} onFocusCapture={e => console.log("HHHH")} onBlur={e => console.log("KKKK")}>
      {cycleUnit === CycleUnit.Year && <Input value={cycleSpot.month || ""} onChange={e => setCycleSpot({...cycleSpot, month: Number(e.currentTarget.value)})} />}
      {(cycleUnit === CycleUnit.Year || cycleUnit === CycleUnit.Month) && <Input value={cycleSpot.day || ""} onChange={e => setCycleSpot({...cycleSpot, day: Number(e.currentTarget.value)})}/>}
      {cycleUnit === CycleUnit.Week && <Input value={cycleSpot.weekday || ""} onChange={e => setCycleSpot({...cycleSpot, weekday: Number(e.currentTarget.value)})} />}
      <Input value={cycleSpot.hour || ""} onChange={e => setCycleSpot({...cycleSpot, hour: Number(e.currentTarget.value)})} />
      <Input value={cycleSpot.minute || ""} onChange={e => setCycleSpot({...cycleSpot, minute: Number(e.currentTarget.value)})} />
      <Input value={cycleSpot.second || ""} onChange={e => setCycleSpot({...cycleSpot, second: Number(e.currentTarget.value)})} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  border-radius: 4px;

  &:focus {
    background-color: orange;
  }
`;

const Input = styled.input`
  width: 40px;
  margin: 0px 4px;
`;
