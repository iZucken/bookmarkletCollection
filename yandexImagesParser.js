(function () {
    var links_dom = null;
    var links_total_dom = null;
    var links_page_dom = null;
    var links_max_dom = null;
    var links_start_dom = null;
    var parse_link = null;
    var parse_iteration = 1;
    var parse_total = 0;
    function PrepareParser() {
        var body = $(document.body);
        body.empty();
        body.append( $(
            '<input style=\'width:100%;\' id=\'search\' type=\'text\' placeholder=\'query\'><br>' +
            'At least dimensions <input id=\'width\' type=\'number\' value=\'1920\'> x <input id=\'height\' type=\'number\' value=\'1080\'><br>' +
            'Stop after: <input id=\'max_total\' type=\'number\' value=\'1500\'> links; start at page: <input id=\'start_page\' type=\'number\' value=\'1\'><br>' +
            '<button id=\'parse\' >parse</button><button id=\'copy\' >to clipboard</button><button id=\'clear\' >clear</button><br>' +
            'Total links: <span id=\'total\' >0</span>; page: <span id=\'page\' >1</span><textarea style=\'width:100%;height:100%;\' id=\'links\'></textarea>'
        ));
        $('#parse').click(function () {
            Parse($('#search').val());
        });
        $('#copy').click(function () {
            Copy();
        });
        $('#clear').click(function () {
            Clear();
        });
        links_dom = $('#links');
        links_total_dom = $('#total');
        links_page_dom = $('#page');
        links_max_dom = $('#max_total');
        links_start_dom = $('#start_page');
    }
    function GetLinks(doc) {
        var links = $(doc).find('div.serp-item');
        var nice_links = [];
        links.each(function (i, e) {
            var root = $(e).data('bem')['serp-item'];
            var variants = [].concat(root.preview,root.dups);
            var best = {
                w: 0,
                h: 0,
                url: false
            };
            variants.forEach(function (value) {
                var origin = value.isMixedImage || false ? value.origin : { w: value.w, h: value.h, url: value.url };
                if (
                    typeof origin !== undefined &&
                    origin.w >= best.w &&
                    origin.h >= best.h
                ) {
                    best.w = origin.w;
                    best.h = origin.h;
                    best.url = origin.url;
                }
            });
            console.log('best final:',best);
            if ( best.url ) {
                nice_links.push( best.url );
            }
        });
        if (nice_links.length > 0) {
            links_dom.val(links_dom.val() + '\n' + nice_links.join('\n'));
            parse_total += nice_links.length;
            links_total_dom.text(parse_total);
            if (parse_total < links_max_dom.val()) {
                parse_iteration++;
                Download();
            }
        } else {
            parse_link = null;
            parse_iteration = 1;
            links_start_dom.val(1);
            links_page_dom.text(1);
        }
    }
    function Copy() {
        links_dom.select();
        document.execCommand('copy');
        window.scroll(0,0);
    }
    function Clear() {
        links_dom.val('');
        links_total_dom.text(0);
        links_start_dom.val(1);
        links_page_dom.text(1);
    }
    function Download() {
        if (parse_total < links_max_dom.val()) {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', function () {
                GetLinks(this.responseXML);
            });
            xhr.open('GET', parse_link + '' + parse_iteration);
            xhr.responseType = 'document';
            xhr.send();
            links_page_dom.text(parse_iteration);
        }
    }
    function Parse(target) {
        parse_iteration = links_start_dom.val();
        parse_link = window.location + 'images/search?iw='+$('#width').val()+'&ih='+$('#height').val()+'&isize=gt&wp=off&itype=jpg&text=' + encodeURI(target) + '&p=';
        links_total_dom.text(0);
        Download();
    }
    PrepareParser();
})()
