<?php
/**
 * Render contents for Bootstrap navbar responsive wrapper block.
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


use RundizstrapCompanion\App\Libraries\Sanitize;


if (!function_exists('rundizstrap_companion_block_bsNavbarResponsiveWrapper_attributesToString')) {
    /**
     * Convert key-value attributes to HTML attribute string.
     *
     * @since 0.0.4
     * @param array $attributes Attributes where key is attribute name and value is scalar.
     * @return string
     */
    function rundizstrap_companion_block_bsNavbarResponsiveWrapper_attributesToString(array $attributes): string
    {
        $output = '';

        foreach ($attributes as $key => $value) {
            if (!is_string($key) || '' === trim($key)) {
                continue;
            }
            if (is_array($value) || is_object($value)) {
                continue;
            }

            $output .= sprintf(
                ' %1$s="%2$s"',
                esc_attr($key),
                esc_attr((string) $value)
            );
        }// endforeach;

        return $output;
    }// rundizstrap_companion_block_bsNavbarResponsiveWrapper_attributesToString
}// endif;


if (!function_exists('rundizstrap_companion_block_bsNavbarResponsiveWrapper_sanitizeCustomAttributes')) {
    /**
     * Sanitize custom data/aria attributes.
     *
     * @since 0.0.4
     * @param mixed    $attributeValues Custom attributes input.
     * @param string   $attributePrefix Attribute prefix. For example: `data-`, `aria-`.
     * @param Sanitize $Sanitize Sanitize class instance.
     * @return array
     */
    function rundizstrap_companion_block_bsNavbarResponsiveWrapper_sanitizeCustomAttributes($attributeValues, string $attributePrefix, Sanitize $Sanitize): array
    {
        $output = [];

        if (!is_array($attributeValues)) {
            return $output;
        }

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

            $output[$attributePrefix . $sanitizedKey] = $Sanitize->attributeValue((string) $value);
        }// endforeach;

        return $output;
    }// rundizstrap_companion_block_bsNavbarResponsiveWrapper_sanitizeCustomAttributes
}// endif;


if (!function_exists('rundizstrap_companion_block_bsNavbarResponsiveWrapper_render')) {
    /**
     * Render contents for Bootstrap navbar responsive wrapper block.
     *
     * @since 0.0.4
     * @param array  $attributes Block attributes.
     * @param string $content Block default content.
     * @param mixed  $block Block instance.
     * @return string
     */
    function rundizstrap_companion_block_bsNavbarResponsiveWrapper_render(array $attributes, string $content = '', $block = null): string
    {
        $wrapperStyle = 'collapse';
        if (isset($attributes['wrapperStyle']) && 'offcanvas' === $attributes['wrapperStyle']) {
            $wrapperStyle = 'offcanvas';
        }

        $wrapperExtraAttributes = [
            'class' => ('offcanvas' === $wrapperStyle ? 'offcanvas offcanvas-end' : 'collapse navbar-collapse'),
        ];

        if ('offcanvas' === $wrapperStyle) {
            $wrapperExtraAttributes['tabindex'] = '-1';
        }

        $Sanitize = new Sanitize();

        $wrapperExtraAttributes = array_merge(
            $wrapperExtraAttributes,
            rundizstrap_companion_block_bsNavbarResponsiveWrapper_sanitizeCustomAttributes(($attributes['dataAttributes'] ?? []), 'data-', $Sanitize),
            rundizstrap_companion_block_bsNavbarResponsiveWrapper_sanitizeCustomAttributes(($attributes['ariaAttributes'] ?? []), 'aria-', $Sanitize)
        );

        if ('offcanvas' === $wrapperStyle) {
            $offcanvasHeaderClassName = 'offcanvas-header';
            if (isset($attributes['offcanvasHeaderClassName']) && is_string($attributes['offcanvasHeaderClassName'])) {
                $offcanvasHeaderClassName = $attributes['offcanvasHeaderClassName'];
            }

            $offcanvasHeaderTitleClassName = 'offcanvas-title';
            if (isset($attributes['offcanvasHeaderTitleClassName']) && is_string($attributes['offcanvasHeaderTitleClassName'])) {
                $offcanvasHeaderTitleClassName = $attributes['offcanvasHeaderTitleClassName'];
            }

            $titleId = '';
            if (isset($attributes['offcanvasHeaderTitleIDName']) && is_string($attributes['offcanvasHeaderTitleIDName'])) {
                $titleId = $attributes['offcanvasHeaderTitleIDName'];
            }
            if ('' === $titleId) {
                $titleId = 'navbar-responsive-offcanvas-title-id';
            }

            $offcanvasHeaderTitleText = '';
            if (isset($attributes['offcanvasHeaderTitleText']) && is_string($attributes['offcanvasHeaderTitleText'])) {
                $offcanvasHeaderTitleText = $attributes['offcanvasHeaderTitleText'];
            }

            $offcanvasHeaderCloseBtnClassName = '';
            if (isset($attributes['offcanvasHeaderCloseBtnClassName']) && is_string($attributes['offcanvasHeaderCloseBtnClassName'])) {
                $offcanvasHeaderCloseBtnClassName = $attributes['offcanvasHeaderCloseBtnClassName'];
            }

            $offcanvasBodyClassName = 'offcanvas-body';
            if (isset($attributes['offcanvasBodyClassName']) && is_string($attributes['offcanvasBodyClassName'])) {
                $offcanvasBodyClassName = $attributes['offcanvasBodyClassName'];
            }

            if ('' !== $titleId) {
                $wrapperExtraAttributes['aria-labelledby'] = $titleId;
            }

            $closeButtonAttributes = [
                'class' => 'btn-close' . ('' !== $offcanvasHeaderCloseBtnClassName ? ' ' . $offcanvasHeaderCloseBtnClassName : ''),
                'type' => 'button',
            ];

            $closeButtonAttributes = array_merge(
                $closeButtonAttributes,
                rundizstrap_companion_block_bsNavbarResponsiveWrapper_sanitizeCustomAttributes(($attributes['offcanvasHeaderCloseBtnDataAttributes'] ?? []), 'data-', $Sanitize),
                rundizstrap_companion_block_bsNavbarResponsiveWrapper_sanitizeCustomAttributes(($attributes['offcanvasHeaderCloseBtnAriaAttributes'] ?? []), 'aria-', $Sanitize)
            );

            return sprintf(
                '<div %1$s><div class="%2$s"><h5 class="%3$s"%4$s>%5$s</h5><button%6$s></button></div><div class="%7$s">%8$s</div></div>',
                get_block_wrapper_attributes($wrapperExtraAttributes),
                esc_attr($offcanvasHeaderClassName),
                esc_attr($offcanvasHeaderTitleClassName),
                ('' !== $titleId ? ' id="' . esc_attr($titleId) . '"' : ''),
                $offcanvasHeaderTitleText,
                rundizstrap_companion_block_bsNavbarResponsiveWrapper_attributesToString($closeButtonAttributes),
                esc_attr($offcanvasBodyClassName),
                $content
            );
        }

        return sprintf(
            '<div %1$s>%2$s</div>',
            get_block_wrapper_attributes($wrapperExtraAttributes),
            $content
        );
    }// rundizstrap_companion_block_bsNavbarResponsiveWrapper_render
}// endif;


// The echo below will render HTML for navbar responsive wrapper.
// It cannot escape HTML or the design will break.
// The input values are already sanitize and escape inside the function above.
// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo rundizstrap_companion_block_bsNavbarResponsiveWrapper_render(
    ($attributes ?? []),
    ((isset($content) && is_string($content)) ? $content : ''),
    ($block ?? null)
);
