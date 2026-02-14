/**
 * Bootstrap pagination block edit component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
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
} from '@wordpress/block-editor';

/**
 * Element is a package that builds on top of React and provide a set of utilities to work with React components and React elements.
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { useEffect } from '@wordpress/element';

/**
 * Imports the necessary components that will be used to create
 * the user interface for the block's settings.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/
 */
import {
    Disabled,
    RangeControl,
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
        showPreviousNext,
        previousText,
        nextText,
        showPageNumbers,
        numberOfPages,
        additionalClass,
        alignment,
    } = attributes;

    const paginationDefaultPreviousText = __('« Previous', 'rundizstrap-companion');
    const paginationDefaultNextText = __('Next »', 'rundizstrap-companion');
    const paginationDefaultNumberOfPages = 2;

    useEffect(() => {
        if (!attributes.previousText) {
            setAttributes({ previousText: paginationDefaultPreviousText });
        }
        if (!attributes.nextText) {
            setAttributes({ nextText: paginationDefaultNextText });
        }
    }, []);

    const alignmentOptions = [
        {
            label: __('Default (Start)', 'rundizstrap-companion'),
            value: '',
        },
        {
            label: __('Center', 'rundizstrap-companion'),
            value: 'justify-content-center',
        },
        {
            label: __('End', 'rundizstrap-companion'),
            value: 'justify-content-end',
        },
    ];

    const controls = (
        <>
            <InspectorControls>
                <ToolsPanel
                    label={__('Settings', 'rundizstrap-companion')}
                    resetAll={() => {
                        setAttributes({
                            showPreviousNext: true,
                            previousText: paginationDefaultPreviousText,
                            nextText: paginationDefaultNextText,
                            showPageNumbers: true,
                            numberOfPages: paginationDefaultNumberOfPages,
                            additionalClass: '',
                            alignment: '',
                        });
                    }}
                >
                    <ToolsPanelItem
                        hasValue={() => !showPreviousNext}
                        label={__('Show previous/next buttons', 'rundizstrap-companion')}
                        onDeselect={() => {
                            setAttributes({
                                showPreviousNext: true,
                            });
                        }}
                        isShownByDefault
                    >
                        <ToggleControl
                            checked={showPreviousNext}
                            label={__('Show previous/next buttons', 'rundizstrap-companion')}
                            onChange={(value) =>
                                setAttributes({
                                    showPreviousNext: value,
                                })
                            }
                        />
                    </ToolsPanelItem>
                    {showPreviousNext && (
                        <>
                            <ToolsPanelItem
                                hasValue={() => previousText !== paginationDefaultPreviousText}
                                label={__('Previous button text', 'rundizstrap-companion')}
                                onDeselect={() => {
                                    setAttributes({
                                        previousText: paginationDefaultPreviousText,
                                    });
                                }}
                                isShownByDefault
                            >
                                <TextControl
                                    label={__('Previous button text/HTML', 'rundizstrap-companion')}
                                    help={__('You can use HTML for icons, e.g. <i class="bi bi-chevron-left"></i>', 'rundizstrap-companion')}
                                    value={previousText}
                                    onChange={
                                        (previousText) => setAttributes({previousText})
                                    }
                                />
                            </ToolsPanelItem>
                            <ToolsPanelItem
                                hasValue={() => nextText !== paginationDefaultNextText}
                                label={__('Next button text', 'rundizstrap-companion')}
                                onDeselect={() => {
                                    setAttributes({
                                        nextText: paginationDefaultNextText,
                                    });
                                }}
                                isShownByDefault
                            >
                                <TextControl
                                    label={__('Next button text/HTML', 'rundizstrap-companion')}
                                    help={__('You can use HTML for icons, e.g. <i class="bi bi-chevron-right"></i>', 'rundizstrap-companion')}
                                    value={nextText}
                                    onChange={
                                        (nextText) => setAttributes({nextText})
                                    }
                                />
                            </ToolsPanelItem>
                        </>
                    )}
                    <ToolsPanelItem
                        hasValue={() => !showPageNumbers}
                        label={__('Show page numbers', 'rundizstrap-companion')}
                        onDeselect={() => {
                            setAttributes({
                                showPageNumbers: true,
                            });
                        }}
                        isShownByDefault
                    >
                        <ToggleControl
                            checked={showPageNumbers}
                            label={__('Show page numbers', 'rundizstrap-companion')}
                            onChange={(value) =>
                                setAttributes({
                                    showPageNumbers: value,
                                })
                            }
                        />
                    </ToolsPanelItem>
                    {showPageNumbers && (
                        <>
                            <ToolsPanelItem
                            hasValue={() => numberOfPages !== paginationDefaultNumberOfPages}
                            label={__('Number of adjacent pages', 'rundizstrap-companion')}
                            onDeselect={() => {
                                setAttributes({
                                    numberOfPages: paginationDefaultNumberOfPages,
                                });
                            }}
                            isShownByDefault
                            >
                                <RangeControl
                                    label={__('Number of adjacent pages', 'rundizstrap-companion')}
                                    help={__('Specify how many links can appear before and after the current page number. Links to the first, current and last page are always visible.', 'rundizstrap-companion')}
                                    value={numberOfPages}
                                    onChange={(value) => setAttributes({numberOfPages: value})}
                                    min={0}
                                    max={20}
                                />
                            </ToolsPanelItem>
                        </>
                    )}
                    <ToolsPanelItem
                        hasValue={() => '' !== alignment}
                        label={__('Alignment', 'rundizstrap-companion')}
                        onDeselect={() => {
                            setAttributes({
                                alignment: '',
                            });
                        }}
                        isShownByDefault
                    >
                        <SelectControl
                            value={alignment}
                            __next40pxDefaultSize
                            label={__('Alignment', 'rundizstrap-companion')}
                            onChange={(value) => {
                                setAttributes({
                                    alignment: value,
                                });
                            }}
                            options={alignmentOptions}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => '' !== additionalClass}
                        label={__('Additional CSS class', 'rundizstrap-companion')}
                        onDeselect={() => {
                            setAttributes({
                                additionalClass: '',
                            });
                        }}
                        isShownByDefault
                    >
                        <TextControl
                            label={__('Additional CSS class', 'rundizstrap-companion')}
                            help={__('Add extra CSS classes to the pagination container.', 'rundizstrap-companion')}
                            value={additionalClass}
                            onChange={
                                (additionalClass) => setAttributes({additionalClass})
                            }
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
        </>
    );// end const controls

    // build pagination class for preview.
    let paginationClasses = 'pagination';
    if (alignment) {
        paginationClasses += ' ' + alignment;
    }
    if (additionalClass) {
        paginationClasses += ' ' + additionalClass;
    }

    // render a preview of the pagination.
    const renderPreview = () => {
        const pageItems = [];

        // previous button.
        if (showPreviousNext) {
            pageItems.push(
                <li key="prev" className="page-item disabled">
                    <span className="page-link" dangerouslySetInnerHTML={{__html: previousText || paginationDefaultPreviousText}} />
                </li>
            );
        }

        // page numbers.
        if (showPageNumbers) {
            // setup number of current + adjacent pages. (if number of pages is 2, then it will be 1 2 [3] 4 5.)
            const numOfCurAndAdjPages = (numberOfPages * 2) + 1;
            const currentPage = Math.ceil((numOfCurAndAdjPages / 2));
            for (let i = 1; i <= numOfCurAndAdjPages; i++) {
                pageItems.push(
                    <li key={i} className={`page-item${i === currentPage ? ' active' : ''}`}>
                        <span className="page-link">{i}</span>
                    </li>
                );
            }

            const lastPage = (numOfCurAndAdjPages + 2);
            pageItems.push(
                <li key="unavailable-page" className="page-item disabled">
                    <span className="page-link">...</span>
                </li>
            );
            pageItems.push(
                <li key="last-page" className="page-item">
                    <span className="page-link">{lastPage}</span>
                </li>
            );
        }// endif; page numbers.

        // next button.
        if (showPreviousNext) {
            pageItems.push(
                <li key="next" className="page-item">
                    <span className="page-link" dangerouslySetInnerHTML={{__html: nextText || paginationDefaultNextText}} />
                </li>
            );
        }

        return (
            <nav aria-label={__('Page navigation preview', 'rundizstrap-companion')}>
                <ul className={paginationClasses}>
                    {pageItems}
                </ul>
            </nav>
        );
    };// end const renderPreview()

    return (
        <div {...useBlockProps()}>
            {controls}
            <Disabled>
                {renderPreview()}
            </Disabled>
        </div>
    );
}// end export;
