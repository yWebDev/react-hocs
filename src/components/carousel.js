import React, { Component } from 'react';

import Card from './card';
import createApiCall from './../hocs/createApiCall';
import words from './../services/words';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };
  }

  componentDidMount() {
    this.props.loadWords();
  }

  next() {
    const max = this.props.words.length;
    const { activeIndex } = this.state;

    if (activeIndex < max - 1) {
      this.setState({
        activeIndex: activeIndex + 1
      });
    }
  }

  prev() {
    const { activeIndex } = this.state;

    if (activeIndex > 0) {
      this.setState({
        activeIndex: activeIndex - 1
      });
    }
  }

  isActive(index) {
    return index === this.state.activeIndex;
  }

  render() {
    return (
      <div className="carousel">
        <button className="arrow" onClick={this.prev.bind(this)}> &lt; </button>

        <section className="itemsList">
          { this.props.words.map((card, index) => (
            <Card isActive={this.isActive(index)} key={card.id} word={card.word}/>
          )) }
        </section>

        <button className="arrow" onClick={this.next.bind(this)}> &gt; </button>
      </div>
    );
  }
}

const hoc = createApiCall(words, 'loadWords', 'words');

export default hoc(Carousel);