$(function(){
    $("#tb-data").flexigrid({
        url: '#',
        dataType: 'json',
        colModel : [
            {display: '交易号', name : 'iso',  sortable : true, align: 'center',width : '20%'},
            {display: '订单号', name : 'name', sortable : true, align: 'center',width : '15%'},
            {display: '用户名', name : 'printable_name', sortable : true, align: 'center',width : '15%'},
            {display: '商家用户名', name : 'iso3',  sortable : true, align: 'center',width : '20%'},
            {display: '金额', name : 'numcode',  sortable : true, align: 'center',width : '15%'},
            {display: '类型', name : 'iso30',  sortable : true, align: 'center',width : '15%'}
        ],
        singleSelect : true,
        resizable : false,
        usepager : true,
        useRp : true,
        rp : 10,
        height : 400
    });

    /* 日期类初始化*/
    var picker = new Pikaday(
        {

            field: document.getElementById('datestart'),
            firstDay: 1,
            minDate: new Date('2000-01-01'),
            maxDate: new Date('2030-12-31'),
            yearRange: [2000,2030]
        });
    var picker = new Pikaday(
        {
            field: document.getElementById('dateend'),
            firstDay: 1,
            minDate: new Date('2000-01-01'),
            maxDate: new Date('2030-12-31'),
            yearRange: [2000,2030]
        });


});