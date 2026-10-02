const fs = require('fs');
const path = require('path');

const coverDirectory = path.join(__dirname, '../../frontend/images/covers');
const palettes = [
  ['#263b59', '#537f91'], ['#482f59', '#a35a76'], ['#234d66', '#50a5a2'],
  ['#18576a', '#55a58f'], ['#4c744b', '#9eae60'], ['#34446b', '#7986b4'],
  ['#5b3540', '#b75c4f'], ['#253b59', '#526997'], ['#744347', '#c27a64'],
  ['#354865', '#648195'], ['#32645d', '#81a477'], ['#6a4438', '#bd875b'],
  ['#315a79', '#68a6bc'], ['#295b66', '#5c9d8c'], ['#3e596f', '#64a2a7'],
  ['#34426c', '#6877a6'], ['#53713f', '#9fac5a'], ['#394b78', '#727eae'],
  ['#66513a', '#b18a51'], ['#3c5474', '#6092a2'], ['#45536e', '#8290a3'],
  ['#304d69', '#68a2ad'], ['#456147', '#8baa64'], ['#454e77', '#758fc0'],
  ['#31546c', '#65a5b3'], ['#4a4577', '#9075ae']
];

const illustrations = {
  1: '<circle cx="100" cy="88" r="70" fill="#ffcc65" opacity=".2"/><path d="M68 56c0-42 64-42 64 0M57 66h86l-10 98H67z" fill="#f1a947"/><rect x="73" y="82" width="54" height="68" rx="18" fill="#ffe08a"/><path d="M100 97c-20 20-11 38 0 39 14-1 20-21 0-39z" fill="#fff8d4"/><path d="M50 68h100"/><circle cx="100" cy="135" r="4" fill="#6b432e"/><path d="M70 177h60"/>',
  2: '<path d="M38 105l39 23 23-70 24 70 38-23-12 72H50z" fill="#f5c85f"/><circle cx="76" cy="142" r="10" fill="#ed7b68"/><circle cx="101" cy="126" r="11" fill="#8de0cf"/><circle cx="126" cy="142" r="10" fill="#ed7b68"/><path d="M48 185h105"/><path d="M75 91q25-35 50 0"/>',
  3: '<path d="M36 62l47 15 39-17 43 17v106l-43-17-39 17-47-17z" fill="#f3dfae"/><path d="M83 77v106M122 60v106"/><path d="M52 137q20-27 39 0t37-3" stroke="#4aa79a" stroke-width="10" fill="none"/><circle cx="134" cy="91" r="22" fill="#ef8068"/><path d="M134 62v58M105 91h58"/>',
  4: '<path d="M25 140q24-26 48 0t48 0 48 0" stroke="#8be0d5" stroke-width="13" fill="none"/><path d="M35 166q24-26 48 0t48 0 48 0" stroke="#f4d37a" stroke-width="10" fill="none"/><path d="M62 99q39-43 78 0-39 43-78 0z" fill="#f2a45f"/><circle cx="112" cy="94" r="5" fill="#35435b"/><path d="M60 99l-22-18v36z" fill="#ed795c"/><path d="M100 61q12-14 24 0"/>',
  5: '<path d="M45 165h42v-28h39v-29h39" fill="none" stroke="#f5d17a" stroke-width="18" stroke-linejoin="round"/><path d="M100 111V64m0 24Q70 84 68 58q30-3 32 30m0-5q30-24 49-7-12 27-49 30" fill="#8ed184"/><circle cx="100" cy="52" r="12" fill="#ffcf69"/><path d="M42 181h130"/>',
  6: '<path d="M137 48a60 60 0 1 0 18 105A66 66 0 1 1 137 48z" fill="#ffe18a"/><path d="M46 152q54-20 108 0v33q-54-20-108 0z" fill="#f4d6a1"/><path d="M100 152v34"/><path d="M67 165h20m25 0h22" stroke="#6684a0" stroke-width="6"/><circle cx="155" cy="66" r="5" fill="#fff2c6"/><circle cx="174" cy="100" r="4" fill="#fff2c6"/>',
  7: '<path d="M56 42h92v137H56z" fill="#d68a62"/><path d="M70 54h64v125H70z" fill="#f4d59b"/><circle cx="119" cy="117" r="6" fill="#704c4b"/><circle cx="47" cy="148" r="18" fill="none" stroke="#ffd56f" stroke-width="10"/><path d="M64 148h54v12h-14v13h-14v-13H64z" fill="#ffd56f"/><path d="M41 42h122"/>',
  8: '<path d="M67 75h68v92H67z" fill="#f1bd67"/><rect x="78" y="89" width="46" height="36" rx="5" fill="#527f91"/><circle cx="90" cy="145" r="7" fill="#f47c69"/><circle cx="113" cy="145" r="7" fill="#f47c69"/><path d="M101 75V48l28-18"/><path d="M139 58q22 18 0 36m13-49q39 31 0 62M63 56Q41 74 63 94" fill="none" stroke="#fff0bc" stroke-width="7"/>',
  9: '<rect x="36" y="73" width="128" height="92" rx="12" fill="#f5dcad"/><path d="M39 83l61 48 61-48" fill="none" stroke="#df866e" stroke-width="9"/><path d="M100 115c-30-24-43 12 0 39 43-27 30-63 0-39z" fill="#ee8c78"/><path d="M54 57h92" stroke="#fff2ce" stroke-width="7" stroke-linecap="round"/>',
  10: '<path d="M52 178V82h32v96m10 0V53h36v125m9 0v-75h28v75" fill="#f3d28c"/><circle cx="110" cy="89" r="38" fill="#f6edd2" stroke="#ed9c62" stroke-width="9"/><path d="M110 65v27l19 12" stroke="#6f5968" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="110" cy="89" r="5" fill="#6f5968"/>',
  11: '<path d="M55 99q4-34 37-31 22-42 54-5 29 2 27 36-2 25-31 25H79q-29 0-24-25z" fill="#f4e7c5"/><path d="M77 139l-11 24m48-24-11 24m50-24-11 24" stroke="#81d5cf" stroke-width="10" stroke-linecap="round"/><path d="M105 109q14-31 29-6-8 25-29 6z" fill="#76b871"/><path d="M118 109v35" stroke="#fff1c9" stroke-width="5"/>',
  12: '<rect x="40" y="79" width="120" height="82" rx="17" fill="#f3d39a"/><rect x="57" y="63" width="42" height="22" rx="6" fill="#ee936e"/><circle cx="104" cy="120" r="34" fill="#6596a4" stroke="#fff0c9" stroke-width="9"/><circle cx="104" cy="120" r="16" fill="#bce4d5"/><circle cx="145" cy="94" r="7" fill="#ec7968"/><path d="M52 172h100"/>',
  13: '<path d="M50 105q0-33 36-32 16-39 49-4 35-2 35 34-1 27-31 27H78q-29 0-28-25z" fill="#e8f1df"/><rect x="62" y="143" width="77" height="25" rx="7" fill="#f1c66f"/><rect x="62" y="174" width="77" height="25" rx="7" fill="#f1c66f"/><circle cx="126" cy="155" r="4" fill="#4d7183"/><circle cx="126" cy="186" r="4" fill="#4d7183"/><path d="M50 155h-15v31h15m105-31h15v31h-15"/>',
  14: '<path d="M51 177v-42h26v42m14 0V99h26v78m14 0V68h26v109" fill="#79d0bd"/><path d="M48 179h103"/><circle cx="133" cy="91" r="31" fill="#f4d77e"/><path d="M155 113l23 25" stroke="#f6e8c8" stroke-width="12" stroke-linecap="round"/><path d="M63 120l18-18 17 8 27-34" fill="none" stroke="#fff0bf" stroke-width="6"/>',
  15: '<circle cx="100" cy="123" r="27" fill="#f2c668"/><circle cx="48" cy="69" r="20" fill="#91d9cb"/><circle cx="153" cy="65" r="20" fill="#ed9477"/><circle cx="48" cy="178" r="20" fill="#ed9477"/><circle cx="155" cy="179" r="20" fill="#91d9cb"/><path d="M81 105L61 84m58 19 19-22m-58 61-21 23m61-22 20 21" stroke="#fff0c4" stroke-width="7"/><path d="M89 126q11-11 22 0v14H89z" fill="#fff4d4"/><circle cx="95" cy="127" r="2" fill="#4c5e70"/><circle cx="105" cy="127" r="2" fill="#4c5e70"/>',
  16: '<path d="M100 40l63 23v44q-4 49-63 77-59-28-63-77V63z" fill="#7dd0bd"/><path d="M100 58l45 16v33q-5 35-45 57-40-22-45-57V74z" fill="#40577a"/><rect x="80" y="103" width="40" height="32" rx="7" fill="#f4d27a"/><path d="M88 103V91q0-24 12-24t12 24v12" fill="none" stroke="#f4d27a" stroke-width="8"/><circle cx="100" cy="117" r="4" fill="#59647a"/>',
  17: '<rect x="45" y="52" width="98" height="130" rx="12" fill="#f3e5c4"/><path d="M68 88l10 10 19-23m-29 57 10 10 19-23m-19 49h39" fill="none" stroke="#77b98c" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="148" cy="143" r="24" fill="#ed9a70"/><path d="M130 126l-13-12m49 12 12-12m-49 48-12 12m49-12 12 12" stroke="#ed9a70" stroke-width="7"/><circle cx="141" cy="140" r="3" fill="#fff4da"/><circle cx="155" cy="140" r="3" fill="#fff4da"/>',
  18: '<rect x="49" y="47" width="102" height="126" rx="30" fill="#a7d8d2"/><rect x="63" y="73" width="74" height="48" rx="20" fill="#364f74"/><circle cx="85" cy="96" r="8" fill="#ffe18a"/><circle cx="115" cy="96" r="8" fill="#ffe18a"/><path d="M86 111q14 13 28 0M100 46V31m-8 0h16" fill="none" stroke="#f2ce79" stroke-width="7" stroke-linecap="round"/><path d="M70 150h60m-48 23v17m36-17v17" stroke="#fff0c5" stroke-width="8" stroke-linecap="round"/><circle cx="53" cy="57" r="9" fill="#ed8b74"/><circle cx="151" cy="57" r="9" fill="#ed8b74"/>',
  19: '<path d="M51 163h95l-15 28H68z" fill="#e2a45f"/><circle cx="79" cy="191" r="11" fill="#435575"/><circle cx="129" cy="191" r="11" fill="#435575"/><path d="M89 147l47-75m-8-6 22 14-12 20-22-14z" fill="#f2cf78"/><path d="M48 143l35-24m-25 44 39-48m32 41 30-26" stroke="#8bd3bf" stroke-width="8" stroke-linecap="round"/><circle cx="61" cy="109" r="7" fill="#fff0bd"/><circle cx="112" cy="115" r="7" fill="#fff0bd"/><circle cx="159" cy="121" r="7" fill="#fff0bd"/>',
  20: '<rect x="35" y="56" width="130" height="113" rx="13" fill="#f2dfb5"/><path d="M35 83h130" stroke="#ed9873" stroke-width="10"/><circle cx="52" cy="70" r="4" fill="#fff2d4"/><circle cx="67" cy="70" r="4" fill="#fff2d4"/><circle cx="82" cy="70" r="4" fill="#fff2d4"/><path d="M72 108l-19 17 19 17m55-34 19 17-19 17m-15-36-14 39" fill="none" stroke="#538d9a" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
  21: '<path d="M52 66q0-18 48-18t48 18v31q0 18-48 18T52 97zm0 31v32q0 18 48 18t48-18V97m-96 32q0 18 48 18t48-18" fill="#6fb7b2" stroke="#fff0c4" stroke-width="7"/><path d="M69 75q31 18 62 0" fill="none" stroke="#fff0c4" stroke-width="6"/><circle cx="100" cy="165" r="7" fill="#f1cd73"/>',
  22: '<circle cx="100" cy="112" r="25" fill="#f2cb70"/><rect x="35" y="48" width="47" height="39" rx="9" fill="#74c5b7"/><rect x="119" y="48" width="47" height="39" rx="9" fill="#ed9875"/><rect x="35" y="143" width="47" height="39" rx="9" fill="#ed9875"/><rect x="119" y="143" width="47" height="39" rx="9" fill="#74c5b7"/><path d="M82 83l8 11m28-11-8 11m-28 37-8 16m44-16 8 16" stroke="#fff0c4" stroke-width="8"/><circle cx="94" cy="108" r="3" fill="#4a5c76"/><circle cx="106" cy="108" r="3" fill="#4a5c76"/>',
  23: '<path d="M48 89h104v39H48z" fill="#e7d7aa"/><path d="M69 89V69h62v20m-42 39v24h62v-24" fill="none" stroke="#8bd0b8" stroke-width="9"/><circle cx="69" cy="108" r="17" fill="#ed9872"/><circle cx="132" cy="108" r="17" fill="#ed9872"/><path d="M63 108h12m-6-6v12m57-6h12m-6-6v12" stroke="#fff3cc" stroke-width="5"/><path d="M93 147l10 10 20-25" fill="none" stroke="#f1ca68" stroke-width="8" stroke-linecap="round"/>',
  24: '<rect x="68" y="35" width="66" height="142" rx="15" fill="#f4dfb9"/><rect x="76" y="53" width="50" height="92" rx="6" fill="#72b9b6"/><circle cx="101" cy="161" r="6" fill="#ed8f73"/><circle cx="90" cy="89" r="6" fill="#fff2cb"/><circle cx="111" cy="89" r="6" fill="#fff2cb"/><path d="M89 111q12 12 24 0" fill="none" stroke="#fff2cb" stroke-width="5" stroke-linecap="round"/><path d="M51 72l13 11m88-11-13 11" stroke="#f0c96d" stroke-width="7" stroke-linecap="round"/>',
  25: '<rect x="45" y="104" width="110" height="59" rx="14" fill="#f2d596"/><path d="M74 104V82q0-27 26-27t26 27v22" fill="#78c4b9"/><circle cx="82" cy="135" r="6" fill="#e9826f"/><circle cx="101" cy="135" r="6" fill="#e9826f"/><circle cx="120" cy="135" r="6" fill="#e9826f"/><path d="M53 88q48-51 95 0m-76 7q29-30 57 0" fill="none" stroke="#fff0c4" stroke-width="7"/><path d="M100 164v23m-25 0h50"/>',
  26: '<rect x="48" y="55" width="104" height="100" rx="22" fill="#9bd6cd"/><path d="M66 55V40m24 15V33m24 22V33m24 22V40M66 155v15m24-15v22m24-22v22m24-22v15" stroke="#f3d274" stroke-width="7" stroke-linecap="round"/><rect x="66" y="76" width="68" height="51" rx="17" fill="#3d4f77"/><circle cx="85" cy="98" r="7" fill="#ffdf7f"/><circle cx="115" cy="98" r="7" fill="#ffdf7f"/><path d="M87 113q13 11 26 0" fill="none" stroke="#ffdf7f" stroke-width="5" stroke-linecap="round"/><path d="M100 40V25" stroke="#f3d274" stroke-width="7"/><circle cx="100" cy="20" r="8" fill="#ed8d73"/>'
};

