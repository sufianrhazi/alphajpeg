var AlphaJPEG = (function () {
    function once(node, evt, action) {
        var handler = function () {
            node.removeEventListener(evt, handler, false);
            action();
        };
        node.addEventListener(evt, handler, false);
    }
    return {
        renderOnLoad: function (img, callback) {
            once(img, 'load', function () {
                callback(this.render(img));
            }.bind(this));
        },
        render: function (img) {
            var w = img.naturalWidth / 2;
            var h = img.naturalHeight;
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', w);
            canvas.setAttribute('height', h);
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, w, h);
            context.drawImage(img, 0, 0, w, h, 0, 0, w, h);
            var white = context.getImageData(0, 0, w, h);
            context.clearRect(0, 0, w, h);
            context.drawImage(img, w, 0, w, h, 0, 0, w, h);
            var black = context.getImageData(0, 0, w, h);
            context.clearRect(0, 0, w, h);
            var dest = context.createImageData(w, h);
            for (var i = 0; i < w * h * 4; i += 4) {
                dest.data[i + 0] = (white.data[i + 0] + black.data[i + 0]) / 2;
                dest.data[i + 1] = (white.data[i + 1] + black.data[i + 1]) / 2;
                dest.data[i + 2] = (white.data[i + 2] + black.data[i + 2]) / 2;
                dest.data[i + 3] = 255 - (white.data[i + 1] - black.data[i + 1]);
            }
            context.putImageData(dest, 0, 0);
            return canvas;
        },
        createOnLoad: function (img, quality, callback) {
            once(img, 'load', function () {
                callback(this.create(img, quality));
            }.bind(this));
        },
        create: function (img, quality) {
            var w = img.naturalWidth;
            var h = img.naturalHeight;
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', w * 2);
            canvas.setAttribute('height', h);
            var context = canvas.getContext('2d');
            context.fillStyle = '#FFF';
            context.fillRect(0, 0, w, h);
            context.fillStyle = '#000';
            context.fillRect(w, 0, w * 2, h);
            context.drawImage(img, 0, 0, w, h, 0, 0, w, h);
            context.drawImage(img, 0, 0, w, h, w, 0, w, h);
            return canvas.toDataURL('image/jpeg', quality);
        }
    };
}());
