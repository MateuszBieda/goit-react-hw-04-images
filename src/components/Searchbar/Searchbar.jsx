import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInput = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    const { query } = this.state;
    e.preventDefault();
    this.props.onSubmit(query);
    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    const { isLoading } = this.props;
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button} disabled={isLoading}>
            <span className={css.button_label}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            value={this.state.query}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };