import { StyleSheet } from 'react-native';
import colors from './colors.js'

const styles = StyleSheet.create({
  mainPage: {
    flex:0,
    backgroundColor: colors.bgAccent
  },
  userList: {
    backgroundColor: colors.bg,
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    marginRight: 12
  },
  userName: {
    fontSize: 26,
    color: colors.textPri
  },
  errorPane: {
    flex: 1,
    padding: 12,
    marginHorizontal: 8,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;
