import { useState, useEffect } from "react"
import {
  View,
  TextInput,
  Button,
  FlatList,
  Pressable,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native"

import { useSQLiteContext } from "expo-sqlite"
import { drizzle } from "drizzle-orm/expo-sqlite"
import * as productSchema from "../database/schemas/productSchema"
import { asc, eq, like } from "drizzle-orm"
//import { ScrollView } from "react-native/types_generated/index"
import { styles } from "./styles"

type Data = {
  id: number
  name: string
}

export function Home() {
  const [name, setName] = useState("")
  const [search, setSearch] = useState("")
  const [data, setData] = useState<Data[]>([])

  const database = useSQLiteContext()
  const db = drizzle(database, { schema: productSchema })

  async function fetchProducts() {
    try {
      const response = await db.query.product.findMany({
        where: like(productSchema.product.name, `%${search}%`),
        orderBy: [asc(productSchema.product.name)],
      })

      // console.log(response)
      setData(response)
    } catch (error) {
      console.log(error)
    }
  }

  async function add() {
    try {
      if (name.trim().length === 0) {
        Alert.alert("Erro", "O nome do produto não pode ser vazio.")
        return
      }
      else{
      const response = await db.insert(productSchema.product).values({ name })
            Alert.alert("Cadastrado com o ID: " + response.lastInsertRowId)
            setName("")
            await fetchProducts()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function remove(id: number) {
    try {
      Alert.alert("Remover", "Deseja remover?", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            await db
              .delete(productSchema.product)
              .where(eq(productSchema.product.id, id))
              
            await fetchProducts()
            Alert.alert("Participante removido.")
          },
        },
      ])
    } catch (error) {
      console.log(error)
    }
  }

  async function show(id: number) {
    try {
      const product = await db.query.product.findFirst({
        where: eq(productSchema.product.id, id),
      })

      if (product) {
        Alert.alert(
          `Produto ID: ${product.id} cadastrado com o nome ${product.name}`
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [search])

  return (

    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Nome do Evento</Text>
        <Text style={styles.subtitle}>Quarta, 29 de Outubro de 2025.</Text>
      </View>
      
      <View style={styles.inputbuttoncontainer}>
      <TextInput
        placeholder="Nome do participante"
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholderTextColor="gray"
      />

      <TouchableOpacity style={styles.save} onPress={() => add()}>  
            <Text style={styles.buttontext}>+</Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.title}>Participantes</Text>
      <TextInput
        placeholder="Pesquisar..."
        style={styles.search}
        onChangeText={setSearch}
        value={search}
        placeholderTextColor="gray"
      />
      <Text style={styles.defaulttext}>Ninguém chegou no evento ainda? 
                    Adicione participantes a sua lista de presença.</Text>


        <FlatList 
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.inputbuttoncontainer}>
              <View style={styles.listitems}>
                <Text style={styles.listtext}>{item.name}</Text>
              </View>

              <TouchableOpacity style={styles.delete} onPress={() => remove(item.id)}>  
                <Text style={styles.buttontext}>-</Text>
              </TouchableOpacity>
              
            </View>
          )}
          ListEmptyComponent={() => <Text>Lista vazia.</Text>}
          contentContainerStyle={{ gap: 16 }}
        />
      
    </View>

  )
}