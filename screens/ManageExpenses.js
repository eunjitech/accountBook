import React, { useLayoutEffect, useContext, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, View } from "react-native";

import IconButton from "../components/UI/IconButton";

import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOVerlay from "../components/UI/LoadingOVerlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpenses({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsFetching(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense!");
      setIsFetching(false);
    }
  }

  function cancelHandler() {
    navigation.goBack(); //화면을 열었던 화면으로 이동
  }

  async function confirmHandler(expenseData) {
    setIsFetching(true);
    try {
      if (isEditing) {
        //변경
        expenseCtx.updateExpense(editedExpenseId, expenseData); //로컬에서 먼저 업데이트
        await updateExpense(editedExpenseId, expenseData); //응답을 기다린 후 페이지전환
      } else {
        //추가
        const id = await storeExpense(expenseData); //백엔드에 추가 후 아이디를 얻음
        expenseCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save expense! - please try again later");
      setIsFetching(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (isFetching) {
    return <LoadingOVerlay />;
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <ExpenseForm
          onCancel={cancelHandler}
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onSubmit={confirmHandler}
          defaultValues={selectedExpense}
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
