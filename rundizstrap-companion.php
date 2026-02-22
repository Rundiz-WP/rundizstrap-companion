<?php
/**
 * Plugin Name: RundizStrap Companion
 * Plugin URI: https://rundiz.com/en/blog/articles-en/wordpress-plugins-themes
 * Description: A plugin that contains blocks for the Bootstrap Basic FSE theme. All blocks are based on Bootstrap CSS.
 * Version: 0.0.5
 * Requires at least: 6.1
 * Requires PHP: 8.0
 * Author: Vee Winch
 * Author URI: https://rundiz.com
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 * Text Domain: rundizstrap-companion
 * Domain Path: /languages/
 * 
 * @package rundizstrap-companion
 */


if (!defined('ABSPATH')) {
    exit();
}


// define this plugin main file path.
if (!defined('RUNDIZSTRAP_COMPANION_FILE')) {
    define('RUNDIZSTRAP_COMPANION_FILE', __FILE__);
}


if (!defined('RUNDIZSTRAP_COMPANION_VERSION')) {
    // if not defined constant version.
    $rundizstrap_companion_Data = (function_exists('get_file_data') ? get_file_data(__FILE__, ['Version' => 'Version']) : null);
    $rundizstrap_companion_Version = (isset($rundizstrap_companion_Data['Version']) ? $rundizstrap_companion_Data['Version'] : date('Ym')); // phpcs:ignore WordPress.DateTime.RestrictedFunctions.date_date
    unset($rundizstrap_companion_Data);

    define('RUNDIZSTRAP_COMPANION_VERSION', $rundizstrap_companion_Version);

    unset($rundizstrap_companion_Version);
}


// require plugin's auto load.
require_once 'App/vendor/autoload.php';


// initialize plugin app main class.
$rundizstrap_companion_App = new \RundizstrapCompanion\App\App();
$rundizstrap_companion_App->run();
unset($rundizstrap_companion_App);
