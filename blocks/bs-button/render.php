<?php
/**
 * Render contents for Bootstrap button block.
 *
 * @package rundizstrap-companion
 * @since 0.0.4
 *
 * phpcs:disable Squiz.Commenting.BlockComment.NoNewLine
 * phpcs:disable WordPress.NamingConventions.ValidFunctionName.FunctionNameInvalid, Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed
 */


if (!defined('ABSPATH')) {
    exit();
}


if (!function_exists('rundizstrap_companion_block_bsButton_render')) {
    /**
     * Render contents for Bootstrap button block.
     *
     * @since 0.0.4
     * @param array  $attributes Block attributes.
     * @param string $content Block default content.
     * @param mixed  $block Block instance.
     * @return string
     */
    function rundizstrap_companion_block_bsButton_render(array $attributes, string $content = '', $block = null): string
    {
        $tagName = 'button';
        if (isset($attributes['tagName']) && 'a' === $attributes['tagName']) {
            $tagName = 'a';
        }

        $extraAttributes = [];
        $Sanitize = new \RundizstrapCompanion\App\Libraries\Sanitize();

        if ('a' === $tagName) {
            if (isset($attributes['href']) && is_string($attributes['href']) && '' !== trim($attributes['href'])) {
                $sanitizedHref = esc_url_raw(trim($attributes['href']));
                if ('' !== $sanitizedHref) {
                    $extraAttributes['href'] = $sanitizedHref;
                }
                unset($sanitizedHref);
            }

            if (isset($attributes['linkRole']) && is_string($attributes['linkRole']) && '' !== trim($attributes['linkRole'])) {
                $sanitizedRole = sanitize_text_field($attributes['linkRole']);
                if ('' !== $sanitizedRole) {
                    $extraAttributes['role'] = $sanitizedRole;
                }
                unset($sanitizedRole);
            }

            if (isset($attributes['linkTabIndex']) && is_int($attributes['linkTabIndex'])) {
                $extraAttributes['tabindex'] = (string) $attributes['linkTabIndex'];
            }
        } else {
            $allowedType = ['button', 'submit', 'reset'];
            $allowedFormEnctype = ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'];
            $allowedFormMethod = ['get', 'post', 'dialog'];

            $buttonType = 'button';
            if (isset($attributes['type']) && is_string($attributes['type']) && in_array($attributes['type'], $allowedType, true)) {
                $buttonType = $attributes['type'];
            }
            $extraAttributes['type'] = $buttonType;

            if (isset($attributes['autofocus']) && true === $attributes['autofocus']) {
                $extraAttributes['autofocus'] = 'autofocus';
            }
            if (isset($attributes['disabled']) && true === $attributes['disabled']) {
                $extraAttributes['disabled'] = 'disabled';
            }
            if (isset($attributes['formnovalidate']) && true === $attributes['formnovalidate']) {
                $extraAttributes['formnovalidate'] = 'formnovalidate';
            }

            if (isset($attributes['form']) && is_string($attributes['form']) && '' !== trim($attributes['form'])) {
                $extraAttributes['form'] = sanitize_text_field($attributes['form']);
            }
            if (isset($attributes['formenctype']) && is_string($attributes['formenctype']) && in_array($attributes['formenctype'], $allowedFormEnctype, true)) {
                $extraAttributes['formenctype'] = $attributes['formenctype'];
            }
            if (isset($attributes['formmethod']) && is_string($attributes['formmethod']) && in_array($attributes['formmethod'], $allowedFormMethod, true)) {
                $extraAttributes['formmethod'] = $attributes['formmethod'];
            }
            if (isset($attributes['formtarget']) && is_string($attributes['formtarget']) && '' !== trim($attributes['formtarget'])) {
                $extraAttributes['formtarget'] = sanitize_text_field($attributes['formtarget']);
            }
            if (isset($attributes['name']) && is_string($attributes['name']) && '' !== trim($attributes['name'])) {
                $extraAttributes['name'] = sanitize_text_field($attributes['name']);
            }
            if (isset($attributes['value']) && is_string($attributes['value']) && '' !== trim($attributes['value'])) {
                $extraAttributes['value'] = sanitize_text_field($attributes['value']);
            }
        }

        $addCustomAttributes = static function (array $attributeValues, string $attributePrefix) use (&$extraAttributes, $Sanitize): void {
            foreach ($attributeValues as $key => $value) {
                if (!is_string($key) || '' === trim($key)) {
                    continue;
                }
                if (is_array($value) || is_object($value)) {
                    continue;
                }

                $sanitizedKey = $Sanitize->attributeKey($key, $attributePrefix);
                if ('' === $sanitizedKey) {
                    continue;
                }

                $sanitizedValue = $Sanitize->attributeValue((string) $value);
                $extraAttributes[$attributePrefix . $sanitizedKey] = $sanitizedValue;
            }// endforeach;
            unset($key, $value);
            unset($sanitizedKey, $sanitizedValue);
        };

        if (isset($attributes['dataAttributes']) && is_array($attributes['dataAttributes'])) {
            $addCustomAttributes($attributes['dataAttributes'], 'data-');
        }

        if (isset($attributes['ariaAttributes']) && is_array($attributes['ariaAttributes'])) {
            $addCustomAttributes($attributes['ariaAttributes'], 'aria-');
        }
        unset($addCustomAttributes, $Sanitize);

        $textHtml = '';
        if (isset($attributes['textHtml']) && is_string($attributes['textHtml']) && '' !== $attributes['textHtml']) {
            $textHtml = wp_kses_post($attributes['textHtml']);
        }

        return sprintf(
            '<%1$s %2$s>%3$s</%1$s>',
            $tagName,
            get_block_wrapper_attributes($extraAttributes),
            $textHtml // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        );
    }// rundizstrap_companion_block_bsButton_render
}// endif;

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo rundizstrap_companion_block_bsButton_render(
    ($attributes ?? []),
    ((isset($content) && is_string($content)) ? $content : ''),
    ($block ?? null)
);
