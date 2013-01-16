/**
 * NonOnAir.js
 * @author daisuke6810
 */
//on page load event
$(function(){
	setup();
});

function setup(){
	$("#radioSelect").change(function(){
		var radio = $("#radioSelect").val();
		switch(radio){
			case "j-wave":
				getJwaveNowOnAir();
				break;
			case "tokyoFM":
				getTokyoFMNowOnAir();
				break;
			case "interFM":
				getInterFMNowOnAir();
				break;
			default:
				alert("error");
		}
	}).change();
}

function getJwaveNowOnAir(){
	var url = "http://www.j-wave.co.jp/top/xml/now_on_air_song.xml";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onload = function(e){
		str = xhr.responseText;
		re = new RegExp("data information=\"「(.+)」 ?([0-9]{1,2}:[0-9]{1,2}) (.+?)\"");
		m = str.match(re);
		if(m){
			updateResultPanel(m[2], m[1], m[3]);
		} else {
			re = new RegExp("data information=\"「(.+)」 ?(.+?)\"");
			m = str.match(re);
			if(m){
				updateResultPanel(m[2], m[1],"");
			} else {
				re = new RegExp("data information=\"(.+?)\"");
				m = str.match(re);
				if(m){
					updateResultPanel(m[1],"","");
				}
			}
		}
	}
	xhr.send(null);
}

function getTokyoFMNowOnAir(){
	var url = "http://www.tfm.co.jp/iphone.php";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onload = function(e){
		str = xhr.responseText;
		re = new RegExp("<li>(.+)&nbsp;/&nbsp;(.+)&nbsp;/&nbsp;(.+)</li>");
		m = str.match(re);
		updateResultPanel(m[2], m[1], m[3]);
	}
	xhr.send(null);
}

function getInterFMNowOnAir(){
	var url = "http://www.interfm.co.jp/sp/";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onload = function(e){
		str = xhr.responseText;
		re = new RegExp("<li>(.+)&nbsp;/&nbsp;(.+)</li>");
		m = str.match(re);
		updateResultPanel(m[2], m[1],"");
	}
	xhr.send(null);
}

function updateResultPanel(artist, song, time) {
	str = artist + "/" + song + "/" + time;
	$("#resultPanel").text(str);
}