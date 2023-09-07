// const query =  # query login {
//     #        login(login: "test",password: "123123")
//     #    }
//    # query userFind{
//    #   UserFind(query:"[{}]") {
//    #     _id
//    #     createdAt
//    #     login
//    #     nick
//    #   }
//    # }
   
//    # mutation createUser{
//    #   createUser(login:"bohdan99",password:"999999") {
//    #     _id
//    #     login
       
//    #   }
//    # }
//    query userFind {
//      UserFind(query:"[{}]"){
//        _id createdAt
//                 login
//                 nick 
//      }
//    }
   
//    # query trackFind {
//    #   TrackFind(query:"[{}]"){
//    #      _id url originalFileName owner{_id}  
   
//    #   }
//    # }
   
   
// query playlistFind {
//     PlaylistFind (query:"[{}]"){
//        _id name owner{_id login nick} description tracks{_id url originalFileName}
//     }
//   }
   
//   query imageFind {
//     ImageFind (query:"[{}]"){
//       _id
//       text
//       url
//       originalFileName
//       userAvatar{
//         _id
//       }
//       owner{
//         _id
//       }
//     }
//   }

// query playlistFind {
//     PlaylistFind(query:"[{}]"){
//       _id name description tracks{
//         _id url originalFileName owner{_id} id3{title artist genre}
//       }
//     }
//   }

// query userFindOne {
//     UserFindOne(query: "[{\"_id\":\"6265a0becbe6985eed47230d\"}]"){
//       _id nick  createdAt login avatar{
//               _id url
//             }
//   	}
//   }

