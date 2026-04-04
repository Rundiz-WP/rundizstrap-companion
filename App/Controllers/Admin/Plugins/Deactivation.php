<?php
/**
 * Deactivate the plugin action.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


namespace RundizstrapCompanion\App\Controllers\Admin\Plugins;


if (!class_exists('\\RundizstrapCompanion\\App\\Controllers\\Admin\\Plugins\\Deactivation')) {
    /**
     * Plugin deactivation hook class.
     * 
     * @since 0.0.1
     */
    class Deactivation implements \RundizstrapCompanion\App\Controllers\ControllerInterface
    {


        /**
         * Deactivate the plugin.
         * 
         * @since 0.0.1
         */
        public function deactivate()
        {
            // Currently, there is nothing to do here.
        }// deactivate


        /**
         * {@inheritDoc}
         * 
         * @since 0.0.1
         */
        public function registerHooks()
        {
            // register deactivate hook
            register_deactivation_hook(RUNDIZSTRAP_COMPANION_FILE, [$this, 'deactivate']);
        }// registerHooks


    }// Deactivation
}
