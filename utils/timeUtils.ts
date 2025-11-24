export const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);

  if (seconds < 60) {
    return `منذ ${seconds} ثواني تقريباً`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `منذ ${minutes} دقائق تقريباً`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `منذ ${hours} ساعات تقريباً`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `منذ ${days} أيام تقريباً`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `منذ ${months} أشهر تقريباً`;
  }

  const years = Math.floor(months / 12);
  return `منذ ${years} سنوات تقريباً`;
};