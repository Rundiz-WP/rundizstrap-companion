

// on dom ready --------------------------------------------------------------------------------------------------------
(function($) {
    let editor = [];
    let textarea_editor = [];
    let textarea_id = [];

    $('.ace-editor').each(function (index) {
        editor[index] = ace.edit(this);

        let editor_mode = $(this).data('editor_mode');
        textarea_id[index] = $(this).data('target_textarea');
        textarea_editor[index] = $(textarea_id[index]);

        textarea_editor[index].hide();

        editor[index].setOptions({
            maxLines: 'Infinity',
            mode: 'ace/mode/' + editor_mode,
            theme: 'ace/theme/monokai'
        })

        editor[index].getSession().setValue(textarea_editor[index].val());
        editor[index].getSession().on('change', function (e) {
            console.log('>' + textarea_id[index] + ' had changed');
            textarea_editor[index].val(editor[index].getSession().getValue());
        });
    });
})(jQuery);