const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

const messageDiv = document.querySelector('#message')

update.addEventListener('click', (_) => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Diablo',
      quote: 'I find your lack of faith disturbing',
    }),
  })
    .then((res) => {
      if (res.ok) return res.json()
    })
    .then((response) => {
      window.location.reload(true)
    })
})

deleteButton.addEventListener('click', () => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Diablo',
    }),
  })
    .then((response) => {
      if (response === 'No quote to delete') {
        messageDiv.textContent = 'No Diablo quote to delete!'
      } else {
        window.location.reload(true)
      }
    })
    .catch()
})
