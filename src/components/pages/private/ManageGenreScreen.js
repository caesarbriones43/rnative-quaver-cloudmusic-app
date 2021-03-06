import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Header, Icon, Avatar, Divider, Input } from "react-native-elements";
import axios from "axios";
import { quaverApi } from "../../../api/quaverApi";

const ManageGenreScreen = ({
  navigation,
  route: {
    params: { genres },
  },
}) => {
  const [state, setState] = useState(genres);

  const { genre, _id, created_at, updated_at, genreUrl } = state;

  console.log("Estado a mandar:", genre);
  console.log(_id);

  const updateGenreById = async (_id, state) => {
    await axios({
      method: "put",
      url: `http://192.168.1.80:5000/api/v1/genres/${_id}`,
      data: { ...state },
      config: { headers: { "Content-Type": "application/json" } },
    })
      .then((response) => {
        console.log(response.data.data);
        setState(response.data.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const deleteGenreById = async (_id) => {
    const resp = await quaverApi.delete(`/genres/${_id}`);
    setState(resp.data.data);
    console.log(`Deleting user whit id:${_id}`);
  };

  return (
    <View>
      <Header
        leftComponent={
          <Icon name="arrow-back-outline" type="ionicon" color="#fff" />
        }
        centerComponent={{
          text: `Manage: ${genres.genre}`,
          style: { color: "#fff" },
        }}
        containerStyle={{
          backgroundColor: "#000",
        }}
      />
      <View
        style={{
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          rounded
          size="xlarge"
          source={{
            uri: state.genreUrl,
          }}
        />
        <Text style={{ fontSize: 18 }}>{genres.genre}</Text>
      </View>
      <Divider />
      <View>
        <Input
          style={{ color: "#808080" }}
          value={state.genre}
          leftIcon={<Icon type="ionicon" name="disc" size={24} color="black" />}
          label="Genre"
          onChangeText={(genre) => setState({ ...state, genre: genre })}
        />
        <Input
          style={{ color: "#808080" }}
          value={state.genreUrl}
          leftIcon={<Icon type="ionicon" name="disc" size={24} color="black" />}
          label="Genre Url"
          onChangeText={(genreUrl) =>
            setState({ ...state, genreUrl: genreUrl })
          }
        />
        <Input
          disabled
          style={{ color: "#808080" }}
          value={state.created_at}
          leftIcon={
            <Icon type="ionicon" name="calendar" size={24} color="black" />
          }
          label="Created"
          onChangeText={(genre) => setState({ ...state, genre: genre })}
        />
        <Input
          disabled
          style={{ color: "#808080" }}
          value={state.updated_at}
          leftIcon={
            <Icon type="ionicon" name="calendar" size={24} color="black" />
          }
          label="Updated"
          onChangeText={(genre) => setState({ ...state, genre: genre })}
        />
      </View>
      <View style={{ padding: 25 }}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => {
            updateGenreById(_id, state) &&
              navigation.navigate("HomeTabScreenAdmin");
          }}
        >
          <Text style={styles.appButtonEdit}>Edit</Text>
        </TouchableOpacity>
        <View style={styles.appButtonSpace}></View>
        <TouchableOpacity
          style={styles.appButtonContainerDelete}
          onPress={() => {
            deleteGenreById(_id) && navigation.navigate("HomeTabScreenAdmin");
          }}
        >
          <Text style={styles.appButtonEdit}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonContainerDelete: {
    elevation: 8,
    backgroundColor: "#b20000",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonEdit: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  appButtonSpace: {
    padding: 5,
  },
});

export default ManageGenreScreen;
