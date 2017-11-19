//Tilgang til data
const clientId = '968ee35eb3474da3b24f027dd3742fb6';
const redirectURI = 'https://volatile-police.surge.sh';

let accessToken = '';

//Spotify modul
class Spotify  {

   getAccessToken() {
     if(accessToken) {return accessToken}

       //check URL for  matches to access_token (and to the next &-sign) and expires_in (and to the next &-sign)
       const tokenString = window.location.href.match(/access_token=([^&]*)/);
       const expirationString = window.location.href.match(/expires_in=([^&]*)/);

       if(tokenString && expirationString) {

         var access_token = tokenString.split("=");
         var expires_in = expirationString.split("=");

         //set accessToken and expiration time
         accessToken = access_token[1];
         let expiresIn = expires_in[1];


         window.setTimeout(() => accessToken = '', expiresIn * 1000); // set accessToken to expire at the expiration time value
         window.history.pushState('Access Token', null, '/'); //clear URL parameters
         return accessToken;

       }else {
         window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
       };
     }

     search(term) {
       const accessToken = Spotify.getAccessToken();
       return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
       { headers: {Authorization: `Bearer ${accessToken}`} }).then(response => {
         return response.json();
       }).then(jsonResponse => {
         if(!jsonResponse.tracks) {
           return [];
         }
         return jsonResponse.tracks.items.map(track => ({
           id:     track.id,
           name:   track.name,
           artist: track.artists[0].name,
           album:  track.album.name,
           uri:    track.uri
         }));
       });
     }

     savePlaylist(playlistName, trackUris) {
         if(!playlistName && !trackUris) {
           return;
         };
         const accessToken = Spotify.getAccessToken();
         const headers = { Authorization: `Bearer ${accessToken}`};
         let userId;

         return fetch('https://api.spotify.com/v1/me',
         {headers: headers}).then(response => response.json()
         ).then(jsonResponse => {
           userId = jsonResponse.id;
           return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
           { headers: headers,
             method: "POST",
             body: JSON.stringify({name: playlistName})
           }).then(response => response.json()
           ).then(jsonResponse => {
             const playlistID = jsonResponse.id;
             return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
             { headers: headers,
               method: 'POST',
               body: JSON.stringify({uris: trackUris})
             });
         });
       });
       }
  };

export default Spotify;
