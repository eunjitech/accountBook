import React, { createContext, useReducer } from "react";

export const ExpensesContext = React.createContext({
  expenses: [],
  setExpenses: (expense) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
}); //초기값 x 나중 자동완성을 위함

//reducer 함수(외부함수)
//여기서 수신된 action의 타입을 확인할 수 있음
function expensesReducer(state, action) {
  switch (action.type) {
    case "SET":
      const iverted = action.payload.reverse();
      return iverted;
    case "ADD":
      // const id = new Date().toString() + Math.random().toString(); firebase가 id를 자동생성함
      return [action.payload, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      ); //업데이트할 expense id
      const updatableExpense = state[updatableExpenseIndex]; //업데이트할 expense data
      const updatedItem = { ...updatableExpense, ...action.payload.data }; //기존업데이트할데이터와 업데이트정보가 담겨있는 데이터를 병합
      const updatedExpenses = [...state]; //expenses 데이터 복제
      updatedExpenses[updatableExpenseIndex] = updatedItem; //복제한 expenses데이터에 업데이트 데이터 넣음(id동일)
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
} //action이 없다면 기존 state그대로, 케이스 중 하나라면 state는 우리가 조종한 형태로

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []); //useReducer(리듀서함수, 초기값)

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function addExpense(expenseData) {
    //expenseData가 action을 dispatch해서 reducer함수로 전달함
    dispatch({ type: "ADD", payload: expenseData }); //type or mode or kind ... payload or data..
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
