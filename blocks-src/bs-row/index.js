/**
 * Bootstrap layout row block JS.
 * 
 * This block was created by Google Antigravity model Claude Opus 4.5.
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-view-stacked" viewBox="0 0 16 16">
                <path d="M3 0h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm0 8h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
            </svg>
        )
    },// using bootstrap-icons 'bi-view-stacked'.
    edit: Edit,
    save: Save,
});