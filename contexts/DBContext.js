import React from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { firebaseConfig } from '../Config';

initializeApp(firebaseConfig);
const db = getFirestore();

const initialDBState = { db: getFirestore() };

const dbContextWrapper = (component) => (initialDBState);

export const DBContext = React.createContext(dbContextWrapper());

export class DBContextProvider extends React.Component {
    state = {
        context: dbContextWrapper(this),
    };

    render() {
        return ( 
        <DBContext.Provider value={ this.state.context }>
          { this.props.children }
          </DBContext.Provider>
        );
    }
}