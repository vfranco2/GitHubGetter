import { StyleSheet } from 'react-native';
import colors from './colors.js'

const styles = StyleSheet.create({
  repoPage: {
    flex:1,
    backgroundColor: colors.bgAccent
  },
  repoHeading: {
    flex:0,
    margin: 8,
    padding: 16,
    backgroundColor: colors.bg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12
  },
  repoName: {
    fontSize: 30,
    color: colors.textPri,
  },
  repoDesc: {
    fontSize: 16,
    color: colors.textSec,
  },
  breakText: {
    fontSize: 20,
    color: colors.textPri,
    marginHorizontal:16,
    marginVertical:2,
  },
  commitHead: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commitList: {
    backgroundColor: colors.bg,
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'column',
  },
  commitName: {
    fontSize: 24,
    color: colors.textPri,
  },
  commitInfo: {
    fontSize: 14,
    color: colors.textSec,
  },
  commitMsg: {
    marginVertical:2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  commitColor: {
    width: 16,
    height: 16,
    borderRadius: 2,
    backgroundColor: colors.commitColorPri,
    marginRight: 4
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
