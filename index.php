<?php
    include 'includes/layout/header.php'; 
?>
<div class="contenedor-barra">
    <h1>Agenda de contactos</h1>
</div>
<div class="bg-amarillo contenedor sombra">
    <form action="#" id="contacto">
        <legend>Añada un contacto  <span>Todos los campos son obligatorios</span></legend>
        <div class="campos">
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
        </div>
        <div class="campo enviar">
                <input type="submit" value="Añadir">
            </div>
    </form>
</div>
<div class="bg-blanco contenedor sombra contactos">
    <div class="contactos">
        <h2>Contactos</h2>
        <input type="text" name="" id="buscar" class="buscador" placeholder="Buscar Contacto">
        <p class="total-contactos"> <span>2 </span>Contactos</p>
        <div class="contenedor-tabla">
            <table id="listado-contactos" class="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr>
                        <td>Juan</td>
                        <td>Udemy</td>
                        <td>012356</td>
                        <td>
                            <a class="btn btn-editar" href="#"> 
                                <i class="fas fa-pen-square"></i>
                            </a>
                            <button data-id="1" type="button" class="btn btn-borrar">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Juan</td>
                        <td>Udemy</td>
                        <td>012356</td>
                        <td>
                            <a class="btn btn-editar" href="#"> 
                                <i class="fas fa-pen-square"></i>
                            </a>
                            <button data-id="1" type="button" class="btn btn-borrar">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr> 
                </tbody>
            </table>
        </div>
    </div>
</div>
<?php
    include 'includes/layout/footer.php'; 
?>