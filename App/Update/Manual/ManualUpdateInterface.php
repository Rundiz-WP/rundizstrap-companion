<?php
/**
 * The manual update for running new version of code.
 * 
 * @package bbfse-plug
 * @since 0.0.1
 */


namespace BBFSEPlug\App\Update\Manual;

if (!interface_exists('\\BBFSEPlug\\App\\Update\\Manual\\ManualUpdateInterface')) {
    interface ManualUpdateInterface
    {


        /**
         * Run the manual update code.
         */
        public function run();


    }
}
