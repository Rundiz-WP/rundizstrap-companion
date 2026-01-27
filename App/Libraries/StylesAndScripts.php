<?php
/**
 * Common styles (CSS) and scripts (JS).
 *
 * @package bbfse-plugin
 * @since 0.0.1
 */


namespace BBFSEPlugin\App\Libraries;

if (!class_exists('\\BBFSEPlugin\\App\\Libraries\\StylesAndScripts')) {
    /**
     * Common use styles (CSS) and scripts (JS) class.
     * 
     * @since 0.0.1
     */
    class StylesAndScripts
    {


        /**
         * Manually register hooks.
         * 
         * @since 0.0.1
         */
        public function manualRegisterHooks()
        {
            // register stylesheets and scripts
            add_action('init', [$this, 'registerStylesAndScripts']);
        }// manualRegisterHooks


        /**
         * Register front-end & admin stylesheets and scripts for common use later.
         *
         * The asset handle name will be added more specific name related to this plugin only to prevent the situation as the example below.  
         * Example:  
         * User has plugin AAA installed with this plugin.  
         * The plugin AAA and this plugin use the same CSS (or JS) with same handle name but the plugin AAA's asset version is older.  
         * The plugin AAA doesn't has CSS class that this plugin has such as `.sattellite-dish-icon`.  
         * This plugin is using `.sattellite-dish-icon` class but this plugin was loaded after plugin AAA, that means the CSS asset from this plugin will not be loaded.  
         * The asset class that this plugin is using will never work.  
         * To prevent this situation, the asset handle name **must** be more specific to the plugin.
         * 
         * The assets that was registered in this method can be enqueue later on any parts including hooks by `enqueue_block_assets`.<br>
         * If not register with something earlier than `wp_enqueue_scripts`, it won't work. So, this method must be hooked by `init` action.
         *
         * @link https://developer.wordpress.org/reference/functions/wp_register_style/ Function reference.
         * @link https://github.com/WordPress/WordPress/blob/master/wp-includes/functions.wp-scripts.php#L187 The register style function called to `_wp_scripts_maybe_doing_it_wrong()`
         * @link https://github.com/WordPress/WordPress/blob/master/wp-includes/functions.wp-scripts.php#L41 The maybe doing it wrong function check that if `init` hook did called then it's work.
         * @since 0.0.1
         */
        public function registerStylesAndScripts()
        {
            // CSS
            wp_register_style('bbfse-plugin-bootstrap-css', plugin_dir_url(BBFSEPLUGIN_FILE) . 'assets/vendor/bootstrap/css/bootstrap.min.css', [], '5.3.8');
            wp_register_style('bbfse-plugin-bootstrap-icons', plugin_dir_url(BBFSEPLUGIN_FILE) . 'assets/vendor/bootstrap-icons/css/bootstrap-icons.min.css', [], '1.13.1');

            // JS
            wp_register_style('bbfse-plugin-bootstrap-js', plugin_dir_url(BBFSEPLUGIN_FILE) . 'assets/vendor/bootstrap/js/bootstrap.bundle.min.js', [], '5.3.8', true);
        }// registerStylesAndScripts


    }
}
