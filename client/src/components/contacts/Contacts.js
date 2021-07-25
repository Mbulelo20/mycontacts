import React, { Fragment, useContext } from 'react';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
// import Spinner from '../layout/Spinner';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;
  return (
    <Fragment>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
};

export default Contacts;