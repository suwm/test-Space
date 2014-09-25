
(function(){
    var mDialogModol = $('.m-dialog-modol'),mDialog = $('.m-dialog');
    mDialogModol.click(function(){
        $('.m-dialog-modol').fadeOut(200);
        mDialog.fadeOut(200);
    });
    $('.dialog-close').click(function(){
        mDialogModol.fadeOut(200);
        mDialog.fadeOut(200);
    });
    $('.dialog-btn-ok').click(function(){
        var receiver  = $(".dialog-body input");
        var param = receiver.val();
        receiver.val("")
        window.frames["mainiframe"].window.resetValue(param);
        mDialogModol.fadeOut(200);
        mDialog.fadeOut(200);
    });
    $('.dialog-btn-cancel').click(function(){
        mDialogModol.fadeOut(200);
        mDialog.fadeOut(200);
    });

})();
function dialogFadeIn(){
    $('.m-dialog-modol').fadeIn(200);
    $('.m-dialog').fadeIn(400);
}