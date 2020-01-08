import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from './words';
import img0 from "./img/0.jpg";
import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";
import img6 from "./img/6.jpg";

export default class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  state = { 
    nWrong: 0, 
    guessed: new Set(), 
    answer: randomWord() 
  };

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord = () =>{
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess = evt => {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr.toString()}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)} >
        {ltr}
      </button>
    ));
  }

  restart = () => {
    this.setState({
      nWrong: 0, 
      guessed: new Set(), 
      answer: randomWord()
    })
  }

  render() {
    const gameOver = this.state.nWrong === this.props.maxWrong;
    const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
    const gameWon = this.guessedWord().join("") === this.state.answer;
    const renderButtons = !gameWon && !gameOver;

    return (  
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altText} />
        <p>Number of incorrect guesses: {this.state.nWrong}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        {renderButtons && <p className='Hangman-btns'>{this.generateButtons()}</p>}
        {gameWon && <p>Winner winner chicken dinner!!!!</p>}
        {gameOver && <p>{`You lose, answer is... ${this.state.answer}`}</p>}
        <div>
          <button id="restart" onClick={this.restart}>Restart ?</button>
        </div>  
      </div>
    );
  }
}