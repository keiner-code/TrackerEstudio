export const getNextSevenDays = (): {
  fullDate: Date;
  dayNumber: number;
  dayName: string;
  monthName: string;
}[] => {
  const daysArray: {
    fullDate: Date;
    dayNumber: number;
    dayName: string;
    monthName: string;
  }[] = [];
  const today = new Date();

  // Opciones base para sacar los textos en español
  const dayNameFormater = new Intl.DateTimeFormat("es-ES", {
    weekday: "short",
  }); // ej: 'dom' (usa 'long' para 'domingo')
  const monthFormatter = new Intl.DateTimeFormat("es-ES", { month: "long" }); // ej: 'abril'

  for (let i = 0; i < 7; i++) {
    // Clona la fecha actual y le suma los días de la iteración
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    daysArray.push({
      fullDate: nextDate, // Fecha completa por si la necesitas para lógica
      dayNumber: nextDate.getDate(), // 12, 13, 14, 15...
      dayName: dayNameFormater.format(nextDate), // "dom", "lun", "mar"...
      monthName: monthFormatter.format(nextDate), // "abril"
    });
  }

  return daysArray;
};
