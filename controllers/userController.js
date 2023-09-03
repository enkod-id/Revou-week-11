const mysql = require('mysql');

const mysqlCon = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user:'root',
    password:'',
    database:'2023_blogs',
})

const commonResponse = function(data, error){
    if (error){
        return {
            success : false,
            error : error
        }
    }

    return {
            success: true,
            data : data
    }

}

exports.getAllusers = (request, response, next) => {
    mysqlCon.query("select * from 2023_blogs.users", (err, result, fields) => {
        if (err){
            response.status(500).json(commonResponse(null, "server error"))
            response.end()
            return
        }
        
        response.status(200).json(commonResponse(result, null))
        response.end() 
        
    })
}
