import { StyleSheet } from 'react-native';
import colors from './colors.js'

const styles = StyleSheet.create({
  navBar: {
    padding: 6,
    flex: 0,
    flexDirection: 'row',
    backgroundColor: colors.textPri,
    alignItems: "center",
    minHeight: 25,
  },
  navText: {
    fontSize: 20,
    marginLeft: 8,
    color: colors.bg,
  },
});

export default styles;
