// ----
// Data
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}
  // check if there is stuff in localstorage jokes var
  // override then parse .jason
var myStringJoke = window.localStorage.getItem('jokes')
if (myStringJoke !== null) {
  jokes = JSON.parse(myStringJoke)
}
myStringJoke = JSON.stringify(jokes)
window.localStorage.setItem('jokes', myStringJoke)

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  jokeBox.textContent = requestedJokeKey

  if (jokes[requestedJokeKey] !== undefined) {
    jokeBox.innerHTML = '<p>' + jokes[requestedJokeKey].setup + '</p>' + '<p>' + jokes[requestedJokeKey].punchline + '</p>'
  } else {
    jokeBox.innerHTML = '<p>' + noJokesMessage + '</p>'
  }
}
var jokesRememberButton = document.getElementById('remember')
var rememberJoke = function () {
  // add a joke to jokes object
  // if joke key is already there overwrite the joke
  // if not there add a new one to the jokes object
  var aboutJoke = document.getElementById('about')
  var setupJoke = document.getElementById('setupis')
  var punchJoke = document.getElementById('punchis')

  jokes[aboutJoke.value] = {
    setup: setupJoke.value,
    punchline: punchJoke.value
  }
  myStringJoke = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', myStringJoke)
  aboutJoke.value = ''
  setupJoke.value = ''
  punchJoke.value = ''
  updatePage()
}
jokesRememberButton.addEventListener('click', rememberJoke)

var jokesDelButton = document.getElementById('deljoke')

var forgetJoke = function () {
  // delete a joke
  var deleteJoke = document.getElementById('delthis')
  delete jokes[deleteJoke.value]
  deleteJoke.value = ''
  myStringJoke = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', myStringJoke)
  updatePage()
}
jokesDelButton.addEventListener('click', forgetJoke)

window.localStorage.setItem('myjokes', jokes)
// window.localStorage.setItem('', nightTheme)

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
