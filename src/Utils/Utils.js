import Config from '../assets/data/config.json';


const getOptions = (options) => {
  const optionsObject = {};

  for (const option of options) {
    optionsObject[option.type] = option.value;
  }

  return optionsObject;
};

const getQuestions = (questions, responses) => {
  const questionsObject = {};

  for (const question of questions) {
    questionsObject[question.responseIdentifier] = {
      text: question.question,
      correctResponse: getCorrectResponse(question.responseIdentifier, responses),
      choices: getChoices(question.choices),
      response: null,
    }
  }

  return questionsObject;
};

const getCorrectResponse = (questionId, responses) => {
  const correctResponse = responses.find( (response) => response.identifier === questionId);

  return correctResponse ? correctResponse.correctResponse.value : null;
};

const getChoices = (choices) => {
  const shuffledChoices = shuffleArray([...choices]);
  const choicesObject = {};

  for (const choice of shuffledChoices) {
    choicesObject[choice.identifier] = choice.text ? choice.text : choice['#text']
  }

  return choicesObject;
};

const shuffleArray = (array) => {
  const shuffledArray = [...array];

  for (var i = shuffledArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }

  return shuffledArray;
};

/**
 * Return State Object like:
 *
  state = {
    title: '<questionaryTitle>',
    subtitle: '<questionarySubTitle>',
    questions: {
      '<questionId>': {
        text: '<questionText>',
        choices: {
          '<choiceId>': '<choiceText>,
          [...]
        },
        correctResponse: '<choiceId>',
        response: null,
      },
      [...]
    },
    valid: false,
    validated: false,
    showResults: false,
    score: null,
    questionDisplay: [showAll, showNext],
    choiceAlignment: [vertical, horizontal],
    answeredDisplay: [disabled, enabled, hide],
  };
 *
 *  */

const Utils = {
  getInitialState() {
    const initialConfig = Config;
    const options = getOptions(initialConfig.options);
    const questions = getQuestions(initialConfig.elements, initialConfig.responseDeclaration);

    return {
      title: initialConfig.title,
      subtitle: initialConfig.subtitle,
      questions: questions,
      valid: false,
      validated: false,
      showResults: false,
      score: null,
      ...options
    };
  }
};


export default Utils;
