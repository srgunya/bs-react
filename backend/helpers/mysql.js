const mysql = require('mysql')

const bs = mysql.createConnection({
	host: process.env.my_sql_host,
	user: process.env.my_sql_user,
	database: process.env.my_sql_database,
	password: process.env.my_sql_password,
})

bs.connect(function (err) {
	if (err) {
		return console.error('Ошибка: ' + err.message)
	} else {
		console.log('Подключение к серверу MySQL успешно установлено')
	}
})

module.exports = bs
