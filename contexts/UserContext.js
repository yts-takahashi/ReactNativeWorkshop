import React from 'react';

const initialUserState = {uid: null};

const userContextWrapper = (component) => ({
  ...initialUserState,
  setUser: (user) => {
    initialUserState.uid = user.uid;
    component?.setState({ context: userContextWrapper(component) });
  },
});

export const UserContext = React.createContext(userContextWrapper());

export class UserContextProvider extends React.Component {
  state = {
    context: userContextWrapper(this),
  };

  render() {
    return (
      <UserContext.Provider value={this.state.context}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
