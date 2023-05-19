import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

import { getDateMinusDays } from "../utils/date";
import { GlobalStyles } from "../constants/styles";
import { fetchExpenses } from "../utils/http";

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  // const [fetchedExpenses, setFetchedExpenses] = useState([]); -> context에 저장하지 않으면 백그라운드에서 addpage가 돌기 때문에 새로고침하지 않는 이상 데이터 업데이트가 불가(navigator로 제어하는 방법도 있음)

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses(); //함수안에 감싸는 구조: useEffect이 비동기 함수로 됨을 권장하지 않음
      // setFetchedExpenses(expenses);
      expensesCtx.setExpenses(expenses);
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
