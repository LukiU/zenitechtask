import React, { Component } from 'react';
import FetchPhotos from './Fetch';

class Content extends Component {
  render() {
    return (
      <div className="content">
      	<ul>
      	<FetchPhotos/>
      	</ul>
      </div>
    );
  }
}

export default Content;
