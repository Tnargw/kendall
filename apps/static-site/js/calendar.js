let popup = document.getElementById(`popup`);
let popupDay = document.getElementById(`popupDay`);
let openButton = document.getElementById(`openWindow`);
let openButtonDay = document.getElementById(`openWindowDay`);
let closeButtons = [...document.getElementsByClassName(`close`)];
let closeButtonDay = document.getElementsByClassName(`closeDay`)[0];
let popupCreate = document.getElementById(`popupCreate`)
let createEventButton = document.getElementById(`createEventButton`)
let setDate = document.getElementById(`setDate`)
let setName = document.getElementById(`setName`)
let setDescription = document.getElementById(`setDescription`)
let setStartTime = document.getElementById(`setStartTime`)
let setEndTime = document.getElementById(`setEndTime`)
let setEventButton = document.getElementById(`setEventButton`)
let deleteEventButton = document.getElementById(`deleteEventButton`)
let prevWeekButton = document.getElementById(`prev__week`)
let nextWeekButton = document.getElementById(`next__week`)
let currentWeekDisplay = document.getElementById(`current__week`)

//which column is sunday (day = 0)
const COLUMN_OFFSET = 3
//which row is, or would be, 12am (hour = 0)
const ROW_OFFSET = -4

// Close popup at click on X
closeButtons.forEach(closeButton => closeButton.onclick = function() {
  popup.style.display = `none`;
  popupCreate.style.display = `none`;
})

// Close popup at click outside the popup
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = `none`;
  }
}

// Close popup at click outside the popup
window.onclick = function(event) {
  if (event.target == popupDay) {
    popupDay.style.display = `none`;
  }
}

createEventButton.onclick = function() {
    openEvent()
}

nextWeekButton.addEventListener(`click`, function(){  currentWeek.setDate(currentWeek.getDate() + 7)
                                                      setView()})
prevWeekButton.addEventListener(`click`, function(){  currentWeek.setDate(currentWeek.getDate() - 7)
                                                      setView()})
setEventButton.addEventListener(`click`, setEvent)
//little QoL features lol. not to be confused with actual security around the input! backend must check incoming data
setStartTime.addEventListener(`input`, keepDifference)
setEndTime.addEventListener(`input`, setDifference)


let hourDifference = 1

//functioning as our fake backend, now filled with dummy data
let allEvents = [
  JSON.stringify(new ScheduledEvent(`Example 1`, `Blah blah`, new Date(2025, 2, 22), 9, 0, 11, 0)),
  JSON.stringify(new ScheduledEvent(`Example 2`, `Beep boop`, new Date(2025, 2, 23), 10, 0, 13, 0)),
  JSON.stringify(new ScheduledEvent(`Example 3`, `Foo bar`, new Date(2025, 2, 24), 8, 0, 12, 0)),
  JSON.stringify(new ScheduledEvent(`Example 4`, `Fizz buzz`, new Date(2025, 2, 25), 10, 0, 11, 0)),
  JSON.stringify(new ScheduledEvent(`Example 5`, `Plz let me graduate`, new Date(2025, 2, 30), 15, 0, 16, 0)),
  JSON.stringify(new ScheduledEvent(`Example 6`, `Plz give me job`, new Date(2025, 2, 22), 13, 0, 14, 0)),
  JSON.stringify(new ScheduledEvent(`Example 7`, `Thx`, new Date(2025, 2, 24), 14, 0, 15, 0)),
  JSON.stringify(new ScheduledEvent(`Example 1`, `Blah blah`, new Date(2025, 2, 26), 9, 0, 11, 0)),
  JSON.stringify(new ScheduledEvent(`Example 2`, `Beep boop`, new Date(2025, 2, 27), 10, 0, 13, 0)),
  JSON.stringify(new ScheduledEvent(`Example 3`, `Foo bar`, new Date(2025, 2, 28), 8, 0, 12, 0)),
  JSON.stringify(new ScheduledEvent(`Example 4`, `Fizz buzz`, new Date(2025, 2, 29), 10, 0, 11, 0)),
  JSON.stringify(new ScheduledEvent(`Example 5`, `Plz let me graduate`, new Date(2025, 2, 30), 15, 0, 16, 0)),
  JSON.stringify(new ScheduledEvent(`Example 6`, `Plz give me job`, new Date(2025, 2, 26), 13, 0, 14, 0)),
  JSON.stringify(new ScheduledEvent(`Example 7`, `Thx`, new Date(2025, 2, 28), 14, 0, 15, 0)),
  JSON.stringify(new ScheduledEvent(`Sled Day`, `Mandatory!`, new Date(2025, 2, 29), 8, 0, 9, 0)),
  JSON.stringify(new ScheduledEvent(`Orientation`, `For what? Who knows`, new Date(2025, 2, 30), 10, 0, 14, 0)),
  JSON.stringify(new ScheduledEvent(`Slang Workshop`, `Get the older folks up to date`, new Date(2025, 3, 1), 15, 0, 16, 30)),
  JSON.stringify(new ScheduledEvent(`Spoon + Egg Race`, `Winner gets a Hoverboard`, new Date(2025, 3, 3), 10, 0, 11, 0)),
  JSON.stringify(new ScheduledEvent(`Web Engineering Meeting`, `Learn from spiders`, new Date(2025, 3, 4), 11, 0, 12, 0)),
  JSON.stringify(new ScheduledEvent(`Example 1`, `Blah blah`, new Date(2025, 3, 6), 9, 0, 11, 0)),
  JSON.stringify(new ScheduledEvent(`Example 2`, `Beep boop`, new Date(2025, 3, 7), 10, 0, 13, 0)),
  JSON.stringify(new ScheduledEvent(`Example 3`, `Foo bar`, new Date(2025, 3, 8), 8, 0, 12, 0)),
  JSON.stringify(new ScheduledEvent(`Example 4`, `Fizz buzz`, new Date(2025, 3, 9), 10, 0, 11, 0)),
  JSON.stringify(new ScheduledEvent(`Example 5`, `Plz let me graduate`, new Date(2025, 3, 11), 15, 0, 16, 0)),
  JSON.stringify(new ScheduledEvent(`Example 6`, `Plz give me job`, new Date(2025, 3, 6), 13, 0, 14, 0)),
  JSON.stringify(new ScheduledEvent(`Example 7`, `Thx`, new Date(2025, 3, 8), 14, 0, 15, 0))
]

