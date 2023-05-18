import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../constants/styles";

export default function ManageExpenses({ route, navigation }) {
  //   const {
  //     params: { id: editedExpenseId },
  //   } = route;
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({});
