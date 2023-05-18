import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

import { getDateMinusDays } from "../utils/date";
import { GlobalStyles } from "../constants/styles";

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAge = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAge && expense.date <= today; //미래 날짜가 출력되지 않게
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriodName="Last 7 Days"
      fallBackText="지출 항목이 없습니다."
    />
  );
}

const styles = StyleSheet.create({});