let events = []
var currentWeek = new Date()

//startHour and endHour are 24 hour time (0-23), startMin and endMin are 0-59
function ScheduledEvent( name=`New Event`, 
                   description=`Event Details`, 
                    date=new Date(),
                    startHour=(date.getHours()+1)%24,
                    startMin=0,
                    endHour=(startHour+1)%24,
                    endMin=0){
        this.name = name
        this.description = description
        this.date = date
        this.startHour = startHour
        this.startMin = startMin
        this.endHour = endHour
        this.endMin = endMin
}

//convert a JSON string received from backend to a ScheduledEvent
function JSONtoEvent(event) {
  parsed = JSON.parse(event)
  newEvent = new ScheduledEvent( parsed[`name`],
                      parsed[`description`],
                      new Date(parsed[`date`]),
                      Number(parsed[`startHour`]),
                      Number(parsed[`startMin`]),
                      Number(parsed[`endHour`]),
                      Number(parsed[`endMin`]))
    return newEvent
}

//sets date and loads events for that week. change currentWeek and then do setView() to move around calendar
function setView() {
  //set date to the sunday of that week
  currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay())
  endDate = new Date(currentWeek)
  endDate.setDate(currentWeek.getDate() + 6)
  currentWeekDisplay.innerHTML = `${currentWeek.getMonth()+1}/${currentWeek.getDate()}-${endDate.getMonth()+1}/${endDate.getDate()}\t${endDate.getFullYear()}`

  loadEvents()
}

//helper function -- had to use it a lot for giving html the right input
function pad(item){
    return String(item).padStart(2, `0`)
}

//called by setView ONLY
function loadEvents() {
    document.querySelectorAll(`.event`).forEach(event => event.parentElement.removeChild(event))
    document.querySelectorAll(`.cell`).forEach(cell => cell.style.display = `flex`)

    //request events for this timeframe
    endDate = new Date(currentWeek)
    endDate.setDate(currentWeek.getDate() + 6)
    events = getEventsRequest(currentWeek, endDate)

    //load events into the grid as div elements
    events.forEach(event => {
        let newEvent = document.createElement(`div`)
        newEvent.className = `event`
        newEvent.innerHTML = `<h4>${event.name}</h4>
                            <p>${event.startHour}:${pad(event.startMin)}-
                            ${event.endHour}:${pad(event.endMin)}</p>`
        newEvent.style.gridColumn = `${event.date.getDay() + COLUMN_OFFSET - 1}/${event.date.getDay() + COLUMN_OFFSET}`
        newEvent.style.gridRow = `${event.startHour + ROW_OFFSET}/${event.endHour + ROW_OFFSET + 1}`

        //puts the event details in the edit/create window, deletes the old event. that way new event replaces old one,
        //and you can just open the event and close without 'set'ting it to delete.
        newEvent.addEventListener(`click`, function(){  openEvent(event)
                                                        deleteEvent(event)
                                                        loadEvents()})

        document.querySelector(`.week__view`).appendChild(newEvent)
        
        //hide the cells at the positions the event is taking

        //cell 0 == day 0 hour 7 ... sunday 7am, the first cell on the calendar
        //find the right `row` ((event.startHour-7) * 7 ), then go `day of week` cells over (+ event.date.getDay()) 
        //for each hour that difference is over 1, move down a row and do it again
        let cells = document.querySelectorAll(`.cell`)
        for (let difference = event.endHour - event.startHour;difference >= 0; difference -= 1) {
          cells[(event.startHour + difference - 7) * 7 + event.date.getDay()].style.display = `none`
        }
      })
        
}

