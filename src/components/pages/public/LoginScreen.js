import React, { useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";

import { Tooltip } from "react-native-elements";

import axios from "axios";

export default function LoginScreen({ navigation }) {
  const initialState = {
    email: "",
    password: "",
  };

  const [stateInput, setStateInput] = useState(initialState);
  const [users, setUsers] = useState([]);

  const authUser = async (stateInput) => {
    console.log(stateInput);
    const { email, password } = stateInput;
    // console.log("credenciales recibidas: ", stateInput);
    // console.log("credenciales desestructuradas: ", email, password);
    await axios({
      method: "post",
      url: `http://192.168.1.80:5000/api/v1/auth/login`,
      data: { ...stateInput },
      config: { headers: { "Content-Type": "application/json" } },
    })
      .then((response) => {
        if (response.data.admin) {
          navigation.navigate("HomeTabScreenAdmin", {
            credenciales: stateInput,
          });
        } else {
          console.log("You are not admin!");
          navigation.navigate("HomeTabScreen");
        }
      })
      .catch((error) => {
        // console.log("Error: ", error);
        console.log("Credentials not valid");
      });
  };

  // const initialState = [
  //   {
  //     email: "",
  //     password: "",
  //   },
  // ];

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "login":
  //       console.log("state:", state);
  //       authUser(state);
  //       setStateInput(state);
  //       return action.payload;
  //     default:
  //       throw new Error();
  //   }
  // };

  // const authUser = async (state) => {
  //   const { email, password } = state;
  //   await axios({
  //     method: "get",
  //     // url: `http://192.168.1.80:5000/api/v1/users?email=camoham@gmail.com&password=2uw7123`,
  //     url: `http://192.168.1.80:5000/api/v1/users?email=${email}&password=${password}`,
  //   })
  //     .then((response) => {
  //       // console.log("response", response.data.data[0]);
  //       setUsers(response.data.data);
  //       let objectLenght = Object.keys(users).length;
  //       if (objectLenght >= 1) {
  //         console.log(`
  //         ----User Logged----
  //         email:${email}
  //         password:${password}
  //         -------------------
  //         `);
  //       } else {
  //         console.log("Credentials error!!!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error: ", error);
  //     });
  // };

  // const handleLogin = (loginCredentials) => {
  //   const action = {
  //     type: "login",
  //     payload: loginCredentials,
  //   };
  //   dispatch(action);
  // };

  // const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={styles.container}>
      <View style={styles.bigCircle}></View>
      <View style={styles.smallCircle}></View>
      <View style={styles.centerizedView}>
        <View style={styles.authBox}>
          <View style={styles.logoBox}>
            <LottieView
              source={require("../../../../assets/music_char_loggin.json")}
              autoPlay
              loop
            />
          </View>
          <Text style={styles.titleTextApp}>Welcome to Quaver!</Text>
          <Text style={styles.loginTitleText}>Sign in</Text>
          <View style={styles.hr}></View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Email Adress</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              textContentType="emailAddress"
              value={stateInput.email}
              onChangeText={(email) =>
                setStateInput({ ...stateInput, email: email })
              }
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              textContentType="password"
              value={stateInput.password}
              onChangeText={(password) =>
                setStateInput({ ...stateInput, password: password })
              }
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            // onPress={() =>
            //   navigation.navigate("ManageScreen", { credenciales: "Hola" })
            // }
          >
            <Text
              style={styles.loginButtonText}
              onPress={() => authUser(stateInput)}
            >
              Sign in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.registerText}>
              Don't have an account? Register Now
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  bigCircle: {
    width: Dimensions.get("window").height * 0.8,
    height: Dimensions.get("window").height * 0.8,
    backgroundColor: "#000000",
    borderRadius: 1000,
    position: "absolute",
    right: Dimensions.get("window").width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get("window").height * 0.4,
    height: Dimensions.get("window").height * 0.4,
    backgroundColor: "#000000",
    borderRadius: 1000,
    position: "absolute",
    bottom: Dimensions.get("window").width * -0.2,
    right: Dimensions.get("window").width * -0.3,
  },
  centerizedView: {
    width: "100%",
    top: "15%",
  },
  authBox: {
    width: "80%",
    backgroundColor: "#fafafa",
    borderRadius: 20,
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 175,
    height: 175,
    backgroundColor: "#ffffff",
    borderRadius: 1000,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: -50,
    marginBottom: -50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  titleTextApp: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    color: "#000000",
  },
  hr: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#444",
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#dfe4ea",
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#000000",
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  registerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
  },
});
