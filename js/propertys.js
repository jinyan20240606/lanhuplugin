




//------------------- 控件信息组合 模块 -------------------



/**
 * 拼装预览区page_plug_in_copy所有子元素的所有属性存成 map[]
 * @returns {Array<map>} `Array<map>` 返回一个数组,每个子元素对应一个map对象 
 */
function assembleProperty(){
    //拼装属性,得到控件所有属性
    // 定义一个数组用于存储控件属性
    var array = new Array();
    var cur = 0;

    //获取画布的x,y
    // 获取画布的x坐标
    var canvas_x = $('*[class*="page_plug_in_copy"]').offset().left;
    // 获取画布的y坐标
    var canvas_y = $('*[class*="page_plug_in_copy"]').offset().top;

    // 遍历画布中所有class以"page_plug_in_copy"开头的元素及其子元素
    $('*[class^="page_plug_in_copy"]').find("*").each(function(){
        // 定义一个布尔值用于判断当前元素是否有class属性
        var isClass = false;
        // 定义一个字符串用于存储当前元素的class属性值
        var className = "";
        // 定义一个字符串用于存储当前元素的src属性值
        var src = "";
        // 遍历当前元素的所有特定的属性
        $.each(this.attributes, function() {
            // 判断属性是否为指定属性
            if(this.specified) {
                // 获取属性名
                var name = this.name;
                // 获取属性值
                var value = this.value;
                // 如果属性名为"src"，则将属性值赋给src变量
                if(name == "src") src = value;
                // 如果属性名为"class"，则将属性值赋给className变量，并将isClass变量设为true
                if(name == "class"){
                    className = value;
                    isClass = true;
                }
            }
        });
        // 如果当前元素有class属性，则继续拼装属性
        if(isClass == true){
            //拼装属性
            // 定义一个对象用于存储当前元素的属性
            var map = {};
            // 将当前元素的顺序存入map对象
            map["cur"] = cur.toString();cur ++;
            // 将当前元素的class属性值存入map对象
            map["className"] = className.toString();
            // 获取当前元素的标签名，并将其存入map对象
            var tagName = $(this)[0].tagName;  map["tagName"] = tagName.toString();
            // 获取当前元素的层级，并将其存入map对象
            var index = $(this).parents().length;  map["index"] = index.toString();
            // 获取当前元素在其父元素中的索引，并将其存入map对象
            var brother_index = $(this).index();  map["brother_index"] = brother_index.toString();
            // 获取当前元素的父元素的class属性值，并将其存入map对象
            var parent = $(this).parent().prop("class"); map["parent"] = parent.toString();
            // 获取当前元素的可见性，并将其存入map对象
            var visibility = $(this).css("visibility");map["visibility"] = visibility;
            // 获取当前元素相对于画布的x坐标，并将其存入map对象
            var window_x = $(this).offset().left - canvas_x;  map["window_x"] = window_x.toString();
            // 获取当前元素相对于画布的y坐标，并将其存入map对象
            var window_y = $(this).offset().top - canvas_y;  map["window_y"] = window_y.toString();
            // 获取当前元素的宽度，并将其存入map对象
            var width = $(this).width();  map["width"] = width.toString();
            // 获取当前元素的高度，并将其存入map对象
            var height = $(this).height();  map["height"] = height.toString();
            // 获取当前元素的背景颜色，并将其存入map对象
            var background_color = $(this).css("background-color");  map["background_color"] = background_color.toString();
            // 获取当前元素的left属性值，并将其存入map对象
            var left = $(this).css("left");  map["left"] = left.toString();
            // 获取当前元素的top属性值，并将其存入map对象
            var top = $(this).css("top");  map["top"] = top.toString();
            // 获取当前元素的right属性值，并将其存入map对象
            var right = $(this).css("right");  map["right"] = right.toString();
            var bottom = $(this).css("bottom");  map["bottom"] = bottom.toString();
            var margin = $(this).css("margin");  map["margin"] = margin.toString();
            // 获取当前元素的margin-bottom属性值，并将其存入map对象
            var margin_top = $(this).css("margin-top");  map["margin_top"] = margin_top.toString();
            // 获取当前元素的文字颜色，并将其存入map对象
            var margin_left = $(this).css("margin-left");  map["margin_left"] = margin_left.toString()
            // 获取当前元素的字体大小，并将其存入map对象
            var margin_right = $(this).css("margin-right");  map["margin_right"] = margin_right.toString();
            // 获取当前元素的字体系列，并将其存入map对象
            var margin_bottom = $(this).css("margin-bottom");  map["margin_bottom"] = margin_bottom.toString();
            // 获取当前元素的行高，并将其存入map对象
            var color = $(this).css("color");  map["color"] = color.toString();
            // 获取当前元素的文字对齐方式，并将其存入map对象
            var font_size = $(this).css("font-size");  map["font_size"] = font_size.toString();
            // 获取当前元素的边框属性值，并将其存入map对象
            var font_family = $(this).css("font-family");  map["font_family"] = font_family.toString();
            // 获取当前元素的边框圆角属性值，并将其存入map对象
            var line_height = $(this).css("line-height");  map["line_height"] = line_height.toString();
            // 获取当前元素的背景属性值，并将其存入map对象
            var text_align = $(this).css("text-align");  map["text_align"] = text_align.toString();
            // 获取当前元素的justify-content属性值，并将其存入map对象
            var border = $(this).css("border");  map["border"] = border.toString();
            // 获取当前元素的display属性值，并将其存入map对象
            var border_radius = $(this).css("border-radius");  map["border_radius"] = border_radius.toString();
            var background = $(this).css("background");  map["background"] = background.toString();
            // 获取当前元素的flex-direction属性值，并将其存入map对象
            var justify_content = $(this).css("justify-content");  map["justify_content"] = justify_content.toString();
            // 获取当前元素的透明度属性值，并将其存入map对象
            var display = $(this).css("display");  map["display"] = display.toString();
            var flex_direction = $(this).css("flex-direction");  map["flex_direction"] = flex_direction.toString();
            // 获取当前元素的align-items属性值，并将其存入map对象
            var opacity = $(this).css("opacity");  map["opacity"] = opacity.toString();
            // 如果当前元素的标签名为"span"，则获取其文本内容，并将其存入map对象
            var align_items = $(this).css("align-items");  map["align_items"] = align_items.toString();
            
            // 如果当前元素的标签名为"span"，则获取其文本内容，并将其存入map对象
            if (tagName.toLowerCase() == "span"){
                var text = $(this).text();  map["text"] = text;
                if(color) map["text_color"] = color;
            }
            // 如果当前元素的标签名为"button"，则获取其文本内容，并将其存入map对象
            if (tagName.toLowerCase() == "button"){
                var text = $(this).html();
                if (!text.includes("<")){
                    map["text"] = text;
                    if(color) map["text_color"] = color;
                }
            }
            if (src && src.length > 0) map["src"] = src;
            array.push(map);
        }
    });
    return array;
}

