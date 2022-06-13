const socket = io();

const renderMensajes = (msj) => {
    if(msj != null){
        const html = msj.map((elem) => {
            return(`
            <div class="border ms-3 mt-2 mb-2 w-50">
                <h4>Usuario: ${elem.email}</h4>
                <p>mensaje: ${elem.mensaje}</p> 
            </div>`
            )
        }).join(" ");
        document.getElementById('lista-mensajes').innerHTML = html;
    }
    return
}

const renderProducto = (prod) => {
        if(prod != null){
        const html = prod.map((elem) => {
            return(`
                <tr>
                    <td>${elem.title}</td>
                    <td>${elem.price}</td>
                    <td>
                        <img src="${elem.img}"class="w-25 h-25">
                    </td>
                </tr>`
            )
        }).join(" ");
        document.getElementById('newProd').innerHTML = html;
        document.getElementById('noProd').style.display = 'none';
    }
}

const nuevoMensaje = (e)=> {
    const mensaje = {
        email: document.getElementById('mail').value,
        mensaje: document.getElementById('mensaje').value
    };
    socket.emit('mensajeUsuario', mensaje);
    return false;
}

const nuevoProducto = (e)=> {
    const producto = {
        title: document.getElementById('title-prod').value,
        price: document.getElementById('price-prod').value,
        image: document.getElementById('img-prod').value
    };
    socket.emit('nuevoProducto', producto);
    return false;
}



socket.on('mensajes', (msj)=>{ renderMensajes(msj); });

socket.on('productos', (prod)=>{ renderProducto(prod); });
