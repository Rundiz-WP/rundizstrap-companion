/**
 * Bootstrap search block edit component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 * @author Vee W.
 */


/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Imports the InspectorControls component, which is used to wrap
 * the block's custom controls that will appear in in the Settings
 * Sidebar when the block is selected.
 *
 * Also imports the React hook that is used to mark the block wrapper
 * element. It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#inspectorcontrols
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
    InspectorControls, 
    useBlockProps, 
    RichText, 
} from '@wordpress/block-editor';

/**
 * Element is a package that builds on top of React and provide a set of utilities to work with React components and React elements.
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { useEffect, useRef } from '@wordpress/element';

/**
 * Imports the necessary components that will be used to create
 * the user interface for the block's settings.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/
 */
import {
    Disabled,
    SelectControl, 
    TextControl, 
    ToggleControl, 
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { rundizstrap_companion_sanitize_html_class_list } from '../../assets/js/blocks/shared/rundizstrap-companion-sanitize.js';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object} props Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
    const {
        forNavbar,
        showLabel,
        label,
        buttonUseIcon,
        buttonPosition,
        buttonClass,
        buttonText,
        placeholderText,
    } = attributes;

    useEffect(() => {
        if (forNavbar && showLabel) {
            setAttributes({showLabel: false});
        }
        if (!attributes.buttonClass) {
            setAttributes({buttonClass: 'btn btn-primary'});
        }
        if (!attributes.label) {
            setAttributes({label: __('Search', 'rundizstrap-companion')});
        }
        if (!attributes.buttonText) {
            setAttributes({buttonText: __('Search', 'rundizstrap-companion')});
        }
    }, [attributes, buttonClass, buttonText, forNavbar, showLabel, setAttributes]);

    const searchFieldRef = useRef();
    const buttonRef = useRef();
    // button position value rules: Lowercase alphanumeric characters, dashes, and underscores are allowed. ( https://developer.wordpress.org/reference/functions/sanitize_key/ )
    const buttonPositionControls = [
        {
            label: __('Button outside', 'rundizstrap-companion'),
            value: 'button-outside',
        },
        {
            label: __('Button group with input', 'rundizstrap-companion'),
            value: 'button-group-input',
        },
        {
            label: __('No button', 'rundizstrap-companion'),
            value: 'no-button',
        },
    ];
    const buttonUseIconDefault = false;
    const buttonDefaultPosition = 'button-outside';
    const buttonDefaultClass = 'btn btn-primary';
    const allowedButtonPositions = buttonPositionControls.map((item) => item.value);
    const sanitizeButtonPosition = (value) => {
        const positionValue = (typeof value === 'string' ? value : '');
        if (allowedButtonPositions.includes(positionValue)) {
            return positionValue;
        }
        return buttonDefaultPosition;
    };
    const sanitizedButtonPosition = sanitizeButtonPosition(buttonPosition);
    const sanitizedButtonClass = rundizstrap_companion_sanitize_html_class_list(buttonClass || '');

    // controls has been copied from WordPress core search block.
    const controls = (
        <>
            <InspectorControls>
                <ToolsPanel
                    label={__('Settings', 'rundizstrap-companion')}
                    resetAll={() => {
                        setAttributes({
                            forNavbar: false,
                            showLabel: false,
                            buttonPosition: buttonDefaultPosition,
                            buttonUseIcon: buttonUseIconDefault,
                        });
                    }}
                >
                    <ToolsPanelItem
                        hasValue={() => forNavbar}
                        label={__('For navbar', 'rundizstrap-companion')}
                        onDeselect={() => {
                            setAttributes({
                                forNavbar: false,
                            });
                        }}
                        isShownByDefault
                    >
                        <ToggleControl
                            checked={forNavbar}
                            label={__('For navbar', 'rundizstrap-companion')}
                            onChange={ (value) =>
                                setAttributes({
                                    forNavbar: value,
                                })
                            }
                        />
                    </ToolsPanelItem>
                    {!forNavbar && (
                        <ToolsPanelItem
                            hasValue={() => showLabel}
                            label={__('Show label', 'rundizstrap-companion')}
                            onDeselect={() => {
                                setAttributes({
                                    showLabel: false,
                                });
                            }}
                            isShownByDefault
                        >
                            <ToggleControl
                                checked={showLabel}
                                label={__('Show label', 'rundizstrap-companion')}
                                onChange={ (value) =>
                                    setAttributes({
                                        showLabel: value,
                                    })
                                }
                            />
                        </ToolsPanelItem>
                    )}
                    <ToolsPanelItem
                        hasValue={() => sanitizedButtonPosition !== buttonDefaultPosition}
                        label={__('Button position', 'rundizstrap-companion')}
                        onDeselect={() => {
                            setAttributes({
                                buttonPosition: buttonDefaultPosition,
                            });
                        }}
                        isShownByDefault
                    >
                        <SelectControl
                            value={sanitizedButtonPosition}
                            __next40pxDefaultSize
                            label={__('Button position', 'rundizstrap-companion')}
                            onChange={(value) => {
                                setAttributes({
                                    buttonPosition: sanitizeButtonPosition(value),
                                });
                            }}
                            options={buttonPositionControls}
                        />
                    </ToolsPanelItem>
                    {('no-button' !== sanitizedButtonPosition) && (
                        <>
                            <ToolsPanelItem
                                hasValue={() => !buttonUseIconDefault}
                                label={__('Button use icon', 'rundizstrap-companion')}
                                onDeselect={() => {
                                    setAttributes({
                                        buttonUseIcon: buttonUseIconDefault,
                                    });
                                }}
                                isShownByDefault
                            >
                                <ToggleControl
                                    checked={buttonUseIcon}
                                    label={__('Button use icon', 'rundizstrap-companion')}
                                    onChange={ (value) =>
                                        setAttributes({
                                            buttonUseIcon: value,
                                        })
                                    }
                                />
                            </ToolsPanelItem>
                            <ToolsPanelItem
                                hasValue={() => buttonClass !== buttonDefaultClass}
                                label={__('Button classes', 'rundizstrap-companion')}
                                onDeselect={() => {
                                    setAttributes({
                                        buttonClass: buttonDefaultClass,
                                    });
                                }}
                                isShownByDefault
                            >
                                <TextControl
                                    label={__('Button classes', 'rundizstrap-companion')}
                                    value={buttonClass}
                                    onChange={(value) => setAttributes({ buttonClass: rundizstrap_companion_sanitize_html_class_list(value, true) })}
                                    onBlur={() => setAttributes({ buttonClass: rundizstrap_companion_sanitize_html_class_list(buttonClass || '') })}
                                />
                            </ToolsPanelItem>
                        </>
                    )}
                </ToolsPanel>
            </InspectorControls>
        </>
    );// end const controls

    // render text field has been copied from WordPress core search block.
    const renderTextField = () => {
        let classNameValue = 'form-control';
        if (true === forNavbar && ('button-group-input' !== sanitizedButtonPosition && 'no-button' !== sanitizedButtonPosition)) {
            classNameValue += ' me-2';
        }
        return (
            <input
                type="search"
                className={(classNameValue)}
                aria-label={__('Optional placeholder text', 'rundizstrap-companion')}
                placeholder={
                    placeholderText ? undefined : __('Optional placeholder…', 'rundizstrap-companion')
                }
                value={placeholderText}
                onChange={(event) =>
                    setAttributes({placeholderText: event.target.value})
                }
                ref={searchFieldRef}
            />
        );
    };// end const renderTextField()

    // render button has been copied from WordPress core search block.
    const renderButton = () => {
        let buttonClasses = buttonDefaultClass;
        if (sanitizedButtonClass) {
            buttonClasses = sanitizedButtonClass;
        }

        const isButtonUseIcon = (buttonUseIcon === true);

        let buttonTextValue = buttonText;
        if (isButtonUseIcon) {
            buttonTextValue = '<i class="bi bi-search"></i>';
        }

        if (isButtonUseIcon) {
            return (
                <Disabled>
                    <button
                        type="button"
                        className={buttonClasses}
                        aria-label={__('Search', 'rundizstrap-companion')}
                    >
                        <i className="bi bi-search" aria-hidden="true"></i>
                    </button>
                </Disabled>
            );
        }

        return (
            <>
                <RichText
                    identifier="buttonText"
                    className={buttonClasses}
                    aria-label={__('Button text', 'rundizstrap-companion')}
                    placeholder={__('Add button text…', 'rundizstrap-companion')}
                    withoutInteractiveFormatting
                    value={buttonTextValue}
                    onChange={(html) =>
                        setAttributes({buttonText: html})
                    }
                    ref={buttonRef}
                />
            </>
        );
    };// end const renderButton()

    const blockProps = useBlockProps({
        className: (forNavbar ? 'd-flex' : undefined),
    });

    return (
        <div { ...blockProps }>
            {controls}
            {!forNavbar && showLabel && (
                <>
                    <div class="row">
                        <div class="col-12">
                            <RichText
                                identifier="label"
                                aria-label={__('Label text', 'rundizstrap-companion')}
                                placeholder={__('Add label…', 'rundizstrap-companion')}
                                withoutInteractiveFormatting
                                value={label}
                                onChange={(html) => setAttributes({label: html})}
                            />
                        </div>
                    </div>
                </>
            )}
            {!forNavbar ? (
                <>
                    {('button-group-input' === sanitizedButtonPosition) ? (
                        <>
                            <div class="input-group">
                                {renderTextField()}
                                {renderButton()}
                            </div>
                        </>
                    ) : (
                        <>
                            <div class="row g-3">
                                <div
                                    className={'no-button' === sanitizedButtonPosition ? 'col-12' : 'col'}
                                >
                                    {renderTextField()}
                                </div>
                                {('no-button' !== sanitizedButtonPosition) && (
                                    <>
                                        <div class="col-auto">
                                            {renderButton()}
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    {('button-group-input' === sanitizedButtonPosition) ? (
                        <>
                            <div class="input-group">
                                {renderTextField()}
                                {renderButton()}
                            </div>
                        </>
                    ) : (
                        <>
                            {renderTextField()} 
                            {('no-button' !== sanitizedButtonPosition) && (
                                <>{renderButton()}</>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}// Edit
