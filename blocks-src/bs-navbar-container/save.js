/**
 * Bootstrap navbar container block save component.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Helper to convert attribute objects to props with prefixes.
 * 
 * @param {Object} attributes Key-value pairs.
 * @param {string} prefix Prefix like 'data-' or 'aria-'.
 * @returns {Object} Props object.
 */
const attributesToProps = (attributes, prefix) => {
    const props = {};
    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            if (key) {
                props[`${prefix}${key}`] = value;
            }
        });
    }
    return props;
};

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

    const outerDataProps = attributesToProps(dataAttributes, 'data-');
    const outerAriaProps = attributesToProps(ariaAttributes, 'aria-');

    // Merge outer attributes into blockProps
    Object.assign(blockProps, outerDataProps, outerAriaProps);

    const innerDataProps = attributesToProps(containerDataAttributes, 'data-');
    const innerAriaProps = attributesToProps(containerAriaAttributes, 'aria-');

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
