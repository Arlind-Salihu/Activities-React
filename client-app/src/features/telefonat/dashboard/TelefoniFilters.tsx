import { observer } from 'mobx-react-lite'
import React from 'react'
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'

export default observer (function TelefoniFilters () {

    const {telefoniStore: {predicate, setPredicate}} = useStore();

    return (
        <>
        <Menu vertical size='large' style={{width: '100%', marginTop: 28}}>
            <Header icon='filter' attached color='teal' content="Filters"/>
            <Menu.Item content="Te gjithe Telefonat" active={predicate.has('all')} onClick={() => setPredicate('all', 'true')}/>
            <Menu.Item content="I am Interesed" active={predicate.has('isInteresed')} onClick={() => setPredicate('isInteresed', 'true')}/>
            <Menu.Item content="I am hosting" active={predicate.has('isHost')} onClick={() => setPredicate('isHost', 'true')}/>
        </Menu>
        <Header/>
        <Calendar onChange={(data) => setPredicate('startDate', data as Date)}
        value={predicate.get('startDate') || new Date()}/>
        </>
    )
})
