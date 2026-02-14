<?php
/**
 * Main app class. Extend this class if you want to use any method of this class.
 *
 * @package rundizstrap-companion
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
         * Run the WP plugin app.
         * 
         * @since 0.0.1
         */
        public function run()
        {
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
