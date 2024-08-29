/* -------------------------------------------------------------------------- */
/*                                    GENEL                                   */
/* -------------------------------------------------------------------------- */
const ilkRow = document.getElementById('ilkRow');
const harcamaSatiri=document.getElementById('harcamaSatiri');
const body = document.querySelector("body");
/* -------------------------------------------------------------------------- */
/*                               HARCAMA FORMU                              */
/* -------------------------------------------------------------------------- */
const harcamaFormu=document.getElementById('harcamaFormu');
const dateInput = document.querySelector('#inputDate');
const harcamaMiktari = document.querySelector('#inputHarcamaMiktari');
const harcamaAlani = document.querySelector('#inputHarcamaAlani');
const btnHarcama=document.querySelector('.btn-danger')

/* -------------------------------------------------------------------------- */
/*                                GELİR TABLOSU                               */
/* -------------------------------------------------------------------------- */
const girilenGelir = document.getElementById('inputGelir');
const btnGelirEkle=document.querySelector('.btn-success');
const gelirEkleFormu=document.querySelector('.gelirEkle')
/* -------------------------------------------------------------------------- */
/*                               BAKİYE TABLOSU                               */
/* -------------------------------------------------------------------------- */
const gelir = document.getElementById('outputGelir');
const gider = document.getElementById('toplamGider');
const bakiye=document.getElementById('bakiye');
/* -------------------------------------------------------------------------- */
/*                             BİLGİLERİ TEMİZLEME                            */
/* -------------------------------------------------------------------------- */
const temizlemeBtn=document.querySelector('.temizle')

/* -------------------------------------------------------------------------- */
/*                                 DEĞİŞKENLER                                */
/* -------------------------------------------------------------------------- */
let gelirler=Number(localStorage.getItem('gelirler')) || 0;
let harcamaListesi=JSON.parse(localStorage.getItem('harcamalar')) || []

body.onload= () =>{
    dateInput.value=(new Date().toLocaleDateString('en-CA'));
}

harcamaFormu.addEventListener('submit', (e) => {
    e.preventDefault();
    const yeniHarcama = {
        tarih: dateInput.value,
        miktar: harcamaMiktari.value,
        aciklama: harcamaAlani.value,
        id: new Date().getTime(),
      }
   harcamaListesi.push(yeniHarcama);
   localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi) )

   harcamayiGoster(yeniHarcama);

  harcamaFormu.reset();
  // tarihInput=""

  hesaplaVeGuncelle();
})

const harcamayiGoster=({id,miktar,tarih,aciklama})=>{ 
    
    
    harcamaSatiri.innerHTML+=`
    <tr>
<td>${tarih}</td>
        <td>${aciklama}</td>
        <td>${miktar}</td>
        <td><button id=${id} class="btn btn-danger silme">Sil</button>   </td>
        </tr>
    `;
    
    document.querySelectorAll(".silme").forEach((sil) => {
        sil.onclick = () => {
          sil.parentElement.parentElement.remove();
    // console.log(sil);  

    harcamaListesi = harcamaListesi.filter((harcama) => harcama.id != sil.id);
    
    localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi));
        };
      });
}


gelirEkleFormu.addEventListener('submit', (e) =>{
    e.preventDefault();
    gelirler=gelirler + Number(girilenGelir.value);
    girilenGelir.value=''
    localStorage.setItem("gelirler", gelirler)
    hesaplaVeGuncelle();
})


const hesaplaVeGuncelle=()=>{
    gelir.textContent = gelirler;

    const giderler = harcamaListesi.reduce(
      (toplam, harcama) => toplam + Number(harcama.miktar),
      0
    );
  
    gider.textContent = giderler;
  
    bakiye.textContent = gelirler - giderler;

}
temizlemeBtn.onclick=()=>{

// harcamaFormu.style.backgroundColor='red'

    if(confirm("tüm verileri silmek istediğine emin misin?")){
harcamaListesi=[];

gelirler=0;
harcamaSatiri.innerHTML='';
hesaplaVeGuncelle();
    }

}

//!refresh durrumunda localStroge den veriler ekrana basılsın
harcamaListesi.forEach((a)=>{
harcamayiGoster(a)

})
//  harcamayiShowScreen(harcamaListesi);
hesaplaVeGuncelle();

// console.log(new Date());
// console.log(new Date().toLocaleDateString()) ;
// console.log(new Date().toISOString().split('T')[0]);

// document.getElementById('inputDate').value=(new Date().toISOString().split('T')[0]);
// document.getElementById('inputDate').value=(new Date().toLocaleDateString('en-CA'));
// console.log(document.getElementById('inputDate').value);