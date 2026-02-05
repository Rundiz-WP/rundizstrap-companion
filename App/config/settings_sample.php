<?php
/**
 * RundizSettings configuration file.
 * Name this file freedomly, but include it correctly in \App\config\config.php
 *
 * Restricted field id: rdsfw_plugin_db_version, rdsfw_manual_update_version.
 *
 * @package bbfse-plugin
 * @since 0.0.1
 * 
 * phpcs:disable
 */


/*
return [
    // tab_style is vertical or horizontal
    'tab_style' => 'vertical',
    'setting_tabs' => [
        [
            'icon' => 'bi bi-pencil',
            'title' => __('Basic fields', 'plugin-template'),
            'fields' => [
                [
                    'default' => '',
                    'description' => __('Form field description', 'plugin-template'),
                    'id' => 'input_text',
                    'title' => __('Input type text', 'plugin-template'),
                    'type' => 'text',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                [
                    'default' => '',
                    'id' => 'input_password',
                    'title' => __('Input type password', 'plugin-template'),
                    'type' => 'password',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                [
                    'default' => '#79c1fd',
                    'id' => 'input_color',
                    'input_attributes' => [
                        'class' => 'small-text',
                    ],
                    'title' => __('Input type color', 'plugin-template'),
                    'type' => 'color',
                    'sanitize_callback' => 'sanitize_hex_color',
                ],
                [
                    'default' => get_date_from_gmt(gmdate('Y-m-d'), 'Y-m-d'),
                    'id' => 'input_date',
                    'title' => __('Input type date', 'plugin-template'),
                    'type' => 'date',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                [
                    'default' => '',
                    'id' => 'input_email',
                    'title' => __('Input type email', 'plugin-template'),
                    'type' => 'email',
                    'sanitize_callback' => 'sanitize_email',
                ],
                [
                    'default' => '',
                    'id' => 'input_number',
                    'input_attributes' => [
                        'max' => 255,
                        'min' => 1,
                        'step' => 1,
                    ],
                    'title' => __('Input type number', 'plugin-template'),
                    'type' => 'number',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                [
                    'default' => '0',
                    'id' => 'input_range',
                    'input_attributes' => [
                        'max' => 10,
                        'min' => 0,
                    ],
                    'title' => __('Input type range', 'plugin-template'),
                    'type' => 'range',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                [
                    'default' => '',
                    'id' => 'input_url',
                    'title' => __('Input type URL', 'plugin-template'),
                    'type' => 'url',
                    'sanitize_callback' => 'sanitize_url',
                ],
                [
                    'default' => '',
                    'id' => 'input_textarea',
                    'input_attributes' => [
                        'rows' => 5,
                    ],
                    'title' => __('Textarea', 'plugin-template'),
                    'type' => 'textarea',
                    'sanitize_callback' => 'sanitize_textarea_field',
                ],
            ],
        ],// end basic fields
        [
            'icon' => 'bi bi-check-square',
            'title' => __('Check boxes and radio buttons', 'plugin-template'),
            'fields' => [
                [
                    'options' => [
                        [
                            'default' => '1',
                            'id' => 'checkbox1',
                            'title' => __('Check box 1', 'plugin-template'),
                            'value' => '1',
                        ],
                        [
                            'default' => '',
                            'description' => __('This check box have extra attributes', 'plugin-template'),
                            'id' => 'checkbox2',
                            'input_attributes' => [
                                'data-test' => 'true', 
                                'data-attribute2' => 'special-value',
                            ],
                            'title' => __('Check box 2', 'plugin-template'),
                            'value' => '1',
                        ],
                    ],
                    'title' => __('Check box', 'plugin-template'),
                    'type' => 'checkbox',
                ],
                [
                    'default' => ['2', '3'],
                    'options' => [
                        [
                            'id' => 'checkbox_arr[]',
                            'title' => __('Check box array 1', 'plugin-template'),
                            'value' => '1',
                        ],
                        [
                            'id' => 'checkbox_arr[]',
                            'title' => __('Check box array 2', 'plugin-template'),
                            'value' => '2',
                        ],
                        [
                            'id' => 'checkbox_arr[]',
                            'title' => __('Check box array 3', 'plugin-template'),
                            'value' => '3',
                        ],
                    ],
                    'title' => __('Check box array', 'plugin-template'),
                    'type' => 'checkbox',
                ],
                [
                    'default' => '3',
                    'id' => 'input_radio',
                    'options' => [
                        [
                            'title' => __('Radio option 1', 'plugin-template'),
                            'value' => '1',
                            'input_attributes' => [
                                'data-extra-attribute' => 'yes', 
                                'data-input-type' => 'radio',
                            ],
                            'description' => __('This radio have extra attributes', 'plugin-template'),
                        ],
                        [
                            'title' => __('Radio option 2', 'plugin-template'),
                            'value' => '2',
                        ],
                        [
                            'title' => __('Radio option 3', 'plugin-template'),
                            'value' => '3',
                        ],
                    ],
                    'title' => __('Input radio', 'plugin-template'),
                    'type' => 'radio',
                ],
            ],
        ],// end check boxes and radio buttons
        [
            'icon' => 'bi bi-card-list',
            'title' => __('Select boxes', 'plugin-template'),
            'fields' => [
                [
                    'default' => 'AA',
                    'id' => 'select_box',
                    'options' => [
                        '' => '',
                        'A' => __('Option A', 'plugin-template'),
                        'B' => __('Option B', 'plugin-template'),
                        'C' => __('Option C', 'plugin-template'),
                        'AA' => __('Option AA', 'plugin-template'),
                    ],
                    'title' => __('Select box', 'plugin-template'),
                    'type' => 'select',
                ],
                [
                    'default' => 'THA',
                    'id' => 'select_optgroup',
                    'options' => [
                        __('America', 'plugin-template') => [
                            'CAN' => __('Canada', 'plugin-template'),
                            'USA' => __('America', 'plugin-template'),
                        ],
                        __('Asia', 'plugin-template') => [
                            'CHN' => __('China', 'plugin-template'),
                            'THA' => __('Thailand', 'plugin-template'),
                        ],
                        __('Europe', 'plugin-template') => [
                            'FRA' => __('France', 'plugin-template'),
                            'GER' => __('Germany', 'plugin-template'),
                        ],
                    ],
                    'title' => __('Select box with optgroup', 'plugin-template'),
                    'type' => 'select',
                ],
                [
                    'default' => ['A', 'AA'],
                    'id' => 'select_multiple[]',
                    'input_attributes' => [
                        'multiple' => '',
                    ],
                    'options' => [
                        'A' => __('Option A', 'plugin-template'),
                        'B' => __('Option B', 'plugin-template'),
                        'C' => __('Option C', 'plugin-template'),
                        'AA' => __('Option AA', 'plugin-template'),
                        'AB' => __('Option AB', 'plugin-template'),
                        'AC' => __('Option AC', 'plugin-template'),
                    ],
                    'title' => __('Select box multiple', 'plugin-template'),
                    'type' => 'select',
                ],
                [
                    'default' => ['THA', 'CAN'],
                    'id' => 'select_multiple2[]',
                    'input_attributes' => [
                        'multiple' => '',
                    ],
                    'options' => [
                        __('America', 'plugin-template') => [
                            'CAN' => __('Canada', 'plugin-template'),
                            'USA' => __('America', 'plugin-template'),
                        ],
                        __('Asia', 'plugin-template') => [
                            'CHN' => __('China', 'plugin-template'),
                            'THA' => __('Thailand', 'plugin-template'),
                        ],
                        __('Europe', 'plugin-template') => [
                            'FRA' => __('France', 'plugin-template'),
                            'GER' => __('Germany', 'plugin-template'),
                        ],
                    ],
                    'title' => __('Select box multiple with optgroup', 'plugin-template'),
                    'type' => 'select',
                ],
            ],
        ],// end select boxes
        [
            'icon' => 'bi bi-pencil-square',
            'title' => __('Editors', 'plugin-template'),
            'fields' => [
                [
                    'default' => 'Rundiz Settings',
                    'description' => __('Use WordPress editor to edit text/html', 'plugin-template'),
                    'editor_settings' => [
                        // editor settings refer from https://codex.wordpress.org/Function_Reference/wp_editor
                        'textarea_rows' => 5,
                    ],
                    'id' => 'field_editor',
                    'title' => __('Editor', 'plugin-template'),
                    'type' => 'editor',
                    'sanitize_callback' => 'wp_kses_post',
                ],
                [
                    'default' => 'Rundiz Settings',
                    'editor_settings' => [
                        // editor settings refer from https://codex.wordpress.org/Function_Reference/wp_editor
                        'media_buttons' => false,
                        'teeny' => true,
                        'textarea_rows' => 5,
                    ],
                    'id' => 'field_editor_tiny_no_media',
                    'title' => __('Editor mini without media button', 'plugin-template'),
                    'type' => 'editor',
                    'sanitize_callback' => 'wp_kses_post',
                ],
                [
                    'default' => 'Rundiz Settings',
                    'editor_settings' => [
                        // editor settings refer from https://codex.wordpress.org/Function_Reference/wp_editor
                        'teeny' => true,
                        'textarea_rows' => 5,
                    ],
                    'id' => 'field_editor_tiny_media',
                    'title' => __('Editor mini with media button', 'plugin-template'),
                    'type' => 'editor_full',
                    'sanitize_callback' => 'wp_kses_post',
                ],
            ],
        ],// end editor fields
        [
            'icon' => 'bi bi-code-slash',
            'title' => __('Code editors', 'plugin-template'),
            'fields' => [
                [
                    'default' => '<!DOCTYPE html>' . "\n" . '<html>' . "\n\t" . '<head>' . "\n\t\t" . '<meta charset="utf-8">' . "\n\t\t" . '<title>HTML Title</title>' . "\n\t" . '</head>' . "\n\t" . '<body>' . "\n\t\t" . '<p>HTML Text in body.</p>' . "\n\t" . '</body>' . "\n" . '</html>',
                    'description' => __('Use Ace editor to edit source code', 'plugin-template'),
                    'id' => 'code_editor_html',
                    // mode refer from https://github.com/ajaxorg/ace/blob/master/lib/ace/ext/modelist.js#L53
                    'mode' => 'html',
                    'title' => __('Code editor (HTML)', 'plugin-template'),
                    'type' => 'code_editor',
                ],
                [
                    'default' => 'function returnSomeWord(string) {' . "\n\t" . 'return "This is some word in return: "+string;' . "\n" . '}',
                    'id' => 'code_editor_js',
                    // mode refer from https://github.com/ajaxorg/ace/blob/master/lib/ace/ext/modelist.js#L53
                    'mode' => 'javascript',
                    'title' => __('Code editor (JS)', 'plugin-template'),
                    'type' => 'code_editor',
                ],
                [
                    'default' => '.my-css-class {' . "\n\t" . 'background: #fff;' . "\n\t" . 'color: #333;' . "\n" . '}',
                    'id' => 'code_editor_css',
                    // mode refer from https://github.com/ajaxorg/ace/blob/master/lib/ace/ext/modelist.js#L53
                    'mode' => 'css',
                    'title' => __('Code editor (CSS)', 'plugin-template'),
                    'type' => 'code_editor',
                ],
            ],
        ],// end code editors
        [
            'icon' => 'bi bi-image',
            'title' => __('Media fields', 'plugin-template'),
            'fields' => [
                [
                    'default' => '',
                    'description' => __('Media upload button with full preview.', 'plugin-template'),
                    'id' => 'mediaupload',
                    'title' => __('Media', 'plugin-template'),
                    'type' => 'media',
                ],
                [
                    'default' => '',
                    'id' => 'mediaupload_no_preview_img',
                    // mode for media are: preview_all, preview_url, preview_img, no_preview_img, no_preview_url. choose one.
                    'mode' => 'no_preview_img',
                    'title' => __('Media no preview image', 'plugin-template'),
                    'type' => 'media',
                ],
                [
                    'default' => '',
                    'id' => 'mediaupload_no_preview_url',
                    // mode for media are: preview_all, preview_url, preview_img, no_preview_img, no_preview_url. choose one.
                    'mode' => 'no_preview_url',
                    'title' => __('Media no preview URL', 'plugin-template'),
                    'type' => 'media',
                ],
            ],
        ],// end media fields
        [
            'icon' => 'bi bi-easel2',
            'title' => __('Presentation fields', 'plugin-template'),
            'fields' => [
                [
                    'content' => __('Presentation field in normal <strong>2 columns</strong> for medium display or larger.', 'plugin-template') .
                        '<ul>' . PHP_EOL .
                        '<li>' . __('Unordered list item', 'plugin-template') . '</li>' . PHP_EOL .
                        '<li>' . __('Unordered list item', 'plugin-template') . '</li>' . PHP_EOL .
                        '</ul>' . PHP_EOL .
                        '<ol>' . PHP_EOL .
                        '<li>' . __('Ordered list item', 'plugin-template') . '</li>' . PHP_EOL .
                        '<li>' . __('Ordered list item', 'plugin-template') . '</li>' . PHP_EOL .
                        '</ol>',
                    'title' => __('Presentation in 2 columns', 'plugin-template'),
                    'type' => 'html',
                ],
                [
                    'content' => __('Presentation field in <strong>full column</strong> display. You can use any html element in <code>html</code> and <code>html_full</code> field type', 'plugin-template') .
                        '<ul>' . PHP_EOL .
                        '<li>' . __('Unordered list item', 'plugin-template') . '</li>' . PHP_EOL .
                        '<li>' . __('Unordered list item', 'plugin-template') . '</li>' . PHP_EOL .
                        '</ul>' .
                        '<ol>' . PHP_EOL .
                        '<li>' . __('Ordered list item', 'plugin-template') . '</li>' . PHP_EOL .
                        '<li>' . __('Ordered list item', 'plugin-template') . '</li>' . PHP_EOL .
                        '</ol>' . PHP_EOL .
                        '<p>' . __('Paragraph.', 'plugin-template') . '</p>' . PHP_EOL .
                        '<p>' . __('Paragraph.', 'plugin-template') . '</p>' . PHP_EOL .
                        '<pre>' . esc_html('<?php' . PHP_EOL . '// code block (pre) element.' . PHP_EOL . '$var = \'Hello world.\';') . '</pre>' . PHP_EOL,
                    'type' => 'html_full',
                ],
            ],
        ],// end presentation fields
    ],
];
*//**/
