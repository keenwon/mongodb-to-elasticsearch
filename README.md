#mongodb to elasticsearch#

http://findit.keenwon.com 用到的一个小工具，用来将数据从mongodb导入到elasticsearch  

###使用方法
* 安装依赖包`npm install`
* 修改`config.js`中的Elasticsearch的ip和端口，`models/index.js`中mongodb的配置
* 导入数据的话，执行`node import.js`，补充索引新数据，执行`node repair.js`
  
###注意事项
* 这是个**简单**的小工具，为了保证数据的完整性，要停止mongodb的写入操作  
* `repair.js` 是补充新数据的，上次导入的时间点记在`last-repair-time.txt`里面，执行`node repair.js`只会将该时间点之后的数据导入Elasticsearch，为了保证性能，建议在mongodb中，给`createTime`加索引

更多参看：[http://keenwon.com/1436.html](http://keenwon.com/1436.html "http://keenwon.com/1436.html")
