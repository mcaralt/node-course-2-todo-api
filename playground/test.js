const notes = [{
 title: 'My next trip',
 body: 'I would like to go to Spain'
}, {
 title: 'Habbits to work on',
 body: 'Exercise. Eating a bit better.'
}, {
 title: 'Office modification',
 body: 'Get a new seat'
}]
const findNote = function (notes, noteTitle) {
 return notes.find(function (note) {
 return note.title.toLowerCase() === noteTitle.toLowerCase()
 })
}
const note = findNote(notes, 'my next trip')
console.log(note) // Will print the first object from our array above
