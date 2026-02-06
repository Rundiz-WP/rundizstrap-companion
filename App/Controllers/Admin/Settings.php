<?php
/**
 * Add settings sub menu and page into the Settings menu.
 *
 * @package bbfse-plug
 * @since 0.0.1
 */


namespace BBFSEPlug\App\Controllers\Admin;


if (!class_exists('\\BBFSEPlug\\App\\Controllers\\Admin\\Settings')) {
    /**
     * Admin settings page.
     * 
     * @since 0.0.1
     */
    class Settings implements \BBFSEPlug\App\Controllers\ControllerInterface
    {


        use \BBFSEPlug\App\AppTrait;


        /**
         * @var string The current admin page.
         * @since 0.0.1
         */
        private $hookSuffix = '';


        /**
         * Allow code/WordPress to call hook `admin_enqueue_scripts` 
         * then `wp_register_script()`, `wp_localize_script()`, `wp_enqueue_script()` functions will be working fine later.
         * 
         * @link https://wordpress.stackexchange.com/a/76420/41315 Original source code.
         * @since 0.0.1
         */
        public function callEnqueueHook()
        {
            add_action('admin_enqueue_scripts', [$this, 'registerScripts']);
        }// callEnqueueHook


        /**
         * The plugin settings sub menu to go to settings page.
         * 
         * @since 0.0.1
         */
        public function pluginSettingsMenu()
        {
            $hook_suffix = add_options_page(__('BBFSE Plug', 'bbfse-plug'), __('BBFSE Plug', 'bbfse-plug'), 'manage_options', 'bbfse-plug-settings', [$this, 'pluginSettingsPage']);
            if (is_string($hook_suffix)) {
                $this->hookSuffix = $hook_suffix;
                add_action('load-' . $hook_suffix, [$this, 'callEnqueueHook']);
            }
            unset($hook_suffix);
        }// pluginSettingsMenu


        /**
         * Display plugin settings page.
         * 
         * @since 0.0.1
         */
        public function pluginSettingsPage()
        {
            // check permission.
            if (!current_user_can('manage_options')) {
                wp_die(esc_html(__('You do not have permission to access this page.')));
            }

            if (get_transient('bbfse_plug_updated')) {
                if (current_user_can('update_plugins')) {
                    wp_die(
                        sprintf(
                            // translators: %1$s Open link, %2$s Close link.
                            __('The manual update is required, please %1$supdate first%2$s.', 'bbfse-plug'), // phpcs:ignore
                            '<a href="' . esc_attr(network_admin_url('index.php?page=bbfse-plug-manual-update')) . '">', 
                            '</a>'
                        )
                    );
                } else {
                    wp_die(
                        esc_html(
                            __('The manual update is required, please tell administrator to update first.', 'bbfse-plug')
                        )
                    );
                }
            }

            // load config values to get settings config file.
            $Loader = new \BBFSEPlug\App\Libraries\Loader();
            $config_values = $Loader->loadConfig();
            if (is_array($config_values) && array_key_exists('rundiz_settings_config_file', $config_values)) {
                $settings_config_file = $config_values['rundiz_settings_config_file'];
            } else {
                echo 'Settings configuration file was not set.';
                exit(1);
            }
            unset($config_values);

            $RundizSettings = new \BBFSEPlug\App\Libraries\RundizSettings();
            $RundizSettings->settings_config_file = $settings_config_file;

            $options_values = $this->getOptions();
            $output = [];

            // if form submitted
            if (isset($_POST) && !empty($_POST)) {
                $wpnonce = '';
                if (isset($_POST['_wpnonce'])) {
                    $wpnonce = sanitize_text_field(wp_unslash($_POST['_wpnonce']));
                }

                if (!wp_verify_nonce($wpnonce)) {
                    wp_nonce_ays('-1');
                }
                unset($wpnonce);

                // populate form field values.
                $options_values = $RundizSettings->getSubmittedData();

                // you may validate form here first.
                // then save data.
                $output['save_result'] = $this->saveOptions($options_values);

                $output['form_result_class'] = 'notice-success';
                $output['form_result_msg'] = __('Settings saved.');
            }// endif $_POST

            $output['settings_page'] = $RundizSettings->getSettingsPage($options_values);
            unset($RundizSettings, $options_values);

            $Loader->loadView('admin/settings_v', $output);
            unset($Loader, $output);
        }// pluginSettingsPage


        /**
         * {@inheritDoc}
         * 
         * @since 0.0.1
         */
        public function registerHooks()
        {
            add_action('admin_menu', [$this, 'pluginSettingsMenu']);
        }// registerHooks


        /**
         * Enqueue scripts and styles here.
         * 
         * @since 0.0.1
         * @param string $hook_suffix The current admin page.
         */
        public function registerScripts(string $hook_suffix = '')
        {
            if ($hook_suffix !== $this->hookSuffix) {
                return;
            }

            wp_enqueue_style('bbfse-plug-bootstrap-icons');

            wp_enqueue_style('bbfse-plug-handle-rd-settings-based-css');

            wp_enqueue_style('bbfse-plug-handle-rd-settings-tabs-css');
            wp_enqueue_script('bbfse-plug-handle-rd-settings-tabs-js');

            // you can remove some or all of the line below if you don't use it. ---------
            // css & js for code editor.
            wp_enqueue_style('bbfse-plug-handle-rd-settings-ace-editor-css');
            wp_enqueue_script('bbfse-plug-handle-ace-editor-js');
            wp_enqueue_script('bbfse-plug-handle-rd-settings-ace-editor-js');
            // media uploader
            wp_enqueue_style('bbfse-plug-handle-rd-settings-media-css');
            wp_enqueue_script('bbfse-plug-handle-rd-settings-media-js');
        }// registerScripts


    }
}
