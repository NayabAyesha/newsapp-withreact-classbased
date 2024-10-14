import React, { Component } from 'react'
import loading from './Loading.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div>

        <img src={loading} alt="loading"  />
      </div>
    )
  }
}
