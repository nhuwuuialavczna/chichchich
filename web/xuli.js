$(document).ready(function () {
    $('#btnClick').on('click',function () {
        // alert($('.p'));
        // $('#div1 > p').attr('style','color:red'); // p.style.color = 'red'
        $('#div1 > p').css('color','red'); // p.style.color = 'red'
        $('#div1').prepend('<p>vcvxzcvzxvcxz</p>');
    });
});