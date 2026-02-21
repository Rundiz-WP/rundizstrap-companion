/**
 * Shared tag name configuration and sanitize utilities for blocks.
 *
 * @package rundizstrap-companion
 * @since 0.0.4
 */

export const BLOCKLV_TAG_NAME_OPTIONS = [
    'div',
    'header',
    'main',
    'section',
    'article',
    'aside',
    'footer',
];

export const ALLOWED_BLOCKLV_TAG_NAMES = new Set(BLOCKLV_TAG_NAME_OPTIONS);

/**
 * Sanitize tag name and fallback to provided default tag.
 *
 * @since 0.0.4
 * @param {string} tagName
 * @param {string} defaultTagName Manually-defined default tag for each block.
 * @returns {string}
 */
export function sanitizeTagName(tagName, defaultTagName) {
    const normalizedTagName = String(tagName || '').trim().toLowerCase();
    const normalizedDefaultTagName = String(defaultTagName || '').trim().toLowerCase();

    if (ALLOWED_BLOCKLV_TAG_NAMES.has(normalizedTagName)) {
        return normalizedTagName;
    }

    if (ALLOWED_BLOCKLV_TAG_NAMES.has(normalizedDefaultTagName)) {
        return normalizedDefaultTagName;
    }

    return 'div';
}
