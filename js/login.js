document.addEventListener('DOMContentLoaded', () => {
    const usuario = document.getElementById('usuario');
    const contraseña = document.getElementById('contraseña');
    const btnlogin = document.getElementById('btnlogin');

    usuario.addEventListener('input', validarUsuario);
    contraseña.addEventListener('input', validarContraseña);

    btnlogin.addEventListener('click', (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            alert('Formulario válido. Iniciando sesión...');
            window.location.href = 'index.html';
        }
    });

    function validarUsuario() {
        const error = document.getElementById('errorusuario');
        if (usuario.value.trim() === '') {
            error.textContent = 'El usuario es obligatorio.';
            usuario.classList.add('invalido');
            usuario.classList.remove('valido');
            return false;
        } else {
            error.textContent = '';
            usuario.classList.remove('invalido');
            usuario.classList.add('valido');
            return true;
        }
    }

    function validarContraseña() {
        const error = document.getElementById('errorContraseña');
        if (contraseña.value.length < 8) {
            error.textContent = 'La contraseña debe tener al menos 8 caracteres.';
            contraseña.classList.add('invalido');
            contraseña.classList.remove('valido');
            return false;
        } else {
            error.textContent = '';
            contraseña.classList.remove('invalido');
            contraseña.classList.add('valido');
            return true;
        }
    }

    function validarFormulario() {
        const usuarioValido = validarUsuario();
        const contraseñaValida = validarContraseña();
        
        return usuarioValido && contraseñaValida;
    }
});