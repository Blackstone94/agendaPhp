const formularioContactos = document.querySelector('#contacto');
const listadoContactos = document.querySelector('#listado-contactos tbody');
const inputBuscar = document.querySelector('#buscar');
addEventListener();

function addEventListener(){
    formularioContactos.addEventListener('submit',validarFormulario);
    if(listadoContactos){
        listadoContactos.addEventListener('click',eliminarContacto);
    }
    if(inputBuscar){
        inputBuscar.addEventListener('input',buscarContactos);
    }
    numeroContactos();
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
            const id=document.querySelector('#id').value;
            infoContacto.append('id',id);
            actualizarRegistro(infoContacto);
        }
    }
}
function actualizarRegistro(datos){
    //crear el objeto ajax
    const xhr=new XMLHttpRequest();
    //abrir la conexion
    xhr.open('POST','includes/modelos/modelo-contactos.php',true);

    //leer la respuesta
    //enviar datos
    xhr.onload = function(){
        if(this.status===200){//ejecucion satisfactoria
            console.log(xhr.responseText);
             const respuesta=JSON.parse(xhr.responseText);
             if(respuesta.respuesta==='correcto'){
                 //mostrar notificacion correcta
                 mostrarNotificacion('correcto','Contacto editado correctamente')
             }else{
                 //mostrar notificacion incorrecta
                 mostrarNotificacion('incorrecto','Ocurrio un error');
             }
             setTimeout(() => {
                 window.location.href = 'index.php';
             }, 3000);
        }
    }
    xhr.send(datos);
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
            numeroContactos();
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
                    if(resultado['respuesta']==='correcto'){
                        e.target.parentElement.parentElement.parentElement.remove();   //eliminar del dom
                        mostrarNotificacion('correcto',"Contacto borrado"); 
                        numeroContactos();
                    }else{
                        mostrarNotificacion('error','Ocurrio un error'); 
                    }
                }else{
                    mostrarNotificacion('error','Ocurrio un error');
                }
            }
            xhr.send();
        }
        console.log(id);
    }
}
function buscarContactos(e){
    const expresion =new RegExp(e.target.value,"i");//expresion regular, valor de entrada, ignora mayus
    registros = document.querySelectorAll('tbody tr');

    registros.forEach(registro=>{
        registro.style.display='none';
        if(registro.childNodes[1].textContent.replace(/\s/g," ").search(expresion) != -1 
        || registro.childNodes[3].textContent.replace(/\s/g," ").search(expresion) != -1){
            registro.style.display='table-row';
        }
        numeroContactos();
    });

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
function numeroContactos(){
    const totalContactos=document.querySelectorAll('tbody tr'),
    contenedorNumero =document.querySelector('.total-contactos span');

    let total=0;
    totalContactos.forEach(contacto=>{
        if(contacto.style.display === '' || contacto.style.display==='table-row'){
            total++;
        }
    });
    contenedorNumero.textContent=total;
}
