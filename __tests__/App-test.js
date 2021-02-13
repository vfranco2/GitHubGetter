/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

import { loadDefaultData } from '../components/MainPage.js';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

beforeEach(() => {
  fetch.resetMocks();
});

test('returns result if array', () => {
  fetch.mockResponseOnce(JSON.stringify([{ id: 1 }]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return loadDefaultData('https://api.github.com/users')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0][0]).toEqual({ id: 1 });
    });
});
