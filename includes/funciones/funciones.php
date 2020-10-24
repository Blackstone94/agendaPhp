<?php
    function obtenerContactos(){
        include_once 'bd.php';
        try{
        return   $conn->query("SELECT id,nombre,empresa,telefono from CONTACTOS  order by(id)");
        }catch (Exception $e){
            echo 'Error en php '.$e->getMessage();
            return false;
        }

    }

    function obtenerContacto($id){
        include_once 'bd.php';
        try{
        return   $conn->query("SELECT id,nombre,empresa,telefono where id=$id");
        }catch (Exception $e){
            echo 'Error en php '.$e->getMessage();
            return false;
        }

    }
