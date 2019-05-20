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
app.get('/teachers/:query',db.getTeacherByParameter)
app.post('/teachers', db.createTeacher)
app.put('/teachers/:username', db.updateTeacher)
app.delete('/teachers/:username', db.deleteTeacher)
app.get('/classes', db.getClasses)
app.get('/classes/:id', db.getClassesById)
app.post('/classes', db.createClass)
app.put('/classes/:id', db.updateClass)
app.delete('/classes/:id', db.deleteClass)
app.get('/levels', db.getAllLevels)
app.get('/levels/:name', db.getLevelOrder)
app.get('/class_template', db.getAllClassTemplates)
app.get('/class_template/:query', db.getClassTemplate)
app.post('/class_template', db.createClassTemplate)
app.post('/program_category',db.createProgramCategory)
app.get('/program_category',db.getProgramCategory)
app.get('/program_category/:query', db.getProgramCategorybyParameter)
app.post('/teacher_approval', db.approveTeacher)

app.listen(port, () => {
	console.log('App running on port ${port}.')
})
