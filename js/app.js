const formularioContactos = document.querySelector('#contacto');

addEventListener();

function addEventListener(){
    formularioContactos.addEventListener('submit',validarFormulario);
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
        mostrarNotificacion('correcto','ok');
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
            //crear el icono editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas','fa-pen-square');
            //crear el enlace editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar`;

            
        }
    }
    //enviar los datos
    xhr.send(datos);
    
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
