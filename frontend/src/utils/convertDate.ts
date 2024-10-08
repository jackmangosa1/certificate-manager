// dateUtils.ts

// Utility function to convert a date to YYYY-MM-DD format in UTC
export function formatDateToYYYYMMDD(date: Date | null): string {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  // Get UTC components to avoid timezone offsets
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Enhanced date formatter that handles multiple date string formats
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '';

  try {
    // If the date string is already in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    // Handle MM/DD/YYYY format
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      const [month, day, year] = dateString.split('/').map(Number);
      const utcDate = new Date(Date.UTC(year, month - 1, day));
      if (!isNaN(utcDate.getTime())) {
        return formatDateToYYYYMMDD(utcDate);
      }
    }

    // Try parsing as ISO string or other formats
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return formatDateToYYYYMMDD(date);
    }

    return '';
  } catch {
    return '';
  }
}

// Helper function to create a Date object in UTC from various date string formats
export function parseUTCDate(dateString: string): Date | null {
  if (!dateString) return null;

  try {
    // Handle YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));
      return !isNaN(date.getTime()) ? date : null;
    }

    // Handle MM/DD/YYYY format
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      const [month, day, year] = dateString.split('/').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));
      return !isNaN(date.getTime()) ? date : null;
    }

    // Try parsing other formats
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date : null;
  } catch {
    return null;
  }
}
