/**
 * Bootstrap search block edit component.
 * 
 * @package bbfse-plugin
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
            setAttributes({label: __('Search', 'bbfse-plugin')});
        }
        if (!attributes.buttonText) {
            setAttributes({buttonText: __('Search', 'bbfse-plugin')});
        }
    }, [attributes, buttonClass, buttonText, forNavbar, showLabel, setAttributes]);

    const searchFieldRef = useRef();
    const buttonRef = useRef();
    const buttonPositionControls = [
        {
            label: __('Button outside', 'bbfse-plugin'),
            value: 'button-outside',
        },
        {
            label: __('Button group with input', 'bbfse-plugin'),
            value: 'button-group-input',
        },
        {
            label: __('No button', 'bbfse-plugin'),
            value: 'no-button',
        },
    ];
    const buttonUseIconDefault = false;
    const buttonDefaultPosition = 'button-outside';
    const buttonDefaultClass = 'btn btn-primary';

    // controls has been copied from WordPress core search block.
    const controls = (
        <>
            <InspectorControls>
                <ToolsPanel
                    label={__('Settings', 'bbfse-plugin')}
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
                        label={__('For navbar', 'bbfse-plugin')}
                        onDeselect={() => {
                            setAttributes({
                                forNavbar: false,
                            });
                        }}
                        isShownByDefault
                    >
                        <ToggleControl
                            checked={forNavbar}
                            label={__('For navbar', 'bbfse-plugin')}
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
                            label={__('Show label', 'bbfse-plugin')}
                            onDeselect={() => {
                                setAttributes({
                                    showLabel: false,
                                });
                            }}
                            isShownByDefault
                        >
                            <ToggleControl
                                checked={showLabel}
                                label={__('Show label', 'bbfse-plugin')}
                                onChange={ (value) =>
                                    setAttributes({
                                        showLabel: value,
                                    })
                                }
                            />
                        </ToolsPanelItem>
                    )}
                    <ToolsPanelItem
                        hasValue={() => buttonPosition !== buttonDefaultPosition}
                        label={__('Button position', 'bbfse-plugin')}
                        onDeselect={() => {
                            setAttributes({
                                buttonPosition: buttonDefaultPosition,
                            });
                        }}
                        isShownByDefault
                    >
                        <SelectControl
                            value={buttonPosition}
                            __next40pxDefaultSize
                            label={__('Button position', 'bbfse-plugin')}
                            onChange={(value) => {
                                setAttributes({
                                    buttonPosition: value,
                                });
                            }}
                            options={buttonPositionControls}
                        />
                    </ToolsPanelItem>
                    {('no-button' !== buttonPosition) && (
                        <>
                            <ToolsPanelItem
                                hasValue={() => !buttonUseIconDefault}
                                label={__('Button use icon', 'bbfse-plugin')}
                                onDeselect={() => {
                                    setAttributes({
                                        buttonUseIcon: buttonUseIconDefault,
                                    });
                                }}
                                isShownByDefault
                            >
                                <ToggleControl
                                    checked={buttonUseIcon}
                                    label={__('Button use icon', 'bbfse-plugin')}
                                    onChange={ (value) =>
                                        setAttributes({
                                            buttonUseIcon: value,
                                        })
                                    }
                                />
                            </ToolsPanelItem>
                            <ToolsPanelItem
                                hasValue={() => buttonClass !== buttonDefaultClass}
                                label={__('Button classes', 'bbfse-plugin')}
                                onDeselect={() => {
                                    setAttributes({
                                        buttonClass: buttonDefaultClass,
                                    });
                                }}
                                isShownByDefault
                            >
                                <TextControl
                                    label={__('Button classes', 'bbfse-plugin')}
                                    value={buttonClass}
                                    onChange={
                                        (buttonClass) => setAttributes({buttonClass})
                                    }
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
        if (true === forNavbar && ('button-group-input' !== buttonPosition && 'no-button' !== buttonPosition)) {
            classNameValue += ' me-2';
        }
        return (
            <input
                type="search"
                className={(classNameValue)}
                aria-label={__('Optional placeholder text', 'bbfse-plugin')}
                placeholder={
                    placeholderText ? undefined : __('Optional placeholder…', 'bbfse-plugin')
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
        if (buttonClass) {
            buttonClasses = buttonClass;
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
                        aria-label={__('Search', 'bbfse-plugin')}
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
                    aria-label={__('Button text', 'bbfse-plugin')}
                    placeholder={__('Add button text…', 'bbfse-plugin')}
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
                                aria-label={__('Label text', 'bbfse-plugin')}
                                placeholder={__('Add label…', 'bbfse-plugin')}
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
                    {('button-group-input' === buttonPosition) ? (
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
                                    className={'no-button' === buttonPosition ? 'col-12' : 'col'}
                                >
                                    {renderTextField()}
                                </div>
                                {('no-button' !== buttonPosition) && (
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
                    {('button-group-input' === buttonPosition) ? (
                        <>
                            <div class="input-group">
                                {renderTextField()}
                                {renderButton()}
                            </div>
                        </>
                    ) : (
                        <>
                            {renderTextField()} 
                            {('no-button' !== buttonPosition) && (
                                <>{renderButton()}</>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}// end export;