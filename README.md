# Sistema de Control de Biblioteca

<p>
Sistema web desarrollado para registrar y consultar el inventario de libros mediante una conexión a base de datos MySQL.
</p>

![Sistema de Control de Biblioteca](https://t4.ftcdn.net/jpg/11/43/10/73/360_F_1143107358_ewv5Joj9xa5NKhfLAoUv7ozJYwMFGLh8.jpg)

## Características principales

- Registro de nuevos libros (Título, Autor e ISBN)
- Visualización en tiempo real del inventario ordenado por ID
- Indicador visual de disponibilidad 


**Entre otras funciones...**

## Enlace y Autoría

- **Página en vivo:** http://bibliotecapl01.atwebpages.com/[cite: 3]
- **Autora:** Heydi Yamilet — Programación 502
- **gmail:** yamisauri0noob@gmail.com

## Código de ejemplo (`index.php`)

```php
<?php 

/**
 * Conecta a la base de datos y muestra el formulario y la tabla de libros.
 *
 * @param string $Host Servidor de base de datos.
 * @param string $servidor Dirección del servidor.
 * @param string $Usuario Usuario de la base de datos.
 * @param string $password Contraseña de la base de datos.
 * @param string $Base_datos Nombre de la base de datos.
 */
// Cambia estos datos con los que te proporcione AwardSpace en tu "Database  Manager" 
$host = "fdb1029.awardspace.net"; // Reemplaza XX por el número de tu servidor $usuario = "tu_usuario_bd"; 
$servidor = "fdb1029.awardspace.net";
$usuario = "4794852_smhey";
$password = "6sm7hey0109";
$base_datos = "4794852_smhey";
$conexion = new mysqli($host,$usuario, $password,$base_datos); 

if ($conexion->connect_error) { 
    die("Error de conexión: " . $conexion->connect_error); 
} 

// Obtener los libros existentes 
$resultado =$conexion->query("SELECT * FROM libros ORDER BY id  DESC"); 
?>
<!DOCTYPE html> 
<html lang="es"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Control de Biblioteca</title> 
    <link rel="stylesheet" href="styles.css"> 
</head> 
<body> 
    <header> 
        <h1> Sistema de Control de Biblioteca</h1> 
    </header> 
    <main class="container"> 
        <!-- Formulario para agregar libros --> 
        <section class="card"> 
            <h2>Registrar Nuevo Libro</h2> 
            <form id="formLibro" action="guardar.php" method="POST">  
                <div class="form-group"> 
                    <label for="titulo">Título del Libro:</label> 
                    <input type="text" id="titulo" name="titulo" required>  
                </div> 
                <div class="form-group"> 
                    <label for="autor">Autor:</label> 
                    <input type="text" id="autor" name="autor" required>  
                </div> 
                <div class="form-group"> 
                    <label for="isbn">ISBN:</label> 
                    <input type="text" id="isbn" name="isbn" required>  
                </div> 
                <button type="submit" class="btn">Guardar Libro</button>  
            </form> 
        </section> 
        <!-- Tabla de libros en la Base de Datos --> 
        <section class="card table-container"> 
            <h2>Inventario de Libros</h2> 
            <table id="tablaLibros"> 
                <thead> 
                    <tr> 
                        <th>ID</th> 
                        <th>Título</th> 
                        <th>Autor</th> 
                        <th>ISBN</th> 
                        <th>Estado</th>
                    </tr> 
                </thead> 
                <tbody> 
                    <?php if ($resultado->num_rows > 0): ?> 
                        <?php while($fila =$resultado->fetch_assoc()): ?> 
                            <tr> 
                                <td><?php echo $fila['id']; ?></td> 
                                <td><strong><?php echo htmlspecialchars($fila['titulo']);  ?></strong></td> 
                                <td><?php echo htmlspecialchars($fila['autor']); ?></td>  
                                <td><?php echo htmlspecialchars($fila['isbn']); ?></td>  
                                <td> 
                                    <span class="badge <?php echo $fila['disponible'] ? 'dispo' :  'prestado'; ?>"> 
                                        <?php echo $fila['disponible'] ? 'Disponible' : 'Prestado';  ?> 
                                    </span> 
                                </td> 
                            </tr> 
                        <?php endwhile; ?> 
                    <?php else: ?> 
                        <tr> 
                            <td colspan="5" style="text-align: center;">No hay libros  registrados.</td> 
                        </tr> 
                    <?php endif; ?> 
                </tbody> 
            </table> 
        </section> 
    </main> 
    <script src="script.js"></script> 
</body> 
</html> 
<?php $conexion->close(); ?>
```
