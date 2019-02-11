document.addEventListener('DOMContentLoaded', function () {
  var input = document.querySelector('input')
  input.addEventListener('input', function () {
    chrome.tabs.getSelected(null, tab => {
      chrome.tabs.sendMessage(tab.id, { action: 'save', data: this.value })
    })
  }, false)
  chrome.tabs.getSelected(null, tab => {
    chrome.tabs.sendMessage(tab.id, { action: 'open', data: this.value })
  })
  chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'load') {
      input.value = request.options.data
    }
  })
}, false)