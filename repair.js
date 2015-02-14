'use strict';

var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'last-repair-time.txt'),
    elasticsearch = require('elasticsearch'),
    index = require('./models/index'),
    Resource = index.Resource,
    config = require('./config'),
    moment = require('moment'),
    client = new elasticsearch.Client({
        host: config.elasticsearchHost,
        log: 'error'
    });

var createTime = fs.readFileSync(filePath).toString(),
    count = 0;

if (!createTime) {
    throw new Error('createTime is required');
}

createTime = moment.utc(createTime).toDate();

function run() {
    Resource.find({c: {$gt: createTime}}).select('_id n s t c').sort({'c': 1}).limit(10).exec(function (err, value) {
        if (err) {
            throw new Error(err);
        }

        // 输出信息
        console.log(createTime + ' ' + count);

        if (value.length <= 0) {
            console.log('Done!');
            fs.writeFileSync(filePath,moment.utc(createTime).subtract(5, 'minute').format('YYYY-MM-DD HH:mm:ss'));
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
            createTime = moment.utc(value[value.length - 1].c).toDate();
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
