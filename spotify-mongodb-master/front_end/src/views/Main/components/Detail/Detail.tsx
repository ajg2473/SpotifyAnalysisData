import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import * as _ from 'lodash';
import { Bar } from 'react-chartjs-2';
import { History, SearchResult, Comment } from '../../../../utils/types';
import { millisecondsToReadable } from '../../../../utils/utils';
import { addComment, getSongData } from '../../../../utils/api';
import { BackContainer, ItemDetails, ItemDetail, ItemGraph, ItemImage, PageContainer, StyledH3 } from './StyledComponents';
import CommentForm from './components/CommentForm';

type DetailProps = {
    history: History,
}

type DetailState = {
    itemDetails: SearchResult | null,
}

class Detail extends Component<DetailProps, DetailState> {
    constructor(props: DetailProps) {
        super(props);
        // Check to see if there is a docId in the query string. Otherwise send them back.
        if (props.history.location.search) {
            const parsed = queryString.parse(props.history.location.search);
            const docId = Number.parseInt(parsed.docId as string);
            if (docId || docId === 0) {
                this.id = docId;
            } else {
                props.history.push('/');
            }
            getSongData(this.id as number)
                .then((response) => {
                    this.setState({
                        itemDetails: response.data,
                    })
                }).catch((error) => {
                    console.error('Error getting song data: ', error);
            })
        }
    }
    state = {
        itemDetails: null,
    };

    id: number|null = null;

    addComment = (comment: { nameField: string, messageField: string }) => {
        addComment({ username: comment.nameField, comment: comment.messageField, docId: this.id as number })
            .then(() => {
                //@ts-ignore
                this.setState((prevState) => {
                    const newItemDetails = _.cloneDeep(prevState.itemDetails);
                    if (newItemDetails && newItemDetails.comments) {
                        newItemDetails.comments.push({
                            name: comment.nameField,
                            message: comment.messageField,
                            time: new Date().toJSON()
                        });
                        return { itemDetails: newItemDetails };
                    }
                });
            }).catch(() => {
                console.error('Error adding comment');
        });
    };

    /**
     * This will render the item detail part of the page. This includes the image, the graph, and
     * the data.
     */
    renderItemDetail = () => {
        if (this.state.itemDetails) {
            const {
                base64Image, artist, song_title, duration_ms, tempo, key, time_signature, liveness,
                loudness, valence, instrumentalness, danceability, speechiness, acousticness, energy,
                comments,
            } = this.state.itemDetails as unknown as SearchResult;
            const data = {
                labels: ['Liveness', 'Valence', 'Instrumentalness', 'Danceablility', 'Speechiness', 'acousticness', 'energy'],
                datasets: [{
                    label: 'Anaylsis',
                    data: [liveness, valence, instrumentalness, danceability, speechiness, acousticness, energy],
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                }],
            };
            return (
                <Fragment>
                    <ItemImage src={base64Image} />
                    <ItemDetails>
                        <ItemDetail>Artist: {artist}</ItemDetail>
                        <ItemDetail>Song: {song_title}</ItemDetail>
                        <ItemDetail>Duration: {millisecondsToReadable(duration_ms)}</ItemDetail>
                        <ItemDetail>Tempo: {tempo}</ItemDetail>
                        <ItemDetail>Key: {key}</ItemDetail>
                        <ItemDetail>Time Signature: {time_signature}</ItemDetail>
                    </ItemDetails>
                    <ItemGraph>
                        <Bar data={data} height={200}  options={{
                            maintainAspectRatio: true
                        }} />
                    </ItemGraph>
                    <ItemDetails>
                        <StyledH3>Comments</StyledH3>
                        {comments ? this.renderComments(comments as unknown as Comment) : null}
                        <StyledH3>Add Comment</StyledH3>
                        <CommentForm handleSubmit={this.addComment} />
                    </ItemDetails>
                </Fragment>
            )
        }
        return null;
    };

    renderComments = (comments: Array<{name: string, message: string, time: string}>) => {
        const commentNodes = _.map(comments, (comment, index) => (
            <tr key={index * 1000}>
                <td><b>{comment.name}: </b></td>
                <td>{comment.message}</td>
                <td>| {new Date(comment.time).toDateString()}</td>
            </tr>
        ));
        return (
            <table>
                <tbody>
                    {commentNodes}
                </tbody>
            </table>
        )
    };

    render(): React.ReactNode {
        return (
            <PageContainer>
                <BackContainer>
                    <input type="button" value="Back" onClick={() => this.props.history.goBack()} />
                </BackContainer>
                {this.state.itemDetails ? this.renderItemDetail() : null}
            </PageContainer>
        );
    }
}

export default Detail;
