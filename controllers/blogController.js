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

exports.getAlldata = (request, response, next) => {
    mysqlCon.query("select * from 2023_blogs.blogs", (err, result, fields) => {
        if (err){
            response.status(500).json(commonResponse(null, "server error"))
            response.end()
            return
        }
        
        response.status(200).json(commonResponse(result, null))
        response.end() 
        
    })
}


exports.getById = (request, response) => {
    const id = request.params.id
    mysqlCon.query(`SELECT * FROM blogs WHERE id = ?`, id, (err, result, fields) => {
        if (err){
            response.status(500).json(commonResponse(null, "server error"))
            response.end()
            return
        }

        response.status(200).json(commonResponse(result[0], null))
        response.end() 
    })

}

exports.blogCreate = (request, response) => {
    const body = request.body

    mysqlCon.query(`
        insert into 
        2023_blogs.blogs (title, content) values (?, ?)
        `, [body.title, body.content], (err, result, fields) => {
            if (err){
                response.status(500).json(commonResponse(null, "server error"))
                response.end()
                return
            }
    
            response.status(200).json(commonResponse(result[0], null))
            response.end() 
        }
    )
}

let data = []; 

exports.blogUpdate = (req, res) => {
   
    const blogId = req.params.id;
    const { title, content} = req.body;
  
    const sql = 'UPDATE blogs SET title = ?, content = ?  WHERE id = ?';
    const values = [title, content, blogId];
  
    mysqlCon.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating blog:', err);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Blog not found' });
        } else {
          res.json({ id: blogId });
        }
      }
    });
};

exports.blogDelete = (request, response) => {
    const id = request.params.id
    mysqlCon.query("delete from 2023_blogs.blogs where id = ?", id, (err, result, fields) => {
        if (err){
            response.status(500).json(commonResponse(null, "server error"))
            response.end()
            return
        }

        if(result.affectedRows == 0){
            response.status(404).json(commonResponse(null, "data not found"))
            response.end()
            return
        }

        response.status(200).json(commonResponse({
            id: id
        }, null))
        response.end() 
    })
}