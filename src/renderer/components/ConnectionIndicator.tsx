import React, { useEffect, useState } from 'react';
import HttpMethods from 'renderer/services/axios';
import red from '../assets/images/red.png';

import green from '../assets/images/green.png';

const methods = new HttpMethods();

const ConnectionIndicator = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [Count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      methods
        .Get('/')
        .then((res: Record<string, unknown>) => {
          if (res) {
            return setIsConnected(true);
          }
          return setIsConnected(false);
        })
        .catch((e) => {
          return e;
        });

      setCount(Count + 1);
    }, 100);
  }, [Count]);
  return (
    <>
      {isConnected ? (
        <img alt="Connected" src={green} height="50px" width="50px" />
      ) : (
        <img alt="Not Connected" src={red} height="50px" width="50px" />
      )}
      {Count}
    </>
  );
};

export default ConnectionIndicator;
