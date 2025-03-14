import React, { Component } from "react";
import { connect } from "react-redux";
import { setSearchField, requestRobots } from "../actions";

import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

import "./App.css";

console.log("CardList:", CardList);
console.log("SearchBox:", SearchBox);
console.log("Scroll:", Scroll);
console.log("ErrorBoundry:", ErrorBoundry);

// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
    };
};

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots()),
    };
};

class App extends Component {
    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const { robots, searchField, onSearchChange, isPending } = this.props;
        const filteredRobots = robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        return (
            <div className="tc">
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    {isPending ? (
                        <h1>Loading</h1>
                    ) : (
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    )}
                </Scroll>
            </div>
        );
    }
}

// action done from mapDispatchToProps will channge state from mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App);
