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
          telefono=document.querySelector('#tel').value;
    if(nombre===''){
        console.log('nombre vacio');
    }
    if(empresa===''){
        console.log('empresa vacia');
    }
    if(telefono===''){
        console.log('telefono vacio');
    }

}
