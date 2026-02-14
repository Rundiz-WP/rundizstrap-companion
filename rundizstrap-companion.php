<?php
/**
 * Plugin Name: BBFSE plug
 * Plugin URI: https://rundiz.com/en/blog/articles-en/wordpress-plugins-themes
 * Description: A plugin that contains blocks for the Bootstrap Basic FSE theme. All blocks are based on Bootstrap CSS.
 * Version: 0.0.2
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
if (!defined('BBFSEPLUG_FILE')) {
    define('BBFSEPLUG_FILE', __FILE__);
}


if (!defined('BBFSEPLUG_VERSION')) {
    // if not defined constant version.
    $rundizstrapCompanionData = (function_exists('get_file_data') ? get_file_data(__FILE__, ['Version' => 'Version']) : null);
    $rundizstrapCompanionVersion = (isset($rundizstrapCompanionData['Version']) ? $rundizstrapCompanionData['Version'] : date('Ym')); // phpcs:ignore WordPress.DateTime.RestrictedFunctions.date_date
    unset($rundizstrapCompanionData);

    define('BBFSEPLUG_VERSION', $rundizstrapCompanionVersion);

    unset($rundizstrapCompanionVersion);
}


// require plugin's auto load.
require_once 'App/vendor/autoload.php';


// initialize plugin app main class.
$rundizstrapCompanionApp = new \BBFSEPlug\App\App();
$rundizstrapCompanionApp->run();
unset($rundizstrapCompanionApp);
