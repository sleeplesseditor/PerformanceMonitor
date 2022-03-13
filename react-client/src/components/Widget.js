import * as React from 'react';
import Cpu from './Cpu';
import Info from './Info';
import Mem from './Mem';

const Widget = (props) => {
    const { freeMem,
        totalMem,
        usedMem,
        memUsage,
        osType,
        upTime,
        cpuModel,
        cpuSpeed,
        numCores,
        cpuLoad,
        macA
    } = props.data;
    const cpu = { cpuLoad};
    const mem = { totalMem, usedMem, memUsage};
    const info = { macA, osType, upTime, cpuModel, cpuSpeed, numCores };

    return (
        <>
            <Cpu cpuData={cpu} />
            <Mem memData={mem} />
            <Info infoData={info} />
        </>
    )
};

export default Widget;