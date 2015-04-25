#mongodb to elasticsearch#

http://findit.so 用到的一个小工具，用来将数据从mongodb导入到elasticsearch  

###使用方法
* 安装依赖包`npm install`
* 修改`config.js`中的配置
* 导入数据的话，执行`node import.js`，补充索引新数据，执行`node repair.js`
  
###注意事项
这是个简单的小工具，为了保证数据的完整性，要停止mongodb的写入操作  

更多参看：[http://keenwon.com/1436.html](http://keenwon.com/1436.html "http://keenwon.com/1436.html")
