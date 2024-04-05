import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        marginBottom:40
    },
    inputView:{
        backgroundColor: "#DD8538",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems:"center",
        justifyContent:"center",

    },
    TextInput: {
        height:"100%",
        width:"100%",
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color:"#FFFFFF",
        textAlign:"center",
    },
    loginBtn:
        {
            width:"80%",
            borderRadius:25,
            height:50,
            alignItems:"center",
            justifyContent:"center",
            marginTop:40,
            backgroundColor:"#B55828",
        },
    img: {
        width: 300,
        height: 300,
    },
    list:{
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    listItem:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:8,
        padding:8,
        borderWidth:1,
        borderRadius:4,
        borderColor:"#ddd"
    },
    ListItemText:{
        flex:1,
        marginRight:8,
        color:"#333"
    }
});
export default styles