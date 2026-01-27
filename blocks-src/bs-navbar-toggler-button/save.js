/**
 * Bootstrap navbar toggler button block save component.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


import { useBlockProps } from '@wordpress/block-editor';

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
        dataAttributes,
        ariaAttributes,
        iconClassName,
        iconDataAttributes,
        iconAriaAttributes
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'navbar-toggler',
        type: 'button'
    });

    const dataProps = attributesToProps(dataAttributes, 'data-');
    const ariaProps = attributesToProps(ariaAttributes, 'aria-');

    // Merge outer attributes into blockProps
    Object.assign(blockProps, dataProps, ariaProps);

    const iconDataProps = attributesToProps(iconDataAttributes, 'data-');
    const iconAriaProps = attributesToProps(iconAriaAttributes, 'aria-');
    const iconProps = {
        className: `navbar-toggler-icon ${iconClassName || ''}`.trim(),
        ...iconDataProps,
        ...iconAriaProps
    };

    return (
        <button {...blockProps}>
            <span {...iconProps}></span>
        </button>
    );
}
