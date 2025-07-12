import { Router } from "express";
import { libro } from "./controller.js";

export const router = Router()

router.get('/libros', libro.getAll); //traer todo los libros
router.get('/unLibro', libro.getOne); //traer un libro por ISBN
router.post('/agregarLibro', libro.add);//agrgegar un libro 
router.delete('/eliminarLibro', libro.delete);//eliminar un Libro 
router.put('/actualizarLibro', libro.update);//actualkizar un libro
