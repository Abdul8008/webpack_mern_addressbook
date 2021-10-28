import React from 'react';
//cmp
import Home from '../authorised/home';
import CreatePost from '../authorised/createPost';

export const routes = [
    {
      path: "/",
      exact: true,
      main: (props) => <Home {...props}/>
    },
    {
      path: "/create",
      main: (props) => <CreatePost {...props}/>
    }
  ];