import {pool} from "./database.js";

class LibroController{

    /*funcion para traer todos los libros*/
    async getAll(req, res){
        const [result]= await pool.query('SELECT * FROM Libros');
        res.json(result);
    }
    
    /*funcion para agregar un libro*/
    async add(req, res){
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO Libros(nombre, apellido, dni) VALUES (?, ?, ?)`, 
            [libro.nombre, libro.apellido, libro.dni]); 
            res.json({"Id insertado": result.insertId});
    }

    /*funcion para eliminar un libro*/
    async delete(req, res){
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM Libros WHERE id=(?)`, [libro.id]);
        res.json({"Registros eliminados": result.affectedRows});
    }

    /*funcion para actualizar datos*/
    async update(req, res){
        const libro = req.body;
        const [result] = await pool.query(`UPDATE Libros SET nombre=(?), apellido=(?),
            dni=(?) WHERE id=(?)`, [libro.nombre, libro.apellido, libro.dni , libro.id]); 
        res.json({"Registros Actualizados": result.changedRows});
    
    }
}

export const libro = new LibroController();