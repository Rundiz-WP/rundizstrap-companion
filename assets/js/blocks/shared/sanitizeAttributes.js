/**
 * Sanitize custom attributes for data-* and aria-* use.
 *
 * @package rundizstrap-companion
 * @since 0.0.4
 */


export const ALLOWED_ATTRIBUTE_PREFIXES = ['data-', 'aria-'];


/**
 * Sanitize custom attribute key similarly to WordPress sanitize_key().
 *
 * @since 0.0.4
 * @param {string} key Attribute key.
 * @param {string} prefix Attribute prefix to strip. For example: `aria-`, `data-`.
 * @returns {string}
 */
export function sanitizeAttributeKey(key, prefix = '') {
    if (key === undefined || key === null) {
        return '';
    }

    let sanitizedKey = String(key).trim().toLowerCase();
    const normalizedPrefix = String(prefix || '').toLowerCase();

    if (!sanitizedKey) {
        return '';
    }

    if (normalizedPrefix && sanitizedKey.startsWith(normalizedPrefix)) {
        sanitizedKey = sanitizedKey.slice(normalizedPrefix.length);
    }

    // MDN dataset name chars: letters, numbers, dashes, periods, colons, underscores.
    // Keep aria keys stricter to common aria-* naming.
    if (normalizedPrefix === 'aria-' || normalizedPrefix === 'aria') {
        sanitizedKey = sanitizedKey.replace(/[^a-z0-9_-]/g, '');
    } else {
        sanitizedKey = sanitizedKey.replace(/[^a-z0-9._:-]/g, '');
    }

    return sanitizedKey;
}


/**
 * Sanitize custom attribute value.
 *
 * Keep selector-friendly characters (for example: #id, .class, [attr=value])
 * and remove only control characters.
 *
 * @since 0.0.4
 * @param {string} value Attribute value.
 * @returns {string}
 */
export function sanitizeAttributeValue(value) {
    if (value === undefined || value === null) {
        return '';
    }

    /**
     * \u0000-\u0008 = null/backspace range
     * \u000B = vertical tab
     * \u000C = form feed
     * \u000E-\u001F = other ASCII control chars
     * \u007F = DEL
     */
    return String(value)
        .replace(/[\r\n\t]/g, ' ')// replace new lines, tabs with space.
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')// find any of those unsafe/invisible control chars globally and remove them.
        .trim();
}
