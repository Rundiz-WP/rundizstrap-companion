/**
 * Bootstrap navbar container block JS.
 * 
 * @package bbfse-plug
 * @since 0.0.1
 * @author Vee W.
 */


import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';

import Edit from './edit.js';
import Save from './save.js';


registerBlockType(metadata.name, {
    icon: {
        src: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-collapse" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8m7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0m-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0z"/>
            </svg>
        )
    },// using bootstrap-icon 'bi-arrows-collapse'.
    edit: Edit,
    save: Save,
});
