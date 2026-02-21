/**
 * Attributes functional for common use in blocks.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


import {
    ALLOWED_ATTRIBUTE_PREFIXES,
    sanitizeAttributeKey,
    sanitizeAttributeValue,
} from './sanitizeAttributes.js';


/**
 * Convert attribute objects to props with prefixes (e.g., data-, aria-).
 *
 * @since 0.0.1
 * @param {Object} attributes Key-value pairs.
 * @param {string} prefix Prefix like 'data-' or 'aria-'.
 * @returns {Object} Props object.
 */
export default function rundizstrap_companion_attribute_to_props(attributes, prefix) {
    const props = {};

    if (!attributes) {
        return props;
    }

    const normalizedPrefix = String(prefix || '').toLowerCase();

    if (!ALLOWED_ATTRIBUTE_PREFIXES.includes(normalizedPrefix)) {
        return props;
    }

    Object.entries(attributes).forEach(([key, value]) => {
        const sanitizedKey = sanitizeAttributeKey(key, normalizedPrefix);

        if (!sanitizedKey) {
            return;
        }

        props[`${normalizedPrefix}${sanitizedKey}`] = sanitizeAttributeValue(value);
    });

    return props;
}// rundizstrap_companion_attribute_to_props
