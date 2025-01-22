

//------------------- 界面html 模块 -------------------

//添加操作模块点击事件
document.getElementById("close_plug_in_img").onclick = function() {
    showToast("已关闭");
    var lanhu_plug_in = document.getElementById("lanhu_plug_in");
    if (lanhu_plug_in != null)lanhu_plug_in.style.display = "none";
};
document.getElementById("lanhu_select").onclick = function() {
    setTimeout(function(){
        showToast("可以选择了");
    },100);
};
document.getElementById("all_visiable_img").onclick = function() {
    showToast("已全部选中显示");
    $('*[class*="page_plug_in_copy"]').find("*").css({"visibility":"visible"});
};
document.getElementById("all_invisiable_img").onclick = function() {
    showToast("已全部隐藏清除");
    $('*[class*="page_plug_in_copy"]').find("*").css({"visibility":"hidden"});
    //$('*[class*="page_plug_in_copy"]').css({"visibility":"hidden"});
};
document.getElementById("software_set_img").onclick = function() {
    init_software_set_dialog();
    show_software_set_dialog();
};
document.getElementById("help_img").onclick = function() {
    window.open("https://www.jianshu.com/p/7909a7a7b5b7");
};


var switch_ios_img = document.getElementById("switch_ios_img");
var switch_android_img = document.getElementById("switch_android_img");
var switch_swift_img = document.getElementById("switch_swift_img");
var switch_flutter_img = document.getElementById("switch_flutter_img");

function setCurLan(lan) {
    if (cur_lan == lan)return;
    cur_lan = lan;
    saveStorageCurLan();
    if (isIOS()) {
        showToast("已切换成 iOS");
        $("#export_btn_img").attr("src",export_btn_img_ios());
        $("#export_btn_text").text("生成iOS布局");
    }
    if (isANDROID()) {
        showToast("已切换成 Android");
        $("#export_btn_img").attr("src",export_btn_img_android());
        $("#export_btn_text").text("生成Android布局");
    }
    if (isFLUTTER()) {
        showToast("已切换成 Flutter");
        $("#export_btn_img").attr("src",export_btn_img_flutter());
        $("#export_btn_text").text("生成Flutter布局");
    }
    if (isSWIFT()) {
        showToast("已切换成 Swift");
        $("#export_btn_img").attr("src",export_btn_img_swift());
        $("#export_btn_text").text("生成Swift布局");
    }
    $("#switch_ios_img").css("opacity",isIOS() ? 1 : 0.3);
    $("#switch_android_img").css("opacity",isANDROID() ? 1 : 0.3);
    $("#switch_flutter_img").css("opacity",isFLUTTER() ? 1 : 0.3);
    $("#switch_swift_img").css("opacity",isSWIFT() ? 1 : 0.3);
    clearSelStatus();
}

function loadStorageCurLan() {
    if (!db_isSupportStorage())return;
    var lan = localStorage.getItem("cur_lan");
    if (lan && lan.length > 0){
        setCurLan(parseInt(lan));
    }
}

function saveStorageCurLan() {
    if (!db_isSupportStorage())return;
    localStorage.setItem("cur_lan",""+cur_lan);
}

loadStorageCurLan();

//添加切换语言模块点击事件
switch_ios_img.onclick = function() {
    if (DevelopDone_Lan_ios){
        setCurLan(Develop_Lan_ios);
    }else {
        showToast("iOS 功能开发中...");
    }
};
switch_android_img.onclick = function() {
    if (DevelopDone_Lan_android){
        setCurLan(Develop_Lan_android);
    }else {
        showToast("Android 功能开发中...");
    }
};
switch_swift_img.onclick = function() {
    if (DevelopDone_Lan_swift){
        setCurLan(Develop_Lan_swift);
    }else {
        showToast("Swift 功能开发中...");
    }
};
switch_flutter_img.onclick = function() {
    if (DevelopDone_Lan_flutter){
        setCurLan(Develop_Lan_flutter);
    }else {
        showToast("Flutter 功能开发中...");
    }
};

//添加事件
var longTapClassName = "";
var page_plug_in_copy_sel_view_class = null;
var timeout;
var timeout_copy;
function checkIsLongTapView(className){var ret = className == longTapClassName;longTapClassName = "";return ret;}
/**
 * 添加蓝湖代码预览块的鼠标选中hover事件
 */
