import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform, Modal, TextInput, Alert } from 'react-native';
import { ProjectsLists, PLInterface ,PTasks} from "../dummyData/ProjectLists";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

interface IProps{
  navigation:{
    navigate:(stack:string,{projectDetails}:{projectDetails:PLInterface})=>void,
  },
  // route:{
  //   params:any
  // }
}

const ProjectsList = (props:IProps) => {
  const [projects, setProjects] = useState<PLInterface[]>(ProjectsLists);
  const [addProjectName,setAddProjectName] = useState<string>("")
  const [addProjectModalVisible,setAddProjectModalVisible] = useState(false)

  useEffect(()=>{
    // if(!props.route.params) return
  })

  const addNewProject = async () => {
    const currentProjectlength = projects.length
    const newProject = { 
      id: Date.now().toString()+`${currentProjectlength}`, 
      projectName: addProjectName,
      tasks: []
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    setAddProjectModalVisible(false)
    setAddProjectName("")
  };

  const deleteProjectFronList = (id:string) =>{
    const updateProjectsList = projects.filter(project => project.id !== id)
    setProjects(updateProjectsList)   
  }

  const deleteProject = (projectID: string) => {
    Alert.alert('Alert', 'Do you want to delete the project', [
      {
        text: 'No',
        onPress: () => console.log("nothing"),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => deleteProjectFronList(projectID)
      },
    ]);
  }

  const goToProjectDetails = (porject:PLInterface) =>{
    props.navigation.navigate("ProjectDetails",{projectDetails:porject})
  }

  const renderTaskStatus = (taskArray: PTasks[],status:string) => {
    let count = 0
    taskArray.map((task: { status: string }) => {
      task.status === status ? count ++ : null
    })
    return count
  }

  const renderEachProject = ({ item, index }: { item: PLInterface, index: number }) => {
    return (
      <View key={item.id + index} style={styles.projectItem}>
        <View>
          <View>
            <Text style={styles.projectNameStyles}>{item.projectName}</Text>
          </View>
          <View>
            <Text>Completed : {renderTaskStatus(item.tasks, "completed")}</Text>
            <Text>Progress : {renderTaskStatus(item.tasks, "progress")}</Text>
            <Text>To be started : {renderTaskStatus(item.tasks, "yet to start")}</Text>
          </View>
        </View>
        <View style={{ justifyContent: "space-around" }}>
          <TouchableOpacity style={styles.shareContainer} onPress={() => goToProjectDetails(item)}>
            <FontAwesome name="share" size={responsiveFontSize(2)} color={"#000000"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareContainer} onPress={() => deleteProject(item.id)}>
            <FontAwesome name="trash" size={responsiveFontSize(2)} color={"#000000"} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const handleAddnewProjectModal = () => {
    setAddProjectModalVisible(true)
  }

  const getProjectname = (text:string) =>{
    setAddProjectName(text)
  }

  const closeModal = () =>{
    setAddProjectModalVisible(false)
  }

  const renderAddProjectmodal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={addProjectModalVisible}
        statusBarTranslucent
        onRequestClose={() => setAddProjectModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity onPress={closeModal} style={styles.closeModalButtonContainer}>
            <AntDesign name="close" size={responsiveFontSize(2)} color={"#000000"}/>
          </TouchableOpacity>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalProjectName}>{"Project Name*"}</Text>
              <TextInput
                value={addProjectName}
                placeholder={'Add Project Name Here...'}
                style={styles.textinputStyles}
                onChangeText={getProjectname}
              />
            </View>
            <TouchableOpacity onPress={addNewProject} style={styles.footerButton}>
              <Text style={styles.addProjectText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  const renderListEmptyComponent = () =>{
    return(
      <Text>Please Add The Projects</Text>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerTextStyle}>Projects</Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.flatlistContainer}
        data={projects}
        renderItem={renderEachProject}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={renderListEmptyComponent}
      />
      <TouchableOpacity onPress={handleAddnewProjectModal} style={styles.footerButton}>
        <Text style={styles.addProjectText}>Add Project</Text>
      </TouchableOpacity>
      {renderAddProjectmodal()}
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
  shareContainer:{
    height:responsiveHeight(3),
    width:responsiveHeight(3),
    borderRadius:responsiveHeight(0.5),
    borderWidth:1,
    borderColor:"#000000",
    justifyContent:"center",
    alignItems:"center",
  },
  modalprojectStyle:{
    fontFamily:"OpenSans-Bold",
    fontSize:responsiveFontSize(1.6),
    color:"#000000",
  },
  deleteContainer:{
    backgroundColor:"red",
    justifyContent:"center",
    alignItems:'center',
    borderRadius:responsiveFontSize(0.5),
  },
  addTaskText:{
    fontFamily:"OpenSans-Regular",
    fontSize:responsiveFontSize(1.6),
    color:"#FFFFFF",
    padding:responsiveFontSize(1),
  },
  addnewTaskContainer:{
    backgroundColor:"blue",
    justifyContent:"center",
    alignItems:'center',
    borderRadius:responsiveFontSize(0.5),
  },
  rowContainer:{
    flexDirection:"row",
    alignItems:'center',
    justifyContent:"space-between",
    marginTop:responsiveHeight(1),
  },
  modalCurrentTaskStyle:{
    fontFamily:"OpenSans-Bold",
    fontSize:responsiveFontSize(2.4),
    color:"#000000",
  },
  modalStatus:{
    fontFamily:"OpenSans-Regular",
    fontSize:responsiveFontSize(2.4),
    color:"#000000",
  },
  checkBoxContainer:{
    flexDirection:'row',
    alignItems:"center",
    gap:responsiveWidth(4),
  },
  checkboxStyles:{
    height:responsiveHeight(2.5),
    width:responsiveHeight(2.5),
    borderWidth:1,
    borderRadius:responsiveHeight(0.4),
  },
  modalProjectName:{
    fontFamily:"OpenSans-Regular",
    fontSize:responsiveFontSize(2),
    color:"#000000",
  },
  textinputStyles:{
    fontFamily:"OpenSans-Regular",
    fontSize:responsiveFontSize(2),
    color:"#000000",
    padding:responsiveHeight(1),
    borderWidth:1,
    borderColor:"#000000",
    borderRadius:responsiveFontSize(1)
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:"#00000050",
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
    gap:responsiveHeight(1),
  },
  addProjectText:{
    fontFamily:"OpenSans-Bold",
    fontSize:responsiveFontSize(2),
    color:"#FFFFFF",
  },
  eachTaskStyles:{
    marginVertical:responsiveHeight(0.2),
  },
  taskNameStyles:{
    fontFamily:"OpenSans-Light",
    fontSize:responsiveFontSize(2),
    color:"#000000",
    padding:responsiveFontSize(0.5),
    borderRadius:responsiveFontSize(0.4)
  },
  projectNameStyles:{
    fontFamily:"OpenSans-Regular",
    fontSize:responsiveFontSize(3),
    color:"#1c5aedff",
    marginBottom:responsiveHeight(0.5),
  },
  headerTextStyle:{
    fontFamily:"OpenSans-Bold",
    fontSize:responsiveFontSize(3.4),
    color:"#1c5aedff"
  },
  footerButton: {
    height: responsiveHeight(5),
    backgroundColor:"blue",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:responsiveHeight(3),
    borderRadius:responsiveFontSize(1),
  },
  flatlistContainer: {
    flexGrow:1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? responsiveHeight(5) : responsiveHeight(4),
    backgroundColor: "#7e9feaff",
    paddingHorizontal: responsiveWidth(5),
    justifyContent:"space-between",
  },
  projectItem: {
    marginVertical: responsiveHeight(0.5),
    paddingHorizontal:responsiveWidth(5),
    paddingVertical:responsiveWidth(3),
    borderRadius:responsiveWidth(2),
    backgroundColor: "#adc1efff",
    justifyContent:"space-between",
    flexDirection:"row",
  },
});

export default ProjectsList;