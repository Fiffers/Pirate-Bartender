$(document).ready(function() {
    $('.js-ingredients').hide();
    //STATE OBJECT
    var state = {
        questions: [],
        preferences: [],
        questionCounter: 0
    };

    //CONSTRUCTOR FUNCTIONS
    //Constructor function for drinks.
    var drinks = function(flavor) {
        this.flavor = flavor;
    };

    //Constructor function for questions
    var questions = function(question) {
        this.question = question;
    };

    //Constructor function for the pantry. The challenge asked me to make a constructor function
    //for all of the ingredients but didn't mention how I should use it. Left it in there, but I'm
    //not using it at all.
    var pantry = function(pantry) {
        this.pantry = pantry;
    };

    //VARIABLES TO BE USED IN CONSTRUCTOR FUNCTIONS
    //Various variables for the different flavors.
    var strongFlavor = new drinks(['Glug of Rum', 'slug of whisky', 'splash of gin']);
    var saltyFlavor = new drinks(['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']);
    var bitterFlavor = new drinks(['Shake of bitters', 'splash of tonic', 'twist of lemon peel']);
    var sweetFlavor = new drinks(['Sugar cube', 'spoonful of honey', 'splash of cola']);
    var fruityFlavor = new drinks(['Slice of orange', 'dash of cassis', 'cherry on top']);

    //Various variables for the questions.
    var strongQuestion = new questions(['Do ye like yer drinks strong?']);
    var saltyQuestion = new questions(['Do ye like it with a salty tang?']);
    var bitterQuestion = new questions(['Are ye a lubber who likes it bitter?']);
    var sweetQuestion = new questions(['Would ye like a bit of sweetness with yer poison?']);
    var fruityQuestion = new questions(['Are ye one for a fruity finish?']);

    //Variable for all the pantry ingredients.
    var allIngredients = new pantry(['Glug of Rum', 'slug of whisky', 'splash of gin',
        'Olive on a stick', 'salt-dusted rim', 'rasher of bacon',
        'Shake of bitters', 'splash of tonic', 'twist of lemon peel',
        'Sugar cube', 'spoonful of honey', 'splash of cola',
        'Slice of orange', 'dash of cassis', 'cherry on top'
    ]);

    //PROTOTYPES
    //createDrink prototype. When called, it picks a random flavor and constructs it.
    //It then pushes whatever is constructed to the state object for later use.
    drinks.prototype.createDrink = function() {
        var createDrink = "";
        createDrink += this.flavor[Math.floor(Math.random() * this.flavor.length)];
        state.preferences.push(createDrink);
    };

    //EVENT LISTENERS
    //Event listener for the initial start button.
    //Upon clicking the button, it will hide itself, create all of the questions, store them,
    //then call the askQuestions function. Then, it will ++ the questionCounter.
    $('#js-start-button').on('click', function(e) {
        e.preventDefault();
        $('#js-start-button').hide();
        state.questions.push(strongQuestion.question[0],
            saltyQuestion.question[0],
            bitterQuestion.question[0],
            sweetQuestion.question[0],
            fruityQuestion.question[0]);
        askQuestions(state.questionCounter);
        state.questionCounter++;
    });

    //Event listener for the 'Aye' buttons. Checks the question counter to figure out what kind
    //of ingredient to add, then calls the createDrink prototype depending on what the value of
    //questionCounter is. After the last question, it calls the function questionsComplete.
    //It also adds 1 to the questionCounter each time the button is selected.
    $('.js-questions').on('click', ".js-yes-button", function(e) {
        e.preventDefault();
        switch (state.questionCounter) {
            case 1:
                strongFlavor.createDrink();
                askQuestions(state.questionCounter);
                break;
            case 2:
                saltyFlavor.createDrink();
                askQuestions(state.questionCounter);
                break;
            case 3:
                bitterFlavor.createDrink();
                askQuestions(state.questionCounter);
                break;
            case 4:
                sweetFlavor.createDrink();
                askQuestions(state.questionCounter);
                break;
            case 5:
                fruityFlavor.createDrink();
                questionsComplete();
                break;
        }
        state.questionCounter++;
    });

    //Event listener for the 'no' button. A simple if...else statement allows continuation with the questions
    //or end them.
    $('.js-questions').on('click', ".js-no-button", function(e) {
        if (state.questionCounter <= 4) {
            askQuestions(state.questionCounter);
            state.questionCounter++;
        }
        else {
            questionsComplete();
        }
    });

    //FUNCTIONS THAT RENDER STATE
    //Displays the questions as well as the Aye and No buttons. Takes an arg i that is based on the questionCounter
    var askQuestions = function(i) {
        $('.js-questions').html(`${(state.questions[i])}</br>
        <button type="button" class="js-yes-button">Aye</button>
        <button type="button" class="js-no-button">No</button>
        `);
    };

    //This function is called once all the questions are done. It hides the questions and their buttons,
    //then displays all of the ingredients.
    var questionsComplete = function() {
        $('.js-questions').html('<p>Heres your drink:</p>');
        for (var i = 0; i < state.preferences.length; i++) {
            $('.js-ingredients').append(`<li>${(state.preferences[i]).toUpperCase()}</li>`);
        }
        $('.js-ingredients').show();
    };

});
