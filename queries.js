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

const getTeacherByParameter = (request, response) => {
	const query = request.params.query
	const bool = (request.params.query == "true")

  pool.query('SELECT * FROM teachers WHERE username = $1 OR first_name = $1 OR last_name = $1 OR email = $1 OR verified = $2', [query, bool], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createTeacher = (request, response) => {
	const { username, first_name, last_name, password, email, verified, address, skills } = request.body
	
	pool.query('INSERT INTO teachers (username, first_name, last_name, password, email, verified, address, skills) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [username, first_name, last_name, password, email, verified, address, skills], (error, results) => {
		if (error) {
			throw error
		}
		response.status(201).send('Teacher added with ID: ${result.insertId}')
	})
}

const updateTeacher = (request, response) => {
	const query = request.params.query
	const bool = (request.params.query == "true")
	const { username, first_name, last_name, password, email, verified } = request.body
	
	pool.query(
		'UPDATE teachers SET username = $1, first_name = $2, last_name = $3, password = $4, email = $5, verified = $6 WHERE username = $7 OR first_name = $7 OR last_name = $7 OR email = $7 OR verified = $8',
		[username, first_name, last_name, password, email, verified, query, bool],
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
	const query = request.params.query
	const bool = (request.params.query == "true")
	
	pool.query('DELETE FROM teachers WHERE username = $1 OR first_name = $1 OR last_name = $1 OR email = $1 OR verified = $2', [query, bool], (error, results) => {
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

const getAllLevels = (request, response) => {
	
	pool.query('SELECT * FROM levels', (error, results) => {
		if (error)
		{
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getLevelOrder = (request, response) => {
	const query = request.params.name
	
	pool.query('SELECT * FROM levels WHERE name = $1', [query], (error, results) => {
		if (error)
		{
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getAllClassTemplates = (request, response) => {
	
	pool.query('SELECT * FROM class_template', (error, results) => {
		if (error)
		{
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getClassTemplate = (request, response) => {
	// have to add skills to the query search - removed because its emptiness raises an error
	const query = request.params.query
	const id = parseInt(request.params.query)
	
	pool.query('SELECT * FROM class_template WHERE class_title = $1 OR class_category = $1 OR class_template_id = $2', [query, id], (error, results) => {
		if (error)
		{
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const createClassTemplate = (request, response) => {
	const { class_title, class_description, class_category } = request.body
	
	pool.query('INSERT INTO class_template (class_title, class_description, class_category) VALUES ($1, $2, $3)', [class_title, class_description, class_category], (error, results) => {
		if (error) {
			throw error
		}
		response.status(201).send('Class Template added with ID: ${result.insertId}')
	})
}

const updateClassTemplate = (request, response) => {
	// have to add skills to the query search - removed because its emptiness raises an error
	const query = request.params.query
	const { class_title, class_description, class_category } = request.body
	const id = parseInt(request.params.query)
	
	pool.query(
		'UPDATE class_template SET class_title = $1, class_description = $2, class_category = $3 WHERE class_title = $4 OR class_category = $4 OR class_template_id = $5',
		[class_title, class_description, class_category, query, id],
		(error, results) => {
			if (error)
			{
				throw error
			}
			response.status(200).send('Teacher modified with ID: ${id}')
		}
		)
}

const deleteClassTemplate = (request, response) => {
	const query = request.params.query
	const id = parseInt(request.params.query)
	
	pool.query('DELETE FROM class_template WHERE class_title = $1 OR class_description = $1 OR class_category = $1 OR class_template_id = $2', [query, id], (error, results) => {
		if (error)
		{
			throw error
		}
		response.status(200).send('Teacher deleted with ID: ${id}')
	})
}

const getAllUnavailability = (request, response) => {
	
	pool.query('SELECT * FROM teacher_unavailability', (error, results) => {
		if (error)
		{
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getUnavailability = (request, response) => {
	const query = request.params.query
	const id = parseInt(request.params.query)
	
	pool.query('SELECT * FROM teacher_unavailability WHERE monday = $1 OR tuesday = $1 OR wednesday = $1 OR thursday = $1 OR friday = $1 OR teacher_id = $2', [query, id], (error, results) => {
		if (error)
		{
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const createUnavailability = (request, response) => {
	const { monday, tuesday, wednesday, thursday, friday } = request.body
	
	pool.query('INSERT INTO teacher_unavailability (monday, tueaday, wednesday, thursday, friday) VALUES ($1, $2, $3, $4, $5)', [monday, tuesday, wednesday, thursday, friday], (error, results) => {
		if (error) {
			throw error
		}
		response.status(201).send('Teacher Unavailability added with ID: ${result.insertId}')
	})
}

const updateUnavailability = (request, response) => {
	const query = request.params.query
	const { monday, tuesday, wednesday, thursday, friday } = request.body
	const id = parseInt(request.params.query)
	
	pool.query(
		'UPDATE teacher_unavailability SET monday = $1, tuesday = $2, wednesday = $3, thursday = $4, friday = $5 WHERE monday = $6 OR tuesday = $6 OR wednesday = $6 OR thursday = $6 OR friday = $6 OR teacher_id = $7',
		[monday, tuesday, wednesday, thursday, friday, query, id],
		(error, results) => {
			if (error)
			{
				throw error
			}
			response.status(200).send('Unavailability modified with ID: ${id}')
		}
		)
}

const deleteUnavailability = (request, response) => {
	const query = request.params.query
	const id = parseInt(request.params.query)
	
	pool.query('DELETE FROM teacher_unavailability WHERE monday = $1 OR tuesday = $1 OR wednesday = $1 OR thursday = $1 OR friday = $1 OR teacher_id = $2', 
	[query, id], (error, results) => {
		if (error)
		{
			throw error
		}
		response.status(200).send('Teacher deleted with ID: ${id}')
	})
}


module.exports = {
	getTeachers,
	getTeacherByParameter,
	createTeacher,
	updateTeacher,
	deleteTeacher,
	getClasses,
	getClassesById,
	createClass,
	updateClass,
	deleteClass,
	getAllLevels,
	getLevelOrder,
	getAllClassTemplates,
	getClassTemplate,
	createClassTemplate,
	updateClassTemplate,
	deleteClassTemplate,
	getAllUnavailability,
	getUnavailability,
	createUnavailability,
	updateUnavailability,
	deleteUnavailability,
}