/**
 * Ace editor or code editor.
 * 
 * @package rundizstrap-companion
 */


// on dom ready --------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    let editor = [];
    let textarea_editor = [];
    let textarea_id = [];

    const aceEditors = document.querySelectorAll('.ace-editor');
    aceEditors.forEach(function (editorElement, index) {
        editor[index] = ace.edit(editorElement);

        let editor_mode = editorElement.dataset.editor_mode;
        textarea_id[index] = editorElement.dataset.target_textarea;

        textarea_editor[index] = null;
        if (textarea_id[index]) {
            textarea_editor[index] = document.querySelector(textarea_id[index]);
        }

        if (textarea_editor[index]) {
            textarea_editor[index].style.display = 'none';
        }

        editor[index].setOptions({
            maxLines: 'Infinity',
            mode: 'ace/mode/' + editor_mode,
            theme: 'ace/theme/monokai'
        })

        if (textarea_editor[index]) {
            editor[index].getSession().setValue(textarea_editor[index].value);
        } else {
            editor[index].getSession().setValue('');
        }

        editor[index].getSession().on('change', function (e) {
            console.log('>' + textarea_id[index] + ' had changed');

            if (textarea_editor[index]) {
                textarea_editor[index].value = editor[index].getSession().getValue();
            }
        });
    });// end forEach()
});// end dom content loaded
