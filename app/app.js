var data = {
      totalQuestions: 0,
      currentQuestion: 1,
      correctAnswers: 0
}

var Choice = {
  click: function(n){
    return function(){
      data.selected = n
    }
  },
  classes: function(n){
    if (data.selected === n){
      return 'active'
    } else {
      return ''
    }
  },
  view: function(vnode){
    var n = vnode.attrs.index
    return m('.choice',{ class: Choice.classes(n), onclick: Choice.click(n) },
      m('span.l'),
      m('span.v',data.choices[n])
    )
  }
}

var Popup = {
      visible: false,
      message: '',
      isCorrect: false,
      show: function(message, isCorrect) {
        Popup.message = message;
        Popup.isCorrect = isCorrect;
        Popup.visible = true;
        m.redraw(); // Trigger UI update
        setTimeout(function() {
          Popup.visible = false;
          App.fetchQuestion(); // Fetch the next question
          m.redraw(); // Trigger UI update
        }, 1000); // Hide after 3 seconds
      },
      view: function() {
        if (!Popup.visible) return null;
        return m('.popup', { class: Popup.isCorrect ? 'correct' : 'wrong' },
          m('p', Popup.message)
        );
      }
    };

var App = {
  oninit: function() {
        m.request({
                method: "GET",
                url: "/initiate",
            })
            .then(function(response) {
                if (response.totalQuestions && !isNaN(response.totalQuestions)) {
                    data.totalQuestions = response.totalQuestions;
                    console.log('Total questions count:', response.totalQuestions);
                } else {
                    console.error('Invalid totalQuestions value in response:', response.totalQuestions);
                    data.totalQuestions = 0; // Default to 0 if invalid
                }
                App.fetchQuestion();
            })
            .catch(function(error) {
                  console.error('Error fetching questions count:', error);
            });
    },
  fetchQuestion: function() {
    m.request({
        method: "GET",
        url: `/question?questionId=${data.currentQuestion}`,
    })
    .then(function(response) {
      data.title = response.title;
      data.question = response.question;
      data.questionId = response.questionId;
      data.choices = response.choices;
      data.answer = response.answer;
      m.redraw(); // Trigger UI update
    })
    .catch(function(error) {
      console.error('Error fetching question:', error);
    });
  },
  submit: function() {
    if (data.currentQuestion > data.totalQuestions) {
        Popup.show("Quiz Completed! Total Correct Answers: " + data.correctAnswers, true);
        return;
    }
    if (data.selected === null) {
      Popup.show("Please select an answer!", false);
      return;
    }

    // Check if the selected answer is correct
    if (data.selected == data.answer) {
      Popup.show("Correct Answer!", true);
      data.correctAnswers++;
    }
    else {
      Popup.show("Wrong Answer!", false);
    }
    data.currentQuestion++;
    if (data.currentQuestion >= data.totalQuestions) {
      Popup.show("Quiz Completed! Total Correct Answers: " + data.correctAnswers, true);
      return;
    }
    m.request({
        method: "POST",
        url: "/recordAnswer",
        body: { questionId: data.questionId, userAnswer : data.selected,
            isCorrect: data.selected == data.answer ? 1 : 0 },
    })
    .then(function(response) {
        data.selected = null;
      setTimeout(App.fetchQuestion, 0); // Fetch next question after 5 seconds
    })
    .catch(function(error) {
      console.error('Error submitting answer:', error);
    });
  },
  view: function() {
    return m('main', [
      m("h1", data.title),
      m('article',
        m('h2', 'Question:'),
        m('.question', data.question),
        m(Choice, { index: 0 }),
        m(Choice, { index: 1 }),
        m(Choice, { index: 2 }),
        m(Choice, { index: 3 }),
        m('.submit',
          m("button", { onclick: App.submit }, 'Submit')
        ),
        m('.counter', `Question ${data.currentQuestion} of ${data.totalQuestions}`)
      ),
      m(Popup)
    ]);
  }
};

m.mount(document.body, App);
