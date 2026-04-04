<?php
/**
 * Common styles (CSS) and scripts (JS).
 *
 * @package rundizstrap-companion
 * @since 0.0.1
 */


namespace RundizstrapCompanion\App\Libraries;


if (!class_exists('\\RundizstrapCompanion\\App\\Libraries\\StylesAndScripts')) {
    /**
     * Common use styles (CSS) and scripts (JS) class.
     * 
     * @since 0.0.1
     */
    class StylesAndScripts
    {


        use \RundizstrapCompanion\App\AppTrait;


        /**
         * Enqueue styles and scripts.
         *
         * @since 0.0.1
         * @return void
         */
        public function enqueueStylesAndScripts()
        {
            $this->getOptions();
            global $rundizstrap_companion_optname;
            if (isset($rundizstrap_companion_optname['rundizstrap_companion_enqueue_assets']) && '1' !== strval($rundizstrap_companion_optname['rundizstrap_companion_enqueue_assets'])) {
                // if setting was set to not enqueue.
                return;
            }

            /**
             * Filter that this plugin should enqueue Bootstrap CSS, icons, JS or not.
             * 
             * @since 0.0.1
             * @param bool $enqueueStylesScripts Mark `true` to enqueue them, `false` to do not enqueue.
             */
            $enqueueStylesScripts = apply_filters('rundizstrap_companion_enqueue_styles_scripts', true);
            if (true === $enqueueStylesScripts) {
                wp_enqueue_style('rundizstrap_companion-bootstrap-css');
                wp_enqueue_style('rundizstrap_companion-bootstrap-icons');
                wp_enqueue_script('rundizstrap_companion-bootstrap-js');
            }
            unset($enqueueStylesScripts);
        }// enqueueStylesAndScripts


        /**
         * Manually register hooks.
         * 
         * @since 0.0.1
         */
        public function manualRegisterHooks()
        {
            // register stylesheets and scripts
            add_action('init', [$this, 'registerStylesAndScripts']);
            add_action('init', [$this, 'registerAdminStylesAndScripts']);
            add_action('wp_enqueue_scripts', [$this, 'enqueueStylesAndScripts']);
        }// manualRegisterHooks


        /**
         * Register admin styles and scripts.
         * 
         * Use for register only, do not enqueue here.
         *
         * The asset handle name will be added more specific name related to this plugin only to prevent the situation as the example below.  
         * Example:  
         * User has plugin AAA installed with this plugin.  
         * The plugin AAA and this plugin use the same CSS (or JS) with same handle name but the plugin AAA's asset version is older.  
         * The plugin AAA doesn't has CSS class that this plugin have such as `.sattellite-dish-icon`.  
         * This plugin is using `.sattellite-dish-icon` class but this plugin was loaded after plugin AAA, that means the CSS asset from this plugin will not be loaded.  
         * The asset class that this plugin is using will never work.  
         * To prevent this situation, the asset handle name **must** be more specific to the plugin.
         *
         * @link https://developer.wordpress.org/reference/functions/wp_register_style/ Function reference.
         * @link https://github.com/WordPress/WordPress/blob/master/wp-includes/functions.wp-scripts.php The register style function `wp_add_inline_script` make a called to `_wp_scripts_maybe_doing_it_wrong()`.  
         *              The maybe doing it wrong function check that if `init` hook did called then it's work.
         */
        public function registerAdminStylesAndScripts()
        {
            if (is_admin()) {
                // common admin scripts
                wp_register_script('rundizstrap_companion-handle-admin-common-js', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/js/Admin/common.js', [], RUNDIZSTRAP_COMPANION_VERSION, true);
                // rundiz settings based styles
                wp_register_style('rundizstrap_companion-handle-rd-settings-based-css', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/css/Admin/rd-settings-based.css', [], RUNDIZSTRAP_COMPANION_VERSION);

                // rundiz settings tabs
                wp_register_style('rundizstrap_companion-handle-rd-settings-tabs-css', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/css/Admin/rd-settings-tabs.css', [], RUNDIZSTRAP_COMPANION_VERSION);
                wp_register_script('rundizstrap_companion-handle-rd-settings-tabs-js', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/js/Admin/rd-settings-tabs.js', [], RUNDIZSTRAP_COMPANION_VERSION, true);

                // manual update
                wp_register_script(
                    'rundizstrap_companion-handle-rd-settings-manual-update', 
                    plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/js/Admin/rd-settings-manual-update.js', 
                    ['rundizstrap_companion-handle-admin-common-js'], 
                    RUNDIZSTRAP_COMPANION_VERSION, 
                    true
                );

                // you can remove some or all of the line below if you don't use it. ---------
                // ace editor (code editor)
                wp_register_style('rundizstrap_companion-handle-rd-settings-ace-editor-css', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/css/Admin/rd-settings-ace-editor.css', [], RUNDIZSTRAP_COMPANION_VERSION);
                wp_register_script('rundizstrap_companion-handle-ace-editor-js', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/vendor/ace/ace.js', [], '1.43.6', false);
                wp_register_script('rundizstrap_companion-handle-rd-settings-ace-editor-js', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/js/Admin/rd-settings-ace-editor.js', ['rundizstrap_companion-handle-ace-editor-js'], RUNDIZSTRAP_COMPANION_VERSION, true);

                // media uploader
                wp_register_style('rundizstrap_companion-handle-rd-settings-media-css', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/css/Admin/rd-settings-media.css', [], RUNDIZSTRAP_COMPANION_VERSION);
                wp_register_script('rundizstrap_companion-handle-rd-settings-media-js', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/js/Admin/rd-settings-media.js', [], RUNDIZSTRAP_COMPANION_VERSION, true);
            }// endif;
        }// registerAdminStylesAndScripts


        /**
         * Register front-end & admin stylesheets and scripts for common use later.
         * 
         * Use for register only, do not enqueue here.
         *
         * Use more specific asset handle name. To see more description please read on `registerAdminStylesAndScripts()` method.
         *
         * @see \RundizstrapCompanion\App\Libraries\StylesAndScripts::registerAdminStylesAndScripts() For more details.
         */
        public function registerStylesAndScripts()
        {
            // CSS
            wp_register_style('rundizstrap_companion-bootstrap-css', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/vendor/bootstrap/css/bootstrap.min.css', [], '5.3.8');
            wp_register_style('rundizstrap_companion-bootstrap-icons', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/vendor/bootstrap-icons/css/bootstrap-icons.min.css', [], '1.13.1');

            // JS
            wp_register_script('rundizstrap_companion-bootstrap-js', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/vendor/bootstrap/js/bootstrap.bundle.min.js', [], '5.3.8', true);
        }// registerStylesAndScripts


    }// StylesAndScripts
}
