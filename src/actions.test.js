import * as actions from "./actions";
import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED,
} from "./constants";

import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";

const mockStore = configureStore([thunk]);

it("should create an action to search robots", () => {
    const text = "wooo";
    const expectedAction = {
        type: CHANGE_SEARCHFIELD,
        payload: text,
    };
    expect(actions.setSearchField(text)).toEqual(expectedAction);
});

it("handles requestion robots API", () => {
    const store = mockStore();
    store.dispatch(actions.requestRobots());
    const action = store.getActions();
    const expectedAction = {
        type: REQUEST_ROBOTS_PENDING,
    };
    expect(action[0]).toEqual(expectedAction);
});
