const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        if (password === '001') { // Validar la contraseña
            message.textContent = 'Inicio de sesión exitoso';
            // Redirigir al usuario a index.html
            window.location.href = 'index.html';
        } else {
            message.textContent = 'Error en el inicio de sesión. Verifica tus credenciales.';
        }
    } catch (error) {
        console.error('Error:', error);
        message.textContent = 'Error en el inicio de sesión. Inténtalo de nuevo más tarde.';
    }
});
