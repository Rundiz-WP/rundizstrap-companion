/**
 * Bootstrap layout column block JS.
 * 
 * This block was created by Google Antigravity model Gemini 3 Pro.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';

import Edit from './edit.js';
import Save from './save.js';


registerBlockType(metadata.name, {
    icon: {
        src: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layout-three-columns" viewBox="0 0 16 16">
                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H5V1zM10 15V1H6v14zm1 0h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H11z"/>
            </svg>
        )
    },// using bootstrap-icons 'bi-layout-three-columns'.
    edit: Edit,
    save: Save,
});
