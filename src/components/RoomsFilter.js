import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../context'
import Title from '../components/Title'

// get all unique values using Set
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))] // set only accepts unique values
}

export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext);
    const {handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets} = context;

    // get unique types
    let types = getUnique(rooms, 'type');
    types = ['all', ...types]; // types will be whatever types array we got from above and then also add 'add' to it
    types = types.map((item, index) => {
        return (
            <option value={item} key={index}>{item}</option>
        )
    })

    // get capacity
    let people = getUnique(rooms, 'capacity');
    people = people.map((item, index) => {
        return (
            <option key={index} value={item}>{item}</option>
        )
    })

    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                        {types}
                    </select>
                </div>
                {/* end select type */}

                {/* guest capacity */}
                <div className="form-group">
                    <label htmlFor="type">guests</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                        {people}
                    </select>
                </div>
                {/* end guest */}

                {/* room price */}
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control"/>
                </div>
                {/* end of room price */}

                {/* room size */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange} className="size-input" />
                        <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} className="size-input" />
                    </div>
                </div>
                {/* end room size */}

                {/* extras */}
                <div className="form-group">
                    {/* breakfast */}
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange} />
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    {/* end of breakfast */}

                    {/* pets */}
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange} />
                        <label htmlFor="pets">pets</label>
                    </div>
                    {/* end of pets */}

                </div>
                {/* end of extras */}
            </form>
        </section>
    )
}
