<?php
function obtenerContactos(){
    include_once 'bd.php';
    try{
     return   $conn->query("SELECT id,nombre,empresa,telefono from CONTACTOS  order by(id)");
    }catch (Exception $e){
        echo $e->getMessage();
        return false;
    }

}
