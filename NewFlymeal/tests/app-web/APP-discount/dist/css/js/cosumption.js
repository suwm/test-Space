(function(document){
    var search ,consume,cancel;
    function pageInit(){

        search = document.getElementById("context-btn-search");
        consume = document.getElementById("consume");
        cancel = document.getElementById("cancel");
        listenerEventFactory();

    }
    pageInit();
    /**
     * 时间监听器Factory
     */
    function listenerEventFactory(){

        search.addEventListener("click",function(){
            elementDis("overlay","block")
        });//search event
        consume.addEventListener("click",function(){
        	elementDis("overlay","none");
        	elementDis("alert-msg","inline");
        	//setTimeout(3000,document.getElementById('alert-msg').style.display='none');
        });
        cancel.addEventListener("click",function(){elementDis("overlay","none");});
    }
    /**
     * 元素的显示/隐藏
     * @param element 元素 id
     * @param state 显示隐藏状态
     */
    function elementDis(element,state){
        var _ele = document.getElementById(element);
        _ele.style.display  = state;
    }
//    pageInit();
})(document);


//window.onload =pageInit;
