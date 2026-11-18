document.addEventListener('DOMContentLoaded', () => {  const form = document.getElementById('formLibro'); 
 // Validación interactiva antes de enviar los datos al servidor  form.addEventListener('submit', (e) => { 
 const titulo = document.getElementById('titulo').value.trim();  const autor = document.getElementById('autor').value.trim();  const isbn = document.getElementById('isbn').value.trim(); 
 if (titulo === "" || autor === "" || isbn === "") { 
 e.preventDefault(); // Detiene el envío del formulario  alert('Por favor, rellena todos los campos antes de guardar.');
 return; 
 } 
 // Validación simple para que el formato ISBN no contenga caracteres extraños  if(isbn.length < 10) { 
 e.preventDefault(); 
 alert('El campo ISBN parece demasiado corto o inválido.');  } 
 }); 
 // Detectar si venimos de un registro exitoso mediante la URL 
 const urlParams = new URLSearchParams(window.location.search);  if (urlParams.get('success') === '1') { 
 // Limpiar el parámetro de la URL estética 
 window.history.replaceState({}, document.title, window.location.pathname);  alert('¡Libro registrado con éxito en el inventario!'); 
 } 
}); 
10. Crear el Readme.md con las instrucciones de creación de archivos base, indicación  de crear la base de datos y la tabla. Agregar el código de los dos primeros registros  en la tabla. 
11. Subir los archivos a github con el comentario “Primera subida de archivos” 
12. Crear el archivo cambiarEstado.php 
<?php 
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['id']) &&  isset($_POST['actual'])) { 
 $host = "pdbXX.awardspace.net"; // Reemplaza por tus datos de AwardSpace  $usuario = "tu_usuario_bd"; 
 $password = "tu_password_bd"; 
 $base_datos = "tu_nombre_bd"; 
 $conexion = new mysqli($host, $usuario, $password, $base_datos); 
 if ($conexion->connect_error) { 
 die("Error de conexión: " . $conexion->connect_error); 
 } 
 $id = intval($_POST['id']); 
 $estado_actual = intval($_POST['actual']); 
  
 // Si estaba disponible (1), ahora será prestado (0). Si estaba prestado (0), será  disponible (1). 
 $nuevo_estado = ($estado_actual === 1) ? 0 : 1;
 $sql = "UPDATE libros SET disponible = $nuevo_estado WHERE id = $id"; 
 if ($conexion->query($sql) === TRUE) { 
 // Redirecciona de vuelta con un parámetro de éxito de actualización  header("Location: index.php?updated=1"); 
 } else { 
 echo "Error al actualizar el estado: " . $conexion->error; 
 } 
 $conexion->close(); 
} else { 
 header("Location: index.php"); 
} 
?> 
