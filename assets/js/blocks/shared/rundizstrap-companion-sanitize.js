/**
 * Shared sanitize utilities for blocks.
 *
 * @package rundizstrap-companion
 * @since 0.0.4
 */


/**
 * Sanitize text similarly to WordPress `sanitize_text_field()` internals
 * (`_sanitize_text_fields( $str, false )`), without UTF-8 validation.
 *
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
