import * as React from 'react';
import drawCircle from '../utilities/canvasLoadAnimation';

const Mem = (props) => {
    const { totalMem, freeMem, memUsage, memWidgetId} = props.memData;
    const canvas = document.querySelector(`.${memWidgetId}`);
    drawCircle(canvas, memUsage * 100);
    const totalMemInGB = (totalMem / 1073741824 * 100) * 100;
    const freeMemInGB = Math.floor(freeMem / 1073741824 * 100) * 100;
    return (
        <div className="col-sm-3 mem">
            <h3>Memory Usage</h3>
            <div className="canvas-wrapper">
                <canvas className={memWidgetId} width="200" height="200"></canvas>
                <div className="mem-text">{memUsage * 100}%</div>
            </div>
            <div>Total Memory: {totalMemInGB} GB</div>
                <div>Free Memory: {freeMemInGB} GB</div>
        </div>
    )
}

export default Mem;