<?php
/**
 * RundizSettings configuration file.
 * Name this file freedomly, but include it correctly in \App\config\config.php
 *
 * Restricted field id: rdsfw_plugin_db_version, rdsfw_manual_update_version.
 *
 * @package rundizstrap-companion
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
            'title' => __('General', 'rundizstrap-companion'),
            'fields' => [
                [
                    'description' => __('If checked, these assets may be not enqueue if there is a hook altered its value.', 'rundizstrap-companion'),
                    'options' => [
                        [
                            'default' => '1',
                            'id' => 'bbfse_plug_enqueue_assets',
                            'title' => __('Enqueue Bootstrap CSS, JS, icons', 'rundizstrap-companion'),
                            'value' => '1',
                        ],
                    ],
                    'title' => __('Enqueue Bootstrap', 'rundizstrap-companion'),
                    'type' => 'checkbox',
                ],
            ],
        ],// end general fields
    ],
];
