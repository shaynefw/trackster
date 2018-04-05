var Trackster = {};
const API_KEY = '54bd5c3a749ae094456d0a6a6a3be9e9';

$(document).ready(function() {
  $('#search-btn').click(function() {
    Trackster.searchTracksByTitle($('#search-txt').val());
  });
});
/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  var $trackList = $('#track-list');
  $trackList.empty();

  for (var trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
    var track = tracks[trackIndex];
    var mediumAlbumArt = track.image[1]["#text"];
    var htmlTrackRow =
      '<div class="row track">' +
        '<div class="col-xs-2 glyphicon glyphicon-play-circle"><a href="'+ track.url +'" target="_blank"></a></div>' +
        '<div class="col-xs-4">'+ track.name +'</div>' +
        '<div class="col-xs-2">'+ track.artist +'</div>' +
        '<div class="col-xs-2"><img src="'+ mediumAlbumArt +'"/></div>' +
        '<div class="col-xs-2">'+ track.listeners +'</div>' +
      '</div>';
      $trackList.append(htmlTrackRow);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track='+ title +'&api_key='+ API_KEY +'&format=json',
    success: function(response) {
      Trackster.renderTracks(response.results.trackmatches.track);
    }
  })
};
