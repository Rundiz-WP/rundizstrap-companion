<?php
/**
 * Render contents for Bootstrap search block.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 * @author Vee W.
 * 
 * phpcs:disable Squiz.Commenting.BlockComment.NoNewLine
 * phpcs:disable WordPress.NamingConventions.ValidFunctionName.FunctionNameInvalid, Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed
 */


if (!defined('ABSPATH')) {
    exit();
}


if (!function_exists('rundizstrap_companion_block_bsSearch_render')) {
    /**
     * Render contents for Bootstrap search block.
     *
     * @since 0.0.1
     * @param array  $attributes Block attributes.
     * @param string $content Block default content.
     * @param mixed  $block Block instance.
     * @return string
     */
    function rundizstrap_companion_block_bsSearch_render(array $attributes, string $content = '', $block = null): string
    {
        $wrapper_attributes = '';
        $field_markup = '';
        $buttonClass = 'btn btn-primary';
        $buttonPosition = 'button-outside';
        $buttonUseIcon = false;
        $buttonText = __('Search', 'rundizstrap-companion');
        $placeholderText = '';
        $forNavbar = (isset($attributes['forNavbar']) && true === $attributes['forNavbar'] ? true : false);

        if (isset($attributes)) {
            if (isset($attributes['showLabel']) && true === $attributes['showLabel']) {
                $searchLabel = __('Search', 'rundizstrap-companion');
                if (isset($attributes['label']) && is_string($attributes['label']) && '' !== $attributes['label']) {
                    $searchLabel = $attributes['label'];
                }

                if (false === $forNavbar) {
                    $field_markup .= '<div class="row">';
                    $field_markup .= '<div class="col-12">';
                    $field_markup .= '<label class="form-label" for="rundizstrap-companion-blocks-bs-search-input">' . wp_kses_post($searchLabel) . '</label>';
                    $field_markup .= '</div>';
                    $field_markup .= '</div><!-- .row -->';
                }
                unset($searchLabel);
            }

            $additionalClasses = (true === $forNavbar ? 'd-flex' : '');
            if (isset($attributes['className']) && is_string($attributes['className']) && '' !== $attributes['className']) {
                $wrapper_attributes .= get_block_wrapper_attributes(['class' => $additionalClasses]);
            } else {
                $wrapper_attributes .= get_block_wrapper_attributes(['class' => $additionalClasses]);
            }
            unset($additionalClasses);

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

        $input_field = '<input id="rundizstrap-companion-blocks-bs-search-input" class="form-control';
        if (true === $forNavbar && 'button-group-input' !== $buttonPosition && 'no-button' !== $buttonPosition) {
            $input_field .= ' me-2';
        }
        $input_field .= '" type="search" name="s" value="' . get_search_query() . '" placeholder="' . esc_attr($placeholderText) . '"' .
            ' aria-label="' . esc_attr__('Search', 'rundizstrap-companion') . '" required>';
        $button_search = '<button class="' . esc_attr($buttonClass) . '" type="submit">' . wp_kses_post($buttonText) . '</button>';

        if ('button-group-input' === $buttonPosition) {
            $field_markup .= '<div class="input-group">';
            $field_markup .= $input_field;
            $field_markup .= $button_search;
            $field_markup .= '</div>';
        } else {
            if (false === $forNavbar) {
                // if not for render in navbar.
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
            } else {
                // if for render in navbar.
                $field_markup .= $input_field;
                if ('no-button' !== $buttonPosition) {
                    $field_markup .= PHP_EOL . $button_search;
                }
            }
        }// endif; $buttonPosition
        unset($button_search, $buttonClass, $buttonText, $input_col_class, $input_field, $placeholderText);
        unset($forNavbar);

        return sprintf(
            '<form method="get" action="%1$s" role="search" %2$s>%3$s</form>',
            esc_url(home_url('/')),
            $wrapper_attributes, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            $field_markup // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        );
    }// rundizstrap_companion_block_bsSearch_render
}// endif;

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo rundizstrap_companion_block_bsSearch_render(
    ($attributes ?? []),
    ((isset($content) && is_string($content)) ? $content : ''),
    ($block ?? null)
);
