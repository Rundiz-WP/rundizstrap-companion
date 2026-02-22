/**
 * Shared sanitize utilities for blocks.
 *
 * @package rundizstrap-companion
 * @since 0.0.4
 */


/**
 * Sanitizes an HTML classname to ensure it only contains valid characters.
 *
 * Strips the string down to A-Z, a-z, 0-9, `_`, `-`. If this results in an
 * empty string, the alternative value supplied via `fallback` is returned instead.
 *
 * @see https://developer.wordpress.org/reference/functions/sanitize_html_class/
 * @since 0.0.4
 * @param {string} classname - The classname to be sanitized.
 * @param {string} [fallback=''] - The value to return if the sanitization ends up as an empty string.
 * @returns {string} The sanitized value.
 */
export default function rundizstrap_companion_sanitize_html_class( classname, fallback = '' ) {
    if (typeof(classname) !== 'string') {
        return classname;
    }

    // Strip out any percent-encoded characters (e.g. %20, %3A).
    let sanitized = classname.replace( /%[a-fA-F0-9][a-fA-F0-9]/g, '' );

    // Limit to A-Z, a-z, 0-9, underscore, and hyphen — strip everything else.
    sanitized = sanitized.replace( /[^A-Za-z0-9_-]/g, '' );

    // If the result is empty and a fallback is provided,
    // recursively sanitize the fallback and return it instead.
    if ( sanitized === '' && fallback ) {
        return rundizstrap_companion_sanitize_html_class( fallback );
    }

    return sanitized;
}// rundizstrap_companion_sanitize_html_class


/**
 * Sanitize text similarly to WordPress `sanitize_text_field()` internals
 * (`_sanitize_text_fields( $str, false )`), without UTF-8 validation.
 *
 * @link https://developer.wordpress.org/reference/functions/sanitize_text_field/ `sanitize_text_field()` function.
 * @link https://developer.wordpress.org/reference/functions/_sanitize_text_fields/ The function that work for `sanitize_text_field()`.
 * @since 0.0.4
 * @param {string} str Input value.
 * @returns {string}
 */
export default function rundizstrap_companion_sanitize_text_field(str) {
    if (str === null || str === undefined) {
        return '';
    }

    // Match WordPress behavior where arrays/objects are rejected.
    if (typeof str === 'object') {
        return '';
    }

    let filtered = String(str);

    if (filtered.includes('<')) {
        // Encode less-than signs that are unlikely to be valid HTML tag starts.
        filtered = filtered.replace(/<(?![a-zA-Z\/?!])|<(?!=[\w-]+(?:\s|$))/g, '&lt;');
        filtered = filtered
            // Remove all <script>...</script> blocks.
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            // Remove all <style>...</style> blocks.
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            // Remove remaining HTML tags.
            .replace(/<\/?[^>]+>/g, '');
        // Encode a less-than sign followed by a newline.
        filtered = filtered.replace(/<\n/g, '&lt;\n');
    }

    // Collapse CR/LF/tab/space runs into one space, then trim edges.
    filtered = filtered.replace(/[\r\n\t ]+/g, ' ').trim();

    if (/%[a-f0-9]{2}/i.test(filtered)) {
        // Remove percent-encoded characters.
        filtered = filtered.replace(/%[a-f0-9]{2}/gi, '');
        // Strip out the whitespace that may now exist after removing percent-encoded characters.
        filtered = filtered.replace(/ +/g, ' ').trim();
    }

    return filtered;
}// rundizstrap_companion_sanitize_text_field
