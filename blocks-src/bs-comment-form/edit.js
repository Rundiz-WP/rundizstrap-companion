/**
 * Bootstrap comment form block edit component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import {
    Disabled,
    TextControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { rundizstrap_companion_sanitize_html_class_list } from '../../assets/js/blocks/shared/rundizstrap-companion-sanitize.js';


export default function Edit({ attributes, setAttributes }) {
    const { buttonClassName } = attributes;
    const buttonClassDefault = 'btn btn-primary';
    const sanitizedButtonClassName = rundizstrap_companion_sanitize_html_class_list(buttonClassName || '');
    const submitButtonClass = (sanitizedButtonClassName && sanitizedButtonClassName.trim() ? sanitizedButtonClassName.trim() : buttonClassDefault);

    return (
        <div {...useBlockProps({ className: 'comment-respond' })}>
            <InspectorControls>
                <ToolsPanel
                    label={__('Comment Form Settings', 'rundizstrap-companion')}
                    resetAll={() => {
                        setAttributes({
                            buttonClassName: buttonClassDefault,
                        });
                    }}
                >
                    <ToolsPanelItem
                        hasValue={() => buttonClassName !== buttonClassDefault}
                        label={__('Button class', 'rundizstrap-companion')}
                        onDeselect={() => {
                            setAttributes({
                                buttonClassName: buttonClassDefault,
                            });
                        }}
                        isShownByDefault
                    >
                        <TextControl
                            label={__('Button class', 'rundizstrap-companion')}
                            value={buttonClassName}
                            onChange={(value) => setAttributes({ buttonClassName: rundizstrap_companion_sanitize_html_class_list(value, true) })}
                            onBlur={() => setAttributes({ buttonClassName: rundizstrap_companion_sanitize_html_class_list(buttonClassName || '') })}
                            help={__('Replace submit button class, e.g. btn btn-outline-primary', 'rundizstrap-companion')}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>

            <Disabled>
                <h3 className="comment-reply-title">
                    {__('Leave a Reply', 'rundizstrap-companion')}
                </h3>
                <form className="comment-form mb-4">
                    <div className="mb-3">
                        <label className="form-label">
                            {__('Comment', 'rundizstrap-companion')}
                        </label>
                        <textarea className="form-control" rows="8"></textarea>
                    </div>

                    <p className="form-submit">
                        <input className={submitButtonClass} type="submit" value={__('Post Comment', 'rundizstrap-companion')} />
                    </p>
                </form>
            </Disabled>
        </div>
    );
}// Edit
