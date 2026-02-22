<?php
/**
 * Sanitize functional.
 * 
 * @package rundizstrap-companion
 * @since 0.0.4
 */


namespace RundizstrapCompanion\App\Libraries;


if (!class_exists('\\RundizstrapCompanion\\App\\Libraries\\Sanitize')) {
    /**
     * Sanitize class.
     * 
     * @since 0.0.4
     */
    class Sanitize
    {


        /**
         * Sanitize key for use in HTML attributes.
         *
         * Normalize key and prefix to lowercase, optionally remove prefix, then
         * allow only valid characters for generic and ARIA-like attribute keys.
         *
         * @since 0.0.4
         * @param string $key Raw attribute key.
         * @param string $prefix Attribute prefix to strip. For example: `aria-`, `data-`.
         * @return string Return sanitized attribute key.
         */
        public function attributeKey(string $key, string $prefix = ''): string
        {
            $sanitizedKey = strtolower(trim($key));
            $normalizedPrefix = strtolower(trim($prefix));

            if ('' === $sanitizedKey) {
                return '';
            }

            if ('' !== $normalizedPrefix && 0 === strpos($sanitizedKey, $normalizedPrefix)) {
                $sanitizedKey = substr($sanitizedKey, strlen($normalizedPrefix));
            }

            if ('aria-' === $normalizedPrefix || 'aria' === $normalizedPrefix) {
                $sanitizedKey = preg_replace('/[^a-z0-9\_-]/', '', $sanitizedKey);
            } else {
                $sanitizedKey = preg_replace('/[^a-z0-9._:-]/', '', $sanitizedKey);
            }

            if (!is_string($sanitizedKey)) {
                return '';
            }

            return $sanitizedKey;
        }// attributeKey


        /**
         * Sanitize value for use in HTML attributes.
         *
         * Replace new lines and tabs with spaces, remove control characters, and trim.
         *
         * @since 0.0.4
         * @param string $value Raw attribute value.
         * @return string Return sanitized attribute value.
         */
        public function attributeValue(string $value): string
        {
            $sanitizedValue = str_replace(["\r", "\n", "\t"], ' ', $value);// replace new lines, tabs with space.
            /**
             * \x00-\x08 = NULL through Backspace
             * \x0B = Vertical Tab
             * \x0C = Form Feed
             * \x0E-\x1F = other control chars
             * \x7F = DEL
             */
            $sanitizedValue = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $sanitizedValue);
            $sanitizedValue = trim($sanitizedValue);

            return $sanitizedValue;
        }// attributeValue


        /**
         * Sanitize class name or multiple class names at once.
         *
         * @link https://developer.wordpress.org/reference/functions/sanitize_html_class/ Target function that this method will call.
         * @since 0.0.4
         * @param string $className The classname to be sanitized.
         * @return string The sanitized value.
         */
        public function classNames(string $className): string
        {
            $classTokens = preg_split('/\s+/', trim($className)) ?: [];
            $classTokens = array_filter(array_map('sanitize_html_class', $classTokens));
            return implode(' ', $classTokens);
        }// classNames

    
    }// Sanitize
}
