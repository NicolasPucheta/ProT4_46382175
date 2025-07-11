import {pool} from "./database.js";

class LibroController{

    /*funcion para traer todos los libros*/
    async getAll(req, res){
        try{
            const [result]= await pool.query('SELECT * FROM Libros');
            res.json(result);
        } catch (error){
            res.status(500).json({ error: "Error al obtener los libros" });
        }
    }

    /*funcion para obtener un libro por ISBN*/
    async getOne(req, res){
        try{
            const {isbn} = res.params;
            const [result] = await pool.query('SELECT * FROM Libros WHERE isbn = ?', [isbn]);
            if (result.length === 0) {
                return res.status(404).json({ error: "Libro no encontrado" });
            }
            res.json(result[0]);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el libro" });
        }

    }

    /*funcion para agregar un libro*/
    async add(req, res){
        try {
            const libro = req.body;

            if (!libro.nombre || !libro.autor || !libro.categoria || !libro.anio_publicacion || !libro.isbn) {
                return res.status(400).json({ error: "Faltan campos requeridos" });
            }

            const [result] = await pool.query(
                `INSERT INTO Libros(nombre, apellido, dni) VALUES (?, ?, ?)`, 
                [libro.nombre, libro.apellido, libro.dni]); 
                res.json({mensaje: "libro agregado con exito", id: result.insertId});
        } catch(error) {
            res.status(500).json({ error: "Error al agregar el libro" });
        }
    }

    /*funcion para eliminar un libro por ISBN*/
    async delete(req, res){
        try {
            const {isbn} = req.params;
            
            const [result] = await pool.query(`DELETE FROM Libros WHERE isbn = (?)`, [isbn]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "No se encontró el libro para eliminar" });
            }

            res.json({"Registros eliminados": result.affectedRows});

        }catch (error) {
            res.status(500).json({ error: "Error al eliminar el libro" });
        }   
    }

    /*funcion para actualizar datos de un libro */
    async update(req, res){
       try {
            const { isbn } = req.params;
            const libro = req.body;

            const [result] = await pool.query(
                `UPDATE Libros SET nombre = ?, autor = ?, categoria = ?, anio_publicacion = ? WHERE isbn = ?`,
                [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, isbn]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Libro no encontrado para actualizar" });
            }

            res.json({ mensaje: "Libro actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el libro" });
        }
    }
}

export const libro = new LibroController();