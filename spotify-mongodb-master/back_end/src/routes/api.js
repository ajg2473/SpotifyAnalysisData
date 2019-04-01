const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const _ = require('lodash');
const SpotifyDataModel = require('../models/SpotifyDataModel');


const mySort = {song_title: 1};
router.get('/search', (req, res) => {

    const select = {
        index: 1, acousticness: 1, danceability: 1, duration_ms: 1, energy: 1, instrumentalness: 1, key: 1,
        liveness: 1, loudness: 1, mode: 1, speechiness: 1, tempo: 1, time_signature: 1, valence: 1, target: 1,
        song_title: 1, artist: 1, _id: 0
    };
    if (req.query.query) {
        const { query } = req.query;
        SpotifyDataModel.find({ $or: [{song_title: { $regex: `\\b${query}`, $options: 'gi'}}, { artist: {$regex: `\\b${query}`, $options: 'gi'}}]}, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        }).sort(mySort).select(select);
    }
    else {
            res.status(400).json({
                code: 1,
                message: 'Incorrect parameters sent'
            });
    }
 });

 router.get('/getSongData', (req, res) => {
    if (req.query.docId) {
        const index = req.query.docId; 							//test with /getSongData?docId=1021
        SpotifyDataModel.find({index: index}, (err, songData) => {
            if (err) {
                res.send(err);
            }
            if (songData[0]) {
                const newData = _.cloneDeep(songData[0]._doc);
                const {image_name} = newData;
                mongo.MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
                    const db = client.db('spotify_images');
                    const bucket = new mongo.GridFSBucket(db);
                    const readstream = bucket.openDownloadStreamByName(image_name);
                    let image = Buffer.alloc(0);
                    readstream.on('data', (chunk) => {
                        image = Buffer.concat([image, chunk]);
                    });
                    readstream.on('error', () => {
                        newData.base64Image = '';
                        res.send(newData);
                        client.close();
                    });

                    readstream.on('end', () => {
                        console.log('done');
                        newData.base64Image = 'data:image/jpeg;base64,' + image.toString('base64');
                        res.send(newData);
                        client.close();
                    });
                });
            } else {
                res.status(400).json({
                    code: 1,
                    message: `No docId found that matches ${req.query.docId}`
                });
            }
        });
    }
    else {
        res.status(400).json({
            code: 1,
            message: 'Incorrect parameters sent'
        });
    }
 });

 router.post('/addComment', (req, res) => {
     if(req.body.username && req.body.comment && req.body.docId){
         if (req.body.comment.length < 200 && req.body.username.length < 30) {
             var comment = {"name": req.body.username, "message": req.body.comment, "time": new Date().toJSON()};
             SpotifyDataModel.findOneAndUpdate({index: req.body.docId}, {$push: {comments: comment}}, {new: true}, (err, doc) => {
                 if (err) {
                     res.send(err);
                 }
                 res.json(doc);
             });
         } else {
             res.status(400).json({
                 code: 1,
                 message: 'Parameters too long'
             });
         }
     }
     else {
            res.status(400).json({
                code: 1,
                message: 'Incorrect parameters sent'
            });
    }
  });

module.exports = router;
