// A curve group includes its line and label so visibility stays consistent.
function curveGroup(id,label,color,svg){return `<g data-curve="${id}" data-curve-label="${label}" data-curve-color="${color}">${svg}</g>`}
function costValues(q){return {afc:600/q,avc:10+.35*q,atc:600/q+10+.35*q,mc:10+.7*q}}
/* Original vector teaching diagrams. All numerical models declare their assumptions. */
const MODEL_NAMES={flow:'循环流量',ppf:'生产可能性边界',trade:'比较优势与贸易',demand:'需求曲线',supply:'供给曲线',market:'供需均衡',demandShift:'需求的移动',supplyShift:'供给的移动',both:'供需同时移动',ceiling:'价格上限',floor:'价格下限',elasticity:'需求价格弹性',supplyElasticity:'供给价格弹性',revenue:'弹性与总收益',consumer:'消费者剩余',producer:'生产者剩余',welfare:'市场总剩余',tax:'税收与无谓损失',laffer:'税额与税收收入',imports:'进口国的贸易',exports:'出口国的贸易',tariff:'进口关税',negative:'负外部性',positive:'正外部性',permits:'污染价格与数量',goods:'物品的四种类型',taxes:'三种税制',production:'生产函数',totalCost:'总成本',cost:'平均成本与边际成本',competitive:'竞争企业的产量',monopoly:'垄断企业的定价',discrimination:'完全价格歧视',natural:'自然垄断',moncomp:'垄断竞争长期均衡',structures:'市场结构',game:'策略与收益',labor:'劳动需求与工资',budget:'预算约束',indifference:'无差异曲线',substitutes:'完全替代品与互补品',optimum:'消费者最优选择',substitution:'收入效应与替代效应',leisure:'劳动与闲暇',saving:'两期消费',vote:'多数投票与中值选民',correlation:'相关性与因果关系',slope:'直线的斜率'};
const MODEL_CONFIG={ppf:['横轴产品的产量',0,100,50,''],market:['需求截距变化',-20,20,0,''],demandShift:['需求截距变化',-20,20,12,''],supplyShift:['供给成本变化',-20,20,12,''],ceiling:['最高限价',20,70,35,''],floor:['最低限价',30,80,65,''],elasticity:['需求曲线斜率绝对值',20,180,80,'/100'],tax:['每单位税额',0,40,15,''],tariff:['每单位关税',0,25,10,''],negative:['单位外部成本',0,35,20,''],positive:['单位外部收益',0,35,20,''],budget:['预算收入',40,100,70,''],optimum:['预算收入',40,100,70,''],labor:['工资',20,70,40,''],competitive:['市场价格',20,70,45,'']};
const DIAGRAM_OVERRIDES={'c14-b48':'competitiveSupply'};
MODEL_NAMES.competitiveSupply='图14-2 · 作为竞争企业供给曲线的边际成本曲线';
MODEL_CONFIG.competitiveSupply=['新价格 P₂',40,75,55,''];
const DATA_FIGURES={
'c12-b9':{title:'政府总税收占GDP的百分比：国际比较',labels:['丹麦','法国','瑞典','意大利','德国','希腊','英国','西班牙','加拿大','日本','澳大利亚','美国','智利','墨西哥'],values:[49,45,43,43,37,34,33,33,31,29,27,25,20,20],unit:'%',note:'按教材图12-2重绘；教材中的历史横截面，非当前数据。'},
'c12-b12':{title:'2014年联邦政府的收入',rows:[['税种','数量（10亿美元）','人均（美元）','占比（%）'],['个人所得税',1397,4379,43],['社会保险税',1145,3589,35],['公司所得税',418,1310,13],['其他',305,956,9],['总计',3265,10235,100]]},
'c12-b16':{title:'2014年联邦所得税税率',rows:[['未婚纳税人应税收入（美元）','边际税率（%）'],['0—9,075',10],['9,076—36,900',15],['36,901—89,350',25],['89,351—186,350',28],['186,351—405,100',33],['405,101—406,750',35],['406,751及以上',39.6]]},
'c12-b24':{title:'2014年州与地方政府的收入',rows:[['类别','数量（10亿美元）','人均（美元）','占比（%）'],['销售税',525,1646,24],['财产税',456,1429,20],['个人所得税',383,1201,17],['公司所得税',58,182,3],['联邦政府资金',495,1552,22],['其他',308,916,14],['总计',2225,6975,100]],note:'教材原表数值照录；分项可能因原表或四舍五入不完全加总。'},
'c12-b84':{title:'三种税制',rows:[['收入（美元）','比例税：税额 / 税率','累退税：税额 / 税率','累进税：税额 / 税率'],['50,000','12,500 / 25%','15,000 / 30%','10,000 / 20%'],['100,000','25,000 / 25%','25,000 / 25%','25,000 / 25%'],['200,000','50,000 / 25%','40,000 / 20%','60,000 / 30%']]},
'c12-b89':{title:'联邦税收负担（2011年数据）',rows:[['收入组','平均收入（美元）','税收/收入 %','占全部收入 %','占全部税收 %'],['最低五分位',24600,1.9,5.3,.6],['第二五分位',45300,7,9.6,3.8],['中间五分位',66400,11.2,14.1,8.9],['第四五分位',97500,15.2,20.4,17.6],['最高五分位',245700,23.4,51.9,68.7],['收入最高1%',1453100,29,14.6,24]]},
'c19-b19':{title:'不同受教育程度的人的平均年收入',rows:[['组别','1974年（美元）','2014年（美元）'],['男性：高中、未上大学',52521,46688],['男性：大学毕业',74801,84567],['男性：大学毕业生高出','42%','81%'],['女性：高中、未上大学',30185,34394],['女性：大学毕业',40831,58894],['女性：大学毕业生高出','35%','71%']]},
'c19-b66':{title:'不同种族与性别的中值年收入',rows:[['组别','白人（美元）','黑人（美元）','黑人工人收入低出的比例'],['男性',51022,40719,'20%'],['女性',40439,33533,'17%'],['女性工人收入低出的比例','21%','18%','—']],note:'教材历史统计。未调整的收入差距不能单独识别歧视的因果影响。'},
'c20-b13':{title:'美国的收入分配：2014年',rows:[['家庭收入组','家庭年收入（美元）'],['最低1/5','29,100及以下'],['次低1/5','29,101—52,697'],['中间1/5','52,698—82,032'],['次高1/5','82,033—129,006'],['最高1/5','129,007及以上'],['最高5%','230,030及以上']]},
'c20-b16':{title:'美国的收入不平等状况',rows:[['年份','最低1/5 %','次低1/5 %','中间1/5 %','次高1/5 %','最高1/5 %','最高5% %'],[2014,3.6,9.2,15.1,23.2,48.9,20.8],[2010,3.8,9.4,15.4,23.5,47.9,20],[2000,4.3,9.8,15.4,22.7,47.7,21.1],[1990,4.6,10.8,16.6,23.8,44.3,17.4],[1980,5.3,11.6,17.6,24.4,41.1,14.6],[1970,5.4,12.2,17.6,23.8,40.9,15.6],[1960,4.8,12.2,17.8,24,41.3,15.9],[1950,4.5,12,17.4,23.4,42.7,17.3],[1935,4.1,9.2,14.1,20.9,51.7,26.5]]},
'c20-b23':{title:'最高20%与最低20%人口的收入之比',labels:['瑞典','巴基斯坦','孟加拉国','德国','印度','法国','澳大利亚','日本','印度尼西亚','加拿大','意大利','俄罗斯','英国','菲律宾','尼日利亚','美国','中国','墨西哥','巴西','南非'],values:[3.7,4.1,4.7,4.7,5,5.1,5.3,5.4,5.7,5.8,6.9,7.3,7.6,8.4,9.1,9.8,10.1,11.1,16.9,28.5],unit:'倍',note:'教材引自《Human Development Report 2011》，不是当前排名。'},
'c20-b47':{title:'谁是穷人（2014年）',labels:['总人口','白人（非西班牙裔）','黑人','西班牙裔','亚裔','18岁以下','64岁以上','已婚夫妇家庭','无丈夫的女性家长家庭'],values:[14.8,10.1,26.2,23.6,12,21.1,10,6.2,33.1],unit:'%',note:'教材所引2014年贫困率，来源为美国人口普查局。'}
};
function figureKind(b,n){if(b.diagramKind)return b.diagramKind;if(DIAGRAM_OVERRIDES[b.id])return DIAGRAM_OVERRIDES[b.id];const t=b.text;
if(n===2)return /循环/.test(t)?'flow':/生产可能/.test(t)?'ppf':/斜率/.test(t)?'slope':/需求|小说/.test(t)?'demandShift':'correlation';
if(n===3)return /机会成本/.test(t)?'trade':'ppf';
if(n===4)return /上限/.test(t)?'ceiling':/非均衡/.test(t)?'ceiling':/供给和需求|变动时/.test(t)?'both':/需求增加|需求曲线的移动|影响买者/.test(t)?'demandShift':/供给减少|供给曲线的移动|影响卖者/.test(t)?'supplyShift':/需求/.test(t)?'demand':/供给/.test(t)?'supply':'market';
if(n===5)return /供绐|供给价格/.test(t)?'supplyElasticity':/石油/.test(t)?'supplyShift':/小麦/.test(t)?'revenue':/毒品/.test(t)?'demandShift':'elasticity';
if(n===6)return /下限|工资/.test(t)?'floor':/上限|汽油|租金/.test(t)?'ceiling':'tax';
if(n===7)return /消费者|买者|需求/.test(t)?'consumer':/生产者|卖者|供给/.test(t)?'producer':'welfare';
if(n===8)return /规模变动/.test(t)?'laffer':'tax';
if(n===9)return /出口/.test(t)?'exports':/进口/.test(t)?'imports':/关税/.test(t)?'tariff':'market';
if(n===10)return /教育/.test(t)?'positive':/许可证/.test(t)?'permits':'negative';
if(n===11)return 'goods';if(n===12)return 'taxes';
if(n===13)return /生产函数/.test(t)?'production':/总成本曲线/.test(t)?'totalCost':'cost';
if(n===14)return /市场供给|长期市场|需求增加/.test(t)?'market':'competitive';
if(n===15)return /自然垄断/.test(t)?'natural':/歧视/.test(t)?'discrimination':'monopoly';
if(n===16)return /类型|总结|之间/.test(t)?'structures':'moncomp';if(n===17)return 'game';if(n===18)return /生产函数/.test(t)?'production':'labor';
if(n===19)return 'labor';if(n===20)return 'taxes';
if(n===21)return /替代品和/.test(t)?'substitutes':/收入效应/.test(t)?'substitution':/工作|闲暇/.test(t)?'leisure':/储蓄|利事/.test(t)?'saving':/最忧|最优/.test(t)?'optimum':/偏好|无差异/.test(t)?'indifference':'budget';
return 'vote'}
function baseDiagram(kind,v){v=v??MODEL_CONFIG[kind]?.[3]??0;const blue='#3185ef',gold='#d99532',green='#289d83',red='#cf5c63';let s='',xname='数量 Q',yname='价格 / 成本',explain='',stats=[];const X=x=>65+x*4.8,Y=y=>305-y*2.5;
const line=(x1,y1,x2,y2,c=blue,dash=false)=>`<path d="M${X(x1)} ${Y(y1)}L${X(x2)} ${Y(y2)}" fill="none" stroke="${c}" stroke-width="2.6" ${dash?'stroke-dasharray="5 5"':''}/>`;
const txt=(x,y,t,c='#64758b')=>`<text x="${X(x)}" y="${Y(y)}" fill="${c}" font-size="13">${t}</text>`;
const dot=(x,y,c=blue)=>`<circle cx="${X(x)}" cy="${Y(y)}" r="5" fill="${c}" stroke="white" stroke-width="2"/>`;
const path=(fn,c=blue,from=0,to=100)=>`<path d="${Array.from({length:61},(_,i)=>{let x=from+(to-from)*i/60;return `${i?'L':'M'}${X(x)},${Y(fn(x))}`}).join(' ')}" fill="none" stroke="${c}" stroke-width="2.6"/>`;
const poly=(pts,c)=>`<polygon points="${pts.map(([x,y])=>X(x)+','+Y(y)).join(' ')}" fill="${c}" opacity=".2"/>`;
const guide=(q,p)=>line(q,0,q,p,'#aebdd0',true)+line(0,p,q,p,'#aebdd0',true)+dot(q,p);
const base=()=>line(0,90,100,10)+line(0,10,100,90,gold)+txt(91,21,'D',blue)+txt(91,88,'S',gold);
if(['market','demandShift','supplyShift','both','tax','consumer','producer','welfare','imports','exports','tariff','negative','positive','ceiling','floor'].includes(kind)){
 s=base();let q=50,p=50;
 if(['market','demandShift','supplyShift','both'].includes(kind)){let a=['market','demandShift','both'].includes(kind)?(kind==='both'?12:v):0,b=['supplyShift','both'].includes(kind)?(kind==='both'?12:v):0;q=(80+a-b)/1.6;p=10+b+.8*q;s+=line(0,90+a,100,10+a,blue,true)+line(0,10+b,100,90+b,gold,true)+guide(q,p);stats=[['均衡数量',q.toFixed(1)],['均衡价格',p.toFixed(1)]];explain='线性示意：需求 P = 90 + a − 0.8Q；供给 P = 10 + b + 0.8Q。实线为原曲线，虚线为变动后曲线，其他条件不变。'}
 if(['consumer','producer','welfare'].includes(kind)){if(kind!=='producer')s+=poly([[0,90],[0,50],[50,50]],blue);if(kind!=='consumer')s+=poly([[0,10],[0,50],[50,50]],gold);s+=line(0,50,85,50,green)+guide(50,50);explain='竞争市场示意：蓝色区域为消费者剩余，橙色区域为生产者剩余。没有外部性时，两者之和在竞争均衡达到最大。'}
 if(kind==='tax'){q=(80-v)/1.6;let pb=90-.8*q,ps=10+.8*q;s+=poly([[0,pb],[q,pb],[q,ps],[0,ps]],green)+poly([[q,pb],[q,ps],[50,50]],red)+line(q,ps,q,pb,red)+guide(q,pb)+dot(q,ps,gold);stats=[['交易量',q.toFixed(1)],['税收收入',(q*v).toFixed(1)],['无谓损失',(.5*v*(50-q)).toFixed(1)]];explain='D: P=90−0.8Q；S: P=10+0.8Q。绿色矩形是税收收入，红色三角形是无谓损失。税额等于买卖双方价格之差。'}
 if(['ceiling','floor'].includes(kind)){let qs=(v-10)/.8,qd=(90-v)/.8;s+=line(0,v,100,v,red)+dot(qs,v,gold)+dot(qd,v)+txt(3,v+5,kind==='ceiling'?'最高限价':'最低限价',red);stats=[['需求量',qd.toFixed(1)],['供给量',qs.toFixed(1)],['约束结果',kind==='ceiling'?(v<50?'短缺 '+(qd-qs).toFixed(1):'不生效'):(v>50?'过剩 '+(qs-qd).toFixed(1):'不生效')]];explain='均衡价格为50。低于50的价格上限造成短缺，高于50的价格下限造成过剩。假定价格控制得到执行。'}
 if(['imports','exports','tariff'].includes(kind)){let p=kind==='exports'?65:30+(kind==='tariff'?v:0),qs=(p-10)/.8,qd=(90-p)/.8;s+=line(0,p,100,p,green)+dot(qs,p,gold)+dot(qd,p)+txt(3,p+5,'国内价格',green);if(kind==='tariff'){s+=line(0,30,100,30,'#aebdd0',true)+poly([[25,30],[qs,p],[qs,30]],red)+poly([[qd,30],[qd,p],[75,30]],red)}stats=[['国内供给',qs.toFixed(1)],['国内需求',qd.toFixed(1)],[kind==='exports'?'出口':'进口',Math.abs(qd-qs).toFixed(1)]];explain='小国模型：世界价格外生。进口模型世界价格为30，出口模型为65；关税提高国内价格，红色区域为生产与消费扭曲造成的损失。'}
 if(['negative','positive'].includes(kind)){let neg=kind==='negative',q=neg?(80-v)/1.6:(80+v)/1.6,p=10+.8*q;s+=neg?line(0,10+v,100,90+v,red):line(0,90+v,100,10+v,green);s+=guide(q,neg?90-.8*q:p)+txt(30,95,neg?'社会边际成本':'社会边际收益',neg?red:green);stats=[['市场数量',50],['社会最优数量',q.toFixed(1)]];explain='示意：每单位外部影响固定为所选数值；负外部性使市场过量生产，正外部性使市场产量不足。'}
}
if(['demand','supply','elasticity','supplyElasticity','revenue','slope'].includes(kind)){let slope=kind==='elasticity'?v/100:.65;let isSupply=['supply','supplyElasticity'].includes(kind);s=path(q=>isSupply?15+.7*q:50-slope*(q-50),blue)+guide(50,50)+txt(80,isSupply?78:32,isSupply?'S':'D',blue);if(kind==='revenue')s+=poly([[0,0],[50,0],[50,50],[0,50]],green);if(kind==='supplyElasticity')s+=line(50,0,50,100,gold)+line(0,50,100,50,green);stats=kind==='elasticity'?[['中心点弹性',(1/slope).toFixed(2)]]:[];explain=kind==='elasticity'?'需求为 P=50−b(Q−50)，中心点 P=Q=50，点弹性=1/b。斜率只在坐标单位一致时可直接比较。':kind==='supplyElasticity'?'蓝线：正弹性；橙色垂线：完全无弹性；绿色水平线：完全有弹性。':'示意图只隔离价格与数量的关系，其他决定因素不变。收益矩形面积为 P×Q。'}
if(['ppf','trade'].includes(kind)){xname='产品 X';yname='产品 Y';s=path(x=>90-.009*x*x,blue,0,100);let q=kind==='ppf'?v:50;s+=guide(q,90-.009*q*q);if(kind==='trade')s+=line(0,112.5,100,22.5,gold)+dot(80,40.5,gold)+txt(62,49,'贸易后消费',gold);stats=kind==='ppf'?[['X产量',q.toFixed(0)],['Y产量',(90-.009*q*q).toFixed(1)]]:[];explain='重绘示意：PPF 为 Y=90−0.009X²，0≤X≤100。边界外当前不能生产；贸易线表示合适交换条件下可以扩大的消费机会。'}
if(kind==='laffer'){s=path(t=>t*(100-t)/28)+txt(39,95,'税收收入');xname='单位税额';yname='税收收入';explain='示意抛物线，不是对任何国家的税率估计。税额提高同时缩小交易量，因此收入并非一直上升。'}
if(kind==='permits'){s=line(0,90,100,10)+line(0,45,100,45,gold)+line(56.25,0,56.25,100,green)+dot(56.25,45);xname='排放数量';yname='排放价格';explain='信息确定、执行完全的简单模型：橙线固定污染价格（税），绿线固定排放量（许可证），可实现同一均衡。'}
if(['production','totalCost'].includes(kind)){xname=kind==='production'?'劳动投入':'产量';yname=kind==='production'?'总产量':'总成本';s=kind==='production'?path(x=>8*Math.sqrt(x)):path(x=>12+.008*x*x);explain=kind==='production'?'其他投入固定：随着劳动增加，总产量仍增加，但增幅变小，体现边际产量递减。':'示意：固定成本为正，边际成本递增，因此总成本曲线越来越陡。'}
if(['cost','competitive','monopoly','discrimination','natural','moncomp'].includes(kind)){
 const atc=q=>600/q+10+.35*q,mc=q=>10+.7*q; s=path(atc,blue,8,100)+path(mc,gold)+txt(81,atc(81)+5,'ATC',blue)+txt(88,mc(88)+5,'MC',gold);explain='示意成本：TC=600+10Q+0.35Q²，ATC=TC/Q，MC=10+0.7Q。MC穿过ATC的最低点。';
 if(kind==='cost'){
  const afc=q=>costValues(q).afc,avc=q=>costValues(q).avc;
  s=curveGroup('ATC','平均总成本 ATC',blue,path(atc,blue,8,100)+txt(81,atc(81)+5,'ATC',blue))
   +curveGroup('AFC','平均固定成本 AFC',green,path(afc,green,6,100)+txt(83,afc(83)+5,'AFC',green))
   +curveGroup('AVC','平均可变成本 AVC',red,path(avc,red,0,100)+txt(81,avc(81)-7,'AVC',red))
   +curveGroup('MC','边际成本 MC',gold,path(mc,gold)+txt(88,mc(88)+5,'MC',gold));
  explain='示意成本：TC=600+10Q+0.35Q²；AFC=600/Q，AVC=10+0.35Q，ATC=AFC+AVC，MC=10+0.7Q。Q>0；MC穿过ATC的最低点。本示意的AVC单调上升，MC在Q>0时高于AVC。';
 }
 if(kind==='competitive'){let q=(v-10)/.7;s+=line(0,v,100,v,green)+guide(q,v);stats=[['最优产量',q.toFixed(1)],['经济利润',(v*q-(600+10*q+.35*q*q)).toFixed(1)]];explain+=' 企业为价格接受者，当前价格高于最低AVC，按P=MC生产。'}
 if(['monopoly','discrimination'].includes(kind)){s=curveGroup('D','需求 D',blue,line(0,90,100,10)+txt(82,30,'D',blue))+curveGroup('MR','边际收益 MR',green,line(0,90,56.25,0,green)+txt(18,35,'MR',green))+curveGroup('MC','边际成本 MC',gold,path(mc,gold)+txt(86,77,'MC',gold));let q=80/2.3,p=90-.8*q;s+=guide(q,p)+dot(q,mc(q),gold);if(kind==='discrimination')s+=poly([[0,90],[50,50],[0,10]],blue);explain=kind==='monopoly'?'D: P=90−0.8Q；MR=90−1.6Q；MC=10+0.7Q。先由MR=MC确定数量，再在需求线上读取价格。':'完全价格歧视的理想示意：每单位按买者支付意愿收费，可扩产至D与MC相交处；所有交易收益由生产者获取。';if(kind==='discrimination')s=line(0,90,100,10)+path(mc,gold)+poly([[0,90],[80/1.5,90-.8*(80/1.5)],[0,10]],blue)}
 if(kind==='natural'){s=curveGroup('ATC','平均总成本 ATC',blue,path(q=>12+500/(q+10),blue))+curveGroup('MC','边际成本 MC',gold,line(0,12,100,12,gold))+curveGroup('D','需求 D',green,line(0,90,100,10,green));explain='固定成本较高、边际成本为常数的自然垄断示意。平均成本随数量下降，若按MC定价则无法覆盖全部成本。'}
 if(kind==='moncomp'){s=curveGroup('ATC','平均总成本 ATC',blue,path(q=>55-.6*q+.01*(q-40)**2,blue,10,90))+curveGroup('D','需求 D',green,line(0,55,85,4,green))+curveGroup('MR','边际收益 MR',gold,line(0,55,45.8,0,gold))+guide(40,31);explain='长期均衡示意：需求线与ATC在Q=40处相切，P=ATC，因此经济利润为零；该产量低于ATC最小点。蓝线ATC、绿线需求、橙线MR。'}
}
if(kind==='labor'){xname='劳动 L';yname='工资 / 边际产量值';let q=(90-v)/.8;s=line(0,90,100,10)+line(0,v,100,v,gold)+guide(q,v)+txt(72,40,'VMPL',blue);stats=[['雇用量',q.toFixed(1)]];explain='产品和劳动市场均为竞争市场，产品价格不变；VMPL=90−0.8L。利润最大化企业雇用至边际产量值等于工资。'}
if(['budget','indifference','optimum','substitution','substitutes','leisure','saving'].includes(kind)){xname=kind==='leisure'?'闲暇':kind==='saving'?'当期消费':'物品 X';yname=kind==='leisure'?'消费':kind==='saving'?'未来消费':'物品 Y';let income=['budget','optimum'].includes(kind)?v:80;s=line(0,income,income,0,blue)+txt(65,17,'预算线',blue);if(kind!=='budget'){s+=path(q=>income*income/4/q,green,Math.max(10,income*income/400),100);if(kind==='indifference')s+=path(q=>900/q,gold,10,100)+path(q=>2200/q,blue,25,100);if(kind==='substitution')s+=line(0,80,100,30,blue,true)+line(0,56.57,100,6.57,gold,true)+dot(40,40)+dot(56.57,28.285,gold)+dot(80,40,green);else s+=guide(income/2,income/2)}if(kind==='substitutes')s=line(0,60,60,0,blue)+line(0,90,90,0,blue)+line(30,100,30,30,gold)+line(30,30,100,30,gold)+txt(45,70,'橙：完全互补',gold)+txt(3,15,'蓝：完全替代',blue);explain=kind==='substitution'?'示意：X价格从1降至0.5，Y价格为1，收入80，偏好U=XY。原点(40,40)，补偿点约(56.6,28.3)，新最优点(80,40)。前一段为替代效应，后一段为收入效应。':kind==='substitutes'?'完全替代品的无差异曲线是直线；固定比例消费的完全互补品是直角曲线。':kind==='leisure'?'在工资和非劳动收入既定时，更多闲暇意味着放弃劳动收入；工资变化会同时产生收入效应与替代效应。':kind==='saving'?'给定一生资源的两期预算示意。利率改变当期消费的机会成本，收入效应与替代效应可能方向相反。':'示意价格PX=PY=1，预算X+Y≤I；偏好曲线使用U=XY（蓝线预算、绿线无差异曲线）。内点最优组合为X=Y=I/2。';stats=['budget','optimum'].includes(kind)?[['最大X',income],['最大Y',income],['价格比','1 : 1']]:[]}
if(kind==='slope'){s=line(10,80,90,20)+line(10,80,90,80,gold,true)+line(90,80,90,20,gold,true)+txt(40,86,'ΔX = 80')+txt(73,52,'ΔY = −60');explain='两点(10,80)、(90,20)：斜率=ΔY/ΔX=−60/80=−0.75。坐标单位改变会改变斜率数值。'}
if(kind==='correlation'){s=[18,26,31,40,48,57,64,73,84].map((x,i)=>dot(x,x+[5,-6,8,-7,4,-4,9,-8,3][i])).join('');xname='变量 X';yname='变量 Y';explain='散点示意只表达正相关。相关性可能来自X影响Y、Y影响X，或第三个变量同时影响两者，不能直接推出因果。'}
if(['flow','goods','structures','game','vote','taxes'].includes(kind)){return {svg:diagramTable(kind),stats:[],note:{flow:'商品、服务及要素流动与货币支付方向相反。此图为不含政府和对外部门的简单模型。',goods:'分类取决于排他性和消费竞争性，而非是否由政府提供。',structures:'用于比较市场结构的概念表；实际市场可能介于这些理想类型之间。',game:'自编囚徒困境收益矩阵：数值越大越好，括号依次为甲、乙收益。无论对方选择什么，背离都给自己更高收益；但共同合作优于共同背离。',vote:'示意单峰偏好的一维投票；群体偏好的循环与中值选民结论使用不同的前提。',taxes:'示意相同收入下的三种税制，区分税额与收入占比。'}[kind]}}
const svg=`<svg viewBox="0 0 620 355" class="model-svg" role="img" aria-label="${MODEL_NAMES[kind]}"><defs><clipPath id="plot-${kind}"><rect x="65" y="55" width="480" height="250"/></clipPath></defs>${[0,25,50,75,100].map(t=>line(0,t,100,t,'#e7edf5')+`<text x="${X(t)}" y="324" font-size="11" text-anchor="middle" fill="#91a0b1">${t}</text><text x="54" y="${Y(t)+4}" font-size="11" text-anchor="end" fill="#91a0b1">${t}</text>`).join('')}<g clip-path="url(#plot-${kind})">${s}</g>${line(0,0,100,0,'#9cacbf')}${line(0,0,0,100,'#9cacbf')}<text x="65" y="30" fill="#63758d" font-size="13">${yname}</text><text x="545" y="346" text-anchor="end" fill="#63758d" font-size="13">${xname}</text></svg>`;
return {svg,stats,note:explain}}
function tableHTML(rows,caption=""){const wide=rows[0].length>=5;return `<div class="book-table${wide?" wide-table":""}"${wide?` tabindex="0" role="region" aria-label="${escapeHTML(caption||"教材表格，可横向滚动")}"`:""}><table>${caption?`<caption>${escapeHTML(caption)}</caption>`:""}<thead><tr>${rows[0].map(t=>`<th scope="col">${escapeHTML(t)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(r=>`<tr>${r.map(t=>`<td>${escapeHTML(t)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function diagramTable(k){const tables={goods:[['','具有排他性','无排他性'],['有消费竞争性','私人物品 · 食物','公共资源 · 公共渔场'],['无消费竞争性','俱乐部物品 · 未拥挤的收费道路','公共物品 · 国防']],structures:[['结构','卖者数量','产品','进入'],['完全竞争','很多','相同','自由'],['垄断竞争','很多','有差别','自由'],['寡头','少数','相似或相同','有障碍'],['垄断','一个','无相近替代品','有障碍']],game:[['甲 ＼ 乙','乙合作','乙背离'],['甲合作','(3, 3)','(0, 5)'],['甲背离','(5, 0)','(1, 1)']],vote:[['组别','人数','最喜欢的支出'],['甲组',30,'0元'],['乙组',30,'1万元 ← 中值'],['丙组',40,'3万元']],taxes:[['收入','比例税额（25%）','累退税额 / 税率','累进税额 / 税率'],[50000,'12500 / 25%','15000 / 30%','10000 / 20%'],[100000,'25000 / 25%','25000 / 25%','25000 / 25%'],[200000,'50000 / 25%','40000 / 20%','60000 / 30%']]};if(k==='flow')return `<div class="flow-diagram"><div>家庭<small>消费商品 · 供给要素</small></div><span>支出 → 商品市场 → 收益<br>← 商品与服务 ←</span><div>企业<small>供给商品 · 雇用要素</small></div><span>收入 ← 要素市场 ← 支付<br>→ 劳动、土地、资本 →</span></div>`;return tableHTML(tables[k])}
function bars(d){const max=Math.max(...d.values);return `<div class="bar-diagram" role="img" aria-label="${escapeHTML(d.title)}">${d.labels.map((t,i)=>`<div class="bar-row"><span>${escapeHTML(t)}</span><div><i style="width:${d.values[i]/max*100}%"></i></div><b>${d.values[i]}${d.unit||''}</b></div>`).join('')}</div>`}
function redrawnFigure(b,n){const d=DATA_FIGURES[b.id];if(d)return `<figure id="${b.id}" class="redrawn"><div class="figure-heading"><span>${d.editorial?'原理重绘 · 示例':'教材图表 · 重新排绘'}</span><strong>${escapeHTML(d.title)}</strong></div>${d.rows?tableHTML(d.rows):d.series?lineData(d):bars(d)}<figcaption>${escapeHTML(d.note||'据教材原表重新排版；数值与年份以表题及正文语境为准。')}</figcaption></figure>`;
const kind=figureKind(b,n),cfg=MODEL_CONFIG[kind],model=diagram(kind);return `<figure id="${b.id}" class="redrawn"><div class="figure-heading"><span>原理重绘${cfg?' · 可交互':''}</span><strong>${escapeHTML(MODEL_NAMES[kind])}</strong></div><div class="inline-model" data-model="${kind}" data-value="${cfg?.[3]??0}"><div class="model-drawing">${model.svg.replaceAll('plot-'+kind,'plot-'+b.id)}</div>${cfg?`<label class="model-control"><span>${cfg[0]}</span><input aria-label="${cfg[0]}" type="range" min="${cfg[1]}" max="${cfg[2]}" value="${cfg[3]}"><output>${cfg[3]}${cfg[4]}</output></label><button class="model-reset text-button">重置</button>`:''}<div class="model-stats">${model.stats.map(([a,b])=>`<span>${a}<b>${b}</b></span>`).join('')}</div><div class="model-note">${model.note}</div>${['market','demandShift','supplyShift','budget','optimum','ppf','adas','supplyShock','phillips','loan','money','growth','forex'].includes(kind)?'<div class="drag-hint">可拖动图中曲线／点，也可使用滑块或方向键调整</div>':''}</div>${kind==='fixedMarketSupply'?'<figcaption>按教材图14-6重绘，保留1美元、2美元及其对应产量；滑块在相同线性关系上演示其他价格。</figcaption>':''}</figure>`}
Object.assign(DATA_FIGURES,{
'c3-b40':{title:'牛肉和土豆的机会成本',rows:[['生产者','1盎司牛肉的机会成本','1盎司土豆的机会成本'],['Frank','4盎司土豆','1/4盎司牛肉'],['Ruby','2盎司土豆','1/2盎司牛肉']]},
'c7-b9':{title:'四个可能买者的支付意愿',labels:['Taylor','Carrie','Rihanna','Gaga'],values:[100,80,70,50],unit:'美元',note:'据教材表7-1重绘。'},
'c7-b43':{title:'四个可能卖者的成本',labels:['Vincent','Claude','Pablo','Andy'],values:[900,800,600,500],unit:'美元',note:'据教材表7-3重绘。'},
'c13-b23':{title:'经济学家与会计师怎样看待企业',rows:[['相同总收益的分解','经济学视角','会计视角'],['实际支付的货币','显性成本','显性成本'],['自有资源的机会成本','隐性成本','包含在会计利润中'],['扣除全部机会成本后','经济利润','会计利润 = 经济利润 + 隐性成本']],note:'根据教材图13-1重绘。会计利润没有扣除隐性成本。'},
'c13-b32':{title:'Caroline的糕点厂：生产与成本',rows:[['工人数','产量/小时','新增工人边际产量','工厂成本$','工人成本$','总成本$'],[0,0,'—',30,0,30],[1,50,50,30,10,40],[2,90,40,30,20,50],[3,120,30,30,30,60],[4,140,20,30,40,70],[5,150,10,30,50,80],[6,155,5,30,60,90]]},
'c13-b45':{title:'Conrad咖啡店的成本指标',rows:[['Q','TC$','FC$','VC$','AFC$','AVC$','ATC$','新增件MC$'],[0,3,3,0,'—','—','—','—'],...[3.3,3.8,4.5,5.4,6.5,7.8,9.3,11,12.9,15].map((tc,i)=>{let q=i+1;return [q,tc,3,(tc-3).toFixed(2),(3/q).toFixed(2),((tc-3)/q).toFixed(2),(tc/q).toFixed(2),(.3+.2*i).toFixed(2)]})]},
'c14-b19':{title:'竞争企业的收益（价格为6美元）',rows:[['Q（加仑）','P$','TR$','AR$','MR$'],...Array.from({length:8},(_,i)=>[i+1,6,6*(i+1),6,6])]},
'c14-b32':{title:'利润最大化：一个数字实例',rows:[['Q','TR$','TC$','利润$','新增件MR$','新增件MC$'],...[3,5,8,12,17,23,30,38,47].map((tc,i,a)=>[i,i*6,tc,i*6-tc,i?6:'—',i?tc-a[i-1]:'—'])]},
'c15-b40':{title:'垄断企业的收益（P=11−Q）',rows:[['Q（加仑）','P$','TR$','AR$','新增件MR$'],...Array.from({length:12},(_,q)=>[q,11-q,q*(11-q),q?11-q:'—',q?12-2*q:'—'])]},
'c15-b178':{title:'竞争与垄断：总结性比较',rows:[['比较项目','完全竞争','垄断'],['企业目标','利润最大化','利润最大化'],['最大化条件','MR=MC','MR=MC'],['边际收益','MR=P','MR<P'],['价格','P=MC','P>MC'],['有效率的产量','是（无外部性等）','一般不是'],['长期自由进入','是','否'],['长期经济利润','零','可能为正'],['价格歧视','没有市场势力支持','可能']]},
'c17-b10':{title:'水的需求与总收益',rows:[['水量（加仑）','价格（美元）','总收益（美元）'],...Array.from({length:13},(_,i)=>[i*10,120-i*10,i*10*(120-i*10)])]},
'c17-b50':{title:'囚徒困境（括号为Bonnie、Clyde的刑期）',rows:[['Bonnie ＼ Clyde','保持沉默','坦白'],['保持沉默','1年，1年','20年，自由'],['坦白','自由，20年','8年，8年']],note:'按教材博弈重排。刑期越短越好；坦白为双方各自的占优策略。'},
'c17-b60':{title:'Jack与Jill的寡头博弈',rows:[['Jack ＼ Jill','30加仑','40加仑'],['30加仑','1800，1800','1500，2000'],['40加仑','2000，1500','1600，1600']],note:'括号顺序为Jack、Jill的利润（美元），按教材P=120−总数量、边际成本为0的例子计算。'},
'c18-b17':{title:'竞争企业如何决定雇用工人数量',rows:[['L','Q（蒲式耳/周）','新增工人MPL','VMPL$','工资$','边际利润$'],[0,0,'—','—','—','—'],[1,100,100,1000,500,500],[2,180,80,800,500,300],[3,240,60,600,500,100],[4,280,40,400,500,-100],[5,300,20,200,500,-300]]},
'c18-b101':{title:'美国的生产率与实际工资增长',rows:[['时间','生产率年增长率 %','实际工资年增长率 %'],['1960—2015',2,1.8],['1960—1973',2.7,2.7],['1973—1995',1.4,1.2],['1995—2015',2.1,1.8]]},
'c22-b60':{title:'康多塞悖论：循环的多数偏好',rows:[['选民类型','人数比例','第一选择','第二选择','第三选择'],['类型1','35%','A','B','C'],['类型2','45%','B','C','A'],['类型3','20%','C','A','B']],note:'A以55%击败B；B以80%击败C；C以65%击败A。多数偏好形成循环。'}
});
DATA_FIGURES['c21-b71']={...DATA_FIGURES['c19-b19'],note:'此表出现在底本当前页面中；按原表重排，内容与前文教育及收入分析有关。'};
Object.assign(DIAGRAM_OVERRIDES,{'c3-b23':'trade','c5-b42':'revenue','c10-b16':'welfare','c18-b20':'production','c18-b65':'market','c18-b69':'supplyShift','c18-b95':'demandShift','c18-b9':'market','c18-b118':'market','c21-b114':'optimum','c21-b124':'substitution','c21-b141':'demand','c21-b165':'leisure','c21-b188':'saving','c2-b242':'demand','c15-b89':'welfare'});
Object.assign(DATA_FIGURES,{
'c12-b7':{title:'政府收入占GDP的比例：长期趋势',series:[{label:'总计',values:[7,8,12,11,15,19,24,21,25,28,28,29,30,31,27,29,27]}],labels:[1902,1913,1922,1929,1941,1945,1947,1951,1961,1971,1981,1991,1996,2001,2005,2008,2011],unit:'%',note:'按原图刻度近似读取关键节点后重绘总量趋势；非精确年度数据，不用于计算。原图来源：Historical Statistics of the United States、BEA及作者计算。'},
'c20-b44':{title:'美国贫困率的历史趋势',series:[{label:'贫困率',values:[22,19,13,12,11,13,15,13,14,14,11,12,15,14.8]}],labels:[1959,1964,1968,1970,1973,1980,1983,1989,1991,1995,2000,2005,2010,2014],unit:'%',note:'按教材折线图近似读取关键节点后重绘（2014年14.8%见相邻教材表）；用于观察趋势，不用于精确年度比较。'},
'c21-b118':{title:'收入增加与低档物品',rows:[['比较','原预算','新预算'],['收入（示意）',60,90],['价格','PX=PY=1','PX=PY=1'],['可能选择（X,Y）','(20,40)','(55,35)'],['观察','Y消费40','收入增加，Y消费降至35']],note:'原理重绘的组合示例，数值不是原图数据。收入上升并不保证两种商品消费都增加；此例Y为低档物品。'},
'c21-b150':{title:'吉芬物品：收入效应压过替代效应',rows:[['比较','原选择','X涨价后'],['收入（示意）',80,80],['价格','PX=1，PY=1','PX=2，PY=1'],['可能选择（X,Y）','(20,60)','(30,20)'],['预算验算','20+60=80','2×30+20=80']],note:'示例只表达吉芬效应的方向，不沿用原书数值。X是很强的低档物品，购买力下降对X的正向影响超过替代效应。'},
'c4-b45':{title:'影响需求的变量',rows:[['变量变化','图形上的结果'],['物品自身价格','沿既定需求曲线移动'],['收入、偏好、预期','需求曲线移动'],['相关物品价格、买者数量','需求曲线移动']]},
'c4-b77':{title:'影响供给的变量',rows:[['变量变化','图形上的结果'],['物品自身价格','沿既定供给曲线移动'],['投入品价格、技术','供给曲线移动'],['预期、卖者数量','供给曲线移动']]},
'c4-b121':{title:'供需变动与均衡结果',rows:[['变动','价格','数量'],['需求增加','上升','增加'],['需求减少','下降','减少'],['供给增加','下降','增加'],['供给减少','上升','减少'],['需求和供给均增加','不确定','增加'],['需求和供给均减少','不确定','减少']]},
'c17-b76':{title:'军备竞赛的激励结构',rows:[['本国 ＼ 对方','不扩军','扩军'],['不扩军','双方安全、节省资源','本国处于相对劣势'],['扩军','本国相对有利，但付出成本','双方付出军备成本']],note:'按教材讨论重绘的定性收益关系。若每方把扩军视为占优策略，共同结果可能比克制更差。'},
'c17-b81':{title:'公共资源的博弈',rows:[['甲公司 ＼ 乙公司','限制开采','增加开采'],['限制开采','共同保留更多资源','乙获得更多份额'],['增加开采','甲获得更多份额','共同过度开采']],note:'定性重绘：增加开采的私人收益不等于社会净收益，共同规则可能改变博弈的激励。'}
});
function lineData(d){const max=Math.ceil(Math.max(...d.series.flatMap(s=>s.values))/5)*5;const X=i=>60+(d.labels[i]-d.labels[0])/(d.labels.at(-1)-d.labels[0])*480,Y=v=>290-v/max*235;return `<svg class="model-svg" viewBox="0 0 610 350" role="img" aria-label="${escapeHTML(d.title)}">${[0,.25,.5,.75,1].map(t=>`<path d="M60 ${Y(max*t)}H540" stroke="#e5ecf4"/><text x="50" y="${Y(max*t)+4}" text-anchor="end" font-size="12" fill="#8291a4">${(max*t).toFixed(1)}${d.unit}</text>`).join('')}${d.series.map((s,j)=>`<polyline points="${s.values.map((v,i)=>`${X(i)},${Y(v)}`).join(' ')}" fill="none" stroke="${j?'#d99532':'#3185ef'}" stroke-width="2.5"/>`).join('')}${d.labels.map((v,i)=>i%Math.ceil(d.labels.length/6)===0||i===d.labels.length-1?`<text x="${X(i)}" y="313" text-anchor="middle" fill="#8291a4" font-size="11">${v}</text>`:'').join('')}<text x="60" y="25" fill="#6a819c" font-size="12">${d.series[0].label} · 关键节点近似重绘</text></svg>`}
Object.assign(DIAGRAM_OVERRIDES,{'c4-b86':'market','c4-b105':'demandShift','c4-b113':'supplyShift','c4-b119':'both','c16-b16':'structures','c16-b102':'structures','c3-b12':'ppf'});
Object.assign(MODEL_NAMES,{ppfGrowth:'生产能力的扩张',demandSum:'个人需求与市场需求',supplySum:'个人供给与市场供给',alongDemand:'沿曲线移动与曲线移动',costLongRun:'短期与长期平均成本',longRunSupply:'图14-7 · 长期市场供给曲线',monopolyProfit:'垄断利润与无谓损失',firmDemand:'竞争企业与垄断企业的需求',profit:'图14-5 · 竞争企业的利润与亏损'});
Object.assign(DIAGRAM_OVERRIDES,{'c2-b43':'ppfGrowth','c4-b31':'demandSum','c4-b65':'supplySum','c4-b50':'alongDemand','c13-b88':'costLongRun','c14-b90':'longRunSupply','c14-b74':'profit','c15-b34':'firmDemand','c15-b72':'monopolyProfit','c15-b92':'monopolyProfit'});
function diagram(kind,v){if(SPLIT_FIGURE_MODELS[kind])return SPLIT_FIGURE_MODELS[kind](v);if(kind==='demandShortLongRun')return demandShortLongRunDiagram();if(kind==='longRunSupply')return longRunMarketSupplyDiagram();if(kind==='fixedMarketSupply')return fixedMarketSupplyDiagram(v);if(kind==='profit')return competitiveProfitDiagram();if(kind==='competitiveSupply')return competitiveSupplyDiagram(v);if(!['ppfGrowth','demandSum','supplySum','alongDemand','costLongRun','longRunSupply','monopolyProfit','firmDemand','profit'].includes(kind))return baseDiagram(kind,v);
const X=x=>65+x*4.8,Y=y=>305-y*2.5,blue='#3185ef',gold='#d99532',green='#289d83';
const line=(a,b,c,d,color=blue,dash=false)=>`<path d="M${X(a)},${Y(b)}L${X(c)},${Y(d)}" stroke="${color}" stroke-width="2.6" fill="none" ${dash?'stroke-dasharray="5 5"':''}/>`;
const text=(a,b,t,c=blue)=>`<text x="${X(a)}" y="${Y(b)}" font-size="12" fill="${c}">${t}</text>`;
const curve=(fn,c=blue,lo=5,hi=95)=>`<path d="${Array.from({length:61},(_,i)=>{const x=lo+(hi-lo)*i/60;return `${i?'L':'M'}${X(x)},${Y(fn(x))}`}).join(' ')}" fill="none" stroke="${c}" stroke-width="2.6"/>`;
const dot=(x,y,c=blue)=>`<circle cx="${X(x)}" cy="${Y(y)}" r="5" fill="${c}"/>`;
const poly=(pts,c=blue)=>`<polygon points="${pts.map(([x,y])=>X(x)+','+Y(y)).join(' ')}" fill="${c}" opacity=".18"/>`;
let s='',note='',x='数量',y='价格 / 成本';
if(kind==='ppfGrowth'){x='产品X';y='产品Y';s=curve(q=>70*(1-(q/75)**2),blue,0,75)+curve(q=>90*(1-(q/95)**2),gold,0,95)+text(5,74,'原边界')+text(25,87,'技术进步后',gold);note='资源或技术改善使生产可能性边界向外扩张。此图为两部门共同进步的示意；仅一部门技术改善时，扩张可不对称。'}
if(['demandSum','supplySum'].includes(kind)){const supply=kind==='supplySum';s=supply?line(0,10,50,90,blue)+line(0,10,100,90,gold):line(0,90,50,10,blue)+line(0,90,100,10,gold);s+=line(0,50,50,50,'#a9b8ca',true)+dot(25,50)+dot(50,50,gold)+text(6,77,'单个参与者')+text(55,supply?62:39,'市场合计',gold);note='假设市场只有两个相同的参与者。给定价格50，个人数量25，市场数量为25+25=50。市场曲线是数量的横向加总，不是价格相加。'}
if(kind==='alongDemand'){s=line(0,80,90,8)+line(15,95,100,27,gold,true)+dot(25,60)+dot(50,40)+text(15,67,'A')+text(50,47,'B')+dot(75,47,gold)+text(74,57,'C',gold);note='A→B：自身价格下降，沿同一需求曲线移动。蓝线→橙色虚线：收入、偏好等改变，需求曲线整体移动。示意点不使用教材数值。'}
if(kind==='costLongRun'){s=curveGroup('LRATC','长期平均成本',blue,curve(q=>22+.003*(q-50)**2,blue)+text(49,15,'长期平均成本',blue));for(const [i,center] of [25,50,75].entries()){const color=[gold,green,'#9b6dcc'][i];s+=curveGroup('SRATC'+i,['小规模工厂','中规模工厂','大规模工厂'][i],color,curve(q=>22+.003*(q-50)**2+.025*(q-center)**2,color,Math.max(1,center-23),Math.min(99,center+23)))}note='长期可以选择工厂规模，长期平均成本是所有可选短期成本曲线的下包络。图中仅展示三个规模及其接触点，长期蓝线假设还可选择连续的其他规模。'}
if(kind==='firmDemand'){s=line(0,55,100,55,blue)+line(0,90,100,10,gold)+text(4,61,'竞争企业：给定市场价格',blue)+text(55,35,'垄断：市场需求',gold);note='比较单个企业面临的需求：价格接受者面对水平线；垄断者面对向下倾斜的市场需求。不是把两类企业放在同一实际市场中。'}
if(['monopolyProfit','profit'].includes(kind)){const mc=q=>10+.7*q,atc=q=>600/q+10+.35*q;const q=kind==='profit'?50:80/2.3,p=kind==='profit'?45:90-.8*q,a=atc(q);s=curve(mc,gold,0,100)+curve(atc,green,9,100)+poly([[0,p],[q,p],[q,a],[0,a]],blue)+line(0,p,100,p,blue,true)+dot(q,p)+text(4,p+5,'价格',blue)+text(66,atc(66)+6,'ATC',green)+text(83,mc(83)+4,'MC',gold);if(kind==='monopolyProfit'){s+=line(0,90,100,10,blue)+line(0,90,56.25,0,'#97a8bf')+poly([[q,p],[q,mc(q)],[80/1.5,90-.8*(80/1.5)]],'#cf5c63')}note=kind==='profit'?'示意TC=600+10Q+0.35Q²，市场价格45，最优Q=50。阴影利润矩形=(P−ATC)×Q=275。':'D: P=90−0.8Q，MR=90−1.6Q，MC=10+0.7Q，TC=600+10Q+0.35Q²。蓝色矩形为利润，红色三角形为无谓损失；先按MR=MC选数量，再沿需求曲线定价。'}
const svg=`<svg class="model-svg" viewBox="0 0 620 355" role="img" aria-label="${MODEL_NAMES[kind]}"><defs><clipPath id="plot-${kind}"><rect x="65" y="55" width="480" height="250"/></clipPath></defs>${[0,25,50,75,100].map(t=>line(0,t,100,t,'#e6edf5')+`<text x="${X(t)}" y="324" text-anchor="middle" fill="#8a9bb0" font-size="11">${t}</text>`).join('')}<g clip-path="url(#plot-${kind})">${s}</g>${line(0,0,100,0,'#a3b2c4')}${line(0,0,0,100,'#a3b2c4')}<text x="65" y="30" fill="#72849c" font-size="12">${y}</text><text x="545" y="347" text-anchor="end" fill="#72849c" font-size="12">${x}</text></svg>`;
return {svg,stats:[],note}}

for(const id of ['c21-b118','c21-b150','c17-b76','c17-b81'])DATA_FIGURES[id].editorial=true;

// A distinct two-price comparison for textbook figure 14-2.
function competitiveSupplyDiagram(value=55){
 const p1=35,p2=Math.max(40,Math.min(75,Number(value))),quantity=p=>(1+Math.sqrt(1-.072*(30-p)))/.036;
 const q1=quantity(p1),q2=quantity(p2),X=q=>65+4.8*q,Y=p=>305-2.5*p;
 const blue='#3185ef',gold='#d99532',green='#289d83',muted='#796c5d';
 const line=(a,b,c,d,color,dash=false)=>`<path d="M${X(a)},${Y(b)}L${X(c)},${Y(d)}" fill="none" stroke="${color}" stroke-width="2.4" ${dash?'stroke-dasharray="4 4"':''}/>`;
 const text=(q,p,label,color=muted,anchor='start')=>`<text x="${X(q)}" y="${Y(p)}" fill="${color}" font-size="13" text-anchor="${anchor}">${label}</text>`;
 const curve=(fn,color,lo,hi)=>`<path d="${Array.from({length:101},(_,i)=>{const q=lo+(hi-lo)*i/100;return `${i?'L':'M'}${X(q)},${Y(fn(q))}`}).join(' ')}" fill="none" stroke="${color}" stroke-width="2.8"/>`;
 const avc=q=>30-.5*q+.006*q*q,atc=q=>200/q+avc(q),mc=q=>30-q+.018*q*q;
 let curves=curveGroup('MC','边际成本 MC',gold,curve(mc,gold,28,93)+text(93,mc(93)+3,'MC',gold))
 +curveGroup('ATC','平均总成本 ATC',blue,curve(atc,blue,7,93)+text(94,atc(93)+1,'ATC',blue))
 +curveGroup('AVC','平均可变成本 AVC',green,curve(avc,green,7,93)+text(94,avc(93)-4,'AVC',green));
 const guides=[[p1,q1,'₁'],[p2,q2,'₂']].map(([p,q,sub])=>line(0,p,q,p,muted,true)+line(q,0,q,p,muted,true)+`<circle cx="${X(q)}" cy="${Y(p)}" r="4" fill="${gold}"/>`+text(-3,p-1,'P'+sub,muted,'end')+text(q,-8,'Q'+sub,muted,'middle')).join('');
 return {svg:`<svg class="model-svg" viewBox="0 0 620 365" role="img" aria-label="${MODEL_NAMES.competitiveSupply}：价格从P₁上升至P₂，产量从Q₁增加至Q₂">${line(0,0,100,0,muted)}${line(0,0,0,100,muted)}${guides}${curves}${text(-3,-7,'0')}${text(0,108,'价格 / 成本')}${text(100,-19,'产量 Q',muted,'end')}</svg>`,stats:[['原价格 P₁',p1],['新价格 P₂',p2],['原产量 Q₁',q1.toFixed(1)],['新产量 Q₂',q2.toFixed(1)]],note:'价格由P₁上升至P₂，企业沿MC曲线将产量由Q₁增加至Q₂。短期供给曲线是MC位于最低AVC以上的部分。示意模型：TC=200+30Q−0.5Q²+0.006Q³；两组价格均高于最低AVC，数值不沿用原图。'};
}

function competitiveProfitValues(price){
 const q=(price-10)/.7,atc=600/q+10+.35*q,avc=10+.35*q;
 return {price,q,atc,avc,profit:(price-atc)*q};
}
function competitiveProfitDiagram(part){
 const blue='#3185ef',gold='#b87918',green='#25856e',red='#c45454',ink='#796c5d';
 function panel(price,loss){
  const {q,atc,profit}=competitiveProfitValues(price),X=q=>70+4.6*q,Y=p=>295-2.2*p;
  const title=loss?'（b）有亏损的企业':'（a）有利润的企业',color=loss?red:green;
  const line=(a,b,c,d,color,dash=false)=>`<path d="M${X(a)},${Y(b)}L${X(c)},${Y(d)}" fill="none" stroke="${color}" stroke-width="2.4" ${dash?'stroke-dasharray="4 4"':''}/>`;
  const text=(x,y,label,color=ink,anchor='start')=>`<text x="${x}" y="${y}" fill="${color}" font-size="14" text-anchor="${anchor}">${label}</text>`;
  const curve=(fn,c)=>`<path d="${Array.from({length:101},(_,i)=>{const x=8+i*.86;return `${i?'L':'M'}${X(x)},${Y(fn(x))}`}).join(' ')}" fill="none" stroke="${c}" stroke-width="2.8"/>`;
  const area=`<rect x="${X(0)}" y="${Y(Math.max(price,atc))}" width="${X(q)-X(0)}" height="${Math.abs(Y(price)-Y(atc))}" fill="${color}" fill-opacity=".24"/><title>${loss?'亏损':'利润'}面积：${Math.abs(profit).toFixed(2)}</title>`;
  const curves=curveGroup('MC','边际成本 MC',gold,curve(x=>10+.7*x,gold)+text(X(90),Y(73)-10,'MC',gold))
   +curveGroup('ATC','平均总成本 ATC',blue,curve(x=>600/x+10+.35*x,blue)+text(X(91),Y(600/91+10+.35*91)+20,'ATC',blue))
   +curveGroup('PRICE','价格 P = AR = MR',green,line(0,price,100,price,green)+text(X(70),Y(price)+19,'P = AR = MR',green));
  return `<section class="profit-panel" aria-label="${title}"><h4>${title}</h4><svg class="model-svg" viewBox="0 0 620 365" role="img" aria-label="${title}：MC与价格线交于Q，阴影表示${loss?'亏损':'利润'}">${area}${line(0,atc,q,atc,ink,true)}${line(q,0,q,Math.max(price,atc),ink,true)}${curves}${line(0,0,100,0,ink)}${line(0,0,0,100,ink)}<circle cx="${X(q)}" cy="${Y(price)}" r="4" fill="${green}"/>${text(70,40,'价格 / 成本')}${text(X(100),350,'产量',ink,'end')}${text(59,Y(price)+5,'P',green,'end')}${text(59,Y(atc)+5,'ATC',blue,'end')}${text(60,314,'0',ink,'end')}${text(X(q),318,'Q',ink,'middle')}${text(X(q/2),Y((price+atc)/2)+5,loss?'亏损':'利润',color,'middle')}</svg><p class="profit-equation">${loss?'亏损 =（ATC − P）× Q':'利润 =（P − ATC）× Q'}</p><p class="profit-description">${loss?'P &lt; ATC：总收益不足以弥补总成本，阴影为亏损。此例 P &gt; AVC，短期仍生产；长期退出。':'P &gt; ATC：价格高于平均总成本，阴影为正利润。'}</p></section>`;
 }
 return {svg:`<div class="profit-panels">${part===1?'':panel(55,false)}${part===0?'':panel(30,true)}</div>`,stats:[],note:'企业在 P = MC 处选择产量，阴影矩形的宽是 Q，高是价格与平均总成本的差额。示意成本 TC = 600 + 10Q + 0.35Q²；（a）P=55，（b）P=30，坐标数值不沿用原图。'};
}

MODEL_NAMES.fixedMarketSupply='图14-6 · 短期的市场供给曲线';
MODEL_CONFIG.fixedMarketSupply=['市场价格（美分）',50,250,100,'美分'];
DIAGRAM_OVERRIDES['c14-b82']='fixedMarketSupply';
function fixedMarketSupplyValues(cents=100){const price=Math.max(50,Math.min(250,Number(cents)))/100;return {price,firm:100*price,market:100000*price,firms:1000}}
function fixedMarketSupplyDiagram(cents=100,part){
 const values=fixedMarketSupplyValues(cents),blue='#3185ef',gold='#b87918',green='#25856e',ink='#796c5d';
 function panel(market){
  const factor=market?1000:1,title=market?'（b）市场供给曲线':'（a）单个企业的供给曲线';
  const X=q=>70+q/300*470,Y=p=>305-p*82;
  const text=(x,y,t,c=ink,anchor='start')=>`<text x="${x}" y="${y}" fill="${c}" font-size="14" text-anchor="${anchor}">${t}</text>`;
  const line=(q1,p1,q2,p2,c,dash=false)=>`<path d="M${X(q1)},${Y(p1)}L${X(q2)},${Y(p2)}" fill="none" stroke="${c}" stroke-width="2.4" ${dash?'stroke-dasharray="4 4"':''}/>`;
  const guide=(price,color)=>line(0,price,price*100,price,color,true)+line(price*100,0,price*100,price,color,true)+`<circle cx="${X(price*100)}" cy="${Y(price)}" r="4" fill="${color}"/>`;
  const color=market?gold:blue;
  return `<section class="profit-panel supply-panel" aria-label="${title}"><h4>${title}</h4><svg class="model-svg" viewBox="0 0 620 380" role="img" aria-label="${title}：1美元对应${100*factor}，2美元对应${200*factor}">${line(0,0,300,0,ink)}${line(0,0,0,3,ink)}${[1,2].map(p=>guide(p,ink)+text(59,Y(p)+5,p.toFixed(2),ink,'end')+text(X(p*100),329,String(p*100*factor),ink,'middle')).join('')}${line(25,.25,270,2.7,color)}${text(X(270),Y(2.7)-10,market?'供给':'MC',color)}${guide(values.price,green)}${text(70,35,'价格（美元）')}${text(58,324,'0',ink,'end')}${text(540,365,market?'产量（市场）':'产量（企业）',ink,'end')}</svg><p class="profit-equation">${market?'市场供给量 = 1000 × 单个企业供给量':'价格 = 边际成本（MC）'}</p><p class="profit-description">${market?'价格1美元：100000；价格2美元：200000。':'价格1美元：100；价格2美元：200。'}</p></section>`;
 }
 return {svg:`<div class="profit-panels supply-panels">${part===1?'':panel(false)}${part===0?'':panel(true)}</div>`,stats:[['当前价格（美元）',values.price.toFixed(2)],['单个企业供给量',values.firm.toFixed(0)],['企业数量',values.firms],['市场供给量',values.market.toFixed(0)]],note:'短期内固定有1000家相同企业，市场供给量是各企业供给量的横向加总。绿色虚线标示当前价格；两图横轴刻度不同。假设演示范围内价格高于平均可变成本，各企业沿MC曲线供给。'};
}

// Figure 14-7: firm zero-profit equilibrium and the corresponding market supply.
function longRunMarketSupplyDiagram(part){
 const blue='#3185ef',gold='#b87918',green='#25856e',ink='#796c5d';
 const qStar=Math.sqrt(600/.35),price=costValues(qStar).atc;
 function panel(market){
  const title=market?'（b）市场供给':'（a）企业零利润的状况';
  const X=q=>112+q*4.3,Y=p=>300-p*2.7;
  const text=(x,y,t,c=ink,anchor='start')=>`<text x="${x}" y="${y}" fill="${c}" font-size="14" text-anchor="${anchor}">${t}</text>`;
  const line=(q1,p1,q2,p2,c,dash=false)=>`<path d="M${X(q1)},${Y(p1)}L${X(q2)},${Y(p2)}" fill="none" stroke="${c}" stroke-width="2.4" ${dash?'stroke-dasharray="5 5"':''}/>`;
  const curve=(fn,c,lo,hi)=>`<path d="${Array.from({length:101},(_,i)=>{const q=lo+(hi-lo)*i/100;return `${i?'L':'M'}${X(q)},${Y(fn(q))}`}).join(' ')}" fill="none" stroke="${c}" stroke-width="2.8"/>`;
  const curves=market
   ?curveGroup('LRSupply','长期市场供给',gold,line(0,price,100,price,gold)+text(X(100)-4,Y(price)-12,'供给',gold,'end'))
   :curveGroup('ATC','平均总成本 ATC',blue,curve(q=>costValues(q).atc,blue,11,93)+text(X(93),Y(costValues(93).atc)-12,'ATC',blue))
    +curveGroup('MC','边际成本 MC',gold,curve(q=>costValues(q).mc,gold,7,88)+text(X(88),Y(costValues(88).mc)-12,'MC',gold))
    +line(0,price,100,price,green,true)
    +line(qStar,0,qStar,price,ink,true)
    +`<circle cx="${X(qStar)}" cy="${Y(price)}" r="4" fill="${green}"/>`
    +text(X(qStar),325,'有效规模',ink,'middle');
  return `<section class="profit-panel supply-panel" aria-label="${title}"><h4>${title}</h4><svg class="model-svg" viewBox="0 0 620 380" role="img" aria-label="${market?'市场长期供给曲线在最低平均总成本处呈水平线':'边际成本MC穿过平均总成本ATC的最低点，价格等于二者，企业经济利润为零'}">${line(0,0,100,0,ink)}${line(0,0,0,90,ink)}${text(112,35,'价格')}${text(102,321,'O',ink,'end')}${text(542,365,market?'产量（市场）':'产量（企业）',ink,'end')}${text(100,Y(price)-5,'P = 最低',green,'end')}${text(100,Y(price)+14,'ATC',green,'end')}${curves}</svg><p class="profit-equation">${market?'长期供给价格 = 最低平均总成本':'P = MC = 最低 ATC'}</p><p class="profit-description">${market?'企业数量随进入与退出调整，满足这一价格下的市场需求。':'企业在有效规模上生产，经济利润为零。'}</p></section>`;
 }
 return {svg:`<div class="profit-panels supply-panels">${part===1?'':panel(false)}${part===0?'':panel(true)}</div>`,stats:[],note:'假设企业具有相同成本、可以自由进入与退出，且行业扩张不改变成本。长期均衡中，价格等于最低平均总成本，市场供给曲线为水平线。'};
}

MODEL_NAMES.demandShortLongRun='图14-8 · 短期和长期内的需求增加';
DIAGRAM_OVERRIDES['c14-b99']='demandShortLongRun';
function demandShortLongRunDiagram(part){
 const blue='#3185ef',gold='#b87918',green='#25856e',red='#bf636a',ink='#796c5d';
 const qMin=Math.sqrt(600/.35),offset=40-costValues(qMin).atc;
 const atc=q=>costValues(q).atc+offset,mc=q=>costValues(q).mc+offset;
 const qShort=(56-10-offset)/.7;
 const stages=[['（a）最初的状况','市场处于长期均衡 A，价格为 P₁，市场产量为 Q₁；每家企业在最低平均总成本处生产，经济利润为零。'],['（b）短期的反应','需求从 D₁ 增加到 D₂，均衡从 A 移至 B，价格升至 P₂，市场产量增至 Q₂。现有企业增加产量，并获得正的经济利润。'],['（c）长期的反应','利润吸引新企业进入，短期供给从 S₁ 增加到 S₂，均衡移至 C。价格回到 P₁，市场产量增至 Q₃；每家企业恢复有效规模，经济利润归零。']];
 function panel(stage,firm){
  const X=q=>68+4.65*q,Y=p=>286-2.45*p;
  const text=(x,y,t,c=ink,anchor='start')=>`<text x="${x}" y="${y}" fill="${c}" font-size="14" text-anchor="${anchor}">${t}</text>`;
  const line=(q,p,r,t,c,dash=false)=>`<path d="M${X(q)},${Y(p)}L${X(r)},${Y(t)}" fill="none" stroke="${c}" stroke-width="2.5" ${dash?'stroke-dasharray="5 5"':''}/>`;
  const curve=(fn,c,lo,hi)=>`<path d="${Array.from({length:101},(_,i)=>{const q=lo+(hi-lo)*i/100;return `${i?'L':'M'}${X(q)},${Y(fn(q))}`}).join(' ')}" fill="none" stroke="${c}" stroke-width="2.8"/>`;
  const dot=(q,p,label,c=ink)=>`<circle cx="${X(q)}" cy="${Y(p)}" r="4" fill="${c}"/>`+text(X(q)-6,Y(p)-12,label,c,'end');
  let drawing='',labels='';
  if(firm){
   const price=stage===1?56:40,q=stage===1?qShort:qMin;
   if(stage===1)drawing+=`<rect x="${X(0)}" y="${Y(price)}" width="${X(q)-X(0)}" height="${Y(atc(q))-Y(price)}" fill="${green}" opacity=".2"/>`+line(0,atc(q),q,atc(q),ink,true)+text(X(20),Y(49),'利润',green);
   drawing+=curveGroup('ATC','平均总成本 ATC',blue,curve(atc,blue,10,91)+text(X(91),Y(atc(91))-10,'ATC',blue))
    +curveGroup('MC','边际成本 MC',gold,curve(mc,gold,5,88)+text(X(88),Y(mc(88))-10,'MC',gold))
    +line(0,40,100,40,green,stage===1)+line(q,0,q,price,ink,true)+dot(q,price,'',green);
   if(stage===1)drawing+=line(0,56,100,56,red);
   labels+=text(X(q),311,stage===1?'q₂':'q₁',ink,'middle');
  }else{
   drawing+=curveGroup('D1','原需求 D₁',blue,line(0,64,80,0,blue,stage>0)+text(X(77),Y(7),'D₁',blue))
    +curveGroup('S1','原短期供给 S₁',gold,line(0,16,82,81.6,gold,stage===2)+text(X(82),Y(81.6)-10,'S₁',gold))
    +curveGroup('LRSupply','长期供给',green,line(0,40,100,40,green)+text(X(100),Y(40)+19,'长期供给',green,'end'));
   if(stage>0)drawing+=curveGroup('D2','增加后的需求 D₂',blue,line(10,88,100,16,blue)+text(X(96),Y(19)-8,'D₂',blue));
   if(stage===2)drawing+=curveGroup('S2','进入后的短期供给 S₂',red,line(20,0,100,64,red)+text(X(100)-2,Y(64)-10,'S₂',red,'end'));
   const points=[[30,40,'A','Q₁'],...(stage>0?[[50,56,'B','Q₂']]:[]),...(stage===2?[[70,40,'C','Q₃']]:[])];
   for(const [q,p,label,tick] of points){drawing+=line(q,0,q,p,ink,true)+dot(q,p,label);labels+=text(X(q),311,tick,ink,'middle')}
   if(stage>0)drawing+=line(0,56,50,56,ink,true);
  }
  const title=firm?'企业':'市场';
  return `<section class="profit-panel"><h4>${title}</h4><svg class="model-svg" viewBox="0 0 620 355" role="img" aria-label="${stages[stage][0]}：${title}">${drawing}${line(0,0,100,0,ink)}${line(0,0,0,94,ink)}${text(68,30,'价格')}${text(54,306,'O',ink,'end')}${text(55,Y(40)+5,'P₁',green,'end')}${stage>0&&(!firm||stage===1)?text(55,Y(56)+5,'P₂',ink,'end'):''}${labels}${text(533,343,firm?'产量（企业）':'产量（市场）',ink,'end')}</svg></section>`;
 }
 return {svg:stages.map(([title,description],stage)=>part!==undefined&&stage!==part?'':`<section class="demand-stage"><h4>${title}</h4><div class="profit-panels">${panel(stage,false)}${panel(stage,true)}</div><p class="profit-description">${description}</p></section>`).join(''),stats:[],note:'假设企业成本相同、可以自由进入与退出，且行业扩张不改变成本。Q 表示市场产量，q 表示单个企业产量；长期市场产量增加来自企业数量增加。'};
}

// Separate reading figures share the same model as the complete reference figure.
const SPLIT_FIGURE_MODELS={};
for(const [base,labels,draw] of [
 ['profit',['（a）有利润的企业','（b）有亏损的企业'],(_,part)=>competitiveProfitDiagram(part)],
 ['fixedMarketSupply',['（a）单个企业的供给曲线','（b）市场供给曲线'],(value,part)=>fixedMarketSupplyDiagram(value,part)],
 ['longRunSupply',['（a）企业零利润的状况','（b）市场供给'],(_,part)=>longRunMarketSupplyDiagram(part)],
 ['demandShortLongRun',['（a）最初的状况','（b）短期的反应','（c）长期的反应'],(_,part)=>demandShortLongRunDiagram(part)]
])labels.forEach((label,part)=>{
 const kind=base+'Part'+part;
 SPLIT_FIGURE_MODELS[kind]=value=>draw(value,part);
 MODEL_NAMES[kind]=MODEL_NAMES[base].split(' · ')[0]+' '+label;
 if(MODEL_CONFIG[base])MODEL_CONFIG[kind]=MODEL_CONFIG[base];
});
