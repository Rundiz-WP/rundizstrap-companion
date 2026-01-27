/**
 * Bootstrap button block JS.
 *
 * @package bbfse-plugin
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
