export function formatHour(time: number): string {
  const hour = Math.floor(time / 3600);
  const minute = Math.floor((time % 3600) / 60);
  const second = time % 60;

  return `${hour}h ${minute}m ${second}s`;
}
