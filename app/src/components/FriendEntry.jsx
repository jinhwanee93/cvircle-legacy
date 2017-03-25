import React, { Component } from 'react';
import { Button, Image, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';

const FriendEntry = (props) => (
  <List divided verticalAlign='middle'>
    <List.Item>
      <Image avatar src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' height='100px' />
      <List.Content>
        {props.ffn} {props.fln}
      </List.Content>
    </List.Item>
  </List>
)

export default FriendEntry;