function assemblePropertyForView(thisV){
    //拼装属性,得到控件所有属性
    var array = new Array();
    var cur = 0;

    //获取画布的x,y
    var canvas_x = thisV.offset().left;
    var canvas_y = thisV.offset().top;

    thisV.find("*").each(function(){
        var isClass = false;
        var className = "";
        var src = "";
        $.each(this.attributes, function() {
            if(this.specified) {
                var name = this.name;
                var value = this.value;
                if(name == "src") src = value;
                if(name == "class"){
                    className = value;
                    isClass = true;
                }
            }
        });
        if(isClass == true){
            //拼装属性
            var map = {};
            map["cur"] = cur.toString();cur ++;
            map["className"] = className.toString();
            var tagName = $(this)[0].tagName;  map["tagName"] = tagName.toString();
            var index = $(this).parents().length;  map["index"] = index.toString();
            var brother_index = $(this).index();  map["brother_index"] = brother_index.toString();
            var parent = $(this).parent().prop("class"); map["parent"] = parent.toString();
            var visibility = $(this).css("visibility");map["visibility"] = visibility;
            var window_x = $(this).offset().left - canvas_x;  map["window_x"] = window_x.toString();
            var window_y = $(this).offset().top - canvas_y;  map["window_y"] = window_y.toString();
            var width = $(this).width();  map["width"] = width.toString();
            var height = $(this).height();  map["height"] = height.toString();
            var background_color = $(this).css("background-color");  map["background_color"] = background_color.toString();
            var left = $(this).css("left");  map["left"] = left.toString();
            var top = $(this).css("top");  map["top"] = top.toString();
            var right = $(this).css("right");  map["right"] = right.toString();
            var bottom = $(this).css("bottom");  map["bottom"] = bottom.toString();
            var margin = $(this).css("margin");  map["margin"] = margin.toString();
            var margin_top = $(this).css("margin-top");  map["margin_top"] = margin_top.toString();
            var margin_left = $(this).css("margin-left");  map["margin_left"] = margin_left.toString()
            var margin_right = $(this).css("margin-right");  map["margin_right"] = margin_right.toString();
            var margin_bottom = $(this).css("margin-bottom");  map["margin_bottom"] = margin_bottom.toString();
            var color = $(this).css("color");  map["color"] = color.toString();
            var font_size = $(this).css("font-size");  map["font_size"] = font_size.toString();
            var font_family = $(this).css("font-family");  map["font_family"] = font_family.toString();
            var line_height = $(this).css("line-height");  map["line_height"] = line_height.toString();
            var text_align = $(this).css("text-align");  map["text_align"] = text_align.toString();
            var border = $(this).css("border");  map["border"] = border.toString();
            var border_radius = $(this).css("border-radius");  map["border_radius"] = border_radius.toString();
            var background = $(this).css("background");  map["background"] = background.toString();
            var justify_content = $(this).css("justify-content");  map["justify_content"] = justify_content.toString();
            var display = $(this).css("display");  map["display"] = display.toString();
            var flex_direction = $(this).css("flex-direction");  map["flex_direction"] = flex_direction.toString();
            var opacity = $(this).css("opacity");  map["opacity"] = opacity.toString();
            var align_items = $(this).css("align-items");  map["align_items"] = align_items.toString();
            if (tagName.toLowerCase() == "span"){
                var text = $(this).text();  map["text"] = text;
                if(color) map["text_color"] = color;
            }
            if (tagName.toLowerCase() == "button"){
                var text = $(this).html();
                if (!text.includes("<")){
                    map["text"] = text;
                    if(color) map["text_color"] = color;
                }
            }
            if (src && src.length > 0) map["src"] = src;
            array.push(map);
        }
    });
    return array;
}

//------------------- 控件信息组合 模块 -------------------


