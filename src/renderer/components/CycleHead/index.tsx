import { CycleHead } from "renderer/store/data";
import styled from "styled-components";
import Separator from "../Separator";
import { MdClear } from "react-icons/md";
import BasicBtn from "../BasicBtn";

export interface CycleHeadProps {
    cycleHead?: CycleHead;
    updateCycleHead: (cycleHead?: CycleHead) => void;
}

export default (props: CycleHeadProps) => {
    const { cycleHead, updateCycleHead } = props;

    return (
        <Container>
            <Select
                value={cycleHead?.month}
                onChange={(e) =>
                  updateCycleHead({
                        ...cycleHead,
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
                    <option key={i} value={i === 0 ? undefined : i}>
                        {m}
                    </option>
                ))}
            </Select>
            <Separator color="transparent" margin={4} />
            <Select
                value={cycleHead?.day}
                onChange={(e) =>
                    updateCycleHead({
                        ...cycleHead,
                        day: Number(e.currentTarget.value),
                    })
                }
            >
                {(cycleHead?.month === undefined ||
                [1, 3, 5, 7, 8, 10, 12].includes(cycleHead?.month)
                    ? [...Array(32).keys()]
                    : cycleHead?.month === 2
                    ? [...Array(30).keys()]
                    : [...Array(31).keys()]
                ).map((_, i) => (
                    <option key={i} value={i === 0 ? undefined : i}>
                        {i === 0 ? "--" : i.toString().padStart(2, "0")}
                    </option>
                ))}
            </Select>
            <Separator color="transparent" margin={4} />
            <Select
                value={cycleHead?.weekday}
                onChange={(e) =>
                    updateCycleHead({
                        ...cycleHead,
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
            <Select
                value={cycleHead?.hour}
                onChange={(e) =>
                    updateCycleHead({
                        ...cycleHead,
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
                value={cycleHead?.minute}
                onChange={(e) =>
                    updateCycleHead({
                        ...cycleHead,
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
                value={cycleHead?.second}
                onChange={(e) =>
                    updateCycleHead({
                        ...cycleHead,
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
            <Btn onClick={() => updateCycleHead(undefined)}>
                <MdClear />
            </Btn>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Select = styled.select``;

const Btn = styled(BasicBtn)`
    padding: 4px;
    margin-left: 4px;
    border-radius: 4px;
`;
