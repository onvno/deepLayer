# deepLayer

use

        // ie8背景半透明和点击背景关闭目前是鱼和熊掌的关系，暂时没有时间解决,未来估计也不会考虑解决 
        var myContent = document.getElementById('content');
        var layerBtn = document.getElementById('layerbtn');
        deepLayer({
            openBtn:layerBtn, // *必须项，点击触发弹出事件的按钮
            closeBtn: true, // 弹出层是否需要关闭按钮
            content: myContent, // *必须项,需要弹出的内容
            width: 600, // 弹出层宽度
            bgLayer: true // 是否需要添加背景层
        });