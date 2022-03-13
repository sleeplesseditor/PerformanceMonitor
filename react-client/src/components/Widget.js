import * as React from 'react';
import Cpu from './Cpu';
import Info from './Info';
import Mem from './Mem';
import './widget.css';

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
        macA,
        isActive
    } = props.data;
    const cpuWidgetId = `cpu-widget-${macA}`;
    const memWidgetId = `cpu-widget-${macA}`;
    const cpu = { cpuLoad, cpuWidgetId };
    const mem = { freeMem, totalMem, usedMem, memUsage, memWidgetId };
    const info = { macA, osType, upTime, cpuModel, cpuSpeed, numCores };

    let notActive = '';
    if(!isActive) {
        notActive = <div className="not-active">Offline</div>
    }

    return (
        <div className="widget col-sm-12">
            {notActive}
            <Cpu cpuData={cpu} />
            <Mem memData={mem} />
            <Info infoData={info} />
        </div>
    )
};

export default Widget;