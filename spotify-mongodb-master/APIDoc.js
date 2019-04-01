export default {
    name: 'Spotify- Mongo',
    endpoints: [
        {
            endpoint: '/api/search',
            method: 'GET',
            description: `Endpoint will take in a query parameter of query and will search the database for these results
                          it will return no more than 50 results to the front end in the object described below. These
                          results must match partial words as well full words. Ex. work finds working but not rework`,
            queryParameters: [
                {
                    name: 'query',
                    description: 'This is the query string to be searched in the database',
                    type: 'string',
                    required: true,
                }
            ],
            response: {
                schema: {
                    type: 'Array of Objects',
                    items: [
                        {
                            index: 'number',
                            acousticness: 'number',
                            danceability: 'number',
                            duration_ms: 'number',
                            energy: 'number',
                            instrumentalness: 'number',
                            key: 'number',
                            liveness: 'number',
                            loudness: 'number',
                            mode: 'number',
                            speechiness: 'number',
                            tempo: 'number',
                            time_signature: 'number',
                            valence: 'number',
                            target: 'number',
                            song_title: 'string',
                            artist: 'string',
                        },
                    ]
                },
            },
            errorResponse: {
                400: {
                    code: 'number',
                    message: 'string'
                }
            }
        },
        {
            endpoint: '/api/getSongData',
            method: 'GET',
            description: `This endpoint will take in a query parameter of a doc id. It will take this doc Id and match
                          one document in the database based off the index key. So like findOne({ index: docId }) in
                          mongo shell. It will then grab the data for this, and then using the image_name key, will
                          grab the image from the gridfs store. It will then convert this image to a base64 string and
                          return it along with other information about the document.`,
            queryParameters: [
                {
                    name: 'docId',
                    description: 'This will match a row in the database based off the index key',
                    type: 'number',
                    required: true,
                }
            ],
            response: {
                schema: {
                    type: 'Object',
                    items: {
                        index: 'number',
                        acousticness: 'number',
                        danceability: 'number',
                        duration_ms: 'number',
                        energy: 'number',
                        instrumentalness: 'number',
                        key: 'number',
                        liveness: 'number',
                        loudness: 'number',
                        mode: 'number',
                        speechiness: 'number',
                        tempo: 'number',
                        time_signature: 'number',
                        valence: 'number',
                        target: 'number',
                        song_title: 'string',
                        artist: 'string',
                        base64Image: 'string',
                        comments: [
                            {
                                name: 'string',
                                message: 'string',
                                time: 'string',
                            }
                        ],
                    },
                },
            },
            errorResponse: {
                400: {
                    code: 'number',
                    message: 'string'
                }
            }
        },
        {
            endpoint: '/api/addComment',
            method: 'POST',
            description: `This endpoint will add a comment to the specified docId. Make sure to sanitize the input`,
            bodyParameters: [
                {
                    name: 'username',
                    description: 'this is the name of the user posting the comment',
                    type: 'string',
                    required: true,
                },
                {
                    name: 'comment',
                    description: 'This is the body of the comment that the user left',
                    type: 'string',
                    required: true,
                }
            ],
            response: {
                schema: {
                    type: 'Object',
                    items: {
                        code: 'number',
                        message: 'string',
                    },
                },
            },
            errorResponse: {
                400: {
                    code: 'number',
                    message: 'string'
                }
            }
        }
    ]
};
