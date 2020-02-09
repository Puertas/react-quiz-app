import React, { Component } from 'react';

import classes from './Quiz.module.css';
import Question from '../../components/Question/Question';
import Choice from '../../components/Choice/Choice';
import Modal from '../../components/UI/Modal/Modal';
import ResultsReport from '../../components/ResultsReport/ResultReport';
import Utils from '../../Utils/Utils';


class Quiz extends Component {
  constructor() {
    super();
    this.state = Utils.getInitialState();
  }

  renderQuestions() {
    return Object.keys(this.state.questions).map(
      question => (
        <React.Fragment key={question}>
          <Question
            key={question}
            text={this.state.questions[question].text}
            validated={this.state.validated}
            correctResponse={this.state.questions[question].correctResponse}
            answer={this.state.questions[question].response}/>
          {Object.keys(this.state.questions[question].choices).map(
            choice =>
              <Choice
                key={choice}
                id={choice}
                text={this.state.questions[question].choices[choice]}
                inline={this.state.choiceAlignment === 'horizontal'}
                disabled={this.state.validated}
                response={this.state.questions[question].response}
                onAnswerQuestion={() => this.answerQuestionHandler(question, choice)} />
          )}
        </React.Fragment>
      )
    );
  }

  answerQuestionHandler(question, choice) {
    const newQuestions = {
      ...this.state.questions
    };
    const newQuestion = {
      ...newQuestions[question]
    };
    const valid = true;

    newQuestion.response = choice;
    newQuestions[question] = newQuestion;

    this.setState({questions: newQuestions, valid});
  }

  validateAnswers = () => {
    const validated = true;
    const valid = false;
    const showResults = true;
    const questions = Object.keys(this.state.questions);
    const correctAnswers = questions.reduce(
      (acc, question) => this.state.questions[question].response === this.state.questions[question].correctResponse ? acc + 1 : acc
    , 0);
    const score = (correctAnswers / questions.length).toFixed(2) * 100;

    this.setState({
      valid,
      validated,
      showResults,
      score
    });
  }

  closeResultHandler = () => {
    const showResults = false;

    this.setState({showResults});
  }

  restartHandler = () => {
    const initialState = Utils.getInitialState();

    this.setState(initialState);
  }

  render() {
    return (
      <>
        <div className={classes.Quiz}>
          <header>
            <h4>{this.state.title}</h4>
            <span className={classes.Subtitle}>{this.state.subtitle}</span>
          </header>
          <div>
            {this.renderQuestions()}
          </div>
          <div className={classes.ButtonsContainer}>
            <button
              className="btn btn--danger"
              disabled={!this.state.validated}
              onClick={this.restartHandler}>
                Try Again
            </button>
            <button
              className="btn"
              disabled={!this.state.valid}
              onClick={this.validateAnswers}>
                Check Answers
            </button>
          </div>
        </div>

        <Modal show={this.state.showResults} modalClosed={this.closeResultHandler}>
          <ResultsReport score={this.state.score} closeHandler={this.closeResultHandler}/>
        </Modal>
      </>
    );
  }
}


export default Quiz;
