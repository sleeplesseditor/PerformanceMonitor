import * as React from 'react';
import './App.css';

import socket from './utilities/socketConnection';
import Widget from './components/Widget';

const App = () => {
  const [performanceData, setPerformanceData] = ({});

  React.useEffect(() => {
    socket.on('data', (data) => {
      const currentState = ({...performanceData});
      currentState[data.macA] = data;
      setPerformanceData(currentState);
    });
  }, []);

  let widgets = [];
  const data = performanceData;
  Object.entries(data).forEach(([key, value]) => {
    widgets.push(<Widget key={key} data={value} />)
  })
  return (
    <div className="App">
      {widgets}
    </div>
  );
}

export default App;
