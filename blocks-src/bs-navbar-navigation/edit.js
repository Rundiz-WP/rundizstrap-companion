/**
 * Bootstrap navbar navigation block edit component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import {
    SelectControl,
    TextControl,
    Disabled,
    ExternalLink,
    Notice,
    Spinner,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

import { addQueryArgs } from '@wordpress/url';

import { useSelect } from '@wordpress/data';

import { store as coreDataStore } from '@wordpress/core-data';

import { decodeEntities } from '@wordpress/html-entities';

import ServerSideRender from '@wordpress/server-side-render';

import metadata from './block.json';

import RundizStrapCompanionKeyValueCtrl from '../../assets/js/blocks/shared/rundizstrap-companion-keyvalue-control.js';
import { rundizstrap_companion_sanitize_html_class_list } from '../../assets/js/blocks/shared/rundizstrap-companion-sanitize.js';


export default function Edit({ attributes, setAttributes }) {
    const { navigationRef, dataAttributes, ariaAttributes, dropdownClassName } = attributes;

    const createNavigationUrl = addQueryArgs('post-new.php', { post_type: 'wp_navigation' });
    const manageNavigationUrl = addQueryArgs('site-editor.php', { postType: 'wp_navigation' });

    const navigationQuery = {
        per_page: -1,
        status: 'publish'
    };

    // retrieve posts from DB.
    const navigationPosts = useSelect(
        (select) => select(coreDataStore).getEntityRecords('postType', 'wp_navigation', navigationQuery),
        []
    );

    const navigationOptions = [
        {
            label: __('Auto: first available', 'rundizstrap-companion'),
            value: 0
        }
    ];

    if (Array.isArray(navigationPosts)) {
        navigationPosts.forEach((post) => {
            const title = post?.title?.rendered ? decodeEntities(post.title.rendered) : __('(no title)', 'rundizstrap-companion');
            navigationOptions.push({
                label: title,
                value: post.id
            });
        });
    }

    const blockProps = useBlockProps({
        className: 'navbar-nav'
    });

    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;

    return (
        <>
            <InspectorControls>
                <ToolsPanel
                    label={__('Navigation Settings', 'rundizstrap-companion')}
                    resetAll={() => setAttributes({
                        navigationRef: 0,
                        dataAttributes: {},
                        ariaAttributes: {},
                        dropdownClassName: ''
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => navigationRef !== 0}
                        label={__('Navigation', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ navigationRef: 0 })}
                        isShownByDefault
                    >
                        {navigationPosts === null && (
                            <Spinner />
                        )}
                        {navigationPosts !== null && (
                            <SelectControl
                                label={__('Navigation', 'rundizstrap-companion')}
                                value={navigationRef}
                                options={navigationOptions}
                                onChange={(value) => setAttributes({ navigationRef: parseInt(value, 10) || 0 })}
                                help={__('Select a Navigation post or leave auto to use the first available.', 'rundizstrap-companion')}
                            />
                        )}
                        <div>
                            <ExternalLink href={createNavigationUrl}>
                                {__('Create a new navigation', 'rundizstrap-companion')}
                            </ExternalLink>
                        </div>
                        <div>
                            <ExternalLink href={manageNavigationUrl}>
                                {__('Manage all navigations', 'rundizstrap-companion')}
                            </ExternalLink>
                        </div>
                        {Array.isArray(navigationPosts) && navigationPosts.length === 0 && (
                            <Notice status="warning" isDismissible={false}>
                                {__('No Navigation posts found. Create one in the Site Editor > Navigation.', 'rundizstrap-companion')}
                            </Notice>
                        )}
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(dataAttributes)}
                        label={__('Data attributes', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ dataAttributes: {} })}
                        isShownByDefault
                    >
                        <RundizStrapCompanionKeyValueCtrl
                            label={__('Data attributes', 'rundizstrap-companion') + ' '}
                            value={dataAttributes}
                            onChange={(value) => setAttributes({ dataAttributes: value })}
                            prefix="data-"
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(ariaAttributes)}
                        label={__('Aria attributes', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ ariaAttributes: {} })}
                        isShownByDefault
                    >
                        <RundizStrapCompanionKeyValueCtrl
                            label={__('Aria attributes', 'rundizstrap-companion') + ' '}
                            value={ariaAttributes}
                            onChange={(value) => setAttributes({ ariaAttributes: value })}
                            prefix="aria-"
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!dropdownClassName}
                        label={__('Dropdown menu class', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ dropdownClassName: '' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={__('Dropdown menu class', 'rundizstrap-companion')}
                            value={dropdownClassName}
                            onChange={(value) => setAttributes({ dropdownClassName: rundizstrap_companion_sanitize_html_class_list(value, true) })}
                            help={__('Additional classes for dropdown menu. The base class `dropdown-menu` is always applied.', 'rundizstrap-companion')}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>

            <div {...blockProps}>
                {Array.isArray(navigationPosts) && navigationPosts.length === 0 ? (
                    <div className="nav-item">
                        <span className="nav-link">
                            {__('No Navigation posts found to preview.', 'rundizstrap-companion')}
                        </span>
                    </div>
                ) : (
                    <Disabled>
                        <ServerSideRender
                            block={metadata.name}
                            attributes={attributes}
                        />
                    </Disabled>
                )}
            </div>
        </>
    );
}// Edit
