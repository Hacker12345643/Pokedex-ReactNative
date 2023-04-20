import { StyleSheet, View, SafeAreaView, Text, Image, Platform } from "react-native";
import React from "react";
import { capitalize, spread } from "lodash";
import getColorByPokemonType from "../../utils/getColorByPokemonType";

export default function Header(props) {
  const { name, id, image, type } = props;
  const color = getColorByPokemonType(type);

  const bgStyle = [{ backgroundColor: color, ...styles.bg }];

  return (
    <>
      <View style={bgStyle} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{capitalize(name)}</Text>
          <Text style={styles.id}>#{`${id}`.padStart(3, 0)}</Text>
        </View>
        <View style={styles.contentImg}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 400,
    position: "absolute",
    borderBottomEndRadius: Platform.OS === 'ios' ? 500:300,
    borderBottomLeftRadius: Platform.OS === 'ios' ? 500:300,
    transform: [{ scaleX: 2 }],
  },
  content: {
    marginHorizontal:Platform.OS === 'android' ? 50:30,
    marginVertical: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop:Platform.OS === 'ios' ? 0:30,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
  },
  id: {
    right: 10,
    top: 10,
    color: "#fff",
    fontWeight:"bold",
    fontSize: 15,
  },
  contentImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 50,
  },
  image: {
    width: 250,
    height: 300,
    resizeMode:"contain"
  },
});
