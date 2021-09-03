import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { getPath } from './utils';

const data = [
  { src: getPath('img/001.jpg'), alt: '001001001' },
  { src: getPath('img/002.jpg'), alt: '002002002' },
  { src: getPath('img/003.jpg'), alt: '003003003' },
  { src: getPath('img/004.jpg'), alt: '004004004' },
  { src: getPath('img/005.jpg'), alt: '005005005' },
  { src: getPath('img/006.jpg'), alt: '006006006' },
  { src: getPath('img/007.jpg'), alt: '007007007' },
  { src: getPath('img/008.jpg'), alt: '008008008' },
  { src: getPath('img/009.jpg'), alt: '009009009' },
  { src: getPath('img/010.jpg'), alt: '010010010' },
  { src: getPath('img/011.jpg'), alt: '011011011' },
  { src: getPath('img/012.jpg'), alt: '012012012' },
  { src: getPath('img/013.jpg'), alt: '013013013' },
  { src: getPath('img/014.jpg'), alt: '014014014' },
  { src: getPath('img/015.jpg'), alt: '015015015' },
  { src: getPath('img/016.jpg'), alt: '016016016' },
  { src: getPath('img/017.jpg'), alt: '017017017' },
  { src: getPath('img/018.jpg'), alt: '018018018' },
  { src: getPath('img/019.jpg'), alt: '019019019' },
  { src: getPath('img/020.jpg'), alt: '020020020' },
  { src: getPath('img/021.jpg'), alt: '021021021' },
  { src: getPath('img/022.jpg'), alt: '022022022' },
  { src: getPath('img/023.jpg'), alt: '023023023' },
  { src: getPath('img/024.jpg'), alt: '024024024' },
  { src: getPath('img/025.jpg'), alt: '025025025' },
  { src: getPath('img/026.jpg'), alt: '026026026' },
  { src: getPath('img/027.jpg'), alt: '027027027' },
  { src: getPath('img/028.jpg'), alt: '028028028' },
  { src: getPath('img/029.jpg'), alt: '029029029' },
  { src: getPath('img/030.jpg'), alt: '030030030' },
  { src: getPath('img/031.jpg'), alt: '031031031' },
  { src: getPath('img/032.jpg'), alt: '032032032' },
  { src: getPath('img/033.jpg'), alt: '033033033' },
  { src: getPath('img/034.jpg'), alt: '034034034' },
  { src: getPath('img/035.jpg'), alt: '035035035' },
  { src: getPath('img/036.jpg'), alt: '036036036' },
  { src: getPath('img/037.jpg'), alt: '037037037' },
  { src: getPath('img/038.jpg'), alt: '038038038' },
  { src: getPath('img/039.jpg'), alt: '039039039' },
  { src: getPath('img/040.jpg'), alt: '040040040' },
  { src: getPath('img/041.jpg'), alt: '041041041' },
  { src: getPath('img/042.jpg'), alt: '042042042' },
  { src: getPath('img/043.jpg'), alt: '043043043' },
  { src: getPath('img/044.jpg'), alt: '044044044' },
  { src: getPath('img/045.jpg'), alt: '045045045' },
  { src: getPath('img/046.jpg'), alt: '046046046' },
  { src: getPath('img/047.jpg'), alt: '047047047' },
  { src: getPath('img/048.jpg'), alt: '048048048' },
  { src: getPath('img/049.jpg'), alt: '049049049' },
  { src: getPath('img/050.jpg'), alt: '050050050' },
  { src: getPath('img/051.jpg'), alt: '051051051' },
  { src: getPath('img/052.jpg'), alt: '052052052' },
  { src: getPath('img/053.jpg'), alt: '053053053' },
  { src: getPath('img/054.jpg'), alt: '054054054' },
  { src: getPath('img/055.jpg'), alt: '055055055' },
  { src: getPath('img/056.jpg'), alt: '056056056' },
  { src: getPath('img/057.jpg'), alt: '057057057' },
  { src: getPath('img/058.jpg'), alt: '058058058' },
  { src: getPath('img/059.jpg'), alt: '059059059' },
  { src: getPath('img/060.jpg'), alt: '060060060' },
  { src: getPath('img/061.jpg'), alt: '061061061' },
  { src: getPath('img/062.jpg'), alt: '062062062' },
  { src: getPath('img/063.jpg'), alt: '063063063' },
  { src: getPath('img/064.jpg'), alt: '064064064' },
  { src: getPath('img/065.jpg'), alt: '065065065' },
  { src: getPath('img/066.jpg'), alt: '066066066' },
  { src: getPath('img/067.jpg'), alt: '067067067' },
  { src: getPath('img/068.jpg'), alt: '068068068' },
  { src: getPath('img/069.jpg'), alt: '069069069' },
  { src: getPath('img/070.jpg'), alt: '070070070' },
  { src: getPath('img/071.jpg'), alt: '071071071' },
  { src: getPath('img/072.jpg'), alt: '072072072' },
  { src: getPath('img/073.jpg'), alt: '073073073' },
  { src: getPath('img/074.jpg'), alt: '074074074' },
  { src: getPath('img/075.jpg'), alt: '075075075' },
  { src: getPath('img/076.jpg'), alt: '076076076' },
  { src: getPath('img/077.jpg'), alt: '077077077' },
  { src: getPath('img/078.jpg'), alt: '078078078' },
  { src: getPath('img/079.jpg'), alt: '079079079' },
  { src: getPath('img/080.jpg'), alt: '080080080' },
  { src: getPath('img/081.jpg'), alt: '081081081' },
  { src: getPath('img/082.jpg'), alt: '082082082' },
  { src: getPath('img/083.jpg'), alt: '083083083' },
  { src: getPath('img/084.jpg'), alt: '084084084' },
  { src: getPath('img/085.jpg'), alt: '085085085' },
  { src: getPath('img/086.jpg'), alt: '086086086' },
  { src: getPath('img/087.jpg'), alt: '087087087' },
  { src: getPath('img/088.jpg'), alt: '088088088' },
  { src: getPath('img/089.jpg'), alt: '089089089' },
  { src: getPath('img/090.jpg'), alt: '090090090' },
  { src: getPath('img/091.jpg'), alt: '091091091' },
  { src: getPath('img/092.jpg'), alt: '092092092' },
  { src: getPath('img/093.jpg'), alt: '093093093' },
  { src: getPath('img/094.jpg'), alt: '094094094' },
  { src: getPath('img/095.jpg'), alt: '095095095' },
  { src: getPath('img/096.jpg'), alt: '096096096' },
  { src: getPath('img/097.jpg'), alt: '097097097' },
  { src: getPath('img/098.jpg'), alt: '098098098' },
  { src: getPath('img/099.jpg'), alt: '099099099' },
  { src: getPath('img/100.jpg'), alt: '100100100' },
  { src: getPath('img/101.jpg'), alt: '101101101' },
  { src: getPath('img/102.jpg'), alt: '102102102' },
  { src: getPath('img/103.jpg'), alt: '103103103' },
  { src: getPath('img/104.jpg'), alt: '104104104' },
  { src: getPath('img/105.jpg'), alt: '105105105' },
  { src: getPath('img/106.jpg'), alt: '106106106' },
  { src: getPath('img/107.jpg'), alt: '107107107' },
  { src: getPath('img/108.jpg'), alt: '108108108' },
  { src: getPath('img/109.jpg'), alt: '109109109' },
  { src: getPath('img/110.jpg'), alt: '110110110' },
  { src: getPath('img/111.jpg'), alt: '111111111' },
  { src: getPath('img/112.jpg'), alt: '112112112' },
  { src: getPath('img/113.jpg'), alt: '113113113' },
  { src: getPath('img/114.jpg'), alt: '114114114' },
  { src: getPath('img/115.jpg'), alt: '115115115' },
  { src: getPath('img/116.jpg'), alt: '116116116' },
  { src: getPath('img/117.jpg'), alt: '117117117' },
  { src: getPath('img/118.jpg'), alt: '118118118' },
  { src: getPath('img/119.jpg'), alt: '119119119' },
  { src: getPath('img/120.jpg'), alt: '120120120' },
  { src: getPath('img/121.jpg'), alt: '121121121' },
  { src: getPath('img/122.jpg'), alt: '122122122' },
  { src: getPath('img/123.jpg'), alt: '123123123' },
  { src: getPath('img/124.jpg'), alt: '124124124' },
];

ReactDOM.render(
  <React.StrictMode>
    <App data={data} />
  </React.StrictMode>,
  document.getElementById('root'),
);
