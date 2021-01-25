// Cart.js
// version: 1.1.0
// author: Gavin Ballard
// license: MIT
(function(){function a(a,c,d,e){return new b(a,c,d,e)}function b(a,b,d,e){this.options=e||{},this.options.adapters=this.options.adapters||{},this.obj=a,this.keypath=b,this.callback=d,this.objectPath=[],this.update=this.update.bind(this),this.parse(),c(this.target=this.realize())&&this.set(!0,this.key,this.target,this.callback)}function c(a){return"object"==typeof a&&null!==a}function d(a){throw new Error("[sightglass] "+a)}a.adapters={},b.tokenize=function(a,b,c){var d,e,f=[],g={i:c,path:""};for(d=0;d<a.length;d++)e=a.charAt(d),~b.indexOf(e)?(f.push(g),g={i:e,path:""}):g.path+=e;return f.push(g),f},b.prototype.parse=function(){var c,e,f=this.interfaces();f.length||d("Must define at least one adapter interface."),~f.indexOf(this.keypath[0])?(c=this.keypath[0],e=this.keypath.substr(1)):("undefined"==typeof(c=this.options.root||a.root)&&d("Must define a default root adapter."),e=this.keypath),this.tokens=b.tokenize(e,f,c),this.key=this.tokens.pop()},b.prototype.realize=function(){var a,b=this.obj,d=!1;return this.tokens.forEach(function(e,f){c(b)?("undefined"!=typeof this.objectPath[f]?b!==(a=this.objectPath[f])&&(this.set(!1,e,a,this.update),this.set(!0,e,b,this.update),this.objectPath[f]=b):(this.set(!0,e,b,this.update),this.objectPath[f]=b),b=this.get(e,b)):(d===!1&&(d=f),(a=this.objectPath[f])&&this.set(!1,e,a,this.update))},this),d!==!1&&this.objectPath.splice(d),b},b.prototype.update=function(){var a,b;(a=this.realize())!==this.target&&(c(this.target)&&this.set(!1,this.key,this.target,this.callback),c(a)&&this.set(!0,this.key,a,this.callback),b=this.value(),this.target=a,(this.value()instanceof Function||this.value()!==b)&&this.callback())},b.prototype.value=function(){return c(this.target)?this.get(this.key,this.target):void 0},b.prototype.setValue=function(a){c(this.target)&&this.adapter(this.key).set(this.target,this.key.path,a)},b.prototype.get=function(a,b){return this.adapter(a).get(b,a.path)},b.prototype.set=function(a,b,c,d){var e=a?"observe":"unobserve";this.adapter(b)[e](c,b.path,d)},b.prototype.interfaces=function(){var b=Object.keys(this.options.adapters);return Object.keys(a.adapters).forEach(function(a){~b.indexOf(a)||b.push(a)}),b},b.prototype.adapter=function(b){return this.options.adapters[b.i]||a.adapters[b.i]},b.prototype.unobserve=function(){var a;this.tokens.forEach(function(b,c){(a=this.objectPath[c])&&this.set(!1,b,a,this.update)},this),c(this.target)&&this.set(!1,this.key,this.target,this.callback)},"undefined"!=typeof module&&module.exports?module.exports=a:"function"==typeof define&&define.amd?define([],function(){return this.sightglass=a}):this.sightglass=a}).call(this),function(){var a,b,c,d,e=function(a,b){return function(){return a.apply(b,arguments)}},f=[].slice,g={}.hasOwnProperty,h=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},i=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};a={options:["prefix","templateDelimiters","rootInterface","preloadData","handler"],extensions:["binders","formatters","components","adapters"],"public":{binders:{},components:{},formatters:{},adapters:{},prefix:"rv",templateDelimiters:["{","}"],rootInterface:".",preloadData:!0,handler:function(a,b,c){return this.call(a,b,c.view.models)},configure:function(b){var c,d,e,f;null==b&&(b={});for(e in b)if(f=b[e],"binders"===e||"components"===e||"formatters"===e||"adapters"===e)for(d in f)c=f[d],a[e][d]=c;else a["public"][e]=f},bind:function(b,c,d){var e;return null==c&&(c={}),null==d&&(d={}),e=new a.View(b,c,d),e.bind(),e},init:function(b,c,d){var e,f;return null==d&&(d={}),null==c&&(c=document.createElement("div")),b=a["public"].components[b],c.innerHTML=b.template.call(this,c),e=b.initialize.call(this,c,d),f=new a.View(c,e),f.bind(),f}}},window.jQuery||window.$?(d="on"in jQuery.prototype?["on","off"]:["bind","unbind"],b=d[0],c=d[1],a.Util={bindEvent:function(a,c,d){return jQuery(a)[b](c,d)},unbindEvent:function(a,b,d){return jQuery(a)[c](b,d)},getInputValue:function(a){var b;return b=jQuery(a),"checkbox"===b.attr("type")?b.is(":checked"):b.val()}}):a.Util={bindEvent:function(){return"addEventListener"in window?function(a,b,c){return a.addEventListener(b,c,!1)}:function(a,b,c){return a.attachEvent("on"+b,c)}}(),unbindEvent:function(){return"removeEventListener"in window?function(a,b,c){return a.removeEventListener(b,c,!1)}:function(a,b,c){return a.detachEvent("on"+b,c)}}(),getInputValue:function(a){var b,c,d,e;if("checkbox"===a.type)return a.checked;if("select-multiple"===a.type){for(e=[],c=0,d=a.length;d>c;c++)b=a[c],b.selected&&e.push(b.value);return e}return a.value}},a.TypeParser=function(){function a(){}return a.types={primitive:0,keypath:1},a.parse=function(a){return/^'.*'$|^".*"$/.test(a)?{type:this.types.primitive,value:a.slice(1,-1)}:"true"===a?{type:this.types.primitive,value:!0}:"false"===a?{type:this.types.primitive,value:!1}:"null"===a?{type:this.types.primitive,value:null}:"undefined"===a?{type:this.types.primitive,value:void 0}:isNaN(Number(a))===!1?{type:this.types.primitive,value:Number(a)}:{type:this.types.keypath,value:a}},a}(),a.TextTemplateParser=function(){function a(){}return a.types={text:0,binding:1},a.parse=function(a,b){var c,d,e,f,g,h,i;for(h=[],f=a.length,c=0,d=0;f>d;){if(c=a.indexOf(b[0],d),0>c){h.push({type:this.types.text,value:a.slice(d)});break}if(c>0&&c>d&&h.push({type:this.types.text,value:a.slice(d,c)}),d=c+b[0].length,c=a.indexOf(b[1],d),0>c){g=a.slice(d-b[1].length),e=h[h.length-1],(null!=e?e.type:void 0)===this.types.text?e.value+=g:h.push({type:this.types.text,value:g});break}i=a.slice(d,c).trim(),h.push({type:this.types.binding,value:i}),d=c+b[1].length}return h},a}(),a.View=function(){function b(b,c,d){var f,g,h,i,j,k,l,m,n,o,p,q,r;for(this.els=b,this.models=c,null==d&&(d={}),this.update=e(this.update,this),this.publish=e(this.publish,this),this.sync=e(this.sync,this),this.unbind=e(this.unbind,this),this.bind=e(this.bind,this),this.select=e(this.select,this),this.traverse=e(this.traverse,this),this.build=e(this.build,this),this.buildBinding=e(this.buildBinding,this),this.bindingRegExp=e(this.bindingRegExp,this),this.options=e(this.options,this),this.els.jquery||this.els instanceof Array||(this.els=[this.els]),n=a.extensions,j=0,l=n.length;l>j;j++){if(g=n[j],this[g]={},d[g]){o=d[g];for(f in o)h=o[f],this[g][f]=h}p=a["public"][g];for(f in p)h=p[f],null==(i=this[g])[f]&&(i[f]=h)}for(q=a.options,k=0,m=q.length;m>k;k++)g=q[k],this[g]=null!=(r=d[g])?r:a["public"][g];this.build()}return b.prototype.options=function(){var b,c,d,e,f;for(c={},f=a.extensions.concat(a.options),d=0,e=f.length;e>d;d++)b=f[d],c[b]=this[b];return c},b.prototype.bindingRegExp=function(){return new RegExp("^"+this.prefix+"-")},b.prototype.buildBinding=function(b,c,d,e){var f,g,h,i,j,k,l;return j={},l=function(){var a,b,c,d;for(c=e.split("|"),d=[],a=0,b=c.length;b>a;a++)k=c[a],d.push(k.trim());return d}(),f=function(){var a,b,c,d;for(c=l.shift().split("<"),d=[],a=0,b=c.length;b>a;a++)g=c[a],d.push(g.trim());return d}(),i=f.shift(),j.formatters=l,(h=f.shift())&&(j.dependencies=h.split(/\s+/)),this.bindings.push(new a[b](this,c,d,i,j))},b.prototype.build=function(){var b,c,d,e,f;for(this.bindings=[],c=function(b){return function(d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r;if(3===d.nodeType){if(i=a.TextTemplateParser,(g=b.templateDelimiters)&&(l=i.parse(d.data,g)).length&&(1!==l.length||l[0].type!==i.types.text)){for(m=0,o=l.length;o>m;m++)k=l[m],j=document.createTextNode(k.value),d.parentNode.insertBefore(j,d),1===k.type&&b.buildBinding("TextBinding",j,null,k.value);d.parentNode.removeChild(d)}}else 1===d.nodeType&&(e=b.traverse(d));if(!e){for(q=function(){var a,b,c,e;for(c=d.childNodes,e=[],a=0,b=c.length;b>a;a++)h=c[a],e.push(h);return e}(),r=[],n=0,p=q.length;p>n;n++)f=q[n],r.push(c(f));return r}}}(this),f=this.els,d=0,e=f.length;e>d;d++)b=f[d],c(b);this.bindings.sort(function(a,b){var c,d;return((null!=(c=b.binder)?c.priority:void 0)||0)-((null!=(d=a.binder)?d.priority:void 0)||0)})},b.prototype.traverse=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;for(f=this.bindingRegExp(),g="SCRIPT"===b.nodeName||"STYLE"===b.nodeName,p=b.attributes,l=0,n=p.length;n>l;l++)if(c=p[l],f.test(c.name)){if(j=c.name.replace(f,""),!(e=this.binders[j])){q=this.binders;for(h in q)k=q[h],"*"!==h&&-1!==h.indexOf("*")&&(i=new RegExp("^"+h.replace(/\*/g,".+")+"$"),i.test(j)&&(e=k))}e||(e=this.binders["*"]),e.block&&(g=!0,d=[c])}for(r=d||b.attributes,m=0,o=r.length;o>m;m++)c=r[m],f.test(c.name)&&(j=c.name.replace(f,""),this.buildBinding("Binding",b,j,c.value));return g||(j=b.nodeName.toLowerCase(),this.components[j]&&!b._bound&&(this.bindings.push(new a.ComponentBinding(this,b,j)),g=!0)),g},b.prototype.select=function(a){var b,c,d,e,f;for(e=this.bindings,f=[],c=0,d=e.length;d>c;c++)b=e[c],a(b)&&f.push(b);return f},b.prototype.bind=function(){var a,b,c,d,e;for(d=this.bindings,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.bind());return e},b.prototype.unbind=function(){var a,b,c,d,e;for(d=this.bindings,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.unbind());return e},b.prototype.sync=function(){var a,b,c,d,e;for(d=this.bindings,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push("function"==typeof a.sync?a.sync():void 0);return e},b.prototype.publish=function(){var a,b,c,d,e;for(d=this.select(function(a){var b;return null!=(b=a.binder)?b.publishes:void 0}),e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.publish());return e},b.prototype.update=function(a){var b,c,d,e,f,g,h;null==a&&(a={});for(c in a)d=a[c],this.models[c]=d;for(g=this.bindings,h=[],e=0,f=g.length;f>e;e++)b=g[e],h.push("function"==typeof b.update?b.update(a):void 0);return h},b}(),a.Binding=function(){function b(a,b,c,d,f){this.view=a,this.el=b,this.type=c,this.keypath=d,this.options=null!=f?f:{},this.getValue=e(this.getValue,this),this.update=e(this.update,this),this.unbind=e(this.unbind,this),this.bind=e(this.bind,this),this.publish=e(this.publish,this),this.sync=e(this.sync,this),this.set=e(this.set,this),this.eventHandler=e(this.eventHandler,this),this.formattedValue=e(this.formattedValue,this),this.parseTarget=e(this.parseTarget,this),this.observe=e(this.observe,this),this.setBinder=e(this.setBinder,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.formatterObservers={},this.model=void 0,this.setBinder()}return b.prototype.setBinder=function(){var a,b,c,d;if(!(this.binder=this.view.binders[this.type])){d=this.view.binders;for(a in d)c=d[a],"*"!==a&&-1!==a.indexOf("*")&&(b=new RegExp("^"+a.replace(/\*/g,".+")+"$"),b.test(this.type)&&(this.binder=c,this.args=new RegExp("^"+a.replace(/\*/g,"(.+)")+"$").exec(this.type),this.args.shift()))}return this.binder||(this.binder=this.view.binders["*"]),this.binder instanceof Function?this.binder={routine:this.binder}:void 0},b.prototype.observe=function(b,c,d){return a.sightglass(b,c,d,{root:this.view.rootInterface,adapters:this.view.adapters})},b.prototype.parseTarget=function(){var b;return b=a.TypeParser.parse(this.keypath),0===b.type?this.value=b.value:(this.observer=this.observe(this.view.models,this.keypath,this.sync),this.model=this.observer.target)},b.prototype.formattedValue=function(b){var c,d,e,g,h,i,j,k,l,m,n,o,p,q;for(q=this.formatters,g=m=0,o=q.length;o>m;g=++m){for(h=q[g],e=h.match(/[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g),i=e.shift(),h=this.view.formatters[i],e=function(){var b,c,f;for(f=[],b=0,c=e.length;c>b;b++)d=e[b],f.push(a.TypeParser.parse(d));return f}(),k=[],c=n=0,p=e.length;p>n;c=++n)d=e[c],k.push(0===d.type?d.value:((l=this.formatterObservers)[g]||(l[g]={}),(j=this.formatterObservers[g][c])?void 0:(j=this.observe(this.view.models,d.value,this.sync),this.formatterObservers[g][c]=j),j.value()));(null!=h?h.read:void 0)instanceof Function?b=h.read.apply(h,[b].concat(f.call(k))):h instanceof Function&&(b=h.apply(null,[b].concat(f.call(k))))}return b},b.prototype.eventHandler=function(a){var b,c;return c=(b=this).view.handler,function(d){return c.call(a,this,d,b)}},b.prototype.set=function(a){var b;return a=this.formattedValue(a instanceof Function&&!this.binder["function"]?a.call(this.model):a),null!=(b=this.binder.routine)?b.call(this,this.el,a):void 0},b.prototype.sync=function(){var a,b;return this.set(function(){var c,d,e,f,g,h,i;if(this.observer){if(this.model!==this.observer.target){for(g=this.dependencies,c=0,e=g.length;e>c;c++)b=g[c],b.unobserve();if(this.dependencies=[],null!=(this.model=this.observer.target)&&(null!=(h=this.options.dependencies)?h.length:void 0))for(i=this.options.dependencies,d=0,f=i.length;f>d;d++)a=i[d],b=this.observe(this.model,a,this.sync),this.dependencies.push(b)}return this.observer.value()}return this.value}.call(this))},b.prototype.publish=function(){var a,b,c,d,e,g,h,i,j;if(this.observer){for(d=this.getValue(this.el),h=this.formatters.slice(0).reverse(),e=0,g=h.length;g>e;e++)b=h[e],a=b.split(/\s+/),c=a.shift(),(null!=(i=this.view.formatters[c])?i.publish:void 0)&&(d=(j=this.view.formatters[c]).publish.apply(j,[d].concat(f.call(a))));return this.observer.setValue(d)}},b.prototype.bind=function(){var a,b,c,d,e,f,g;if(this.parseTarget(),null!=(e=this.binder.bind)&&e.call(this,this.el),null!=this.model&&(null!=(f=this.options.dependencies)?f.length:void 0))for(g=this.options.dependencies,c=0,d=g.length;d>c;c++)a=g[c],b=this.observe(this.model,a,this.sync),this.dependencies.push(b);return this.view.preloadData?this.sync():void 0},b.prototype.unbind=function(){var a,b,c,d,e,f,g,h,i,j;for(null!=(g=this.binder.unbind)&&g.call(this,this.el),null!=(h=this.observer)&&h.unobserve(),i=this.dependencies,e=0,f=i.length;f>e;e++)d=i[e],d.unobserve();this.dependencies=[],j=this.formatterObservers;for(c in j){b=j[c];for(a in b)d=b[a],d.unobserve()}return this.formatterObservers={}},b.prototype.update=function(a){var b,c;return null==a&&(a={}),this.model=null!=(b=this.observer)?b.target:void 0,null!=(c=this.binder.update)?c.call(this,a):void 0},b.prototype.getValue=function(b){return this.binder&&null!=this.binder.getValue?this.binder.getValue.call(this,b):a.Util.getInputValue(b)},b}(),a.ComponentBinding=function(b){function c(a,b,c){var d,f,g,h,j,k,l;for(this.view=a,this.el=b,this.type=c,this.unbind=e(this.unbind,this),this.bind=e(this.bind,this),this.locals=e(this.locals,this),this.component=this.view.components[this.type],this["static"]={},this.observers={},this.upstreamObservers={},f=a.bindingRegExp(),k=this.el.attributes||[],h=0,j=k.length;j>h;h++)d=k[h],f.test(d.name)||(g=this.camelCase(d.name),i.call(null!=(l=this.component["static"])?l:[],g)>=0?this["static"][g]=d.value:this.observers[g]=d.value)}return h(c,b),c.prototype.sync=function(){},c.prototype.update=function(){},c.prototype.publish=function(){},c.prototype.locals=function(){var a,b,c,d,e,f;c={},e=this["static"];for(a in e)d=e[a],c[a]=d;f=this.observers;for(a in f)b=f[a],c[a]=b.value();return c},c.prototype.camelCase=function(a){return a.replace(/-([a-z])/g,function(a){return a[1].toUpperCase()})},c.prototype.bind=function(){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;if(!this.bound){o=this.observers;for(c in o)d=o[c],this.observers[c]=this.observe(this.view.models,d,function(a){return function(b){return function(){return a.componentView.models[b]=a.observers[b].value()}}}(this).call(this,c));this.bound=!0}if(null!=this.componentView)return this.componentView.bind();for(this.el.innerHTML=this.component.template.call(this),h=this.component.initialize.call(this,this.el,this.locals()),this.el._bound=!0,g={},p=a.extensions,k=0,m=p.length;m>k;k++){if(f=p[k],g[f]={},this.component[f]){q=this.component[f];for(b in q)i=q[b],g[f][b]=i}r=this.view[f];for(b in r)i=r[b],null==(j=g[f])[b]&&(j[b]=i)}for(s=a.options,l=0,n=s.length;n>l;l++)f=s[l],g[f]=null!=(t=this.component[f])?t:this.view[f];this.componentView=new a.View(this.el,h,g),this.componentView.bind(),u=this.observers,v=[];for(c in u)e=u[c],v.push(this.upstreamObservers[c]=this.observe(this.componentView.models,c,function(a){return function(b,c){return function(){return c.setValue(a.componentView.models[b])}}}(this).call(this,c,e)));return v},c.prototype.unbind=function(){var a,b,c,d,e;c=this.upstreamObservers;for(a in c)b=c[a],b.unobserve();d=this.observers;for(a in d)b=d[a],b.unobserve();return null!=(e=this.componentView)?e.unbind.call(this):void 0},c}(a.Binding),a.TextBinding=function(a){function b(a,b,c,d,f){this.view=a,this.el=b,this.type=c,this.keypath=d,this.options=null!=f?f:{},this.sync=e(this.sync,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.formatterObservers={}}return h(b,a),b.prototype.binder={routine:function(a,b){return a.data=null!=b?b:""}},b.prototype.sync=function(){return b.__super__.sync.apply(this,arguments)},b}(a.Binding),a["public"].binders.text=function(a,b){return null!=a.textContent?a.textContent=null!=b?b:"":a.innerText=null!=b?b:""},a["public"].binders.html=function(a,b){return a.innerHTML=null!=b?b:""},a["public"].binders.show=function(a,b){return a.style.display=b?"":"none"},a["public"].binders.hide=function(a,b){return a.style.display=b?"none":""},a["public"].binders.enabled=function(a,b){return a.disabled=!b},a["public"].binders.disabled=function(a,b){return a.disabled=!!b},a["public"].binders.checked={publishes:!0,priority:2e3,bind:function(b){return a.Util.bindEvent(b,"change",this.publish)},unbind:function(b){return a.Util.unbindEvent(b,"change",this.publish)},routine:function(a,b){var c;return a.checked="radio"===a.type?(null!=(c=a.value)?c.toString():void 0)===(null!=b?b.toString():void 0):!!b}},a["public"].binders.unchecked={publishes:!0,priority:2e3,bind:function(b){return a.Util.bindEvent(b,"change",this.publish)},unbind:function(b){return a.Util.unbindEvent(b,"change",this.publish)},routine:function(a,b){var c;return a.checked="radio"===a.type?(null!=(c=a.value)?c.toString():void 0)!==(null!=b?b.toString():void 0):!b}},a["public"].binders.value={publishes:!0,priority:3e3,bind:function(b){return"INPUT"!==b.tagName||"radio"!==b.type?(this.event="SELECT"===b.tagName?"change":"input",a.Util.bindEvent(b,this.event,this.publish)):void 0},unbind:function(b){return"INPUT"!==b.tagName||"radio"!==b.type?a.Util.unbindEvent(b,this.event,this.publish):void 0},routine:function(a,b){var c,d,e,f,g,h,j;if("INPUT"===a.tagName&&"radio"===a.type)return a.setAttribute("value",b);if(null!=window.jQuery){if(a=jQuery(a),(null!=b?b.toString():void 0)!==(null!=(f=a.val())?f.toString():void 0))return a.val(null!=b?b:"")}else if("select-multiple"===a.type){if(null!=b){for(j=[],d=0,e=a.length;e>d;d++)c=a[d],j.push(c.selected=(g=c.value,i.call(b,g)>=0));return j}}else if((null!=b?b.toString():void 0)!==(null!=(h=a.value)?h.toString():void 0))return a.value=null!=b?b:""}},a["public"].binders["if"]={block:!0,priority:4e3,bind:function(a){var b,c;return null==this.marker?(b=[this.view.prefix,this.type].join("-").replace("--","-"),c=a.getAttribute(b),this.marker=document.createComment(" rivets: "+this.type+" "+c+" "),this.bound=!1,a.removeAttribute(b),a.parentNode.insertBefore(this.marker,a),a.parentNode.removeChild(a)):void 0},unbind:function(){var a;return null!=(a=this.nested)?a.unbind():void 0},routine:function(b,c){var d,e,f,g;if(!!c==!this.bound){if(c){f={},g=this.view.models;for(d in g)e=g[d],f[d]=e;return(this.nested||(this.nested=new a.View(b,f,this.view.options()))).bind(),this.marker.parentNode.insertBefore(b,this.marker.nextSibling),this.bound=!0}return b.parentNode.removeChild(b),this.nested.unbind(),this.bound=!1}},update:function(a){var b;return null!=(b=this.nested)?b.update(a):void 0}},a["public"].binders.unless={block:!0,priority:4e3,bind:function(b){return a["public"].binders["if"].bind.call(this,b)},unbind:function(){return a["public"].binders["if"].unbind.call(this)},routine:function(b,c){return a["public"].binders["if"].routine.call(this,b,!c)},update:function(b){return a["public"].binders["if"].update.call(this,b)}},a["public"].binders["on-*"]={"function":!0,priority:1e3,unbind:function(b){return this.handler?a.Util.unbindEvent(b,this.args[0],this.handler):void 0},routine:function(b,c){return this.handler&&a.Util.unbindEvent(b,this.args[0],this.handler),a.Util.bindEvent(b,this.args[0],this.handler=this.eventHandler(c))}},a["public"].binders["each-*"]={block:!0,priority:4e3,bind:function(a){var b,c,d,e,f;if(null==this.marker)b=[this.view.prefix,this.type].join("-").replace("--","-"),this.marker=document.createComment(" rivets: "+this.type+" "),this.iterated=[],a.removeAttribute(b),a.parentNode.insertBefore(this.marker,a),a.parentNode.removeChild(a);else for(f=this.iterated,d=0,e=f.length;e>d;d++)c=f[d],c.bind()},unbind:function(){var a,b,c,d,e;if(null!=this.iterated){for(d=this.iterated,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.unbind());return e}},routine:function(b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x;if(j=this.args[0],c=c||[],this.iterated.length>c.length)for(u=Array(this.iterated.length-c.length),o=0,r=u.length;r>o;o++)f=u[o],n=this.iterated.pop(),n.unbind(),this.marker.parentNode.removeChild(n.els[0]);for(g=p=0,s=c.length;s>p;g=++p)if(i=c[g],e={index:g},e[j]=i,null==this.iterated[g]){v=this.view.models;for(h in v)i=v[h],null==e[h]&&(e[h]=i);l=this.iterated.length?this.iterated[this.iterated.length-1].els[0]:this.marker,k=this.view.options(),k.preloadData=!0,m=b.cloneNode(!0),n=new a.View(m,e,k),n.bind(),this.iterated.push(n),this.marker.parentNode.insertBefore(m,l.nextSibling)}else this.iterated[g].models[j]!==i&&this.iterated[g].update(e);if("OPTION"===b.nodeName){for(w=this.view.bindings,x=[],q=0,t=w.length;t>q;q++)d=w[q],x.push(d.el===this.marker.parentNode&&"value"===d.type?d.sync():void 0);return x}},update:function(a){var b,c,d,e,f,g,h,i;b={};for(c in a)d=a[c],c!==this.args[0]&&(b[c]=d);for(h=this.iterated,i=[],f=0,g=h.length;g>f;f++)e=h[f],i.push(e.update(b));return i}},a["public"].binders["class-*"]=function(a,b){var c;return c=" "+a.className+" ",!b==(-1!==c.indexOf(" "+this.args[0]+" "))?a.className=b?""+a.className+" "+this.args[0]:c.replace(" "+this.args[0]+" "," ").trim():void 0},a["public"].binders["*"]=function(a,b){return null!=b?a.setAttribute(this.type,b):a.removeAttribute(this.type)},a["public"].adapters["."]={id:"_rv",counter:0,weakmap:{},weakReference:function(a){var b,c,d;return a.hasOwnProperty(this.id)||(b=this.counter++,Object.defineProperty(a,this.id,{value:b})),(c=this.weakmap)[d=a[this.id]]||(c[d]={callbacks:{}})},cleanupWeakReference:function(a,b){return Object.keys(a.callbacks).length||a.pointers&&Object.keys(a.pointers).length?void 0:delete this.weakmap[b]},stubFunction:function(a,b){var c,d,e;return d=a[b],c=this.weakReference(a),e=this.weakmap,a[b]=function(){var b,f,g,h,i,j,k,l,m,n;h=d.apply(a,arguments),k=c.pointers;for(g in k)for(f=k[g],n=null!=(l=null!=(m=e[g])?m.callbacks[f]:void 0)?l:[],i=0,j=n.length;j>i;i++)(b=n[i])();return h}},observeMutations:function(a,b,c){var d,e,f,g,h,j;if(Array.isArray(a)){if(f=this.weakReference(a),null==f.pointers)for(f.pointers={},e=["push","pop","shift","unshift","sort","reverse","splice"],h=0,j=e.length;j>h;h++)d=e[h],this.stubFunction(a,d);if(null==(g=f.pointers)[b]&&(g[b]=[]),i.call(f.pointers[b],c)<0)return f.pointers[b].push(c)}},unobserveMutations:function(a,b,c){var d,e,f;return Array.isArray(a)&&null!=a[this.id]&&(e=this.weakmap[a[this.id]])&&(f=e.pointers[b])?((d=f.indexOf(c))>=0&&f.splice(d,1),f.length||delete e.pointers[b],this.cleanupWeakReference(e,a[this.id])):void 0},observe:function(a,b,c){var d,e,f;return d=this.weakReference(a).callbacks,null==d[b]&&(d[b]=[],e=Object.getOwnPropertyDescriptor(a,b),(null!=e?e.get:void 0)||(null!=e?e.set:void 0)||(f=a[b],Object.defineProperty(a,b,{enumerable:!0,get:function(){return f},set:function(e){return function(g){var h,j,k,l;if(g!==f&&(e.unobserveMutations(f,a[e.id],b),f=g,h=e.weakmap[a[e.id]])){if(d=h.callbacks,d[b])for(l=d[b].slice(),j=0,k=l.length;k>j;j++)c=l[j],i.call(d[b],c)>=0&&c();return e.observeMutations(g,a[e.id],b)}}}(this)}))),i.call(d[b],c)<0&&d[b].push(c),this.observeMutations(a[b],a[this.id],b)},unobserve:function(a,b,c){var d,e,f;return(f=this.weakmap[a[this.id]])&&(d=f.callbacks[b])?((e=d.indexOf(c))>=0&&(d.splice(e,1),d.length||delete f.callbacks[b]),this.unobserveMutations(a[b],a[this.id],b),this.cleanupWeakReference(f,a[this.id])):void 0},get:function(a,b){return a[b]},set:function(a,b,c){return a[b]=c}},a.factory=function(b){return a.sightglass=b,a["public"]._=a,a["public"]},"object"==typeof("undefined"!=typeof module&&null!==module?module.exports:void 0)?module.exports=a.factory(require("sightglass")):"function"==typeof define&&define.amd?define(["sightglass"],function(b){return this.rivets=a.factory(b)}):this.rivets=a.factory(sightglass)}.call(this),function(){var a,b,c,d,e,f,g,h=function(a,b){return function(){return a.apply(b,arguments)}},i=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){this.update=h(this.update,this)}return a.prototype.update=function(a){var b,c,d;for(c in a)d=a[c],"items"!==c&&(this[c]=d);return this.items=function(){var c,d,f,g;for(f=a.items,g=[],c=0,d=f.length;d>c;c++)b=f[c],g.push(new e(b));return g}()},a}(),e=function(){function a(a){this.propertyArray=h(this.propertyArray,this),this.update=h(this.update,this),this.update(a)}return a.prototype.update=function(a){var b,d;for(b in a)d=a[b],"properties"!==b&&(this[b]=d);return this.properties=c.Utils.extend({},a.properties)},a.prototype.propertyArray=function(){var a,b,c,d;c=this.properties,d=[];for(a in c)b=c[a],d.push({name:a,value:b});return d},a}(),c={settings:{debug:!1,dataAPI:!0,requestBodyClass:null,rivetsModels:{},currency:null,moneyFormat:null,moneyWithCurrencyFormat:null,weightUnit:"g",weightPrecision:0},cart:new b},c.init=function(a,b){return null==b&&(b={}),c.configure(b),c.Utils.log("Initialising CartJS."),c.cart.update(a),c.settings.dataAPI&&(c.Utils.log('"dataAPI" setting is true, initialising Data API.'),c.Data.init()),c.settings.requestBodyClass&&(c.Utils.log('"requestBodyClass" set, adding event listeners.'),jQuery(document).on("cart.requestStarted",function(){return jQuery("body").addClass(c.settings.requestBodyClass)}),jQuery(document).on("cart.requestComplete",function(){return jQuery("body").removeClass(c.settings.requestBodyClass)})),c.Rivets.init(),jQuery(document).trigger("cart.ready",[c.cart])},c.configure=function(a){return null==a&&(a={}),c.Utils.extend(c.settings,a)},null==window.console&&(window.console={},window.console.log=function(){}),d='A money formatting filter was used, but Shopify.formatMoney is not available. See the note "Dependency when formatting monetary values" on this page: https://cartjs.org/pages/guide#getting-started-setup.',c.Utils={log:function(){return c.Utils.console(console.log,arguments)},warn:function(){return c.Utils.console(console.warn,arguments)},error:function(){return c.Utils.console(console.error,arguments)},console:function(a,b){return c.settings.debug&&"undefined"!=typeof console&&null!==console?(b=Array.prototype.slice.call(b),b.unshift("[CartJS]:"),a.apply(console,b)):void 0},wrapKeys:function(a,b,c,d){var e,f,g,h;null==b&&(b="properties"),null==d&&(d=[]),h={};for(e in a)g=a[e],f=i.call(d,e)>=0?e:""+b+"["+e+"]",h[f]=null!=c?c:g;return h},unwrapKeys:function(a,b,c){var d,e,f,g;null==b&&(b="properties"),e={};for(d in a)g=a[d],f=d.replace(""+b+"[","").replace("]",""),e[f]=null!=c?c:g;return e},extend:function(a,b){var c,d;for(c in b)d=b[c],a[c]=d;return a},clone:function(a){var b,c;if(null==a||"object"!=typeof a)return a;c=new a.constructor;for(b in a)c[b]=clone(a[b]);return c},"delete":function(a,b){var c;return c=a[b],delete a[b],c},isArray:Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},ensureArray:function(a){return c.Utils.isArray(a)?a:null!=a?[a]:[]},formatMoney:function(a,b,e,f){var g,h;return null==f&&(f=""),f||(f=c.settings.currency),null!=window.Currency&&f!==c.settings.currency&&(a=Currency.convert(a,c.settings.currency,f),null!=(null!=(g=window.Currency)?g.moneyFormats:void 0)&&f in window.Currency.moneyFormats&&(b=window.Currency.moneyFormats[f][e])),null!=(null!=(h=window.Shopify)?h.formatMoney:void 0)?Shopify.formatMoney(a,b):(c.Utils.warn(d),a)},getSizedImageUrl:function(a,b){var c,d;return null!=(null!=(c=window.Shopify)&&null!=(d=c.Image)?d.getSizedImageUrl:void 0)?a?Shopify.Image.getSizedImageUrl(a,b):Shopify.Image.getSizedImageUrl("https://cdn.shopify.com/s/images/admin/no-image-.gif",b).replace("-_","-"):a?a:"https://cdn.shopify.com/s/images/admin/no-image-large.gif"}},g=[],f=!1,c.Queue={add:function(a,b,d){var e;return null==d&&(d={}),e={url:a,data:b,type:d.type||"POST",dataType:d.dataType||"json",cache:!!d.cache,success:c.Utils.ensureArray(d.success),error:c.Utils.ensureArray(d.error),complete:c.Utils.ensureArray(d.complete)},d.updateCart&&e.success.push(c.cart.update),g.push(e),f?void 0:(jQuery(document).trigger("cart.requestStarted",[c.cart]),c.Queue.process())},process:function(){var a;return g.length?(f=!0,a=g.shift(),a.complete=c.Queue.process,jQuery.ajax(a)):(f=!1,void jQuery(document).trigger("cart.requestComplete",[c.cart]))}},c.Core={getCart:function(a){return null==a&&(a={}),a.type="GET",a.updateCart=!0,c.Queue.add("/cart.js",{v:(new Date).getTime()},a)},addItem:function(a,b,d,e){var f;return null==b&&(b=1),null==d&&(d={}),null==e&&(e={}),f=c.Utils.wrapKeys(d,null,null,["selling_plan"]),f.id=a,f.quantity=b,c.Queue.add("/cart/add.js",f,e),c.Core.getCart()},addItems:function(a,b){var d;return null==b&&(b={}),d={items:a},c.Queue.add("/cart/add.js",d,b),c.Core.getCart()},updateItem:function(a,b,d,e){var f;return null==d&&(d={}),null==e&&(e={}),f=c.Utils.wrapKeys(d,null,null,["selling_plan"]),f.line=a,null!=b&&(f.quantity=b),e.updateCart=!0,c.Queue.add("/cart/change.js",f,e)},removeItem:function(a,b){return null==b&&(b={}),c.Core.updateItem(a,0,{},b)},updateItemById:function(a,b,d,e){var f;return null==d&&(d={}),null==e&&(e={}),f=c.Utils.wrapKeys(d,null,null,["selling_plan"]),f.id=a,null!=b&&(f.quantity=b),e.updateCart=!0,c.Queue.add("/cart/change.js",f,e)},updateItemQuantitiesById:function(a,b){return null==a&&(a={}),null==b&&(b={}),b.updateCart=!0,c.Queue.add("/cart/update.js",{updates:a},b)},removeItemById:function(a,b){var d;return null==b&&(b={}),d={id:a,quantity:0},b.updateCart=!0,c.Queue.add("/cart/change.js",d,b)},clear:function(a){return null==a&&(a={}),a.updateCart=!0,c.Queue.add("/cart/clear.js",{},a)},getAttribute:function(a,b){return a in c.cart.attributes?c.cart.attributes[a]:b},setAttribute:function(a,b,d){var e;return null==d&&(d={}),e={},e[a]=b,c.Core.setAttributes(e,d)},getAttributes:function(){return c.cart.attributes},setAttributes:function(a,b){return null==a&&(a={}),null==b&&(b={}),b.updateCart=!0,c.Queue.add("/cart/update.js",c.Utils.wrapKeys(a,"attributes"),b)},clearAttributes:function(a){return null==a&&(a={}),a.updateCart=!0,c.Queue.add("/cart/update.js",c.Utils.wrapKeys(c.Core.getAttributes(),"attributes",""),a)},getNote:function(){return c.cart.note},setNote:function(a,b){return null==b&&(b={}),b.updateCart=!0,c.Queue.add("/cart/update.js",{note:a},b)}},a=null,c.Data={init:function(){return a=jQuery(document),c.Data.setEventListeners("on"),c.Data.render(null,c.cart)},destroy:function(){return c.Data.setEventListeners("off")},setEventListeners:function(b){return a[b]("click","[data-cart-add]",c.Data.add),a[b]("click","[data-cart-remove]",c.Data.remove),a[b]("click","[data-cart-remove-id]",c.Data.removeById),a[b]("click","[data-cart-update]",c.Data.update),a[b]("click","[data-cart-update-id]",c.Data.updateById),a[b]("click","[data-cart-clear]",c.Data.clear),a[b]("change","[data-cart-toggle]",c.Data.toggle),a[b]("change","[data-cart-toggle-attribute]",c.Data.toggleAttribute),a[b]("submit","[data-cart-submit]",c.Data.submit),a[b]("cart.requestComplete",c.Data.render)},add:function(a){var b,d;return a.preventDefault(),b=jQuery(this),d={},d.selling_plan=b.attr("data-cart-selling-plan"),
c.Core.addItem(b.attr("data-cart-add"),b.attr("data-cart-quantity"),d)},remove:function(a){var b;return a.preventDefault(),b=jQuery(this),c.Core.removeItem(b.attr("data-cart-remove"))},removeById:function(a){var b;return a.preventDefault(),b=jQuery(this),c.Core.removeItemById(b.attr("data-cart-remove-id"))},update:function(a){var b,d;return a.preventDefault(),b=jQuery(this),d={},d.selling_plan=b.attr("data-cart-selling-plan"),c.Core.updateItem(b.attr("data-cart-update"),b.attr("data-cart-quantity"),d)},updateById:function(a){var b,d;return a.preventDefault(),b=jQuery(this),d={},d.selling_plan=b.attr("data-cart-selling-plan"),c.Core.updateItemById(b.attr("data-cart-update-id"),b.attr("data-cart-quantity"),d)},clear:function(a){return a.preventDefault(),c.Core.clear()},toggle:function(){var a,b;return a=jQuery(this),b=a.attr("data-cart-toggle"),a.is(":checked")?c.Core.addItem(b):c.Core.removeItemById(b)},toggleAttribute:function(){var a,b;return a=jQuery(this),b=a.attr("data-cart-toggle-attribute"),c.Core.setAttribute(b,a.is(":checked")?"Yes":"")},submit:function(a){var b,d,e,f;return a.preventDefault(),b=jQuery(this).serializeArray(),d=void 0,f=void 0,e={},jQuery.each(b,function(a,b){return"id"===b.name?d=b.value:"quantity"===b.name?f=b.value:"selling_plan"===b.name?e.selling_plan=b.value:b.name.match(/^properties\[[\w-_ ]*\]$/)?e[b.name]=b.value:void 0}),c.Core.addItem(d,f,c.Utils.unwrapKeys(e))},render:function(a,b){var d;return d={item_count:b.item_count,total_price:b.total_price,total_price_money:c.Utils.formatMoney(b.total_price,c.settings.moneyFormat,"money_format",null!=("undefined"!=typeof Currency&&null!==Currency?Currency.currentCurrency:void 0)?Currency.currentCurrency:void 0),total_price_money_with_currency:c.Utils.formatMoney(b.total_price,c.settings.moneyWithCurrencyFormat,"money_with_currency_format",null!=("undefined"!=typeof Currency&&null!==Currency?Currency.currentCurrency:void 0)?Currency.currentCurrency:void 0)},jQuery("[data-cart-render]").each(function(){var a;return a=jQuery(this),a.html(d[a.attr("data-cart-render")])})}},"undefined"!=typeof rivets&&null!==rivets?(c.Rivets={model:null,boundViews:[],init:function(){return c.Rivets.bindViews()},destroy:function(){return c.Rivets.unbindViews()},bindViews:function(){return c.Utils.log("Rivets.js is present, binding views."),c.Rivets.unbindViews(),c.Rivets.model=c.Utils.extend({cart:c.cart},c.settings.rivetsModels),null!=window.Currency&&(c.Rivets.model.Currency=window.Currency),jQuery("[data-cart-view]").each(function(){var a;return a=rivets.bind(jQuery(this),c.Rivets.model),c.Rivets.boundViews.push(a)})},unbindViews:function(){var a,b,d,e;for(e=c.Rivets.boundViews,b=0,d=e.length;d>b;b++)a=e[b],a.unbind();return c.Rivets.boundViews=[]}},rivets.formatters.eq=function(a,b){return a===b},rivets.formatters.includes=function(a,b){return a.indexOf(b)>=0},rivets.formatters.match=function(a,b,c){return a.match(new RegExp(b,c))},rivets.formatters.lt=function(a,b){return b>a},rivets.formatters.gt=function(a,b){return a>b},rivets.formatters.not=function(a){return!a},rivets.formatters.empty=function(a){return!a.length},rivets.formatters.plus=function(a,b){return parseInt(a)+parseInt(b)},rivets.formatters.minus=function(a,b){return parseInt(a)-parseInt(b)},rivets.formatters.times=function(a,b){return a*b},rivets.formatters.divided_by=function(a,b){return a/b},rivets.formatters.modulo=function(a,b){return a%b},rivets.formatters.prepend=function(a,b){return b+a},rivets.formatters.append=function(a,b){return a+b},rivets.formatters.slice=function(a,b,c){return a.slice(b,c)},rivets.formatters.pluralize=function(a,b,d){return null==d&&(d=b+"s"),c.Utils.isArray(a)&&(a=a.length),1===a?b:d},rivets.formatters.array_element=function(a,b){return a[b]},rivets.formatters.array_first=function(a){return a[0]},rivets.formatters.array_last=function(a){return a[a.length-1]},rivets.formatters.money=function(a,b){return c.Utils.formatMoney(a,c.settings.moneyFormat,"money_format",b)},rivets.formatters.money_with_currency=function(a,b){return c.Utils.formatMoney(a,c.settings.moneyWithCurrencyFormat,"money_with_currency_format",b)},rivets.formatters.weight=function(a){switch(c.settings.weightUnit){case"kg":return(a/1e3).toFixed(c.settings.weightPrecision);case"oz":return(.035274*a).toFixed(c.settings.weightPrecision);case"lb":return(.00220462*a).toFixed(c.settings.weightPrecision);default:return a.toFixed(c.settings.weightPrecision)}},rivets.formatters.weight_with_unit=function(a){return rivets.formatters.weight(a)+c.settings.weightUnit},rivets.formatters.product_image_size=function(a,b){return c.Utils.getSizedImageUrl(a,b)},rivets.formatters.moneyWithCurrency=rivets.formatters.money_with_currency,rivets.formatters.weightWithUnit=rivets.formatters.weight_with_unit,rivets.formatters.productImageSize=rivets.formatters.product_image_size):c.Rivets={init:function(){},destroy:function(){}},c.factory=function(a){return a.init=c.init,a.configure=c.configure,a.cart=c.cart,a.settings=c.settings,a.getCart=c.Core.getCart,a.addItem=c.Core.addItem,a.addItems=c.Core.addItems,a.updateItem=c.Core.updateItem,a.updateItemById=c.Core.updateItemById,a.updateItemQuantitiesById=c.Core.updateItemQuantitiesById,a.removeItem=c.Core.removeItem,a.removeItemById=c.Core.removeItemById,a.clear=c.Core.clear,a.getAttribute=c.Core.getAttribute,a.setAttribute=c.Core.setAttribute,a.getAttributes=c.Core.getAttributes,a.setAttributes=c.Core.setAttributes,a.clearAttributes=c.Core.clearAttributes,a.getNote=c.Core.getNote,a.setNote=c.Core.setNote,a.render=c.Data.render},"object"==typeof exports?c.factory(exports):"function"==typeof define&&define.amd?define(["exports"],function(a){return c.factory(this.CartJS=a),a}):c.factory(this.CartJS={})}.call(this);