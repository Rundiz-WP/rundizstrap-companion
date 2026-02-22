/**
 * Bootstrap row block save component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */

import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

import rundizstrap_companion_attribute_to_props from '../../assets/js/blocks/shared/rundizstrap-companion-attributes.js';

import { rundizstrap_companion_sanitizeTagName } from '../../assets/js/blocks/shared/rundizstrap-companion-tag-block-level.js';


const DEFAULT_TAG_NAME = 'div';


/**
 * Save component for Bootstrap row block.
 * Outputs single-level HTML with 'row' class merged with WordPress auto-generated classes.
 * 
 * @param {Object} props Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} The saved element.
 */
export default function Save({ attributes }) {
    const { tagName, dataAttributes, ariaAttributes } = attributes;
    const SanitizedTagName = rundizstrap_companion_sanitizeTagName(tagName, DEFAULT_TAG_NAME);

    // Merge 'row' class with WordPress auto-generated classes.
    const blockProps = useBlockProps.save({
        className: 'row',
        ...rundizstrap_companion_attribute_to_props(dataAttributes, 'data-'),
        ...rundizstrap_companion_attribute_to_props(ariaAttributes, 'aria-'),
    });

    // Single-level output: apply innerBlocksProps to the same element.
    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <SanitizedTagName {...innerBlocksProps} />;
}// Save
