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


use BBFSEPlug\App\Libraries\BootstrapNavbarNavigationWalker;

if (!function_exists('bbfse_plug_block_bsNavbarNavigation_render')) {
    /**
     * Render contents for Bootstrap navbar navigation block.
     *
     * @since 0.0.1
     * @param array  $attributes Block attributes.
     * @param string $content Block default content.
     * @param mixed  $block Block instance.
     * @return string
     */
    function bbfse_plug_block_bsNavbarNavigation_render(array $attributes, string $content = '', $block = null): string
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

        $wrapper_attributes = get_block_wrapper_attributes([
            'class' => $className,
        ]);
        $wrapper_attributes .= BootstrapNavbarNavigationWalker::attributesToString(($attributes['dataAttributes'] ?? []), 'data-');
        $wrapper_attributes .= BootstrapNavbarNavigationWalker::attributesToString(($attributes['ariaAttributes'] ?? []), 'aria-');

        $walker = new BootstrapNavbarNavigationWalker();
        $walker->setDropdownClassName(($attributes['dropdownClassName'] ?? ''));

        $output .= PHP_EOL;// keep new line.
        $output .= sprintf(
            '<ul %1$s>
                %2$s
            </ul>',
            $wrapper_attributes, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            $walker->render($items)// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        );
        $output .= PHP_EOL;// keep new line.

        unset($blocks, $className, $items, $navigationPost, $navigationRef, $walker, $wrapper_attributes);
        return $output;
    }// bbfse_plug_block_bsNavbarNavigation_render
}// endif;

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo bbfse_plug_block_bsNavbarNavigation_render(
    ($attributes ?? []),
    ((isset($content) && is_string($content)) ? $content : ''),
    ($block ?? null)
);
