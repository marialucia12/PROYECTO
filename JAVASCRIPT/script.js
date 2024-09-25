//login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtener el valor de los campos de usuario y contraseña
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    console.log(usernameInput, passwordInput)
    // Leer el archivo JSON con los usuarios usando fetch
    fetch('usuarios.json')
        .then(response => response.json())
        .then(data => {
            const users = data.users; // Aquí están los usuarios del archivo JSON

            // Comprobar si existe un usuario que coincida con el usuario y contraseña ingresados
            const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

            if (user) {
                // Redirigir según el rol del usuario
                if (user.role === 'admin') {
                    window.location.href = 'vistaAdmin.html';
                } else if (user.role === 'asesor') {
                    window.location.href = 'asesor.html';
                } else if (user.role === 'doctor') {
                    window.location.href = 'doctor.html';
                } else {
                    window.location.href = 'cliente.html';
                }
            } else {
                // Mostrar mensaje de error si el login falla
                document.getElementById('login-error').style.display = 'block';
                document.getElementById('password').value=''
            }
        })
        .catch(error => {
            console.error('Error al leer el archivo JSON:', error);
            alert("Error al cargar los usuarios.");
        });
});