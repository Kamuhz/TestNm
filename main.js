let resultados = JSON.parse(localStorage.getItem('resultados')) || [];

function iniciarJuego() {
  const numeroAleatorio = Math.floor(Math.random() * 50) + 1;
  const intentosMaximos = 5;
  const intentos = [];
  const nombreJugador = document.getElementById('nombre').value;

  if (nombreJugador.trim() === '') {
    alert('Por favor, ingresa tu nombre antes de iniciar el juego.');
    return;
  }

  function adivinaElNumero() {
    const numero = parseInt(prompt('Ingresa un número entre 1 y 50:'));

    if (numero === null || isNaN(numero) || numero < 1 || numero > 50) {
      alert('Juego cancelado o número inválido. ¡Vuelve a intentarlo!');
      return; // Cancelar el juego si el jugador presiona "Cancelar" o ingresa un número inválido
    }

    intentos.push(numero);

    if (numero === numeroAleatorio) {
      alert(`¡Felicidades ${nombreJugador}! Adivinaste el número ${numeroAleatorio} en ${intentos.length} intentos.`);
      resultados.push({ nombre: nombreJugador, intentos: intentos.length });
      localStorage.setItem('resultados', JSON.stringify(resultados));
      mostrarRanking();
    } else {
      if (intentos.length === intentosMaximos) {
        alert(`Lo siento ${nombreJugador}, has superado el límite de intentos. El número era ${numeroAleatorio}.`);
        mostrarRanking();
      } else {
        let mensajeFallo = '¡Fallaste! Sigue intentando.';
        if (numero < numeroAleatorio) {
          mensajeFallo += ' El número es mayor.';
        } else {
          mensajeFallo += ' El número es menor.';
        }
        alert(mensajeFallo);
        adivinaElNumero(); // Pedimos un nuevo intento al jugador
      }
    }
  }

  function mostrarRanking() {
    let rankingHTML = '===== Ranking de Victorias =====\n';
    resultados.sort((a, b) => a.intentos - b.intentos);
    resultados.forEach((resultado, index) => {
      rankingHTML += `${index + 1}. ${resultado.nombre}: ${resultado.intentos} intentos.\n`;
    });
    alert(rankingHTML);

    // Preguntar al jugador si quiere jugar de nuevo después de mostrar el ranking
    if (confirm('¿Quieres jugar de nuevo?')) {
      reiniciarJuego(); // Reiniciar el juego si el jugador quiere jugar de nuevo
    } else {
      alert('Gracias por jugar. ¡Hasta luego!');
    }
  }

  function reiniciarJuego() {
    intentos.length = 0; // Reiniciamos el array de intentos para la próxima partida
    adivinaElNumero();
  }

  // Iniciar el juego
  adivinaElNumero();
}
