 <!-- PERSONLIG INFORMASJON -->
 <h4 class="ui dividing header">Personlig informasjon</h4>

 <div class="inline fields">
  <label class="field four wide">Fornavn</label>
  <div class="field twelve wide">
    <input type="text" name="first_name" id="first_name">
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Etternavn</label>
  <div class="field twelve wide">
    <input type="text" name="last_name" id="last_name">
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Fødselsdato</label>
  <div class="field three wide">
    <input type="number" name="birthdate" id="birthday" placeholder="dd" min="1" max="31">
  </div>
  
  <div class="field five wide">
    <select class="ui fluid search dropdown" name="birthdate" id="birthmonth">
      <option value="">mm</option>
      <option value="01">januar</option>
      <option value="02">februar</option>
      <option value="03">mars</option>
      <option value="04">april</option>
      <option value="05">mai</option>
      <option value="06">juni</option>
      <option value="07">juli</option>
      <option value="08">august</option>
      <option value="09">september</option>
      <option value="10">oktober</option>
      <option value="11">november</option>
      <option value="12">desember</option>
    </select>
  </div>

  <div class="field four wide">
    <input type="number" name="birthdate" id="birthyear" placeholder="yyyy" min="0" max="9999">
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Kjønn</label>
  <div class="field twelve wide">
    <select class="ui dropdown" name="gender" id="gender">
      <option value="">Hva er ditt kjønn?</option>
      <option value="MALE">Mann</option>
      <option value="FEMALE">Kvinne</option>
    </select>
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Student</label>
  <div class="field twelve wide">
    <select class="ui dropdown" name="is_student" id="is_student">
      <option value="">Er du student?</option>
      <option value="1">Ja</option>
      <option value="0">Nei</option>
    </select>
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Epost</label>
  <div class="field twelve wide">
    <input type="email" name="email" id="email">
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Mobil</label>
  <div class="field twelve wide">
    <input type="tel" name="phone" id="phone">
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Reiseinfo</label>
  <div class="field twelve wide">
    <select class="ui search dropdown" name="travel_information" id="travel_information">
      <option value="">Hvilken by reiser du fra (den nærmeste)?</option>
      <option value="1">Alta</option>
      <option value="2">Arendal</option>
      <option value="3">Askim</option>
      <option value="4">Bergen</option>
      <option value="5">Bodø</option>
      <option value="6">Brekstad</option>
      <option value="7">Brevik</option>
      <option value="8">Brumunddal</option>
      <option value="9">Bryne</option>
      <option value="10">Brønnøysund</option>
      <option value="11">Drammen</option>
      <option value="12">Drøbak</option>
      <option value="13">Egersund</option>
      <option value="14">Elverum</option>
      <option value="15">Fagernes</option>
      <option value="16">Farsund</option>
      <option value="17">Fauske</option>
      <option value="18">Finnsnes</option>
      <option value="19">Flekkefjord</option>
      <option value="20">Florø</option>
      <option value="21">Fosnavåg</option>
      <option value="22">Fredrikstad</option>
      <option value="23">Førde</option>
      <option value="24">Gjøvik</option>
      <option value="25">Grimstad</option>
      <option value="26">Halden</option>
      <option value="27">Hamar</option>
      <option value="28">Hammerfest</option>
      <option value="29">Harstad</option>
      <option value="30">Haugesund</option>
      <option value="31">Hokksund</option>
      <option value="32">Holmestrand</option>
      <option value="33">Honningsvåg</option>
      <option value="34">Horten</option>
      <option value="35">Hønefoss</option>
      <option value="36">Jessheim</option>
      <option value="37">Jørpeland</option>
      <option value="38">Kirkenes</option>
      <option value="39">Kolvereid</option>
      <option value="40">Kongsberg</option>
      <option value="41">Kongsvinger</option>
      <option value="42">Kopervik</option>
      <option value="43">Kragerø</option>
      <option value="44">Kristiansand</option>
      <option value="45">Kristiansund</option>
      <option value="46">Langesund</option>
      <option value="47">Larvik</option>
      <option value="48">Leknes</option>
      <option value="49">Levanger</option>
      <option value="50">Lillehammer</option>
      <option value="51">Lillesand</option>
      <option value="52">Lillestrøm</option>
      <option value="53">Lyngdal</option>
      <option value="54">Mandal</option>
      <option value="55">Mo i Rana</option>
      <option value="56">Moelv</option>
      <option value="57">Molde</option>
      <option value="58">Mosjøen</option>
      <option value="59">Moss</option>
      <option value="60">Mysen</option>
      <option value="61">Måløy</option>
      <option value="62">Namsos</option>
      <option value="63">Narvik</option>
      <option value="64">Notodden</option>
      <option value="65">Odda</option>
      <option value="66">Orkanger</option>
      <option value="67">Oslo</option>
      <option value="68">Otta</option>
      <option value="69">Porsgrunn</option>
      <option value="70">Risør</option>
      <option value="71">Rjukan</option>
      <option value="72">Røros</option>
      <option value="73">Sandefjord</option>
      <option value="74">Sandnes</option>
      <option value="75">Sandnessjøen</option>
      <option value="76">Sandvika</option>
      <option value="77">Sarpsborg</option>
      <option value="78">Sauda</option>
      <option value="79">Ski</option>
      <option value="80">Skien</option>
      <option value="81">Skudeneshavn</option>
      <option value="82">Sortland</option>
      <option value="83">Stathelle</option>
      <option value="84">Stavanger</option>
      <option value="85">Stavern</option>
      <option value="86">Steinkjer</option>
      <option value="87">Stjørdalshalsen</option>
      <option value="88">Stokmarknes</option>
      <option value="89">Stord</option>
      <option value="90">Svelvik</option>
      <option value="91">Svolvær</option>
      <option value="92">Tromsø</option>
      <option value="93">Trondheim</option>
      <option value="94">Tvedestrand</option>
      <option value="95">Tønsberg</option>
      <option value="96">Ulsteinvik</option>
      <option value="97">Vadsø</option>
      <option value="98">Vardø</option>
      <option value="99">Verdalsøra</option>
      <option value="100">Vinstra</option>
      <option value="101">Åkrehamn</option>
      <option value="102">Ålesund</option>
      <option value="103">Åndalsnes</option>
      <option value="104">Åsgårdstrand</option>
    </select>
  </div>
</div>