require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var SpotifySearch = process.argv[2];
var userInput = process.argv.slice(3).join("+");

function liriFunction(SpotifySearch, userInput) {
  logEntry(SpotifySearch);
  displaySong(userInput);
  console.log("Enter node liri.js SpotifySearch '<song name here>'");
}

function displaySong(song) {
  var songName;
  if (song != "") {
    songName = song;
  } else {
    songName = "The Sign";
  }

  console.log(songName);

  spotify.search({ type: "track", query: `"${songName}"`, limit: 1 }, function(
    err,
    data
  ) {
    var songData = data.tracks.items[0];

    if (err) {
      return console.log("Error occurred: " + err);
    }

    var resOutput =
      "----------------------------" +
      "\n" +
      "Song Artist: " +
      songData.artists[0].name +
      "\n" +
      "Song name: " +
      songData.name +
      "\n" +
      "Song External Player: " +
      songData.external_urls.spotify +
      "\n" +
      "Album name: " +
      songData.album.name +
      "\n" +
      "---------------------------------";

    console.log(resOutput);
    logEntry(resOutput);
  });
}

function logEntry(data) {
  fs.appendFile("log.txt", data, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

liriFunction(SpotifySearch, userInput);
