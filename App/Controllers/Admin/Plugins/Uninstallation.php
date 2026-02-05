<?php
/**
 * Uninstall or delete the plugin.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


namespace BBFSEPlugin\App\Controllers\Admin\Plugins;

if (!class_exists('\\BBFSEPlugin\\App\\Controllers\\Admin\\Plugins\\Uninstallation')) {
    /**
     * Plugin uninstallation and site deletion (hard delete) hooks class.
     * 
     * @since 0.0.1
     */
    class Uninstallation implements \BBFSEPlugin\App\Controllers\ControllerInterface
    {


        use \BBFSEPlugin\App\AppTrait;


        /**
         * Get `main_option_name` property from trait which is non-static from any static method.
         * 
         * @since 0.0.1
         * @return string Return main option name of this plugin. See `main_option_name` property for more info.
         */
        private static function getMainOptionName(): string
        {
            $class = new self();
            return $class->main_option_name;
        }// getMainOptionName


        /**
         * {@inheritDoc}
         * 
         * @since 0.0.1
         */
        public function registerHooks()
        {
            // register uninstall hook. MUST be static method or function.
            register_uninstall_hook(BBFSEPLUGIN_FILE, ['\\BBFSEPlugin\\App\\Controllers\\Admin\\Plugins\\Uninstallation', 'uninstall']);

            if (is_multisite()) {
                // hook on deleted site.
                add_action('wp_delete_site', [$this, 'uninstallDeleteSite'], 10, 1);
            }
        }// registerHooks


        /**
         * Uninstall or delete the plugin.
         * 
         * @since 0.0.1
         * @global \wpdb $wpdb
         */
        public static function uninstall()
        {
            // do something that will be happens on delete plugin.
            global $wpdb;
            $wpdb->show_errors();

            // delete options.
            if (is_multisite()) {
                // this is multi site, delete options in all sites.
                $blog_ids = $wpdb->get_col('SELECT blog_id FROM ' . $wpdb->blogs); // phpcs:ignore
                $original_blog_id = get_current_blog_id();
                if ($blog_ids) {
                    foreach ($blog_ids as $blog_id) {
                        switch_to_blog($blog_id);
                        static::uninstallDeleteOption();
                        static::uninstallDropTables();
                    }
                }
                switch_to_blog($original_blog_id);
                unset($blog_id, $blog_ids, $original_blog_id);
            } else {
                // this is single site, delete options in single site.
                static::uninstallDeleteOption();
                static::uninstallDropTables();
            }
        }// uninstall


        /**
         * Delete option on the switched to site.
         * 
         * @since 0.0.1
         */
        private static function uninstallDeleteOption()
        {
            delete_option(static::getMainOptionName());
        }// uninstallDeleteOption


        /**
         * Drop tables on deleted site.
         * 
         *  This method was called from hook, it must be public and do not call this directly.
         * 
         * @link https://developer.wordpress.org/reference/hooks/deleted_blog/ Previous hook reference that has been deprecated.
         * @link https://developer.wordpress.org/reference/hooks/wp_delete_site/ Current hook.
         * @since 0.0.1
         * @param \WP_Site $old_site ID of the site that should be deleted.
         */
        public function uninstallDeleteSite(\WP_Site $old_site)
        {
            switch_to_blog((int) $old_site->blog_id);

            static::uninstallDropTables(false);

            restore_current_blog();
        }// uninstallDeleteSite


        /**
         * Drop tables that was created with this plugin.
         * 
         * Only tables that was created in `BBFSEPlugin\App\Models\PluginDbStructure->get()` method will be drop here.
         * 
         * @since 0.0.1
         * @global \wpdb $wpdb
         * @param bool $mainsite Set to `true` to drop table of this plugin that created for main site. Otherwise it will be drop table with `prefix_site_number_` for switched to sub site only (in case multi-site enabled).
         */
        private static function uninstallDropTables(bool $mainsite = true)
        {
            global $wpdb;
            $wpdb->show_errors();

            $PluginDbStructure = new \BBFSEPlugin\App\Models\PluginDbStructure();
            $schemas = $PluginDbStructure->get();
            unset($PluginDbStructure);

            if (is_array($schemas) && !empty($schemas)) {
                foreach ($schemas as $index => $item) {
                    if (isset($item['tablename'])) {
                        if (isset($item['is_multisite']) && true === $item['is_multisite']) {
                            // if set to multisite table then it will be use prefix_sitenumber_tablename.
                            $prefix = $wpdb->prefix;
                        } else {
                            // if set not to multisite then it will be use prefix_tablename.
                            if (true === $mainsite) {
                                $prefix = $wpdb->base_prefix;
                            } else {
                                $prefix = $wpdb->prefix;
                            }
                        }

                        $sql = 'DROP TABLE IF EXISTS ' . $prefix . $item['tablename'];
                        $wpdb->query($sql);// phpcs:ignore
                        unset($prefix, $sql);
                    }
                }// endforeach;
                unset($index, $item);
            }
        }// uninstallDropTables


    }
}
