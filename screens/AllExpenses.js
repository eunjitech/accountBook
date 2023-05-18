import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

import { GlobalStyles } from "../constants/styles";

export default function AllExpenses() {
  return <ExpensesOutput expensesPeriodName="Total" />;
}

const styles = StyleSheet.create({});
