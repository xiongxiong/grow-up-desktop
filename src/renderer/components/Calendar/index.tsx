import { memo } from "react";
import styled, { css } from "styled-components";

export enum CalendarLayout {
    Hori = "Hori",
    Vert = "Vert",
    Grid = "Grid",
}

export enum CalendarUnitLevel {
    Year = "Year",
    Quarter = "Quarter",
    Month = "Month",
    Third = "Third",
    Week = "Week",
    Day = "Day",
    Half = "Half",
    Hour = "Hour",
    Minute = "Minute",
    Second = "Second",
}

export interface CalendarProps {
    layout: CalendarLayout;
}

export default memo(() => {
    const items = [];
    return <Container></Container>;
});

const Container = styled.div.attrs({} as { layout: string })`
    flex: 1;
    display: flex;

    ${(props) => {
        switch (props.layout) {
            case "Hori":
                return css`
                  flex-direction: row;
                  justify-content: flex-start;
                  align-items: stretch;
                  flex-wrap: nowrap;
                  overflow-x: auto;
                `;
            case "Vert":
                return css`
                  flex-direction: column;
                  justify-content: flex-start;
                  align-items: stretch;
                  overflow-y: auto;
                `;
            case "Grid":
                return css`
                  flex-direction: row;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  overflow-y: auto;
                `;
            default:
                return undefined;
        }
    }}
`;

const ItemContainer = styled.div.attrs({} as {layout: string})`
  border: 1px dashed lightgray;

  ${props => {
    switch (props.layout) {
      case "Hori":
        return css`
          width: 120px;
        `;
      case "Vert":
        return css`
          height: 60px;
        `;
      case "Grid":
        return css`
          width: 240px;
          height: 120px;
        `;
      default:
        return undefined;
    }
  }}
`;
