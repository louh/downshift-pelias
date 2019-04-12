import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'

class DownshiftPelias extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    pelias: PropTypes.shape({
      search: PropTypes.shape({
        setSearchTerm: PropTypes.func.isRequired,
        execute: PropTypes.func.isRequired
      }).isRequired,
      autocomplete: PropTypes.object.isRequired
    }).isRequired,
    itemToString: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      results: null,
      pending: false,
      error: false
    }
  }

  handleInputValueChange = (inputValue, stateAndHelpers) => {
    // Runs `handleInputValueChange` if provided by parent
    if (typeof this.props.handleInputValueChange === 'function') {
      this.props.handleInputValueChange(inputValue, stateAndHelpers)
    }

    this.doAutocomplete(inputValue)
  }

  doAutocomplete = (inputValue) => {
    if (!inputValue) {
      this.setState({
        results: null
      })
      return
    }

    this.setState({
      pending: true
    })

    this.props.pelias.autocomplete
      .setSearchTerm(inputValue)
      .execute()
      .then((response) => {
        this.setState({
          pending: false,
          results: response
        })
      })
      .catch((error) => {
         console.log(error)
         this.setState({
            pending: false,
            error: true
         })
      })
  }

  doSearch = (inputValue) => {
    if (!inputValue) {
      this.setState({
        results: null
      })
      return
    }

    this.setState({
      pending: true
    })

    this.props.pelias.search
      .setSearchTerm(inputValue)
      .execute()
      .then((response) => {
        this.setState({
          pending: false,
          results: response
        })
      })
      .catch((error) => {
         console.log(error)
         this.setState({
            pending: false,
            error: true
         })
      })
  }

  defaultItemToString = item => (item ? item.properties.label : '')

  render () {
    return (
      <Downshift
        onChange={this.handleChange}
        onInputValueChange={this.handleInputValueChange}
        itemToString={this.props.itemToString || this.defaultItemToString}
        {...this.props}
      >
        {/* Calls the `children` function and adds / manipulates properties of our own */}
        {({
          getInputProps,
          highlightedIndex,
          inputValue,
          ...args
        }) => this.props.children({
          ...args,
          // Put back the stuff we destructured
          highlightedIndex,
          inputValue,
          // Modify the `onKeyDown` prop of input props so that it handles the "Enter"
          // key being pressed, by default.
          getInputProps: (args) => getInputProps({
            ...args,
            onKeyDown: (event) => {
              // Run `onKeyDown` from parent <input> element, if provided
              if (typeof args.onKeyDown === 'function') {
                args.onKeyDown(event)
              }

              // If `enter` key is pressed and nothing in the menu is highlighted,
              // then perform a search by calling `doSearch`. This retrieves
              // results Pelias's search query endpoint.
              if (event.key === 'Enter' && highlightedIndex === null) {
                // Bail if default Downshift behavior is prevented
                if (event.nativeEvent.preventDownshiftDefault === true) {
                  return
                }

                this.doSearch(inputValue)
              }
            }
          }),
          doSearch: () => {
            this.doSearch(inputValue)
          },
          results: this.state.results,
          pending: this.state.pending,
          error: this.state.error
        })}
      </Downshift>
    )
  }
}

export default DownshiftPelias
