import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

const passwordApi = createApi({
    baseQuery: graphqlRequestBaseQuery({
        url: "http://player.node.ed.asmer.org.ua/graphql" 
        //without headers
    }),
    endpoints: (builder) =>  ({
        setPassword: builder.mutation({
            query: ({login,currentPassword,newPassword})=>({
             document: gql`
              mutation changePassword($login:String!,$currentPassword:String!,$newPassword:String!){
                 changePassword(login:$login,password:$currentPassword,newPassword:$newPassword){
                     _id  login
                    }
                }`,
                variables: {login,currentPassword,newPassword}
            })
        }),
    })
})

export default passwordApi;

export const {useSetPasswordMutation} = passwordApi;