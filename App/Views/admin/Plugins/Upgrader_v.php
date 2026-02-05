<?php
/**
 * Upgrader's class view file.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


?>
<div class="wrap">
    <h1><?php esc_html_e('Manual update', 'bbfse-plugin'); ?></h1>

    <div class="form-result-placeholder"></div>

    <form method="post">
        <?php wp_nonce_field(); ?> 
        <p><?php printf(
            // translators: %d Number of total actions.
            esc_html(__('There are total %d actions for this manual update, please continue step by step.', 'bbfse-plugin')), 
            count($manualUpdateClasses) // phpcs:ignore
        ); ?></p>
        <p><?php printf(
            /* translators: %1$s The number of already run action, %2$d The number of total actions. */
            esc_html(__('You are running %1$s of %2$d.', 'bbfse-plugin')), 
            '<span class="already-run-total-action">0</span>', 
            count($manualUpdateClasses) // phpcs:ignore
        ); ?></p>
        <button class="button button-primary manual-update-action-button" type="button"><?php esc_html_e('Start', 'bbfse-plugin'); ?></button> <span class="manual-update-action-placeholder"></span>
    </form>
</div>


<script>
    var manualUpdateClasses = <?php 
    if (isset($manualUpdateClasses)) {
        echo wp_json_encode($manualUpdateClasses);
    }
    ?>;
</script>