// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";

/* ───── design tokens ───── */
const C = {
  bg: "#0a0a0f", surface: "#111119", border: "#1e1e30",
  accent: "#6c5ce7", green: "#00d2a0", text: "#e8e8f0",
  dim: "#999", faint: "#444", red: "#f87171", amber: "#f59e0b",
  blue: "#60a5fa", pink: "#f472b6", cyan: "#22d3ee",
};

const sSection: React.CSSProperties = { marginBottom: 56 };
const sH2: React.CSSProperties = { fontSize: 22, fontWeight: 700, margin: "0 0 24px", color: C.text, letterSpacing: "-0.01em", borderBottom: `1px solid ${C.border}`, paddingBottom: 12 };
const sH3: React.CSSProperties = { fontSize: 16, fontWeight: 600, margin: "28px 0 12px", color: C.text };
const sP: React.CSSProperties = { fontSize: 14, lineHeight: 1.75, color: "#ccc", margin: "0 0 12px" };
const sCard: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", marginBottom: 16 };

const DATA: any = {"top30":[{"id":"00003","name":"Смартфоны","l1_name":"Телефоны и гаджеты","l2_name":"leaf L2","revenue_apr26":27336946900,"yoy_apr":0.9028838713181458,"forecast":91853941359.15791,"jul_sep_2025":101733948603,"brands_apr26":28,"skus_apr26":749,"sellers_apr26":223,"rev_per_sku":36497926,"season_index":{"1":97,"2":120,"3":95,"4":75,"5":71,"6":102,"7":84,"8":89,"9":92,"10":88,"11":163,"12":124},"summer_autumn_index":88},{"id":"00588","name":"Ноутбуки","l1_name":"Компьютеры","l2_name":"Ноутбуки и аксессуары","revenue_apr26":2992650521,"yoy_apr":0.6405909752995719,"forecast":11363859929.429348,"jul_sep_2025":17739650366,"brands_apr26":33,"skus_apr26":185,"sellers_apr26":83,"rev_per_sku":16176489,"season_index":{"1":74,"2":103,"3":67,"4":65,"5":53,"6":217,"7":65,"8":119,"9":116,"10":87,"11":138,"12":96},"summer_autumn_index":100},{"id":"00035","name":"Стиральные машины","l1_name":"Бытовая техника","l2_name":"Крупная техника для дома","revenue_apr26":2446654083,"yoy_apr":0.9910401287524911,"forecast":10046857927.914003,"jul_sep_2025":10137690328,"brands_apr26":47,"skus_apr26":197,"sellers_apr26":99,"rev_per_sku":12419564,"season_index":{"1":75,"2":93,"3":77,"4":77,"5":79,"6":114,"7":90,"8":116,"9":112,"10":108,"11":148,"12":111},"summer_autumn_index":106},{"id":"00025","name":"Холодильники","l1_name":"Бытовая техника","l2_name":"Крупная техника для дома","revenue_apr26":2430742776,"yoy_apr":0.9258441327790773,"forecast":9445521318.839235,"jul_sep_2025":10202064240,"brands_apr26":37,"skus_apr26":204,"sellers_apr26":68,"rev_per_sku":11915406,"season_index":{"1":60,"2":85,"3":78,"4":84,"5":90,"6":148,"7":113,"8":123,"9":102,"10":92,"11":127,"12":98},"summer_autumn_index":113},{"id":"00036","name":"Пылесосы","l1_name":"Бытовая техника","l2_name":"Малая техника для дома","revenue_apr26":2094074900,"yoy_apr":1.0221146993631853,"forecast":7007514618.860292,"jul_sep_2025":6855898485,"brands_apr26":163,"skus_apr26":444,"sellers_apr26":257,"rev_per_sku":4716385,"season_index":{"1":88,"2":109,"3":96,"4":84,"5":72,"6":108,"7":85,"8":97,"9":97,"10":98,"11":144,"12":120},"summer_autumn_index":93},{"id":"05374","name":"Телевизоры","l1_name":"ТВ, Аудио, Видео","l2_name":"leaf L2","revenue_apr26":1718629311,"yoy_apr":0.9645698733741158,"forecast":6961990013.402293,"jul_sep_2025":7217714554,"brands_apr26":39,"skus_apr26":157,"sellers_apr26":72,"rev_per_sku":10946684,"season_index":{"1":86,"2":109,"3":77,"4":62,"5":59,"6":131,"7":78,"8":90,"9":87,"10":91,"11":169,"12":163},"summer_autumn_index":85},{"id":"03504","name":"Печи и грили","l1_name":"Бытовая техника","l2_name":"Мелкая техника для кухни","revenue_apr26":1179283673,"yoy_apr":1.2911316669436694,"forecast":5177501032.985675,"jul_sep_2025":4010048832,"brands_apr26":141,"skus_apr26":381,"sellers_apr26":234,"rev_per_sku":3095233,"season_index":{"1":93,"2":114,"3":99,"4":74,"5":62,"6":89,"7":77,"8":100,"9":109,"10":112,"11":140,"12":132},"summer_autumn_index":95},{"id":"00026","name":"Морозильники","l1_name":"Бытовая техника","l2_name":"Крупная техника для дома","revenue_apr26":797415521,"yoy_apr":0.9300056586372302,"forecast":5168676566.371496,"jul_sep_2025":5557682922,"brands_apr26":31,"skus_apr26":100,"sellers_apr26":47,"rev_per_sku":7974155,"season_index":{"1":55,"2":58,"3":58,"4":54,"5":61,"6":119,"7":113,"8":122,"9":127,"10":130,"11":165,"12":139},"summer_autumn_index":121},{"id":"01325","name":"Планшеты","l1_name":"Компьютеры","l2_name":"Планшеты и аксессуары","revenue_apr26":1421615580,"yoy_apr":0.9640652639369708,"forecast":4861791228.474045,"jul_sep_2025":5043010479,"brands_apr26":38,"skus_apr26":143,"sellers_apr26":83,"rev_per_sku":9941368,"season_index":{"1":95,"2":111,"3":96,"4":81,"5":63,"6":85,"7":72,"8":100,"9":110,"10":97,"11":140,"12":151},"summer_autumn_index":94},{"id":"03512","name":"Кухонные комбайны и мясорубки","l1_name":"Бытовая техника","l2_name":"Мелкая техника для кухни","revenue_apr26":567749464,"yoy_apr":1.078087694350603,"forecast":4601678892.563244,"jul_sep_2025":4268371596,"brands_apr26":68,"skus_apr26":110,"sellers_apr26":87,"rev_per_sku":5161359,"season_index":{"1":64,"2":106,"3":86,"4":46,"5":67,"6":93,"7":70,"8":121,"9":170,"10":82,"11":161,"12":134},"summer_autumn_index":120},{"id":"00047","name":"Кондиционеры","l1_name":"Бытовая техника","l2_name":"Климатическая техника","revenue_apr26":1689488134,"yoy_apr":0.8027793817217102,"forecast":4527104500.860837,"jul_sep_2025":5639288457,"brands_apr26":37,"skus_apr26":143,"sellers_apr26":63,"rev_per_sku":11814602,"season_index":{"1":14,"2":38,"3":51,"4":108,"5":243,"6":359,"7":251,"8":49,"9":23,"10":17,"11":25,"12":21},"summer_autumn_index":108},{"id":"00044","name":"Смарт-часы","l1_name":"Телефоны и гаджеты","l2_name":"leaf L2","revenue_apr26":1290388710,"yoy_apr":0.8582530256199635,"forecast":4393330155.375605,"jul_sep_2025":5118921838,"brands_apr26":69,"skus_apr26":256,"sellers_apr26":144,"rev_per_sku":5040581,"season_index":{"1":78,"2":101,"3":92,"4":74,"5":81,"6":181,"7":84,"8":103,"9":85,"10":77,"11":122,"12":123},"summer_autumn_index":91},{"id":"05375","name":"Наушники","l1_name":"ТВ, Аудио, Видео","l2_name":"leaf L2","revenue_apr26":1475992185,"yoy_apr":0.8614999424364987,"forecast":4212730497.164761,"jul_sep_2025":4889995100,"brands_apr26":206,"skus_apr26":837,"sellers_apr26":437,"rev_per_sku":1763432,"season_index":{"1":93,"2":108,"3":102,"4":84,"5":81,"6":121,"7":79,"8":91,"9":87,"10":94,"11":118,"12":143},"summer_autumn_index":86},{"id":"00103","name":"Отопительные котлы","l1_name":"Бытовая техника","l2_name":"leaf L2","revenue_apr26":303994012,"yoy_apr":1.121828254128804,"forecast":3558324196.5583577,"jul_sep_2025":3171897466,"brands_apr26":18,"skus_apr26":28,"sellers_apr26":23,"rev_per_sku":10856929,"season_index":{"1":45,"2":45,"3":33,"4":42,"5":46,"6":111,"7":87,"8":147,"9":228,"10":188,"11":148,"12":80},"summer_autumn_index":154},{"id":"05403","name":"Системные блоки","l1_name":"Компьютеры","l2_name":"Настольные компьютеры","revenue_apr26":689984526,"yoy_apr":0.8755831485995461,"forecast":2799098621.611935,"jul_sep_2025":3196839302,"brands_apr26":23,"skus_apr26":41,"sellers_apr26":21,"rev_per_sku":16828891,"season_index":{"1":91,"2":123,"3":78,"4":64,"5":60,"6":109,"7":73,"8":102,"9":101,"10":100,"11":151,"12":147},"summer_autumn_index":92},{"id":"03488","name":"Прочая кухонная техника","l1_name":"Бытовая техника","l2_name":"Мелкая техника для кухни","revenue_apr26":899231917,"yoy_apr":1.1062068776003404,"forecast":2490315804.7431498,"jul_sep_2025":2251220685,"brands_apr26":147,"skus_apr26":314,"sellers_apr26":245,"rev_per_sku":2863796,"season_index":{"1":66,"2":95,"3":89,"4":108,"5":106,"6":181,"7":90,"8":99,"9":97,"10":88,"11":100,"12":82},"summer_autumn_index":95},{"id":"00023","name":"Духовые шкафы","l1_name":"Бытовая техника","l2_name":"Крупная техника для дома","revenue_apr26":628103570,"yoy_apr":0.9905259155392325,"forecast":2202647975.16254,"jul_sep_2025":2223715645,"brands_apr26":20,"skus_apr26":67,"sellers_apr26":39,"rev_per_sku":9374680,"season_index":{"1":69,"2":108,"3":82,"4":81,"5":78,"6":127,"7":88,"8":98,"9":98,"10":99,"11":150,"12":122},"summer_autumn_index":95},{"id":"00156","name":"Игровые приставки","l1_name":"ТВ, Аудио, Видео","l2_name":"Развлечения","revenue_apr26":531328283,"yoy_apr":0.9944256640111531,"forecast":2066879005.3698864,"jul_sep_2025":2078465068,"brands_apr26":18,"skus_apr26":60,"sellers_apr26":46,"rev_per_sku":8855471,"season_index":{"1":89,"2":112,"3":83,"4":63,"5":70,"6":122,"7":74,"8":88,"9":82,"10":82,"11":145,"12":191},"summer_autumn_index":81},{"id":"04912","name":"Роботы-пылесосы","l1_name":"Бытовая техника","l2_name":"Малая техника для дома","revenue_apr26":514770520,"yoy_apr":1.080649502338703,"forecast":2064310185.5661998,"jul_sep_2025":1910249513,"brands_apr26":11,"skus_apr26":47,"sellers_apr26":23,"rev_per_sku":10952564,"season_index":{"1":73,"2":108,"3":87,"4":78,"5":66,"6":116,"7":91,"8":111,"9":99,"10":83,"11":159,"12":130},"summer_autumn_index":100},{"id":"02930","name":"Принтеры и МФУ","l1_name":"Компьютеры","l2_name":"Оргтехника и расходные материалы","revenue_apr26":332318508,"yoy_apr":0.8934721171983435,"forecast":1958758557.1038325,"jul_sep_2025":2192299591,"brands_apr26":5,"skus_apr26":45,"sellers_apr26":32,"rev_per_sku":7384856,"season_index":{"1":91,"2":106,"3":67,"4":63,"5":56,"6":67,"7":62,"8":147,"9":182,"10":122,"11":138,"12":100},"summer_autumn_index":130},{"id":"00024","name":"Кухонные плиты","l1_name":"Бытовая техника","l2_name":"Крупная техника для дома","revenue_apr26":431286173,"yoy_apr":0.9087635849129772,"forecast":1896787631.2949352,"jul_sep_2025":2087217911,"brands_apr26":23,"skus_apr26":73,"sellers_apr26":34,"rev_per_sku":5908030,"season_index":{"1":71,"2":91,"3":76,"4":70,"5":74,"6":112,"7":90,"8":110,"9":121,"10":113,"11":150,"12":121},"summer_autumn_index":107},{"id":"00040","name":"Водонагреватели","l1_name":"Бытовая техника","l2_name":"Климатическая техника","revenue_apr26":860605163,"yoy_apr":0.89956159638379,"forecast":1786178969.1676474,"jul_sep_2025":1985610520,"brands_apr26":41,"skus_apr26":195,"sellers_apr26":80,"rev_per_sku":4413360,"season_index":{"1":68,"2":73,"3":75,"4":147,"5":133,"6":111,"7":94,"8":109,"9":118,"10":98,"11":96,"12":78},"summer_autumn_index":107},{"id":"00051","name":"Посудомоечные машины","l1_name":"Бытовая техника","l2_name":"Крупная техника для дома","revenue_apr26":491331753,"yoy_apr":0.9908776618418278,"forecast":1775866056.4372668,"jul_sep_2025":1792215250,"brands_apr26":18,"skus_apr26":52,"sellers_apr26":32,"rev_per_sku":9448688,"season_index":{"1":74,"2":104,"3":85,"4":79,"5":80,"6":120,"7":89,"8":96,"9":102,"10":98,"11":153,"12":122},"summer_autumn_index":96},{"id":"00045","name":"Варочные поверхности","l1_name":"Бытовая техника","l2_name":"Крупная техника для дома","revenue_apr26":434266801,"yoy_apr":1.0068389180034727,"forecast":1731363673.972522,"jul_sep_2025":1719603447,"brands_apr26":36,"skus_apr26":121,"sellers_apr26":65,"rev_per_sku":3588982,"season_index":{"1":76,"2":94,"3":82,"4":82,"5":79,"6":109,"7":101,"8":115,"9":110,"10":108,"11":134,"12":111},"summer_autumn_index":109},{"id":"00302","name":"Фотокамеры","l1_name":"ТВ, Аудио, Видео","l2_name":"Фото- и видеокамеры","revenue_apr26":499303270,"yoy_apr":1.2648596476037464,"forecast":1712109179.6434193,"jul_sep_2025":1353596174,"brands_apr26":9,"skus_apr26":36,"sellers_apr26":36,"rev_per_sku":13869535,"season_index":{"1":66,"2":103,"3":100,"4":93,"5":84,"6":145,"7":100,"8":94,"9":88,"10":79,"11":128,"12":119},"summer_autumn_index":94},{"id":"09165","name":"Смарт-очки","l1_name":"Телефоны и гаджеты","l2_name":"leaf L2","revenue_apr26":169175788,"yoy_apr":7.617418143360515,"forecast":1670562314.9896636,"jul_sep_2025":219308207,"brands_apr26":10,"skus_apr26":31,"sellers_apr26":26,"rev_per_sku":5457283,"season_index":{"1":92,"2":135,"3":124,"4":128,"5":49,"6":78,"7":73,"8":94,"9":127,"10":107,"11":93,"12":100},"summer_autumn_index":98},{"id":"00050","name":"Очистители и увлажнители","l1_name":"Бытовая техника","l2_name":"Климатическая техника","revenue_apr26":343254658,"yoy_apr":1.6711853770026202,"forecast":1442466312.9267836,"jul_sep_2025":863139621,"brands_apr26":76,"skus_apr26":139,"sellers_apr26":120,"rev_per_sku":2469458,"season_index":{"1":116,"2":121,"3":86,"4":67,"5":45,"6":64,"7":65,"8":76,"9":70,"10":154,"11":176,"12":160},"summer_autumn_index":70},{"id":"00011","name":"Мониторы","l1_name":"Компьютеры","l2_name":"Периферия","revenue_apr26":447580100,"yoy_apr":0.9010472426182922,"forecast":1394515203.5080664,"jul_sep_2025":1547660475,"brands_apr26":29,"skus_apr26":86,"sellers_apr26":43,"rev_per_sku":5204420,"season_index":{"1":94,"2":111,"3":88,"4":85,"5":78,"6":103,"7":84,"8":102,"9":94,"10":99,"11":131,"12":131},"summer_autumn_index":93},{"id":"03492","name":"Кофемашины и кофеварки","l1_name":"Бытовая техника","l2_name":"Мелкая техника для кухни","revenue_apr26":420094437,"yoy_apr":1.0108886445114977,"forecast":1356959513.080556,"jul_sep_2025":1342343215,"brands_apr26":76,"skus_apr26":154,"sellers_apr26":129,"rev_per_sku":2727886,"season_index":{"1":83,"2":111,"3":100,"4":87,"5":66,"6":99,"7":76,"8":105,"9":99,"10":88,"11":149,"12":138},"summer_autumn_index":93},{"id":"03499","name":"Миксеры, блендеры и измельчители","l1_name":"Бытовая техника","l2_name":"Мелкая техника для кухни","revenue_apr26":399364993,"yoy_apr":1.1273362736656114,"forecast":1332914211.8471746,"jul_sep_2025":1182357246,"brands_apr26":127,"skus_apr26":328,"sellers_apr26":214,"rev_per_sku":1217576,"season_index":{"1":86,"2":119,"3":111,"4":89,"5":78,"6":107,"7":87,"8":98,"9":94,"10":94,"11":118,"12":119},"summer_autumn_index":93}],"extras":[{"id":"03282","name":"Отпариватели","l1_name":"Бытовая техника","l2_name":"Малая техника для дома","revenue_apr26":203180636,"yoy_apr":1.1188596244826337,"forecast":1061247155.8904438,"season_index":{"1":58,"2":74,"3":82,"4":84,"5":89,"6":114,"7":105,"8":174,"9":135,"10":90,"11":100,"12":96},"summer_autumn_index":138,"brands_apr26":93,"skus_apr26":158},{"id":"03280","name":"Утюги","l1_name":"Бытовая техника","l2_name":"Малая техника для дома","revenue_apr26":164782578,"yoy_apr":1.0962019365829228,"forecast":822614467.3073679,"season_index":{"1":64,"2":77,"3":78,"4":85,"5":92,"6":119,"7":109,"8":155,"9":139,"10":98,"11":103,"12":80},"summer_autumn_index":134,"brands_apr26":50,"skus_apr26":137},{"id":"00038","name":"Парогенераторы","l1_name":"Бытовая техника","l2_name":"Малая техника для дома","revenue_apr26":158934475,"yoy_apr":0.938838627351782,"forecast":697405321.8368446,"season_index":{"1":60,"2":80,"3":73,"4":86,"5":79,"6":125,"7":106,"8":137,"9":145,"10":100,"11":122,"12":89},"summer_autumn_index":129,"brands_apr26":13,"skus_apr26":27},{"id":"00104","name":"Вентиляторы","l1_name":"Бытовая техника","l2_name":"Климатическая техника","revenue_apr26":75051617,"yoy_apr":0.6462567955279546,"forecast":526333724.79755425,"season_index":{"1":4,"2":6,"3":13,"4":45,"5":214,"6":515,"7":337,"8":38,"9":8,"10":7,"11":6,"12":6},"summer_autumn_index":128,"brands_apr26":55,"skus_apr26":154},{"id":"05305","name":"ИБП и стабилизаторы","l1_name":"Компьютеры","l2_name":"Периферия","revenue_apr26":98656972,"yoy_apr":1.0313208133597214,"forecast":533866375.9086695,"season_index":{"1":70,"2":68,"3":62,"4":70,"5":79,"6":129,"7":176,"8":98,"9":99,"10":123,"11":130,"12":96},"summer_autumn_index":124,"brands_apr26":16,"skus_apr26":45},{"id":"00054","name":"Фитнес-браслеты","l1_name":"Телефоны и гаджеты","l2_name":"Гаджеты","revenue_apr26":126127613,"yoy_apr":2.3230005646178786,"forecast":1093003783.569494,"season_index":{"1":76,"2":87,"3":107,"4":74,"5":49,"6":60,"7":77,"8":140,"9":167,"10":131,"11":93,"12":138},"summer_autumn_index":128,"brands_apr26":10,"skus_apr26":40},{"id":"03487","name":"Аксессуары для кухонной техники","l1_name":"Бытовая техника","l2_name":"Мелкая техника для кухни","revenue_apr26":53356468,"yoy_apr":1.3366175150820943,"forecast":242042508.15058875,"season_index":{"1":87,"2":103,"3":96,"4":84,"5":67,"6":88,"7":104,"8":111,"9":112,"10":106,"11":130,"12":111},"summer_autumn_index":109,"brands_apr26":61,"skus_apr26":198}],"priority":[{"id":"00103","name":"Отопительные котлы","l1_name":"Бытовая техника","l2_name":"leaf L2","revenue_apr26":303994012,"yoy_apr":1.121828254128804,"forecast":3558324196.5583577,"season_index":{"1":45,"2":45,"3":33,"4":42,"5":46,"6":111,"7":87,"8":147,"9":228,"10":188,"11":148,"12":80},"summer_autumn_index":154,"brands_apr26":18,"skus_apr26":28,"top_brands":[{"brand":"Navien","revenue":69707153,"sku_count":28,"avg_rating":4.964285748345511,"orders":158},{"brand":"Горняк","revenue":25444309,"sku_count":13,"avg_rating":4.930769296792837,"orders":48},{"brand":"Ariston","revenue":15161017,"sku_count":3,"avg_rating":3.300000031789144,"orders":38},{"brand":"Без бренда","revenue":13842789,"sku_count":7,"avg_rating":4.885714326586042,"orders":48},{"brand":"Hubert","revenue":13362181,"sku_count":14,"avg_rating":4.950000047683716,"orders":44},{"brand":"Daewoo","revenue":12777539,"sku_count":10,"avg_rating":4.960000038146973,"orders":31},{"brand":"VEKA","revenue":12357912,"sku_count":11,"avg_rating":4.954545497894287,"orders":26},{"brand":"НМК","revenue":7511300,"sku_count":7,"avg_rating":4.78571435383388,"orders":14}],"top_skus":[{"sku":"8500473","sku_name":"Газовый котел Ariston CARES X 24 FF NG без дымохода","brand_name":"Ariston","price":395881,"revenue":13131397,"sale_cnt":34,"review_cnt":30,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/gazovyi-kotel-ariston-cares-x-24-ff-ng-bez-dymohoda-8500473","segment_name":"Дорогой"},{"sku":"8500131","sku_name":"Газовый котел Navien Ace-16K с дымоходом","brand_name":"Navien","price":344978,"revenue":8476950,"sale_cnt":24,"review_cnt":225,"rating":5,"sku_url":"https://kaspi.kz/shop/p/gazovyi-kotel-navien-ace-16k-s-dymohodom-8500131","segment_name":"Средний"},{"sku":"104767136","sku_name":"Твердотопливный котел Горняк КСВм 12 кВт без дымохода","brand_name":"Горняк","price":484000,"revenue":7448117,"sale_cnt":15,"review_cnt":125,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/tverdotoplivnyi-kotel-gornjak-ksvm-12-kvt-bez-dymohoda-104767136","segment_name":"Премиум"},{"sku":"8500141","sku_name":"Газовый котел Navien Ace-30K с дымоходом","brand_name":"Navien","price":436920,"revenue":6825716,"sale_cnt":15,"review_cnt":383,"rating":5,"sku_url":"https://kaspi.kz/shop/p/gazovyi-kotel-navien-ace-30k-s-dymohodom-8500141","segment_name":"Дорогой"},{"sku":"133959419","sku_name":"Газовый котел ROMA LIP24-A с дымоходом","brand_name":"Без бренда","price":1385100,"revenue":6149877,"sale_cnt":8,"review_cnt":2,"rating":5,"sku_url":"https://kaspi.kz/shop/p/gazovyi-kotel-roma-lip24-a-s-dymohodom-133959419","segment_name":"Премиум"},{"sku":"100829199","sku_name":"Газовый котел Navien Ace-20K с дымоходом","brand_name":"Navien","price":385561,"revenue":5856569,"sale_cnt":16,"review_cnt":340,"rating":5,"sku_url":"https://kaspi.kz/shop/p/gazovyi-kotel-navien-ace-20k-s-dymohodom-100829199","segment_name":"Дорогой"}],"segments":[{"segment":1,"segment_name":"Низкий","median_price":98000,"avg_price":93663,"revenue_share_pct":4.8,"sku_cnt":73},{"segment":2,"segment_name":"Бюджетный","median_price":204900,"avg_price":207184,"revenue_share_pct":12.1,"sku_cnt":77},{"segment":3,"segment_name":"Средний","median_price":285000,"avg_price":293342,"revenue_share_pct":18.3,"sku_cnt":78},{"segment":4,"segment_name":"Дорогой","median_price":423890,"avg_price":422322,"revenue_share_pct":33.2,"sku_cnt":86},{"segment":5,"segment_name":"Премиум","median_price":605000,"avg_price":672377,"revenue_share_pct":31.5,"sku_cnt":73}],"top_complaints":[],"top_positives":[{"theme":"Удобство использования","count":2},{"theme":"Качество материалов","count":2},{"theme":"Хороший дизайн","count":1},{"theme":"За свои деньги","count":1}],"sample_complaints":[],"total_reviews_analyzed":62},{"id":"00026","name":"Морозильники","l1_name":"Бытовая техника","l2_name":"Крупная техника для дома","revenue_apr26":797415521,"yoy_apr":0.9300056586372302,"forecast":5168676566.371496,"season_index":{"1":55,"2":58,"3":58,"4":54,"5":61,"6":119,"7":113,"8":122,"9":127,"10":130,"11":165,"12":139},"summer_autumn_index":121,"brands_apr26":31,"skus_apr26":100,"top_brands":[{"brand":"Leadbros","revenue":152890061,"sku_count":22,"avg_rating":4.922727346420289,"orders":1589},{"brand":"AVANGARD","revenue":91391495,"sku_count":22,"avg_rating":4.9454545974731445,"orders":491},{"brand":"Бирюса","revenue":82553450,"sku_count":24,"avg_rating":4.895833412806192,"orders":423},{"brand":"TIGER","revenue":35892426,"sku_count":3,"avg_rating":4.900000095367432,"orders":87},{"brand":"Muxxed","revenue":31323441,"sku_count":12,"avg_rating":4.958333373069763,"orders":296},{"brand":"ARG","revenue":25714842,"sku_count":8,"avg_rating":4.925000071525574,"orders":249},{"brand":"Atlant","revenue":24346494,"sku_count":5,"avg_rating":4.900000095367432,"orders":122},{"brand":"Без бренда","revenue":23451467,"sku_count":5,"avg_rating":4.960000038146973,"orders":194}],"top_skus":[{"sku":"137444919","sku_name":"TIGER SD-700NL 700 л черный","brand_name":"TIGER","price":450000,"revenue":21943561,"sale_cnt":57,"review_cnt":59,"rating":5,"sku_url":"https://kaspi.kz/shop/p/tiger-sd-700nl-700-l-chernyi-137444919","segment_name":"Премиум"},{"sku":"100018121","sku_name":"Бирюса 680KXQ 600 л белый","brand_name":"Бирюса","price":291775,"revenue":18414567,"sale_cnt":63,"review_cnt":154,"rating":4.699999809265137,"sku_url":"https://kaspi.kz/shop/p/birjusa-680kxq-600-l-belyi-100018121","segment_name":"Премиум"},{"sku":"105632244","sku_name":"Leadbros BC/BD-217AT 217 л белый","brand_name":"Leadbros","price":87990,"revenue":18040363,"sale_cnt":205,"review_cnt":2812,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/leadbros-bc-bd-217at-217-l-belyi-105632244","segment_name":"Низкий"},{"sku":"106671267","sku_name":"Leadbros BC/BD-160 160 л белый","brand_name":"Leadbros","price":77990,"revenue":17191551,"sale_cnt":224,"review_cnt":970,"rating":5,"sku_url":"https://kaspi.kz/shop/p/leadbros-bc-bd-160-160-l-belyi-106671267","segment_name":"Низкий"},{"sku":"2800118","sku_name":"Leadbros BCBD-100 100 л белый","brand_name":"Leadbros","price":69990,"revenue":14179507,"sale_cnt":204,"review_cnt":914,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/leadbros-bcbd-100-100-l-belyi-2800118","segment_name":"Низкий"},{"sku":"2800650","sku_name":"Бирюса 455KX 420 л белый","brand_name":"Бирюса","price":221175,"revenue":12288787,"sale_cnt":57,"review_cnt":300,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/birjusa-455kx-420-l-belyi-2800650","segment_name":"Дорогой"}],"segments":[{"segment":1,"segment_name":"Низкий","median_price":84108,"avg_price":90493,"revenue_share_pct":24.3,"sku_cnt":117},{"segment":2,"segment_name":"Бюджетный","median_price":119990,"avg_price":129767,"revenue_share_pct":14.6,"sku_cnt":92},{"segment":3,"segment_name":"Средний","median_price":149990,"avg_price":160357,"revenue_share_pct":16.1,"sku_cnt":96},{"segment":4,"segment_name":"Дорогой","median_price":224000,"avg_price":243970,"revenue_share_pct":20.9,"sku_cnt":110},{"segment":5,"segment_name":"Премиум","median_price":419990,"avg_price":539166,"revenue_share_pct":24.2,"sku_cnt":99}],"top_complaints":[{"theme":"Качество сборки","count":3},{"theme":"Гарантия / сервис","count":1},{"theme":"Шум","count":1},{"theme":"Доставка","count":1}],"top_positives":[{"theme":"Тихая работа","count":5},{"theme":"Хороший дизайн","count":4},{"theme":"Удобство использования","count":2},{"theme":"Качество материалов","count":1}],"sample_complaints":[{"theme":"Гарантия / сервис","rating":1,"sku":"100018121","sku_name":"Бирюса 680KXQ 600 л белый","excerpt":"Некачественные товары у этого магазина, не покупайте у них нечего. Морозильники даже на неделю не выдерживают, а дают 3 года гарантий, полная чушь. И руководство такое же. Целую бюрократию устраивают, чтобы не возвращать денег. Не берите, короче у ни..."},{"theme":"Шум","rating":1,"sku":"100018121","sku_name":"Бирюса 680KXQ 600 л белый","excerpt":"Бирюса не берите, очень шумно работает."},{"theme":"Качество сборки","rating":1,"sku":"100018121","sku_name":"Бирюса 680KXQ 600 л белый","excerpt":"Бракованный пришёл."},{"theme":"Доставка","rating":1,"sku":"105632244","sku_name":"Leadbros BC/BD-217AT 217 л белый","excerpt":"Крышка согнулась, очень плохая доставка крышка неплотно закрывается."}],"total_reviews_analyzed":75},{"id":"00050","name":"Очистители и увлажнители","l1_name":"Бытовая техника","l2_name":"Климатическая техника","revenue_apr26":343254658,"yoy_apr":1.6711853770026202,"forecast":1442466312.9267836,"season_index":{"1":116,"2":121,"3":86,"4":67,"5":45,"6":64,"7":65,"8":76,"9":70,"10":154,"11":176,"12":160},"summer_autumn_index":70,"brands_apr26":76,"skus_apr26":139,"top_brands":[{"brand":"Xiaomi","revenue":74507164,"sku_count":23,"avg_rating":4.830434882122536,"orders":1317},{"brand":"umeko","revenue":59824272,"sku_count":5,"avg_rating":4.960000038146973,"orders":356},{"brand":"Dyson","revenue":14057713,"sku_count":5,"avg_rating":3.6800000190734865,"orders":32},{"brand":"Без бренда","revenue":12105954,"sku_count":12,"avg_rating":4.858333349227905,"orders":258},{"brand":"Almaty Air","revenue":7793021,"sku_count":5,"avg_rating":5,"orders":50},{"brand":"Levoit","revenue":6863060,"sku_count":6,"avg_rating":4.933333396911621,"orders":68},{"brand":"Airdog","revenue":6385657,"sku_count":5,"avg_rating":4,"orders":16},{"brand":"Midea","revenue":5557744,"sku_count":6,"avg_rating":4.916666746139526,"orders":64}],"top_skus":[{"sku":"140335318","sku_name":"Очиститель воздуха umeko Air+ белый","brand_name":"umeko","price":215000,"revenue":36978874,"sale_cnt":181,"review_cnt":1128,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/ochistitel-vozduha-umeko-air-belyi-140335318","segment_name":"Премиум"},{"sku":"103535997","sku_name":"Очиститель воздуха Xiaomi Smart Air Purifier 4 Lite AC-M17-SC белый","brand_name":"Xiaomi","price":54880,"revenue":15083655,"sale_cnt":244,"review_cnt":479,"rating":4.800000190734863,"sku_url":"https://kaspi.kz/shop/p/ochistitel-vozduha-xiaomi-smart-air-purifier-4-lite-ac-m17-sc-belyi-103535997","segment_name":"Дорогой"},{"sku":"140056308","sku_name":"Очиститель воздуха Dyson Humidify+Cool PH2 De-NOx PH05 золотистый","brand_name":"Dyson","price":448170,"revenue":10822263,"sale_cnt":22,"review_cnt":18,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/ochistitel-vozduha-dyson-humidify-cool-ph2-de-nox-ph05-zolotistyi-140056308","segment_name":"Премиум"},{"sku":"103331689","sku_name":"Очиститель воздуха Xiaomi Smart Air Purifier 4 Pro AC-M15-SC China version белый","brand_name":"Xiaomi","price":103000,"revenue":10446759,"sale_cnt":95,"review_cnt":122,"rating":4.800000190734863,"sku_url":"https://kaspi.kz/shop/p/ochistitel-vozduha-xiaomi-smart-air-purifier-4-pro-ac-m15-sc-china-version-belyi-103331689","segment_name":"Премиум"},{"sku":"147075836","sku_name":"Очиститель воздуха umeko AIR+ белый","brand_name":"umeko","price":270000,"revenue":9849625,"sale_cnt":38,"review_cnt":122,"rating":5,"sku_url":"https://kaspi.kz/shop/p/ochistitel-vozduha-umeko-air-belyi-147075836","segment_name":"Премиум"},{"sku":"108118715","sku_name":"Очиститель воздуха Xiaomi Smart Air Purifier Elite BHR6359EU/Y-600 белый","brand_name":"Xiaomi","price":173243,"revenue":9239386,"sale_cnt":51,"review_cnt":65,"rating":4.800000190734863,"sku_url":"https://kaspi.kz/shop/p/ochistitel-vozduha-xiaomi-smart-air-purifier-elite-bhr6359eu-y-600-belyi-108118715","segment_name":"Премиум"}],"segments":[{"segment":1,"segment_name":"Низкий","median_price":2550,"avg_price":57489,"revenue_share_pct":3.2,"sku_cnt":160},{"segment":2,"segment_name":"Бюджетный","median_price":6940,"avg_price":11871,"revenue_share_pct":4.7,"sku_cnt":147},{"segment":3,"segment_name":"Средний","median_price":16890,"avg_price":18165,"revenue_share_pct":9.7,"sku_cnt":133},{"segment":4,"segment_name":"Дорогой","median_price":38988,"avg_price":40967,"revenue_share_pct":21.8,"sku_cnt":147},{"segment":5,"segment_name":"Премиум","median_price":129900,"avg_price":192379,"revenue_share_pct":60.6,"sku_cnt":157}],"top_complaints":[{"theme":"Цена / переплата","count":2},{"theme":"Инструкция / понимание","count":1},{"theme":"Размер / форма","count":1},{"theme":"Качество сборки","count":1},{"theme":"Шум","count":1}],"top_positives":[{"theme":"Тихая работа","count":5},{"theme":"За свои деньги","count":4},{"theme":"Удобство использования","count":3},{"theme":"Мощность хорошая","count":2}],"sample_complaints":[{"theme":"Инструкция / понимание","rating":3,"sku":"140335318","sku_name":"Очиститель воздуха umeko Air+ белый","excerpt":"Очень много непонятного. Непонятно как очищает. Как будто ничего не поменялось."},{"theme":"Цена / переплата","rating":1,"sku":"140335318","sku_name":"Очиститель воздуха umeko Air+ белый","excerpt":"Очистителем пользуюсь два дня совсем не убирает запахи, от него выходит просто приток воздуха, но сомневаюсь что он очищает воздух, не оправдал мои ожидания, и не соответствует цена качеству."},{"theme":"Размер / форма","rating":3,"sku":"103535997","sku_name":"Очиститель воздуха Xiaomi Smart Air Purifier 4 Lite AC-M17-SC белый","excerpt":"Многие писали что аллергики начинают прям дышать свободнее, мои дети (алергики) пока дышат также тяжело как и раньше."},{"theme":"Качество сборки","rating":3,"sku":"103331689","sku_name":"Очиститель воздуха Xiaomi Smart Air Purifier 4 Pro AC-M15-SC China ver","excerpt":"Эффективно убирает запахи, например выбросы с Павлодарского Алюминиевого Завода, особенно в вечернее время. Все ещё рекомендую. Но спать с ним невозможно. Появился посторонний шум спустя пару дней использования. Уснуть невозможно из за него. Я не зна..."}],"total_reviews_analyzed":75},{"id":"03498","name":"Электрочайники и термопоты","l1_name":"Бытовая техника","l2_name":"Мелкая техника для кухни","revenue_apr26":273740338,"yoy_apr":1.057634069711916,"forecast":943464489.8523197,"season_index":{"1":97,"2":103,"3":101,"4":87,"5":79,"6":94,"7":83,"8":101,"9":106,"10":111,"11":120,"12":119},"summer_autumn_index":97,"brands_apr26":101,"skus_apr26":313,"top_brands":[{"brand":"Tefal","revenue":23884925,"sku_count":20,"avg_rating":4.895000076293945,"orders":942},{"brand":"Smeg","revenue":20714430,"sku_count":10,"avg_rating":4.930000066757202,"orders":313},{"brand":"Xiaomi","revenue":13259807,"sku_count":12,"avg_rating":4.875000079472859,"orders":836},{"brand":"Без бренда","revenue":12801549,"sku_count":13,"avg_rating":4.884615421295166,"orders":4960},{"brand":"BEREKE","revenue":9994766,"sku_count":8,"avg_rating":4.887500047683716,"orders":2646},{"brand":"ARG","revenue":9147585,"sku_count":9,"avg_rating":4.866666740841335,"orders":1274},{"brand":"ZielBer","revenue":8304066,"sku_count":9,"avg_rating":4.888888994852702,"orders":2059},{"brand":"Bosch","revenue":7216377,"sku_count":12,"avg_rating":4.925000071525574,"orders":210}],"top_skus":[{"sku":"6301732","sku_name":"Электрочайник Smeg KLF04CREU бежевый","brand_name":"Smeg","price":51135,"revenue":12314564,"sale_cnt":217,"review_cnt":868,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/elektrochainik-smeg-klf04creu-bezhevyi-6301732","segment_name":"Премиум"},{"sku":"117698380","sku_name":"Электрочайник Yingzheng ZY-305 черный","brand_name":"Yingzheng","price":3700,"revenue":4638731,"sale_cnt":1142,"review_cnt":1442,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/elektrochainik-yingzheng-zy-305-chernyi-117698380","segment_name":"Низкий"},{"sku":"107912987","sku_name":"Электрочайник ZY-303 черный, серебристый","brand_name":"Без бренда","price":2872,"revenue":4436067,"sale_cnt":1422,"review_cnt":2409,"rating":4.599999904632568,"sku_url":"https://kaspi.kz/shop/p/elektrochainik-zy-303-chernyi-serebristyi-107912987","segment_name":"Низкий"},{"sku":"6301566","sku_name":"Электрочайник Smeg KLF03CREU бежевый","brand_name":"Smeg","price":61789,"revenue":3817091,"sale_cnt":54,"review_cnt":434,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/elektrochainik-smeg-klf03creu-bezhevyi-6301566","segment_name":"Премиум"},{"sku":"134857361","sku_name":"Электрочайник Menox MX01 Double Wall Digitall Kettle белый","brand_name":"Menox","price":14900,"revenue":3755463,"sale_cnt":260,"review_cnt":956,"rating":5,"sku_url":"https://kaspi.kz/shop/p/elektrochainik-menox-mx01-double-wall-digitall-kettle-belyi-134857361","segment_name":"Средний"},{"sku":"117202973","sku_name":"Электрочайник Tefal Glass KI840830 черный, прозрачный","brand_name":"Tefal","price":22903,"revenue":3570185,"sale_cnt":151,"review_cnt":927,"rating":5,"sku_url":"https://kaspi.kz/shop/p/elektrochainik-tefal-glass-ki840830-chernyi-prozrachnyi-117202973","segment_name":"Дорогой"}],"segments":[{"segment":1,"segment_name":"Низкий","median_price":4299,"avg_price":5478,"revenue_share_pct":21.8,"sku_cnt":343},{"segment":2,"segment_name":"Бюджетный","median_price":8290,"avg_price":8870,"revenue_share_pct":11.6,"sku_cnt":317},{"segment":3,"segment_name":"Средний","median_price":13990,"avg_price":14804,"revenue_share_pct":16.7,"sku_cnt":293},{"segment":4,"segment_name":"Дорогой","median_price":21930,"avg_price":23852,"revenue_share_pct":20.9,"sku_cnt":312},{"segment":5,"segment_name":"Премиум","median_price":44795,"avg_price":58487,"revenue_share_pct":28.9,"sku_cnt":316}],"top_complaints":[{"theme":"Шум","count":4},{"theme":"Запах / пластик","count":4},{"theme":"Не работает / не включается","count":3},{"theme":"Цена / переплата","count":1},{"theme":"Качество сборки","count":1}],"top_positives":[{"theme":"Хороший дизайн","count":19},{"theme":"Удобство использования","count":7},{"theme":"Тихая работа","count":3},{"theme":"За свои деньги","count":2}],"sample_complaints":[{"theme":"Шум","rating":1,"sku":"6301732","sku_name":"Электрочайник Smeg KLF04CREU бежевый","excerpt":"В принципе нормально, но я искала бесшумный чайник, вроде в комментариях было написано что бесшумный, оказывается он шумный, качество тоже нормальное, но хотелось бы без шума чайник, за такую цену очень дорого, ничего особенного нету."},{"theme":"Цена / переплата","rating":1,"sku":"6301732","sku_name":"Электрочайник Smeg KLF04CREU бежевый","excerpt":"В принципе нормально, но я искала бесшумный чайник, вроде в комментариях было написано что бесшумный, оказывается он шумный, качество тоже нормальное, но хотелось бы без шума чайник, за такую цену очень дорого, ничего особенного нету."},{"theme":"Запах / пластик","rating":1,"sku":"117698380","sku_name":"Электрочайник Yingzheng ZY-305 черный","excerpt":"Разочарована покупкой. Купила этот электрический чайник, надеясь на хорошее качество, но была сильно разочарована. Сразу после включения появился сильный запах пластика, который не исчез даже после нескольких кипячений. К тому же, при нагреве чувству..."},{"theme":"Качество сборки","rating":1,"sku":"107912987","sku_name":"Электрочайник ZY-303 черный, серебристый","excerpt":"Пользуемся только больше 2 месяцев, уже сломался Хотя прям так активно не пользовались. Ещё говорят, что Каспи только с проверенными магазинами, с качеством, хорошим товаром работает Зачем врать, ничего подобного."}],"total_reviews_analyzed":75},{"id":"03282","name":"Отпариватели","l1_name":"Бытовая техника","l2_name":"Малая техника для дома","revenue_apr26":203180636,"yoy_apr":1.1188596244826337,"forecast":1061247155.8904438,"season_index":{"1":58,"2":74,"3":82,"4":84,"5":89,"6":114,"7":105,"8":174,"9":135,"10":90,"11":100,"12":96},"summer_autumn_index":138,"brands_apr26":93,"skus_apr26":158,"top_brands":[{"brand":"Tefal","revenue":21833741,"sku_count":15,"avg_rating":4.826666704813639,"orders":291},{"brand":"Без бренда","revenue":20285578,"sku_count":19,"avg_rating":4.878947383479068,"orders":1950},{"brand":"MONTERO","revenue":11919686,"sku_count":3,"avg_rating":4.9666666984558105,"orders":277},{"brand":"HAROOKO","revenue":9280792,"sku_count":7,"avg_rating":4.928571496691022,"orders":435},{"brand":"Two Hands Up","revenue":6259201,"sku_count":6,"avg_rating":4.916666746139526,"orders":337},{"brand":"NEXME","revenue":5678406,"sku_count":4,"avg_rating":4.925000071525574,"orders":193},{"brand":"AEROLITH","revenue":5418718,"sku_count":4,"avg_rating":4.925000071525574,"orders":2807},{"brand":"Jiffy Steamer","revenue":5045786,"sku_count":1,"avg_rating":4.900000095367432,"orders":1017}],"top_skus":[{"sku":"132998486","sku_name":"Отпариватель MONTERO PRO S200 розовый","brand_name":"MONTERO","price":135990,"revenue":11381372,"sale_cnt":248,"review_cnt":902,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/otparivatel-montero-pro-s200-rozovyi-132998486","segment_name":"Премиум"},{"sku":"114184950","sku_name":"Отпариватель Jiffy Steamer LM-2301 бежевый","brand_name":"Jiffy Steamer","price":4800,"revenue":5045786,"sale_cnt":1017,"review_cnt":1484,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/otparivatel-jiffy-steamer-lm-2301-bezhevyi-114184950","segment_name":"Низкий"},{"sku":"116620226","sku_name":"Отпариватель HAROOKO SG5651 белый","brand_name":"HAROOKO","price":23900,"revenue":4739234,"sale_cnt":204,"review_cnt":742,"rating":5,"sku_url":"https://kaspi.kz/shop/p/otparivatel-harooko-sg5651-belyi-116620226","segment_name":"Дорогой"},{"sku":"103587131","sku_name":"Отпариватель Tefal IXEO+ QT1511E0 черный","brand_name":"Tefal","price":231420,"revenue":4497498,"sale_cnt":27,"review_cnt":58,"rating":4.800000190734863,"sku_url":"https://kaspi.kz/shop/p/otparivatel-tefal-ixeo-qt1511e0-chernyi-103587131","segment_name":"Премиум"},{"sku":"102708506","sku_name":"Отпариватель Tefal IXEO+ QT1510E0 черный","brand_name":"Tefal","price":184990,"revenue":4359609,"sale_cnt":25,"review_cnt":87,"rating":4.800000190734863,"sku_url":"https://kaspi.kz/shop/p/otparivatel-tefal-ixeo-qt1510e0-chernyi-102708506","segment_name":"Премиум"},{"sku":"106727485","sku_name":"Отпариватель SK-4010 бежевый","brand_name":"Без бренда","price":12488,"revenue":3611004,"sale_cnt":305,"review_cnt":1253,"rating":4.699999809265137,"sku_url":"https://kaspi.kz/shop/p/otparivatel-sk-4010-bezhevyi-106727485","segment_name":"Средний"}],"segments":[{"segment":1,"segment_name":"Низкий","median_price":8755,"avg_price":33021,"revenue_share_pct":19.3,"sku_cnt":122},{"segment":2,"segment_name":"Бюджетный","median_price":8990,"avg_price":9561,"revenue_share_pct":7.2,"sku_cnt":140},{"segment":3,"segment_name":"Средний","median_price":12493,"avg_price":14982,"revenue_share_pct":14,"sku_cnt":126},{"segment":4,"segment_name":"Дорогой","median_price":23900,"avg_price":25281,"revenue_share_pct":24.6,"sku_cnt":153},{"segment":5,"segment_name":"Премиум","median_price":49994,"avg_price":70389,"revenue_share_pct":34.9,"sku_cnt":128}],"top_complaints":[{"theme":"Цена / переплата","count":2},{"theme":"Доставка","count":2},{"theme":"Шум","count":2},{"theme":"Размер / форма","count":1},{"theme":"Качество сборки","count":1}],"top_positives":[{"theme":"Удобство использования","count":13},{"theme":"Мощность хорошая","count":9},{"theme":"Качество материалов","count":4},{"theme":"За свои деньги","count":1}],"sample_complaints":[{"theme":"Размер / форма","rating":1,"sku":"114184950","sku_name":"Отпариватель Jiffy Steamer LM-2301 бежевый","excerpt":"Взял данный товар по хорошим отзывам. В итоге не оправдал ожидания. Очень маленькая и площадь поверхности глажки очень маленькая. Приходится долго из-за этого возиться по одежде и рука быстро устает от этого. Лучше доплатить и купить нормальный отпар..."},{"theme":"Цена / переплата","rating":1,"sku":"114184950","sku_name":"Отпариватель Jiffy Steamer LM-2301 бежевый","excerpt":"Взял данный товар по хорошим отзывам. В итоге не оправдал ожидания. Очень маленькая и площадь поверхности глажки очень маленькая. Приходится долго из-за этого возиться по одежде и рука быстро устает от этого. Лучше доплатить и купить нормальный отпар..."},{"theme":"Качество сборки","rating":3,"sku":"103587131","sku_name":"Отпариватель Tefal IXEO+ QT1511E0 черный","excerpt":"Качество материалов оставляет желать лучшего, трубки постоянно вылетают из фиксаторов. Недогладилка вся шатается, не понятно как регулируется подача пара. Лучше купить мобильную систему и использовать с нормальной гладилкой. К покупке не рекомендую."},{"theme":"Доставка","rating":3,"sku":"103587131","sku_name":"Отпариватель Tefal IXEO+ QT1511E0 черный","excerpt":"Доставка быстрая, всё в срок."}],"total_reviews_analyzed":75},{"id":"03280","name":"Утюги","l1_name":"Бытовая техника","l2_name":"Малая техника для дома","revenue_apr26":164782578,"yoy_apr":1.0962019365829228,"forecast":822614467.3073679,"season_index":{"1":64,"2":77,"3":78,"4":85,"5":92,"6":119,"7":109,"8":155,"9":139,"10":98,"11":103,"12":80},"summer_autumn_index":134,"brands_apr26":50,"skus_apr26":137,"top_brands":[{"brand":"Tefal","revenue":37915234,"sku_count":36,"avg_rating":4.869444529215495,"orders":1378},{"brand":"Braun","revenue":23919137,"sku_count":23,"avg_rating":4.913043561189071,"orders":595},{"brand":"Vitek","revenue":10356747,"sku_count":8,"avg_rating":4.800000190734863,"orders":1359},{"brand":"Без бренда","revenue":8805565,"sku_count":10,"avg_rating":4.910000038146973,"orders":1838},{"brand":"Polaris","revenue":7584161,"sku_count":11,"avg_rating":4.918181896209717,"orders":267},{"brand":"Philips","revenue":6755418,"sku_count":16,"avg_rating":4.875000089406967,"orders":193},{"brand":"Zalora","revenue":5655774,"sku_count":3,"avg_rating":4.900000095367432,"orders":304},{"brand":"ARG","revenue":5184520,"sku_count":8,"avg_rating":4.850000083446503,"orders":602}],"top_skus":[{"sku":"3800382","sku_name":"Vitek VT-1215 розовый","brand_name":"Vitek","price":6498,"revenue":7453727,"sale_cnt":1081,"review_cnt":1993,"rating":4.800000190734863,"sku_url":"https://kaspi.kz/shop/p/vitek-vt-1215-rozovyi-3800382","segment_name":"Низкий"},{"sku":"3800985","sku_name":"Tefal Virtuo FV1713E0 синий","brand_name":"Tefal","price":17987,"revenue":6769666,"sale_cnt":369,"review_cnt":1351,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/tefal-virtuo-fv1713e0-sinii-3800985","segment_name":"Дорогой"},{"sku":"117464104","sku_name":"Nellsetty KM-02 бежевый","brand_name":"Nellsetty","price":4799,"revenue":4961050,"sale_cnt":970,"review_cnt":1096,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/nellsetty-km-02-bezhevyi-117464104","segment_name":"Низкий"},{"sku":"132100772","sku_name":"Steam iron фиолетовый","brand_name":"Без бренда","price":6165,"revenue":4609309,"sale_cnt":708,"review_cnt":348,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/steam-iron-fioletovyi-132100772","segment_name":"Низкий"},{"sku":"121659037","sku_name":"Tefal Express Steam FV2846E0 черный, красный","brand_name":"Tefal","price":19383,"revenue":4319277,"sale_cnt":210,"review_cnt":826,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/tefal-express-steam-fv2846e0-chernyi-krasnyi-121659037","segment_name":"Дорогой"},{"sku":"3801184","sku_name":"Braun SI3055BK черный","brand_name":"Braun","price":27672,"revenue":3690280,"sale_cnt":128,"review_cnt":809,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/braun-si3055bk-chernyi-3801184","segment_name":"Дорогой"}],"segments":[{"segment":1,"segment_name":"Низкий","median_price":6165,"avg_price":9011,"revenue_share_pct":18.4,"sku_cnt":113},{"segment":2,"segment_name":"Бюджетный","median_price":8990,"avg_price":10010,"revenue_share_pct":7.3,"sku_cnt":118},{"segment":3,"segment_name":"Средний","median_price":13458,"avg_price":15591,"revenue_share_pct":8.6,"sku_cnt":124},{"segment":4,"segment_name":"Дорогой","median_price":21994,"avg_price":25757,"revenue_share_pct":32.6,"sku_cnt":124},{"segment":5,"segment_name":"Премиум","median_price":41995,"avg_price":51003,"revenue_share_pct":33.1,"sku_cnt":128}],"top_complaints":[{"theme":"Не работает / не включается","count":7},{"theme":"Качество сборки","count":5},{"theme":"Размер / форма","count":4},{"theme":"Цена / переплата","count":2},{"theme":"Аксессуары / комплект","count":1}],"top_positives":[{"theme":"Удобство использования","count":9},{"theme":"Мощность хорошая","count":4},{"theme":"За свои деньги","count":2},{"theme":"Хороший дизайн","count":2}],"sample_complaints":[{"theme":"Качество сборки","rating":1,"sku":"3800382","sku_name":"Vitek VT-1215 розовый","excerpt":"Утюг бракованный, вода вытекает."},{"theme":"Размер / форма","rating":1,"sku":"3800985","sku_name":"Tefal Virtuo FV1713E0 синий","excerpt":"Маленький, как игрушечный. Не нравится"},{"theme":"Цена / переплата","rating":1,"sku":"3800985","sku_name":"Tefal Virtuo FV1713E0 синий","excerpt":"Отвратительно невозможно вернуть товар. Маленький утюг, не стоит своих денег. Хиплый, качество как будто вот вот пластик сломается. Хотела вернуть и купить дороже, но Технодом отклонить заявку уже 10 дней. Примите меры. Каспи и Технодом. Мне не нрави..."},{"theme":"Не работает / не включается","rating":1,"sku":"3800985","sku_name":"Tefal Virtuo FV1713E0 синий","excerpt":"Подключили утюг в розетке, не работает. Проверили дома свет и другие розетки. Тоже самое. Утюг вообще не работает. Кнопка включения не загорается и не нагревается ничего."}],"total_reviews_analyzed":75},{"id":"00054","name":"Фитнес-браслеты","l1_name":"Телефоны и гаджеты","l2_name":"Гаджеты","revenue_apr26":126127613,"yoy_apr":2.3230005646178786,"forecast":1093003783.569494,"season_index":{"1":76,"2":87,"3":107,"4":74,"5":49,"6":60,"7":77,"8":140,"9":167,"10":131,"11":93,"12":138},"summer_autumn_index":128,"brands_apr26":10,"skus_apr26":40,"top_brands":[{"brand":"WHOOP","revenue":67368645,"sku_count":14,"avg_rating":4.971428598676409,"orders":371},{"brand":"Xiaomi","revenue":32342717,"sku_count":38,"avg_rating":4.617631623619481,"orders":1443},{"brand":"Huawei","revenue":8103996,"sku_count":16,"avg_rating":4.662500023841858,"orders":506},{"brand":"BYMER","revenue":5654452,"sku_count":7,"avg_rating":4.900000095367432,"orders":209},{"brand":"Qutty Band","revenue":5012046,"sku_count":1,"avg_rating":4.900000095367432,"orders":97},{"brand":"Samsung","revenue":4146878,"sku_count":3,"avg_rating":4.933333396911621,"orders":184},{"brand":"SAUYT","revenue":1450053,"sku_count":1,"avg_rating":5,"orders":24},{"brand":"Без бренда","revenue":680664,"sku_count":17,"avg_rating":3.811764717102051,"orders":211}],"top_skus":[{"sku":"141065130","sku_name":"WHOOP 5.0 PEAK черный + подписка 12 месяцев","brand_name":"WHOOP","price":142000,"revenue":21202057,"sale_cnt":138,"review_cnt":110,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/whoop-5-0-peak-chernyi-podpiska-12-mesjatsev-141065130","segment_name":"Премиум"},{"sku":"139645473","sku_name":"WHOOP LIFE MG черный + подписка 12 месяцев","brand_name":"WHOOP","price":212892,"revenue":17784204,"sale_cnt":78,"review_cnt":69,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/whoop-life-mg-chernyi-podpiska-12-mesjatsev-139645473","segment_name":"Премиум"},{"sku":"151613614","sku_name":"WHOOP LIFE MG 5.0 черный","brand_name":"WHOOP","price":205897,"revenue":13180831,"sale_cnt":57,"review_cnt":23,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/whoop-life-mg-5-0-chernyi-151613614","segment_name":"Премиум"},{"sku":"141530632","sku_name":"Xiaomi Smart Band 10 черный","brand_name":"Xiaomi","price":21593,"revenue":10280586,"sale_cnt":415,"review_cnt":534,"rating":5,"sku_url":"https://kaspi.kz/shop/p/xiaomi-smart-band-10-chernyi-141530632","segment_name":"Дорогой"},{"sku":"153862383","sku_name":"Qutty Band черный","brand_name":"Qutty Band","price":49990,"revenue":5012046,"sale_cnt":97,"review_cnt":215,"rating":4.900000095367432,"sku_url":"https://kaspi.kz/shop/p/qutty-band-chernyi-153862383","segment_name":"Премиум"},{"sku":"150499070","sku_name":"WHOOP 5.0 PEAK + подписка 12 месяцев","brand_name":"WHOOP","price":141000,"revenue":4760881,"sale_cnt":30,"review_cnt":11,"rating":5,"sku_url":"https://kaspi.kz/shop/p/whoop-5-0-peak-podpiska-12-mesjatsev-150499070","segment_name":"Премиум"}],"segments":[{"segment":1,"segment_name":"Низкий","median_price":4316,"avg_price":10649,"revenue_share_pct":0.5,"sku_cnt":22},{"segment":2,"segment_name":"Бюджетный","median_price":14477,"avg_price":14458,"revenue_share_pct":9.3,"sku_cnt":28},{"segment":3,"segment_name":"Средний","median_price":22000,"avg_price":21633,"revenue_share_pct":10.2,"sku_cnt":27},{"segment":4,"segment_name":"Дорогой","median_price":33495,"avg_price":34569,"revenue_share_pct":20.9,"sku_cnt":22},{"segment":5,"segment_name":"Премиум","median_price":139950,"avg_price":124413,"revenue_share_pct":59,"sku_cnt":22}],"top_complaints":[{"theme":"Инструкция / понимание","count":2},{"theme":"Не работает / не включается","count":1},{"theme":"Качество сборки","count":1},{"theme":"Шум","count":1}],"top_positives":[{"theme":"Удобство использования","count":14},{"theme":"Хороший дизайн","count":3},{"theme":"За свои деньги","count":3}],"sample_complaints":[{"theme":"Не работает / не включается","rating":1,"sku":"139645473","sku_name":"WHOOP LIFE MG черный + подписка 12 месяцев","excerpt":"Полностью разочарован. Версия 4. 0 была намного лучше. Заявленный функционал типа ЭКГ еще не работает. Застежка не держится. На второй день уже во сне расстегнулась. Хотя 4. 0 не расстегивалась в принципе. Если также будет расстегиваться, то буду воз..."},{"theme":"Инструкция / понимание","rating":1,"sku":"139645473","sku_name":"WHOOP LIFE MG черный + подписка 12 месяцев","excerpt":"Важно учитывать, что приложение работает только на английском языке."},{"theme":"Качество сборки","rating":1,"sku":"151613614","sku_name":"WHOOP LIFE MG 5.0 черный","excerpt":"Нет инструкции подключения. Уже 5-й день не можем подключить. Звонить, спросить не у кого. Сами не выходят на связь. Может вообще бракованный товар."},{"theme":"Шум","rating":2,"sku":"153862383","sku_name":"Qutty Band черный","excerpt":"Приобрел браслет Q-Band, и впечатления остались смешанные. С одной стороны, устройство работает стабильно, базовые показатели (пульс, кислород в крови, HRV) считывает. Но если вы привыкли к полноценным экосистемам, этот гаджет может разочаровать. Осн..."}],"total_reviews_analyzed":75}],"generated_at":"2026-06-09"};

const MONTHS = ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"];

function fmtM(v: number, d = 0) {
  if (!v) return "—";
  if (v >= 1e9) return (v / 1e6).toFixed(0).replace(/B(?=(d{3})+(?!d))/g, " ") + " млн ₸";
  if (v >= 1e6) return Math.round(v / 1e6) + " млн ₸";
  if (v >= 1e3) return Math.round(v / 1e3) + " тыс ₸";
  return v.toFixed(0);
}
function fmtNum(v: number) {
  if (v == null) return "—";
  return Number(v).toLocaleString("ru-RU");
}

function Section({ id, title, defaultOpen = true, children }: { id: string; title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div id={id} style={sSection}>
      <h2 onClick={() => setOpen(!open)} style={{ ...sH2, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, userSelect: "none" }}>
        <span style={{ fontSize: 14, color: C.dim, transform: open ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", display: "inline-block" }}>&#9654;</span>
        {title}
      </h2>
      {open && children}
    </div>
  );
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div style={{ ...sCard, borderTop: `2px solid ${color}`, textAlign: "center", padding: "28px 20px" }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: C.dim, marginBottom: 10, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color, letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: C.dim, marginTop: 8 }}>{sub}</div>}
    </div>
  );
}

/* Sparkline for monthly history (microграфика) */
function Sparkline({ values, color = C.accent, peakMonth }: { values: number[]; color?: string; peakMonth?: number }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 28, width: 96 }}>
      {values.map((v, i) => {
        const h = ((v - min) / range) * 100;
        const isPeak = peakMonth != null && i === peakMonth - 1;
        return (
          <div key={i} style={{
            width: 6, height: `${Math.max(h, 6)}%`,
            background: isPeak ? C.amber : color,
            opacity: isPeak ? 1 : 0.6,
            borderRadius: 1,
          }} />
        );
      })}
    </div>
  );
}

/* Heatmap cell for month seasonal index */
function HeatCell({ value }: { value: number }) {
  let bg = "transparent", fg = C.text;
  if (value >= 150) { bg = `${C.green}50`; fg = C.green; }
  else if (value >= 120) { bg = `${C.green}30`; fg = C.green; }
  else if (value >= 110) { bg = `${C.green}18`; fg = C.text; }
  else if (value <= 70) { bg = `${C.red}40`; fg = C.red; }
  else if (value <= 85) { bg = `${C.red}18`; fg = C.red; }
  return (
    <td style={{
      padding: "5px 6px", textAlign: "center",
      borderBottom: `1px solid ${C.border}20`,
      background: bg, color: fg,
      fontSize: 10.5, fontWeight: value >= 120 || value <= 80 ? 700 : 400,
      fontVariantNumeric: "tabular-nums",
    }}>{value}</td>
  );
}

/* Sparkbar for revenue percentage */
function Bar({ pct, color = C.accent }: { pct: number; color?: string }) {
  return (
    <div style={{ height: 3, width: "100%", background: `${color}15`, borderRadius: 2, overflow: "hidden", marginTop: 4 }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", background: color }} />
    </div>
  );
}

export default function TechReport() {
  // Top-10 most actionable mid-size niches (not mega like Смартфоны)
  const ACTIONABLE_IDS = ["00103","00035","00025","00026","03512","00047","00044","00103","02930","03282","03280","00050","00054","00038"];

  // Find max forecast for normalization
  const maxForecast = Math.max(...DATA.top30.map((n: any) => n.forecast));

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; akasymzhanov.com</Link>
        </div>

        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, background: `${C.cyan}18`, color: C.cyan, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", marginBottom: 16, textTransform: "uppercase" }}>
            Enterprise · Электроника · Лето-Осень 2026
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Электроника, бытовая и кухонная техника на Kaspi
          </h1>
          <p style={{ color: "#ccc", fontSize: 15, margin: "12px 0 0" }}>
            Что запускать в июле-сентябре 2026: сезонный анализ, прогноз, разбор отзывов, рекомендации по 7 приоритетным нишам.
          </p>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong>
          </p>
          <p style={{ color: C.dim, fontSize: 13, margin: "4px 0 0" }}>
            Источник: <strong style={{ color: C.cyan }}>RedStat</strong> · агрегированная аналитика Kaspi.kz
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim, flexWrap: "wrap" }}>
            <span>Версия: <strong style={{ color: C.text }}>v1.0</strong></span>
            <span>Дата: <strong style={{ color: C.text }}>9 июня 2026</strong></span>
            <span>Период данных: <strong style={{ color: C.text }}>Ноябрь 2024 — Апрель 2026 (18 месяцев)</strong></span>
            <span>Статус: <strong style={{ color: C.green }}>Конфиденциально</strong></span>
          </div>
        </div>

        {/* TOC */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["sec-1", "1. Краткий обзор и главные находки"],
            ["sec-2", "2. Где мы сейчас (9 июня 2026)"],
            ["sec-3", "3. Сезонный паттерн рынка техники"],
            ["sec-4", "4. Прогноз: июль-сентябрь 2026"],
            ["sec-5", "5. Топ-30 ниш по потенциалу"],
            ["sec-6", "6. Разбор 7 приоритетных ниш + отзывы"],
            ["sec-7", "7. Рекомендации по запускам"],
            ["sec-8", "8. Методология"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", fontSize: 13, color: C.accent, textDecoration: "none", padding: "4px 0" }}>{label}</a>
          ))}
        </div>

        {/* 1. Executive Summary */}
        <Section id="sec-1" title="1. Краткий обзор и главные находки">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <MetricCard label="Прогноз июль-сентябрь 2026" value="~205 млрд ₸" sub="4 категории L1" color={C.accent} />
            <MetricCard label="Лучший месяц для большинства ниш" value="Август-Сентябрь" sub="индекс 115-228" color={C.green} />
            <MetricCard label="Ниш проанализировано" value="266" sub="13 L1/L2 категорий" color={C.cyan} />
            <MetricCard label="Отзывов разобрано" value="500+" sub="35 топ-SKU в 7 нишах" color={C.amber} />
          </div>

          <div style={{ ...sCard, borderColor: C.green, borderWidth: 2 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green, fontSize: 18 }}>5 главных находок</h3>
            <ul style={{ ...sP, paddingLeft: 20 }}>
              <li><strong style={{ color: C.text }}>Сейчас сезонное дно — но это нормально.</strong> Большинство ниш техники (12 из 16 проанализированных) показывают индекс 88-100 в апреле-июне, и пикуют в августе-октябре. Запускать SKU нужно <strong style={{ color: C.amber }}>именно сейчас (июнь-июль)</strong>, чтобы успеть набрать отзывы до пика продаж.</li>
              <li><strong style={{ color: C.text }}>Топ-3 ниши по абсолютному потенциалу июль-сентябрь:</strong> Смартфоны (~92 млрд), Ноутбуки (~11 млрд), Стиральные машины (~10 млрд). Но это «военные зоны» — для входа лучше выбирать средние ниши.</li>
              <li><strong style={{ color: C.text }}>Топ-5 ниш по сезонному всплеску август-сентябрь:</strong> Отопительные котлы (индекс 154, пик сентябрь 228), Отпариватели (138), Утюги (134), Принтеры и МФУ (130), Парогенераторы (129). Это «back-to-school» + «готовимся к зиме».</li>
              <li><strong style={{ color: C.text }}>Лучший рост год к году:</strong> Очистители и увлажнители воздуха (+167%), Фитнес-браслеты (+232%), Смарт-очки (+662% от низкой базы), Печи и грили (+129%). Категории растут быстрее рынка в 2-3 раза.</li>
              <li><strong style={{ color: C.text }}>Главные жалобы в отзывах (по нашему разбору 500+ отзывов):</strong> «не работает / сломался при первом включении» (утюги, чайники), «шум» (чайники, отпариватели, очистители), «запах пластика» (электрочайники), «инструкция плохая» (фитнес-браслеты). Это <strong style={{ color: C.cyan }}>конкретные пункты УТП для нового бренда</strong>.</li>
            </ul>
          </div>
        </Section>

        {/* 2. Текущая ситуация */}
        <Section id="sec-2" title="2. Где мы сейчас (9 июня 2026)">
          <p style={sP}>
            На сегодняшнюю дату в Redstat доступны данные по апрель 2026 включительно (18 месяцев истории). Май и июнь 2026 — в процессе обработки.
          </p>

          <h3 style={sH3}>Размер рынка техники L1 (последние данные, апрель 2026)</h3>
          <div style={{ overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr><th style={{ padding: "10px 12px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>Категория L1</th>
                  <th style={{ padding: "10px 12px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>Апрель 2026</th>
                  <th style={{ padding: "10px 12px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>Прогноз Июл-Сен 2026</th>
                  <th style={{ padding: "10px 12px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>Год к году (апрель)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: "10px 12px", color: C.text, borderBottom: `1px solid ${C.border}20` }}>📱 Телефоны и гаджеты</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>30 200 млн ₸</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>~102 000 млн ₸</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: C.green, borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>+90%</td></tr>
                <tr><td style={{ padding: "10px 12px", color: C.text, borderBottom: `1px solid ${C.border}20` }}>🏠 Бытовая техника</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>19 921 млн ₸</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>~62 000 млн ₸</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: C.green, borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>+100%</td></tr>
                <tr><td style={{ padding: "10px 12px", color: C.text, borderBottom: `1px solid ${C.border}20` }}>💻 Компьютеры</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>8 656 млн ₸</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>~28 000 млн ₸</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: C.green, borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>+75%</td></tr>
                <tr><td style={{ padding: "10px 12px", color: C.text, borderBottom: `1px solid ${C.border}20` }}>📺 ТВ, Аудио, Видео</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>7 397 млн ₸</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>~22 000 млн ₸</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: C.green, borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>+90%</td></tr>
                <tr style={{ background: `${C.accent}10` }}><td style={{ padding: "10px 12px", color: C.text, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>ИТОГО (4 L1)</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: C.text, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontVariantNumeric: "tabular-nums" }}>~66 174 млн ₸</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: C.amber, fontWeight: 700, borderBottom: `1px solid ${C.border}`, fontVariantNumeric: "tabular-nums" }}>~205 000 млн ₸</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: C.green, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontVariantNumeric: "tabular-nums" }}>+90%</td></tr>
              </tbody>
            </table>
          </div>

          <div style={{ ...sCard, background: `${C.amber}08`, borderColor: C.amber, borderWidth: 2 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.amber, fontSize: 16 }}>Ключевой контекст для решения</h3>
            <p style={sP}>
              Глядя только на апрель 2026 (66 млрд ₸), можно подумать, что рынок не очень большой. На самом деле <strong style={{ color: C.text }}>апрель — сезонное дно</strong> по большинству ниш техники. Реальный пик придётся на <strong style={{ color: C.text }}>август-октябрь 2026</strong>, когда рынок утроится до ~205 млрд ₸ за квартал (по нашему прогнозу с учётом сезонности и темпа роста).
            </p>
            <p style={sP}>
              Запуск нового SKU занимает 60-90 дней до выхода в топ выдачи Kaspi (нужно набрать первые 30-50 отзывов). Сегодня <strong style={{ color: C.text }}>9 июня 2026</strong>. Если хотите быть в топе к августовско-сентябрьскому пику, <strong style={{ color: C.amber }}>SKU нужно регистрировать сейчас, в июне-июле</strong>.
            </p>
          </div>
        </Section>

        {/* 3. Сезонный паттерн */}
        <Section id="sec-3" title="3. Сезонный паттерн рынка техники">
          <p style={sP}>
            Сезонный индекс = средняя выручка месяца / годовая средняя × 100. Значение 100 = типичный месяц. <strong style={{ color: C.green }}>≥120 = пик</strong> (зелёный), <strong style={{ color: C.red }}>≤80 = дно</strong> (красный).
          </p>

          <h3 style={sH3}>Тепловая карта сезонности по ключевым нишам</h3>
          <div style={{ overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr style={{ background: C.surface }}>
                  <th style={{ padding: "8px 10px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Ниша</th>
                  {MONTHS.map(m => (
                    <th key={m} style={{ padding: "8px 6px", textAlign: "center", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10, minWidth: 38 }}>{m}</th>
                  ))}
                  <th style={{ padding: "8px 10px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Пик</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ...DATA.top30.slice(0, 30),
                  ...DATA.extras,
                ].sort((a, b) => b.summer_autumn_index - a.summer_autumn_index).slice(0, 25).map((n: any) => {
                  const peakM = Object.entries(n.season_index).sort((a, b) => Number(b[1]) - Number(a[1]))[0];
                  return (
                    <tr key={n.id}>
                      <td style={{ padding: "8px 10px", textAlign: "left", color: C.text, borderBottom: `1px solid ${C.border}20`, fontSize: 11, fontWeight: 500 }}>
                        {n.name}
                      </td>
                      {MONTHS.map((m, mi) => {
                        const idx = n.season_index[String(mi + 1)] ?? 0;
                        return <HeatCell key={mi} value={Number(idx)} />;
                      })}
                      <td style={{ padding: "8px 10px", color: C.amber, borderBottom: `1px solid ${C.border}20`, fontSize: 11, fontWeight: 600 }}>{MONTHS[Number(peakM[0]) - 1]} ({String(peakM[1])})</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h3 style={sH3}>Универсальные паттерны</h3>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.green}`, marginBottom: 12 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.green, margin: "0 0 8px" }}>🟢 Главное окно: август-октябрь (Kaspi Жума + back-to-school)</h4>
            <p style={{ ...sP, margin: 0, fontSize: 13 }}>
              23 из 30 топ-ниш техники пикуют в августе-октябре. Драйверы: <strong style={{ color: C.text }}>Kaspi Жума</strong> (распродажа в конце августа — начале сентября), <strong style={{ color: C.text }}>back-to-school</strong> (ноутбуки, планшеты, принтеры, флешки, фитнес-браслеты), <strong style={{ color: C.text }}>подготовка к зиме</strong> (отопительные котлы, морозильники для заготовок).
            </p>
          </div>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.amber}`, marginBottom: 12 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.amber, margin: "0 0 8px" }}>⚡ Самая сильная сезонность: отопительные котлы</h4>
            <p style={{ ...sP, margin: 0, fontSize: 13 }}>
              Сентябрьский индекс <strong style={{ color: C.text }}>228</strong> (то есть в сентябре продаётся в 2.3 раза больше среднего). Драйвер — подготовка к отопительному сезону. Сюда же: электрические обогреватели (сентябрь 276), водонагреватели.
            </p>
          </div>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.cyan}`, marginBottom: 12 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.cyan, margin: "0 0 8px" }}>☀️ Чистый летний пик: кондиционеры, вентиляторы</h4>
            <p style={{ ...sP, margin: 0, fontSize: 13 }}>
              Кондиционеры — июльский индекс <strong style={{ color: C.text }}>251</strong>, потом резкий обвал до 49 в августе. Вентиляторы — июль <strong style={{ color: C.text }}>337</strong> (рекорд!), к сентябрю падает до 8. Эти ниши работают только в первой половине лета — запускать к маю.
            </p>
          </div>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.pink}`, marginBottom: 12 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.pink, margin: "0 0 8px" }}>📚 Back-to-school (август-сентябрь)</h4>
            <p style={{ ...sP, margin: 0, fontSize: 13 }}>
              Принтеры и МФУ (сентябрь 182), USB-флешки (108-122), аксессуары для ноутбуков, фитнес-браслеты (сентябрь 167 — возврат к режиму после лета). Запускать к концу июля.
            </p>
          </div>
        </Section>

        {/* 4. Прогноз */}
        <Section id="sec-4" title="4. Прогноз: июль-сентябрь 2026">
          <p style={sP}>
            Прогноз = (выручка июль-сентябрь 2025) × (год к году по апрелю). Это даёт реальную оценку Jul-Sep 2026 с учётом и сезонности, и темпа роста рынка.
          </p>
          <p style={{ ...sP, fontSize: 13, color: C.dim }}>
            Используем YoY по апрелю (а не по февралю), потому что апрель 2026 — самый свежий точный год к году срез: апрель 2025 и апрель 2026 оба известны.
          </p>

          <h3 style={sH3}>Топ-15 ниш по прогнозируемой выручке июль-сентябрь 2026</h3>
          <div style={{ overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  <th style={{ padding: "10px 8px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>#</th>
                  <th style={{ padding: "10px 8px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>Ниша</th>
                  <th style={{ padding: "10px 8px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>Апрель 26</th>
                  <th style={{ padding: "10px 8px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>Прогноз Jul-Sep</th>
                  <th style={{ padding: "10px 8px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>Год к году</th>
                  <th style={{ padding: "10px 8px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>Помесячно (18 мес)</th>
                </tr>
              </thead>
              <tbody>
                {DATA.top30.slice(0, 15).map((n: any, i: number) => {
                  const peakMonth = Number(Object.entries(n.season_index).sort((a, b) => Number(b[1]) - Number(a[1]))[0][0]);
                  const sparkVals = Array.from({ length: 12 }, (_, m) => Number(n.season_index[String(m+1)] || 0));
                  return (
                    <tr key={n.id}>
                      <td style={{ padding: "10px 8px", textAlign: "left", color: C.text, borderBottom: `1px solid ${C.border}20` }}>{i+1}</td>
                      <td style={{ padding: "10px 8px", textAlign: "left", color: C.text, borderBottom: `1px solid ${C.border}20`, fontSize: 12, fontWeight: 500 }}>
                        {n.name}
                        <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{n.l1_name} → {n.l2_name}</div>
                      </td>
                      <td style={{ padding: "10px 8px", textAlign: "right", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>{fmtM(n.revenue_apr26)}</td>
                      <td style={{ padding: "10px 8px", textAlign: "right", color: C.amber, fontWeight: 600, borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>{fmtM(n.forecast)}</td>
                      <td style={{ padding: "10px 8px", textAlign: "right", color: n.yoy_apr > 1.5 ? C.green : "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>{(n.yoy_apr * 100).toFixed(0)}%</td>
                      <td style={{ padding: "10px 8px", textAlign: "left", borderBottom: `1px solid ${C.border}20` }}><Sparkline values={sparkVals} peakMonth={peakMonth} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p style={{ ...sP, fontSize: 12, color: C.dim, fontStyle: "italic" }}>
            🟧 на спарклайне — пиковый месяц года. Полная таблица топ-30 — в разделе 5.
          </p>

          <div style={{ ...sCard, background: `${C.green}08`, borderColor: C.green, marginTop: 24 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Самые быстрорастущие ниши (год к году по апрелю)</h3>
            <ul style={{ ...sP, paddingLeft: 20 }}>
              <li><strong style={{ color: C.text }}>Фитнес-браслеты: +232%</strong> (с 54 до 126 млн ₸/мес). На сентябрь индекс 167 — back-to-routine. Прогноз июль-сентябрь: ~1 млрд ₸.</li>
              <li><strong style={{ color: C.text }}>Очистители и увлажнители воздуха: +167%</strong> (с 130 до 343 млн). Тренд осенних аллергий + смог в Алматы.</li>
              <li><strong style={{ color: C.text }}>Печи и грили: +129%</strong> (с 515 до 1 179 млн). Тренд готовки дома.</li>
              <li><strong style={{ color: C.text }}>Фотокамеры: +126%</strong> — возврат интереса к настоящим камерам после смартфонной эры.</li>
              <li><strong style={{ color: C.text }}>Чехлы для смартфонов: +142%</strong>, <strong style={{ color: C.text }}>Дроны: +139%</strong>, <strong style={{ color: C.text }}>Отопительные котлы: +112%</strong>.</li>
            </ul>
          </div>
        </Section>

        {/* 5. Топ-30 ниш */}
        <Section id="sec-5" title="5. Топ-30 ниш по прогнозу июль-сентябрь 2026" defaultOpen={false}>
          <p style={sP}>Полный рейтинг 30 ниш техники. Цвета YoY: 🟢 &gt;+150% · 🔵 +100-150% · ⚪ &lt;+100%. Цвета индекса лета-осени: 🟢 ≥120 (сильная сезонность) · ⚪ 80-119 · 🔴 ≤79 (слабая).</p>
          <div style={{ overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
              <thead>
                <tr><th style={{ padding: "8px 6px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>#</th>
                  <th style={{ padding: "8px 6px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Ниша</th>
                  <th style={{ padding: "8px 6px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Прогноз</th>
                  <th style={{ padding: "8px 6px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>YoY</th>
                  <th style={{ padding: "8px 6px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Сезон</th>
                  <th style={{ padding: "8px 6px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Брендов</th>
                  <th style={{ padding: "8px 6px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>SKU</th>
                </tr>
              </thead>
              <tbody>
                {DATA.top30.map((n: any, i: number) => (
                  <tr key={n.id}>
                    <td style={{ padding: "7px 6px", color: C.dim, borderBottom: `1px solid ${C.border}20` }}>{i+1}</td>
                    <td style={{ padding: "7px 6px", color: C.text, borderBottom: `1px solid ${C.border}20` }}>
                      {n.name}
                      <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{n.l1_name}</div>
                    </td>
                    <td style={{ padding: "7px 6px", textAlign: "right", color: C.amber, fontWeight: 600, borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>{fmtM(n.forecast)}</td>
                    <td style={{ padding: "7px 6px", textAlign: "right", color: n.yoy_apr > 2.5 ? C.green : n.yoy_apr > 2 ? C.cyan : "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>{(n.yoy_apr * 100).toFixed(0)}%</td>
                    <td style={{ padding: "7px 6px", textAlign: "right", color: n.summer_autumn_index >= 120 ? C.green : n.summer_autumn_index <= 80 ? C.red : "#ccc", fontWeight: n.summer_autumn_index >= 120 ? 700 : 400, borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>{n.summer_autumn_index}</td>
                    <td style={{ padding: "7px 6px", textAlign: "right", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>{n.brands_apr26}</td>
                    <td style={{ padding: "7px 6px", textAlign: "right", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>{fmtNum(n.skus_apr26)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={sH3}>Дополнительно: ниши с сильной сезонностью вне топ-30 по объёму</h3>
          <p style={{ ...sP, fontSize: 13 }}>Эти ниши меньше по абсолютному объёму, но летом-осенью растут сильнее обычного.</p>
          <div style={{ overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
              <thead>
                <tr><th style={{ padding: "8px 6px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Ниша</th>
                  <th style={{ padding: "8px 6px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Апрель</th>
                  <th style={{ padding: "8px 6px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Прогноз</th>
                  <th style={{ padding: "8px 6px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Лет-осень</th>
                  <th style={{ padding: "8px 6px", textAlign: "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Брендов</th>
                  <th style={{ padding: "8px 6px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Логика</th>
                </tr>
              </thead>
              <tbody>
                {DATA.extras.map((n: any) => (
                  <tr key={n.id}>
                    <td style={{ padding: "7px 6px", color: C.text, borderBottom: `1px solid ${C.border}20` }}>{n.name}</td>
                    <td style={{ padding: "7px 6px", textAlign: "right", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>{fmtM(n.revenue_apr26)}</td>
                    <td style={{ padding: "7px 6px", textAlign: "right", color: C.amber, fontWeight: 600, borderBottom: `1px solid ${C.border}20`, fontVariantNumeric: "tabular-nums" }}>{fmtM(n.forecast)}</td>
                    <td style={{ padding: "7px 6px", textAlign: "right", color: C.green, fontWeight: 700, borderBottom: `1px solid ${C.border}20` }}>{n.summer_autumn_index}</td>
                    <td style={{ padding: "7px 6px", textAlign: "right", color: "#ccc", borderBottom: `1px solid ${C.border}20` }}>{n.brands_apr26}</td>
                    <td style={{ padding: "7px 6px", color: C.dim, borderBottom: `1px solid ${C.border}20`, fontSize: 11 }}>
                      {n.id === "03282" && "Сезон отпариваний после лета"}
                      {n.id === "03280" && "Back-to-school гладильные комплекты"}
                      {n.id === "00038" && "Парогенераторы — продвинутая глажка"}
                      {n.id === "00104" && "Лет, июльский пик 337!"}
                      {n.id === "05305" && "Грозовой сезон — защита техники"}
                      {n.id === "00054" && "Возврат к режиму после отпуска"}
                      {n.id === "03487" && "Расходники, фильтры, насадки"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 6. Разбор 7 приоритетных ниш */}
        <Section id="sec-6" title="6. Разбор 7 приоритетных ниш + отзывы покупателей">
          <p style={sP}>
            Для глубокого разбора выбраны ниши с <strong style={{ color: C.text }}>сильной сезонностью на лето-осень</strong>, <strong style={{ color: C.text }}>высоким темпом роста</strong> и <strong style={{ color: C.text }}>средним объёмом</strong> (открыты для входа новых брендов).
          </p>
          <p style={{ ...sP, fontSize: 13, color: C.dim }}>
            По каждой нише разобрали по 5 топ-SKU × 10-15 отзывов = ~75 отзывов на нишу, итого ~500+ отзывов. Цель — найти конкретные недостатки текущих лидеров, которые можно исправить в новом SKU.
          </p>

          {DATA.priority.map((n: any, ni: number) => {
            const peakM = Number(Object.entries(n.season_index).sort((a, b) => Number(b[1]) - Number(a[1]))[0][0]);
            const peakIdx = n.season_index[String(peakM)];
            const accentColors = [C.green, C.cyan, C.pink, C.amber, C.accent, C.blue, C.red];
            const color = accentColors[ni % accentColors.length];
            return (
              <div key={n.id} style={{ marginTop: 36, paddingTop: 24, borderTop: ni === 0 ? "none" : `1px solid ${C.border}` }}>
                <h3 style={{ ...sH3, fontSize: 20, color, marginTop: 0 }}>
                  {ni + 1}. {n.name}
                </h3>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16, fontSize: 12, color: C.dim }}>
                  <div><strong style={{ color: C.text }}>{fmtM(n.revenue_apr26)}/мес</strong> (апрель)</div>
                  <div>Прогноз Jul-Sep: <strong style={{ color: C.amber }}>{fmtM(n.forecast)}</strong></div>
                  <div>Год к году: <strong style={{ color: n.yoy_apr > 1.5 ? C.green : C.text }}>{(n.yoy_apr * 100).toFixed(0)}%</strong></div>
                  <div>Пик: <strong style={{ color: C.amber }}>{MONTHS[peakM - 1]} ({peakIdx})</strong></div>
                  <div>Брендов: <strong style={{ color: C.text }}>{n.brands_apr26}</strong></div>
                  <div>SKU: <strong style={{ color: C.text }}>{fmtNum(n.skus_apr26)}</strong></div>
                </div>

                {/* Top brands */}
                <h4 style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: "16px 0 8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Топ-6 брендов</h4>
                <div style={{ overflowX: "auto", marginBottom: 12 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
                    <tbody>
                      {n.top_brands.slice(0, 6).map((b, bi) => {
                        const totalRev = n.top_brands.slice(0, 6).reduce((s, x) => s + x.revenue, 0);
                        const pct = totalRev > 0 ? (b.revenue / totalRev) * 100 : 0;
                        return (
                          <tr key={b.brand}>
                            <td style={{ padding: "6px 8px", color: C.dim, fontSize: 10, width: 24 }}>{bi+1}</td>
                            <td style={{ padding: "6px 8px", color: C.text, fontWeight: 500, minWidth: 140 }}>
                              {b.brand}
                              <Bar pct={pct} color={color} />
                            </td>
                            <td style={{ padding: "6px 8px", textAlign: "right", color: "#ccc", fontVariantNumeric: "tabular-nums" }}>{fmtM(b.revenue)}</td>
                            <td style={{ padding: "6px 8px", textAlign: "right", color: C.dim, fontVariantNumeric: "tabular-nums", fontSize: 11 }}>{b.sku_count} SKU</td>
                            <td style={{ padding: "6px 8px", textAlign: "right", color: b.avg_rating < 4 ? C.red : "#ccc", fontVariantNumeric: "tabular-nums" }}>★ {b.avg_rating.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Top SKUs */}
                <h4 style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: "16px 0 8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Топ-5 SKU</h4>
                <div style={{ overflowX: "auto", marginBottom: 12 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
                    <tbody>
                      {n.top_skus.slice(0, 5).map((s, si) => (
                        <tr key={s.sku}>
                          <td style={{ padding: "6px 8px", color: C.dim, fontSize: 10, width: 24 }}>{si+1}</td>
                          <td style={{ padding: "6px 8px", color: C.text, fontSize: 11 }}>
                            <a href={s.sku_url} target="_blank" rel="noopener" style={{ color: C.text, textDecoration: "none", borderBottom: `1px dashed ${C.border}` }}>
                              {(s.sku_name || "").slice(0, 60)}
                            </a>
                            <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>
                              {s.brand_name} · {s.segment_name} · отзывов: {fmtNum(s.review_cnt || 0)}
                            </div>
                          </td>
                          <td style={{ padding: "6px 8px", textAlign: "right", color: "#ccc", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{fmtNum(s.price)} ₸</td>
                          <td style={{ padding: "6px 8px", textAlign: "right", color: C.amber, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{fmtM(s.revenue)}</td>
                          <td style={{ padding: "6px 8px", textAlign: "right", color: (s.rating || 0) < 4 ? C.red : "#ccc", fontVariantNumeric: "tabular-nums" }}>★ {(s.rating || 0).toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Price segments */}
                {n.segments.length > 0 && (
                  <>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: "16px 0 8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Ценовые сегменты</h4>
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                      {n.segments.map(s => (
                        <div key={s.segment} style={{ flex: 1, padding: 12, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, borderTop: s.revenue_share_pct > 30 ? `2px solid ${color}` : `1px solid ${C.border}` }}>
                          <div style={{ fontSize: 10, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.segment_name}</div>
                          <div style={{ fontSize: 13, color: C.text, fontWeight: 600, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{fmtNum(Math.round(s.median_price))} ₸</div>
                          <div style={{ fontSize: 11, color: s.revenue_share_pct > 30 ? color : C.dim, marginTop: 2, fontWeight: 600 }}>{s.revenue_share_pct.toFixed(0)}% выручки</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Reviews */}
                {(n.top_complaints.length > 0 || n.sample_complaints.length > 0) && (
                  <>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: "16px 0 8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      Что улучшать (по разбору {n.total_reviews_analyzed} отзывов)
                    </h4>
                    {n.top_complaints.length > 0 && (
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                        {n.top_complaints.map(c => (
                          <div key={c.theme} style={{ padding: "6px 10px", background: `${C.red}12`, border: `1px solid ${C.red}30`, borderRadius: 6, fontSize: 12, color: C.text }}>
                            <span style={{ color: C.red, fontWeight: 700, marginRight: 4 }}>{c.count}×</span>{c.theme}
                          </div>
                        ))}
                      </div>
                    )}
                    {n.sample_complaints.slice(0, 3).map((s, si) => (
                      <div key={si} style={{ padding: "10px 14px", background: C.surface, borderLeft: `3px solid ${C.red}`, borderRadius: 6, marginBottom: 8, fontSize: 12 }}>
                        <div style={{ color: C.dim, fontSize: 10, marginBottom: 4 }}>
                          <strong style={{ color: C.red }}>★ {s.rating}</strong> · {s.theme} · {(s.sku_name || "").slice(0, 60)}
                        </div>
                        <div style={{ color: "#ccc", fontStyle: "italic", lineHeight: 1.6 }}>«{s.excerpt}»</div>
                      </div>
                    ))}
                  </>
                )}

                {n.top_positives.length > 0 && (
                  <>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: "16px 0 8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Что нравится в лидерах</h4>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                      {n.top_positives.map(p => (
                        <div key={p.theme} style={{ padding: "6px 10px", background: `${C.green}12`, border: `1px solid ${C.green}30`, borderRadius: 6, fontSize: 12, color: C.text }}>
                          <span style={{ color: C.green, fontWeight: 700, marginRight: 4 }}>{p.count}×</span>{p.theme}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </Section>

        {/* 7. Рекомендации */}
        <Section id="sec-7" title="7. Рекомендации по запускам">
          <h3 style={sH3}>Сводный план: что запускать в июне-июле под пик август-сентябрь</h3>
          <div style={{ overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
              <thead>
                <tr><th style={{ padding: "8px 8px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Приоритет</th>
                  <th style={{ padding: "8px 8px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Ниша</th>
                  <th style={{ padding: "8px 8px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>УТП на основе разбора отзывов</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: "10px 8px", color: C.green, fontWeight: 700, borderBottom: `1px solid ${C.border}20` }}>🟢 №1</td>
                  <td style={{ padding: "10px 8px", color: C.text, fontWeight: 600, borderBottom: `1px solid ${C.border}20` }}>Отопительные котлы<div style={{ fontSize: 10, color: C.dim }}>Прогноз ~3.5 млрд за квартал</div></td>
                  <td style={{ padding: "10px 8px", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontSize: 12 }}>Сильнейшая сезонность (индекс сентября 228). Из отзывов: <strong style={{ color: C.text }}>проблем у топ-SKU нет</strong> (Navien держит ★4.96). Это «защищённая» категория — конкурировать нужно сервисом и установкой, а не продуктом. Партнёрство с монтажниками в Алматы/Астане.</td></tr>
                <tr><td style={{ padding: "10px 8px", color: C.green, fontWeight: 700, borderBottom: `1px solid ${C.border}20` }}>🟢 №2</td>
                  <td style={{ padding: "10px 8px", color: C.text, fontWeight: 600, borderBottom: `1px solid ${C.border}20` }}>Очистители и увлажнители<div style={{ fontSize: 10, color: C.dim }}>+167% год к году, 1.4 млрд прогноз</div></td>
                  <td style={{ padding: "10px 8px", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontSize: 12 }}>Жалобы: <strong style={{ color: C.text }}>«не оправдал ожиданий», «непонятно как очищает», «шумит ночью»</strong>. УТП — <strong style={{ color: C.green }}>прозрачный индикатор PM2.5 + ночной режим &lt;30 дБ + понятный гайд</strong>. Целевой сегмент — Средний (P3, 15-25 тыс ₸). Конкурент Xiaomi доминирует функциями, но не объясняет ценность.</td></tr>
                <tr><td style={{ padding: "10px 8px", color: C.cyan, fontWeight: 700, borderBottom: `1px solid ${C.border}20` }}>🔵 №3</td>
                  <td style={{ padding: "10px 8px", color: C.text, fontWeight: 600, borderBottom: `1px solid ${C.border}20` }}>Морозильники<div style={{ fontSize: 10, color: C.dim }}>5.2 млрд прогноз, заготовки</div></td>
                  <td style={{ padding: "10px 8px", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontSize: 12 }}>Жалобы на Бирюсу (★4.37): <strong style={{ color: C.text }}>«шумит», «бракованный», «доставка повредила»</strong>. УТП — <strong style={{ color: C.green }}>усиленная упаковка для доставки + бесплатная замена при повреждении + работа &lt;42 дБ</strong>. Объём 100-200 л для квартир, цена P3 (60-90 тыс ₸).</td></tr>
                <tr><td style={{ padding: "10px 8px", color: C.cyan, fontWeight: 700, borderBottom: `1px solid ${C.border}20` }}>🔵 №4</td>
                  <td style={{ padding: "10px 8px", color: C.text, fontWeight: 600, borderBottom: `1px solid ${C.border}20` }}>Электрочайники и термопоты<div style={{ fontSize: 10, color: C.dim }}>0.9 млрд прогноз</div></td>
                  <td style={{ padding: "10px 8px", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontSize: 12 }}>Жалобы: <strong style={{ color: C.text }}>«запах пластика» (4×), «шум» (4×), «сломался через 2 месяца»</strong>. УТП — <strong style={{ color: C.green }}>стекло + сталь без пластика внутри + двойные стенки (тихий + не обжигает) + 2 года гарантии</strong>. Конкурент Tefal недорогой, но «пластиковый запах». Smeg премиум — но шумный. Окно — стекло-сталь в среднем сегменте (12-18 тыс ₸).</td></tr>
                <tr><td style={{ padding: "10px 8px", color: C.cyan, fontWeight: 700, borderBottom: `1px solid ${C.border}20` }}>🔵 №5</td>
                  <td style={{ padding: "10px 8px", color: C.text, fontWeight: 600, borderBottom: `1px solid ${C.border}20` }}>Отпариватели<div style={{ fontSize: 10, color: C.dim }}>1.1 млрд прогноз, индекс 138</div></td>
                  <td style={{ padding: "10px 8px", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontSize: 12 }}>Жалобы на Tefal IXEO+: <strong style={{ color: C.text }}>«трубки вылетают», «недогладилка шатается», «шумит сильно»</strong>. На Jiffy Steamer: «маленькая площадь поверхности». УТП — <strong style={{ color: C.green }}>широкая подошва 12 см + усиленные крепления трубок + тихий клапан</strong>. P3-P4 сегмент (18-35 тыс ₸).</td></tr>
                <tr><td style={{ padding: "10px 8px", color: C.cyan, fontWeight: 700, borderBottom: `1px solid ${C.border}20` }}>🔵 №6</td>
                  <td style={{ padding: "10px 8px", color: C.text, fontWeight: 600, borderBottom: `1px solid ${C.border}20` }}>Утюги<div style={{ fontSize: 10, color: C.dim }}>0.8 млрд прогноз, back-to-school</div></td>
                  <td style={{ padding: "10px 8px", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontSize: 12 }}>Главная жалоба: <strong style={{ color: C.red }}>«не работает с первого включения» (7×)</strong>. На Vitek: «вода течёт». На Tefal Virtuo: «маленький, как игрушечный». УТП — <strong style={{ color: C.green }}>заводская проверка каждого утюга + bigger подошва 12-14 см + анти-капля система с гарантией возврата</strong>. P2-P3 сегмент (8-15 тыс ₸).</td></tr>
                <tr><td style={{ padding: "10px 8px", color: C.amber, fontWeight: 700, borderBottom: `1px solid ${C.border}20` }}>🟡 №7</td>
                  <td style={{ padding: "10px 8px", color: C.text, fontWeight: 600, borderBottom: `1px solid ${C.border}20` }}>Фитнес-браслеты<div style={{ fontSize: 10, color: C.dim }}>+232% год к году, 1.1 млрд</div></td>
                  <td style={{ padding: "10px 8px", color: "#ccc", borderBottom: `1px solid ${C.border}20`, fontSize: 12 }}>Жалобы на WHOOP: <strong style={{ color: C.text }}>«приложение только на английском», «нет инструкции», «застёжка не держится»</strong>. УТП — <strong style={{ color: C.green }}>приложение на русском + казахском + видео-инструкция + усиленный замок</strong>. Сегмент P3 (20-35 тыс ₸), позиция «WHOOP на русском».</td></tr>
              </tbody>
            </table>
          </div>

          <div style={{ ...sCard, background: `${C.amber}08`, borderColor: C.amber, marginTop: 24 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.amber }}>Тайминг и календарь запуска (от 9 июня 2026)</h3>
            <ul style={{ ...sP, paddingLeft: 20 }}>
              <li><strong style={{ color: C.text }}>9-30 июня:</strong> регистрация карточек на Kaspi, оформление фото 6-8 шт + видео обзор, статья на продающей странице, заведение в Kaspi Merchant Cabinet.</li>
              <li><strong style={{ color: C.text }}>1-15 июля:</strong> запуск первой партии. Главная цель — набрать первые 30-50 отзывов через знакомых и микро-инфлюенсеров. Это критично для ранжирования.</li>
              <li><strong style={{ color: C.text }}>15-31 июля:</strong> промо-кампания в Instagram/TikTok. Бюджет 500K-1M ₸ на инфлюенсера среднего размера (50-200K подписчиков).</li>
              <li><strong style={{ color: C.text }}>1-31 августа:</strong> попадание в топ-3 категории за счёт количества положительных отзывов. Это совпадает с Kaspi Жума.</li>
              <li><strong style={{ color: C.text }}>1-30 сентября:</strong> пик продаж. Готовить запас минимум на 2× ожидаемого объёма (август всегда удивляет).</li>
            </ul>
          </div>
        </Section>

        {/* 8. Методология */}
        <Section id="sec-8" title="8. Методология">
          <h3 style={sH3}>Что входит в анализ</h3>
          <ul style={{ ...sP, paddingLeft: 20 }}>
            <li><strong style={{ color: C.text }}>4 категории L1:</strong> Телефоны и гаджеты, Компьютеры, ТВ-Аудио-Видео, Бытовая техника</li>
            <li><strong style={{ color: C.text }}>266 ниш</strong> (L2 + L3) после разбора всех веток каталога</li>
            <li><strong style={{ color: C.text }}>30 топ-ниш</strong> для детального анализа: топ-200 SKU + ценовые сегменты</li>
            <li><strong style={{ color: C.text }}>7 приоритетных ниш</strong> для разбора отзывов: 35 SKU × 10-15 отзывов = ~500 отзывов</li>
            <li><strong style={{ color: C.text }}>18 месяцев истории</strong> (ноябрь 2024 — апрель 2026), включая 2 цикла зимы и 1 цикл лета-осени</li>
          </ul>

          <h3 style={sH3}>Как считается прогноз</h3>
          <p style={sP}>
            <strong style={{ color: C.text }}>Прогноз июль-сентябрь 2026 = (выручка июль-сентябрь 2025) × (выручка апрель 2026 / выручка апрель 2025)</strong>.
          </p>
          <p style={{ ...sP, fontSize: 13 }}>
            Логика: июль-сентябрь 2025 даёт точную «форму» сезонного пика. Соотношение апрель 2026 / апрель 2025 — самый свежий «темп роста год к году». Перемножение даёт оценку, учитывающую и сезонный паттерн, и тренд роста рынка.
          </p>

          <h3 style={sH3}>Как считается сезонный индекс</h3>
          <p style={sP}>
            <strong style={{ color: C.text }}>Индекс месяца = средняя выручка месяца (за все доступные годы) / годовая средняя × 100</strong>. 100 = типичный месяц. 150 = в 1.5 раза больше среднего. 50 = в 2 раза меньше.
          </p>

          <h3 style={sH3}>Как считаются жалобы в отзывах</h3>
          <p style={sP}>
            Берутся отзывы с оценкой ★1-★3 (негативные и нейтральные). По каждому отзыву проверяется наличие ключевых слов из 12 тематических групп: «шум», «не работает», «качество сборки», «запах пластика», «инструкция», «цена», и т.д.
          </p>
          <p style={{ ...sP, fontSize: 13, color: C.dim }}>
            Это «контент-анализ» по словарю — не машинное обучение. Преимущество: прозрачный и воспроизводимый результат. Ограничение: пропускает редкие формулировки. Поэтому в отчёте показаны и количественные кластеры, и примеры дословных отзывов.
          </p>

          <h3 style={sH3}>Юридическая чистота</h3>
          <ul style={{ ...sP, paddingLeft: 20 }}>
            <li>Только общедоступные данные витрины Kaspi (без обхода авторизации)</li>
            <li>Никаких персональных данных покупателей (имена в отзывах — публичные)</li>
            <li>Никакого закрытого API Kaspi, никаких чужих сессий</li>
            <li>Продукт — агрегированная аналитика, не сырая выгрузка</li>
            <li>Соответствует ст. 6 Закона РК «О персональных данных» и ст. 205 УК РК</li>
          </ul>

          <h3 style={sH3}>Связанные отчёты</h3>
          <ul style={{ ...sP, paddingLeft: 20 }}>
            <li><Link href="/reports/kaspi-haircare" style={{ color: C.cyan }}>Hair Care на Kaspi.kz</Link> — рынок ухода за волосами (2 013M/мес, 9 ниш, барбершоп-сегмент)</li>
          </ul>
        </Section>

        {/* Footer */}
        <div style={{ marginTop: 80, paddingTop: 32, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: C.dim, margin: 0 }}>
            Отчёт подготовлен Алмасом Касымжановым · 9 июня 2026
          </p>
          <p style={{ fontSize: 12, color: C.dim, margin: "8px 0 0" }}>
            Данные: <strong style={{ color: C.cyan }}>RedStat</strong> (агрегированная аналитика Kaspi.kz) · 18 месяцев истории
          </p>
          <p style={{ fontSize: 12, color: C.dim, margin: "8px 0 0" }}>
            <Link href="/" style={{ color: C.accent, textDecoration: "none" }}>akasymzhanov.com</Link> · обновление ежемесячно
          </p>
        </div>

      </div>
    </div>
  );
}
