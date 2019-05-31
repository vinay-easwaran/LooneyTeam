const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const db = require('./queries')

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
	next();
});

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
app.put('/teachers/:query', db.updateTeacher)
app.delete('/teachers/:query', db.deleteTeacher)
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
app.post('/program_template', db.createProgramTemplate)
app.get('/program_template', db.getProgramTemplate)
app.put('/program_template/:program_template_id', db.updateProgramTemplate)
app.get('/program_template/:query', db.getProgramTemplateByParam)
app.delete('/program_template/:query', db.deleteProgramTemplate)
app.put('/class_template/:query', db.updateClassTemplate)
app.delete('/class_template/:query', db.deleteClassTemplate)
app.get('/teacher_unavailability', db.getAllUnavailability)
app.get('/teacher_unavailability/:query', db.getUnavailability)
app.post('/teacher_unavailability', db.createUnavailability)
app.put('/teacher_unavailability/:query', db.updateUnavailability)
app.delete('/teacher_unavailability/:query', db.deleteUnavailability)
app.get('/region', db.getAllRegions)
app.get('/region/:query', db.getRegionByParam)
app.post('/region', db.createRegion)
app.put('/region/:query', db.updateRegion)
app.delete('/region/:query', db.deleteRegion)
app.get('/liveprogram', db.getAllLivePrograms)
app.get('/liveprogram/:query', db.getLiveProgramByParameter)
app.post('/liveprogram', db.createLiveProgram)
app.put('/liveprogram/:query', db.updateLiveProgram)
app.delete('/liveprogram/:query', db.deleteLiveProgram)

app.listen(port, () => {
	console.log('App running on port ${port}.')
})
