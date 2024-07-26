import React, { useEffect } from 'react';
import './Footer.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import { Grid, Slider } from '@mui/material';
import { useDataLayerValue } from '../../../Data/DataLayer';

function Footer({ spotify }) {
    const [{ item, playing }, dispatch] = useDataLayerValue();

    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
            console.log(r);

            dispatch({
                type: "SET_PLAYING",
                playing: r.is_playing,
            });

            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
        });
    }, [spotify, dispatch]);

    const handlePlayPause = () => {
        if (playing) {
            spotify.pause().then(() => {
                dispatch({
                    type: "SET_PLAYING",
                    playing: false,
                });
            });
        } else {
            spotify.play().then(() => {
                dispatch({
                    type: "SET_PLAYING",
                    playing: true,
                });
            });
        }
    };

    const skipNext = () => {
        spotify.skipToNext().then(() => {
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
            console.error('Error skipping to next track:', error);
        });
    };

    const skipPrevious = () => {
        spotify.skipToPrevious().then(() => {
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
            console.error('Error skipping to previous track:', error);
        });
    };

    return (
        <div className='footer'>
            <div className='footer-left'>
                <img
                    className='footer-album-logo'
                    src={item?.album?.images[0]?.url || 'https://via.placeholder.com/150'}
                    alt={item?.name || 'Album cover'}
                />
                <div className='footer-song-info'>
                    <h4>{item?.name || "No song playing"}</h4>
                    <p>{item?.artists?.map(artist => artist.name).join(", ") || "..."}</p>
                </div>
            </div>
            <div className='footer-center'>
                <ShuffleIcon className='footer-green' />
                <SkipPreviousIcon className='footer-icon' onClick={skipPrevious} />
                {playing ? (
                    <PauseCircleOutlineIcon
                        onClick={handlePlayPause}
                        fontSize="large"
                        className="footer-icon"
                    />
                ) : (
                    <PlayCircleOutlineIcon
                        onClick={handlePlayPause}
                        fontSize="large"
                        className="footer-icon"
                    />
                )}
                <SkipNextIcon className='footer-icon' onClick={skipNext} />
                <RepeatIcon className='footer-green' />
            </div>
            <div className='footer-right'>
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Footer;
