//api 요청을 보낼 때 필요한 helper 함수
import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-9b8dd-default-rtdb.firebaseio.com";

//HTTP 요청을 생성하고 Firebase로 보냄
//고유 ID를 Firebase가 자동 생성
export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  //   console.log(response.data);

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date), //문자열로 저장되기 때문에
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}
