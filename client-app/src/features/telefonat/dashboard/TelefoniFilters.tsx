import React from 'react'
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

export default function TelefoniFilters () {
    return (
        <>
        <Menu vertical size='large' style={{width: '100%', marginTop: 28}}>
            <Header icon='filter' attached color='teal' content="Filters"/>
            <Menu.Item content="Te gjithe Telefonat"/>
            <Menu.Item content="Une jam duke shikuar"/>
            <Menu.Item content="I am hosting"/>
        </Menu>
        <Header/>
        <Calendar/>
        </>
    )
}
