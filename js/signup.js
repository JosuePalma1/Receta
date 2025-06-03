document.addEventListener('DOMContentLoaded', () => {
    const nombre = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    const usuario = document.getElementById('usuario');
    const contraseña = document.getElementById('contraseña');
    const confirmar = document.getElementById('confirmar');
    const btnsignup = document.getElementById('btnsignup');

    nombre.addEventListener('input', validarNombre);
    telefono.addEventListener('input', validarTelefono);
    usuario.addEventListener('input', validarUsuario);
    contraseña.addEventListener('input', validarContraseña);
    confirmar.addEventListener('input', validarConfirmar);

    btnsignup.addEventListener('click', (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            alert('¡Registro exitoso! Bienvenido a La Hueca.');
            window.location.href = 'login.html';
        }
    });

    function validarNombre() {
        const error = document.getElementById('errorNombre');
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        
        if (nombre.value.trim() === '') {
            error.textContent = 'El nombre es obligatorio.';
            nombre.classList.add('invalido');
            nombre.classList.remove('valido');
            return false;
        } else if (nombre.value.trim().length < 2) {
            error.textContent = 'El nombre debe tener al menos 2 caracteres.';
            nombre.classList.add('invalido');
            nombre.classList.remove('valido');
            return false;
        } else if (!nombreRegex.test(nombre.value.trim())) {
            error.textContent = 'El nombre solo puede contener letras y espacios.';
            nombre.classList.add('invalido');
            nombre.classList.remove('valido');
            return false;
        } else {
            error.textContent = '';
            nombre.classList.remove('invalido');
            nombre.classList.add('valido');
            return true;
        }
    }

    function validarTelefono() {
        const error = document.getElementById('errorTelefono');
        const telefonoRegex = /^[0-9]{10}$/;
        
        if (telefono.value.trim() === '') {
            error.textContent = 'El teléfono es obligatorio.';
            telefono.classList.add('invalido');
            telefono.classList.remove('valido');
            return false;
        } else if (!telefonoRegex.test(telefono.value.replace(/\s+/g, ''))) {
            error.textContent = 'El teléfono debe tener 10 dígitos.';
            telefono.classList.add('invalido');
            telefono.classList.remove('valido');
            return false;
        } else {
            error.textContent = '';
            telefono.classList.remove('invalido');
            telefono.classList.add('valido');
            return true;
        }
    }

    function validarUsuario() {
        const error = document.getElementById('errorUsuario');
        const usuarioRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
        
        if (usuario.value.trim() === '') {
            error.textContent = 'El usuario es obligatorio.';
            usuario.classList.add('invalido');
            usuario.classList.remove('valido');
            return false;
        } else if (usuario.value.trim().length < 3) {
            error.textContent = 'El usuario debe tener al menos 3 caracteres.';
            usuario.classList.add('invalido');
            usuario.classList.remove('valido');
            return false;
        } else if (!usuarioRegex.test(usuario.value.trim())) {
            error.textContent = 'El usuario solo puede contener letras.';
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

    function validarConfirmar() {
        const error = document.getElementById('errorConfirmar');
        if (confirmar.value !== contraseña.value) {
            error.textContent = 'Las contraseñas no coinciden.';
            confirmar.classList.add('invalido');
            confirmar.classList.remove('valido');
            return false;
        } else if (confirmar.value === '') {
            error.textContent = 'Debe confirmar la contraseña.';
            confirmar.classList.add('invalido');
            confirmar.classList.remove('valido');
            return false;
        } else {
            error.textContent = '';
            confirmar.classList.remove('invalido');
            confirmar.classList.add('valido');
            return true;
        }
    }

    function validarFormulario() {
        const nombreValido = validarNombre();
        const telefonoValido = validarTelefono();
        const usuarioValido = validarUsuario();
        const contraseñaValida = validarContraseña();
        const confirmarValido = validarConfirmar();
        
        return nombreValido && telefonoValido && usuarioValido && contraseñaValida && confirmarValido;
    }
});