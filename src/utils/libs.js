

export default {
    deepClone(obj) {
        var str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else if (window.JSON) {
            str = JSON.stringify(obj), //序列化对象
                newobj = JSON.parse(str); //还原
        } else {//如果不支持以上方法
            for (var i in obj) {
                newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    },
    getArrLast(arr) {
        var last = arr[arr.length - 1];
        return last;
    },
    removeArrObj(_arr, _obj) {
        var length = _arr.length;
        for (var i = 0; i < length; i++) {
            if (_arr[i] == _obj) {
                if (i == 0) {
                    _arr.shift(); //删除并返回数组的第一个元素
                    return _arr;
                }
                else if (i == length - 1) {
                    _arr.pop();  //删除并返回数组的最后一个元素
                    return _arr;
                }
                else {
                    _arr.splice(i, 1); //删除下标为i的元素
                    return _arr;
                }
            }
        }
    },
    openUrl(url, id,target) {
        var a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('target',target?target: '_blank');
        a.setAttribute('id', id);
        // 防止反复添加  
        if (!document.getElementById(id)) {
            document.body.appendChild(a);
        }
        a.click();
    },

    getMediatype(url) {
        //获取最后一个.的位置
        var index = url.lastIndexOf(".");
        //获取后缀
        var ext = url.substr(index + 1);
        var isImg =  ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
        if(isImg) return 'img';
        var isVideo =  ['mp4', 'ogg', '3gp', 'flv', 'mkv', 'wav'].indexOf(ext.toLowerCase()) !== -1;
        if(isVideo) return 'video';
    },

    setFullContainer(isSet){
        var container_left = document.getElementById('container-item-left');
        var container_right = document.getElementById('container-item-right');
        if(isSet==true){
            console.info(isSet);
            
            container_left.style.display="none";
            container_right.style.width="100%";
        }
        else{
            console.info(isSet);
            container_left.style.display="block";
            container_right.style.width="calc(100% - 220px)";
        }
    },

}