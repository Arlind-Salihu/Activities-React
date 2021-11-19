import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

export default function HomePage () {
    return (
        <Container style={{marginTop: '7e'}}>
            <h1>Home Page</h1>
            <h3>Kliko per te pare <Link to={'/produktet'}>Produktet</Link></h3>
        </Container>
    )
}
