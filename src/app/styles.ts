import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#131016",
    flex: 1, padding: 32, gap: 16
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 8,
    marginTop: 30,
  },
  subtitle:{
     fontSize: 16, color: "#666",
     marginBottom: 18,
  },
  defaulttext:{
    color: "#999999",
    fontSize: 12,
    marginTop: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  input:{
    color: '#ffffff',
    backgroundColor: "#1F1E25",
    height: 54,
    width: '80%',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
    search:{
        color: '#ffffff',
        backgroundColor: "#1F1E25",
        height: 54,
        width: '100%',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 20,
    },
    save:{
        color: '#FFFFFF',
        backgroundColor: "#6cdc79ff",
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 5,
        },
    delete: {
        color: '#FFFFFF',
        backgroundColor: "#e6472eff",
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 5,
    
        },
    inputbuttoncontainer:{  
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1,
        marginBottom: 1,

  },
    listitems:{
        color: '#ffffff',
        backgroundColor: "#1F1E25",
        height: 54,
        width: '80%',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    listtext:{
        color: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,

    },
    buttontext:{
        color: 'white', fontSize: 24, fontWeight: 'bold',

    }

})