<?php
/**
 * Render contents for Bootstrap search block.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 * @author Vee W.
 */


/* @var $attributes array Block attributes. */
/* @var $content string Block default content. */
/* @var $block \WP_Block Block instance. */

$wrapper_attributes = '';
$field_markup = '';
$buttonClass = 'btn btn-primary';
$buttonPosition = 'button-outside';
$buttonUseIcon = false;
$buttonText = __('Search', 'bbfse-plugin');
$placeholderText = '';

if (isset($attributes)) {
    if (isset($attributes['showLabel']) && true === $attributes['showLabel']) {
        $searchLabel = __('Search', 'bbfse-plugin');
        if (isset($attributes['label']) && is_string($attributes['label']) && '' !== $attributes['label']) {
            $searchLabel = $attributes['label'];
        }

        $field_markup .= '<div class="row">';
        $field_markup .= '<div class="col-12">';
        $field_markup .= '<label class="form-label" for="bbfse-plugin-blocks-bs-search-input">' . wp_kses_post($searchLabel) . '</label>';
        $field_markup .= '</div>';
        $field_markup .= '</div><!-- .row -->';
        unset($searchLabel);
    }

    if (isset($attributes['className']) && is_string($attributes['className']) && '' !== $attributes['className']) {
        $wrapper_attributes .= get_block_wrapper_attributes();
    }
    if (isset($attributes['buttonClass']) && is_string($attributes['buttonClass']) && '' !== $attributes['buttonClass']) {
        $buttonClass = $attributes['buttonClass'];
    }
    if (isset($attributes['buttonPosition']) && is_string($attributes['buttonPosition']) && '' !== $attributes['buttonPosition']) {
        $buttonPosition = $attributes['buttonPosition'];
    }
    if (isset($attributes['buttonUseIcon']) && is_bool($attributes['buttonUseIcon'])) {
        $buttonUseIcon = $attributes['buttonUseIcon'];
    }
    if (isset($attributes['buttonText']) && is_string($attributes['buttonText']) && '' !== $attributes['buttonText']) {
        $buttonText = $attributes['buttonText'];
    }
    if (isset($attributes['placeholderText']) && is_string($attributes['placeholderText']) && '' !== $attributes['placeholderText']) {
        $placeholderText = $attributes['placeholderText'];
    }

    if (true === $buttonUseIcon) {
        $buttonText = '<i class="bi bi-search"></i>';
    }
}// endif; $attributes

$input_field = '<input id="bbfse-plugin-blocks-bs-search-input" class="form-control" type="search" name="s" value="' . get_search_query() . '" placeholder="' . esc_attr($placeholderText) . '" required>';
$button_search = '<button class="' . esc_attr($buttonClass) . '" type="submit">' . wp_kses_post($buttonText) . '</button>';

if ('button-group-input' === $buttonPosition) {
    $field_markup .= '<div class="input-group">';
    $field_markup .= $input_field;
    $field_markup .= $button_search;
    $field_markup .= '</div>';
} else {
    $field_markup .= '<div class="row g-3">';
    $input_col_class = 'col';
    if ('no-button' === $buttonPosition) {
        $input_col_class = 'col-12';
    }
    $field_markup .= '<div class="' . $input_col_class . '">';
    $field_markup .= $input_field;
    $field_markup .= '</div>';
    if ('no-button' !== $buttonPosition) {
        $field_markup .= '<div class="col-auto">';
        $field_markup .= $button_search;
        $field_markup .= '</div>';
    }
    $field_markup .= '</div><!-- .row -->';
}// endif; $buttonPosition
unset($button_search, $buttonClass, $buttonText, $input_col_class, $input_field, $placeholderText);

printf(
        '<form role="search" method="get" action="%1$s" %2$s>%3$s</form>',
        esc_url(home_url('/')),
        $wrapper_attributes,
        $field_markup
);
