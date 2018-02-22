/**
 * 字符串处理的公共方法
 * 1.去除字符串空格 
 * 2.字母大小写切换
 * 3.字符串替换
 * 4.查找某个字符或字符串在另一个字符串中出现的次数
 */
var strJS = {
	/**
	 * 去除字符串空格  
	 * @param str 要处理的字符串
	 * @param type 1：所有空格  2：前后空格  3：前空格 4：后空格
	 */
	strTrim:function (str,type){
	    switch (type){
	        case 1:return str.replace(/\s+/g,"");
	        case 2:return str.replace(/(^\s*)|(\s*$)/g, ""); 
	        case 3:return str.replace(/(^\s*)/g, ""); 
	        case 4:return str.replace(/(\s*$)/g, ""); 
	        default:return str; 
	    }
	} ,

 /**
	 * 字母大小写切换
	 * @param str 要处理的字符串
	 * @param type 1:首字母大写 2：首页母小写 3：大小写转换 4：全部大写 5：全部小写
	 */
	strChangeCase:function (str,type){
	    function ToggleCase(str) {
	        var itemText = ""
	        str.split("").forEach(
	            function (item) {
	                if (/^([a-z]+)/.test(item)) {
	                    itemText += item.toUpperCase();
	                }
	                else if (/^([A-Z]+)/.test(item)) {
	                    itemText += item.toLowerCase();
	                }
	                else{
	                    itemText += item;
	                }
	            });
	        return itemText;
	    }
	
	    switch (type) {
	        case 1:
	            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
	                return v1.toUpperCase() + v2.toLowerCase();
	            });
	        case 2:
	            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
	                return v1.toLowerCase() + v2.toUpperCase();
	            });
	        case 3:
	            return ToggleCase(str);
	        case 4:
	            return str.toUpperCase();
	        case 5:
	            return str.toLowerCase();
	        default:
	            return str;
	    }
	} ,
	/**
	 * 字符串替换
	 * @param str 字符串
	 * @param aFindText 要替换的字符
	 * @param aRepText 替换成什么
	 */
	replaceAll:function (str,aFindText,aRepText){
		raRegExp = new RegExp(aFindText,"g") ;
		return str.replace(raRegExp,aRepText);
	},
	/**
	 * 查找某个字符或字符串在另一个字符串中出现的次数
	 * @param str 字符串
	 * @param strSplit 要查找的字符或字符串
	 * @returns {Number} 返回出现的次数
	 * 例：countStr("klsdjflds","s") 返回2
	 */
	countStr:function (str,strSplit){
	    return str.split(strSplit).length-1
	}
	
}
function testFunc(){
	console.log('Hello Jam');
}