/**
 * 是否已经注入js
 */
function haveInserted(document) {
    var body = document.body.innerHTML.toString();
    if (body.includes("https://dds.lanhuapp.com")){
        // 获取 iframe的src url后缀：#/?version_id=be52d203-a52d-46f3-8b45-2557a592158d&source=detailDetachTab&plugin=sketchPlugin&plugin_version=3.2.2
        var url = get_mid("https://dds.lanhuapp.com","\"",body + "\"");
        url = "https://dds.lanhuapp.com" + url;
        url = url.replaceAll("&amp%3B","&");
        url = url.replaceAll("&amp;","&");
        alert("找到了对应的蓝湖代码,请点击确定跳转至新的页面,并且再次点击插件即可")
        window.open(url);
        return false;
    }
    if (!body.includes("page flex-")){
        alert("没找到蓝湖相关代码")
        return false;
    }
    var lanhu_plug_in = document.getElementById("lanhu_plug_in");
    // 若已经注入过了, 触发函数时，尝试使容器div 显示出来（非隐藏）
    if (lanhu_plug_in != null) {
        lanhu_plug_in.style.display = "";
        return false;
    }
    return true;
}

/** 提取text中left和right之间的字符串 */
function get_mid(left,right,text){
    if (text && left && right && text.length > 0 && left.length > 0 && right.length > 0 && text.includes(left) && text.includes(right) && left != right){
        var leftIndex = text.indexOf(left);
        var rightIndex = text.indexOf(right,leftIndex);
        if (leftIndex >= 0 && rightIndex >= 0 && leftIndex + left.length < rightIndex){
            return text.substring(leftIndex + left.length,rightIndex);
        }
    }
    return "";
}

/**
 * 注入成功后,会自动执行下方代码,去判断是否已经注入过其它所有的js,如果注入过了,就不要再注入了,否则会报错
 */
chrome.runtime.sendMessage({
    action: "checkHaveInserted",
    source: haveInserted(document)
});
