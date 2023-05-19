import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

import { getDateMinusDays } from "../utils/date";
import { GlobalStyles } from "../constants/styles";
import { fetchExpenses } from "../utils/http";

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses(); //함수안에 감싸는 구조: useEffect이 비동기 함수로 됨을 권장하지 않음
    }

    getExpenses();
  }, []);

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
