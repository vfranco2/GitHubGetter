import { StyleSheet } from 'react-native';
import colors from './colors.js'

const styles = StyleSheet.create({
  profilePage: {
    flex:1,
    backgroundColor: colors.bgAccent
  },
  userProfile: {
    flex:0,
    margin: 8,
    padding: 16,
    backgroundColor: colors.bg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    margin: 6,
    alignSelf: 'center',
  },
  userName: {
    margin: 4,
    fontSize: 30,
    color: colors.textSec,
    textAlign: 'center',
    alignSelf: 'center'
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetailsLeft: {
    fontSize: 16,
    color: colors.textPri,
  },
  userDetailsRight: {
    fontSize: 16,
    color: colors.textPri,
    textAlign: 'right',
  },
  breakText: {
    fontSize: 20,
    color: colors.textPri,
    marginHorizontal:16,
    marginVertical:2,
  },
  repoList: {
    backgroundColor: colors.bg,
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'column',
  },
  repoName: {
    fontSize: 20,
    color: colors.textPri,
  },
  repoName: {
    fontSize: 16,
    color: colors.textSec,
    textAlign: 'left',
  }
});

export default styles;
