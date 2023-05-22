const formulario = document.getElementById('formulario')
const inputNombre = document.getElementById('nombre')
const inputApellido = document.getElementById('apellido')
const inputEmail = document.getElementById('email')
const titulo = document.getElementById('titulo')
const divProductos = document.getElementById('divProductos')

//Ingreso Datos //

formulario.onsubmit = (e) => {
  e.preventDefault()
  const infoUsuario = {
    nombre: inputNombre.value,
    apellido: inputApellido.value,
    email: inputEmail.value,
  }

  // Storage JSON //

  localStorage.setItem('infoUsuario', JSON.stringify(infoUsuario))
  formulario.remove()
  titulo.innerText = `E S C A B I A 2 ${infoUsuario.nombre} ${infoUsuario.apellido}`
}

// Storage infoUser //

const infoUsuario = localStorage.getItem('infoUsuario')
const infoUsuarioJS = JSON.parse(infoUsuario)
if (infoUsuario) {
  formulario.remove()
  titulo.innerText = `E S C A B I A 2 ${infoUsuarioJS.nombre} ${infoUsuarioJS.apellido}`
}

// Array de los Productos //

class Producto {
  constructor(id, nombre, precio, stock, image) {
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
    this.image = image
  }
}

const productos = [
  new Producto(1, 'Red Label', 3500, 10, './images/redlabel.png'),
  new Producto(2, 'Black Label', 9500, 5, './images/blacklabel.png'),
  new Producto(3, 'Restinga London', 250, 150, './images/restinga.png'),
  new Producto(4, 'Restinga GIN', 890, 30, './images/ginrestinga.png'),

]

// Funcion que recorre el Array del carrito //

productos.forEach((prod) => {
  divProductos.innerHTML += `<div class="card cardProducto">
  <div class="card" style="width: 15rem;"s
  <div class="card-body">
  <img src="${prod.image}" class="card-img-center" alt="...">
    <h5 class="card-title">${prod.nombre}</h5>
    <p class="card-text"> $ ${prod.precio}</p>
    <button id=${prod.id} class="btn btn-dark">Agregar al Carrito</button>
  </div>
</div>`
})

// Guardar productos en el carrito //

const carrito = []

// Funcion para guardar en cada uno de los botones de comprar //

const botonesAgregar = document.querySelectorAll('.btn-dark')
botonesAgregar.forEach((boton) => {
  boton.onclick = () => {
    const producto = productos.find((prod) => prod.id === parseInt(boton.id))

    const prodCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    }

    const indexProd = carrito.findIndex((prod) => prod.id === prodCarrito.id)
    if (indexProd === -1) {
      carrito.push(prodCarrito)
    } else {
      carrito[indexProd].cantidad++
    }
    console.log(carrito)
  }
})

// Boton finalizar compra
const botonFinalizar = document.querySelector('#finalizar')
const thead = document.querySelector('#thead')
const tbody = document.querySelector('#tbody')
const parrafoTotal = document.querySelector('#total')
botonFinalizar.onclick = () => {
  divProductos.remove()
  botonFinalizar.remove()
  prodd.innerText = 'TU CARRITO';

  thead.innerHTML = `<tr class= "table">
  <th scope="col">Producto</th>
  <th scope="col">Cantidad</th>
  <th scope="col">Total</th>
  </tr>`

  let totalCompra = 0
  carrito.forEach(prod => {
    totalCompra += prod.cantidad * prod.precio
    tbody.innerHTML += `
    <tr>
      <td>${prod.nombre}</td>
      <td>${prod.cantidad}</td>
      <td> $ ${prod.cantidad * prod.precio}</td>
    </tr>
    `
  })
  parrafoTotal.innerText = `Total de la Compra  $ ${totalCompra}`

  
  // Verificar si el botón "Abrir Tarjeta" ya existe en el DOM
  const botonAbrirTarjeta = document.getElementById('botonAbrirTarjeta');
  if (!botonAbrirTarjeta) {
    // Si no existe, crear el botón "Abrir Tarjeta" y agregarlo al DOM
    const botonAbrirTarjeta = document.createElement('button');
    botonAbrirTarjeta.textContent = 'PAGAR';
    botonAbrirTarjeta.className = 'btn btn-dark centerpa';
    botonAbrirTarjeta.id = 'botonAbrirTarjeta';
    botonAbrirTarjeta.onclick = abrirTarjetaFlotante;

    divCarrito.appendChild(botonAbrirTarjeta);
  }
};

