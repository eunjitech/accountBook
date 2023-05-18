//모든 지출에 대한 요약과 모든 관련 지출 목록 페이지

import React from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "신발 한 켤레",
    amount: 70000,
    date: new Date("2023-02-04"),
  },
  {
    id: "e2",
    description: "쇼파",
    amount: 120000,
    date: new Date("2023-05-14"),
  },
  {
    id: "e3",
    description: "책",
    amount: 6000,
    date: new Date("2023-01-29"),
  },
  {
    id: "e4",
    description: "음료수",
    amount: 1500,
    date: new Date("2023-03-03"),
  },
];

export default function ExpensesOutput({ expenses, expensesPeriodName }) {
  function renderItem() {}

  return (
    <View style={styles.container}>
      <ExpensesSummary
        periodName={expensesPeriodName}
        expenses={DUMMY_EXPENSES}
      />
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
