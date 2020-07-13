import React from 'react'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import {withRoomConsumer} from '../context'
import Loading from './Loading'

function RoomsContainer({context}){ // here props is not passed but props are passed down inside RoomsFilter and RoomsList
    const {loading, sortedRooms, rooms} = context; // context are value
    if(loading){
        return <Loading />
    }
        
    return (
        <>
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </>
    )
}

export default withRoomConsumer(RoomsContainer) // we passed the component 'RoomsContainer' to withRoomConsumer


// YOU CAN ALSO DO THIS WAY USING 'RoomConsumer' BUT ITS LONGER
// import React from 'react'
// import RoomsFilter from './RoomsFilter'
// import RoomsList from './RoomsList'
// import {RoomConsumer} from '../context'
// import Loading from './Loading'

// export default function RoomsContainer() {
//     return (
//         <RoomConsumer>
//             { (value) => {
//                 const {loading, sortedRooms, rooms} = value
//                 if(loading){
//                     return <Loading />
//                 }

//                 return (
//                     <div>
//                         hello from rooms container
//                         <RoomsFilter rooms={rooms} />
//                         <RoomsList rooms={sortedRooms} />
//                     </div>
//                 )
//                 }
//             }
//         </RoomConsumer>
//     )
// }
