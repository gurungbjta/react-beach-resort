import React, { Component } from 'react'
import items from './data'

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    // getData


    componentDidMount(){
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));

        this.setState({
            rooms, featuredRooms, sortedRooms: rooms, loading: false, price: maxPrice, maxPrice, maxSize 
        });
    }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);

            let room = {...item.fields, images, id}
            return room;

        });
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room) => room.slug === slug); // find return an object whereas filter return array
        return room;
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value ;
        const name = e.target.name;
        this.setState(
            {
                [name]: value
            }, 
            this.filterRooms
            )
        }

    filterRooms = () => {
        let {rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state;
        let tempRooms = [...rooms];
        capacity = parseInt(capacity); // we get capacity from data as string so convert them to int
        price = parseInt(price);

        // filter by type
        if(type !== 'all'){ // if we choose a specific room type, only show those types of room eg.'single type room'
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        // filter by capacity
        if(capacity !== 1){ // if we select capacity as 2 then only return those rooms with same or greater capacity
            tempRooms = tempRooms.filter(room => room.capacity >= capacity) 
        }

        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price); // only display those rooms whose price is less or equal to the selected price

        // filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        // filter by breakfast
        if(breakfast){
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

        // filter by pets
        if(pets){
            tempRooms = tempRooms.filter(room => room.pets === true)
        }

        this.setState({
            sortedRooms: tempRooms
        })
    }
    
    render() {
        return (
            <RoomContext.Provider value={ {...this.state, getRoom: this.getRoom, handleChange: this.handleChange} }>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

// this another way of using context by other Components (see RoomsFilter.js)
// this is heirachy based
// this setup makes us easy to use later since we no more have to use RoomConsumer just like we did in RoomsContainer.js (see commented)
export function withRoomConsumer(Component){ // this Component is going to use this context
    return function ConsumerWrapper(props){ // you can name anything eg.ConsumerWrapper
        return (
            // return that Component with the same props (if passed) and value as context
            <RoomConsumer> 
                {value => <Component {...props} context={value} />}
            </RoomConsumer>
        )
    }
}

export {RoomProvider, RoomConsumer, RoomContext}
