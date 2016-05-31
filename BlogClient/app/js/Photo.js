function PhotoFeed() {
    this.width = 0;
}

PhotoFeed.prototype = {
    setLine: function () {
        var WINDOW_WIDTH = $(window).width();
        if (WINDOW_WIDTH > 1244) {
            this.line = 3;
        }
        else if (WINDOW_WIDTH < 500) {
            this.line = 0;
        }
        else {
            if (WINDOW_WIDTH < 768) {
                this.line = 1;
            }
            else {
                this.line = 2;
            }
        }
    },

    getWidth: function () {
        var pwidth = $('.photos').width();
        var count = this.line + 1;
        var _width = ((pwidth - count * 3) / count);
        this.width = _width;
    },

    setWidth: function () {
        $('.photo').css('width', this.width);
    },

    onEvent: function () {
        $('.photos').on('click', 'img', this.fullScreen);
        $('.fade').on('click','div',this.shrinkScreen);
        $(window).resize(function () {
            this.update();
        }.bind(this));
    },

    init: function () {
        this.setLine();
        this.getWidth();
        for (var i = 0; i < 12; ++i) {
            this.add('img/demo.jpg');
        }
        this.setWidth();
        this.onEvent();
    },

    add: function (path) {
        var text = '<div class="photo"><img src="' + path + '"></img></div>';
        $('.photos').append(text);
    },

    update: function () {
        this.setLine();
        this.getWidth();
        this.setWidth();
    },

    fullScreen: function () {
        $('.fade-img').src = this.src;
        $('.fade').css('display','block');
        
    },
    
    shrinkScreen: function(){
        $('.fade').css('display','none');
    }
}



$(window).load(function () {
    var data = new PhotoFeed();
    data.init();
});