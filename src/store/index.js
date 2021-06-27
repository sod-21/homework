import { combineReducers, createStore } from "redux";
import transactions from "../reducers/transaction";

const reducers = combineReducers({
    transactions: transactions
});

const store = createStore(
    reducers
);

export default store;