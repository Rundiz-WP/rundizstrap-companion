<?php
/**
 * The manual update for running new version of code.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


namespace BBFSEPlugin\App\Update\Manual;

if (!interface_exists('\\BBFSEPlugin\\App\\Update\\Manual\\ManualUpdateInterface')) {
    interface ManualUpdateInterface
    {


        /**
         * Run the manual update code.
         */
        public function run();


    }
}
