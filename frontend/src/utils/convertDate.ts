export function formatDateToYYYYMMDD(date: Date | null): string {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '';

  try {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      const [month, day, year] = dateString.split('/').map(Number);
      const utcDate = new Date(Date.UTC(year, month - 1, day));
      if (!isNaN(utcDate.getTime())) {
        return formatDateToYYYYMMDD(utcDate);
      }
    }

    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return formatDateToYYYYMMDD(date);
    }

    return '';
  } catch {
    return '';
  }
}

export function parseUTCDate(dateString: string): Date | null {
  if (!dateString) return null;

  try {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));
      return !isNaN(date.getTime()) ? date : null;
    }

    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      const [month, day, year] = dateString.split('/').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));
      return !isNaN(date.getTime()) ? date : null;
    }

    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date : null;
  } catch {
    return null;
  }
}
