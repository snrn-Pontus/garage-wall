# Garage Wall :tennis:

![CI](https://github.com/snrn-Pontus/garage-wall/workflows/CI/badge.svg)
[![Build Status](https://travis-ci.org/snrn-Pontus/garage-wall.svg?branch=master)](https://travis-ci.org/snrn-Pontus/garage-wall)
[![devDependencies Status](https://david-dm.org/snrn-Pontus/garage-wall/dev-status.svg)](https://david-dm.org/snrn-Pontus/garage-wall?type=dev)
[![peerDependencies Status](https://david-dm.org/snrn-Pontus/garage-wall/peer-status.svg)](https://david-dm.org/snrn-Pontus/garage-wall?type=peer)

`npm i garage-wall`

`yarn add garage-wall`

Swedish tennis pro Björn Borg began his career by hitting balls against his family's garage door.
When you don't have anyone to play against or even a court, you have to find another way to progress.

This is the idea behind this library.
It enables you do define mock responses to axios requests, which can be dynamically altered depending on path or query parameters.

It also has a panel that enables you do see all outgoing requests and decide how you want to handle them.
This enables you to return different HTTP-statuses to test your error handling.
You can also edit the response before it gets sent.

You start by creating a `new MockBuilder()` and after that you can register mock callbacks to the different HTTP-methods.

`onGet()`, `onPost()`, `onPut()` and `onDelete()` each accepts

| parameter     | type     | example |
| ------------- | -------- | ------- |
| `routeParams` | object   | aslala  |
| `urlPattern`  | string   | asdsa   |
| `callback`    | function | asdad   |

#### **routeParams**

object where the keys are url-placeholders and the values are RegExp as strings.

```typescript
const routeParams = { id: '\\d+' };
```

#### **urlPattern**

url string with bracketed placeholders for values.

```typescript
const pattern = 'url/{id}/';
```

#### **callback**

A function that will be called when a request matches its pattern.
The function will be called with a regular AxiosRequestConfig,
the variables matched in the url keyed to the placeholder name
and finally the url pattern.

```typescript
interface iMockResponseCallback {
  (
    config: AxiosRequestConfig,
    pathParams: { [param: string]: string },
    urlPattern: string
  ): iExtendedResponse;
}
```

It should return an extended version of a regular axios response,
containing the placeholder to value map and the pattern.

```typescript
interface iExtendedResponse extends AxiosResponse {
  routeParams: iRouteParams;
  urlPattern: string;
}
```

#### **example**

```javascript
import react from 'react';
import { GarageWall } from 'garage-wall';
const mock = new MockBuilder().onGet(
  { '{dataId}': '\\d+', '{word}': '\\w+' },
  `/data/{dataId}/{word}`,
  (config, routeParams, urlPattern) => {
    /* do whatevery you want */
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
);
const App = () => {
  return (
    <div>
      <GarageWall mock={mock} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```
