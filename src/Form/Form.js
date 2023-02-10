import { View, Text, TextInput, StyleSheet, Button, ScrollView } from "react-native"
import { commonStyles } from "../Styles/Common.Styles"
import { useState, useEffect } from "react"
import { API } from "../Home/Home"
import {Picker} from "@react-native-picker/picker"
import {Calendar} from "react-native-calendars"
import {format} from "date-fns"


export default function Form() {

   
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState ("")
    const [date, setDate] = useState (() => {
        const dataAtual = new Date()
        return format (dataAtual, "yyyy-MM-dd")
    })

    useEffect (() => {
        if (description=== "estudar") {
            alert ("Estude mesmo")
        }
    },[description])


    
    function addNewTask() {

        if ( description.length<4)
        {
            alert ("Insira uma descrição mais detalhada")
        }

        else if (category===""){
            alert ("Escolha uma categoria")
        }
        else  {
        fetch(API + "/tasks",
            {
                method: "POST",
                body: JSON.stringify({
                    description: description,
                    category: category,
                    status: false,
                    date: date
                }),
                headers: {
                    "Content-type":"application/json"
                }
            })
            .then(async (response) => {
                //const data = await response.json()
                alert ("Tarefa cadastrada com sucesso")
                setDescription ("")
                //console.log(data)
            })
            .catch (() => alert ("Houve um erro ao cadastrar a tarefa."))

    }
   
}
    return (
        <ScrollView>
        <View style={styles.container}>
            <TextInput
                style={{ ...commonStyles.input, marginVertical: 20 }}
                selectionColor="tomato"
                placeHolder="Pesquise por uma tarefa"
                autoCapitalize="none"
                value={description}
                onChangeText={setDescription}
                autoFocus
            />
            <Picker 
            selectedValue={category}
            style = {styles.select}
            onValueChange = {(value) =>setCategory(value)}
            >
                <Picker.Item label = "Selecione uma categoria" value="" />
                <Picker.Item label = "Estudos" value = "estudos" />
                <Picker.Item label = "Casa" value = "casa" />
                <Picker.Item label = "Outros" value = "outros" />
            </Picker>
            <Text>{date}</Text>
            <Calendar
           //minDate={dataAtual}
                style = {styles.calendar}
                markedDates = {{
                    [date] : {
                        selected: true,
                        marked: true,
                        selectedColor: "#fff",
                        dotColor: "red"

                    },

                }}
                onDayPress = {(currentDate) => setDate(currentDate.dateString)}
                theme = {{
                    calendarBackground: "tomato",
                    daytextColor: "#fff",
                    arrowColor: "#fff",
                    monthTextColor: "#fff",
                    selectedDayTextColor: "tomato",
                    
                }} 
                />
            <Button title="Adicionar" color="tomato" onPress={addNewTask}/>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center",
    },
    select: {

        marginBottom: 20,
        backgroundColor: "#fff",
        color: "tomato",
        width: "80%",
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "tomato",
    },

    calendar: {
        backgroundColor: "tomato",
        borderRadius: 10,
        marginVertical: 20,
        color: "#fff"
       


    }
})