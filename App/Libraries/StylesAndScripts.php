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
         * Enqueue admin styles and scripts.
         *
         * @since 0.0.1
         * @return void
         */
        public function enqueueAdminStylesAndScripts()
        {
            // rundiz settings based styles
            wp_register_style('rundizstrap_companion-handle-rd-settings-based-css', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/css/Admin/rd-settings-based.css', [], RUNDIZSTRAP_COMPANION_VERSION);

            // rundiz settings tabs
            wp_register_style('rundizstrap_companion-handle-rd-settings-tabs-css', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/css/Admin/rd-settings-tabs.css', [], RUNDIZSTRAP_COMPANION_VERSION);
            wp_register_script('rundizstrap_companion-handle-rd-settings-tabs-js', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/js/Admin/rd-settings-tabs.js', [], RUNDIZSTRAP_COMPANION_VERSION, true);

            // manual update
            wp_register_script('rundizstrap_companion-handle-rd-settings-manual-update', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/js/Admin/rd-settings-manual-update.js', ['jquery'], RUNDIZSTRAP_COMPANION_VERSION, true);

            // you can remove some or all of the line below if you don't use it. ---------
            // ace editor (code editor)
            wp_register_style('rundizstrap_companion-handle-rd-settings-ace-editor-css', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/css/Admin/rd-settings-ace-editor.css', [], RUNDIZSTRAP_COMPANION_VERSION);
            wp_register_script('rundizstrap_companion-handle-ace-editor-js', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/vendor/ace/ace.js', ['jquery'], '1.39.1-minnoconflict', false);
            wp_register_script('rundizstrap_companion-handle-rd-settings-ace-editor-js', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/js/Admin/rd-settings-ace-editor.js', ['rundizstrap_companion-handle-ace-editor-js'], RUNDIZSTRAP_COMPANION_VERSION, true);

            // media uploader
            wp_register_style('rundizstrap_companion-handle-rd-settings-media-css', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/css/Admin/rd-settings-media.css', [], RUNDIZSTRAP_COMPANION_VERSION);
            wp_register_script('rundizstrap_companion-handle-rd-settings-media-js', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/js/Admin/rd-settings-media.js', [], RUNDIZSTRAP_COMPANION_VERSION, true);
        }// enqueueAdminStylesAndScripts


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
            add_action('admin_enqueue_scripts', [$this, 'enqueueAdminStylesAndScripts']);
            add_action('wp_enqueue_scripts', [$this, 'enqueueStylesAndScripts']);
        }// manualRegisterHooks


        /**
         * Register front-end & admin stylesheets and scripts for common use later.
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
            wp_register_style('rundizstrap_companion-bootstrap-css', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/vendor/bootstrap/css/bootstrap.min.css', [], '5.3.8');
            wp_register_style('rundizstrap_companion-bootstrap-icons', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/vendor/bootstrap-icons/css/bootstrap-icons.min.css', [], '1.13.1');

            // JS
            wp_register_script('rundizstrap_companion-bootstrap-js', plugin_dir_url(RUNDIZSTRAP_COMPANION_FILE) . 'assets/vendor/bootstrap/js/bootstrap.bundle.min.js', [], '5.3.8', true);
        }// registerStylesAndScripts


    }
}
