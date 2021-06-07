import { useMutation } from "@apollo/client";
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors } from "../other/colors.js";
import { JOIN_LIST } from "../graphql/graphql.js";
import useAuth from "../hooks/useAuth.js";
import Header from "../components/Header.js";

export default function CodeScreen({ navigation }) {
  const [code, setCode] = React.useState(null);
  const { authData, updateLists } = useAuth();

  const [joinList, { loading }] = useMutation(JOIN_LIST, {
    update(proxy, result) {
      try {
        let returnedData = result.data.join_list;
        // let listArray = [];
        // listArray.push(returnedData);
        // updateLists(listArray);
        // pass params to grocery list
        navigation.navigate("groceryList", { listID: returnedData.id });
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleSubmit = async () => {
    try {
      // get userID from storage
      await joinList({ variables: { code, userID: authData.id } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.heading}>What is the Grocery List Code?</Text>
      <TextInput
        autoFocus={true}
        placeholder="Enter Code"
        style={styles.nameInput}
        autoCapitalize={"characters"}
        onChangeText={setCode}
        onSubmitEditing={handleSubmit}
        maxLength={6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.primary,
    textAlign: "center",
    width: 300,
    marginTop: 70,
  },
  nameInput: {
    fontSize: 24,
    paddingTop: 80,
    paddingBottom: 300,
    color: colors.text,
  },
});
