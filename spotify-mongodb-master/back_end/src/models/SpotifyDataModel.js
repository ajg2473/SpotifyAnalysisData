const ImageSchema = require('./SpotifyImageModel');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    name: String,
    message: String,
    time: String
});

const SpotifyDataSchema = new Schema({
    index: {
        type: Number,
        unique: true,
        required: true,
    },
    acousticness: {
        type: Number,
        required: true,
    },
    danceability: {
        type: Number,
        required: true,
    },
    duration_ms: {
        type: Number,
        required: true,
    },
    energy: {
        type: Number,
        required: true,
    },
    instrumentalness: {
        type: Number,
        required: true,
    },
    key: {
        type: Number,
        required: true,
    },
    liveness: {
        type: Number,
        required: true,
    },
    loudness: {
        type: Number,
        required: true,
    },
    mode: {
        type: Number,
        required: true,
    },
    speechiness: {
        type: Number,
        required: true,
    },
    tempo: {
        type: Number,
        required: true,
    },
    time_signature: {
        type: Number,
        required: true,
    },
    valence: {
        type: Number,
        required: true,
    },
    target: {
        type: Number,
        required: true,
    },
    song_title: {
        type: String,
        required: true,
        trim: true,
    },
    artist: {
        type: String,
        required: true,
        trim: true,
    },
    image_name: {
        type: String,
        required: true,
    },
    images: {
        type: [ImageSchema.schema],
        required: true,
    },
    comments: {
        type: [CommentSchema],
        required: true,
    }
});


module.exports = mongoose.model('statistics', SpotifyDataSchema);