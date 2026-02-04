/**
 * Bootstrap post navigation link block JS.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';

import Edit from './edit.js';

import { nextIcon } from './icons.js';

import variations from './variations.js';


registerBlockType(metadata.name, {
    icon: nextIcon,
    edit: Edit,
    variations,
    example: {
        attributes: {
            className: 'btn btn-secondary',
            type: 'next',
            label: __('Bootstrap Next Post', 'bbfse-plugin'),
        }
    },
});
