<?php
/**
 * RundizSettings configuration file.
 * Name this file freedomly, but include it correctly in \App\config\config.php
 *
 * Restricted field id: rdsfw_plugin_db_version, rdsfw_manual_update_version.
 *
 * @package bbfse-plug
 * @since 0.0.1
 */


if (!defined('ABSPATH')) {
    exit();
}

return [
    'tab_style' => 'vertical',
    'setting_tabs' => [
        [
            'icon' => 'bi bi-sliders',
            'title' => __('General', 'bbfse-plug'),
            'fields' => [
                [
                    'description' => __('If checked, these assets may be not enqueue if there is a hook altered its value.', 'bbfse-plug'),
                    'options' => [
                        [
                            'default' => '1',
                            'id' => 'bbfse_plug_enqueue_assets',
                            'title' => __('Enqueue Bootstrap CSS, JS, icons', 'bbfse-plug'),
                            'value' => '1',
                        ],
                    ],
                    'title' => __('Enqueue Bootstrap', 'bbfse-plug'),
                    'type' => 'checkbox',
                ],
            ],
        ],// end general fields
    ],
];
