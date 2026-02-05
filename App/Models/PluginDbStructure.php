<?php
/**
 * The plugin database structure for use on activation.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


namespace BBFSEPlugin\App\Models;

if (!class_exists('\\BBFSEPlugin\\App\\Models\\PluginDbStructure')) {
    /**
     * The plugin's database structure class.
     */
    class PluginDbStructure
    {


        /**
         * Get the database structure for use on activate this plugin.
         * 
         * The db schema will be use by WordPress Db Delta.  
         * If you do not want to create any tables for this plugin then set this method to return empty array.  
         * Please read more about db version at `\BBFSEPlugin\App\AppTrait->db_version` property.
         * 
         * Limitation:  
         * - DO NOT use back tick (`) anywhere because it will be thrown the error.
         * - DO NOT add "IF NOT EXISTS" into "CREATE TABLE" because it will not get an update on structure changed.
         * 
         * Example:
         * <pre>
         * $schema[0]['tablename'] = 'bbfse_plugin_table1';
         * $schema[0]['statement'] = 'CREATE TABLE %PREFIX%%TABLE% (
         * id bigint(20) NOT NULL AUTO_INCREMENT,
         * PRIMARY KEY (id)
         * ) DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;';// no back tick (`) to prevent error.
         * $schema[0]['is_multisite'] = false;// by default it is set to false (not multisite tables).
         * 
         * $schema[1]['tablename'] = 'bbfse_plugin_table1';
         * $schema[1]['statement'] = 'CREATE TABLE ...';
         * $schema[1]['is_multisite'] = true;
         * </pre>
         * 
         * @return array Return array for each table that will be use for create. If you do not want db then set this method to return empty array.
         */
        public function get(): array
        {
            $schema = [];

            return $schema;
        }// get


    }
}
