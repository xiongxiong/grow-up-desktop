import { CycleSpot, CycleUnit } from "renderer/store/data";
import styled from "styled-components";
import Separator from "../Separator";
import { MdClear } from "react-icons/md";
import BasicBtn from "../BasicBtn";

export interface CycleSpotViewProps {
    cycleUnit: CycleUnit;
    cycleSpot?: CycleSpot;
    updateCycleSpot: (cycleSpot?: CycleSpot) => void;
}

export default (props: CycleSpotViewProps) => {
    const { cycleUnit, cycleSpot, updateCycleSpot } = props;

    return (
        <Container>
            {cycleUnit === CycleUnit.Year && (
                <>
                    <Select
                        value={cycleSpot?.month}
                        onChange={(e) =>
                            updateCycleSpot({
                                ...cycleSpot,
                                month: Number(e.currentTarget.value),
                            })
                        }
                    >
                        {[
                            "--",
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                        ].map((m, i) => (
                            <option key={i} value={i === 0 ? undefined: i}>
                                {m}
                            </option>
                        ))}
                    </Select>
                    <Separator color="transparent" margin={4} />
                </>
            )}
            {(cycleUnit === CycleUnit.Year ||
                cycleUnit === CycleUnit.Month) && (
                <>
                    <Select
                        value={cycleSpot?.day}
                        onChange={(e) =>
                            updateCycleSpot({
                                ...cycleSpot,
                                day: Number(e.currentTarget.value),
                            })
                        }
                    >
                        {(cycleSpot?.month === undefined ||
                        [1, 3, 5, 7, 8, 10, 12].includes(cycleSpot?.month)
                            ? [...Array(32).keys()]
                            : cycleSpot?.month === 2
                            ? [...Array(30).keys()]
                            : [...Array(31).keys()]
                        ).map((_, i) => (
                            <option key={i} value={i === 0 ? undefined : i}>
                                {i === 0 ? "--" : i.toString().padStart(2, "0")}
                            </option>
                        ))}
                    </Select>
                    <Separator color="transparent" margin={4} />
                </>
            )}
            {cycleUnit === CycleUnit.Week && (
                <>
                    <Select
                        value={cycleSpot?.weekday}
                        onChange={(e) =>
                            updateCycleSpot({
                                ...cycleSpot,
                                weekday: Number(e.currentTarget.value),
                            })
                        }
                    >
                        {[
                            "--",
                            "Sunday",
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                        ].map((m, i) => (
                            <option key={i} value={i === 0 ? undefined : i}>
                                {m}
                            </option>
                        ))}
                    </Select>
                    <Separator color="transparent" margin={4} />
                </>
            )}
            <Select
                value={cycleSpot?.hour}
                onChange={(e) =>
                    updateCycleSpot({
                        ...cycleSpot,
                        hour: Number(e.currentTarget.value),
                    })
                }
            >
                {[...Array(25).keys()].map((_, i) => (
                    <option key={i} value={i === 0 ? undefined : i}>
                        {i === 0 ? "--" : i.toString().padStart(2, "0")}
                    </option>
                ))}
            </Select>
            <Separator color="transparent" margin={4} />
            <Select
                value={cycleSpot?.minute}
                onChange={(e) =>
                    updateCycleSpot({
                        ...cycleSpot,
                        minute: Number(e.currentTarget.value),
                    })
                }
            >
                {[...Array(61).keys()].map((_, i) => (
                    <option key={i} value={i === 0 ? undefined : i}>
                        {i === 0 ? "--" : i.toString().padStart(2, "0")}
                    </option>
                ))}
            </Select>
            <Separator color="transparent" margin={4} />
            <Select
                value={cycleSpot?.second}
                onChange={(e) =>
                    updateCycleSpot({
                        ...cycleSpot,
                        second: Number(e.currentTarget.value),
                    })
                }
            >
                {[...Array(61).keys()].map((_, i) => (
                    <option key={i} value={i === 0 ? undefined : i}>
                        {i === 0 ? "--" : i.toString().padStart(2, "0")}
                    </option>
                ))}
            </Select>
            <Btn onClick={() => updateCycleSpot(undefined)}>
                <MdClear />
            </Btn>
        </Container>
    );
};

const Container = styled.div`
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Select = styled.select``;

const Btn = styled(BasicBtn)`
    padding: 4px;
    margin-left: 4px;
    border-radius: 4px;
`;
