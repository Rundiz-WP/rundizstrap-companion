<?php
/**
 * Activate the plugin action.
 *
 * @package bbfse-plug
 * @since 0.0.1
 */


namespace BBFSEPlug\App\Controllers\Admin\Plugins;


if (!class_exists('\\BBFSEPlug\\App\\Controllers\\Admin\\Plugins\\Activation')) {
    /**
     * Plugin activation and new site activation hooks class.
     * 
     * @since 0.0.1
     */
    class Activation implements \BBFSEPlug\App\Controllers\ControllerInterface
    {


        use \BBFSEPlug\App\AppTrait;


        /**
         * Activate the plugin by admin on WP plugin page.
         *
         * @link https://developer.wordpress.org/reference/functions/register_activation_hook/ The function `register_activation_hook()` reference.
         * @link https://developer.wordpress.org/reference/hooks/activate_plugin/ The reference about what will be pass to callback of function `register_activation_hook()`.
         * @since 0.0.1
         * @global \wpdb $wpdb WordPress DB class.
         * @param bool $network_wide Whether to enable the plugin for all sites in the network or just the current site. Multisite only. Default false.
         */
        public function activate($network_wide)
        {
            // So something that will happens on activate plugin.
            if (version_compare(get_bloginfo('version'), '6.0', '<')) {
                wp_die(
                    sprintf(
                        // translators: %1$s Current WordPress version, %2$s Required WordPress version.
                        esc_html__('Your WordPress version does not meet the minimum requirement. (%1$s < %2$s).', 'bbfse-plug'), 
                        get_bloginfo('version'), // phpcs:ignore
                        '6.0' // phpcs:ignore
                    )
                );
                exit(1);
            }// endif;

            // In case that you do not want to "network activate", remove comments the code below.
            if (is_multisite() && $network_wide) {
                wp_die(esc_html__('Unable to network activate, please activate per site only.', 'bbfse-plug'));
                exit(1);
            }

            // Get `$wpdb` global var.
            global $wpdb;
            $wpdb->show_errors();

            // Add option to site or multisite -----------------------------
            if (is_multisite()) {
                // This site is multisite. Add/update options, create/alter tables on all sites.
                $blog_ids = $wpdb->get_col('SELECT blog_id FROM ' . $wpdb->blogs); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
                $original_blog_id = get_current_blog_id();
                if ($blog_ids) {
                    foreach ($blog_ids as $blog_id) {
                        switch_to_blog($blog_id);
                        $this->activateCreateAlterTables();
                        $this->activateAddUpdateOption();
                    }
                }
                switch_to_blog($original_blog_id);
                unset($blog_id, $blog_ids, $original_blog_id);
            } else {
                // This site is single site. Add/update options, create/alter tables on current site.
                $this->activateCreateAlterTables();
                $this->activateAddUpdateOption();
            }
        }// activate


        /**
         * Check if the options was added before or not, if not then add the options otherwise update them.
         * 
         * @since 0.0.1
         */
        private function activateAddUpdateOption()
        {
            // check current option exists or not.
            $current_options = get_option($this->main_option_name);

            if (false === $current_options) {
                // if this is newly activate. it is never activated before, add the options.
                $this->setupAllOptions();
                $this->saveOptions($this->all_options);
            } elseif (
                is_array($current_options) &&
                array_key_exists('rdsfw_plugin_db_version', $current_options) &&
                version_compare($current_options['rdsfw_plugin_db_version'], ($this->db_version ?? ''), '<')
            ) {
                // if there is db updated. it is just updated because `activateCreateAlterTables()` that is using `dbDelta()` were called before this method.
                // the table structure should already get updated by this.
                // save the new db version.
                $current_options['rdsfw_plugin_db_version'] = $this->db_version;
                $this->saveOptions($current_options);
            }// endif;

            unset($current_options);
        }// activateAddUpdateOption


        /**
         * If there is at least one or more table from `BBFSEPlug\App\Models\PluginDbStructure->get()` method then create or alter using WordPress's `dbDelta()`.
         *
         * @since 0.0.1
         * @global \wpdb $wpdb WordPress DB class.
         */
        private function activateCreateAlterTables()
        {
            $PluginDbStructure = new \BBFSEPlug\App\Models\PluginDbStructure();
            $schemas = $PluginDbStructure->get();
            unset($PluginDbStructure);

            if (is_array($schemas) && !empty($schemas) && !is_null($this->getDbVersion())) {
                global $wpdb;
                // require file that needs for use dbDelta() function.
                require_once ABSPATH . '/wp-admin/includes/upgrade.php';

                foreach ($schemas as $index => $item) {
                    if (isset($item['statement']) && isset($item['tablename'])) {
                        $sql = str_replace('%TABLE%', $item['tablename'], $item['statement']);

                        if (isset($item['is_multisite']) && true === $item['is_multisite']) {
                            // if set to multisite table then it will create prefix_sitenumber_tablename.
                            $prefix = $wpdb->prefix;
                        } else {
                            // if set not to multisite then it will create prefix_tablename.
                            $prefix = $wpdb->base_prefix;
                        }

                        $sql = str_replace('%PREFIX%', $prefix, $sql);
                        dbDelta($sql);
                        unset($sql);

                        if (function_exists('maybe_convert_table_to_utf8mb4')) {
                            maybe_convert_table_to_utf8mb4($prefix . $item['tablename']);
                        }
                        unset($prefix);
                    }
                }// endforeach;
                unset($index, $item);
            }

            unset($schemas);
        }//activateCreateAlterTables


        /**
         * Add/update options and create/alter tables on new site created.
         *
         * This method was called from hook, it must be public and do not call this directly.  
         * On site created, it will be add or update options and create or alter tables even this plugin is not activated on the new site or not network activate.  
         * On delete site or plugin, these options and tables will be removed via `Uninstallation` class.
         *
         * @link https://codex.wordpress.org/Plugin_API/Action_Reference/wpmu_new_blog Previous hook reference that has been deprecated.
         * @link https://developer.wordpress.org/reference/hooks/wp_initialize_site/ Current hook.
         * @link https://developer.wordpress.org/reference/classes/wp_site/ `\WP_Site` reference.
         * @since 0.0.1
         * @param \WP_Site $new_site New site object.
         * @param array $args Arguments for the initialization.
         */
        public function activateNewSite(\WP_Site $new_site, array $args)
        {
            switch_to_blog($new_site->blog_id);

            $this->activateCreateAlterTables();
            $this->activateAddUpdateOption();

            restore_current_blog();
        }// activateNewSite


        /**
         * {@inheritDoc}
         * 
         * @since 0.0.1
         */
        public function registerHooks()
        {
            // register activate hook
            register_activation_hook(BBFSEPLUG_FILE, [$this, 'activate']);

            if (is_multisite()) {
                // hook on create new site (for multisite installation).
                //add_action('wp_initialize_site', [$this, 'activateNewSite'], 10, 2);
            }
        }// registerHooks


    }
}
