import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import ConnectionIndicator from './components/ConnectionIndicator';

const Hello = () => {
  return (
    <div
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        id="header"
        style={{
          border: '1px solid blue',
          justifyContent: 'space-between',
          height: '10%',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>HEADER 10%</h1>
        <ConnectionIndicator />
      </div>
      <div
        style={{
          background: 'lightgray',
          display: 'flex',
          justifyContent: 'space-between',
          textAlign: 'center',
          height: '80%',
        }}
      >
        <div
          style={{
            background: 'gray',
            textAlign: 'center',
            width: '10%',
          }}
        >
          <h1 style={{ textAlign: 'center' }}>LEFT 10%</h1>
        </div>
        <div
          style={{
            background: 'lightblue',
            width: '80%',
            height: '80%',
          }}
        >
          <h1 style={{ textAlign: 'center' }}>MAIN 80%</h1>
        </div>
        <div
          style={{
            textAlign: 'center',
            background: 'lightgray',
            width: '10%',
          }}
        >
          <h1 style={{ textAlign: 'center' }}>RIGHT 80%</h1>
        </div>
      </div>
      <div
        id="header"
        style={{
          border: '1px solid blue',
          height: '24px',
          width: '99%',
          bottom: '24px',
          position: 'absolute',
        }}
      >
        <h1 style={{ textAlign: 'center', fontSize: '16px' }}>FOOTER 10%</h1>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
