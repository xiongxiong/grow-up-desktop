import {
    CycleTail,
    CycleDuration,
    CycleDurationList,
} from "renderer/store/data";
import styled from "styled-components";
import Separator from "../Separator";
import { MdClear } from "react-icons/md";
import BasicBtn from "../BasicBtn";
import { CSSProperties } from "react";

export interface CycleTailProps {
    cycleTail?: CycleTail;
    updateCycleTail: (cycleTail?: CycleTail) => void;
    style?: CSSProperties,
}

interface Duration {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
}

export default (props: CycleTailProps) => {
    const {
        cycleTail,
        cycleTail: { cycleDuration, duration = 0 } = {},
        updateCycleTail,
        style,
    } = props;

    const theDuration: Duration = {
        year: Math.floor(duration / 31536000),
        month: Math.floor(duration / 2592000) % 12,
        day: Math.floor(duration / 86400) % 30,
        hour: Math.floor(duration / 3600) % 24,
        minute: Math.floor(duration / 60) % 60,
        second: duration % 60,
    };

    const updateDuration = (du: Duration) => {
        const duNum =
            du.year * 31536000 +
            du.month * 2592000 +
            du.day * 86400 +
            du.hour * 3600 +
            du.minute * 60 +
            du.second;
        updateCycleTail &&
            updateCycleTail({
                ...cycleTail,
                duration:
                    cycleDuration === CycleDuration.Custom ? duNum : undefined,
            });
    };

    return (
        <Container style={style}>
            <Select
                value={cycleDuration}
                onChange={(e) => {
                    const cycleDuration = e.currentTarget
                        .value as CycleDuration;
                    updateCycleTail &&
                        updateCycleTail({
                            cycleDuration,
                            duration:
                                cycleDuration === CycleDuration.Custom
                                    ? duration
                                    : undefined,
                        });
                }}
            >
                {[undefined, ...CycleDurationList].map((d, i) => (
                    <option key={i} value={d}>
                        {i === 0 ? "--" : d}
                    </option>
                ))}
            </Select>
            <Separator color="transparent" margin={4} />
            {cycleDuration === CycleDuration.Custom && (
                <>
                    <Select
                        value={theDuration.month}
                        onChange={(e) =>
                            updateDuration({
                                ...theDuration,
                                month: Number(e.currentTarget.value),
                            })
                        }
                    >
                        {[...Array(13).keys()].map((_, i) => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                    </Select>
                    <Separator color="transparent" margin={4} />
                    <Select
                        value={theDuration.day}
                        onChange={(e) =>
                            updateDuration({
                                ...theDuration,
                                day: Number(e.currentTarget.value),
                            })
                        }
                    >
                        {[...Array(31).keys()].map((_, i) => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                    </Select>
                    <Separator color="transparent" margin={4} />
                    <Select
                        value={theDuration.hour}
                        onChange={(e) =>
                            updateDuration({
                                ...theDuration,
                                hour: Number(e.currentTarget.value),
                            })
                        }
                    >
                        {[...Array(25).keys()].map((_, i) => (
                            <option key={i} value={i + 1}>
                                {i}
                            </option>
                        ))}
                    </Select>
                    <Separator color="transparent" margin={4} />
                    <Select
                        value={theDuration.minute}
                        onChange={(e) =>
                            updateDuration({
                                ...theDuration,
                                minute: Number(e.currentTarget.value),
                            })
                        }
                    >
                        {[...Array(61).keys()].map((_, i) => (
                            <option key={i} value={i + 1}>
                                {i}
                            </option>
                        ))}
                    </Select>
                    <Separator color="transparent" margin={4} />
                    <Select
                        value={theDuration.second}
                        onChange={(e) =>
                            updateDuration({
                                ...theDuration,
                                second: Number(e.currentTarget.value),
                            })
                        }
                    >
                        {[...Array(61).keys()].map((_, i) => (
                            <option key={i} value={i + 1}>
                                {i}
                            </option>
                        ))}
                    </Select>
                </>
            )}
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
