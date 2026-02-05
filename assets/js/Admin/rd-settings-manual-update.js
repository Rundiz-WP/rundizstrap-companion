/**
 * Manual update js.
 */


/**
 * Ajax manual update step by step.
 * 
 * @returns {undefined}
 */
function bbfse_plugin_manualUpdateAjax()
{
    var $ = jQuery.noConflict();

    $('.form-result-placeholder').html('');
    $('.manual-update-action-button').attr('disabled', 'disabled');
    $('.manual-update-action-placeholder').html('<i class="bi bi-hourglass"></i>');

    if (RdSettingsManualUpdate.completed === 'true') {
        $('.manual-update-action-button').removeAttr('disabled');
        $('.manual-update-action-placeholder').html('');
        return ;
    }

    if (RdSettingsManualUpdate.alreadyRunUpdateKey === '') {
        var runUpdateKey = 0;
    } else {
        var runUpdateKey = (parseInt(RdSettingsManualUpdate.alreadyRunUpdateKey) + 1);
    }
    $.ajax({
        'url': ajaxurl,
        'method': 'POST',
        'data': 'security='+RdSettingsManualUpdate.nonce+'&action=bbfse_plugin_manualUpdate&updateKey='+runUpdateKey,
        'dataType': 'json'
    })
    .done(function(data, textStatus, jqXHR) {
        var response = data;
        if (typeof(response) === 'undefined') {
            response = {};
        }

        if (typeof(response) === 'object') {
            if (typeof(response.alreadyRunKey) !== 'undefined') {
                RdSettingsManualUpdate.alreadyRunUpdateKey = parseInt(response.alreadyRunKey);
            }
            RdSettingsManualUpdate.alreadyRunUpdateTotal++;
            $('.already-run-total-action').text(RdSettingsManualUpdate.alreadyRunUpdateTotal);
            if (typeof(response.nextRunKey) !== 'undefined') {
                if (response.nextRunKey !== 'end') {
                    // if not completed, let admin do manual update until completed successfully.
                    $('.manual-update-action-button').text(RdSettingsManualUpdate.txtNext);
                } else {
                    // if completed.
                    $('.manual-update-action-button').text(RdSettingsManualUpdate.txtCompleted);
                    RdSettingsManualUpdate.completed = 'true';
                }
            }
            $('.manual-update-action-placeholder').html('<i class="bi bi-check-lg"></i>');
        } else {
            $('.manual-update-action-placeholder').html('');
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        $('.manual-update-action-placeholder').html('');
    })
    .always(function(data, textStatus, jqXHR) {
        if (typeof(data) !== 'undefined' && typeof(data.responseJSON) !== 'undefined') {
            var response = data.responseJSON;
        } else if (typeof(data) !== 'undefined' && typeof(data.responseText) !== 'undefined') {
            var response = data.responseText;
        } else {
            var response = data;
        }
        if (typeof(response) === 'undefined' || response === null) {
            response = {};
        }

        if (typeof(response) !== 'undefined' && typeof(response.formResultClass) !== 'undefined' && typeof(response.formResultMsg) !== 'undefined') {
            var noticehtml = bbfse_plugin_GetNoticeElement(response.formResultClass, response.formResultMsg);
            $('.form-result-placeholder').html(noticehtml);
        }

        $('.manual-update-action-button').removeAttr('disabled');
    });
}// bbfse_plugin_manualUpdateAjax


/**
 * Get notice html element from class and message specified.
 * 
 * @param {string} notice_class
 * @param {string} notice_message
 * @returns {String}
 */
function bbfse_plugin_GetNoticeElement(notice_class, notice_message) {
    var output = '<div class="'+notice_class+' notice is-dismissible">';

    if (typeof(notice_message) === 'string') {
        output += '<p><strong>'+notice_message+'</strong></p>';
    } else if (typeof(notice_message) === 'object') {
        jQuery.each(notice_message, function(index, eachMessage) {
            output += '<p><strong>'+eachMessage+'</strong></p>';
        });
    }

    output += '<button type="button" class="notice-dismiss"><span class="screen-reader-text">'+RdSettingsManualUpdate.txtDismissNotice+'</span></button>'
        +'</div>';

    return output;
}// bbfse_plugin_GetNoticeElement


// on dom ready --------------------------------------------------------------------------------------------------------
(function($) {
    $('.manual-update-action-button').on('click', function(e) {
        e.preventDefault();
        bbfse_plugin_manualUpdateAjax();
    });
})(jQuery);
