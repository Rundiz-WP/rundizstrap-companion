<?php
/**
 * Read setting's view file.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


if (!defined('ABSPATH')) {
    exit();
}
?>
<div class="wrap">
    <h1><?php esc_html_e('Example of how to access settings values in option db.', 'rundizstrap-companionp-companionp-companion'); ?></h1>

    <ol>
        <li><?php printf(
            // translators: %s PHP code.
            __('Call to %s', 'rundizstrap-companion'), // phpcs:ignore
            '<code>$this->getOptions();</code>'
        ); ?></li>
        <li><?php printf(
            // translators: %s PHP code.
            __('Access this variable as global %s. This variable will be change, up to config in AppTrait.', 'rundizstrap-companion'), // phpcs:ignore
            '<code>global $bbfse_plug_optname;</code>'
        ); ?></li>
        <li><?php esc_html_e('Now, you can use this variable to access its array key anywhere.', 'rundizstrap-companion'); ?></li>
    </ol>
    <h3>Example: <code>print_r($bbfse_plug_optname);</code></h3>
    <pre style="background-color: #333; border: 1px solid #ccc; color: #ddd; height: 500px; overflow: auto; padding: 10px;"><?php 
    if (isset($bbfse_plug_optname)) {
        echo esc_html(print_r($bbfse_plug_optname, true)); // phpcs:ignore WordPress.PHP.DevelopmentFunctions
    }
    ?></pre>
</div>