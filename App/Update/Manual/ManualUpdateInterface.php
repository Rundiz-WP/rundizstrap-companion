<?php
/**
 * The manual update for running new version of code.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


namespace RundizstrapCompanion\App\Update\Manual;


if (!interface_exists('\\RundizstrapCompanion\\App\\Update\\Manual\\ManualUpdateInterface')) {
    interface ManualUpdateInterface
    {


        /**
         * Run the manual update code.
         */
        public function run();


    }// ManualUpdateInterface
}
