
import * as React from 'react';
import {useState, useEffect} from 'react'
import {View, Button, Text, TextInput, ScrollView, Alert, TouchableOpacity} from 'react-native';
import styles from './styles';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';


const App = () =>{

const [notes, setNewNotes] = useState([])

const [currentNote, setNewNote] = useState('')

const [isLoading, setLoading] = useState(false);




useEffect(() => {
  readData()})

const readData = async () =>{
  try{
    const newNote = await AsyncStorage.getItem('notes')
    const parsedNotes = JSON.parse(newNote)
    if(!isLoading){
    if(parsedNotes === null && notes ===[] || parsedNotes === JSON.stringify(notes)){
    console.log("ei päivitettävää")
    }
    else if(parsedNotes !== null){
      setNewNotes(parsedNotes)
    } else{
      setNewNotes([])
    }}
    setLoading(true)
  } catch(e){
    console.log(e)
  }
}

const NotesApp = ({navigation}) => {
return (
  <ScrollView>
  {notes.map(note=>
    <Note 
    id = {note.id}
    name = {note.name}/>)}
    <Button title="add Note" onPress={() => navigation.navigate('AddNotes', {navigation})}/>
    </ScrollView>
);
}

const Note = (props) => {
  return( 
    <Text style={styles.note}>{props.name}</Text>
  )
}

const NoteAlert = () =>{
  Alert.alert(
    "Et voi lisätä samaa muistiinpanoa kahdesti",
    ""
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]

  )
}

const handleOnChange = (value) =>{
  setNewNote(value)
}

const storeNote = async(item, navigation) =>{

  if(notes.find(note => note.name === item)){
    NoteAlert()
  } else {

  const noteObj = {
      id: notes.length+1,
      name: item
    }

  const newStateNotes = notes.concat(noteObj)

  await AsyncStorage.setItem('notes', JSON.stringify(newStateNotes))

  setNewNote('')
  setLoading(false)
  navigation.navigate('Notes')
  }
} 


const AddNote = ({navigation}) =>{

  return(
  <View>
  <TextInput
      style = {styles.addNote}
      placeholder = "Create note" 
      value = {currentNote}
      autoFocus = {true}
      onChangeText={(value) =>{handleOnChange(value)}}
  />
    <TouchableOpacity
    style={styles.appButtonContainer}
    onPress = {() => storeNote(currentNote, navigation)}
    >
    <Text style={styles.appButtonText}>Add Note</Text>
  </TouchableOpacity>
  </View>
  )
}

  const Stack = createStackNavigator()
  return(
  <NavigationContainer style = {styles.root}>
    <Stack.Navigator initialRouteName="Notes">
      <Stack.Screen name="Notes" component={NotesApp} />
     <Stack.Screen name = "AddNotes" component={AddNote}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App