function xmlText(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function wrapTitle(title, maxLength = 18) {
  const lines = [];
  let line = '';
  for (const word of title.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function mascot(index, accent) {
  if (index >= 13) {
    return `<g transform="translate(177 304)" stroke="#34445d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="73" cy="177" rx="57" ry="10" fill="#142b40" opacity=".28" stroke="none"/><path d="M49 124l-9 37m58-37 11 37M40 161h16m46 0h16" fill="none" stroke="#f3d99b" stroke-width="12"/><rect x="34" y="73" width="78" height="67" rx="23" fill="#f4e6c5"/><rect x="42" y="82" width="62" height="39" rx="15" fill="${accent}"/><circle cx="60" cy="99" r="6" fill="#fff0a4" stroke="none"/><circle cx="86" cy="99" r="6" fill="#fff0a4" stroke="none"/><path d="M61 111q12 10 24 0" fill="none" stroke="#fff0a4" stroke-width="4"/><path d="M73 72V52" fill="none" stroke="#f3d99b" stroke-width="6"/><circle cx="73" cy="46" r="9" fill="#ef9277"/><path d="M34 91L18 104v28m94-41 16 14v28" fill="none" stroke="#f4e6c5" stroke-width="12"/><circle cx="18" cy="135" r="7" fill="#f3d99b" stroke="none"/><circle cx="128" cy="135" r="7" fill="#f3d99b" stroke="none"/><rect x="62" y="124" width="23" height="11" rx="5" fill="#f3d99b"/></g>`;
  }

  const hair = ['#563b35', '#392d38', '#72503a', '#463d32'][index % 4];
  const skin = ['#efb78d', '#d99370', '#f0c69b', '#bd795c'][index % 4];
  return `<g transform="translate(177 304)" stroke="#34445d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="73" cy="177" rx="57" ry="10" fill="#142b40" opacity=".28" stroke="none"/><path d="M52 124l-10 37m47-37 13 37m-68 0h17m44 0h17" fill="none" stroke="#f4e6c5" stroke-width="13"/><path d="M46 88q27-14 54 0l8 43q-34 20-70 0z" fill="${accent}"/><path d="M47 98l-22 19m74-20 23-20" fill="none" stroke="${skin}" stroke-width="12"/><circle cx="24" cy="119" r="7" fill="${skin}"/><circle cx="125" cy="96" r="7" fill="${skin}"/><circle cx="73" cy="57" r="34" fill="${skin}"/><path d="M40 55q-2-38 34-39 36 1 34 39-12-17-24-18-18 18-44 18z" fill="${hair}"/><circle cx="61" cy="59" r="4" fill="#34445d" stroke="none"/><circle cx="84" cy="59" r="4" fill="#34445d" stroke="none"/><path d="M65 75q9 8 18 0" fill="none" stroke="#9d5148" stroke-width="4"/><path d="M55 92q18 12 36 0" fill="none" stroke="#f3d99b" stroke-width="8"/><path d="M57 131v21m31-21v21" fill="none" stroke="#34445d" stroke-width="5"/></g>`;
}

for (const file of fs.readdirSync(coverDirectory).filter(name => name.endsWith('.svg'))) {
  const index = Number(file.match(/^(\d+)_/)[1]);
  const filePath = path.join(coverDirectory, file);
  const title = file.replace(/^\d+_|\.svg$/g, '').replace(/__/g, ', ').replace(/_/g, ' ');
  const [start, end] = palettes[index - 1];
  const accent = index <= 12 ? '#d78a55' : '#55a99d';
  const lines = wrapTitle(title);
  const titleStart = lines.length === 1 ? 545 : 526;
  const titleMarkup = lines.map((line, lineIndex) => `<tspan x="250" y="${titleStart + lineIndex * 39}">${xmlText(line)}</tspan>`).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="700" viewBox="0 0 500 700"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${start}"/><stop offset="1" stop-color="${end}"/></linearGradient><linearGradient id="panel" x1="0" y1="0" x2="0.8" y2="1"><stop stop-color="#fff4d8"/><stop offset="1" stop-color="#efd39c"/></linearGradient></defs><rect width="500" height="700" fill="url(#bg)"/><circle cx="48" cy="115" r="5" fill="#fff4d8" opacity=".6"/><circle cx="445" cy="175" r="7" fill="#fff4d8" opacity=".55"/><circle cx="74" cy="410" r="4" fill="#fff4d8" opacity=".5"/><circle cx="423" cy="450" r="5" fill="#fff4d8" opacity=".65"/><path d="M0 459q126-48 250 0t250 0v241H0z" fill="#162941" opacity=".22"/><rect x="34" y="34" width="432" height="632" rx="28" fill="none" stroke="#fff4d8" stroke-opacity=".45" stroke-width="3"/><text x="250" y="83" text-anchor="middle" fill="#fff2cf" font-family="Georgia,serif" font-size="16" font-weight="bold" letter-spacing="3">BOOKSHELF / ORIGINAL EDITION</text><circle cx="250" cy="280" r="154" fill="#17283a" opacity=".2"/><g transform="translate(150 170)" stroke="#fff3d2" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">${illustrations[index]}</g>${mascot(index, accent)}<path d="M70 476h360" stroke="#fff3d2" stroke-opacity=".65" stroke-width="2"/><text text-anchor="middle" fill="#fff8e8" font-family="Georgia,serif" font-size="31" font-weight="bold">${titleMarkup}</text><text x="250" y="630" text-anchor="middle" fill="#fff2cf" font-family="Arial,sans-serif" font-size="16" letter-spacing="4">READ / THINK / DISCOVER</text><path d="M180 648h140" stroke="#fff2cf" stroke-opacity=".65" stroke-width="2"/></svg>`;
  fs.writeFileSync(filePath, `${svg}\n`);
}

console.log(`Generated illustrated covers for ${Object.keys(illustrations).length} book topics.`);
