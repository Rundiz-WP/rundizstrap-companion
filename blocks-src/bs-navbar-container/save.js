/**
 * Bootstrap navbar container block save component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import rundizstrap_companion_attribute_to_props from '../../assets/js/blocks/shared/rundizstrap-companion-attributes.js';

import { rundizstrap_companion_sanitize_html_class_list } from '../../assets/js/blocks/shared/rundizstrap-companion-sanitize.js';

import { rundizstrap_companion_sanitizeTagName } from '../../assets/js/blocks/shared/rundizstrap-companion-tag-block-level.js';


const DEFAULT_TAG_NAME = 'nav';

const DEFAULT_CONTAINER_TAG_NAME = 'div';


export default function Save({ attributes }) {
    const {
        tagName,
        dataAttributes,
        ariaAttributes,
        containerTagName,
        containerClassName,
        containerDataAttributes,
        containerAriaAttributes
    } = attributes;

    const SanitizedTagName = rundizstrap_companion_sanitizeTagName(tagName, DEFAULT_TAG_NAME);
    const SanitizedContainerTagName = rundizstrap_companion_sanitizeTagName(containerTagName, DEFAULT_CONTAINER_TAG_NAME);
    const sanitizedContainerClassName = rundizstrap_companion_sanitize_html_class_list(containerClassName || '');

    const blockProps = useBlockProps.save({
        className: 'navbar'
    });

    const outerDataProps = rundizstrap_companion_attribute_to_props(dataAttributes, 'data-');
    const outerAriaProps = rundizstrap_companion_attribute_to_props(ariaAttributes, 'aria-');

    // Merge outer attributes into blockProps
    Object.assign(blockProps, outerDataProps, outerAriaProps);

    const innerDataProps = rundizstrap_companion_attribute_to_props(containerDataAttributes, 'data-');
    const innerAriaProps = rundizstrap_companion_attribute_to_props(containerAriaAttributes, 'aria-');

    // Construct inner props
    const innerProps = {
        className: sanitizedContainerClassName,
        ...innerDataProps,
        ...innerAriaProps
    };

    return (
        <SanitizedTagName {...blockProps}>
            <SanitizedContainerTagName {...innerProps}>
                <InnerBlocks.Content />
            </SanitizedContainerTagName>
        </SanitizedTagName>
    );
}// Save
