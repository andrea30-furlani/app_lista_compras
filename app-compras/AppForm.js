import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Database from './Database';
import { Feather as Icon } from '@expo/vector-icons';

export default function AppForm({ route, navigation }) {

    const id = route.params ? route.params.id:undefined;
    const [descricao, setDescricao] = useState(''); 
    const [quantidade, setQuantidade] = useState('');

    useEffect(() => {
      if(!route.params) return;
      setDescricao(route.params.descricao);
      setQuantidade(route.params.quantidade.toString());
    
    }, [route])
  

    function handleDescriptionChange(descricao){ setDescricao(descricao); } 
    function handleQuantityChange(quantidade){ setQuantidade(quantidade); }

    async function handleButtonPress(){ 
      const listItem = {id: new Date().getTime(), descricao, quantidade: parseInt(quantidade)};
      Database.saveItem(listItem, id)
      .then( response=> navigation.navigate("AppList", listItem));

      }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Item para comprar</Text>
        <View style={styles.inputContainer}> 
          <TextInput 
            style={styles.input} 
            onChangeText={handleDescriptionChange}
            placeholder="O que está faltando em casa?"
            value={descricao}
            clearButtonMode="always" /> 
            
          <TextInput 
            style={styles.input}  
            placeholder="Digite a quantidade" 
            onChangeText={handleQuantityChange}
            keyboardType={'numeric'}
            value={quantidade.toString()}
            clearButtonMode="always" /> 

          <TouchableOpacity style={styles.button} onPress={handleButtonPress}> 
          <View>
            <Icon name="save" color="white" size={18} />
            <Text style={styles.buttonText}>Salvar</Text>
          </View>
          </TouchableOpacity> 
          
        </View>
        <StatusBar style="light" />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D93600',
      alignItems: 'center',
    },
    title: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 50,
    },
    inputContainer: {
      flex: 1,
      marginTop: 30,
      width: '90%',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'stretch',
      backgroundColor: '#fff'
    },
    input: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'stretch'
    },
    button: {
      marginTop: 10,
      height: 60,
      backgroundColor: 'green',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
      shadowOpacity: 20,
      shadowColor: '#ccc',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    }
  });