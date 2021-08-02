import React from 'react'
import './App.css'
import { BusinessList } from '../BusinessList/BusinessList'
import { SearchBar } from '../SearchBar/SearchBar'
import { Yelp } from '../../util/Yealp'
import { Loading } from '../Loading/Loading'

export class App extends React.Component {
  state = { businesses: [], errorMessage: '', isRequestRun: false }

  handleInvalidRequest = () => {
    this.setState({
      errorMessage: 'Please, fill the location field out and try again'
    })
  }

  searchYelp = ({ term, location, sortBy, radius, onlyOpened }) => {
    if (this.state.isRequestRun) return
    this.setState({
      isRequestRun: true,
      businesses: []
    })

    Yelp.searchBusinesses({ term, location, sortBy, radius, onlyOpened })
      .then(businesses => {
        this.setState({ businesses, errorMessage: '' })
      })
      .catch(error => {
        this.setState({ errorMessage: this.getErrorMessage(error) })
      })
      .finally(() => this.setState({ isRequestRun: false }))
  }

  getErrorMessage({ status, message = 'Something went wrong, please try again' }) {
    switch (status) {
      case 400:
        return 'Please, try to change some of the fields value'
      default:
        return message
    }
  }

  render() {
    const { businesses, errorMessage, isRequestRun } = this.state
    const output = errorMessage ? (
      <p className="error-message">{errorMessage}</p>
    ) : (
      <BusinessList businesses={businesses} />
    )

    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} onInvalid={this.handleInvalidRequest} />
        {isRequestRun ? Loading : output}
      </div>
    )
  }
}
