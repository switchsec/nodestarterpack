

function cmdbtn() {

    var isim = 'Swain Network';
    var sürüm = '1.12.125';
    var developer = 'Ahmet Kubaş';
    var cmd = document.getElementById('cmdcommands');
    var cmdValue = cmd.value;
    var yardimciButton = document.getElementById('help-buttons');
    var ipban = document.getElementById('ip-ban')


    if (cmdValue == '/yardımcı-buttonlar') {
        alert('Yardımcı butonlar sayfada aktif edildi !');
        yardimciButton.style.display = "block";
    }
    else if (cmdValue == '/ip-ban') {
        alert('İp Ban sistemi sayfada aktif edildi !');
        ipban.style.display = "block";
    }
    else if (cmdValue == '/uygulama-isim') {
        alert('Uygulama İsim : ' + isim);
    }
    else if (cmdValue == '/uygulama-sürüm') {
        alert('Uygulama Sürümü : ' + sürüm)
    }
    else if (cmdValue == '/uygulama-geliştirici') {
        alert('Uygulama Geliştiricisi ' + developer)
    }
    else {
        alert('Böyle bir komut bulamadım üzgünüm . \n Komutların başına / etiketini koymayı unutma !');
    }
}