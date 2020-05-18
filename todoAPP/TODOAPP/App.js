import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Button, TextInput, FlatList, ScrollView } from 'react-native';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      errors: {},
      newItem: "",

    }
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title} >To Do List</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder='e.g Assignment'
            value={this.state.newItem}
            style={styles.input}
            onChangeText={(value) => this.updateTask(value)} />

        </View>
        <Button onPress={() => this.addTask()} title='Add Task' />

        <ScrollView>
          {this.state.list.map((task, i) =>
            <View style={styles.list} key={i}>
              <Text style={styles.result}>{task['name']}</Text>
              <Button onPress={(e) => this.deleteTask(e, i)} title='Delete Task' />
            </View>
          )}
        </ScrollView>

      </View>
    );
  }
  updateTask = (val) => {
    this.setState({
      newItem: val
    })

  }
  updateDate = (dat) => {
    this.setState({
      date: dat
    })

  }

  addTask = () => {
    this.setState(state => {
      const task = {}

      task['name'] = state.newItem
      task['date'] = state.date
      task['check'] = false

      return {
        list: [...state.list, task],
        newItem: '',
        date: "",
        errors: {}
      }
    })
  }
  deleteTask = (e, i) => {
    this.setState(state => {
      let flag = 0
      const taskscopy = [...this.state.list];
      let count = state.checkedCount;
      const task = taskscopy[i]
      if (task['check'] == true) {
        task['check'] = false;
        flag = 1
      }
      taskscopy[i] = task;
      console.log(task)
      taskscopy.splice(i, 1);
      count = count - flag;
      return {
        list: taskscopy,
        checkedCount: count,
      }
    })
  }


}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  header: {
    height: 60,
    paddingTop: 18,
    backgroundColor: 'coral',
    width: 400
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
  },

});