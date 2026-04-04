<?php
/**
 * Upgrader's class view file.
 * 
 * @package rundizstrap-companion
 */


if (!defined('ABSPATH')) {
    exit();
}

?>
<div class="wrap">
    <h1><?php esc_html_e('Manual update', 'rundizstrap-companion'); ?></h1>

    <div class="form-result-placeholder"></div>

    <form method="post">
        <?php wp_nonce_field(); ?> 
        <p><?php printf(
            // translators: %d Number of total actions.
            esc_html__('There are total %d actions for this manual update, please continue step by step.', 'rundizstrap-companion'), 
            count($manualUpdateClasses)
        ); ?></p>
        <p><?php printf(
            /* translators: %1$s The number of already run action, %2$d The number of total actions. */
            esc_html__('You are running %1$s of %2$d.', 'rundizstrap-companion'), 
            '<span class="already-run-total-action">0</span>', 
            count($manualUpdateClasses)
        ); ?></p>
        <button class="button button-primary manual-update-action-button" type="button"><?php esc_html_e('Start', 'rundizstrap-companion'); ?></button> <span class="manual-update-action-placeholder"></span>
    </form>
</div>
