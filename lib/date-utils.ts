/**
 * Formats a date for HTML date input fields (YYYY-MM-DD)
 */
export function formatDateForInput(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
}

/**
 * Formats a date for display to users with locale support
 */
export function formatDateForDisplay(date: Date | string, locale = 'en-US'): string {
    const d = new Date(date);
    return d.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Gets the current date formatted for date inputs
 */
export function getCurrentDateForInput(): string {
    return formatDateForInput(new Date());
}

/**
 * Converts a date string from input format (YYYY-MM-DD) to a Date object
 */
export function parseInputDate(dateString: string): Date {
    return new Date(dateString);
}