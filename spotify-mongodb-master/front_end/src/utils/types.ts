
export type SearchResults = Array<SearchResult>;

export type SearchResult = {
    index: number
    artist: string,
    song_title: string,
    loudness: number,
    liveness: number,
    tempo: number,
    valence: number,
    instrumentalness: number,
    danceability: number,
    speechiness: number,
    target: number,
    duration_ms: number,
    mode: number,
    acousticness: number,
    key: number,
    energy: number,
    time_signature: number,
    base64Image: string | undefined,
    comments: Comment | undefined,
}

export type Comment = Array<{
    name: string,
    message: string,
    time: string,
}>;

export type History = {
    push: Function,
    goBack: Function,
    location: {
        search: string,
        state: {}| any,
    }
};
