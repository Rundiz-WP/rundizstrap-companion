<?php
/**
 * Bootstrap Basic FSE Plugin - Bootstrap pagination block.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 * @license http://opensource.org/licenses/MIT MIT
 */


namespace RundizstrapCompanion\App\Controllers\Blocks;


if (!class_exists('\\RundizstrapCompanion\\App\\Controllers\\Blocks\\BsPagination')) {
    /**
     * Bootstrap pagination class.
     * 
     * @since 0.0.1
     */
    class BsPagination implements \RundizstrapCompanion\App\Controllers\ControllerInterface
    {


        /**
         * @type string Block folder name.
         */
        private const BLOCK_NAME = 'bs-pagination';


        /**
         * Enqueue block assets.
         * 
         * Some CSS that load font use relative path will not work with function `add_editor_style()`.<br>
         * So, it must be enqueue from here.
         * 
         * @link https://developer.wordpress.org/reference/hooks/enqueue_block_assets/ Reference.
         * @since 0.0.1
         */
        public function enqueueBlockAssets()
        {
            if (is_admin()) {
                wp_enqueue_style('rundizstrap_companion-bootstrap-icons');
            }
        }// enqueueBlockAssets


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
            add_action('enqueue_block_assets', [$this, 'enqueueBlockAssets']);
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


    }// BsPagination
}
