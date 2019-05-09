const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/teachers',db.getTeachers)
app.get('/teachers/:username',db.getTeacherByUsername)
app.post('/teachers', db.createTeacher)
app.put('/teachers/:username', db.updateTeacher)
app.delete('/teachers/:username', db.deleteTeacher)
app.get('/classes', db.getClasses)
app.get('/classes/:id', db.getClassesById)
app.post('/classes', db.createClass)
app.put('/classes/:id', db.updateClass)
app.delete('/classes/:id', db.deleteClass)

app.listen(port, () => {
	console.log('App running on port ${port}.')
})
