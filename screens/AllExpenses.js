import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

import { GlobalStyles } from "../constants/styles";

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriodName="Total"
      fallBackText="지출 항목이 없습니다."
    />
  );
}

const styles = StyleSheet.create({});
