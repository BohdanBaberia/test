
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// // import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

// // import { playPause, setTrack } from '../Redux/toolkitSilce';

// import { useGetPlaylistOneQuery } from '../Redux/api';
// import { ActionPlayPause, ActionSetTrack } from '../Redux/thunk';
// import TracksTable from '../components/audio/TrackTable';

// const TracksPage = () => {
//     const dispatch = useDispatch()
//     const { playlistID } = useParams()
//     const { isPlaying, setTrack} = useSelector((state)=> state.player)

//     const { data,isFetching,isLoading, error  } = useGetPlaylistOneQuery(playlistID)

//     if(isFetching) return <div>Fetching</div>;

//     console.log(data)

//     if (error) return <div>Error</div>

//     const handlePauseClick = () => {
//         dispatch(ActionPlayPause(false))
//     }

//     const handlePlayClick = () => {
//         dispatch(ActionSetTrack)
//         dispatch(ActionPlayPause(true))
//     }

//     return (
//         <TracksTable
//             data={data}
//             playlistID={playlistID}
//             isPlaying = {isPlaying}
//             handlePauseClick={handlePauseClick}
//             handlePlayClick={handlePlayClick}
//         >   
//         </TracksTable>
//     )

// }

// export default TracksPage;