// (function(root) {
//   'use strict';
//
//   root.UserMessages = React.createClass({
//     render: function() {
//       // var messages = MessageStore.all();
//       return (
//         <div className="container">
//           <div className="row">
//           <div className="panel col-xs-6">
//             start all received
//               {MessageStore.all("received").map(function(message) {
//                 var keys = Object.keys(message);
//
//                 return(
//                   <div className="panel">
//                     {keys.map(function(key) {
//                       return(
//                         <span>
//                           {key}: {message[key]}<br/>
//                         </span>
//                       );
//                     })}
//                     <br/>
//                   </div>
//                 );
//               })}
//             end all received
//           </div>
//           <div className="panel col-xs-6">
//             start all sent
//             {MessageStore.all("sent").map(function(message) {
//               var keys = Object.keys(message);
//
//               return(
//                 <div className="panel">
//                   {keys.map(function(key) {
//                     return(
//                       <span>
//                         {key}: {message[key]}<br/>
//                       </span>
//                     );
//                   })}
//                   <br/>
//                 </div>
//               );
//             })}
//             end all sent
//           </div>
//           </div>
//         </div>
//       );
//     }
//   });
// }(this));
