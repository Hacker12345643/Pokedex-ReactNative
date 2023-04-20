import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { map, capitalize } from "lodash";

export default function Stats(props) {
  const { stats } = props;

  const barStyles =(num)=>{
    num=(num/140)*100;
    //const color =num>49 ? "#00ac17":"#ff3e3e";
    if (num <= 20) {
      color = "#ff3e3e";
    } else if (num > 20 && num < 45) {
      color = "#F08700";
    } else if (num >= 45 && num < 60) {
      color = "#EFCA08";
    } else if (num >= 60 && num <78) {
      color = "#00ac17";
    }
    else if (num >= 78){
      color = "#FF00DF";
    }
    return {
        backgroundColor: color,
        width: `${num}%`
    }
  }

  return (
    <View style={styles.content}>
      <Text style={styles.tittle}>Base Stats</Text>
      {map(stats, (item, index) => (
        <View key={index} style={styles.block}>
          <View style={styles.blockTittle}>
            <Text style={styles.statName}>{capitalize(item.stat.name)}</Text>
          </View>
          <View style={styles.blockInfo}>
            <Text style={styles.number}>{item.base_stat}</Text>
            <View style={styles.bgBar}>
              <View style={[styles.bar, barStyles(item.base_stat)]}/>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 80,
  },
  tittle: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 5,
  },
  block: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  blockTittle: {
    width: "30%",
  },
  statName: {
    fontSize: 12,
    color: "#6b6b6b",
  },
  blockInfo: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    width: "12%",
    fontSize: 12,
  },
  bgBar: {
    backgroundColor: "#bebebe",
    width: "88%",
    height: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  bar:{
    height:5,
    borderRadius:20
  }
});
