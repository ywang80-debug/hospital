let key = "hospitalMemoryState"

function def() {
  return {
    btn1Used: false,
    btn2Used: false,
    btn3Used: false,
    btn1Replaced: false,
    btn2Replaced: false,
    btn3Replaced: false,
    typedText: "",

    endingStarted: false,
    endingStartTime: 0
  }
}
function getState() {
  let s = localStorage.getItem(key)

  if (!s) {
    let d = def()
    localStorage.setItem(key, JSON.stringify(d))
    return d
  }

  
  return JSON.parse(s)
}
function saveState(st) {
  localStorage.setItem(key, JSON.stringify(st));
}



function resetState() {
  let d = def()
  saveState(d)
}