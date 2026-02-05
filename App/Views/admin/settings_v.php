<?php
/**
 * Setting's view file.
 * 
 * @package bbfse-plug
 * @since 0.0.1
 */


if (!defined('ABSPATH')) {
    exit();
}

?>
<div class="wrap rd-settings-page">
    <h1><?php esc_html_e('Bootstrap Basic FSE Plugin settings', 'bbfse-plug'); ?></h1>

    <?php 
    if (isset($form_result_class) && isset($form_result_msg)) {
        // phpcs:ignore Squiz.PHP.CommentedOutCode.Found
        /*
        $args = [
            'dismissible' => true,
            'type' => (stripos($form_result_class, 'success') !== false ? 'success' : 'warning'),
        ];
        wp_admin_notice($form_result_msg, $args);
        unset($args);
        */
        // Use normal HTML below is no need `.notice-dismiss` button because it will be append automatically by WordPress's JS.
        // phpcs:ignore Generic.WhiteSpace.ScopeIndent.IncorrectExact
    ?> 
    <div class="notice is-dismissible <?php echo esc_attr($form_result_class); ?>">
        <p><?php echo $form_result_msg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
    </div>
    <?php // phpcs:ignore Generic.WhiteSpace.ScopeIndent.Incorrect
    }
    ?> 

    <form method="post">
        <?php 
        wp_nonce_field(); 
        if (isset($settings_page)) {
            echo $settings_page; // phpcs:ignore
        } 
        submit_button(); 
        ?> 
    </form>
</div><!--.wrap .rd-settings-page-->