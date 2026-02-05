<?php
/**
 * Deactivate the plugin action.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


namespace BBFSEPlugin\App\Controllers\Admin\Plugins;

if (!class_exists('\\BBFSEPlugin\\App\\Controllers\\Admin\\Plugins\\Deactivation')) {
    /**
     * Plugin deactivation hook class.
     * 
     * @since 0.0.1
     */
    class Deactivation implements \BBFSEPlugin\App\Controllers\ControllerInterface
    {


        /**
         * Deactivate the plugin.
         * 
         * @since 0.0.1
         */
        public function deactivate()
        {
            // do something that will be happens on deactivate plugin.
            // the code below is just an example. write your own.
            // phpcs:ignore Squiz.PHP.CommentedOutCode.Found
            /*
            global $wpdb;
            if (is_multisite()) {
                // this site is multisite. deactivate on all site.
                $blog_ids = $wpdb->get_col('SELECT blog_id FROM '.$wpdb->blogs);
                $original_blog_id = get_current_blog_id();
                if ($blog_ids) {
                    foreach ($blog_ids as $blog_id) {
                        switch_to_blog($blog_id);
                        // do the deactivation from switched to blog (site) here.
                    }// endforeach;
                    unset($blog_id);
                }
                switch_to_blog($original_blog_id);
                unset($blog_ids, $original_blog_id);
            } else {
                // this site is single site. deactivate on single site.
                // do the deactivation on current site (single site) here.
            }
            */
        }// deactivate


        /**
         * {@inheritDoc}
         * 
         * @since 0.0.1
         */
        public function registerHooks()
        {
            // register deactivate hook
            register_deactivation_hook(BBFSEPLUGIN_FILE, [$this, 'deactivate']);
        }// registerHooks


    }
}
