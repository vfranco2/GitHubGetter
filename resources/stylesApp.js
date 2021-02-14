import { StyleSheet } from 'react-native';
import colors from './colors.js'

const styles = StyleSheet.create({
  navBar: {
    padding: 8,
    flex: 0,
    flexDirection: 'row',
    backgroundColor: colors.textPri,
    alignItems: "center",
  },
  navText: {
    fontSize: 20,
    marginLeft: 8,
    color: colors.bg,
  },
});

export default styles;
