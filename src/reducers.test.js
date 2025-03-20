import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED,
} from "./constants";

import * as reducer from "./reducers";

describe("searchRobots", () => {
    const initialStateSeach = {
        searchField: "",
    };
    it("Should return initial state", () => {
        expect(reducer.searchRobots(undefined, {})).toEqual({
            searchField: "",
        });
    });

    it("Should handle CHANGE_SEARCHFIELD", () => {
        expect(
            reducer.searchRobots(initialStateSeach, {
                type: CHANGE_SEARCHFIELD,
                payload: "abc",
            })
        ).toEqual({
            searchField: "abc",
        });
    });
});

describe("requestRobots", () => {
    const initialStateRobots = {
        robots: [],
        isPending: false,
    };

    it("Should return initial state", () => {
        expect(reducer.requestRobots(undefined, {})).toEqual(
            initialStateRobots
        );
    });

    it("Should handle REQUEST_ROBOTS_PENDING action", () => {
        expect(
            reducer.requestRobots(initialStateRobots, {
                type: REQUEST_ROBOTS_PENDING,
            })
        ).toEqual({
            robots: [],
            isPending: true,
        });
    });

    it("Should handle REQUEST_ROBOTS_SUCCESS action", () => {
        expect(
            reducer.requestRobots(initialStateRobots, {
                type: REQUEST_ROBOTS_SUCCESS,
                payload: [
                    {
                        id: "123",
                        name: "test",
                        email: "test@gmail.com",
                    },
                ],
            })
        ).toEqual({
            robots: [
                {
                    id: "123",
                    name: "test",
                    email: "test@gmail.com",
                },
            ],
            isPending: false,
        });
    });

    it("Should handle REQUEST_ROBOTS_FAILED action", () => {
        expect(
            reducer.requestRobots(initialStateRobots, {
                type: REQUEST_ROBOTS_FAILED,
                payload: "NOOOO!!",
            })
        ).toEqual({
            error: "NOOOO!!",
            robots: [],
            isPending: false,
        });
    });
});
