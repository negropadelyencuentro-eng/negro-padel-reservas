// =========================================
// CONFIGURACIÓN DE PRECIOS - NEGRO PADEL
// =========================================
// Editá este archivo para cambiar los precios

const PRECIOS_CONFIG = {
  // Precios base por horario y día
  precios: {
    // Lunes a Viernes
    semana: {
      '09:00': 10000,
      '10:30': 10000,
      '12:00': 16000,
      '14:00': 16000,
      '15:30': 16000,
      '17:00': 16000,
      '18:30': 20000,
      '20:00': 20000,
      '21:30': 20000,
      '23:00': 20000
    },
    // Sábados y Domingos
    finDeSemana: {
      '09:00': 16000,
      '10:30': 16000,
      '12:00': 16000,
      '14:00': 16000,
      '15:30': 16000,
      '17:00': 16000,
      '18:30': 20000,
      '20:00': 20000,
      '21:30': 20000,
      '23:00': 20000
    }
  },
  
  // Descuento cuando falta poco para el turno
  descuentoUltimaHora: {
    activo: true,
    porcentaje: 10,  // 10% de descuento
    minutosAntes: 90 // Cuando faltan 90 minutos (1.5 horas)
  },
  
  // Configuración de WhatsApp
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
  
  // Obtener fecha/hora actual
  const ahora = new Date();
  
  // Parsear la fecha del turno (YYYY-MM-DD)
  const [year, month, day] = fechaTurno.split('-').map(n => parseInt(n));
  const [horas, minutos] = horaTurno.split(':').map(n => parseInt(n));
  
  // Crear fecha del turno
  const fechaHoraTurno = new Date(year, month - 1, day, horas, minutos, 0, 0);
  
  // Calcular minutos restantes
  const minutosRestantes = (fechaHoraTurno - ahora) / 1000 / 60;
  
  const aplica = minutosRestantes > 0 && minutosRestantes <= PRECIOS_CONFIG.descuentoUltimaHora.minutosAntes;
  
  return aplica;
}

// DEBUG: Ver estado de turnos
console.log('🕐 Hora actual del navegador:', new Date().toLocaleString('es-AR'));
console.log('📍 Zona horaria:', Intl.DateTimeFormat().resolvedOptions().timeZone);

// Función para verificar si un turno ya pasó
function turnoFinalizado(fechaTurno, horaTurno) {
  // Usar hora local del navegador (ya está en zona horaria correcta)
  const ahora = new Date();
  
  // Parsear la fecha del turno (YYYY-MM-DD)
  const [year, month, day] = fechaTurno.split('-').map(n => parseInt(n));
  const [horas, minutos] = horaTurno.split(':').map(n => parseInt(n));
  
  // Crear fecha del turno en hora local
  const fechaHoraTurno = new Date(year, month - 1, day, horas, minutos, 0, 0);
  
  // Agregar 90 minutos (duración del turno)
  const fechaHoraFin = new Date(fechaHoraTurno);
  fechaHoraFin.setMinutes(fechaHoraFin.getMinutes() + 90);
  
  // El turno finalizó si ya pasaron los 90 minutos
  return ahora > fechaHoraFin;
}

// Función para verificar si un turno está en curso AHORA
function turnoEnCurso(fechaTurno, horaTurno) {
  const ahora = new Date();
  
  // Parsear la fecha del turno (YYYY-MM-DD)
  const [year, month, day] = fechaTurno.split('-').map(n => parseInt(n));
  const [horas, minutos] = horaTurno.split(':').map(n => parseInt(n));
  
  // Crear fecha de inicio del turno
  const fechaHoraInicio = new Date(year, month - 1, day, horas, minutos, 0, 0);
  
  // Crear fecha de fin del turno (90 minutos después)
  const fechaHoraFin = new Date(fechaHoraInicio);
  fechaHoraFin.setMinutes(fechaHoraFin.getMinutes() + 90);
  
  // El turno está en curso si estamos entre el inicio y el fin
  return ahora >= fechaHoraInicio && ahora <= fechaHoraFin;
}
