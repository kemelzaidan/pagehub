var $,jQuery;if(!$&&!jQuery)throw"jQuery could not be found, dynamism requires it.";dynamism=function(e){function u(){e.debug||(o=function(e,t){return!t||t=="D"?!1:s("["+t+"] "+e)});if(e.log_target){var t=e.log_target.html("<ol></ol>").find("ol:first");s=function(e){var n=e.substr(1,1);t.append("<li class='"+n+"'><em>"+n+"</em> "+e.substr(4)+"</li>")}}e.logging||(s=function(){})}function c(e){typeof e=="string"&&(e=[e]);var t="";for(var n=0;n<e.length;++n){if(!e[n]||e[n]=="")continue;t+="["+e[n]+"]"}return $.escape(t)}function h(e){var t=e.split(".");if(t.length==0&&!window[e])return null;var n=window[t[0]];for(var r=1;r<t.length;++r){if(!n)return null;n=n[t[r]]}return n}function p(e){var t=null,n=$(e).attr("data-dyn-target"),r=$(e).attr("data-dyn-target-index");if(!n){var i=$(e).parents("[data-dyn-entity]:not([data-dyn-index=-1]):first");if(i.length==0)return o("Unable to find any parent entity for: "+a(e),"E"),null;t=i}return t=t||$("[data-dyn-entity='"+$.escape(n)+"']"+"[data-dyn-index="+r+"]"),t.length==0?(o("Target could not be located by: "+a(e),"E"),null):t}function d(e,t,n,r){var i=r.length>0?r.join(".")+"."+e:e;i=$.escape(i);var s=n.find("[data-dyn-inject]:visible,input[data-dyn-inject][type=hidden]");n.attr("data-dyn-inject")&&(o("Self-object wants to be injected too! "+n.attr("data-dyn-inject"),"N"),s=s.add(n)),s=s.filter(function(){return $(this).attr("data-dyn-inject").trim().match(RegExp("@\\S+,\\s*"+i))}),s.each(function(){var r=$(this),s=r.attr("data-dyn-inject").trim().split(/,\s*/);if(s.length%2!=0)return alert("Syntax error: "+s.join(" ")+" are not even!"),!1;for(var u=0;u<s.length;u+=2){if(s[u+1]!=i){r.is(n)&&o("Self is not interested in "+s[u+1]);continue}if(m(r,s[u],i)){o("this element has already been injected with "+s[u]+" for "+i+", skipping","N");continue}var a=s[u].substr(1);if(a=="text")r.html().search("%"+e)!=-1?r.html(r.html().replace(RegExp("%"+e,"g"),t)):r.html(t);else{var f=r.attr(a);if(f&&f.search("%"+e)!=-1){var l=RegExp("%"+e,"g");r.attr(a,f.replace(l,t))}else r.attr(a,t)}g(r,"@"+a,i)}}),s.length==0&&o("Could not find any entity referencing: "+i,"E")}function v(e,t){return e+" "+t}function m(e,t,n){for(var i=0;i<r.length;++i){var s=r[i];if(e.is(s.o)&&s.injections.search(v(t,n))!=-1)return!0}return!1}function g(e,t,n){var i=!1;for(var s=0;s<r.length;++s){var u=r[s];if(e.is(u.o)){u.injections+=v(t,n),i=!0;break}}i||r.push({o:e,injections:v(t,n)}),o("Injection: "+n+" into "+t+" on "+a(e))}function y(e){for(var n=0;n<t.length;++n)if(t[n]==e)return!0;return!1}function b(){var e=$(this);if(!e.attr("data-dyn-hook").match(/\s*\S+,\s*\S+/))return o("hooks: invalid syntax, unable to parse event or method in: "+e.attr("data-dyn-hook"),"E"),!1;var t=e.attr("data-dyn-hook").trim().split(/,\s*/);if(t.length%2!=0)return o("hooks: invalid syntax, odd number of event<->method pairs in: "+e.attr("data-dyn-hook"),"E"),!1;var n=function(e,t){return function(n){return n.is(e)?t.apply(n,arguments):!0}},r=t.length;for(var i=0;i<r;i+=2){var s=t[i],u=t[i+1],a=h(u);typeof u=="string"&&a&&typeof a=="function"?y(s)?dynamism.add_callback(n(e,a),s):(o("hooks: binding window event: "+s+" => "+u),e.bind(s,a)):o("hooks: Invalid event or method: "+s+" => "+u,"E")}e.attr("data-dyn-hook",null)}var t=["all","addition","removal","post-removal","post-injection"],n={},r=[],i={},e=$.extend({debug:!0,logging:!0,log_target:null,log_out:null},e);$.apply_on=function(e,t){$(e).each(function(){t($(this))})};var s=function(e){console.log(e)},o;o=function(e,t){t=t||"D",s("["+t+"] "+e)};var a;a||(a=function(e){var t=$(e)[0],n="<"+t.tagName;if(t.attributes)for(var r=0;r<t.attributes.length;++r){var i=t.attributes[r];n+=" "+i.name+'="'+i.value+'"'}return n+=" />",n});var f;f||(f=function(e,t){e=e||[];for(var n=0;n<e.length;++n)t(e[n])}),f(t,function(e){n[e]=[]}),$.escape=function(e){return e.replace(/\[/g,"\\[").replace(/\]/g,"\\]")};var l=$.escape;return{configure:function(t){e=$.extend(e,t),u()},callbacks:n,add:function(e){var t=null,r=null;if(e)try{e=$(e),t=e.attr("data-dyn-entity"),r=e.attr("data-dyn-index");if(!t||!r)throw"Invalid target, has no identity or index"}catch(i){o(i),e=null}if(!e){t=$(this).attr("data-dyn-target"),r=$(this).attr("data-dyn-target-index")||-1,e=$("[data-dyn-entity='"+$.escape(t)+"']"+"[data-dyn-index="+r+"]");if(e.length==0)return o("Unable to find entity. Invalid reference by: "+a($(this))),!1}var s=$("[data-dyn-entity='"+$.escape(t)+"']:last"),u=parseInt(s.attr("data-dyn-index"))+1,c=e.clone();c.attr({hidden:null,"data-dyn-index":u});var h=RegExp(l(t+"[-1]"),"g"),p=t+"["+u+"]";return c.find("*").each(function(){var e=$(this);$.each(e.get(0).attributes,function(t,n){try{e.attr(n.name,n.value.replace(h,p))}catch(r){}}),e.attr("data-dyn-target")==t&&(e.attr("data-dyn-inject")=="index"&&e.html(u),e.attr("data-dyn-target-index",u))}),c.find("[data-dyn-inject=index]:not([data-dyn-target])").each(function(){var e=$(this);e.parents("[data-dyn-entity]:first").attr("data-dyn-entity")==c.attr("data-dyn-entity")&&e.html(u)}),dynamism.bind(c),$("[data-dyn-entity="+$.escape(t)+"]:last").after(c),f(n.addition,function(e){e(c)}),f(n.all,function(e){e(c,"addition")}),c},utility:{lookup_method:function(e){return h(e)}},remove:function(e){var t=$(e).is("[data-dyn-entity]")?$(e):p($(this)),r=$(this);if(!t)return!1;try{f(n.removal,function(e){e(t,r)}),f(n.all,function(e){e(t,"removal",r)})}catch(i){return o("Removal aborted per requested. Given cause: "+i,"E"),!1}t.remove(),f(n["post-removal"],function(e){e(null,r)}),f(n.all,function(e){e(null,"post-removal",r)})},inject:function(e,t,r){var s=!r,r=r||[],u=null;for(u in e){var a=e[u];switch(typeof a){case"string":case"number":d(u,a,t,r);break;case"object":if(isNaN(parseInt(u)))r.push(u),o("Context: "+r),dynamism.inject(a,t,r),r.pop();else{var l=r.join("."),c=null,h=i[l];o("Looking for a factory for "+l);if(h)o("	Using user-defined factory for: "+l),c=h(t,e[u],e);else{o("	Looking for a factory for model: "+l);var p=t.find("[data-dyn-spawn-on='"+l+"'][data-dyn-index=-1]");p.length>0?(o("		Found "+p.length+"!"),c=$(),p.each(function(){var e=$(this);c=c.add(dynamism.add(e))})):o("Unable to create model: "+l+", no factory found.","W")}c&&c.length>0?c.each(function(){var e=$(this);dynamism.inject(a,e,r),e.attr("data-dyn-hook")&&(f(n["post-injection"],function(t){t(e,a)}),f(n.all,function(t){t(e,"post-injection",a)}))}):o("Unable to create model: "+l+", factory didn't create a proper entity.","W")}break;default:o("Unknown value type: "+typeof a,"E")}}s&&(o("Invoking all post-injection hooks"),f(n["post-injection"],function(n){n(t,e)}),f(n.all,function(n){n(t,"post-injection",e)}))},reset:function(){r=[]},bind:function(e){if(!e||$(e).length==0)e=$("*");e.find("[data-dyn-target]:not([data-dyn-action]),[data-dyn-target][data-dyn-action='add']").unbind("click",dynamism.add).bind("click",dynamism.add),e.find("[data-dyn-action='remove']").unbind("click",dynamism.remove).bind("click",dynamism.remove)},hook:function(e){var t=null;try{t=e.find("[data-dyn-hook]:visible")}catch(n){return alert("Unable to inject: "+e+". Cause: "+n)}e.attr("data-dyn-hook")&&(t=t.add(e)),t.each(b)},add_callback:function(e,t){var t=t||"all";if(!e)throw"Undefined "+t+" callback: "+e;if(typeof e!="function")throw"Bad callback type given: "+typeof e;n[t].push(e)},on_addition:function(e){return dynamism.add_callback(e,"addition")},on_removal:function(e){return dynamism.add_callback(e,"removal")},after_removal:function(e){return dynamism.add_callback(e,"post-removal")},after_injection:function(e){return dynamism.add_callback(e,"post-injection")},register_factory:function(e,t){if(i[e])return alert("Seems like you've already registered a factory for: "+e),!1;if(typeof t!="function")return alert("Factory must be a method that creates anobject, given was: "+typeof t+" for model: "+e),!1;i[e]=t,o("Registered factory for: "+e)}}}(),$(function(){$("[data-dyn-entity]:not([data-dyn-index])").attr({"data-dyn-index":-1}),$("[data-dyn-entity][data-dyn-index=-1]").attr({hidden:"true"}),dynamism.after_injection(dynamism.hook);var e=["data-dyn-inject","data-dyn-spawn-on","data-dyn-hook"];dynamism.after_injection(function(t){for(var n=0;n<e.length;++n){var r=e[n];t.find("["+r+"]:visible").attr(r,null),t.attr(r,null)}})});