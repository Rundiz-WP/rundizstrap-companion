<?php
/**
 * Setting's view file.
 * 
 * @package rundizstrap-companion
 */


if (!defined('ABSPATH')) {
    exit();
}

?>
<div class="wrap rd-settings-page">
    <h1><?php esc_html_e('RundizStrap Companion settings', 'rundizstrap-companion'); ?></h1>

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
        <p><?php echo esc_html($form_result_msg); ?></p>
    </div>
    <?php // phpcs:ignore Generic.WhiteSpace.ScopeIndent.Incorrect
    }
    ?> 

    <form method="post">
        <?php 
        wp_nonce_field(); 
        if (isset($settings_page)) {
            if (!is_file(dirname(__DIR__, 2) . '/config/kses_data.php')) {
                throw new \Exception(esc_html('The file ' . dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'kses_data.php could not be found.'));
            }
            echo wp_kses($settings_page, include dirname(__DIR__, 2) . '/config/kses_data.php');
        } 
        submit_button(); 
        ?> 
    </form>
</div><!--.wrap .rd-settings-page-->