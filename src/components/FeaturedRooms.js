import React, { Component } from 'react'
import {RoomContext} from '../context'
import Loading from './Loading';
import Room from './Room'
import Title from './Title'

export default class FeaturedRooms extends Component {
    static contextType = RoomContext // you can do this in class based

    render() {
        let { loading, featuredRooms : rooms} = this.context; // lets call featuredRooms 'rooms'

        // you could do this mapping down inside jsx
        rooms = rooms.map(room => {
            return (
                <Room key={room.id} room={room} />
            )
        })

        return (
            <section className="featured-rooms">
                <Title title="featured rooms" />
                <div className="featured-rooms-center"> 
                    {loading ? <Loading /> : rooms}
                </div>
            </section>
        )
    }
}
