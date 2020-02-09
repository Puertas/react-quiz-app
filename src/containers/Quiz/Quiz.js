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
    const questionKeys = Object.keys(this.state.questions);

    return questionKeys.map((question, i) => {
      let questions = null;

      if (this.shouldRenderQuestion(questionKeys, i)) {
        questions = (
          <React.Fragment key={question}>
            <Question
              key={question}
              text={this.state.questions[question].text}
              validated={this.state.validated}
              correctResponse={this.state.questions[question].correctResponse}
              answer={this.state.questions[question].response}
            />
            {this.renderChoices(question, Object.keys(this.state.questions[question].choices))}
          </React.Fragment>
        );
      }

      return questions;
    });
  }

  renderChoices = (question, choices) => {
    return choices.map(choice => {
      return (
        <Choice
          key={choice}
          id={choice}
          text={this.state.questions[question].choices[choice]}
          inline={this.state.choiceAlignment === "horizontal"}
          disabled={this.getChoiceDisabled(this.state.questions[question].response)}
          response={this.state.questions[question].response}
          onAnswerQuestion={() => this.answerQuestionHandler(question, choice) }
        />
      );
    });
  }

  shouldRenderQuestion = (questionKeys, index) => {
    return (
      this.state.questionDisplay === "showAll" ||
      index === 0 ||
      (this.state.questionDisplay === "showNext" &&
        this.state.questions[questionKeys[index - 1]].response)
    )
  }

  getChoiceDisabled = (response) => {
    return this.state.validated || (this.state.answeredDisplay === 'disabled' && response);
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
