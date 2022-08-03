import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export type EditTaskArgs ={ 
taskId: Number;
taskNewTitle: string;
}
export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);


  function handleAddTask(newTaskTitle: string) {
    // Checking if the task has already been added
    const taskWithSameTitle = tasks.find((task) => task.title === newTaskTitle);
    if (taskWithSameTitle) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    // TODO - add new task
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasksList = tasks.map((task) => ({ ...task }));

    const toggleTask = updatedTasksList.find((i) => i.id === id);
    if (!toggleTask) {
      return;
    } else {
      toggleTask.done = !toggleTask.done;
      setTasks(updatedTasksList);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover este item?",
      [
        {
          style: "cancel",
          text: "Não",
        },
        {
          style: "destructive",
          text: "Sim",
          onPress: () => {
            //TODO - remove task from state
            const updatedTasksList = tasks.filter((task) => task.id !== id);
            setTasks(updatedTasksList);
          },
        },
      ]
    );
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
    const updatedTasksList = tasks.map((task) => ({ ...task }));
    const taskToBeEdited = updatedTasksList.find((i) => i.id === taskId);
    if (!taskToBeEdited) {
      return;
    } else {
      taskToBeEdited.title = taskNewTitle;
      setTasks(updatedTasksList);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
