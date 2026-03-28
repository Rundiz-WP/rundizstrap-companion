<?php
/**
 * Bootstrap Basic FSE Plugin - Bootstrap layout column block.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 * @license http://opensource.org/licenses/MIT MIT
 */


namespace RundizstrapCompanion\App\Controllers\Blocks;


if (!class_exists('\\RundizstrapCompanion\\App\\Controllers\\Blocks\\BsColumn')) {
    /**
     * Bootstrap layout column class.
     * 
     * @since 0.0.1
     */
    class BsColumn implements \RundizstrapCompanion\App\Controllers\ControllerInterface
    {


        /**
         * @type string Block folder name.
         */
        private const BLOCK_NAME = 'bs-column';


        /**
         * Register block.
         * 
         * @link https://developer.wordpress.org/reference/functions/register_block_type/ Reference.
         * @since 0.0.1
         */
        public function registerBlock()
        {
            register_block_type(dirname(RUNDIZSTRAP_COMPANION_FILE) . '/blocks/' . static::BLOCK_NAME . '/block.json');
        }// registerBlocks


        /**
         * {@inheritDoc}
         * 
         * @since 0.0.1
         */
        public function registerHooks()
        {
            add_action('init', [$this, 'registerBlock']);
            add_action('wp_enqueue_scripts', [$this, 'setTranslation']);
        }// registerHooks


        /**
         * Set script translation (for JS).
         * 
         * @link https://developer.wordpress.org/reference/functions/wp_set_script_translations/ Reference.
         * @since 0.0.1
         */
        public function setTranslation()
        {
            if (function_exists('wp_set_script_translations')) {
                wp_set_script_translations(
                    'rundizstrap_companion-blocks-' . static::BLOCK_NAME . '-script', 
                    'rundizstrap-companion', 
                    plugin_dir_path(RUNDIZSTRAP_COMPANION_FILE) . 'languages'
                );
            }
        }// setTranslation


    }// BsColumn
}
