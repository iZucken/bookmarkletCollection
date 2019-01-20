(function(){
    var hash = function(s) {
        for(var i = 0, h = 1; i < s.length; i++)
            h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
        return (h ^ h >>> 7) >>> 0;
    };

    var audios = document.querySelectorAll('audio');
    var volume;
    var storageName = hash( window.location.hostname + '_salty!' ) + '_GlobalVolume';

    var applyVolume = function () {
        audios.forEach( function ( e ) { e.volume = volume; });
        volumeControl.value = volume;
    }

    var volumeContainer = document.createElement('div');
    volumeContainer.style = 'position: fixed; bottom: 0px; right: 0px; z-index: 999999;';

    var volumeControl = document.createElement('input');
    volumeControl.type = 'range';
    volumeControl.max = 1;
    volumeControl.min = 0;
    volumeControl.step = 0.05;
    volumeControl.value = 0.75;
    volumeControl.onchange = function () {
        volume = volumeControl.value;
        localStorage.setItem( storageName, volume );
        applyVolume();
    }

    var volumeClose = document.createElement('button');
    volumeClose.textContent = 'X';
    volumeClose.onclick = function () {
        document.body.removeChild( volumeContainer );
        delete( volumeContainer );
    }

    volumeContainer.appendChild( volumeControl );
    volumeContainer.appendChild( volumeClose );
    document.body.appendChild( volumeContainer );

    volume = localStorage.getItem( storageName, volume ) || 0.75;

    applyVolume();
})();
