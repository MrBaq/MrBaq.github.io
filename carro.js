document.addEventListener('DOMContentLoaded', () => {

    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Cerdo asado',
            precio: 13000,
            descripcion: '',
            categoria: 'Asados'
        },
        {
            id: 2,
            nombre: 'Pechuga Asada',
            precio: 15000,
            descripcion: '',
            categoria: 'Asados'
        },
        {
            id: 3,
            nombre: 'Carne Asada',
            precio: 16000,
            descripcion: '',
            categoria: 'Asados'
        },
        {
            id: 4,
            nombre: 'Alitas Winnie',
            precio: 16000,
            descripcion: '',
            categoria: 'Alitas'
        },
        {
            id: 5,
            nombre: 'Alitas Picantes',
            precio: 17000,
            descripcion: '',
            categoria: 'Alitas'
        },
        {
            id: 6,
            nombre: 'Alitas BBQ',
            precio: 18000,
            descripcion: '',
            categoria: 'Alitas'
        },
        {
            id: 7,
            nombre: 'Popcorn Grande Picante ',
            precio: 20000,
            descripcion: '',
            categoria: 'Alitas'
        },
        {
            id: 8,
            nombre: 'Hamburguesa Especial',
            precio: 15000,
            descripcion: 'Pan Artesanal, 200 G De Carne, Cebolla, Lechuga, Tomate, Queso Americano, Tocineta Y Salsa De La Casa',
            categoria: 'Hamburguesas'
        },
        {
            id: 9,
            nombre: 'Hamburguesa Preferida Del Chef  ',
            precio: 18000,
            descripcion: 'Pan Artesanal, 200 G De Carne, Cebolla, Lechuga, Tomate, Queso Costeño Asado A La Parrilla, Tocineta Y Cebolla Caramelizada',
            categoria: 'Hamburguesas'
        },
        {
            id: 10,
            nombre: 'Small Dog ',
            precio: 5000,
            descripcion: '',
            categoria: 'Perros'
        },
        {
            id: 11,
            nombre: 'Big Dog',
            precio: 8000,
            descripcion: '',
            categoria: 'Perros'
        }, {
            id: 12,
            nombre: 'Perro Mixto',
            precio: 13000,
            descripcion: 'Carne Y Pollo',
            categoria: 'Perros'
        },
        {
            id: 13,
            nombre: 'Perro Mandamas',
            precio: 15000,
            descripcion: '',
            categoria: 'Perros'
        },

        {
            id: 14,
            nombre: 'Salchipapa Sencilla',
            precio: 10000,
            descripcion: '',
            categoria: 'Salchipapas'
        },
        {
            id: 15,
            nombre: 'Salchi Pollo',
            precio: 16000,
            descripcion: '',
            categoria: 'Salchipapas'
        },
        {
            id: 16,
            nombre: 'Salchipapa Pollo Y Carne',
            precio: 19000,
            descripcion: '',
            categoria: 'Salchipapas'
        },
        {
            id: 17,
            nombre: 'Salchi Baq 2 Per',
            precio: 25000,
            descripcion: '',
            categoria: 'Salchipapas'
        },
        {
            id: 18,
            nombre: 'Salchi Baq 3 Per',
            precio: 35000,
            descripcion: '',
            categoria: 'Salchipapas'
        },
        {
            id: 19,
            nombre: 'Salchi Baq 4 Per',
            precio: 40000,
            descripcion: '',
            categoria: 'Salchipapas'
        },
        {
            id: 20,
            nombre: 'Salchi Baq 6 Per',
            precio: 66000,
            descripcion: '',
            categoria: 'Salchipapas'
        },
        {
            id: 21,
            nombre: 'Papás Francesas',
            precio: 6000,
            descripcion: '',
            categoria: 'Adicionales'
        },
        {
            id: 22,
            nombre: 'Croqueta De Yuca',
            precio: 5000,
            descripcion: '',
            categoria: 'Adicionales'
        },
        {
            id: 23,
            nombre: 'Gratinado',
            precio: 6000,
            descripcion: '',
            categoria: 'Adicionales'
        },
        {
            id: 24,
            nombre: 'Cebolla Caramelizada',
            precio: 3000,
            descripcion: '',
            categoria: 'Adicionales'
        },
        {
            id: 25,
            nombre: 'Queso Cheddar',
            precio: 5000,
            descripcion: '',
            categoria: 'Adicionales'
        },
    ];

    let carrito = [];
    const divisa = '$';
    //const DOMitems = document.querySelector('#items');
    const DOMitems = document.querySelector('#productos');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    // Crear las pestañas y los contenidos correspondientes
    const categoriasTab = document.querySelector('#categoriasTab');
    const categoriasContent = document.querySelector('#categoriasContent');


    //// hacer pedido y confirmar
    const botonHacerPedido = document.querySelector('#hacer-pedido');
    const botonConfirmarPedido = document.querySelector('#confirmar-pedido');

    // Funciones

    /**Dibuja todos los productos a partir de la base de datos. No confundir con el carrito */
    function renderizarProductos() {
        // Obtener las categorías únicas de la base de datos
        const categorias = [...new Set(baseDeDatos.map((producto) => producto.categoria))];
        categorias.unshift("Todos los platos"); // Agregar "Todos los productos"

        categorias.forEach((categoria, index) => {
            // Crear la pestaña
            const tabId = `tab-${index}`;
            const tabContentId = `tabContent-${index}`;

            const tabItem = document.createElement('li');
            tabItem.classList.add('nav-item');
            tabItem.setAttribute('role', 'presentation');

            const tabLink = document.createElement('button');
            tabLink.classList.add('nav-link');
            tabLink.setAttribute('id', tabId);
            tabLink.setAttribute('data-bs-toggle', 'tab');
            tabLink.setAttribute('data-bs-target', `#${tabContentId}`);
            tabLink.setAttribute('type', 'button');
            tabLink.setAttribute('role', 'tab');
            tabLink.setAttribute('aria-controls', tabContentId);
            tabLink.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            tabLink.textContent = categoria;

            tabItem.appendChild(tabLink);
            categoriasTab.appendChild(tabItem);

            // Crear el contenido de la pestaña
            const tabContent = document.createElement('div');
            tabContent.classList.add('tab-pane', 'fade');
            tabContent.setAttribute('id', tabContentId);
            tabContent.setAttribute('role', 'tabpanel');
            tabContent.setAttribute('aria-labelledby', tabId);

            const tabMainDiv = document.createElement('div');
            tabMainDiv.classList.add('row');


            /*if (index === 0) { // Añadir la clase "show active" si es el primer contenido
                tabContent.classList.add('show', 'active');
            }*/

            let productosCategoria = [];
            if (categoria === "Todos los platos") {
                productosCategoria = baseDeDatos; // Obtener todos los productos
            } else {
                productosCategoria = baseDeDatos.filter((producto) => producto.categoria === categoria);
            }

            productosCategoria.forEach((info) => {
                const miNodo = document.createElement('div');
                miNodo.classList.add('card', 'col-6', 'col-sm-6', 'col-md-6', 'col-lg-6', 'col-xl-4');

                const miNodoCardBody = document.createElement('div');
                miNodoCardBody.classList.add('card-body');

                const miNodoTitle = document.createElement('h2');
                miNodoTitle.classList.add('card-title');
                miNodoTitle.textContent = info.nombre;

                const miNodoDescripcion = document.createElement('p');
                miNodoDescripcion.classList.add('card-text');
                miNodoDescripcion.textContent = info.descripcion;

                const miNodoPrecio = document.createElement('h5');
                miNodoPrecio.classList.add('card-text');
                miNodoPrecio.textContent = `${divisa}${info.precio.toLocaleString()}`;

                const miNodoBoton = document.createElement('button');
                miNodoBoton.classList.add('btn', 'btn-primary');
                miNodoBoton.textContent = '+';
                miNodoBoton.setAttribute('marcador', info.id);
                miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);

                miNodoCardBody.appendChild(miNodoTitle);
                miNodoCardBody.appendChild(miNodoDescripcion);
                miNodoCardBody.appendChild(miNodoPrecio);
                miNodoCardBody.appendChild(miNodoBoton);
                miNodo.appendChild(miNodoCardBody);
                tabMainDiv.appendChild(miNodo);
                tabContent.appendChild(tabMainDiv);

            });


            categoriasContent.appendChild(tabContent);
        });
    }

    /* Evento para añadir un producto al carrito de la compra */
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.innerHTML = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'mx-2');

            //Row para darle formato bootstrap
            const divRowCarro = document.createElement('div');
            divRowCarro.classList.add('row');

            const divColCarroText = document.createElement('div');
            divColCarroText.classList.add('col-10', 'col-sm-10', 'col-md-9', 'col-lg-10', 'col-xl-10');

            const h6Carro = document.createElement('h5');
            h6Carro.innerHTML = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa}${miItem[0].precio.toLocaleString()}`;

            const divColCarroBoton = document.createElement('div');
            divColCarroBoton.classList.add('col-2', 'col-sm-2', 'col-md-3', 'col-lg-2', 'col-xl-2');


            // Agregar evento para borrar el producto del carrito
            const botonBorrar = document.createElement('button');
            botonBorrar.classList.add('btn', 'btn-danger');
            botonBorrar.textContent = 'X';
            botonBorrar.dataset.item = item;
            botonBorrar.addEventListener('click', borrarItemCarrito);

            // Agregar el nodo al carrito
            miNodo.appendChild(divRowCarro);
            divColCarroText.appendChild(h6Carro);
            divRowCarro.appendChild(divColCarroText);
            divColCarroBoton.appendChild(botonBorrar);
            divRowCarro.appendChild(divColCarroBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizar el precio total en el HTML
        DOMtotal.textContent = calcularTotal().toLocaleString();
    }

    /** Evento para borrar un elemento del carrito **/
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }

    /* Calcula el precio total teniendo en cuenta los productos repetidos */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    /* Varia el carrito y vuelve a dibujarlo */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.clear();
    }

    function guardarCarritoEnLocalStorage() {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage() {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }


    const nombreGuardado = localStorage.getItem('nombre');
    const direccionGuardada = localStorage.getItem('direccion');
    const celularGuardado = localStorage.getItem('celular');
    const referenciaGuardada = localStorage.getItem('referencia');
  
    if (nombreGuardado) {
      document.getElementById('nombre').value = nombreGuardado;
    }
    if (direccionGuardada) {
      document.getElementById('direccion').value = direccionGuardada;
    }
    if (celularGuardado) {
      document.getElementById('celular').value = celularGuardado;
    }
    if (referenciaGuardada) {
      document.getElementById('referencia').value = referenciaGuardada;
    }



    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    botonHacerPedido.addEventListener('mousedown', hacerPedido);
    //botonConfirmarPedido.addEventListener('click', confirmarPedido);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();


    ////
    function hacerPedido() {

        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        const celular = document.getElementById('celular').value;
        const referencia = document.getElementById('referencia').value;
        const comentario = document.getElementById('comentario').value;

        if (nombre == '' || direccion == '' || celular == '' || referencia == '') {

            alert("Faltan datos por llenar");

        } else {
       
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('direccion', direccion);
            localStorage.setItem('celular', celular);
            localStorage.setItem('referencia', referencia);

            //Se genera para hacer pedido con formato WA
            const pedido = [];
            let total = 0;
            const cantidadProductos = {};

            carrito.forEach((item) => {
                if (!cantidadProductos[item]) {
                    cantidadProductos[item] = 1;
                } else {
                    cantidadProductos[item]++;
                }
            });

            for (const item in cantidadProductos) {
                if (cantidadProductos.hasOwnProperty(item)) {
                    const cantidad = cantidadProductos[item];
                    const producto = baseDeDatos.find((p) => p.id === parseInt(item));
                    const subtotal = cantidad * producto.precio;
                    total += subtotal;
                    pedido.push(`${cantidad} ${producto.nombre} *$${subtotal.toLocaleString()}*`);
                }
            }


            let pedidoString = pedido.join("%0A") + "%0A%0A*Total%3A*%09%09*$" + total.toLocaleString() + "*%0A%0AEL+SERVICIO+DE+DOMICIO+SE+CANCELA+POR+APARTE";

            pedidoString = pedidoString + "%0A%0ANombre: " + nombre + "%0ADireccion: " + direccion + "%0APunto Referencia: " + referencia + "%0ACelular: " + celular + "%0AComentario: " + comentario;

            let logEnviar = pedidoString.replace(/ /g, "%20");
            logEnviar = logEnviar.replace("#", "No.");

            logEnviar = "https://api.whatsapp.com/send?phone=+573011928151&text=%2APedido%2A+%0A%0A" + logEnviar;


            //Se genera solo para mostrar contenido        
            const impPedido = [];
            let totalP = 0;
            const cantidadProductosP = {};

            carrito.forEach((item) => {
                if (!cantidadProductosP[item]) {
                    cantidadProductosP[item] = 1;
                } else {
                    cantidadProductosP[item]++;
                }
            });

            for (const item in cantidadProductosP) {
                if (cantidadProductos.hasOwnProperty(item)) {
                    const cantidadP = cantidadProductosP[item];
                    const productoP = baseDeDatos.find((p) => p.id === parseInt(item));
                    const subtotalP = cantidadP * productoP.precio;
                    totalP += subtotalP;
                    impPedido.push(`<div class="row"><div class="col-9">${cantidadP} ${productoP.nombre} </div><div class="col-3"> <b>$${subtotalP.toLocaleString()}</b></div></div>`);
                }
            }



            let imp = impPedido.join("");
            //imp = imp + "<br><div class='row'><div class='col-9'><b>Total a pagar: </div><div class='col-3'>$" + totalP.toLocaleString() + "</div></b><br><br><b>EL SERVICIO DE DOMICIO SE CANCELA POR APARTE</b><br><br><br><div class='row'><div class='col-3'><b>Nombre:</b> </div><div class='col-9'>" + nombre + "</div></div><div class='row'><div class='col-3'><b>Direccion: </b> </div><div class='col-9'>" + direccion + "</div></div><div class='row'><div class='col-4'><b>Punto Referencia: </b></div><div class='col-8'>" + referencia + "</div></div><div class='row'><div class='col-3'><b>Celular:</b> </div><div class='col-9'>" + celular + "</div></div><div class='row'><div class='col-4'><b>Comentario:</b> </div><div class='col-8'>" + comentario;

            imp = imp + "<br><div class='row'><div class='col-9'><b>Total a pagar: </div><div class='col-3'>$" + totalP.toLocaleString() + "</div></b><br><br><b>EL SERVICIO DE DOMICIO SE CANCELA POR APARTE</b><br><br><br><p><b>Nombre :&nbsp;</b>" + nombre + "<br><b>Direccion :&nbsp;</b>" + direccion + "<br><b>Punto Referencia :&nbsp;</b>" + referencia + "<br><b>Celular :&nbsp;</b>" + celular + "<br><b>Comentario :&nbsp;</b>" + comentario;

            botonHacerPedido.setAttribute('data-bs-toggle', 'modal');
            botonHacerPedido.setAttribute('data-bs-target', '#exampleModal');


            renderizarModal(logEnviar, imp);
        }
    }


    function renderizarModal(logEnviar, imp) {

        //console.log("modal: \n" + imp);

        const contentPedido = document.querySelector('#contentPedido');
        contentPedido.innerHTML = imp;
        botonConfirmarPedido.setAttribute('target', '_blank');
        botonConfirmarPedido.setAttribute('href', logEnviar);

    }






});