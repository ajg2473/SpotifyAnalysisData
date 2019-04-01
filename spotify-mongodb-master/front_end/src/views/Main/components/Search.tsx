import React, { Component } from 'react';
import styled from 'styled-components';
import { SearchList } from "./SearchList";
import { search } from "../../../utils/api";
import { SearchResults } from "../../../utils/types";

const SearchInput = styled.input`
  width: 80%;
  height: 35px;
  padding: 12px 20px;
  box-sizing: border-box;
  box-shadow: inset 0 1px 3px #ddd;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const SearchButton = styled.input`
  background-color: #1DB954;
  color: white;
  border-radius: 100px;
  border: none;
  height: 35px;
  width: 100px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const LineBreak = styled.div`
  background-color: rgba(51,51,51,0.39);
  width: 95%;
  margin: 55px auto;
  height: 1px;
`;

const HelpText = styled.div`
  text-align: center;
  font-size: 0.7em;
  font-style: italic;
`;

type SearchProps = {
    history: {
        push: Function,
    },
};

type SearchState = {
    query: string,
    searchResults: SearchResults,
};

class Search extends Component<SearchProps,SearchState> {
    state = {
        query: '',
        searchResults: [],
    };

    /**
     * Meant to be called on the onChange method of the search input
     * @param parameters
     */
    updateSearchQueryText = (parameters: any) => {
        this.setState({
            query: parameters.target.value,
        });
    };

    checkConfirmedSearchSubmission = (event: any) => {
        if (event.key === 'Enter') {
            this.makeSearch();
            event.target.blur();
        }
    };

    makeSearch = () => {
        search(this.state.query)
            .then((response) => {
                this.setState({
                    searchResults: response.data,
                });
            }).catch((error) => {
                console.error('Error on search', error);
        });
    };

    /**
     * This will send the user to the detail page. Note: it will not check to see if you are sending
     * a valid docId
     * @param id - this should be a valid doc ID
     */
    handleResultClick = (id: number) => {
        this.props.history.push(`/detail?docId=${id}`);
    };

    render(): React.ReactNode {
        return (
            <div>
                <SearchContainer>
                    <SearchInput value={this.state.query} onChange={this.updateSearchQueryText} onKeyPress={this.checkConfirmedSearchSubmission} type="text" placeholder="Query" />
                    <SearchButton type="button" value="Search" onClick={this.makeSearch} />
                </SearchContainer>
                <LineBreak />
                {this.state.searchResults ? <HelpText>Click a row below to see details</HelpText> : <div />}
                <SearchList handleOnClick={this.handleResultClick} searchResults={this.state.searchResults} />
            </div>
        );
    }
}

export default Search;
