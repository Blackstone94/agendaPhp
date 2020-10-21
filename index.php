<?php
    include 'includes/layout/header.php'; 
?>
<div class="contenedor-barra">
    <h1>Agenda de contactos</h1>
</div>
<div class="bg-amarillo contenedor sombra">
    <legend>Añada un contacto  <span>Todos los campos son obligatorios</span></legend>
    <div class="campo">
        <div class="campo">
            <label for="nombre">Nombre:</label>
            <input type="text" placeholder="Nombre contacto" id="nombre">
        </div>
        <div class="campo">
            <label for="empresa">Empresa:</label>
            <input type="text" placeholder="Nombre Empresa" id="empresa">
        </div>
        <div class="campo">
            <label for="nombre">Telefono:</label>
            <input type="tel" placeholder="Numero de telefono" id="tel">
        </div>
        <div class="campo enviar">
            <input type="submit" value="Añadir">
        </div>
    </div>
</div>
<?php
    include 'includes/layout/footer.php'; 
?>