// Botón para abrir la tarjeta flotante
function abrirTarjetaFlotante() {
  const tarjetaFlotante = document.createElement('div');
  tarjetaFlotante.className = 'tarjeta-flotante';

  const contenidoTarjeta = document.createElement('div');
  contenidoTarjeta.className = 'tarjeta-contenido';

  const imagenTarjeta = document.createElement('img');
  imagenTarjeta.src = 'https://static.vecteezy.com/system/resources/previews/005/035/758/large_2x/bank-card-icon-editable-of-credit-card-vector.jpg'; // TARJETA IMG
  imagenTarjeta.alt = 'Tarjeta de débito/crédito';

  const inputNombreTitular = document.createElement('input');
  inputNombreTitular.type = 'text';
  inputNombreTitular.placeholder = 'Nombre del titular';

  const inputNumeroTarjeta = document.createElement('input');
  inputNumeroTarjeta.type = 'text';
  inputNumeroTarjeta.placeholder = 'Número de tarjeta';

  const inputVencimientoTarjeta = document.createElement('input');
  inputVencimientoTarjeta.type = 'text';
  inputVencimientoTarjeta.placeholder = 'Fecha de vencimiento';

  const inputCodigoSeguridad = document.createElement('input');
  inputCodigoSeguridad.type = 'text';
  inputCodigoSeguridad.placeholder = 'Código de seguridad';

  const botonCerrar = document.createElement('button');
  botonCerrar.innerText = 'Pagar';
  botonCerrar.onclick = cerrarTarjetaFlotante;

  contenidoTarjeta.appendChild(imagenTarjeta);
  contenidoTarjeta.appendChild(inputNombreTitular);
  contenidoTarjeta.appendChild(inputNumeroTarjeta);
  contenidoTarjeta.appendChild(inputVencimientoTarjeta);
  contenidoTarjeta.appendChild(inputCodigoSeguridad);
  contenidoTarjeta.appendChild(botonCerrar);

  tarjetaFlotante.appendChild(contenidoTarjeta);
  document.body.appendChild(tarjetaFlotante);
}

function cerrarTarjetaFlotante() {
  const tarjetaFlotante = document.querySelector('.tarjeta-flotante');
  tarjetaFlotante.remove();

  // Crear la card mensaje de "Compra exitosa"
  const cardCompraExitosa = document.createElement('div');
  cardCompraExitosa.className = 'card card-exitosa';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const mensajeCompraExitosa = document.createElement('p');
  mensajeCompraExitosa.textContent = 'Compra exitosa';

  const botonCerrar = document.createElement('button');
  botonCerrar.innerText = 'Cerrar';
  botonCerrar.className = 'btn btn-dark';
  botonCerrar.onclick = () => {
    cardCompraExitosa.remove();
    window.location.href = 'index.html';

  divCarrito.appendChild(botonVolver);
  };

  cardBody.appendChild(mensajeCompraExitosa);
  cardBody.appendChild(botonCerrar);
  cardCompraExitosa.appendChild(cardBody);
  document.body.appendChild(cardCompraExitosa);

  // Cerrar la card después de unos segundos
  setTimeout(() => {
    cardCompraExitosa.remove();
  }, 10000);
}

// Agregar el botón al DOM
const divCarrito = document.getElementById('divCarrito');
divCarrito.appendChild(botonAbrirTarjeta);