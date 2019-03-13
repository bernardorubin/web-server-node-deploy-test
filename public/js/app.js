console.log('Client side javascript file loaded!')
// to make http request from client side javascript
// we'll use popular fetch api -> browser based api
// we can use it in all modern browsers but not accessible
// in nodejs. can't be used on a backend node script

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {
  e.preventDefault()
  const location = search.value
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  fetchData(location)
})

const fetchData = address => {
  fetch('/weather?address=' + address).then(response => {
    response.json().then(data => {
      if (data.error) {
        return (messageOne.textContent = data.error)
      }
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    })
  })
}
