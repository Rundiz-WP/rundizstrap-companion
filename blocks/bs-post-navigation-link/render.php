<?php
/**
 * Render contents for Bootstrap post navigation link block.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 * 
 * @link https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/post-navigation-link Source reference.
 */


/* @var $attributes array Block attributes. */
/* @var $content string Block default content. */
/* @var $block \WP_Block Block instance. */

if (!is_singular()) {
    return '';
}
unset($block, $content);

$type = (isset($attributes['type']) ? $attributes['type'] : 'next');
if (!in_array($type, ['next', 'previous'], true)) {
    return '';
}

$taxonomy = (isset($attributes['taxonomy']) && is_string($attributes['taxonomy']) ? trim($attributes['taxonomy']) : '');
$adjacentPost = get_adjacent_post(
    ('' !== $taxonomy),
    '',
    ('previous' === $type),
    ('' !== $taxonomy ? $taxonomy : 'category')
);

if (!$adjacentPost instanceof \WP_Post) {
    unset($adjacentPost, $attributes, $taxonomy, $type);
    return '';
}
unset($taxonomy);

$linkText = '';
$label = (isset($attributes['label']) && is_string($attributes['label']) ? $attributes['label'] : '');
$showTitle = (isset($attributes['showTitle']) && is_bool($attributes['showTitle']) ? $attributes['showTitle'] : false);
$defaultLabel = ('next' === $type ? _x('Next', 'label for next post link', 'bbfse-plugin') : _x('Previous', 'label for previous post link', 'bbfse-plugin'));

if (true === $showTitle) {
    $postTitle = get_the_title($adjacentPost);
    if (!is_string($postTitle) || '' === trim($postTitle)) {
        $postTitle = __('(no title)', 'bbfse-plugin');
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
    'wp-block-bbfse-plugin-blocks-bs-post-navigation-link',
    'post-navigation-link-' . $type,
];
if (isset($attributes['className']) && is_string($attributes['className']) && '' !== trim($attributes['className'])) {
    $classes[] = trim($attributes['className']);
}

$rel = (isset($attributes['rel']) && is_string($attributes['rel']) ? trim($attributes['rel']) : '');
if ('' === $rel) {
    $rel = ('next' === $type ? 'next' : 'prev');
}
unset($type);

$tabindex = (isset($attributes['tabindex']) && is_string($attributes['tabindex']) ? trim($attributes['tabindex']) : '');

$dataAttributes = '';
if (isset($attributes['dataAttributes']) && is_array($attributes['dataAttributes'])) {
    foreach ($attributes['dataAttributes'] as $key => $value) {
        if (!is_string($key) || '' === trim($key)) {
            continue;
        }
        if (is_array($value) || is_object($value)) {
            continue;
        }
        $sanitizedKey = preg_replace('/[^A-Za-z0-9_\-]/', '', trim($key));
        if ('' === $sanitizedKey) {
            continue;
        }
        $dataAttributes .= ' data-' . esc_attr($sanitizedKey) . '="' . esc_attr((string) $value) . '"';
    }// endforeach;
    unset($key, $value);
    unset($sanitizedKey);
}// endif;

$ariaAttributes = '';
if (isset($attributes['ariaAttributes']) && is_array($attributes['ariaAttributes'])) {
    foreach ($attributes['ariaAttributes'] as $key => $value) {
        if (!is_string($key) || '' === trim($key)) {
            continue;
        }
        if (is_array($value) || is_object($value)) {
            continue;
        }
        $sanitizedKey = preg_replace('/[^A-Za-z0-9_\-]/', '', trim($key));
        if ('' === $sanitizedKey) {
            continue;
        }
        $ariaAttributes .= ' aria-' . esc_attr($sanitizedKey) . '="' . esc_attr((string) $value) . '"';
    }// endforeach;
    unset($key, $value);
    unset($sanitizedKey);
}// endif;

printf(
    '<a href="%1$s" class="%2$s" rel="%3$s"%4$s%5$s%6$s>%7$s</a>',
    esc_url(get_permalink($adjacentPost)),
    esc_attr(implode(' ', $classes)),
    esc_attr($rel),
    ('' !== $tabindex ? ' tabindex="' . esc_attr($tabindex) . '"' : ''),
    $dataAttributes,
    $ariaAttributes,
    $linkText
);

unset($adjacentPost, $ariaAttributes, $attributes, $classes, $dataAttributes, $linkText, $rel, $tabindex);
