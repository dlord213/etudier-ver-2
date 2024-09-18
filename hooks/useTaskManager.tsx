import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function useTaskManager() {
  const todayDate = new Date();

  const [task, setTask] = useState({
    title: "",
    description: "",
    date: new Date(),
    isStarred: false,
    isCompleted: false,
  });

  const [storedTasks, setStoredTasks] = useState(null);

  const handleTitleChange = (newTitle) => {
    setTask((prevTask) => ({
      ...prevTask,
      title: newTitle,
    }));
  };

  const handleDescriptionChange = (newDescription) => {
    setTask((prevTask) => ({
      ...prevTask,
      description: newDescription,
    }));
  };

  const toggleIsStarred = () => {
    setTask((prevTask) => ({
      ...prevTask,
      isStarred: !prevTask.isStarred,
    }));
  };

  const handleDateChange = (newDate) => {
    setTask((prevTask) => ({
      ...prevTask,
      date: newDate.toLocaleDateString(),
    }));
  };

  const dateOnChange = (event, selectedDate) => {
    handleDateChange(selectedDate);
  };

  const handleDeleteTask = async (taskIndex) => {
    const tasksString = await AsyncStorage.getItem("@tasks");
    let tasks = tasksString !== null ? JSON.parse(tasksString) : [];

    tasks.splice(taskIndex, 1);

    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));

    setStoredTasks([...tasks]);
  };

  const handleCompleteTask = async (taskIndex) => {
    const tasksString = await AsyncStorage.getItem("@tasks");
    let tasks = tasksString !== null ? JSON.parse(tasksString) : [];

    if (tasks[taskIndex].isCompleted == true) {
      tasks[taskIndex].isCompleted = false;
    } else {
      tasks[taskIndex].isCompleted = true;
    }

    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));

    setStoredTasks([...tasks]);
  };

  const handleStarredTask = async (taskIndex) => {
    const tasksString = await AsyncStorage.getItem("@tasks");
    let tasks = tasksString !== null ? JSON.parse(tasksString) : [];

    tasks[taskIndex].isStarred = !tasks[taskIndex].isStarred;

    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));

    setStoredTasks([...tasks]);
  };

  const handleDatePress = () => {
    DateTimePickerAndroid.open({
      value: task.date,
      onChange: dateOnChange,
      mode: "date",
      is24Hour: true,
      display: "calendar",
      minimumDate: new Date(),
    });
  };

  const handleAddTasks = async () => {
    const tasksString = await AsyncStorage.getItem("@tasks");
    let tasks = tasksString !== null ? JSON.parse(tasksString) : [];

    tasks.push(task);

    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));

    setStoredTasks(tasks);
    console.log("Task added successfully!", tasks);
  };

  useEffect(() => {
    const getStoredTasks = async () => {
      let result = await AsyncStorage.getItem("@tasks");
      if (result) {
        setStoredTasks(JSON.parse(result));
      }
    };

    if (storedTasks == null) {
      getStoredTasks();
    }
  }, [storedTasks]);

  return {
    task,
    setTask,
    storedTasks,
    handleTitleChange,
    handleDescriptionChange,
    toggleIsStarred,
    handleDateChange,
    handleDeleteTask,
    handleCompleteTask,
    handleStarredTask,
    handleDatePress,
    handleAddTasks,
  };
}
