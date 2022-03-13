import * as React from 'react';
import moment from 'moment';

const Info = (props) => {
    const {cpuModel, cpuNumCores, cpuSpeed, osType, upTime} = props.infoData;

    return (
        <div className="col-sm-3 col-sm-offset-1 cpu-info">
            <h3>Operating System</h3>
            <div className="widget-text">{osType}</div>
            <h3>Time Online</h3>
            <div className="widget-text">{moment.duration(upTime).humanize()}</div>
            <h3>Processor information</h3>
            <div className="widget-text"><strong>Type:</strong> {cpuModel}</div>
            <div className="widget-text"><strong>Number of Cores:</strong> {cpuNumCores}</div>
            <div className="widget-text"><strong>Clock Speed:</strong> {cpuSpeed}</div>
        </div>
    )
}

export default Info;