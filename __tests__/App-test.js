import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import colors from '../resources/colors.js'

it('renders correctly', () => {
  renderer.create(<App/>);
});


//jest.useFakeTimers()

/*test('renders correctly', () => {
  const tree = renderer
    .create(<App/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});*/
