var BomUtil = {

    getViewPortSize: function() {
        //获取窗口宽度和高度
        var viewW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
        var viewH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
        return { 'width': viewW, 'height': viewH };
    }
};