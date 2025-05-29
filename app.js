const form = document.getElementById('form-serial');
const mensaje = document.getElementById('mensaje');
const barcodeSvg = document.getElementById('barcode');

const SCRIPT_URL = 'TU_URL_DEL_DEPLOYMENT_DE_APPS_SCRIPT_AQUI';

form.addEventListener('submit', e => {
    e.preventDefault();
    mensaje.textContent = '';
    
    const material = form.material.value.trim();
    const descripcion = form.descripcion.value.trim();
    const um = form.um.value.trim();
    const serial = form.serial.value.trim();

    if (!material || !descripcion || !um || !serial) {
        mensaje.style.color = 'red';
        mensaje.textContent = 'Por favor completa todos los campos.';
        return;
    }

    const data = { material, descripcion, um, serial };

    fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(resp => resp.json())
    .then(json => {
        if (json.success) {
            mensaje.style.color = 'green';
            mensaje.textContent = 'Etiqueta guardada correctamente.';

            JsBarcode(barcodeSvg, serial, {
                format: "CODE128",
                lineColor: "#5a2a83",
                width: 2,
                height: 50,
                displayValue: true
            });
        } else {
            mensaje.style.color = 'red';
            mensaje.textContent = json.message || 'Error guardando etiqueta.';
        }
    })
    .catch(err => {
        mensaje.style.color = 'red';
        mensaje.textContent = 'Error de conexión al servidor.';
        console.error(err);
    });
});