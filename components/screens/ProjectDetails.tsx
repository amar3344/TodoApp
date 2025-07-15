import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {  PLInterface, PTasks } from '../dummyData/ProjectLists';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from "react-native-vector-icons/AntDesign";

interface IProps {
  navigation: {
    navigate: (stack:string,{prObj}:{prObj:PLInterface}) => void
  }
  
}


const ProjectDetails = (props: IProps) => {
  const route: any = useRoute();
  const { projectDetails } = route.params;
  const [currentProject,setCurrentProject] = useState({id:"",projectName:"",tasks:[]})
  const [tasks, setTasks] = useState(projectDetails.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [statusModal, setStatusModal] = useState<boolean>(false)
  const [currentTask, setCurrentTask] = useState<string>("")
  const [addnewTaskModal, setAddnewTaskModal] = useState<boolean>(false)

  const navigateToback = () => {
    // console.log("onUpdatedProjects==>", route.params)
    props.navigation.navigate("ProjectsList",{prObj:currentProject})

  }

  const handleCurrentStatusTask = (status: string) => {
    const updatedTaskArray = tasks.map((task: { name: string }) => task.name === currentTask ? { ...task, status: status } : task)
    setStatusModal(false)
    setTasks(updatedTaskArray)
    projectDetails.tasks = updatedTaskArray
    console.log(projectDetails,"<<<<<<<projectDetails")
    setCurrentProject(projectDetails)
  }

  const renderStatusModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={statusModal}
        statusBarTranslucent
        onRequestClose={() => setStatusModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalprojectStyle}>Project Name : {projectDetails.projectName}</Text>
            <Text style={styles.modalCurrentTaskStyle}>{currentTask}</Text>
            <TouchableOpacity style={styles.checkBoxContainer} onPress={() => handleCurrentStatusTask("yet to start")}>
              <View style={[styles.checkboxStyles, { backgroundColor: "orange" }]} />
              <Text style={styles.modalStatus}>Yet to start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkBoxContainer} onPress={() => handleCurrentStatusTask("progress")}>
              <View style={[styles.checkboxStyles, { backgroundColor: "yellow" }]} />
              <Text style={styles.modalStatus}>In progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkBoxContainer} onPress={() => handleCurrentStatusTask("completed")}>
              <View style={[styles.checkboxStyles, { backgroundColor: "green" }]} />
              <Text style={styles.modalStatus}>Completed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  const handleTaskStatus = (task: string) => {
    setCurrentTask(task)
    setStatusModal(true)
  }

  const renderEachTask = (task: PTasks, index: number) => {
    return (
      <TouchableOpacity key={task.name + index} style={styles.eachTaskStyles} onPress={() => handleTaskStatus(task.name)}>
        <Text style={[styles.taskNameStyles, task.status === "yet to start" ? { backgroundColor: "orange" } : task.status === "progress" ? { backgroundColor: "yellow" } : { backgroundColor: "green" }]}>{task.name}</Text>
      </TouchableOpacity>
    )
  }

  const addnewTask = () => {
    setAddnewTaskModal(true)
  }

  const closeModal = () => {
    setAddnewTaskModal(false)
  }

  const getTaskName = (task: string) => {
    setNewTaskTitle(task)
  }

  const addNewTaskToProject = () => {
    if (newTaskTitle === "") return true
    const addnewTask = {
      name: newTaskTitle,
      status: "yet to start",
    }
    const updateTaskList = [...tasks, addnewTask]
    setNewTaskTitle("")
    setTasks(updateTaskList)
    setAddnewTaskModal(false)
  }

  const renderAddNewTaskModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={addnewTaskModal}
        statusBarTranslucent
        onRequestClose={() => setAddnewTaskModal(false)}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity onPress={closeModal} style={styles.closeModalButtonContainer}>
            <AntDesign name="close" size={responsiveFontSize(2)} color={"#000000"} />
          </TouchableOpacity>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalProjectName}>{"Add Task"}</Text>
              <TextInput
                value={newTaskTitle}
                placeholder={"Add New Tasl Here...."}
                style={styles.textinputStyles}
                onChangeText={getTaskName}
              />
            </View>
            <TouchableOpacity onPress={addNewTaskToProject} style={styles.footerButton}>
              <Text style={styles.addProjectText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToback}>
        <FontAwesome name="arrow-left" color={"#FFFFFF"} size={responsiveHeight(2)} />
      </TouchableOpacity>
      <View style={styles.projectItem}>
        <View style={styles.rowContainer}>
          <Text style={styles.projectNameStyles} >{projectDetails.projectName}</Text>
        </View>
        {tasks.map((eachTask: PTasks, index: number) => renderEachTask(eachTask, index))}
        <View style={styles.rowContainer}>
        </View>
      </View>
      <TouchableOpacity style={styles.footerButton} onPress={addnewTask}>
        <Text style={styles.addProjectText}>Add New Task</Text>
      </TouchableOpacity>
      {renderStatusModal()}
      {renderAddNewTaskModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  closeModalButtonContainer: {
    backgroundColor: "#FFFFFF",
    height: responsiveFontSize(4),
    width: responsiveFontSize(4),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  shareContainer: {
    height: responsiveHeight(3),
    width: responsiveHeight(3),
    borderRadius: responsiveHeight(0.5),
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  modalprojectStyle: {
    fontFamily: "OpenSans-Bold",
    fontSize: responsiveFontSize(1.6),
    color: "#000000",
  },
  deleteContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: responsiveFontSize(0.5),
  },
  addTaskText: {
    fontFamily: "OpenSans-Regular",
    fontSize: responsiveFontSize(1.6),
    color: "#FFFFFF",
    padding: responsiveFontSize(1),
  },
  addnewTaskContainer: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: responsiveFontSize(0.5),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    marginTop: responsiveHeight(1),
  },
  modalCurrentTaskStyle: {
    fontFamily: "OpenSans-Bold",
    fontSize: responsiveFontSize(2.4),
    color: "#000000",
  },
  modalStatus: {
    fontFamily: "OpenSans-Regular",
    fontSize: responsiveFontSize(2.4),
    color: "#000000",
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: "center",
    gap: responsiveWidth(4),
  },
  checkboxStyles: {
    height: responsiveHeight(2.5),
    width: responsiveHeight(2.5),
    borderWidth: 1,
    borderRadius: responsiveHeight(0.4),
  },
  modalProjectName: {
    fontFamily: "OpenSans-Regular",
    fontSize: responsiveFontSize(2),
    color: "#000000",
  },
  textinputStyles: {
    fontFamily: "OpenSans-Regular",
    fontSize: responsiveFontSize(2),
    color: "#000000",
    padding: responsiveHeight(1),
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: responsiveFontSize(1)
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#00000050",
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: responsiveHeight(1),
  },
  addProjectText: {
    fontFamily: "OpenSans-Bold",
    fontSize: responsiveFontSize(2),
    color: "#FFFFFF",
  },
  eachTaskStyles: {
    marginVertical: responsiveHeight(0.2),
  },
  taskNameStyles: {
    fontFamily: "OpenSans-Light",
    fontSize: responsiveFontSize(2),
    color: "#000000",
    padding: responsiveFontSize(0.5),
    borderRadius: responsiveFontSize(0.4)
  },
  projectNameStyles: {
    fontFamily: "OpenSans-Regular",
    fontSize: responsiveFontSize(3),
    color: "#1c5aedff",
    marginBottom: responsiveHeight(0.5),
  },
  headerTextStyle: {
    fontFamily: "OpenSans-Bold",
    fontSize: responsiveFontSize(3.4),
    color: "#1c5aedff"
  },
  footerButton: {
    height: responsiveHeight(5),
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: responsiveHeight(3),
    borderRadius: responsiveFontSize(1),
  },
  flatlistContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? responsiveHeight(5) : responsiveHeight(4),
    backgroundColor: "#7e9feaff",
    paddingHorizontal: responsiveWidth(5),
    justifyContent: "space-between",
  },
  projectItem: {
    marginVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
    backgroundColor: "#adc1efff",
    flexGrow: 1,
  },
});

export default ProjectDetails;