<?php
/**
 * Plugin Name: Bootstrap Basic FSE Plugin
 * Plugin URI:
 * Description: A plugin that contain blocks for Bootstrap Basic FSE theme. All blocks based on Bootstrap CSS.
 * Version: 0.0.1
 * Requires at least: 6.1
 * Requires PHP: 8.0
 * Author: Vee Winch
 * Author URI: https://rundiz.com
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 * Text Domain: bbfse-plugin
 * Domain Path: /languages/
 * 
 * @package bbfse-plugin
 */

// define this plugin main file path.
if (!defined('BBFSEPLUGIN_FILE')) {
    define('BBFSEPLUGIN_FILE', __FILE__);
}


if (!defined('BBFSEPLUGIN_VERSION')) {
    // if not defined constant version.
    $pluginData = (function_exists('get_file_data') ? get_file_data(__FILE__, ['Version' => 'Version']) : null);
    $pluginVersion = (isset($pluginData['Version']) ? $pluginData['Version'] : date('Ym')); // phpcs:ignore WordPress.DateTime.RestrictedFunctions.date_date
    unset($pluginData);

    define('BBFSEPLUGIN_VERSION', $pluginVersion);

    unset($pluginVersion);
}


// require plugin's auto load.
require_once 'App/vendor/autoload.php';


// initialize plugin app main class.
$App = new \BBFSEPlugin\App\App();
$App->run();
unset($App);
