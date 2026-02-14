<?php
/**
 * Plugin Name: BBFSE plug
 * Plugin URI:
 * Description: A plugin that contains blocks for the Bootstrap Basic FSE theme. All blocks are based on Bootstrap CSS.
 * Version: 0.0.1
 * Requires at least: 6.1
 * Requires PHP: 8.0
 * Author: Vee Winch
 * Author URI: https://rundiz.com
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 * Text Domain: bbfse-plug
 * Domain Path: /languages/
 * 
 * @package bbfse-plug
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
    $bbfsePlugData = (function_exists('get_file_data') ? get_file_data(__FILE__, ['Version' => 'Version']) : null);
    $bbfsePlugVersion = (isset($bbfsePlugData['Version']) ? $bbfsePlugData['Version'] : date('Ym')); // phpcs:ignore WordPress.DateTime.RestrictedFunctions.date_date
    unset($bbfsePlugData);

    define('BBFSEPLUG_VERSION', $bbfsePlugVersion);

    unset($bbfsePlugVersion);
}


// require plugin's auto load.
require_once 'App/vendor/autoload.php';


// initialize plugin app main class.
$bbfsePlugApp = new \BBFSEPlug\App\App();
$bbfsePlugApp->run();
unset($bbfsePlugApp);
