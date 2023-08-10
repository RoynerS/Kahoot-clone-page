// primer_javascript.js
function startTrivia() {
    const nombreInput = document.getElementById("Pin");
    const nombre_De_usuario = nombreInput.value.trim();
  
    if (nombre_De_usuario === "") {
      alert("Por favor, ingresa tu nombre.");
      return;
    }
  
    // Redireccionar a "juego.html" con el nombre como parámetro en la URL
    window.location.assign("index1.html?nombre_De_usuario=" + encodeURIComponent(nombre_De_usuario));
  }
  
  // Agregar un evento de clic al botón de inicio
  document.querySelector("#myform #startButton").addEventListener("click", startTrivia);
