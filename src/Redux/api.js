import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'


export function jwtDecode(token) {                         // расщифровки токена авторизации
    try {
        const tokenArr = token.split(".");
        const tokenJsonStr = atob(tokenArr[1]);
        const tokenJson = JSON.parse(tokenJsonStr);
        return tokenJson;
    }
    catch (error) { 
        console.log(error)
    }
}

const prepareHeaders =  (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
     const token = getState().auth.token
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MjYyOTA1ZWNiZTY5ODVlZWQ0NzIzMDAiLCJsb2dpbiI6InRlc3QiLCJhY2wiOlsiNjI2MjkwNWVjYmU2OTg1ZWVkNDcyMzAwIiwidXNlciJdfSwiaWF0IjoxNjc5MzM1NjQyfQ.k51I9BFbNit85SCkZGU3HO5c_G159VsO3GFxaj0unTc"


    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
}


export const api = createApi({
    baseQuery: graphqlRequestBaseQuery({
        url: "http://player.node.ed.asmer.org.ua/graphql",
        prepareHeaders
    }),
    endpoints: (builder) => builder.query({
        getLogin : builder.mutation({
            query: ({login,password})=>({
                document: gql`query getLogin($login: String!, $password: String!){
                    login(login: $login, password: $password)
                } `,
                variables: {login, password}
            }),  
        }),
        getRegistr: builder.mutation({
            query: ({login,password})=>({
                document: gql`mutation registrUser($login: String!,$password: String!){
                       createUser(login:$login,password: $password){
                       _id login
                       }
                     } `,
                variables: {  login,password }
            }),  
        }),
        getTracks: builder.query({
            query: () => ({
                document: gql`query trackFind {
                    TrackFind(query:"[{}]"){
                       _id url originalFileName owner{_id} 
                       }
                   }`
                }),
        }),
        getPlaylistOne: builder.query({
            query: (_id) => ({
                document: gql` query playlistFindOne($q: String) {
                    PlaylistFindOne(query: $q){
                      _id name owner{_id login nick avatar{url _id}} description tracks{
                        _id url originalFileName owner{_id login avatar{url}} id3{title artist genre trackNumber} playlists{
                            _id owner{_id} description } 
                      }
                    }
                  }`,
                  variables : {q : JSON.stringify([{_id}])}
                }),
        }),
        getPlaylist: builder.query({
            query: ({q,skip=1000,limit=16}) => ({
                document: gql`query playlistFind($q : String) {
                        PlaylistFind (query:$q){
                           _id name owner{_id login nick avatar{url _id}} description tracks{
                            _id url originalFileName owner{_id login avatar{url}} playlists{_id} }
                        }
                      }`,
                      variables: {q: JSON.stringify([
                        {
                            ...{ tracks: { $exists:true, $ne: [] } }, //$exists return data with normal values and null, $ne:[] return data with not empty [] 
                            ...q
                        },
                        {
                            sort:[{_id: -1}], //сортировка в обратном хронологическом порядке
                            skip: [skip], //отступаем x записей
                            limit: [limit],  // x записей максимум
                        }

                    ])}
                }),
                
        }),
        getImages: builder.query({
            query: () => ({
                document: gql` query imageFind {
                        ImageFind (query:"[{}]"){
                          _id text url
                          originalFileName
                          userAvatar{
                            _id
                          }
                          owner{
                            _id
                          }
                        }
                      }`
            }),  
        }),
        getUser: builder.query({
            query: (_id) => ({
                document: gql `query userFindOne($q: String) {
                    UserFindOne(query : $q){
                      _id nick  createdAt login avatar{
                              _id url
                            }
                      }
                  }`,
                variables : {q : JSON.stringify([{_id}])}
            }),  
        }),
        setNick: builder.mutation({
            query: ({_id,nick}) =>({
                document: gql`
                    mutation SetNick($_id:String, $nick: String){
                        UserUpsert(user: {_id: $_id, nick: $nick}){
                            _id, nick
                        }
                    }
                `,
                variables: {_id,nick}
            })
        }),
        playlistUpsert : builder.mutation({
            query:(playlist)=>({
                document: gql`
                    mutation PlaylistUpsert($playlist: PlaylistInput){
                        PlaylistUpsert(playlist: $playlist) {
                            _id
                            name
                            tracks{ _id url}
                        }
                    }
                `,
                variables: {playlist}
            })
        }),
        deletePlaylist:builder.mutation({
            query:(_id)=>({
                document: gql`
                mutation PlaylistDelete($_id: ID){
                    PlaylistDelete(playlist:{_id: $_id}) {
                        _id
                        name
                    }
                }
                `,
                variables: {q: JSON.stringify([{_id}])}
            })
        })
    }),
})

export const {  useGetLoginMutation,useGetRegistrMutation,useDeletePlaylistMutation,
     useGetTracksQuery,useGetPlaylistQuery,useGetPlaylistOneQuery,
    useGetImagesQuery,useGetUserQuery,useSetNickMutation, } = api



export const baseURL = 'http://player.node.ed.asmer.org.ua/'



