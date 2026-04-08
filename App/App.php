<?php
/**
 * Main app class. Extend this class if you want to use any method of this class.
 *
 * @package rundizstrap-companion
 * @since 0.0.1
 */


namespace RundizstrapCompanion\App;


if (!defined('ABSPATH')) {
    exit();
}


if (!class_exists('\\RundizstrapCompanion\\App\\App')) {
    /**
     * Plugin application main entry class.
     * 
     * @since 0.0.1
     */
    class App
    {


        /**
         * Run the WP plugin app.
         * 
         * @since 0.0.1
         */
        public function run()
        {
            // Any method that must be called before auto register controllers must be manually write it down here, below this line.
            $StylesAndScripts = new Libraries\StylesAndScripts();
            $StylesAndScripts->manualRegisterHooks();
            unset($StylesAndScripts);

            // Initialize the loader class.
            $Loader = new Libraries\Loader();
            $Loader->autoRegisterControllers();
            unset($Loader);
        }// run


    }// App
}