function page_element_add_event() {
    $('*[class^="lanhu_plug_in"]').find("*").css({"visibility":"visible"});

    //左边页面page面板的点击和长按,鼠标经过和离开
    $('*[class^="page_plug_in "]').find("*").on({
        // 设置500ms延时模拟 长按 切换选中元素及后代元素的整体显示隐藏
        mousedown: function(event) {
            var className = $(this).prop("class");
            timeout = setTimeout(function() {
                //长按事件,将整个块选中或者隐藏
                var view = $('*[class*="page_plug_in_copy"]').find("*[class*='"+className+"']");
                // .css() 方法当用于获取属性值时，它只返回集合中第一个匹配元素的样式属性值
                var visibility = view.css('visibility');
                if(visibility == 'hidden'){
                    view.css({"visibility":"visible"});
                    // eq0是从列表中选择第1个元素, find选择所有后代
                    view.eq(0).find("*").css({"visibility":"visible"});
                }else{
                    view.css({"visibility":"hidden"});
                    view.eq(0).find("*").css({"visibility":"hidden"});
                }
                longTapClassName = className;
            }, 500);
            event.stopPropagation();
        },
        // 点击松开了立即清除上面的延时
        mouseup: function(event) {
            clearTimeout(timeout);
            event.stopPropagation();
        },
        // 鼠标移出了立即清除上面的延时
        mouseout: function(event) {
            clearTimeout(timeout);
            event.stopPropagation();
        },
        // 点击时只切换当前元素（不包括后代）的显示隐藏
        click: function (event) {
            // 为点击的元素添加红色边框
            $(this).css({"outline":"red solid 1px"});
            // 获取点击元素的class属性
            var className = $(this).prop("class");
            // 如果是长按事件触发的点击，则直接返回
            if(checkIsLongTapView(className))return;
            // 查找与点击元素class属性匹配的元素
            var view = $('*[class*="page_plug_in_copy"]').find("*[class*='"+className+"']");
            // 获取匹配元素的visibility属性
            var visibility = view.css('visibility');
            // 如果匹配元素是隐藏的，则显示它；否则隐藏它
            if(visibility == 'hidden'){
                view.css({"visibility":"visible"});
            }else{
                view.css({"visibility":"hidden"});
            }
            // 阻止事件冒泡
            event.stopPropagation();
        },
        mouseover: function (event) {
            // 为鼠标经过的元素添加红色虚线边框
            $(this).css({"outline":"red dashed 1px"});
            // 阻止事件冒泡
            event.stopPropagation();
        },
        mouseout: function (event) {
            $(this).css({"outline":""});
            event.stopPropagation();
        }
    });

    //右边页面page面板的点击和长按,鼠标经过和离开
    $('*[class^="page_plug_in_copy"]').find("*").on({
        // 设置750ms延时模拟 长按 切换显示选中元素不含后代，并 操作控件：show_select_view(className,false,true);
        mousedown: function(event) {
            // 获取当前元素的class属性
            var className = $(this).prop("class");
            // 设置一个750毫秒的延时，模拟长按事件
            timeout_copy = setTimeout(function() {
                // 长按事件，将整个块选中或者隐藏
                longTapClassName = className;

                // 长按也是选中
                // 移除所有元素的蓝色边框
                $('*[class^="page_plug_in_copy"]').find("*").css({"outline":""});
                // 如果当前选中的元素与之前选中的元素相同，则取消选中
                if(page_plug_in_copy_sel_view_class != null){
                    if(className == page_plug_in_copy_sel_view_class){
                        page_plug_in_copy_sel_view_class = "";
                        return;
                    }
                }
                // 查找与当前元素class属性匹配的元素
                var view = $('*[class*="page_plug_in_copy"]').find("*[class*='"+className+"']");
                // 为匹配的元素添加蓝色边框
                view.css({"outline":"blue solid 1px"});
                // 更新当前选中的元素class属性
                page_plug_in_copy_sel_view_class = className;
                // 显示选中的视图
                show_select_view(className,false,true);
            }, 750);
            // 阻止事件冒泡
            event.stopPropagation();
        },
        mouseup: function(event) {
            clearTimeout(timeout_copy);
            event.stopPropagation();
        },
        mouseout: function(event) {
            clearTimeout(timeout_copy);
            event.stopPropagation();
        },
        // 点击时：1. 选中当前元素给当前元素加蓝实线
        // 2. 传入当前类名给控件区显示：show_select_view(page_plug_in_copy_sel_view_class,true,false);
        click: function (event) {
            var className = $(this).prop("class");
            if(checkIsLongTapView(className)){event.stopPropagation();return;}
            $('*[class^="page_plug_in_copy"]').find("*").css({"outline":""});
            if(page_plug_in_copy_sel_view_class != null){
                if(className == page_plug_in_copy_sel_view_class){
                    page_plug_in_copy_sel_view_class = "";
                    show_select_view(page_plug_in_copy_sel_view_class,true,false);
                    event.stopPropagation();
                    return;
                }
            }
            $(this).css({"outline":"blue solid 1px"});
            page_plug_in_copy_sel_view_class = className;
            show_select_view(page_plug_in_copy_sel_view_class,true,false);
            event.stopPropagation();
        },
        mouseover: function (event) {
            if(page_plug_in_copy_sel_view_class != null){
                var className = $(this).prop("class");
                if(className == page_plug_in_copy_sel_view_class){
                    event.stopPropagation();
                    return;
                }
            }
            $(this).css({"outline":"blue dashed 1px"});
            event.stopPropagation();
        },
        mouseout: function (event) {
            if(page_plug_in_copy_sel_view_class != null){
                var className = $(this).prop("class");
                if(className == page_plug_in_copy_sel_view_class){
                    event.stopPropagation();
                    return;
                }
            }
            $(this).css({"outline":""});
            event.stopPropagation();
        }
    });
}
page_element_add_event();

function clickSelViewByClassName(className) {
    $('*[class^="page_plug_in_copy"]').find("*").css({"outline":""});
    var view = $('*[class*="page_plug_in_copy"]').find("*[class*='"+className+"']");
    view.css({"outline":"blue solid 1px"});
    page_plug_in_copy_sel_view_class = className;
    show_select_view(page_plug_in_copy_sel_view_class,true,false);
}

function clearSelStatus() {
    $('*[class^="page_plug_in_copy"]').find("*").css({"outline":""});
    page_plug_in_copy_sel_view_class = "";
    longTapClassName = "";
    show_select_view(page_plug_in_copy_sel_view_class,true,false);
}

//生成xml代码按钮

document.getElementById("export_xml").onclick = function() {
    export_xml();
};

switch_page($('*[class^="page flex-"]').html());
// $('*[class^="page flex-col"]').remove();

//------------------- 界面html 模块 -------------------