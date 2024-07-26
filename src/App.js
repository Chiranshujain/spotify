import SpotifyWebApi from 'spotify-web-api-js';
import { useEffect } from 'react';
import './App.css';
import Login from './Pages/login/Login.js';
import { getTokenFromUrl } from './Data/spotify';
import Player from './Pages/player/Player';
import { useDataLayerValue } from './Data/DataLayer';

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user
        });
      }).catch(error => {
        console.error('Error fetching user:', error);
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        });
      }).catch(error => {
        console.error('Error fetching playlists:', error);
      });

      spotify.getPlaylist('1qhnTKGUypblVtUGzg9166').then(response => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        });
      }).catch(error => {
        console.error('Error fetching discover weekly playlist:', error);
      });

      spotify.getMyTopArtists()
        .then((response) => {
          dispatch({
            type: "SET_TOP_ARTISTS",
            top_artists: response,
          });
        })
        .catch(error => {
          console.error('Error fetching top artists:', error);
        });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });
    } else {
      console.error('No token found');
    }
  }, [dispatch]);

  return (
    <div className="App">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
