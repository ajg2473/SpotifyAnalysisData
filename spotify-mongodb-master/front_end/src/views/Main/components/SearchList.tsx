import React from 'react';
import * as _ from 'lodash';
import styled, { css } from 'styled-components';
import { SearchResults } from "../../../utils/types";
import { millisecondsToReadable } from '../../../utils/utils';

interface RowProps {
    pointer?: boolean,
}

const Row = styled.div<RowProps>`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 3fr;
  width: 90%;
  margin: 20px auto;
  cursor: default;
  ${(props) => props && props.pointer && css`
    cursor: pointer;
  `};
`;

const ListContainer = styled.div`
  height: 500px;
  overflow-y: scroll;
`;

const CDiv = styled.div`
  text-align: center;
`;

type SearchListProps = {
    searchResults: SearchResults,
    handleOnClick: Function
};

export const SearchList = (props: SearchListProps) => {
    const generateList = () => {
        // Template for every result row
        return _.map(props.searchResults, (result, index) => {
            if (index > 100) return false;
            return (
                <Row onClick={() => props.handleOnClick(result.index)} key={index + 1} pointer>
                    <CDiv>{index + 1}</CDiv>
                    <div>{result.artist}</div>
                    <div>{result.song_title}</div>
                    <div>{millisecondsToReadable(result.duration_ms)}</div>
                </Row>
            )
        });
    };
    const list = [
        <Row key={0}>
            <CDiv>#</CDiv>
            <div>Artist</div>
            <div>Song Title</div>
            <div>Duration</div>
        </Row>
    , ... generateList()];

    return <ListContainer>{list}</ListContainer>
};
