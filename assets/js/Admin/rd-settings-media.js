/**
 * Media js is working with media fields page where there are upload fields and it is not media button that comes with editor.
 */


// on dom ready --------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', function(event) {
        const uploadButton = event.target.closest('.upload-media-button');
        if (!uploadButton) {
            return;
        }

        event.preventDefault();

        let target_input = uploadButton.dataset.inputTarget;
        if (!target_input) {
            console.warn('No data-input-target specified on upload button.', uploadButton);
            return;
        }

        const image = wp.media({
			// mutiple: true if you want to upload multiple files at once
			multiple: false
        });
        image.open();
        image.on('select', function(e) {
			// This will return the selected image from the Media Uploader, the result is an object
		    const uploaded_image = image.state().get('selection').first();
			// We convert uploaded_image to a JSON object to make accessing it easier
            const media_json = uploaded_image.toJSON();
            console.debug('selected media in JSON format: ', media_json);

			// Let's assign the url value to the input field
            const setInputValue = function(id, value) {
                const inputElement = document.getElementById(id);
                if (inputElement) {
                    inputElement.value = value;
                }
            };
            setInputValue('preview-media-url-' + target_input, media_json.url || '');
            setInputValue('media-id-' + target_input, media_json.id || '');
            setInputValue('media-height-' + target_input, media_json.height || '');
            setInputValue('media-width-' + target_input, media_json.width || '');
            setInputValue('media-url-' + target_input, media_json.url || '');

            const sizes = media_json.sizes;
            if (sizes && sizes.large && typeof(sizes.large.url) !== 'undefined') {
                setInputValue('media-large-' + target_input, sizes.large.url);
			}
            if (sizes && sizes.medium && typeof(sizes.medium.url) !== 'undefined') {
                setInputValue('media-medium-' + target_input, sizes.medium.url);
			}
            if (sizes && sizes.thumbnail && typeof(sizes.thumbnail.url) !== 'undefined') {
                setInputValue('media-thumbnail-' + target_input, sizes.thumbnail.url);
                const previewElements = document.querySelectorAll('.image-preview-' + target_input);
                let index = 0;
                for (index = 0; index < previewElements.length; index++) {
                    previewElements[index].innerHTML = '<img src="' + sizes.thumbnail.url + '" alt="">';
                }
			}
		});
    });// end event click on upload media button.

    document.addEventListener('click', function (event) {
        const button = event.target.closest('.remove-media-button');
        if (!button) {
            return;
        }

        event.preventDefault();

        const targetInput = button.dataset.input_target;
        const ids = [
            'preview-media-url-',
            'media-id-',
            'media-height-',
            'media-width-',
            'media-url-',
            'media-large-',
            'media-medium-',
            'media-thumbnail-'
        ];

        ids.forEach(function (prefix) {
            const el = document.getElementById(prefix + targetInput);
            if (el) {
                el.value = '';
            }
        });

        const previews = document.getElementsByClassName('image-preview-' + targetInput);
        for (let i = 0; i < previews.length; i++) {
            previews[i].innerHTML = '';
        }
    });// end event click on remove media button.
});// end DOMContentLoaded
