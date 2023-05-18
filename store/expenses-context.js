import { createContext } from "react";

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

export const ExpensesContext = React.createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
}); //초기값 x 나중 자동완성을 위함

//reducer 함수(외부함수)
//여기서 수신된 action의 타입을 확인할 수 있음
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES); //useReducer(리듀서함수, 초기값)

  function addExpenses(expenseData) {
    //expenseData가 action을 dispatch해서 reducer함수로 전달함
    dispatch({ type: "ADD", payload: expenseData }); //type or mode or kind ... payload or data..
  }
  function deleteExpenses(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpenses(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  return <ExpensesContext.Provider>{children}</ExpensesContext.Provider>;
}
