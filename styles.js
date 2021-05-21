import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  note: {
    padding: 5,
  },
  addNote: {
    backgroundColor: 'purple',
    fontSize: 15,
    padding: 10,
},

appButtonContainer: {
  backgroundColor: "violet",
  paddingVertical: 10,
  paddingHorizontal: 12
},
appButtonText: {
  fontSize: 12,
  color: "black",
  alignSelf: "center",
},

});

export default styles;
  