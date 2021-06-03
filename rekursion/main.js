const vid = document.getElementById('vid');
const resWrapper = document.getElementById('res-wrapper');

resizeResWrapper();
resizeVid();

document.addEventListener('mousedown', pause);
document.addEventListener('mouseup', play);
vid.addEventListener('ended', restartVid);

function resizeVid(){
    vid.width = window.innerWidth;
    vid.height = window.innerHeight;    
}

function pause() {
    vid.pause();
    vid.style.opacity = "0.3";
    resWrapper.style.opacity = "1.0";
}

function play() {
    vid.play();
    vid.style.opacity = "1.0";
    resWrapper.style.opacity = "0.0";
}

function restartVid() {
    vid.pause();
    vid.currentTime = 0;
    vid.play();
}

function resizeResWrapper() {
    resWrapper.style.height = window.innerHeight + 'px';
    resWrapper.style.width = window.innerWidth + 'px';
}


