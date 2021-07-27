import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './ContactReducer';
import axios from 'axios';

import {
//     GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CLEAR_FILTER,
    FILTER_CONTACTS,
//     CLEAR_CONTACTS,
//     CLEAR_FILTER,
    CONTACT_ERROR
} 
    from '../types'

const ContactState = props => {
  const initialState = {
      contacts: [],
      current: null,
      filtered: null,
      error: null
    };
    const [state, dispatch] = useReducer(contactReducer, initialState);

    const addContact = async contact => {

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        const res = await axios.post('/api/contacts', contact, config);
        dispatch({ type: ADD_CONTACT, payload: res.data})
      } catch (error) {
        dispatch({type: CONTACT_ERROR, payload: error.response.msg})
      }

    }

    const deleteContact = id => {
      dispatch({ type: DELETE_CONTACT, payload: id})

    }

    const setCurrent = contact => {
      dispatch({ type: SET_CURRENT, payload: contact})

    }
    const clearCurrent = contact => {
      dispatch({ type: CLEAR_CURRENT, payload: contact})
    }    

    const updateContact = contact => {
      dispatch({ type: UPDATE_CONTACT, payload: contact})

    }
    const filterContacts = text => {
      dispatch({ type: FILTER_CONTACTS, payload: text})

    }
    const clearFilter = () => {
      dispatch({ type:CLEAR_FILTER})
    } 
    return (
        <ContactContext.Provider
          value={{ contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            // getContacts,
            // clearContacts
          }}
        >{props.children}
        </ContactContext.Provider>
      );

}

export default ContactState;