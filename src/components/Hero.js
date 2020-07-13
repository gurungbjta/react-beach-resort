import React from 'react'

export default function Hero({children, hero}) {
    return (
        <header className={hero}>
            {children}
        </header>
    )
}

// this is a default 'hero' prop in case hero is not passed
Hero.defaultProps = {
    hero: 'defaultHero'
}
