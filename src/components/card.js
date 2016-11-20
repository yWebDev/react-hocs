import React, { Component } from 'react';

import createApiCall from './../hocs/createApiCall';
import translates from './../services/translates';

class Card extends Component {

  constructor(props) {
    super(props);

    this.state = {
      translation: '',
      className: 'red'
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const word = this.props.word;

    this.props.loadTranslates(word).then(() => {
      const result = this.props.translations.tuc.some(translation => {
        const { phrase: { text = null } = {} } = translation;
        return text === this.state.translation;
      });

      this.setState({
        className: result ? 'green' : 'red'
      });
    });
  }

  onTranslationChange(e) {
    this.setState({
      translation: e.target.value
    });
  }

  render() {
    const { translation, className } = this.state;

    return (
      <section className={`${className} ${this.props.isActive ? '' : 'hidden'}`}>
        <div className="card">
          <h3>{this.props.word}</h3>
          <form onSubmit={this.onSubmit.bind(this)}>
            <input type="text"
                   placeholder="Write translation..."
                   ref="translation"
                   value={translation}
                   onChange={this.onTranslationChange.bind(this)}/>
            <button type="submit">OK</button>
          </form>
        </div>
      </section>
    );
  }
}

const hoc = createApiCall(translates, 'loadTranslates', 'translations');

export default hoc(Card);
