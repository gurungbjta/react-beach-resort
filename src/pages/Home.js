import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import Services from '../components/Services'
import FeaturedRooms from '../components/FeaturedRooms'

// shortcut: rafc
export const Home = () => {
    return (
        <>
            <Hero>
                {/* Banner is the children of Hero */}
                <Banner title="luxurious rooms" subtitle="deluxe rooms starting at $299">
                    {/* Link is the children of Banner */}
                    <Link to='/rooms' className="btn-primary">
                        our rooms
                    </Link>
                </Banner>
            </Hero>

            <Services />

            <FeaturedRooms />
        </>
    )
}


