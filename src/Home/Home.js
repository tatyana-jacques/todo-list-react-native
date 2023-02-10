import 'react-native-gesture-handler'
import {
    View,
    Text,
    TextInput,
    StatusBar,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native"

import { useEffect, useState } from "react"
import Icon from "@expo/vector-icons/MaterialIcons"
import { commonStyles } from "../Styles/Common.Styles"
import { useIsFocused } from "@react-navigation/native"
import { format, parseISO } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

export const API = "http://8e25-2804-d57-554d-0-35a0-ea75-e056-a6a2.ngrok.io"

export default function Home({ navigation }) {

    const telaFocada = useIsFocused()

    const [tasks, setTasks] = useState([])
    const [searchTask, setSearchTask] = useState("")


    function navigateToForm() {
        navigation.navigate("Form")
    }

    function deleteTask(taskId) {
        fetch(API + "/tasks/" + taskId, { method: "DELETE" })
            .then(() => {
                alert("Tarefa deletada com sucesso")
                getTasks()
            })
            .catch(() => alert("Houve um erro ao tentar deletar"))

    }

    function getTasks() {
        fetch(API + "/tasks" + "?description_like=" + searchTask)
            .then(async (response) => {
                const data = await response.json()
                setTasks(data)
                setLoading(false)
            })
            .catch((error) => console.log(error))

    }

    function showTaskDescription(description, category) {
        Alert.alert(
            category,
            description
        )
    }

    function searchTexts() {
        getTasks()
    }

    function updateTask(taskId) {
        fetch(API + "/tasks/" + taskId, {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                status: true
            })
        })
            .then(() => {
                alert("Tarefa atualizada com sucesso")
                getTasks()
            })
            .catch(() => alert("Houve um erro ao tentar atualizar a tarefa"))

    }

    useEffect(() => {
        if (telaFocada === true) {
            getTasks()
        }
    }, [telaFocada])

    useEffect(() => {
        if (telaFocada === true) {
            getTasks()
        }

    }, [telaFocada])


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="tomato" />
            <View style={styles.header}>
                <Text style={styles.title}>ToDo</Text>
                <Image
                    source={{ uri: "http://ruidorosa.blog.br/wp-content/uploads/2019/10/capa-aurora-menor-768x768.jpg" }}
                    style={styles.thumb}
                />
            </View>

            <View style={styles.inputContainer}>

                <TextInput
                    style={{ ...commonStyles.input, width: "65%" }}
                    selectionColor="tomato"
                    placeHolder="Pesquise por uma tarefa"
                    autoCapitalize="none"
                    value={searchTask}
                    onChangeText={setSearchTask}
                />
                <TouchableOpacity style={styles.buttonAdd} onPress={searchTexts}>
                    <Icon name="search" size={32} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonAdd} onPress={navigateToForm}>
                    <Icon name="add" size={32} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                {tasks.map((tasks) => (

                    <View
                        style={{ ...styles.cardTask, backgroundColor: tasks.status === true ? "green" : "tomato" }}
                        key={tasks.id}>

                        <TouchableOpacity
                            style={styles.descriptionCardTask}
                            onPress={() => showTaskDescription(tasks.description, tasks.category)}>
                            <Text numberOfLines={1} ellipsizeMode="tail">{tasks.description}</Text>
                            <Text>{format(parseISO(tasks.date), "dd 'de' MMMM 'de' yyyy")}</Text>
                        </TouchableOpacity>

                        {tasks.status === false &&
                            <TouchableOpacity onPress={() => updateTask(tasks.id)}>
                                <Icon name="update" size={32} color="#fff" />
                            </TouchableOpacity>}
                        {tasks.status === true && <Icon name="done" size={32} color="#fff" />}


                        <TouchableOpacity>
                            <Icon name="delete" size={32} color="#fff" onPress={() => deleteTask(tasks.id)} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>



        </View >
    )
}

const styles = StyleSheet.create({

    container: {
        width: "100%",
        height: "100%",
        flex: 1

    },
    thumb: {
        width: 60,
        height: 60,
        borderRadius: 50

    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "tomato"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 20
    },

    cardTask: {
        height: 50,
        width: "90%",
        alignItems: "center",
        backgroundColor: "tomato",
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: "space-around",
        borderRadius: 5,
        marginVertical: 10,
    },
    descriptionCardTask: {

    },
    buttonCheckTask: {
        width: "15%",

    },
    buttonDeleteTask: {
        width: "15%"
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        justifyContent: "space-between"

    },
    buttonAdd: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "tomato",
        borderRadius: 15,
        width: 50,
        height: 50,


    }
})