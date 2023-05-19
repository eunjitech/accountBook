import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, style, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.lightTeal,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.lightNavy,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.black,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
