<?php
/**
 * Plugin help page.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


if (!defined('ABSPATH')) {
    exit();
}

?>
<div class="wrap rundizstrap-companion-appearance-help">
    <h1><?php esc_html_e('BBFSE Plug help', 'rundizstrap-companion'); ?></h1>
    <p><?php esc_html_e('Help page for Bootstrap Basic FSE Plugin.', 'rundizstrap-companion'); ?></p>

    <div class="rd-settings-tabs tabs-vertical">
        <ul class="tab-pane">
            <li><a href="#tabs-01"><span class="tab-text"><?php esc_html_e('Navbar', 'rundizstrap-companion'); ?></span></a></li>
            <?php
            /**
             * Setup help tab pane in the "BBFSE Plug" plugin help page.
             * 
             * @since 0.0.1
             * @param array $tabPanes The associative array of tab panes 
             *              where key is unique name (use alpha-numeric, dash, underscore only) 
             *              and value is tab name.
             */
            $bbfsePluginAdditionalTabs = apply_filters('bbfse_plug_help_tabpane', []);
            if (is_array($bbfsePluginAdditionalTabs) || is_iterable($bbfsePluginAdditionalTabs)) {
                foreach ($bbfsePluginAdditionalTabs as $bbfsePlugKey => $bbfsePlugValue) {
                    echo '<li>';
                    echo '<a href="#' . sanitize_html_class($bbfsePlugKey) . '">';
                    echo '<span class="tab-text">' . esc_html($bbfsePlugValue) . '</span>';
                    echo '</a>';
                    echo '</li>' . PHP_EOL;
                }// endforeach;
                unset($bbfsePlugKey, $bbfsePlugValue);
            }// endif; $bbfsePluginAdditionalTabs
            ?> 
        </ul>
        <div class="tab-content">
            <div id="tabs-01">
                <p><?php esc_html_e('The navbar consists of 4 parts.', 'rundizstrap-companion'); ?></p>
                <ol>
                    <li><?php esc_html_e('Bootstrap navbar container', 'rundizstrap-companion'); ?></li>
                    <li><?php esc_html_e('Bootstrap navbar toggler button', 'rundizstrap-companion'); ?></li>
                    <li><?php esc_html_e('Bootstrap navbar responsive wrapper', 'rundizstrap-companion'); ?></li>
                    <li><?php esc_html_e('Bootstrap navbar navigation', 'rundizstrap-companion'); ?></li>
                </ol>
                <p><?php esc_html_e('Please note that not all WordPress core blocks are supported in Bootstrap navbar.', 'rundizstrap-companion'); ?></p>

                <h2><?php esc_html_e('Navbar brand', 'rundizstrap-companion'); ?></h2>
                <p><?php 
                printf(
                    /* translators: %1$s navbar-brand class. */
                    esc_html__('To use %1$s, you can use WordPress core row block and add class %1$s to it. Then you can add site logo, site title into row.', 'rundizstrap-companion'),
                    '<code>navbar-brand</code>'
                ); 
                ?></p>

                <h2><?php esc_html_e('Navbar dropdown', 'rundizstrap-companion'); ?></h2>
                <p><?php 
                printf(
                    /* translators: %1$s link value (#). */
                    esc_html__('To use dropdown menu, in manage navigation page, add submenu block and enter %1$s as link, set dropdown parent menu text.', 'rundizstrap-companion'),
                    '<code>#</code>'
                );
                echo ' ';
                esc_html_e('The parent item of dropdown menu cannot link to anywhere due to it is Bootstrap feature.', 'rundizstrap-companion');
                ?></p>
                <p><?php 
                printf(
                    /* translators: %1$s dropdown divider class. */
                    esc_html__('To use dropdown menu divider, add class %1$s to sub menu item in manage navigation page.', 'rundizstrap-companion'),
                    '<code>dropdown-divider</code>'
                ); 
                ?></p>
                <p><?php 
                printf(
                    /* translators: %1$s dropdown header class. */
                    esc_html__('To use dropdown menu header, add class %1$s to sub menu item in manage navigation page.', 'rundizstrap-companion'),
                    '<code>dropdown-header</code>'
                ); 
                ?></p>
            </div><!-- #tabs-01 -->
            <?php
            if (is_array($bbfsePluginAdditionalTabs) || is_iterable($bbfsePluginAdditionalTabs)) {
                foreach ($bbfsePluginAdditionalTabs as $bbfsePlugKey => $bbfsePlugValue) {
                    echo '<div id="' . sanitize_html_class($bbfsePlugKey) . '">' . PHP_EOL;
                    /**
                     * Display help tab content in the "BBFSE Plug" plugin help page.
                     * 
                     * If your defined tab pane array key is `my_plugin_help_tab_01`
                     * then the hook can be `bbfse_plug_help_tabcontent_my_plugin_help_tab_01`.
                     * 
                     * @since 0.0.1
                     */
                    do_action('bbfse_plug_help_tabcontent_' . $bbfsePlugKey);
                    echo PHP_EOL;
                    echo '</div>' . PHP_EOL;
                }// endforeach;
                unset($bbfsePlugKey, $bbfsePlugValue);
            }// endif; $bbfsePluginAdditionalTabs
            unset($bbfsePluginAdditionalTabs);
            ?> 
        </div><!-- .tab-content -->
    </div><!-- .rd-settings-tabs -->
</div><!-- .wrap -->