import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import ExpenseItem from "./ExpenseItem";

function renderExpensesItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpensesItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({});
