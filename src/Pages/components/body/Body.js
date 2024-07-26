import React, { useState } from 'react';
import './Body.css';
import Header from '../header/Header';
import SongRow from '../songrow/SongRow';
import { useDataLayerValue } from '../../../Data/DataLayer';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const playPlaylist = () => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        }).catch(error => {
          console.error('Error fetching current playing track:', error);
        });
      }).catch(error => {
        console.error('Error playing playlist:', error);
        if (error.status === 403) {
          setOpen(true);
        }
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        }).catch(error => {
          console.error('Error fetching current playing track:', error);
        });
      }).catch(error => {
        console.error('Error playing song:', error);
        if (error.status === 403) {
          setOpen(true);
        }
      });
  };

  return (
    <div className='body'>
      <Header spotify={spotify} />
      <div className='body-info'>
        <img
          src={discover_weekly?.images[0]?.url}
          alt=''
        />
        <div className='body-info-text'>
          <strong>PLAYLIST</strong>
          <h4>Discover Weekly</h4>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className='body-songs'>
        <div className='body-icons'>
          <PlayCircleFilledIcon className='body-shuffle' onClick={playPlaylist}/>
          <FavoriteIcon fontSize='large'/>
          <MoreHorizIcon /> 
        </div>
        {discover_weekly?.tracks.items.map((item) => (
          <SongRow playSong={playSong} track={item.track} key={item.track.id}/>
        ))}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Player command failed: Premium required
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Body;
