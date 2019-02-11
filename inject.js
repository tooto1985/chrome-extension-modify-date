chrome.runtime.onMessage.addListener(request => {
  if (request.action === 'save') {
    localStorage.saveDate = request.data
  }
  if (request.action === 'open' && localStorage.saveDate) {
    chrome.runtime.sendMessage({type: 'load', options: { data: localStorage.saveDate }})
  }
})

if (localStorage.saveDate) {
  var code = `(function() {
  var _Date = Date
  window.Date = function() {
    return new _Date('${localStorage.saveDate}')
  }
  window.Date.now = _Date.now
})()`
  var elt = document.createElement('script')
  elt.innerHTML = code
  document.head.appendChild(elt)
}
