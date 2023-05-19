import React, { useLayoutEffect, useContext } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  Platform,
  View,
  TextInput,
} from "react-native";

import IconButton from "../components/UI/IconButton";

import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

export default function ManageExpenses({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack(); //화면을 열었던 화면으로 이동
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      expenseCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      expenseCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <ExpenseForm
          onCancel={cancelHandler}
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onSubmit={confirmHandler}
        />
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
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.darkNavy,
  },

  deleteContainer: {
    paddingTop: 8,
    marginTop: 16,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.lightTeal,
    alignItems: "center",
  },
});
