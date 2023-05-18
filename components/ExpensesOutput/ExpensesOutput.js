//모든 지출에 대한 요약과 모든 관련 지출 목록 페이지

import React from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

export default function ExpensesOutput({ expenses, expensesPeriodName }) {
  function renderItem() {}

  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriodName} expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.darkNavy,
  },
});
