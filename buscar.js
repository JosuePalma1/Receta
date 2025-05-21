const recetas = [
    {
        titulo: "Pollo al horno",
        ingredientes: "pollo, papas, ajo, sal",
        imagen: "https://polloseldorado.co/wp-content/uploads/2023/08/1.jpg",
        descripcion: "Jugoso pollo al horno con piel crujiente y dorada, sazonado con hierbas aromáticas y un toque de ajo. Una receta clásica, fácil de preparar, perfecta para una comida familiar o una cena especial. ¡Sabor casero que nunca falla!",
    },
    {
        titulo: "Ensalada César",
        ingredientes: "lechuga, pollo, queso parmesano, crutones",
        imagen: "https://www.culinariamente.com/wp-content/uploads/2024/10/Receta-de-ensalada-Cesar-con-pollo.jpg",
        descripcion: "Ensalada César clásica con lechuga fresca, pollo a la parrilla, crutones crujientes y aderezo César cremoso. Ideal como plato principal o acompañamiento. ¡Una opción saludable y deliciosa!",
    },
    {
        titulo: "Espaguetis a la carbonara",
        ingredientes: "espaguetis, huevo, queso, panceta",
        imagen: "https://imag.bonviveur.com/espaguetis-a-la-carbonara-con-nata.jpg",
        descripcion: "Espaguetis a la carbonara, un plato italiano clásico que combina pasta al dente con una salsa cremosa de huevo, queso parmesano y panceta crujiente. Rápido y fácil de preparar, perfecto para una cena deliciosa en casa.",
    },
]

function buscarReceta() {
    const busqueda = document.getElementById("escribir-busqueda").value.toLowerCase();
    const resultados = recetas.filter(receta => {
        return receta.titulo.toLowerCase().includes(busqueda) ||
               receta.ingredientes.toLowerCase().includes(busqueda);
    });

    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";

    if (resultados.length > 0) {
        resultados.forEach(receta => {
            const recetaDiv = document.createElement("div");
            recetaDiv.classList.add("receta");

            recetaDiv.innerHTML = `
                <h3>${receta.titulo}</h3>
                <img src="${receta.imagen}" alt="${receta.titulo}">
                <p><strong>Ingredientes:</strong> ${receta.ingredientes}</p>
                <p>${receta.descripcion}</p>
            `;

            resultadosDiv.appendChild(recetaDiv);
        });
    } else {
        resultadosDiv.innerHTML = "<p>No se encontraron recetas.</p>";
    }
}
