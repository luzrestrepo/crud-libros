//importamos en modulo de express 
const express = require ('express');

// utilizamos express 
const app = express();
//definimos un puerto 
const port = 3001;


app.use(express.json());



let libros = require('./libros.json');




app.get('/libros', (req,res) =>{
   res.status(200).send(libros)

})

//1. creacion 
app.post('/libros',(req,res)=>{
    const libroNuevo = req.body
    libros.push(libroNuevo)
    console.log('***',libroNuevo)
    res.status(201).send({
        message:'libro creado exitosamente'
    })
})

//2. leer 

app.get('/libros/:id',(req, res)=>{
    const id = req.params.id
    const libro = libros.find(libro=> libro.id == id);
        if(libro){
           res.status(200).send(libro)     
        }else{
            res.status(404).send({
                mensaje:"libro no encontrado"
            })
        }
})


//3.actualizacion de libros 
app.put('/libros/:id', (req, res) => {
    const libro = req.body; 
    const idLibro = libro.id 
    const posicion = libros.findIndex(libro=>
        libro.id === idLibro
    )    
    if (posicion !== -1) {
        libros [posicion] = libro;
       res.status(200).send({
        mensaje: 'libro actualizado'
       })
    } else {
        res.status(404).send({
            mensaje:'libro no encontrado'
        }); 
    }
});

//4.eliminar un libro 
app.delete('/libros/:id', (req, res) => {
    const id = req.params.id; 
    libros = libros.filter(libro=>libro.id != id)
     res.status(200).send(libros)  
});

//encendemos el servidor 
app.listen(port,()=>{
    console.log('servidor corriendo en '+port)
})
