/**
 * Bootstrap container block save component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 * @author Vee W.
 */

import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

import rundizstrap_companion_attribute_to_props from '../../assets/js/blocks/shared/rundizstrap-companion-attributes.js';

import { rundizstrap_companion_sanitizeTagName } from '../../assets/js/blocks/shared/rundizstrap-companion-tag-block-level.js';


const DEFAULT_TAG_NAME = 'div';


/**
 * Save component for Bootstrap container block.
 * Outputs simple wrapper with user chosen tag.
 * 
 * @param {Object} props Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} The saved element.
 */
export default function Save({ attributes }) {
    const { tagName, dataAttributes, ariaAttributes } = attributes;
    const SanitizedTagName = rundizstrap_companion_sanitizeTagName(tagName, DEFAULT_TAG_NAME);

    // No hardcoded class. relying on attributes.className which WP handles automatically.
    const blockProps = useBlockProps.save({
        ...rundizstrap_companion_attribute_to_props(dataAttributes, 'data-'),
        ...rundizstrap_companion_attribute_to_props(ariaAttributes, 'aria-'),
    });

    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <SanitizedTagName {...innerBlocksProps} />;
}// Save
