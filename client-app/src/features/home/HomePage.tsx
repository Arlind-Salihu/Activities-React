import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Segment, Image, Button} from 'semantic-ui-react'

export default function HomePage () {
    return (
       <Segment inverted textAlign='center' vertical className="masthead">
           <Container text>
               <Header as='h1' inverted>
                   <Image size="massive" src='/assets/logo.png' alt="logo" style={{marginBottom: 12}}/>
                   Tech E-Commerce
               </Header>
               <Header as='h2' inverted >
                   <Button as={Link} to="/telefonat" size='huge' inverted>Identifikohu ne Web-faqen tone!</Button>
               </Header>
           </Container>
       </Segment>
    )
}
