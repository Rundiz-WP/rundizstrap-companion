<?php
/**
 * The controller interface.<br>
 * This file contain the interface and required method(s) that is needed to use with auto register controller in the loader library.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


namespace BBFSEPlug\App\Controllers;


if (!interface_exists('\\BBFSEPlug\\App\\Controllers\\ControllerInterface')) {
    /**
     * The controller interface that have required methods to register hooks, and more.<br>
     * Implement this interface only when you want to have hooks into WP core.
     * 
     * @since 0.0.1
     */
    interface ControllerInterface
    {


        /**
         * Register actions, filters that will be hook into WordPress core.
         * 
         * @since 0.0.1
         */
        public function registerHooks();


    }// ControllerInterface
}
