/**
 * Bootstrap navbar toggler button block save component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


import { useBlockProps } from '@wordpress/block-editor';

import attributesToProps from '../../assets/js/blocks/shared/attributesToProps.js';

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
