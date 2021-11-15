import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [produktet, setProduktet] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/produktet').then(response => {
      console.log(response);
      setProduktet(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='shop' content='Tech E-Commerce'/>
      
       <List>
         {produktet.map((produkti:any) => (
           <List.Item key={produkti.id}>
             {produkti.emri}
           </List.Item>
         ))}
       </List>
    </div>
  );
}

export default App;
