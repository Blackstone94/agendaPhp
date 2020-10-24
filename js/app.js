const formularioContactos = document.querySelector('#contacto');
const listadoContactos = document.querySelector('#listado-contactos tbody');
addEventListener();

function addEventListener(){
    formularioContactos.addEventListener('submit',validarFormulario);
    listadoContactos.addEventListener('click',eliminarContacto);
}
function validarFormulario(e){
    e.preventDefault();
    console.log("presionado..");
    const nombre= document.querySelector('#nombre').value,
          empresa=document.querySelector('#empresa').value,
          telefono=document.querySelector('#tel').value,
          accion=document.querySelector('#accion').value;
    if(nombre==='' || empresa==='' || telefono===''){
        mostrarNotificacion('error','Todos los campos son obligatorios');
    }
    else{
        //paso la validacion, convertir datos a objeto ajax
        const infoContacto= new FormData();
        infoContacto.append('nombre',nombre);
        infoContacto.append('empresa',empresa);
        infoContacto.append('telefono',telefono);
        infoContacto.append('accion',accion);

        if(accion==='crear'){
            //crear un nuevo contacto
            insertarBD(infoContacto);
        }else{
            //editar un contacto

        }
    }
}
/*insertar a la base de datos via ajax */
function insertarBD(datos){
    //llamado a ajax

    //crear el objeto
    const xhr=new XMLHttpRequest();

    //abrir la conexion
    xhr.open('POST','includes/modelos/modelo-contactos.php',true);
    //pasar los datos
    xhr.onload =function (){
        if(this.status==200){
            console.log(xhr.responseText);
            const respuesta=JSON.parse(xhr.responseText);

            const nuevoContacto =document.createElement('tr');
            nuevoContacto.innerHTML = ` 
                <td>${respuesta.datos.nombre}</td> 
                <td>${respuesta.datos.empresa}</td>  
                <td>${respuesta.datos.telefono}</td> `;

            const contenedorAcciones=document.createElement('td');

            //crear el icono editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas','fa-pen-square');
            //crear el enlace editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php=?id=${respuesta.datos.id}`;
            btnEditar.classList.add('btn','btn-editar');
            
            //agregarlo al padre
            contenedorAcciones.appendChild(btnEditar);

            //crear el icono de eliminar
            const iconoEliminar=document.createElement('i');
            iconoEliminar.classList.add('fas','fa-trash-alt');

            //crear el boton eliminar
            const btnEliminar=document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id',respuesta.datos.id);
            btnEliminar.classList.add('btn','btn-borrar');
            
            //se agregar al padre
            contenedorAcciones.appendChild(btnEliminar);
            //agregarlo al tr
            nuevoContacto.appendChild(contenedorAcciones);
            //agregarlo a los contactos
            listadoContactos.appendChild(nuevoContacto);

            //mostrar notificacion
            mostrarNotificacion('correcto','contacto creado correctamente');

            document.querySelector('form').reset();
        }
    }
    //enviar los datos
    xhr.send(datos);
    
}
function eliminarContacto(e){
    if(e.target.parentElement.classList.contains('btn-borrar')){
        const id=e.target.parentElement.getAttribute('data-id');
        const respuesta=confirm('Estas seguro de eliminar?');
        if(respuesta){
            //crear la conexion
            const xhr=new XMLHttpRequest();
            //abrir la conecion
            xhr.open('GET',`includes/modelos/modelo-contactos.php?id=${id}&accion=borrar`,true);

            xhr.onload=function(){
                if(this.status==200){//se ejecuto correctamente
                    const resultado=JSON.parse(xhr.responseText);
                  //  const resultado=xhr.responseText;
                    console.log("js "+resultado);
                    e.target.parentElement.parentElement.parentElement.remove();   
                    mostrarNotificacion('correcto',"Contacto borrado"); 
                }else{
                    mostrarNotificacion('error','Ocurrio un error');
                }
            }
            xhr.send();
        }
        console.log(id);
    }
}
function mostrarNotificacion(clase,mensaje){
    const notificacion=document.createElement('div');
    notificacion.classList.add(clase,'notificacion','sombra');
    notificacion.textContent=mensaje;

    formularioContactos.insertBefore(notificacion,document.querySelector('form legend'));
    setTimeout(()=> {
        notificacion.classList.add('visible');
        setTimeout(()=> {
            notificacion.classList.remove('visible');
            setTimeout(()=>{
                notificacion.remove();
            },500);
        },3000);
    },100);
}