function getEventsRequest_TEST(startDate, endDate) {
  let sendURL = `https://recservices.onrender.com/api/calendar/?start=${startDate}&end=${endDate}`

  // Log the request details
  console.log(`Sending GET HTTP Request to ${sendURL}`);
  let events = []
  fetch(sendURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // Add session/user-id for request context!!!
      }
    })
      .then(response => response.json())
      .then(data => { 
        // NOTE: Response data handled here. Converted to ScheduledEvent objects and returned
        console.log(data);
        data.forEach(raw_event => {
          let event = JSONtoEvent(raw_event)
          events.push(event)
        })
      }
    )
      .catch(error => {
        console.error('Error:', error)

        // TODO: Add error handling, should have an alert or somehow let user know if a network error occured
  });
  return events
}

//this is how we pull events from the backend when we loadEvents()
function getEventsRequest(startDate, endDate) {
  returningEvents = []
  allEvents.forEach(raw_event => {
    let event = JSONtoEvent(raw_event)
    //the 10000 * 10000 is a goofy hack to not miss Sunday events. Has to do with dumb JS date stuff
    if ((startDate.valueOf() <= event.date.valueOf() + 10000 * 10000) && (event.date.valueOf() <= endDate.valueOf())){
    returningEvents.push(event)
  }})
  //test = getEventsRequest_TEST(startDate, endDate)
  //test.forEach(e => console.log(`Successfully retrieved `, e.name))

  return returningEvents
}

function setEvent() {
    popupCreate.style.display = `none`
    const startTime = String(setStartTime.value).split(`:`)
    const endTime = String(setEndTime.value).split(`:`)

    //name, description, date, startHour, startMin, endHour, endMin
    let event = new ScheduledEvent( setName.value,
                                    setDescription.value,
                                    new Date(setDate.value.replace(/-/g, '\/').replace(/T.+/, '')),
                                    Number(startTime[0]),
                                    Number(startTime[1]),
                                    Number(endTime[0]),
                                    Number(endTime[1]))
    
    allEvents.push(JSON.stringify(event))
    //update view, in case our event is for current view. we could make it conditional on that instead
    setView()
}

function deleteEvent(event) {
  //finds the first exactly concurrent event and deletes it from fake BE. if we allow exactly concurrent events, this will need to change!!!
  let deleteIndex = allEvents.findIndex(function(e) { 
    if ((JSONtoEvent(e).startHour == event.startHour) && (JSONtoEvent(e).endHour == event.endHour) && (JSONtoEvent(e).date.toString() == event.date.toString()))
        return true
    else return false
  })
  allEvents.splice(deleteIndex, 1)
}

function openEvent(event = new ScheduledEvent()){
    popupCreate.style.display = `block`

    //padding the numbers allows us to set HTML inputs directly. default event starts at the next hour and ends an hour after that.
    setStartTime.value = `${pad(event.startHour)}:${pad(event.startMin)}`
    setEndTime.value = `${pad(event.endHour)}:${pad(event.endMin)}`
    setDate.value = `${event.date.getFullYear()}-${pad(event.date.getMonth()+1)}-${pad(event.date.getDate())}`
    setName.value = event.name
    setDescription.value = event.description
}

//index 0 == hour, index 1 == minute
function setDifference(){
    const startTime = String(setStartTime.value).split(`:`)
    let endTime = String(setEndTime.value).split(`:`)
    if (Number(endTime[0]) < Number(startTime[0]))
        endTime[0] = startTime[0]
    if ((Number(endTime[0]) == Number(startTime[0])) && (Number(endTime[1]) < Number(startTime[1])))
        endTime[1] = startTime[1]
    setEndTime.value = `${pad(endTime[0])}:${pad(endTime[1])}`
    hourDifference = Number(endTime[0]) - Number(startTime[0])
}

function keepDifference(){
    const startTime = String(setStartTime.value).split(`:`)
    const endTime = String(setEndTime.value).split(`:`)
    setEndTime.value = `${pad((Number(startTime[0])+hourDifference)%24)}:${endTime[1]}`
}

setView()

/*
TODO
how do we want to prevent events outside of range?
how do we want to deal with and display concurrent events?
should we have an "edit" button popup when clicking existing events instead of going straight to editing/deleting?
  >with explicit set/delete buttons only and no "close" x button?
*/