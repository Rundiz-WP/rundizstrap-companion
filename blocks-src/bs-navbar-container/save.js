/**
 * Bootstrap navbar container block save component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import rundizstrap_companion_attribute_to_props from '../../assets/js/blocks/shared/rundizstrap-companion-attributes.js';

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

    const blockProps = useBlockProps.save({
        className: 'navbar'
    });

    const TagName = tagName;
    const ContainerTagName = containerTagName;

    const outerDataProps = rundizstrap_companion_attribute_to_props(dataAttributes, 'data-');
    const outerAriaProps = rundizstrap_companion_attribute_to_props(ariaAttributes, 'aria-');

    // Merge outer attributes into blockProps
    Object.assign(blockProps, outerDataProps, outerAriaProps);

    const innerDataProps = rundizstrap_companion_attribute_to_props(containerDataAttributes, 'data-');
    const innerAriaProps = rundizstrap_companion_attribute_to_props(containerAriaAttributes, 'aria-');

    // Construct inner props
    const innerProps = {
        className: containerClassName,
        ...innerDataProps,
        ...innerAriaProps
    };

    return (
        <TagName {...blockProps}>
            <ContainerTagName {...innerProps}>
                <InnerBlocks.Content />
            </ContainerTagName>
        </TagName>
    );
}
