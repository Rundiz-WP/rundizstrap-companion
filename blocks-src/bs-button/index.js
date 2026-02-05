/**
 * Bootstrap button block JS.
 * 
 * This block was created by ChatGPT 5.2 Codex.
 *
 * @package bbfse-plug
 * @since 0.0.1
 */

import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';

import Edit from './edit.js';
import Save from './save.js';

registerBlockType(metadata.name, {
    edit: Edit,
    save: Save,
});
