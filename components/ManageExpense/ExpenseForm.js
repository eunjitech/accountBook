import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import Input from "./Input";

export default function ExpenseForm() {
  function amountChangedHandler() {}
  return (
    <View style={styles.form}>
      <Text style={styles.title}>dd</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amout"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChageText: amountChangedHandler,
          }}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChageText: amountChangedHandler,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChageText: amountChangedHandler,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 80 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
});
