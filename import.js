'use strict';

/**
 * 导入全部的数据
 */

var elasticsearch = require('elasticsearch'),
    index = require('./models/index'),
    Resource = index.Resource,
    config = require('./config'),
    client = new elasticsearch.Client({
        host: config.elasticsearchHost,
        log: 'error'
    });

var _id = 0,
    count = 0;

function run() {
    Resource.find({_id: {$gt: _id}}).select('_id n s t c').limit(10).exec(function (err, value) {
        if (err) {
            throw new Error(err);
        }

        // 输出信息
        console.log(_id + ' ' + count);

        if (value.length <= 0) {
            console.log('Done!');
            return;
        }

        // 添加到elasticsearch
        client.bulk({
            index: 'antcolony',
            type: 'resource',
            body: formatData(value)
        }, function (error, response) {
            if (error) {
                throw new Error(error);
            }

            // 继续下一组
            count += 10;
            _id = value[value.length - 1]._id;
            process.nextTick(run);
        });
    });
}

function formatData(data) {
    var result = [];
    for (var i = 0, j = data.length; i < j; i++) {
        var item = data[i].toJSON();

        result.push({create: {_id: item._id}});
        delete item._id;
        result.push(item);
    }
    return result;
}

console.log('Running......');
run();