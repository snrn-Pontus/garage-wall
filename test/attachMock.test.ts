import { attachMock } from '../src/mock/utils/attachAdapter';
import { MockBuilder } from '../src/mock/MockBuilder';
import axios from 'axios';
import MockAdapter from '../src/mock/MockAdapter';

describe('attachMock', () => {
  it('should attach to axios', function() {
    let mockBuilder = new MockBuilder();
    const setRequestsMock = jest.fn();
    attachMock(mockBuilder, setRequestsMock);
    let mockAdapter = MockAdapter(mockBuilder, setRequestsMock);

    expect(
      axios &&
        axios.defaults &&
        axios.defaults.adapter &&
        axios.defaults.adapter.toString()
    ).toEqual(mockAdapter.toString());
  });
});
