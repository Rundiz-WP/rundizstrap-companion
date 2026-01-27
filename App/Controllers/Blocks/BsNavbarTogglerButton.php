<?php
/**
 * Bootstrap Basic FSE Plugin - Bootstrap navbar toggler button block.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 * @license http://opensource.org/licenses/MIT MIT
 */


namespace BBFSEPlugin\App\Controllers\Blocks;


if (!class_exists('\\BBFSEPlugin\\App\\Controllers\\Blocks\\BsNavbarTogglerButton')) {
    /**
     * Bootstrap navbar toggler button class.
     * 
     * @since 0.0.1
     */
    class BsNavbarTogglerButton implements \BBFSEPlugin\App\Controllers\ControllerInterface
    {


        /**
         * @type string Block folder name.
         */
        private const BLOCK_NAME = 'bs-navbar-toggler-button';


        /**
         * Register block.
         * 
         * @link https://developer.wordpress.org/reference/functions/register_block_type/ Reference.
         * @since 0.0.1
         */
        public function registerBlock()
        {
            register_block_type(dirname(BBFSEPLUGIN_FILE) . '/blocks/' . static::BLOCK_NAME . '/block.json');
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
                    'bbfse-plugin-blocks-' . static::BLOCK_NAME . '-script',
                    'bbfse-plugin',
                    plugin_dir_path(BBFSEPLUGIN_FILE) . 'languages'
                );
            }
        }// setTranslation


    }// BsNavbarTogglerButton
}