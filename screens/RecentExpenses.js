import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

import { GlobalStyles } from "../constants/styles";

export default function RecentExpenses() {
  return <ExpensesOutput expensesPeriodName="Last 7 Days" />;
}

const styles = StyleSheet.create({});
