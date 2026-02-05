<?php
/**
 * Main app class. Extend this class if you want to use any method of this class.
 *
 * @package bbfse-plug
 * @since 0.0.1
 */


namespace BBFSEPlug\App;


if (!class_exists('\\BBFSEPlug\\App\\App')) {
    /**
     * Plugin application main entry class.
     * 
     * @since 0.0.1
     */
    class App
    {


        /**
         * Load text domain. (Language files)
         * 
         * @since 0.0.1
         */
        public function loadLanguage()
        {
            load_plugin_textdomain('bbfse-plug', false, dirname(plugin_basename(BBFSEPLUG_FILE)) . '/languages/');
        }// loadLanguage


        /**
         * Run the WP plugin app.
         * 
         * @since 0.0.1
         */
        public function run()
        {
            add_action('init', function () {
                // @link https://codex.wordpress.org/Function_Reference/load_plugin_textdomain Reference.
                // load language of this plugin.
                $this->loadLanguage();
            });

            // class(es)/method(s) that must be called before auto register. ----------------------
            $StylesAndScripts = new Libraries\StylesAndScripts();
            $StylesAndScripts->manualRegisterHooks();
            unset($StylesAndScripts);
            // end class(es)/method(s) that must be called before auto register. ------------------

            $Loader = new Libraries\Loader();
            $Loader->autoRegisterControllers();
            unset($Loader);
        }// run


    }// App
}
