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

    return expense.date > date7DaysAge;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriodName="Last 7 Days"
    />
  );
}

const styles = StyleSheet.create({});
