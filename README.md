# Garage Wall :tennis:

![CI](https://github.com/snrn-Pontus/garage-wall/workflows/CI/badge.svg)
[![Build Status](https://travis-ci.org/snrn-Pontus/garage-wall.svg?branch=master)](https://travis-ci.org/snrn-Pontus/garage-wall)
[![devDependencies Status](https://david-dm.org/snrn-Pontus/garage-wall/dev-status.svg)](https://david-dm.org/snrn-Pontus/garage-wall?type=dev)
[![peerDependencies Status](https://david-dm.org/snrn-Pontus/garage-wall/peer-status.svg)](https://david-dm.org/snrn-Pontus/garage-wall?type=peer)

```javascript
import react from 'react';
import { GarageWall } from 'garage-wall';

const App = () => {
  return (
    <div>
      <GarageWall
        mock={new MockBuilder().onGet(
          { '{dataId}': '\\d+', '{word}': '\\w+' },
          `/data/{dataId}/{word}`,
          (config, routeParams, urlPattern) => {
            return {
              routeParams,
              urlPattern,
              data: { boatsman: 'tjorven' },
              status: 200,
              statusText: 'ok',
              headers: {},
              config: config,
              request: null,
            };
          }
        )}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

![logo](./assets/preview.png)
