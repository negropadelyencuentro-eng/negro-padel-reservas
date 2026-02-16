================================================================================
admin:1223 📋 CÓDIGO ACTUALIZADO PARA config-precios.js
admin:1224 ================================================================================

admin:1225 // =========================================
// CONFIGURACIÓN DE PRECIOS - NEGRO PADEL
// Generado automáticamente: 16/2/2026, 07:47:44
// =========================================

const PRECIOS_CONFIG = {
  precios: {
    semana: {
      "09:00": 10000,
      "10:30": 10000,
      "12:00": 16000,
      "14:00": 16000,
      "15:30": 16000,
      "17:00": 16000,
      "18:30": 20000,
      "20:00": 20000,
      "21:30": 20000,
      "23:00": 23000
},
    finDeSemana: {
      "09:00": 16000,
      "10:30": 16000,
      "12:00": 16000,
      "14:00": 16000,
      "15:30": 16000,
      "17:00": 16000,
      "18:30": 20000,
      "20:00": 20000,
      "21:30": 20000,
      "23:00": 20000
}
  },
  
  descuentoUltimaHora: {
    activo: true,
    porcentaje: 10,
    minutosAntes: 90
  },
  
  whatsapp: {
    numero: '5493584294011'
  }
};

// Función para obtener precio según día y hora
function obtenerPrecio(dia, hora) {
  const diasFinDeSemana = ['SÁBADO', 'DOMINGO'];
  const esFinDeSemana = diasFinDeSemana.includes(dia);
  
  if (esFinDeSemana) {
    return PRECIOS_CONFIG.precios.finDeSemana[hora] || 20000;
  } else {
    return PRECIOS_CONFIG.precios.semana[hora] || 20000;
  }
}

// Función para formatear precio
function formatearPrecio(precio) {
  return '$' + precio.toLocaleString('es-AR');
}

// Función para calcular si aplica descuento
function aplicaDescuento(fechaTurno, horaTurno) {
  if (!PRECIOS_CONFIG.descuentoUltimaHora.activo) return false;
  
  const ahora = new Date();
  const [horas, minutos] = horaTurno.split(':');
  const fechaHoraTurno = new Date(fechaTurno);
  fechaHoraTurno.setHours(parseInt(horas), parseInt(minutos), 0, 0);
  
  const minutosRestantes = (fechaHoraTurno - ahora) / 1000 / 60;
  
  return minutosRestantes > 0 && minutosRestantes <= PRECIOS_CONFIG.descuentoUltimaHora.minutosAntes;
}

// Función para verificar si un turno ya pasó
function turnoFinalizado(fechaTurno, horaTurno) {
  const ahora = new Date();
  const [horas, minutos] = horaTurno.split(':');
  const fechaHoraTurno = new Date(fechaTurno);
  fechaHoraTurno.setHours(parseInt(horas), parseInt(minutos), 0, 0);
  
  // Agregar 90 minutos (duración del turno)
  fechaHoraTurno.setMinutes(fechaHoraTurno.getMinutes() + 90);
  
  return ahora > fechaHoraTurno;
}
admin:1226 
================================================================================
admin:1227 ⚠️ IMPORTANTE: Copiá este código y pegalo en config-precios.js
admin:1228 
