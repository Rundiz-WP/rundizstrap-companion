/**
 * Bootstrap navbar responsive wrapper block save component.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 * @author Vee W.
 */


import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import attributesToProps from '../../assets/js/blocks/shared/attributesToProps.js';

export default function Save({attributes}) {
    const {
        wrapperStyle,
        dataAttributes,
        ariaAttributes,
        // Offcanvas-specific attributes
        offcanvasHeaderClassName = 'offcanvas-header',
        offcanvasHeaderTitleClassName = 'offcanvas-title',
        offcanvasHeaderTitleIDName = '',
        offcanvasHeaderTitleText = '',
        offcanvasHeaderCloseBtnClassName = '',
        offcanvasHeaderCloseBtnDataAttributes,
        offcanvasHeaderCloseBtnAriaAttributes,
        offcanvasBodyClassName = 'offcanvas-body',
    } = attributes;
    
    // Dynamically build class names based on wrapperStyle
    const getWrapperClasses = () => {
        if (wrapperStyle === 'offcanvas') {
            return 'offcanvas offcanvas-end';
        }
        // default = collapse
        return 'collapse navbar-collapse';
    };

    // Additional props only for offcanvas
    const extraProps = wrapperStyle === 'offcanvas' 
        ? { tabIndex: '-1' } 
        : {};

    const blockProps = useBlockProps.save({
        className: getWrapperClasses(),
        ...extraProps,
        ...attributesToProps(dataAttributes, 'data-'),
        ...attributesToProps(ariaAttributes, 'aria-'),
    });

    const closeButtonProps = {
        className: 'btn-close' + (offcanvasHeaderCloseBtnClassName ? ' ' + offcanvasHeaderCloseBtnClassName : ''),
        'type': 'button',
        ...attributesToProps(offcanvasHeaderCloseBtnDataAttributes, 'data-'),
        ...attributesToProps(offcanvasHeaderCloseBtnAriaAttributes, 'aria-'),
    };
    
    // ──────────────────────────────────────────────────────────────
    // Different markup for offcanvas vs collapse
    // ──────────────────────────────────────────────────────────────
    if (wrapperStyle === 'offcanvas') {
        // Use user-defined title ID if provided, otherwise leave it to the browser / theme
        // (but most of the time user will want to set it to match the toggler's aria-controls)
        const titleId = offcanvasHeaderTitleIDName || 'navbar-responsive-offcanvas-title-id';

        return (
            <div {...blockProps} { ...(titleId ? { 'aria-labelledby': titleId } : {}) }>
                <div className={offcanvasHeaderClassName}>
                    <h5
                        className={offcanvasHeaderTitleClassName}
                        {...(titleId ? { id: titleId } : {})}
                        dangerouslySetInnerHTML={{ __html: offcanvasHeaderTitleText || '' }}
                    >
                    </h5>
                    <button {...closeButtonProps} />
                </div>

                {/* Offcanvas Body – inner blocks go here */}
                <div className={offcanvasBodyClassName}>
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    }

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}
