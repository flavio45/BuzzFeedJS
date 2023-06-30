const questionDisplay = document.querySelector("#questions");
const answerDisplay = document.querySelector("#answer");

const questions = [
  {
    id: 0,
    text: "Pick a food:",
    answer: [
      {
        text: "Pizza",
        image:
          "https://cdn.pixabay.com/photo/2014/07/08/12/34/pizza-386717_1280.jpg",
        alt: "Supreme Pizza",
      },
      {
        text: "Pasta",
        image:
          "https://cdn.pixabay.com/photo/2014/04/22/02/55/pasta-329521_1280.jpg",
        alt: "Spaghetti with bread",
      },
      {
        text: "Nachos",
        image:
          "https://cdn.pixabay.com/photo/2017/11/26/19/40/nachos-2979802_1280.jpg",
        alt: "Nachos with meat",
      },
    ],
  },
  {
    id: 1,
    text: "Pick a vehicle:",
    answer: [
      {
        text: "Van",
        image:
          "https://cdn.pixabay.com/photo/2015/08/21/14/58/volkswagen-899046_1280.jpg",
        alt: "Volkswagen Van",
      },
      {
        text: "Moped",
        image:
          "https://cdn.pixabay.com/photo/2016/07/10/22/31/vespa-1508674_1280.jpg",
        alt: "Green moped next to flower wall",
      },
      {
        text: "Car",
        image:
          "https://cdn.pixabay.com/photo/2020/06/22/19/30/automobile-5330343_1280.jpg",
        alt: "Gray Coupe Porsche",
      },
    ],
  },
  {
    id: 2,
    text: "Pick a sport:",
    answer: [
      {
        text: "Soccer",
        image:
          "https://cdn.pixabay.com/photo/2016/05/16/21/07/football-1396740_1280.jpg",
        alt: "Soccer ball in a field",
      },
      {
        text: "Golf",
        image:
          "https://cdn.pixabay.com/photo/2016/03/27/19/54/golf-1284012_1280.jpg",
        alt: "Golf ball",
      },
      {
        text: "Football",
        image:
          "https://cdn.pixabay.com/photo/2015/01/11/21/23/rugby-596747_1280.jpg",
        alt: "Football",
      },
    ],
  },
];

const answers = [
  {
    combination: ["Pizza", "Van", "Football"],
    text: "Mozzarella",
    image:
      "https://cdn.pixabay.com/photo/2023/04/26/16/20/cheese-7952755_1280.jpg",
    alt: "Mozzarella",
  },
  {
    combination: ["Pizza", "Moped", "Golf"],
    text: "Brie",
    image:
      "https://cdn.pixabay.com/photo/2010/12/16/11/53/brie-de-meux-3497_1280.jpg",
    alt: "Brie",
  },
  {
    combination: ["Pasta", "Moped", "Golf"],
    text: "Parmesan",
    image:
      "https://cdn.pixabay.com/photo/2015/10/23/11/23/food-1002838_1280.jpg",
    alt: "Parmesan",
  },
  {
    combination: ["Nachos", "Van", "Football"],
    text: "Feta",
    image:
      "https://cdn.pixabay.com/photo/2010/12/16/11/54/cabrales-3499_1280.jpg",
    alt: "Feta Cheese",
  },
  {
    combination: ["Nachos", "Car", "Soccer"],
    text: "Cheddar",
    image:
      "https://cdn.pixabay.com/photo/2021/06/30/20/29/cheese-6377659_1280.jpg",
    alt: "Cheddar",
  },
];

const unansweredQuestions = [];
const chosenAnswers = [];

const populateQuestions = () => {
  questions.forEach((question) => {
    const titleBlock = document.createElement("div");
    titleBlock.id = question.id;
    titleBlock.classList.add("title-block");
    const titleHeading = document.createElement("h2");
    titleHeading.textContent = question.text;
    titleBlock.append(titleHeading);
    questionDisplay.append(titleBlock);

    const answersBlock = document.createElement("div");
    answersBlock.id = question.id + "-answers";
    answersBlock.classList.add("answer-options");

    unansweredQuestions.push(question.id);

    question.answer.forEach((answer) => {
      const answerBlock = document.createElement("div");
      answerBlock.classList.add("answer-block");
      answerBlock.addEventListener("click", () =>
        handleClick(question.id, answer.text)
      );

      const answerImage = document.createElement("img");
      answerImage.setAttribute("src", answer.image);
      answerImage.setAttribute("alt", answer.alt);

      const answerTitle = document.createElement("h3");
      answerTitle.textContent = answer.text;
      answerBlock.append(answerImage, answerTitle);
      answersBlock.append(answerBlock);
    });

    questionDisplay.append(answersBlock);
  });
};

populateQuestions();

const handleClick = (questionId, chosenAnswer) => {
  if (unansweredQuestions.includes(questionId)) {
    chosenAnswers.push(chosenAnswer);
    const itemToRemove = unansweredQuestions.indexOf(questionId);

    if (itemToRemove > -1) {
      unansweredQuestions.splice(itemToRemove, 1);
    }
  }

  const lowestQuestionId = Math.min(...unansweredQuestions);
  location.href = "#" + lowestQuestionId;

  if (!unansweredQuestions.length) {
    showAnswer();
  }
};

const showAnswer = () => {
  let result;
  answers.forEach((answer) => {
    if (
      chosenAnswers.includes(answer.combination[0]) &&
      chosenAnswers.includes(answer.combination[1]) &&
      chosenAnswers.includes(answer.combination[2])
    ) {
      result = answer;
    } else {
      result = answers[0];
    }
  });

  const answerBlock = document.createElement("div");
  answerBlock.classList.add("result-block");
  const answerTitle = document.createElement("h3");
  answerTitle.textContent = result.text;
  const answerImage = document.createElement("img");
  answerImage.setAttribute("src", result.image);

  answerBlock.append(answerTitle, answerImage);
  answerDisplay.append(answerBlock);
};
