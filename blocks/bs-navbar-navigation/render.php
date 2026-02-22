<?php
/**
 * Render contents for Bootstrap navbar navigation block.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 * 
 * phpcs:disable Squiz.Commenting.BlockComment.NoNewLine
 * phpcs:disable WordPress.NamingConventions.ValidFunctionName.FunctionNameInvalid, Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed
 */


if (!defined('ABSPATH')) {
    exit();
}


use RundizstrapCompanion\App\Libraries\BootstrapNavbarNavigationWalker;
use RundizstrapCompanion\App\Libraries\Sanitize;


if (!function_exists('rundizstrap_companion_block_bsNavbarNavigation_render')) {
    /**
     * Render contents for Bootstrap navbar navigation block.
     *
     * @since 0.0.1
     * @param array  $attributes Block attributes.
     * @param string $content Block default content.
     * @param mixed  $block Block instance.
     * @return string
     */
    function rundizstrap_companion_block_bsNavbarNavigation_render(array $attributes, string $content = '', $block = null): string
    {
        $output = '';
        $navigationRef = (isset($attributes['navigationRef']) ? (int) $attributes['navigationRef'] : 0);

        $navigationPost = null;
        if ($navigationRef > 0) {
            $navigationPost = get_post($navigationRef);
            if (!$navigationPost || 'wp_navigation' !== $navigationPost->post_type) {
                $navigationPost = null;
            }
        }

        if (!$navigationPost) {
            $navigationPosts = get_posts([
                'post_type' => 'wp_navigation',
                'posts_per_page' => 1,
                'post_status' => 'publish',
                'orderby' => 'ID',
                'order' => 'ASC',
            ]);
            if (is_array($navigationPosts) && !empty($navigationPosts)) {
                $navigationPost = $navigationPosts[0];
            }
            unset($navigationPosts);
        }

        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $isBlockEditor = (defined('REST_REQUEST') && REST_REQUEST && isset($_GET['context']) && 'edit' === $_GET['context']);

        if (!$navigationPost) {
            if ($isBlockEditor) {
                $output .= esc_html__('This navigation is empty.', 'rundizstrap-companion');
            }
            unset($navigationPost);
            return $output;
        }

        $blocks = parse_blocks($navigationPost->post_content);
        $items = BootstrapNavbarNavigationWalker::buildItemsFromBlocks($blocks);
        $items = BootstrapNavbarNavigationWalker::flattenToTwoLevels($items);
        $items = BootstrapNavbarNavigationWalker::markActive($items);

        if (empty($items)) {
            if ($isBlockEditor) {
                $output .= esc_html__('This navigation is empty.', 'rundizstrap-companion');
            }
            if (defined('WP_DEBUG') && WP_DEBUG === true) {
                // if enabled debug.
                // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                $output .= PHP_EOL . '    <!-- not found navbar contents at `posts`.`ID` \'' . ($navigationPost->ID ?? '') . '\'.  -->' . PHP_EOL;
            }
            unset($blocks, $items, $navigationPost);
            return $output;
        }

        $className = 'navbar-nav';
        $Sanitize = new Sanitize();
        $sanitizedDataAttributes = rundizstrap_companion_block_bsNavbarNavigation_sanitizeCustomAttributes(
            ($attributes['dataAttributes'] ?? []),
            'data-',
            $Sanitize
        );
        $sanitizedAriaAttributes = rundizstrap_companion_block_bsNavbarNavigation_sanitizeCustomAttributes(
            ($attributes['ariaAttributes'] ?? []),
            'aria-',
            $Sanitize
        );
        $dropdownClassName = (isset($attributes['dropdownClassName']) && is_string($attributes['dropdownClassName']) ? sanitize_text_field($attributes['dropdownClassName']) : '');

        $wrapper_attributes = get_block_wrapper_attributes([
            'class' => $className,
        ]);
        $wrapper_attributes .= BootstrapNavbarNavigationWalker::attributesToString($sanitizedDataAttributes, 'data-');
        $wrapper_attributes .= BootstrapNavbarNavigationWalker::attributesToString($sanitizedAriaAttributes, 'aria-');

        $walker = new BootstrapNavbarNavigationWalker();
        $walker->setDropdownClassName($dropdownClassName);

        $output .= PHP_EOL;// keep new line.
        $output .= sprintf(
            '<ul %1$s>
                %2$s
            </ul>',
            $wrapper_attributes, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            $walker->render($items)// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        );
        $output .= PHP_EOL;// keep new line.

        unset($blocks, $className, $dropdownClassName, $items, $navigationPost, $navigationRef, $sanitizedAriaAttributes, $sanitizedDataAttributes, $Sanitize, $walker, $wrapper_attributes);
        return $output;
    }// rundizstrap_companion_block_bsNavbarNavigation_render
}// endif;


if (!function_exists('rundizstrap_companion_block_bsNavbarNavigation_sanitizeCustomAttributes')) {
    /**
     * Sanitize custom data/aria attributes.
     *
     * @since 0.0.4
     * @param mixed    $attributeValues Custom attributes input.
     * @param string   $attributePrefix Attribute prefix. For example: `data-`, `aria-`.
     * @param Sanitize $Sanitize Sanitize class instance.
     * @return array
     */
    function rundizstrap_companion_block_bsNavbarNavigation_sanitizeCustomAttributes($attributeValues, string $attributePrefix, Sanitize $Sanitize): array
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

            $output[$sanitizedKey] = $Sanitize->attributeValue((string) $value);
        }// endforeach;

        return $output;
    }// rundizstrap_companion_block_bsNavbarNavigation_sanitizeCustomAttributes
}// endif;


// The echo below will be render HTML of navbar navigation.
// It cannot escape HTML or the design will break.
// The input values are already sanitize and escape inside the function above.
// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo rundizstrap_companion_block_bsNavbarNavigation_render(
    ($attributes ?? []),
    ((isset($content) && is_string($content)) ? $content : ''),
    ($block ?? null)
);
