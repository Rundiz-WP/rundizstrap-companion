/**
 * Bootstrap comment form block edit component.
 * 
 * @package bbfse-plugin
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


export default function Edit({ attributes, setAttributes }) {
    const { buttonClassName } = attributes;
    const buttonClassDefault = 'btn btn-primary';
    const submitButtonClass = (buttonClassName && buttonClassName.trim() ? buttonClassName.trim() : buttonClassDefault);

    return (
        <div {...useBlockProps({ className: 'comment-respond' })}>
            <InspectorControls>
                <ToolsPanel
                    label={__('Comment Form Settings', 'bbfse-plugin')}
                    resetAll={() => {
                        setAttributes({
                            buttonClassName: buttonClassDefault,
                        });
                    }}
                >
                    <ToolsPanelItem
                        hasValue={() => buttonClassName !== buttonClassDefault}
                        label={__('Button class', 'bbfse-plugin')}
                        onDeselect={() => {
                            setAttributes({
                                buttonClassName: buttonClassDefault,
                            });
                        }}
                        isShownByDefault
                    >
                        <TextControl
                            label={__('Button class', 'bbfse-plugin')}
                            value={buttonClassName}
                            onChange={(value) => setAttributes({ buttonClassName: value })}
                            help={__('Replace submit button class, e.g. btn btn-outline-primary', 'bbfse-plugin')}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>

            <Disabled>
                <h3 className="comment-reply-title">
                    {__('Leave a Reply', 'bbfse-plugin')}
                </h3>
                <form className="comment-form mb-4">
                    <div className="mb-3">
                        <label className="form-label">
                            {__('Comment', 'bbfse-plugin')}
                        </label>
                        <textarea className="form-control" rows="8"></textarea>
                    </div>

                    <p className="form-submit">
                        <input className={submitButtonClass} type="submit" value={__('Post Comment', 'bbfse-plugin')} />
                    </p>
                </form>
            </Disabled>
        </div>
    );
}
