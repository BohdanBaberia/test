import { useSelector,useDispatch } from "react-redux";
import { ActionSetPlaylist  } from '../../../Redux/thunk';
import {  useGetPlaylistQuery,useDeletePlaylistMutation } from '../../../Redux/api';
import { useHistory,useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useState,useEffect } from "react";

import Catalog from "./catalog";
import Search from "./search";
import { useAppContext } from "../../context";

export default function WrapperPlaylists () {
    const player = useSelector( state => state.player)
    const userID = useSelector( state => state.auth.user.sub.id)

    const dispatch = useDispatch()
    const history = useHistory()
    // const location = useLocation()

    const [playlistDelete] = useDeletePlaylistMutation()

    function PlayPlaylist (item,status) {
        dispatch(ActionSetPlaylist({item,status}))
        
    }
    function LookPlaylist (item) {
        history.push(`/playlist/${item._id}`)
    }
    
    function DeletePlaylist (item) {
        playlistDelete(item._id)
    }

    const {query,onSearch} = useAppContext()
   
    // const search = (new URLSearchParams(location.search)).get('query'); 
   
    const [page,setPage] = useState(1)
    const [nextPage,SetNextPage] = useState(true)
    const [items,setItmes] = useState([])
    const [isScroll,setIsScroll] = useState(false)
    const limit = 12
    // const [query, setQuery] = useState( {} ); //search ? {name: `/.*${search}.*/`} :
    // console.log(query)

    const hookResult = useGetPlaylistQuery({q:query,skip:(page-1)*limit,limit})
    const {data,isLoading,isFetching,error} = hookResult




   

    useEffect(()=>{
        if(data){
            if(data.PlaylistFind.length < limit ){
                SetNextPage(false)
            }
            if(isScroll){
                setItmes( items => [...items,...data.PlaylistFind] );
                console.log(items)
                
                setIsScroll(false)
            }
            else{
                setItmes(data.PlaylistFind)
            }
            return function cleanUp (){

            }
        }

    },[data])
    
    window.onscroll = function(ev) {
        if (nextPage && !isFetching && !isLoading && (window.innerHeight + window.scrollY + 100 ) >= document.body.offsetHeight) {
            setIsScroll(true);
            setPage(page+1)

            // you're at the bottom of the page
            console.log("bottom")
        }
    };


  if(error){
        history.push("/404")
    }
    if(isLoading)
    return <h2>LOADING</h2>;

    return ( 
        <>
        
        <Catalog
        id="catalog_id"
        key="catalog"
        userID={userID}
        player={player} 
        data={items}
        PlayPlaylist={PlayPlaylist}
        LookPlaylist={LookPlaylist}
        DeletePlaylist={DeletePlaylist}
        isLoading={isLoading}
        >
        </Catalog>
        </>
    )
}

