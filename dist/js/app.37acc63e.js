(function(t){function a(a){for(var n,s,o=a[0],u=a[1],c=a[2],d=0,f=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&f.push(r[s][0]),r[s]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);l&&l(a);while(f.length)f.shift()();return i.push.apply(i,c||[]),e()}function e(){for(var t,a=0;a<i.length;a++){for(var e=i[a],n=!0,o=1;o<e.length;o++){var u=e[o];0!==r[u]&&(n=!1)}n&&(i.splice(a--,1),t=s(s.s=e[0]))}return t}var n={},r={app:0},i=[];function s(a){if(n[a])return n[a].exports;var e=n[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,s),e.l=!0,e.exports}s.m=t,s.c=n,s.d=function(t,a,e){s.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:e})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,a){if(1&a&&(t=s(t)),8&a)return t;if(4&a&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(s.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var n in t)s.d(e,n,function(a){return t[a]}.bind(null,n));return e},s.n=function(t){var a=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(a,"a",a),a},s.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=a,o=o.slice();for(var c=0;c<o.length;c++)a(o[c]);var l=u;i.push([0,"chunk-vendors"]),e()})({0:function(t,a,e){t.exports=e("56d7")},"034f":function(t,a,e){"use strict";var n=e("85ec"),r=e.n(n);r.a},"283f":function(t,a,e){"use strict";var n=e("2e1b"),r=e.n(n);r.a},"2e1b":function(t,a,e){},3531:function(t,a,e){"use strict";var n=e("4f72"),r=e.n(n);r.a},"4f72":function(t,a,e){},"56d7":function(t,a,e){"use strict";e.r(a);e("e260"),e("e6cf"),e("cca6"),e("a79d");var n=e("2b0e"),r=e("a66e"),i=(e("98e8"),e("7ef0"),function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{style:{backgroundColor:"#"+t.bgd},attrs:{id:"app"}},[e("Header"),e("b-row",{attrs:{id:"dispinfo"}},[e("b-col",{staticClass:"mr-auto ml-auto",attrs:{id:"surahname",sm:"4"}},[t._v(t._s(t.info.data[0].number)+". "+t._s(t.info.data[0].englishName)+" ("+t._s(t.info.data[0].englishNameTranslation)+")")]),e("b-col",{staticClass:"mr-auto ml-auto",attrs:{id:"ayahindex",sm:"6"}},[e("b-input",{staticClass:"ml-sm-auto",attrs:{id:"ayahindexin",value:t.index},model:{value:t.index,callback:function(a){t.index=a},expression:"index"}})],1)],1),e("b-container",{staticClass:"bv-example-row",attrs:{id:"extcon"}},[e("b-row",{attrs:{id:"outter"}},[e("b-col",{staticClass:"mr-auto ml-auto my-auto",attrs:{sm:"8",offset:"2"}},[t.info.data?e("DataBox",{attrs:{inputdataEn:t.info.data[0].ayahs[t.index],inputdataAr:t.info.data[1].ayahs[t.index],numberOfAyahs:this.numberOfAyahs,change:this.change,next:t.next,randomize:t.randomize,qoh:!1}}):t._e()],1)],1),t.info.data?e("Player",{attrs:{audioUrl:t.info.data[1].ayahs[t.index].audio}}):t._e()],1)],1)}),s=[],o=(e("d3b7"),function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"nana"}},[e("b-nav",[e("b-nav-item",[t._v("An Ayah A day")])],1)],1)}),u=[],c=(e("283f"),e("2877")),l={},d=Object(c["a"])(l,o,u,!1,null,"5413273c",null),f=d.exports,p=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"p-5",attrs:{id:"bgb"}},[t.qoh?e("div",{attrs:{id:"Hadith"}},[t._v(" "+t._s(t.inputdataAr.text)+" ")]):t._e(),e("b-row",{staticClass:"p10 ",attrs:{"align-v":"center"}},[e("b-col",{staticClass:"mytext",attrs:{md:"6"}},[e("b-card",{attrs:{id:"ar",align:"right"}},[e("b-card-text",{attrs:{id:"arabic"}},[t._v(t._s(t.inputdataAr.text))])],1)],1),e("hr",{staticClass:"my-4"}),e("b-col",{staticClass:"mytext",attrs:{md:"6"}},[e("b-card",{attrs:{id:"en",align:"left"}},[e("b-card-text",{style:{fontSize:t.fonty(t.inputdataEn.text)},attrs:{id:"english"}},[t._v(t._s(t.inputdataEn.text))])],1)],1)],1),e("b-row",{attrs:{"align-h":"center"}},[e("b-col",{attrs:{cols:"6","align-self":"end"}},[e("b-button",{attrs:{variant:"primary"},on:{click:t.next}},[t._v("Next")]),e("b-button",{attrs:{variant:[1==t.change?"primary":"info"]},on:{click:t.randomize}},[e("span",{directives:[{name:"show",rawName:"v-show",value:1==t.change,expression:"change==1 ? true :false"}],staticClass:"change"},[e("b-spinner",{attrs:{small:""}}),t._v("Loading ")],1),e("span",{directives:[{name:"show",rawName:"v-show",value:0==t.change,expression:"change==0"}]},[t._v("Random")])])],1)],1)],1)},h=[],b=(e("a9e3"),{props:{inputdataAr:Object,inputdataEn:Object,next:Function,randomize:Function,numberOfAyahs:Number,change:Number,hadith:Object,qoh:Boolean},computed:{more_info:function(){return console.log("stuff could happen here"),"info"}},methods:{fonty:function(t){return t.length<170?"21px":"17px"}}}),m=b,y=(e("837c"),Object(c["a"])(m,p,h,!1,null,"fc227066",null)),v=y.exports,g=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("b-row",{attrs:{"align-h":"center"}},[e("b-col",{staticClass:"player",attrs:{cols:"6","align-self":"end"}},[e("audio",{ref:"audplay",attrs:{controls:""}},[e("source",{attrs:{src:t.aud,type:"audio/mpeg"}}),t._v("Your browser does not support the audio element. ")]),e("br"),e("b-button",{staticClass:"p10",attrs:{variant:"primary"},on:{click:t.pause}},[t._v("Pause/Play")])],1)],1)},x=[],_={data:function(){return{aud:this.audioUrl}},props:{audioUrl:String},methods:{pause:function(){this.$refs.audplay.paused?this.$refs.audplay.play():this.$refs.audplay.pause()},update:function(){return this.$refs.audplay.src=this.audioUrl,this.$refs.audplay.play(),this.audioUrl}},watch:{audioUrl:function(){this.$refs.audplay.paused?(this.$refs.audplay.src=this.audioUrl,this.$refs.audplay.play(),this.$refs.audplay.pause()):(this.$refs.audplay.src=this.audioUrl,this.$refs.audplay.pause(),this.$refs.audplay.play())}}},O=_,w=(e("3531"),Object(c["a"])(O,g,x,!1,null,"5db0cf8e",null)),j=w.exports,$={name:"App",components:{Header:f,DataBox:v,Player:j},data:function(){return{info:{},index:0,bgd:0,numberOfAyahs:0,change:0,hadith:{}}},methods:{next:function(){this.index++},randomize:function(){var t=this.randomint(0,114),a="https://api.alquran.cloud/v1/surah/".concat(t,"/editions/en.yusufali,ar.alafasy");this.getdata(a,0),console.log(a)},randomint:function(t,a){return Math.floor(Math.random()*(a-t+1)+t)},getdata:function(t,a){var e=this;this.change=1,fetch(t,{method:"get"}).then((function(t){return t.json()})).then((function(t){0==a?void 0!=t.data[0].numberOfAyahs?(e.info=t,e.numberOfAyahs=t.data[0].numberOfAyahs,e.index=e.randomint(0,e.numberOfAyahs-1),e.change=0):e.change=2:e.hadith=t}))},bg:function(){return this.bgd()}},mounted:function(){this.randomize()}},A=$,C=(e("034f"),Object(c["a"])(A,i,s,!1,null,null,null)),P=C.exports;n["default"].use(r["a"]),n["default"].config.productionTip=!1,new n["default"]({render:function(t){return t(P)}}).$mount("#app")},"837c":function(t,a,e){"use strict";var n=e("9220"),r=e.n(n);r.a},"85ec":function(t,a,e){},9220:function(t,a,e){}});
//# sourceMappingURL=app.37acc63e.js.map