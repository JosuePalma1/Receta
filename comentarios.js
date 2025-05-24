const recetasDefault = [
    {
        id: 'receta-1',
        titulo: "Pollo al horno",
        ingredientes: "pollo, papas, ajo, sal",
        imagen: "https://polloseldorado.co/wp-content/uploads/2023/08/1.jpg",
        descripcion: "Jugoso pollo al horno con piel crujiente y dorada, sazonado con hierbas aromáticas y un toque de ajo. Una receta clásica, fácil de preparar, perfecta para una comida familiar o una cena especial. ¡Sabor casero que nunca falla!",
    },
    {
        id: 'receta-2',
        titulo: "Ensalada César",
        ingredientes: "lechuga, pollo, queso parmesano, crutones",
        imagen: "https://www.culinariamente.com/wp-content/uploads/2024/10/Receta-de-ensalada-Cesar-con-pollo.jpg",
        descripcion: "Ensalada César clásica con lechuga fresca, pollo a la parrilla, crutones crujientes y aderezo César cremoso. Ideal como plato principal o acompañamiento. ¡Una opción saludable y deliciosa!",
    },
    {
        id: 'receta-3',
        titulo: "Espaguetis a la carbonara",
        ingredientes: "espaguetis, huevo, queso, panceta",
        imagen: "https://imag.bonviveur.com/espaguetis-a-la-carbonara-con-nata.jpg",
        descripcion: "Espaguetis a la carbonara, un plato italiano clásico que combina pasta al dente con una salsa cremosa de huevo, queso parmesano y panceta crujiente. Rápido y fácil de preparar, perfecto para una cena deliciosa en casa.",
    },
];
function obtenerTodasLasRecetas() {
    const recetasPersonalizadas = JSON.parse(localStorage.getItem('recetasPersonalizadas')) || [];
    const recetasPersonalizadasConId = recetasPersonalizadas.map((receta, index) => ({
        ...receta,
        id: receta.id || `receta-personal-${index + 1}`
    }));
    return [...recetasDefault, ...recetasPersonalizadasConId];
}
function obtenerComentarios(recetaId) {
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
    return comentarios[recetaId] || [];
}
function guardarComentario(recetaId, autor, texto) {
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
    if (!comentarios[recetaId]) {
        comentarios[recetaId] = [];
    }
    const nuevoComentario = {
        autor: autor,
        texto: texto,
        fecha: new Date().toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    comentarios[recetaId].push(nuevoComentario);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    return nuevoComentario;
}
function crearRecetaHTML(receta) {
    const comentarios = obtenerComentarios(receta.id);
    return `
        <div class="receta-comentario">
            <div class="receta-header">
                <img src="${receta.imagen}" alt="${receta.titulo}" class="receta-imagen">
                <div class="receta-info">
                    <h3>${receta.titulo}</h3>
                    <p>${receta.descripcion}</p>
                </div>
            </div>
            <div class="comentarios-seccion">
                <h4 class="comentarios-titulo">💬 Comentarios (${comentarios.length})</h4>
                <div class="comentarios-lista" id="comentarios-${receta.id}">
                    ${comentarios.length > 0 ? 
                        comentarios.map(comentario => `
                            <div class="comentario">
                                <div class="comentario-autor">${comentario.autor}</div>
                                <div class="comentario-texto">${comentario.texto}</div>
                                <div class="comentario-fecha">${comentario.fecha}</div>
                            </div>
                        `).join('') : 
                        '<div class="sin-comentarios">No hay comentarios aún. ¡Sé el primero en comentar!</div>'
                    }
                </div>
                <div class="agregar-comentario">
                    <form class="form-comentario" onsubmit="agregarComentario(event, '${receta.id}')">
                        <input type="text" placeholder="Tu nombre" required maxlength="50">
                        <textarea placeholder="Escribe tu comentario..." required maxlength="500"></textarea>
                        <button type="submit" class="btn-comentar">Agregar Comentario</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}
function agregarComentario(event, recetaId) {
    event.preventDefault();
    const form = event.target;
    const autor = form.querySelector('input[type="text"]').value.trim();
    const texto = form.querySelector('textarea').value.trim();
    if (autor && texto) {
        const nuevoComentario = guardarComentario(recetaId, autor, texto);
        const comentariosLista = document.getElementById(`comentarios-${recetaId}`);
        const sinComentarios = comentariosLista.querySelector('.sin-comentarios');   
        if (sinComentarios) {
            sinComentarios.remove();
        }
        const comentarioHTML = `
            <div class="comentario">
                <div class="comentario-autor">${nuevoComentario.autor}</div>
                <div class="comentario-texto">${nuevoComentario.texto}</div>
                <div class="comentario-fecha">${nuevoComentario.fecha}</div>
            </div>
        `;
        comentariosLista.insertAdjacentHTML('beforeend', comentarioHTML);
        const titulo = comentariosLista.parentElement.querySelector('.comentarios-titulo');
        const nuevosComentarios = obtenerComentarios(recetaId);
        titulo.textContent = `💬 Comentarios (${nuevosComentarios.length})`;
        form.reset();
        alert('¡Comentario agregado exitosamente!');
    }
}
window.addEventListener('load', function() {
    const recetas = obtenerTodasLasRecetas();
    const contenedor = document.getElementById('recetas-comentarios');
    
    if (recetas.length > 0) {
        contenedor.innerHTML = recetas.map(receta => crearRecetaHTML(receta)).join('');
    } else {
        contenedor.innerHTML = '<div class="sin-comentarios">No hay recetas disponibles.</div>';
    }
});
