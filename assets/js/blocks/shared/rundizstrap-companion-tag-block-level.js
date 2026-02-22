/**
 * Shared tag name configuration and sanitize utilities for blocks.
 *
 * @package rundizstrap-companion
 * @since 0.0.4
 * @link https://www.geeksforgeeks.org/html/html-block-and-inline-elements/ Example list of HTML block level.
 */

export const rundizstrap_companion_blockLevelTagNameOptions = [
    'div',
    'header',
    'main',
    'nav',
    'section',
    'article',
    'aside',
    'footer',
];


export const rundizstrap_companion_allowedBlockLevelTagNames = new Set(rundizstrap_companion_blockLevelTagNameOptions);


/**
 * Sanitize tag name and fallback to provided default tag.
 *
 * @since 0.0.4
 * @param {string} tagName
 * @param {string} defaultTagName Manually-defined default tag for each block.
 * @returns {string}
 */
export function rundizstrap_companion_sanitizeTagName(tagName, defaultTagName) {
    const normalizedTagName = String(tagName || '').trim().toLowerCase();
    const normalizedDefaultTagName = String(defaultTagName || '').trim().toLowerCase();

    if (rundizstrap_companion_allowedBlockLevelTagNames.has(normalizedTagName)) {
        return normalizedTagName;
    }

    if (rundizstrap_companion_allowedBlockLevelTagNames.has(normalizedDefaultTagName)) {
        return normalizedDefaultTagName;
    }

    return 'div';
}// rundizstrap_companion_sanitizeTagName
