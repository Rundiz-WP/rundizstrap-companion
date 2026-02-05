<?php
/**
 * Render contents for Bootstrap navbar navigation block.
 * 
 * @package bbfse-plug
 * @since 0.0.1
 * 
 * phpcs:disable Squiz.Commenting.BlockComment.NoNewLine
 */


if (!defined('ABSPATH')) {
    exit();
}


/* @var $attributes array Block attributes. */
/* @var $content string Block default content. */
/* @var $block \WP_Block Block instance. */

use BBFSEPlug\App\Libraries\BootstrapNavbarNavigationWalker;

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
        esc_html_e('This navigation is empty.', 'bbfse-plug');
    }
    unset($navigationPost);
    return;
}

$blocks = parse_blocks($navigationPost->post_content);
$items = BootstrapNavbarNavigationWalker::buildItemsFromBlocks($blocks);
$items = BootstrapNavbarNavigationWalker::flattenToTwoLevels($items);
$items = BootstrapNavbarNavigationWalker::markActive($items);

if (empty($items)) {
    if ($isBlockEditor) {
        esc_html_e('This navigation is empty.', 'bbfse-plug');
    }
    if (defined('WP_DEBUG') && WP_DEBUG === true) {
        // if enabled debug.
        // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo PHP_EOL . '    <!-- not found navbar contents at `posts`.`ID` \'' . ($navigationPost->ID ?? '') . '\'.  -->' . PHP_EOL;
    }
    unset($blocks, $items, $navigationPost);
    return;
}

$className = 'navbar-nav';

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => $className,
]);
$wrapper_attributes .= BootstrapNavbarNavigationWalker::attributesToString(($attributes['dataAttributes'] ?? []), 'data-');
$wrapper_attributes .= BootstrapNavbarNavigationWalker::attributesToString(($attributes['ariaAttributes'] ?? []), 'aria-');

$walker = new BootstrapNavbarNavigationWalker();
$walker->setDropdownClassName(($attributes['dropdownClassName'] ?? ''));

echo PHP_EOL;// keep new line.
printf(
    '<ul %1$s>
        %2$s
    </ul>',
    $wrapper_attributes, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    $walker->render($items)// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
);
echo PHP_EOL;// keep new line.

unset($blocks, $className, $items, $navigationPost, $navigationRef, $walker, $wrapper_attributes);
