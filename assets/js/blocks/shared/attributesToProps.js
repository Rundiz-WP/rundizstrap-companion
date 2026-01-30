/**
 * Attributes to props for common use in blocks.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


/**
 * Convert attribute objects to props with prefixes (e.g., data-, aria-).
 *
 * @param {Object} attributes Key-value pairs.
 * @param {string} prefix Prefix like 'data-' or 'aria-'.
 * @returns {Object} Props object.
 */
export default function attributesToProps(attributes, prefix) {
    const props = {};
    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            if (key) {
                props[`${prefix}${key}`] = value;
            }
        });
    }
    return props;
}
