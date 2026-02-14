/**
 * Bootstrap post navigation link block variations.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';

import { nextIcon, previousIcon } from './icons.js';


const variations = [
    {
        name: 'post-previous',
        title: __('Bootstrap Previous Post', 'rundizstrap-companion'),
        description: __('Displays the post link that precedes the current post in Bootstrap style.', 'rundizstrap-companion'),
        icon: previousIcon,
        attributes: { 
            type: 'previous',
            className: 'btn btn-secondary',
        },
        scope: ['inserter', 'transform'],
        example: {
            attributes: {
                className: 'btn btn-secondary',
                type: 'previous',
                label: __('Previous post', 'rundizstrap-companion'),
            }
        },
    },
    {
        isDefault: true,
        name: 'post-next',
        title: __('Bootstrap Next Post', 'rundizstrap-companion'),
        description: __('Displays the post link that follows the current post in Bootstrap style.', 'rundizstrap-companion'),
        icon: nextIcon,
        attributes: { 
            type: 'next',
            className: 'btn btn-secondary',
        },
        scope: ['inserter', 'transform'],
        example: {
            attributes: {
                className: 'btn btn-secondary',
                type: 'next',
                label: __('Next post', 'rundizstrap-companion'),
            }
        },
    },
];

variations.forEach((variation) => {
    variation.isActive = (blockAttributes, variationAttributes) => blockAttributes.type === variationAttributes.type;
});

export default variations;
