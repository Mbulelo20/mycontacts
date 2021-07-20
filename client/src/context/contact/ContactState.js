  import React, { useReducer } from 'react';
import  uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './ContactReducer';

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR} 
    from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [
           {
               id: 1,
               name: 'jill Mikes',
               email: 'jill@mikes.com',
               phone: '12345678',
               type: 'personal'
           },
           {
            id: 2,
            name: 'Bill Maher',
            email: 'bill@maher.com',
            phone: '9876543',
            type: 'personal'
            },
            {
                id: 3,
                name: 'Mr Wilson',
                email: 'wilsobn@dennis.com',
                phone: '3456789876543',
                type: 'professional'
            },
        ]
    };
    const [state, dispatch] = useReducer(contactReducer, initialState);
    return (
        <ContactContext.Provider
          value={{ contacts: state.contacts,
            // current: state.current,
            // filtered: state.filtered,
            // error: state.error,
            // addContact,
            // deleteContact,
            // setCurrent,
            // clearCurrent,
            // updateContact,
            // filterContacts,
            // clearFilter,
            // getContacts,
            // clearContacts
          }}
        >{props.children}
        </ContactContext.Provider>
      );

}

export default ContactState;