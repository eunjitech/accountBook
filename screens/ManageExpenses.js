import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import Button from "../components/Button";
import { GlobalStyles } from "../constants/styles";

export default function ManageExpenses({ route, navigation }) {
  // const {
  //   params: { id: editedExpenseId },
  // } = route;
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack(); //화면을 열었던 화면으로 이동
  }

  function confirmHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.darkNavy,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: { minWidth: 120, marginHorizontal: 8 },
  deleteContainer: {
    paddingTop: 8,
    marginTop: 16,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.lightTeal,
    alignItems: "center",
  },
});
