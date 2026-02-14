<?php
/**
 * Plugin help page.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


namespace BBFSEPlug\App\Controllers\Admin\Appearance;


if (!class_exists('\\BBFSEPlug\\App\\Controllers\\Admin\\Appearance\\PluginHelp')) {
    /**
     * Plugin help class.
     * 
     * @since 0.0.1
     */
    class PluginHelp implements \BBFSEPlug\App\Controllers\ControllerInterface
    {


        /**
         * @var string The current admin page.
         * @since 0.0.1
         */
        private $hookSuffix = '';


        /**
         * The plugin help sub menu.
         *
         * @since 0.0.1
         */
        public function setupHelpMenu()
        {
            $hook_suffix = add_theme_page(__('BBFSE Plug help', 'rundizstrap-companion'), __('BBFSE Plug help', 'rundizstrap-companion'), 'edit_theme_options', 'rundizstrap-companion-help', [$this, 'displayHelpPage']);
            if (is_string($hook_suffix)) {
                $this->hookSuffix = $hook_suffix;
                add_action('load-' . $hook_suffix, [$this, 'callEnqueueHook']);
            }
            unset($hook_suffix);
        }// setupHelpMenu


        /**
         * Display help page.
         *
         * @since 0.0.1
         */
        public function displayHelpPage()
        {
            $Loader = new \BBFSEPlug\App\Libraries\Loader();
            $Loader->loadView('admin/Appearance/pluginHelp_v');
            unset($Loader);
        }// displayHelpPage


        /**
         * Allow code/WordPress to call hook `admin_enqueue_scripts`
         * 
         * @link https://wordpress.stackexchange.com/a/76420/41315 Reference.
         * @since 0.0.1
         */
        public function callEnqueueHook()
        {
            add_action('admin_enqueue_scripts', [$this, 'enqueueStylesScripts']);
        }// callEnqueueHook


        /**
         * Enqueue scripts and styles here.
         * 
         * @since 0.0.1
         * @param string $hook_suffix The current admin page.
         */
        public function enqueueStylesScripts(string $hook_suffix = '')
        {
            if ($hook_suffix !== $this->hookSuffix) {
                return;
            }

            wp_enqueue_style('rundizstrap-companion-handle-rd-settings-tabs-css');
            wp_enqueue_script('rundizstrap-companion-handle-rd-settings-tabs-js');
        }// enqueueStylesScripts


        /**
         * {@inheritDoc}
         * 
         * @since 0.0.1
         */
        public function registerHooks()
        {
            add_action('admin_menu', [$this, 'setupHelpMenu']);
        }// registerHooks


    }// PluginHelp
}
