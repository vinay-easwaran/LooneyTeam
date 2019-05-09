const Pool = require('pg').Pool
const pool = new Pool({
	user: 'chuckjones',
	host: 'cjcc-postgres.cezzxkt6ytsu.us-west-2.rds.amazonaws.com',
	database: 'chuckjones',
	password: 'CenterForCreativity1234',
	port: 5432,
})


const getTeachers = (request, response) => {
	pool.query('SELECT * FROM teachers', (error,results) => {
		if (error) {
		throw error
		}
		response.status(200).json(results.rows)
	})
}

const getTeacherByUsername = (request, response) => {
	//const id = parseInt(request.params.id)
	const username = request.params.username

  pool.query('SELECT * FROM teachers WHERE username = $1', [username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createTeacher = (request, response) => {
	const { username, first_name, last_name, password, email, verified } = request.body
	
	pool.query('INSERT INTO teachers (username, first_name, last_name, password, email, verified) VALUES ($1, $2, $3, $4, $5, $6)', [username, first_name, last_name, password, email, verified], (error, results) => {
		if (error) {
			throw error
		}
		response.status(201).send('Teacher added with ID: ${result.insertId}')
	})
}

const updateTeacher = (request, response) => {
	const teacher_username = request.params.username
	const { username, first_name, last_name, password, email, verified } = request.body
	
	pool.query(
		'UPDATE teachers SET username = $1, first_name = $2, last_name = $3, password = $4, email = $5, verified = $6 WHERE username = $7',
		[username, first_name, last_name, password, email, verified, teacher_username],
		(error, results) => {
			if (error)
			{
				throw error
			}
			response.status(200).send('Teacher modified with ID: ${id}')
		}
		)
}

const deleteTeacher = (request, response) => {
	const username = request.params.username
	
	pool.query('DELETE FROM teachers WHERE username = $1', [username], (error, results) => {
		if (error)
		{
			throw error
		}
		response.status(200).send('Teacher deleted with ID: ${id}')
	})
}

const getClasses = (request, response) => {
	pool.query('SELECT * FROM classes', (error, results) => {
		if (error)
		{
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getClassesById = (request, response) => {
	const id = parseInt(request.params.id)
	
	pool.query('SELECT * FROM classes WHERE class_id = $1', [id], (error, results) => {
		if (error)
		{
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const createClass = (request, response) => {
	const {is_part_of_program, lattitude, longitude, max_students, name, time_end, time_start, description } = request.body
	
	query.pool('INSERT INTO classes (is_part_of_program, lattitude, longitude, max_students, name, time_end, time_start, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
	[is_part_of_program, lattitude, longitude, max_students, name, time_end, time_start],
	(error, results) => {
		if (error)
		{
			throw error
		}
		response.status(201).send('Class added with class_id: ${result.insertId}')
	})
}

const updateClass = (request, response) => {
	const id = parseInt(request.params.id)
	const {is_part_of_program, lattitude, longitude, max_students, name, time_end, time_start, description} = request.body
	
	pool.query(
	'UPDATE classes SET is_part_of_program = $1, lattitude = $2, longitude = $3, max_students = $4, name = $5, time_end = $6, time_start = $7 where class_id = $9',
	[is_part_of_program, lattitude, longitude, max_students, name, time_end, time_start, description, id],
	(error, results) => {
		if (error)
		{
			throw error
		}
		response.status(200).send('Class modified with ID: ${id}')
	})
}

const deleteClass = (request, response) => {
	const id = parseInt(request.params.id)
	
	pool.query('DELETE FROM teachers WHERE class_id = $1', [id], (error, results) => {
		if (error)
		{
			throw error
		}
		response.status(200).send('Class deleted with ID: ${id}')
	})
}

module.exports = {
	getTeachers,
	getTeacherByUsername,
	createTeacher,
	updateTeacher,
	deleteTeacher,
	getClasses,
	getClassesById,
	createClass,
	updateClass,
	deleteClass,
}