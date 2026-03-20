<?php
/**
 * Render contents for Bootstrap post navigation link block.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 * 
 * @link https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/post-navigation-link Source reference.
 * 
 * phpcs:disable Squiz.Commenting.BlockComment.NoNewLine
 * phpcs:disable WordPress.NamingConventions.ValidFunctionName.FunctionNameInvalid
 */


if (!defined('ABSPATH')) {
    exit();
}


if (!function_exists('rundizstrap_companion_block_bsPostNavigationLink_render')) {
    /**
     * Render contents for Bootstrap post navigation link block.
     *
     * @since 0.0.1
     * @param array  $attributes Block attributes.
     * @param string $content Block default content.
     * @param mixed  $block Block instance.
     * @return string
     */
    function rundizstrap_companion_block_bsPostNavigationLink_render(array $attributes, string $content = '', $block = null): string
    {
        if (!is_singular()) {
            return '';
        }
        unset($block, $content);

        $attType = (isset($attributes['type']) ? $attributes['type'] : 'next');
        if (!in_array($attType, ['next', 'previous'], true)) {
            return '';
        }

        $attTaxonomy = (isset($attributes['taxonomy']) && is_string($attributes['taxonomy']) ? sanitize_key($attributes['taxonomy']) : '');
        if ('' !== $attTaxonomy && !taxonomy_exists($attTaxonomy)) {
            $attTaxonomy = '';
        }
        $adjacentPost = get_adjacent_post(
            ('' !== $attTaxonomy),
            '',
            ('previous' === $attType),
            ('' !== $attTaxonomy ? $attTaxonomy : 'category')
        );

        if (!$adjacentPost instanceof \WP_Post) {
            unset($adjacentPost, $attributes, $attTaxonomy, $attType);
            return '';
        }
        unset($attTaxonomy);

        $linkText = '';
        $label = (isset($attributes['label']) && is_string($attributes['label']) ? $attributes['label'] : '');
        $showTitle = (isset($attributes['showTitle']) && is_bool($attributes['showTitle']) ? $attributes['showTitle'] : false);
        $defaultLabel = ('next' === $attType ? _x('Next', 'label for next post link', 'rundizstrap-companion') : _x('Previous', 'label for previous post link', 'rundizstrap-companion'));

        if (true === $showTitle) {
            $postTitle = get_the_title($adjacentPost);
            if (!is_string($postTitle) || '' === trim($postTitle)) {
                $postTitle = __('(no title)', 'rundizstrap-companion');
            }
            $linkText .= esc_html($postTitle);
            unset($postTitle);
        } elseif ('' !== trim($label)) {
            $linkText .= wp_kses_post($label);
        } else {
            $linkText .= esc_html($defaultLabel);
        }
        unset($defaultLabel, $label, $showTitle);

        $prependTextHtml = (isset($attributes['prependTextHtml']) && is_string($attributes['prependTextHtml']) ? trim($attributes['prependTextHtml']) : '');
        if ('' !== $prependTextHtml) {
            $linkText = wp_kses_post($prependTextHtml) . $linkText;
        }
        unset($prependTextHtml);

        $appendTextHtml = (isset($attributes['appendTextHtml']) && is_string($attributes['appendTextHtml']) ? trim($attributes['appendTextHtml']) : '');
        if ('' !== $appendTextHtml) {
            $linkText .= wp_kses_post($appendTextHtml);
        }
        unset($appendTextHtml);

        $classes = [
            'wp-block-rundizstrap-companion-blocks-bs-post-navigation-link',
            'post-navigation-link-' . $attType,
        ];
        if (isset($attributes['className']) && is_string($attributes['className']) && '' !== trim($attributes['className'])) {
            $classes[] = trim($attributes['className']);
        }

        $rel = (isset($attributes['rel']) && is_string($attributes['rel']) ? trim($attributes['rel']) : '');
        if ('' === $rel) {
            $rel = ('next' === $attType ? 'next' : 'prev');
        }
        $rel = sanitize_text_field($rel);
        unset($attType);

        $tabindex = (isset($attributes['tabindex']) && is_int($attributes['tabindex']) ? $attributes['tabindex'] : null);

        $Sanitize = new \RundizstrapCompanion\App\Libraries\Sanitize();
        $buildCustomAttributes = static function (array $attributeValues, string $attributePrefix) use ($Sanitize): string {
            $output = '';
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
                $output .= ' ' . $attributePrefix . esc_attr($sanitizedKey) . '="' . esc_attr($sanitizedValue) . '"';
            }// endforeach;
            unset($key, $value);
            unset($sanitizedKey, $sanitizedValue);

            return $output;
        };

        $dataAttributes = '';
        if (isset($attributes['dataAttributes']) && is_array($attributes['dataAttributes'])) {
            $dataAttributes = $buildCustomAttributes($attributes['dataAttributes'], 'data-');
        }// endif;

        $ariaAttributes = '';
        if (isset($attributes['ariaAttributes']) && is_array($attributes['ariaAttributes'])) {
            $ariaAttributes = $buildCustomAttributes($attributes['ariaAttributes'], 'aria-');
        }// endif;
        unset($buildCustomAttributes, $Sanitize);

        return sprintf(
            '<a href="%1$s" class="%2$s" rel="%3$s"%4$s%5$s%6$s>%7$s</a>',
            esc_url(get_permalink($adjacentPost)),
            esc_attr(implode(' ', $classes)),
            esc_attr($rel),
            (is_int($tabindex) ? ' tabindex="' . esc_attr((string) $tabindex) . '"' : ''),
            $dataAttributes, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            $ariaAttributes, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            $linkText // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        );
    }// rundizstrap_companion_block_bsPostNavigationLink_render
}// endif;


$rundizstrap_companion_customKsesDataFile = dirname(RUNDIZSTRAP_COMPANION_FILE) . '/App/config/kses_data.php';
if (!file_exists($rundizstrap_companion_customKsesDataFile)) {
    error_log('The file ' . str_replace(['\\', '/'], DIRECTORY_SEPARATOR, $rundizstrap_companion_customKsesDataFile) . 'is not exists.');
    return;
} else {
    $rundizstrap_companion_ksesData = include $rundizstrap_companion_customKsesDataFile;
    // The echo below will be render HTML of post navigation (previous post, next post).
    echo wp_kses(
        rundizstrap_companion_block_bsPostNavigationLink_render(
            ($attributes ?? []),
            ((isset($content) && is_string($content)) ? $content : ''),
            ($block ?? null)
        ),
        $rundizstrap_companion_ksesData
    );
}// endif;
