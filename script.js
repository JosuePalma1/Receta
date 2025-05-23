function abrirModal() {
    document.getElementById('modalReceta').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modalReceta').style.display = 'none';
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    var modal = document.getElementById('modalReceta');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


// Manejar el envío del formulario
document.getElementById('formularioReceta').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var nombre = document.getElementById('nombreReceta').value;
    var foto = document.getElementById('fotoReceta').files[0];
    var descripcion = document.getElementById('descripcionReceta').value;
    
    // Crear la nueva receta
    agregarNuevaReceta(nombre, foto, descripcion);
    
    // Mostrar mensaje de éxito
    alert('Receta "' + nombre + '" subida exitosamente!');
    
    // Limpiar formulario y cerrar modal
    this.reset();
    cerrarModal();
});

function agregarNuevaReceta(nombre, archivo, descripcion) {
    // Obtener el contenedor de recetas
    var recetasGrid = document.querySelector('.recetas-grid');
    
    // Crear el elemento article para la nueva receta
    var nuevaReceta = document.createElement('article');
    nuevaReceta.className = 'receta';
    
    // Crear URL para la imagen si se subió un archivo
    var imagenUrl = '';
    if (archivo) {
        // Convertir imagen a base64 para guardarla
        var reader = new FileReader();
        reader.onload = function(e) {
            imagenUrl = e.target.result;
            
            // Crear objeto de receta
            var receta = {
                titulo: nombre,
                ingredientes: "Ingredientes personalizados", // Puedes modificar esto después
                imagen: imagenUrl,
                descripcion: descripcion
            };
            
            // Guardar en localStorage
            guardarRecetaEnStorage(receta);
            
            // Mostrar en la página
            mostrarRecetaEnPagina(nombre, imagenUrl, descripcion);
        };
        reader.readAsDataURL(archivo);
    } else {
        // Imagen por defecto si no se subió ninguna
        imagenUrl = 'https://via.placeholder.com/300x180/b08968/ffffff?text=Sin+Imagen';
        
        // Crear objeto de receta
        var receta = {
            titulo: nombre,
            ingredientes: "Ingredientes personalizados",
            imagen: imagenUrl,
            descripcion: descripcion
        };
        
        // Guardar en localStorage
        guardarRecetaEnStorage(receta);
        
        // Mostrar en la página
        mostrarRecetaEnPagina(nombre, imagenUrl, descripcion);
    }
}

function mostrarRecetaEnPagina(nombre, imagenUrl, descripcion) {
    var recetasGrid = document.querySelector('.recetas-grid');
    var nuevaReceta = document.createElement('article');
    nuevaReceta.className = 'receta';
    
    nuevaReceta.innerHTML = `
        <h3>${nombre}</h3>
        <img src="${imagenUrl}" alt="${nombre}">
        <p>${descripcion}</p>
    `;
    
    recetasGrid.appendChild(nuevaReceta);
}

function guardarRecetaEnStorage(receta) {
    // Obtener recetas existentes del localStorage
    var recetasGuardadas = JSON.parse(localStorage.getItem('recetasPersonalizadas')) || [];
    
    // Agregar la nueva receta
    recetasGuardadas.push(receta);
    
    // Guardar de vuelta en localStorage
    localStorage.setItem('recetasPersonalizadas', JSON.stringify(recetasGuardadas));
}

// Cargar recetas guardadas al cargar la página
window.addEventListener('load', function() {
    var recetasGuardadas = JSON.parse(localStorage.getItem('recetasPersonalizadas')) || [];
    
    recetasGuardadas.forEach(function(receta) {
        mostrarRecetaEnPagina(receta.titulo, receta.imagen, receta.descripcion);
    });
});
